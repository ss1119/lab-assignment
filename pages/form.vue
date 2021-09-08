<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="form__card" outlined>
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-row class="my-2">
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
          <v-text-field ref="name" v-model="name" dense outlined name="name" label="姓名" color="accent" :rules="[nameRules.required]" />
          <v-text-field ref="subject" v-model="subject" dense outlined name="subject" label="件名" color="accent" :rules="[subjectRules.required]" />
          <v-textarea ref="message" v-model="message" dense outlined name="message" label="本文" color="accent" :rules="[messageRules.required]" />

          <CardButton :title="btnTitle" :icon="btnIcon" :submit="sendForm" />
        </v-form>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import { CardTitle, CardButton } from '~/components/cards/index'
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
        matched: (value) => /^[a-zA-Z]+\d{4}@mail4.doshisha.ac.jp$/.test(value) || '正しいメールアドレスを入力してください',
      },
      nameRules: {
        required: (value) => !!value || '姓名は必須です',
      },
      subjectRules: {
        required: (value) => !!value || '件名は必須です',
      },
      messageRules: {
        required: (value) => !!value || '本文は必須です',
      },
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
    sendForm() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
      })
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
