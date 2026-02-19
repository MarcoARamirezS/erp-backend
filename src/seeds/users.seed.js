import bcrypt from 'bcryptjs'
import { getFirebase } from '../config/firebase.js'

const { db } = getFirebase()

/**
 * Admin por defecto:
 * email: admin@erp.com
 * pass : Admin1234!
 * (Puedes cambiarlo después o mover a env si prefieres)
 */
export async function seedAdminUser() {
  const email = 'admin@erp.com'
  const password = 'Admin1234!'

  const snap = await db.collection('users').where('email', '==', email).limit(1).get()
  if (!snap.empty) return { existed: true, email }

  const passwordHash = await bcrypt.hash(password, 12)
  const ref = db.collection('users').doc()

  await ref.set({
    id: ref.id,
    email,
    name: 'Admin',
    passwordHash,
    roleIds: ['admin'],
    active: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })

  return { existed: false, id: ref.id, email, password }
}
