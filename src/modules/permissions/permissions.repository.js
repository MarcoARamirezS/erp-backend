import { getFirebase } from '../../config/firebase.js'
const { db } = getFirebase()
const col = () => db.collection('permissions')

export const PermissionsRepo = {
  async list() {
    const snap = await col().orderBy('name', 'asc').get()
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }
}
