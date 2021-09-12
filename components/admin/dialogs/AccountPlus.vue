<template>
  <v-card>
    <v-container class="form__scroll">
      <v-subheader> 共通 </v-subheader>
      <v-form class="form__wrap">
        <v-text-field label="年度" color="accent" prepend-icon="mdi-calendar-month" required :rules="[yearRule.required, yearRule.checked]" />
      </v-form>

      <v-divider class="mt-3" />

      <v-subheader> Excelファイルから読み込む </v-subheader>
      <v-form class="form__wrap">
        <v-file-input label="ファイルを選択" color="accent" :rules="[fileRule.checked]"></v-file-input>
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
      <v-btn color="blue darken-1" text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="blue darken-1" text @click.stop="save"> 保存する </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    save() {
      this.globalEscape()
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
