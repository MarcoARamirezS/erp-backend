import { getFirebase } from '../config/firebase.js'
import { RESOURCES, ACTIONS, EXTRA_PERMISSIONS } from '../constants/acl.js'

const { db } = getFirebase()

export async function seedPermissions() {
  const permissions = []

  for (const r of RESOURCES) {
    for (const a of ACTIONS) permissions.push(`${r}:${a}`)
  }
  permissions.push(...EXTRA_PERMISSIONS)

  const batch = db.batch()
  for (const p of permissions) {
    const ref = db.collection('permissions').doc(p)
    batch.set(ref, { id: p, name: p, createdAt: Date.now() }, { merge: true })
  }
  await batch.commit()

  return permissions
}
