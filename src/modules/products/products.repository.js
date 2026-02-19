import { getFirebase } from '../../config/firebase.js'
const { db } = getFirebase()
const col = () => db.collection('products')

export const ProductsRepo = {
  async create(data) {
    const ref = col().doc()
    await ref.set({ ...data, id: ref.id })
    return { id: ref.id, ...data }
  },

  async getById(id) {
    const doc = await col().doc(id).get()
    return doc.exists ? { id: doc.id, ...doc.data() } : null
  },

  async getBySku(sku) {
    const snap = await col().where('sku', '==', sku).limit(1).get()
    if (snap.empty) return null
    const doc = snap.docs[0]
    return { id: doc.id, ...doc.data() }
  },

  async list({ limit, cursor, skuPrefix }) {
    let q

    if (skuPrefix) {
      q = col()
        .where('sku', '>=', skuPrefix)
        .where('sku', '<=', skuPrefix + '\uf8ff')
        .orderBy('sku', 'asc')
    } else {
      q = col().orderBy('createdAt', 'desc')
    }

    q = q.limit(limit)

    if (cursor) {
      const cur = await col().doc(cursor).get()
      if (cur.exists) q = q.startAfter(cur)
    }

    const snap = await q.get()
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const nextCursor = snap.docs.length === limit ? snap.docs[snap.docs.length - 1].id : null
    return { items, nextCursor }
  },

  async update(id, patch) {
    await col().doc(id).update({ ...patch, updatedAt: Date.now() })
  }
}
