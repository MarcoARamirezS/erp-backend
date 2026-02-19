import admin from 'firebase-admin'
import { env } from './env.js'

let cached = null

export function getFirebase() {
  if (cached) return cached

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    })
  }

  const db = admin.firestore()
  cached = { admin, db }
  return cached
}
