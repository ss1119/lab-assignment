const checkYear = (value) => {
  // 2020~2099までをを検索範囲とする
  return /^(20[2-9][0-9])$/.test(value)
}

const checkID = (value) => {
  return /^[0-9a-z]+$/.test(value)
}

const checkEmail = (value) => {
  return /^[0-9a-zA-Z]+@mail4.doshisha.ac.jp$/.test(value) || value === process.env.ADMIN_EMAIL
}

const checkName = (value) => {
  return /^(\S+?)([\s]\S+)$/.test(value)
}

const checkExcel = (value) => {
  return /^.+\.xlsx$/.test(value)
}

const checkRank = (value) => {
  return /^[1-9][0-9]?$/.test(value)
}

const sleep = (millisec) => {
  return new Promise((resolve) => setTimeout(resolve, millisec))
}

export default ({ value }, inject) => {
  inject('checkYear', checkYear)
  inject('checkID', checkID)
  inject('checkEmail', checkEmail)
  inject('checkName', checkName)
  inject('checkExcel', checkExcel)
  inject('checkRank', checkRank)
  inject('sleep', sleep)
}
