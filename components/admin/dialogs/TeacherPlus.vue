<template>
  <v-card>
    <v-card-title>研究室の新規追加</v-card-title>
    <v-container class="form__scroll">
      <v-form class="form__wrap">
        <v-text-field label="教授名（半角スペースあり）" color="accent" prepend-icon="mdi-account" />
        <v-text-field label="研究室名" color="accent" prepend-icon="mdi-label" />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="save"> 保存する </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TeacherPlus',
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
