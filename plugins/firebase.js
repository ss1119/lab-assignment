import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, setPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth'

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

// Firebase初期化
const app = initializeApp(config)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

// ログイン時のセッションをブラウザ(タブ)を消すまでに変更
const auth = getAuth()
setPersistence(auth, browserSessionPersistence)

// 認証状態を取得
export const initFirebaseAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // userオブジェクトをresolve
      resolve(user)

      // 登録解除
      unsubscribe()
    })
  })
}
