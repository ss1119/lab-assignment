<template>
  <v-card>
    <v-container class="form__scroll">
      <v-subheader>Excelファイルを出力</v-subheader>
      <v-form class="form__wrap">
        <v-select label="年度" :items="items" item-text="state" item-value="abbr" color="accent" :value="year" />
      </v-form>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click.stop="close"> 閉じる </v-btn>
      <v-btn color="accent" text @click.stop="save"> ダウンロード </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
