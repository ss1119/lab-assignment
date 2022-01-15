<template>
  <v-card>
    <v-card-title>{{ cardTitle }}</v-card-title>
    <v-card-subtitle>ユーザに対して、ログイン情報を載せたメールを配信します。</v-card-subtitle>

    <v-container>
      <v-subheader>パスワードを配信する学生の年度を選択</v-subheader>
      <v-form ref="select" class="form__wrap">
        <v-select ref="year" v-model="year" label="年度" :items="years" color="accent" />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="toConfirm"> 確認画面へ </v-btn>
    </v-card-actions>

    <v-dialog v-model="confirmDialog" max-width="600px">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>

        <v-card-text>
          <p>
            {{ year }}年度の学生にログイン情報を送信します。<br />
            実行する場合は、下記フォームに「{{ confirmLabel }}」と入力してください。
          </p>
          <p>メールを送信する対象はログインができる状態にユーザです。</p>
        </v-card-text>

        <v-form class="form__wrap mx-10">
          <v-text-field v-model="value" label="確認しました" prepend-icon="mdi-alert" />
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeConfirm"> 閉じる </v-btn>
          <v-btn color="error" text :loading="loading" :disabled="disabled" @click="sendEmails"> 送信 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'

export default {
  name: 'Email',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      cardTitle: '一斉メール送信',
      isOpen: false,
      year: '',
      value: '',
      loading: false,
      confirmDialog: false,
      confirmLabel: '確認しました',
    }
  },
  computed: {
    ...mapGetters({
      years: 'users/years',
    }),
    disabled() {
      if (this.value !== this.confirmLabel) {
        return true
      } else {
        return false
      }
    },
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
      this.year = ''
      this.globalEscape()
    },
    toConfirm() {
      this.globalEscape()
      this.confirmDialog = true
    },
    openConfirm() {
      this.confirmDialog = true
    },
    closeConfirm() {
      this.value = ''
      this.year = ''
      this.confirmDialog = false
    },
    sendEmails() {
      this.loading = true
      const sendEmails = httpsCallable(functions, 'sendLoginDataBatch')
      sendEmails(this.year).then(() => {
        this.loading = false
        this.closeConfirm()
      })
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
