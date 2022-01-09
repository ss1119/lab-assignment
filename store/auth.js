import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  loggedIn: false,
  admin: false,
  userId: '',
  userEmail: '',
})

export const mutations = {
  setLoginState(state, { uid, email }) {
    state.loggedIn = true
    state.userId = uid
    state.userEmail = email
  },
  setAdminState(state, { uid, email }) {
    state.admin = true
    state.userId = uid
    state.userEmail = email
  },
  setLogoutState(state) {
    state.loggedIn = false
    state.admin = false
    state.userId = ''
    state.userEmail = ''
  },
}

export const actions = {
  signIn({ commit }, { email, password }) {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        // ログインしたユーザのロールを取得
        credential.user.getIdTokenResult().then((idTokenResult) => {
          // adminなら管理者画面へ
          if (idTokenResult.claims.admin) {
            commit('setAdminState', {
              uid: credential.user.uid,
              email: credential.user.email,
            })
            this.$router.push(process.env.ADMIN_ROOT_URL)
          } else {
            commit('setLoginState', {
              uid: credential.user.uid,
              email: credential.user.email,
            })
            this.$router.push('/user')
          }
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message)
        alert('ログイン認証に失敗しました。\n入力したメールアドレスとパスワードが正しいかを確認してください。')
      })
  },

  signOut({ commit }) {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        commit('setLogoutState')
        this.$router.push('/')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message)
      })
  },
}

export const getters = {
  // ユーザの情報を取得
  userId(state) {
    return state.userId
  },

  userEmail(state) {
    return state.userEmail
  },
  // ユーザがログインされているかの判定
  isLoggined(state) {
    return state.loggedIn
  },

  // 管理者権限かどうか
  isAdmin(state) {
    return state.admin
  },
}
