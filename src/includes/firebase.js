import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_APP_ID,
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

db.enablePersistence().catch((err) => {
  console.log('🚀 ~ firebase.js:19 ~ err:', err)
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // on one tab at a a time.
    // User should consider closing the tab.
  } else if (err.code === 'unimplemented') {
    // The current browser doesn't support persistence
  }
})
const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')
export { auth, db, usersCollection, songsCollection, commentsCollection }
