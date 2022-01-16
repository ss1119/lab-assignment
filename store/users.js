import { collection, doc, getDoc, getDocs, updateDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

const usersRef = collection(db, 'users')

export const state = () => ({
  user: {},
  users: [],
  years: [],
  usersByYear: [],
  unsubscribe: null,
})

export const mutations = {
  setUser(state, { user }) {
    state.user = Object.assign({}, user.data())
  },
  setUsers(state, { users }) {
    const items = []
    users.forEach((user) => {
      items.push(user.data())
    })
    state.users.splice(0)
    state.users.push(...items)
  },
  setYears(state, { users }) {
    const set = new Set()
    users.forEach((user) => {
      set.add(user.data().year)
    })
    state.years.splice(0)
    state.years.push(...set)
    // Adminのデータを削除できないようにする
    const index = state.years.indexOf('9999')
    state.years.splice(index, 1)
  },
  setUsersByYear(state, { users }) {
    const items = []
    users.forEach((user) => {
      items.push(user.data())
    })
    state.usersByYear.splice(0)
    state.usersByYear.push(...items)
  },
}

export const actions = {
  // mountedの際にデータを取ってこれないので、同期的に処理
  getOne({ commit }, { uid }) {
    return new Promise((resolve) => {
      const userDoc = doc(db, 'users', uid)
      getDoc(userDoc).then((user) => {
        commit('setUser', { user })
        resolve(user)
      })
    })
  },

  async getAll({ commit }) {
    const users = await getDocs(usersRef)
    commit('setUsers', { users })
    commit('setYears', { users })
  },

  getUsersByYear({ commit }, { year }) {
    const yearQuery = query(usersRef, where('year', '==', year), where('isActive', '==', true))
    return new Promise((resolve) => {
      getDocs(yearQuery).then((users) => {
        commit('setUsersByYear', { users })
        resolve(users)
      })
    })
  },

  update({ commit }, { uid, point, isGraduate }) {
    const userDoc = doc(db, 'users', uid)
    return new Promise((resolve, reject) => {
      updateDoc(userDoc, {
        point,
        isGraduate,
        isPointAssigned: true,
      })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err.message)
        })
    })
  },

  startListener({ commit }) {
    this.unsubscribe = onSnapshot(collection(db, 'users'), (users) => {
      commit('setUsers', { users })
      commit('setYears', { users })
    })
  },

  stopListener({ commit }) {
    this.unsubscribe()
  },
}

export const getters = {
  item(state) {
    return state.user
  },
  items(state) {
    return state.users
  },
  years(state) {
    return state.years
  },
  itemsByYear(state) {
    return state.usersByYear
  },
}
