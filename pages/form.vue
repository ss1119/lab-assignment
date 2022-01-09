<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="form__card" outlined>
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-row class="my-2">
        <v-col cols="12">
          <v-alert v-if="isNotSent" type="error" outlined dense border="left" class="mx-10">
            <div>
              メッセージの送信に失敗しました。<br />
              もう一度試してみてください。
            </div>
          </v-alert>
        </v-col>
        <v-form ref="form" class="mx-auto px-10 form__wrap">
          <v-text-field
            ref="email"
            v-model="email"
            dense
            outlined
            name="email"
            label="ご自身のメールアドレス"
            color="accent"
            :rules="[emailRules.required, emailRules.matched]"
          />
          <v-text-field
            ref="name"
            v-model="name"
            dense
            outlined
            name="name"
            label="お名前（半角スペースあり）"
            color="accent"
            :rules="[nameRules.required]"
          />
          <v-text-field ref="subject" v-model="subject" dense outlined name="subject" label="件名" color="accent" :rules="[subjectRules.required]" />
          <v-textarea ref="message" v-model="message" dense outlined name="message" label="本文" color="accent" :rules="[messageRules.required]" />

          <CardButton :title="btnTitle" :icon="btnIcon" :submit="toConfirm" />
        </v-form>
      </v-row>
    </v-card>

    <v-dialog v-model="dialogConfirm" max-width="600px">
      <v-card>
        <v-card-title>お問合せの確認</v-card-title>
        <v-card-text>入力した内容で、送信してもよろしいでしょうか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close"> 閉じる </v-btn>
          <v-btn color="accent" text @click="sendForm"> 送信する </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDone" max-width="600px">
      <v-card>
        <v-card-title>お問合せの完了</v-card-title>
        <v-card-text>お問い合わせの完了メールを入力したメールアドレスに送信しましたので、ご確認ください</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="redirect"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'
import { CardTitle, CardButton } from '~/components/card/index'

export default {
  name: 'Form',
  components: {
    CardTitle,
    CardButton,
  },
  data() {
    return {
      title: 'お問い合わせフォーム',
      subtitle: 'ログインできない等の問題がある場合はこちらから問い合わせてください',
      btnTitle: 'フォームを送信する',
      btnIcon: 'mdi-send',
      email: '',
      name: '',
      subject: '',
      message: '',
      emailRules: {
        required: (value) => !!value || 'メールアドレスは必須です',
        matched: (value) => this.$checkEmail(value) || '正しいメールアドレスを入力してください',
      },
      nameRules: {
        required: (value) => !!value || '姓名は必須です',
        checked: (value) => this.$checkName(value) || '姓と名の間に半角スペースを1つ入力してください',
      },
      subjectRules: {
        required: (value) => !!value || '件名は必須です',
      },
      messageRules: {
        required: (value) => !!value || '本文は必須です',
      },
      isNotSent: false,
      validate: false,
      dialogConfirm: false,
      dialogDone: false,
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        name: this.name,
        subject: this.subject,
        message: this.message,
      }
    },
  },
  methods: {
    toConfirm() {
      this.validate = false
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
        if (!this.$refs[f].valid) {
          this.validate = true
        }
      })
      if (!this.validate) {
        this.dialogConfirm = true
      }
    },
    sendForm() {
      this.dialogConfirm = false
      const sendInqueries = httpsCallable(functions, 'sendInqueries')
      sendInqueries(this.form)
        .then(() => {
          this.dialogDone = true
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err.message)
          this.close()
        })
    },
    close() {
      this.dialogConfirm = false
    },
    redirect() {
      this.dialogDone = false
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  &__card {
    min-width: 500px;
    width: 60%;
  }
  &__wrap {
    width: 100%;
  }
}
</style>
