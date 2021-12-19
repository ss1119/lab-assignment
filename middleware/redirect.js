export default ({ store, redirect, route }) => {
  const isLoggined = store.getters['auth/isLoggined']
  const isAdmin = store.getters['auth/isAdmin']
  const logoutMenu = store.state.menu.logoutMenu
  const adminMenu = store.state.menu.adminMenu
  const logoutUrl = logoutMenu.map((item) => item.url)
  const adminUrl = adminMenu.map((item) => item.url)

  // ログアウト状態かつログインしている状態でしか見れないURLの場合
  if (!isLoggined && !isAdmin && !logoutUrl.includes(route.path)) {
    // ログイン画面に遷移
    redirect('/')
  }
  // ログイン状態の場合
  if ((isLoggined || isAdmin) && route.path === '/') {
    redirect('/user')
  }

  // ログイン状態かつ管理者画面に遷移しようとした場合
  if (isLoggined && !isAdmin && adminUrl.includes(route.path)) {
    redirect('/user')
  }

  // 管理者ログインの場合
  if (!isLoggined && isAdmin && !adminUrl.includes(route.path)) {
    // 管理者画面にしか遷移できない
    redirect(process.env.ADMIN_ROOT_URL)
  }
}
