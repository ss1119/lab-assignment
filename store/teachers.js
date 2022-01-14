import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

const teachersRef = collection(db, 'teachers')

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
  add({ commit }, { id, name, lab }) {
    return new Promise((resolve, reject) => {
      addDoc(teachersRef, { id, name, lab })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  get({ commit }) {
    const indexQuery = query(teachersRef, orderBy('id'))
    return new Promise((resolve, reject) => {
      getDocs(indexQuery).then((teachers) => {
        commit('setTeachers', { teachers })
        resolve(teachers)
      })
    })
  },

  async update({ commit }, { id, name, lab }) {
    const updateQuery = query(teachersRef, where('id', '==', id))
    const docRef = await getDocs(updateQuery)
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, 'teachers', docRef.docs[0].id), {
        id,
        name,
        lab,
      })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  async delete({ commit }, { id }) {
    const deleteQuery = query(teachersRef, where('id', '==', id))
    const docRef = await getDocs(deleteQuery)
    await deleteDoc(doc(db, 'teachers', docRef.docs[0].id))
  },

  startListener({ commit }) {
    const indexQuery = query(teachersRef, orderBy('id'))
    this.unsubscribe = onSnapshot(indexQuery, (teachers) => {
      commit('setTeachers', { teachers })
    })
  },

  stopListener({ commit }) {
    this.unsubscribe()
  },
}

export const getters = {
  items(state) {
    return state.teachers
  },
}
