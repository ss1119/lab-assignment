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
    const indexQuery = query(teachersRef, orderBy('lab'))
    const teachers = await getDocs(indexQuery)
    commit('setTeachers', { teachers })
  },

  async update({ commit }, { oldName, oldLab, newName, newLab }) {
    const updateQuery = query(teachersRef, where('name', '==', oldName), where('lab', '==', oldLab))
    const docRef = await getDocs(updateQuery)
    return new Promise((resolve, reject) => {
      updateDoc(doc(db, 'teachers', docRef.docs[0].id), {
        name: newName,
        lab: newLab,
      })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  async delete({ commit }, { name, lab }) {
    const deleteQuery = query(teachersRef, where('name', '==', name), where('lab', '==', lab))
    const docRef = await getDocs(deleteQuery)
    await deleteDoc(doc(db, 'teachers', docRef.docs[0].id))
  },

  startListener({ commit }) {
    const indexQuery = query(teachersRef, orderBy('lab'))
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
