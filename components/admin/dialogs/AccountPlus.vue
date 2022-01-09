<template>
  <v-card>
    <v-card-title>{{ cardTitle }}</v-card-title>
    <v-card-subtitle>{{ cardSubTitle }}</v-card-subtitle>

    <v-list>
      <v-list-item-group>
        <v-list-item @click="excelDialogOpen">
          <v-list-item-icon>
            <v-icon v-text="excel.icon" />
          </v-list-item-icon>
          <v-list-item-content v-text="excel.text" />
        </v-list-item>
        <v-list-item @click="manualDialogOpen">
          <v-list-item-icon>
            <v-icon v-text="manual.icon" />
          </v-list-item-icon>
          <v-list-item-content v-text="manual.text" />
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="isExcelDialogOpen" max-width="600px">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>
        <v-container class="form__scroll">
          <v-subheader> 年度 </v-subheader>
          <v-form class="form__wrap">
            <v-text-field
              ref="year"
              v-model="excel.year"
              label="年度"
              name="year"
              color="accent"
              prepend-icon="mdi-calendar-month"
              required
              :rules="[yearRule.required, yearRule.checked]"
            />
          </v-form>

          <v-divider class="mt-3" />

          <v-subheader> Excelファイル </v-subheader>
          <v-form class="form__wrap">
            <v-file-input
              ref="file"
              label="ファイルを選択"
              name="file"
              accept="xlsx"
              color="accent"
              required
              :rules="[fileRule.checked]"
              @change="loadFile"
            />
          </v-form>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="excelDialogClose"> 閉じる </v-btn>
          <v-btn color="accent" text @click.stop="createUsersByExcel"> 保存する </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isManualDialogOpen" max-width="600px">
      <v-card>
        <v-container class="form__scroll">
          <v-subheader> 年度 </v-subheader>
          <v-form class="form__wrap">
            <v-text-field
              ref="year"
              v-model="manual.year"
              label="年度"
              name="year"
              color="accent"
              prepend-icon="mdi-calendar-month"
              required
              :rules="[yearRule.required, yearRule.checked]"
            />
          </v-form>

          <v-divider class="mt-3" />

          <v-subheader> ユーザ情報 </v-subheader>
          <v-form class="form__wrap">
            <v-text-field
              ref="id"
              v-model="manual.id"
              name="id"
              label="学籍番号"
              color="accent"
              prepend-icon="mdi-identifier"
              :rules="[idRule.required, idRule.checked]"
            />
            <v-text-field
              ref="name"
              v-model="manual.name"
              name="name"
              label="名前（半角スペースあり）"
              color="accent"
              prepend-icon="mdi-account-arrow-left"
              :rules="[nameRule.required, nameRule.checked]"
            />
            <v-text-field
              ref="mail"
              v-model="manual.mail"
              name="mail"
              label="メールアドレス"
              color="accent"
              prepend-icon="mdi-email"
              :rules="[mailRule.required, mailRule.checked]"
            />
            <v-text-field
              ref="rank"
              v-model="manual.rank"
              name="rank"
              label="順位"
              color="accent"
              prepend-icon="mdi-format-list-numbered"
              :rules="[rankRule.required, rankRule.checked]"
            />
            <v-select
              ref="group"
              v-model="manual.group"
              :items="selectItems"
              name="group"
              label="順位グループ"
              color="accent"
              prepend-icon="mdi-account-group"
              :rules="[groupRule.required]"
            />
          </v-form>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="manualDialogClose"> 閉じる </v-btn>
          <v-btn color="accent" text @click.stop="createUserByManual"> 保存する </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import XLSX from 'xlsx'
