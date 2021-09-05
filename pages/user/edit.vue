<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="point__card">
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-row class="ma-3">
        <!-- <v-col v-show="displayErrorMessage" cols="12">
          ダイアログ出すように変更
          <v-alert type="error" prominent outlined dense border="left" class="mx-auto">合計得点が 100 点になるように入力してください</v-alert>
        </v-col> -->
        <v-col v-for="(item, index) in items" :key="index" cols="12" lg="6" xl="6">
          <v-row>
            <v-col cols="7">
              <!-- <v-header>{{ item.laboratory }} / {{ item.teacher }}</v-header> -->
              <v-header>
                {{ item.laboratory }} / <br />
                {{ item.teacher }}
              </v-header>
              <v-subheader>現在の得点: {{ item.point }}</v-subheader>
            </v-col>
            <v-col cols="5">
              <v-text-field suffix="点" :rules="[pointRules.required, pointRules.degit]" :value="item.point"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div class="pb-8 pt-2 text-center">
        <v-btn color="accent" depressed height="48" nuxt @click.stop="redirectUserPage">
          <v-icon left> mdi-pencil </v-icon>
          得点を保存する
        </v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
// TODO 得点のValidationの設定とエラーメッセージ
import { CardTitle } from '~/components/cards/index'
export default {
  name: 'UserEdit',
  components: {
    CardTitle,
  },
  data() {
    return {
      title: '得点の編集',
      subtitle: '希望研究室への得点を設定できます',
      items: [
        {
          teacher: '先生1',
          laboratory: '研究室1',
          point: '0',
        },
        {
          teacher: '先生2',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生3',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生4',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生1',
          laboratory: '研究室1',
          point: '0',
        },
        {
          teacher: '先生2',
          laboratory: '研究室1',
          point: '0',
        },
        {
          teacher: '先生3',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生4',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生3',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生4',
          laboratory: '研究室2',
          point: '0',
        },
        {
          teacher: '先生1',
          laboratory: '研究室1',
          point: '0',
        },
        {
          teacher: '先生2',
          laboratory: '研究室1',
          point: '0',
        },
      ],
      pointRules: {
        required: (value) => !!value || '入力してください',
        degit: (value) => this.validDigit(value) || '0以上' + String(100 - this.items.length + 2) + '以下の数値を入力してください',
      },
    }
  },
  computed: {
    displayErrorMessage() {
      return this.items.reduce((sum, i) => sum + i.point, 0) === 100
    },
  },
  methods: {
    redirectUserPage() {
      this.$router.push('/user')
    },
    validDigit(value) {
      const num = 10 - this.items.length + 2
      // さすがに研究室が20個以上になることはないだろうという希望的観測を持った実装
      if (num < -10) {
        return true
      }
      if (num > -10 && num < 0) {
        const re = new RegExp('^([0-9]|[1-7][0-9]|[8][0-' + String(10 + num) + '])$')
        return re.test(value)
      } else {
        const re = new RegExp('^([0-9]|[1-8][0-9]|[9][0-' + String(num) + '])$')
        return re.test(value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.point {
  &__card {
    max-width: 1000px;
    width: 80%;
  }
}
</style>
