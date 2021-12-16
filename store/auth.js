import { auth } from '~/plugins/firebase.js'

export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  // Emailとパスワードを使用して、ログインを行う
  signInWithEmail({ commit }, { email, password }) {
    return auth().signInWithEmailAndPassword(email, password)
  },

  // サインアウトを行う
  signOut() {
    return auth().signOut()
  },
}

export const getters = {
  // ユーザの情報を取得
  user(state) {
    return state.user
  },

  // ユーザがログインされているかの判定
  isLoggined(state) {
    return !!state.user
  },
}
