import firebase from 'firebase/app'
import 'firebase/analytics'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: '${config.measurementId}',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.analytics()
}

export const auth = firebase.auth
export default firebase
