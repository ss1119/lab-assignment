<template>
  <v-row class="app__height" justify="center" align-content="center">
    <v-card class="login__card">
      <div class="ma-3">
        <v-card-title>
          <h4>研究室希望配属調査</h4>
        </v-card-title>
        <v-card-subtitle>ご自身のメールアドレスと配信されたパスワードを入力してください</v-card-subtitle>
      </div>

      <v-divider class="login__divider mx-auto" />

      <div class="px-6 py-3">
        <div class="mx-auto login__wrap">
          <div class="pt-3">
            <div>
              <v-text-field
                v-model="email"
                aria-label="email"
                :rules="[emailRules.required]"
                autofocus
                dense
                height="48px"
                class="py-2"
                placeholder="メールアドレス"
              ></v-text-field>

              <v-text-field
                v-model="password"
                aria-label="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required]"
                :type="passwordShow ? 'text' : 'password'"
                dense
                height="48px"
                placeholder="パスワード"
                class="py-2"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </div>
            <div class="pb-8 pt-4">
              <v-btn color="accent" depressed height="48"> ログイン </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      email: '',
      emailRules: {
        required: (value) => !!value || 'メールアドレスは必須です',
      },
      password: '',
      passwordShow: false,
      passwordRules: {
        required: (value) => !!value || 'パスワードは必須です',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  &__card {
    max-width: 740px;
    min-width: 500px;
  }
  &__wrap {
    max-width: 344px;
  }
  &__divider {
    width: 80%;
  }
}
</style>
