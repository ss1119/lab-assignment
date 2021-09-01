module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  // required to lint *.vue files
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
}
