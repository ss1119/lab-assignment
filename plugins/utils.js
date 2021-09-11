const checkYear = (value) => {
  // 2020~2099までをを検索範囲とする
  return /^(20[2-9][0-9])$/.test(value)
}

const checkEmail = (value) => {
  return /^[a-zA-Z]+\d{4}@mail4.doshisha.ac.jp$/.test(value)
}

export default ({ value }, inject) => {
  inject('checkYear', checkYear)
  inject('checkEmail', checkEmail)
}
