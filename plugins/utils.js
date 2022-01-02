const checkYear = (value) => {
  // 2020~2099までをを検索範囲とする
  return /^(20[2-9][0-9])$/.test(value)
}

const checkStudentID = (value) => {
  return /^[0-9a-zA-Z]/.test(value)
}

const checkEmail = (value) => {
  return /^[0-9a-zA-Z]+@mail4.doshisha.ac.jp$/.test(value) || value === process.env.ADMIN_EMAIL
}

const checkName = (value) => {
  return /^(\S+?)( \S+)$/.test(value)
}

const checkExcel = (value) => {
  return /.+\.xlsx$/.test(value)
}

export default ({ value }, inject) => {
  inject('checkYear', checkYear)
  inject('checkStudentID', checkStudentID)
  inject('checkEmail', checkEmail)
  inject('checkName', checkName)
  inject('checkExcel', checkExcel)
}
