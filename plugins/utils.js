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

const excelKeyMap = {
  id: '学生ID',
  name: '氏名',
  rank: '順位',
  group: 'グループ',
  password: 'パスワード',
  mail: 'メールアドレス',
  shingaku: '進学希望の確認',
}

const teacherUidMap = {
  0: '土屋',
  1: '大久保',
  2: '井本',
  3: '佐藤',
  4: '小板',
  5: '片桐',
  6: '大崎',
  7: '高橋',
  8: '下原',
  9: 'タネブ',
  10: '田村',
}

export default ({ value }, inject) => {
  inject('checkYear', checkYear)
  inject('checkStudentID', checkStudentID)
  inject('checkEmail', checkEmail)
  inject('checkName', checkName)
  inject('checkExcel', checkExcel)
  inject('excelKeyMap', excelKeyMap)
  inject('teacherUidMap', teacherUidMap)
}
