<template>
  <v-card>
    <v-card-title>研究室の新規追加</v-card-title>
    <v-alert v-if="isNotAdded" type="error" outlined dense border="left" class="mx-10">
      <div class="error__text">
        データを追加できませんでした。 <br />
        もう一度試してみてください。
      </div>
    </v-alert>
    <v-container class="form__scroll">
      <v-form class="form__wrap">
        <v-text-field
          ref="id"
          v-model="id"
          name="id"
          label="ID"
          color="accent"
          prepend-icon="mdi-badge-account-horizontal-outline"
          :rules="[idRule.required, idRule.checked]"
        />
        <v-text-field
          ref="name"
          v-model="name"
          name="name"
          label="教授名（半角スペースあり）"
          color="accent"
          prepend-icon="mdi-account"
          :rules="[nameRule.required, nameRule.checked]"
        />
        <v-text-field
          ref="lab"
          v-model="lab"
          name="lab"
          label="研究室名"
          suffix="研究室"
          color="accent"
          prepend-icon="mdi-label"
          :rules="[labRule.required]"
        />
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
      validate: false,
      isNotAdded: false,
      name: '',
      lab: '',
      idRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkLabID(value) || '半角英数字で記入してください（大文字不可）',
      },
      nameRule: {
        required: (value) => !!value || '入力してください',
        checked: (value) => this.$checkName(value) || '姓と名の間に半角スペースを1つ入力してください',
      },
      labRule: {
        required: (value) => !!value || '入力してください',
      },
    }
  },
  computed: {
    form() {
      return {
        id: this.id,
        name: this.name,
        lab: this.lab,
      }
    },
  },
  mounted() {
    this.isOpen = this.open
    this.isNotAdded = false
  },
  methods: {
    globalEscape() {
      this.isOpen = false
      this.$emit('close', this.isOpen)
    },
    reset() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    close() {
      this.reset()
      this.isNotAdded = false
      this.globalEscape()
    },
    save() {
      this.validate = false
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
        if (!this.$refs[f].valid) {
          this.validate = true
        }
      })
      if (!this.validate) {
        this.form.lab += '研究室'
        this.$store
          .dispatch('teachers/add', {
            id: this.form.id,
            name: this.form.name,
            lab: this.form.lab,
          })
          .then(() => {
            this.reset()
            this.isNotAdded = false
            this.globalEscape()
          })
          .catch((err) => {
            this.isNotAdded = true
            // eslint-disable-next-line no-console
            console.error(err.message)
          })
      }
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

.error {
  &__text {
    font-size: 14px;
  }
}
</style>
