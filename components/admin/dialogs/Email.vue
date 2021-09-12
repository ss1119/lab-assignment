<template>
  <v-card>
    <v-container class="form__scroll">
      <v-subheader>パスワードを配信する学生の年度を選択</v-subheader>
      <v-form ref="select" class="form__wrap">
        <v-select
          ref="year"
          v-model="year"
          label="年度"
          :items="items"
          item-text="state"
          item-value="abbr"
          color="accent"
          :rules="[yearRule.required, yearRule.checked]"
        />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="toConfirm"> 確認画面へ </v-btn>
    </v-card-actions>

    <v-dialog v-model="confirmDialog" max-width="600px" @input="closeConfirm">
      <v-card>
        <v-container class="pa-8">
          {{ confirmText }} <br />
          本当によろしいですか？
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="closeConfirm"> 閉じる </v-btn>
          <v-btn color="error" text @click.stop="closeConfirm"> 配信する </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
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
      isOpen: false,
      year: '',
      yearRule: {
        required: (value) => !!value || '選択してください',
        checked: (value) => this.$checkYear(value) || '適切な年度を選択してください',
      },
      confirmDialog: false,
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
    }
  },
  computed: {
    select() {
      return {
        year: this.year,
      }
    },
    confirmText() {
      return this.year + '年度の学生にパスワードをメール配信します。'
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
      this.globalEscape()
    },
    toConfirm() {
      let confirmFlag = true
      Object.keys(this.select).forEach((f) => {
        this.$refs[f].validate(true)

        if (this.$refs[f].validationState === 'error') {
          confirmFlag = false
        }
      })

      if (confirmFlag) {
        this.globalEscape()
        this.confirmDialog = true
      }
    },
    closeConfirm() {
      this.confirmDialog = false
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
