export const state = () => ({
  isOpen: false,
})

export const mutations = {
  toggle(state) {
    state.isOpen = !state.isOpen
    console.log(state.isOpen)
  },
  close(state) {
    state.isOpen = false
    console.log(state.isOpen)
  },
}
