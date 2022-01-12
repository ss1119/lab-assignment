export default ({ store, redirect, route }) => {
  const isLoggined = store.getters['auth/isLoggined']
  const isAdmin = store.getters['auth/isAdmin']
  const loginMenu = store.state.menu.loginMenu
  const adminMenu = store.state.menu.adminMenu
  const loginUrl = loginMenu.map((item) => item.url)
  const adminUrl = adminMenu.map((item) => item.url)

  // eslint-disable-next-line
  console.log(route.path)
  // eslint-disable-next-line
  console.log(loginUrl.includes(route.path))
  // eslint-disable-next-line
  console.log(adminUrl.includes(route.path))

  // ログアウト状態かつログインしている状態でしか見れないURLの場合
  if (!isLoggined && !isAdmin && (loginUrl.includes(route.path) || adminUrl.includes(route.path)) && route.path !== '/form') {
    // ログイン画面に遷移
    redirect('/')
    // eslint-disable-next-line
    console.log('1')
  }

  // ログイン状態の場合
  if (isLoggined && !isAdmin && route.path === '/') {
    redirect('/user')
    // eslint-disable-next-line
    console.log('2')
  }

  // 管理者ログイン状態の場合
  if (!isLoggined && isAdmin && route.path === '/') {
    redirect(process.env.ADMIN_ROOT_URL)
    // eslint-disable-next-line
    console.log('3')
  }

  // ログイン状態かつ管理者画面に遷移しようとした場合
  if (isLoggined && !isAdmin && adminUrl.includes(route.path)) {
    redirect('/user')
    // eslint-disable-next-line
    console.log('4')
  }

  // 管理者ログインの場合
  if (!isLoggined && isAdmin && loginUrl.includes(route.path)) {
    // 管理者画面にしか遷移できない
    redirect(process.env.ADMIN_ROOT_URL)
    // eslint-disable-next-line
    console.log('5')
  }
}
