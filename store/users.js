import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

const usersRef = collection(db, 'users')

export const state = () => ({
  users: [],
  years: [],
  usersByYear: [],
  user: {},
  unsubscribe: null,
})

export const mutations = {
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
  async getAll({ commit }) {
    const users = await getDocs(usersRef)
    commit('setUsers', { users })
    commit('setYears', { users })
  },

  async getUsersByYear({ commit }, { year }) {
    const yearQuery = query(usersRef, where('year', '==', year))
    const usersByYear = await getDocs(yearQuery)
    commit('setUsersByYear', { usersByYear })
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
  items(state) {
    return state.users
  },
  years(state) {
    return state.years
  },
}
