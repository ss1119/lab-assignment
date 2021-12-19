import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  loggedIn: false,
  userId: '',
  userEmail: '',
})

export const mutations = {
  setLoginState(state, { uid, email }) {
    state.loggedIn = true
    state.userId = uid
    state.userEmail = email
  },
  setLogoutState(state) {
    state.loggedIn = false
    state.userId = ''
    state.userEmail = ''
  },
}

export const actions = {
  signIn({ commit }, { email, password }) {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        commit('setLoginState', {
          uid: user.uid,
          email: user.email,
        })
        this.$router.push('/user')
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log(email, password)
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
        console.log(err.code, err.message)
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
}
