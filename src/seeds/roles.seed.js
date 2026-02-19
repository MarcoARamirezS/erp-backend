import { getFirebase } from '../config/firebase.js'
const { db } = getFirebase()

export async function seedRoles({ allPermissions }) {
  await db.collection('roles').doc('admin').set({
    id: 'admin',
    name: 'Administrator',
    permissions: allPermissions,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, { merge: true })

  const viewer = allPermissions.filter((p) => p.endsWith(':read'))
  await db.collection('roles').doc('viewer').set({
    id: 'viewer',
    name: 'Viewer',
    permissions: viewer,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, { merge: true })

  return { admin: allPermissions.length, viewer: viewer.length }
}
