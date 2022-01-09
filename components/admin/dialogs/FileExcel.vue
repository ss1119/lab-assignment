<template>
  <v-card>
    <v-card-title>Excelファイルを出力</v-card-title>
    <v-container>
      <v-subheader>出力する学生の年度</v-subheader>
      <v-form class="form__wrap">
        <v-select label="年度" :items="items" item-text="state" item-value="abbr" color="accent" :value="year" @change="fetchYear" />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="downloadExcel"> ダウンロード </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import XLSX from 'xlsx'
import crypto from 'crypto-js'

export default {
  name: 'FileExcel',
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
      year: '',
      items: [
        {
          state: '2020',
          abbr: '2020',
        },
        {
          state: '2021',
          abbr: '2021',
        },
        {
          state: '2022',
          abbr: '2022',
        },
      ],
      studentData: {
        2022: [
          {
            id: '1316200127',
            name: '中井綾一',
            mail: 'ctwf0127@mail4.doshisha.ac.jp',
            password: 'U2FsdGVkX1+tx56qGBkqZ0nq4LM2xL96j+qUPVV9c/s=',
            is_test: 'test',
            is_active: true,
            is_point_assigned: false,
            group: 1,
            rank: 39,
            shingaku: true,
            point: {
              0: 1,
              1: 2,
              2: 3,
              3: 4,
              4: 5,
              5: 6,
              6: 7,
              7: 8,
              8: 9,
              9: 10,
              10: 11,
            },
          },
        ],
        2021: [
          {
            id: '1316200127',
            name: '中井綾一',
            mail: 'ctwf0127@mail4.doshisha.ac.jp',
            password: 'U2FsdGVkX1+tx56qGBkqZ0nq4LM2xL96j+qUPVV9c/s=',
            is_test: 'test',
            is_active: true,
            is_point_assigned: false,
            group: 1,
            rank: 39,
            shingaku: false,
            point: {
              0: 2,
              1: 4,
              2: 6,
              3: 8,
              4: 10,
              5: 12,
              6: 14,
              7: 16,
              8: 18,
              9: 20,
              10: 22,
            },
          },
        ],
      },
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
    fetchYear(e) {
      this.year = e
    },
    downloadExcel() {
      const wb = XLSX.utils.book_new()
      const selectedYearData = this.$data.studentData[this.year]
      const excelData = []
      for (let i = 0; i < selectedYearData.length; i = i + 1) {
        const s = {}
        selectedYearData[i].password = this.decryptPassword(selectedYearData[i].password)
        this.appendDataAsExcelByMap(s, selectedYearData[i], this.$excelKeyMap)
        this.appendDataAsExcelByMap(s, selectedYearData[i].point, this.$teacherUidMap)
        if (s['進学希望の確認'] === true) {
          delete s['進学希望の確認']
          s['進学希望の確認'] = '希望する'
        } else {
          delete s['進学希望の確認']
          s['進学希望の確認'] = '希望しない'
        }
        excelData.push(s)
      }
      const sheet = XLSX.utils.json_to_sheet(excelData)
      const filename = this.year + '年度.xlsx'
      XLSX.utils.book_append_sheet(wb, sheet, this.year + '年度')
      XLSX.writeFile(wb, filename)
      this.globalEscape()
    },
    appendDataAsExcelByMap(obj, data, map) {
      for (const key in map) {
        obj[map[key]] = data[key]
      }
    },
    decryptPassword(password) {
      return crypto.AES.decrypt(password, process.env.CRYPT_JS_PASSPHRASE).toString(crypto.enc.Utf8)
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  &__wrap {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
