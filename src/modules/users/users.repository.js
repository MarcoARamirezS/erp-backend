import { getFirebase } from '../../config/firebase.js'

const { db } = getFirebase()
const col = () => db.collection('users')

export const UsersRepo = {
  async create(data) {
    const ref = col().doc()
    await ref.set({ ...data, id: ref.id })
    return { id: ref.id, ...data }
  },

  async getById(id) {
    const doc = await col().doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } : null
  },

  async getByEmail(email) {
    const snap = await col().where('email', '==', email).limit(1).get()
    if (snap.empty) return null
    const doc = snap.docs[0]
    return { id: doc.id, ...doc.data() }
  },

  async update(id, patch) {
    await col().doc(id).update({ ...patch, updatedAt: Date.now() })
  },

  async list({ limit, cursor }) {
    let q = col().orderBy('createdAt', 'desc').limit(limit)
    if (cursor) {
      const curDoc = await col().doc(cursor).get()
      if (curDoc.exists) q = q.startAfter(curDoc)
    }
    const snap = await q.get()
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const nextCursor = snap.docs.length === limit ? snap.docs[snap.docs.length - 1].id : null
    return { items, nextCursor }
  }
}
