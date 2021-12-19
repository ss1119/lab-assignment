export default ({ store, redirect, route }) => {
  const isLoggined = store.getters['auth/isLoggined']
  const logoutMenu = store.state.menu.logoutMenu
  const logoutUrl = logoutMenu.map((item) => item.url)

  // ログアウト状態かつログインしている状態でしか見れないURLの場合
  if (!isLoggined && !logoutUrl.includes(route.path)) {
    // ログイン画面に遷移
    redirect('/')
  }

  // ログイン状態の場合
  if (isLoggined && route.path === '/') {
    // ログイン画面を見せないようにする
    redirect('/user')
  }
}
