import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

const teachersRef = collection(db, 'teachers')
const q = query(teachersRef, orderBy('lab'))

export const state = () => ({
  teachers: [],
  unsubscribe: null,
})

export const mutations = {
  setTeachers(state, { teachers }) {
    const items = []
    teachers.forEach((teacher) => {
      items.push(teacher.data())
    })
    state.teachers.splice(0)
    state.teachers.push(...items)
  },
}

export const actions = {
  add({ commit }, { name, lab }) {
    return new Promise((resolve, reject) => {
      addDoc(teachersRef, { name, lab })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  async get({ commit }) {
    const teachers = await getDocs(q)
    commit('setTeachers', { teachers })
  },

  // todo update deleteの実装

  startListener({ commit }) {
    this.unsubscribe = onSnapshot(q, (teachers) => {
      commit('setTeachers', { teachers })
    })
  },

  stopListener({ commit }) {
    this.unsubscribe()
  },
}

export const getters = {
  data(state) {
    return state.teachers
  },
}
