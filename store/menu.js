const loginMenu = [
  {
    name: '得点確認',
    url: '/user',
  },
  {
    name: 'お問い合わせ',
    url: '/form',
  },
  {
    name: 'ログアウト',
    url: '/signout',
  },
]

const logoutMenu = [
  {
    name: 'ログイン',
    url: '/',
  },
  {
    name: 'お問い合わせ',
    url: '/form',
  },
]

export const state = () => ({
  loginMenu,
  logoutMenu,
})
