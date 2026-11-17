import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Keys come from .env.local (see .env.example). Firebase web keys are not secret:
// access is controlled by the Realtime Database rules in database.rules.json.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseReady = Boolean(config.apiKey && config.databaseURL && config.appId)

const app = firebaseReady ? (getApps()[0] ?? initializeApp(config)) : null

export const db = app ? getDatabase(app) : null
export const auth = app ? getAuth(app) : null
