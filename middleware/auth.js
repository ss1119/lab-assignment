import { getUserClaims } from '~/plugins/firebase'

export default async ({ store }) => {
  const user = await getUserClaims()
  if (user) {
    if (user.claims.admin) {
      store.commit('auth/setAdminState', {
        uid: user.claims.user_id,
        name: user.claims.name,
        email: user.claims.email,
      })
    } else {
      store.commit('auth/setLoginState', {
        uid: user.claims.user_id,
        name: user.claims.name,
        email: user.claims.email,
      })
      await store.dispatch('users/getOne', {
        uid: user.claims.user_id,
      })
      await store.dispatch('teachers/get')
    }
  }
}
