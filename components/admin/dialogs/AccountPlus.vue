<template>
  <v-card>
    <v-card-title>学生の新規追加</v-card-title>
    <v-card-subtitle>共通の部分を必ず入力し、Excelファイルからインポートするか手動で入力してください。</v-card-subtitle>
    <v-container class="form__scroll">
      <v-subheader> 共通 </v-subheader>
      <v-form class="form__wrap">
        <v-text-field label="年度" color="accent" prepend-icon="mdi-calendar-month" required :rules="[yearRule.required, yearRule.checked]" />
      </v-form>

      <v-divider class="mt-3" />

      <v-subheader> Excelファイルから読み込む </v-subheader>
      <v-form class="form__wrap">
        <v-file-input v-model="file" label="ファイルを選択" color="accent" :rules="[fileRule.checked]" @change="loadFile"></v-file-input>
      </v-form>

      <v-divider class="mt-3" />

      <v-subheader> 手動で入力する </v-subheader>
      <v-form class="form__wrap">
        <v-text-field label="学籍番号" color="accent" prepend-icon="mdi-identifier" />
        <v-text-field label="名前（半角スペースあり）" color="accent" prepend-icon="mdi-account-arrow-left" />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="importExcel"> 保存する </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import XLSX from 'xlsx'
import crypto from 'crypto-js'

export default {
  name: 'AccountPlus',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      yearRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkYear(value) || '適切な年度を入力してください',
      },
      fileRule: {
        checked: (value) => this.$checkExcel(value) || '.xlsxのみ有効です',
      },
      file: null,
      studentData: null,
    }
  },
  mounted() {
    this.isOpen = this.open
  },
  methods: {
    globalEscape() {
      this.isOpen = false
      this.$emit('close', this.isOpen)
    },
    close() {
      this.globalEscape()
    },
    loadFile(e) {
      this.file = e
    },
    importExcel() {
      const reader = new FileReader()
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result)
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        this.studentData = []
        for (let i = 0; i < excelData.length; i = i + 1) {
          const s = { point: {}, status: 'test', isActive: true, isPointAssigned: false }
          this.appendDataAsJsonByMap(s, excelData[i], this.$excelKeyMap)
          this.appendDataAsJsonByMap(s.point, excelData[i], this.$teacherUidMap)
          if (s.isGraduate === '希望する') {
            s.isGraduate = true
          } else {
            s.isGraduate = false
          }
          s.password = this.encryptPassword(this.generatePassword())
          this.studentData.push(s)
        }
        // eslint-disable-next-line no-console
        console.log(this.studentData)
      }
      reader.readAsArrayBuffer(this.file)
      this.globalEscape()
    },
    appendDataAsJsonByMap(obj, data, map) {
      for (const key in map) {
        obj[key] = data[map[key]]
      }
    },
    generatePassword() {
      const passwordLength = 10
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const password = Array.from(window.crypto.getRandomValues(new Uint32Array(passwordLength)))
        .map((n) => S[n % S.length])
        .join('')
      return password
    },
    encryptPassword(password) {
      return crypto.AES.encrypt(password, process.env.CRYPT_JS_PASSPHRASE).toString()
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  &__scroll {
    max-height: 500px;
  }
  &__wrap {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
