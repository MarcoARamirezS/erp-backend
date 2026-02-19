import { getFirebase } from '../../config/firebase.js'
const { db } = getFirebase()
const col = () => db.collection('suppliers')

export const SuppliersRepo = {
  async create(data) {
    const ref = col().doc()
    await ref.set({ ...data, id: ref.id })
    return { id: ref.id, ...data }
  },
  async getById(id) {
    const doc = await col().doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } : null
  },
  async update(id, patch) {
    await col().doc(id).update({ ...patch, updatedAt: Date.now() })
  },
  async list({ limit, cursor }) {
    let q = col().orderBy('createdAt', 'desc').limit(limit)
    if (cursor) {
      const cur = await col().doc(cursor).get()
      if (cur.exists) q = q.startAfter(cur)
    }
    const snap = await q.get()
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const nextCursor = snap.docs.length === limit ? snap.docs[snap.docs.length - 1].id : null
    return { items, nextCursor }
  }
}
