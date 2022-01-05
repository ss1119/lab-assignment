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
      studentData: [
        {
          id: '123456789',
          name: '中井凌一',
          order: 10,
          group: 1,
          pass: 'hoge',
          mail: 'nislabA@mail/com',
          sato: 1,
          koita: 2,
          tsuchiya: 3,
          ohkubo: 4,
          imoto: 5,
          katagiri: 6,
          ohsaki: 7,
          takahashi: 8,
          shimohara: 9,
          tanev: 10,
          tamura: 11,
          continue: '希望する',
        },
        {
          id: '234567890',
          name: '奥西理貴',
          order: 50,
          group: 2,
          pass: 'fuga',
          mail: 'nislabB@mail/com',
          sato: 2,
          koita: 4,
          tsuchiya: 6,
          ohkubo: 8,
          imoto: 10,
          katagiri: 12,
          ohsaki: 14,
          takahashi: 16,
          shimohara: 18,
          tanev: 20,
          tamura: 22,
          continue: '希望しない',
        },
      ],
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
      this.$data.year = e
    },
    downloadExcel() {
      const wb = XLSX.utils.book_new()
      const sheet = XLSX.utils.json_to_sheet(this.$data.studentData)
      const filename = this.$data.year + '年度.xlsx'
      XLSX.utils.book_append_sheet(wb, sheet, this.$data.year + '年度')
      XLSX.writeFile(wb, filename)
      this.globalEscape()
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
