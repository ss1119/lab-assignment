<template>
  <v-card>
    <v-card-title>ログイン権限の変更</v-card-title>

    <v-card-text>
      <p>
        この操作をすると、選択された学生のログイン権限が変更されてしまいます。<br />
        （ログイン可の学生がログイン不可に、ログイン不可の学生がログイン可に）
      </p>
      <p>実行する場合は、下記フォームに「{{ confirmLabel }}」と入力してください。</p>
    </v-card-text>

    <v-form class="form__wrap">
      <v-text-field :value="value" label="確認しました" prepend-icon="mdi-alert" @input="confirmValue" />
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="close"> 閉じる </v-btn>
      <v-btn color="error" text :disabled="disabled" @click="save"> 変更 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AccountOff',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      value: '',
      confirmLabel: '確認しました',
      disabled: true,
    }
  },
  mounted() {
    this.isOpen = this.open
  },
  methods: {
    confirmValue(value) {
      if (value === this.confirmLabel) {
        this.disabled = false
      }
    },
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
  &__wrap {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
