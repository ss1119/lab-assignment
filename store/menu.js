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

const adminMenu = [
  {
    name: '学生一覧',
    url: process.env.ADMIN_ROOT_URL,
  },
  {
    name: '教授一覧',
    url: process.env.ADMIN_SUB_URL,
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
  adminMenu,
  logoutMenu,
})
