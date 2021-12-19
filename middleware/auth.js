import { getUserClaims } from '~/plugins/firebase'

export default async ({ store }) => {
  const user = await getUserClaims()
  if (user) {
    if (user.claims.admin) {
      store.commit('auth/setAdminState', {
        uid: user.claims.user_id,
        email: user.claims.email,
      })
    } else {
      store.commit('auth/setLoginState', {
        uid: user.claim.user_id,
        email: user.claims.email,
      })
    }
  }
}
