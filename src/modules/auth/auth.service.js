import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.js'
import { getFirebase } from '../../config/firebase.js'
import { hashToken } from '../../utils/tokenHash.js'

const { db } = getFirebase()

const signAccess = (userId) =>
  jwt.sign({ sub: userId }, jwtConfig.accessSecret, { expiresIn: jwtConfig.accessExpires })

const signRefresh = (userId) =>
  jwt.sign({ sub: userId }, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpires })

export async function login({ email, password }) {
  const snap = await db.collection('users').where('email', '==', email).limit(1).get()
  if (snap.empty) throw { status: 401, message: 'Invalid credentials' }

  const doc = snap.docs[0]
  const user = { id: doc.id, ...doc.data() }
  if (user.active === false) throw { status: 403, message: 'User inactive' }

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw { status: 401, message: 'Invalid credentials' }

  const accessToken = signAccess(user.id)
  const refreshToken = signRefresh(user.id)

  const refreshHash = hashToken(refreshToken)
  await db.collection('refreshTokens').doc(refreshHash).set({
    userId: user.id,
    createdAt: Date.now(),
    revokedAt: null
  })

  return { accessToken, refreshToken }
}

export async function refresh({ refreshToken }) {
  try {
    const payload = jwt.verify(refreshToken, jwtConfig.refreshSecret)
    const userId = payload.sub

    const currentHash = hashToken(refreshToken)
    const currentDoc = await db.collection('refreshTokens').doc(currentHash).get()
    if (!currentDoc.exists) throw new Error('Refresh not found')
    const current = currentDoc.data()
    if (current.revokedAt) throw new Error('Refresh revoked')

    // ROTACIÓN
    await db.collection('refreshTokens').doc(currentHash).update({ revokedAt: Date.now() })

    const newRefresh = signRefresh(userId)
    const newHash = hashToken(newRefresh)
    await db.collection('refreshTokens').doc(newHash).set({
      userId,
      createdAt: Date.now(),
      revokedAt: null
    })

    return { accessToken: signAccess(userId), refreshToken: newRefresh }
  } catch {
    throw { status: 401, message: 'Invalid refresh token' }
  }
}

export async function logout({ refreshToken }) {
  const hash = hashToken(refreshToken)
  const doc = await db.collection('refreshTokens').doc(hash).get()
  if (!doc.exists) return { ok: true }
  await db.collection('refreshTokens').doc(hash).update({ revokedAt: Date.now() })
  return { ok: true }
}