import crypto from 'crypto-js'
import { mapGetters } from 'vuex'

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
      isExcelDialogOpen: false,
      isManualDialogOpen: false,
      validate: false,
      cardTitle: '学生の新規追加',
      cardSubTitle: 'Excelファイルからインポートするか手動で入力するかを選択してください。',
      excel: {
        icon: 'mdi-file-excel',
        text: 'Excelファイルからインポート',
        year: '',
        file: {},
      },
      manual: {
        icon: 'mdi-account-plus',
        text: '手動で入力',
        year: '',
        id: '',
        name: '',
        rank: '',
        group: '',
        mail: '',
      },
      selectItems: ['1', '2', '3'],
      yearRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkYear(value) || '適切な年度を入力してください',
      },
      fileRule: {
        required: (value) => !!value || 'ファイルを選択してください',
        checked: (value) => (!!value && this.$checkExcel(value.name)) || '.xlsxのみ有効です',
      },
      idRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkID(value) || '正しい学籍番号を入力してください',
      },
      nameRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkName(value) || '姓と名の間に半角スペースを1つ入力してください',
      },
      mailRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkEmail(value) || '正しいメールアドレスを入力してください',
      },
      rankRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkRank(value) || '1から99の間で入力してください',
      },
      groupRule: {
        required: (value) => !!value || '選択してください',
      },
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/items',
    }),
    excelForm() {
      return {
        year: this.excel.year,
        file: this.excel.file,
      }
    },
    manualForm() {
      return {
        year: this.manual.year,
        id: this.manual.id,
        name: this.manual.name,
        rank: this.manual.rank,
        group: this.manual.group,
        mail: this.manual.mail,
      }
    },
  },
  mounted() {
    this.isOpen = this.open
    if (this.teachers.length === 0) {
      this.$store.dispatch('teachers/get')
    }
  },
  methods: {
    globalEscape() {
      this.isOpen = false
      this.$emit('close', this.isOpen)
    },
    excelDialogOpen() {
      this.globalEscape()
      this.isExcelDialogOpen = true
    },
    manualDialogOpen() {
      this.globalEscape()
      this.isManualDialogOpen = true
    },
    excelDialogClose() {
      this.isExcelDialogOpen = false
    },
    manualDialogClose() {
      this.isManualDialogOpen = false
    },
    loadFile(e) {
      this.excel.file = e
    },
    createUsersByExcel() {
      this.validate = false
      Object.keys(this.excelForm).forEach((f) => {
        this.$refs[f].validate(true)
        if (!this.$refs[f].valid) {
          this.validate = true
        }
      })
      if (!this.validate) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result)
          const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          this.studentData = []
          for (let i = 0; i < excelData.length; i = i + 1) {
            const s = {
              status: 'test',
              isActive: true,
              isPointAssigned: false,
              isGraduate: false,
              point: {},
            }
            this.appendDataAsJsonByMap(s, excelData[i], this.$store.state.excel.keyMap)
            this.appendPointAsJsonByList(
              s.point,
              this.teachers.map((obj) => obj.id)
            )
            s.password = this.encryptPassword(this.generatePassword())
            this.studentData.push(s)
          }
          // eslint-disable-next-line no-console
          console.log(this.studentData)
        }
        reader.readAsArrayBuffer(this.excel.file)
        this.excelDialogClose()
      }
    },
    createUserByManual() {
      this.validate = false
      Object.keys(this.manualForm).forEach((f) => {
        this.$refs[f].validate(true)
        if (!this.$refs[f].valid) {
          this.validate = true
        }
      })
      if (!this.validate) {
        const s = {
          id: this.manualForm.id,
          name: this.manualForm.name,
          rank: this.manualForm.rank,
          group: this.manualForm.group,
          mail: this.manualForm.mail,
          status: 'test',
          isActive: true,
          isPointAssigned: false,
          isGraduate: false,
          point: {},
        }
        s.password = this.encryptPassword(this.generatePassword())
        this.appendPointAsJsonByList(
          s.point,
          this.teachers.map((obj) => obj.id)
        )
        // eslint-disable-next-line no-console
        console.log(s)
        this.manualDialogClose()
      }
    },
    appendDataAsJsonByMap(obj, data, map) {
      for (const key in map) {
        obj[key] = data[map[key]]
      }
    },
    appendPointAsJsonByList(obj, list) {
      for (const key in list) {
        obj[list[key]] = 0
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
    max-height: 600px;
  }
  &__wrap {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
