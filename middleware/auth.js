import { initFirebaseAuth } from '~/plugins/firebase'

export default async ({ store }) => {
  const user = await initFirebaseAuth()
  if (user) {
    store.commit('auth/setLoginState', {
      uid: user.uid,
      email: user.email,
    })
  }
}
