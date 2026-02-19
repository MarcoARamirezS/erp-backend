import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.js'
import { getFirebase } from '../config/firebase.js'

const { db } = getFirebase()

export async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) throw { status: 401, message: 'Missing token' }

    const payload = jwt.verify(token, jwtConfig.accessSecret)
    const userId = payload.sub

    const userDoc = await db.collection('users').doc(userId).get()
    if (!userDoc.exists) throw { status: 401, message: 'User not found' }

    const user = { id: userDoc.id, ...userDoc.data() }
    if (user.active === false) throw { status: 403, message: 'User inactive' }

    // resolver permisos por roles
    const roleIds = Array.isArray(user.roleIds) ? user.roleIds : []
    const rolesDocs = await Promise.all(roleIds.map((rid) => db.collection('roles').doc(rid).get()))

    const perms = new Set()
    for (const r of rolesDocs) {
      if (!r.exists) continue
      const data = r.data()
      const arr = Array.isArray(data.permissions) ? data.permissions : []
      for (const p of arr) perms.add(p)
    }

    req.auth = { user, permissions: [...perms] }
    next()
  } catch (e) {
    next({ status: 401, message: 'Unauthorized', details: e?.message || e })
  }
}
