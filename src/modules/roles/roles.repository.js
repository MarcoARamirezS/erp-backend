import { getFirebase } from '../../config/firebase.js'
const { db } = getFirebase()
const col = () => db.collection('roles')

export const RolesRepo = {
  async create(role) {
    await col().doc(role.id).set({ ...role, createdAt: Date.now(), updatedAt: Date.now() }, { merge: false })
    return role
  },
  async getById(id) {
    const doc = await col().doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } : null
  },
  async update(id, patch) {
    await col().doc(id).update({ ...patch, updatedAt: Date.now() })
  },
  async list() {
    const snap = await col().orderBy('name', 'asc').get()
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }
}
