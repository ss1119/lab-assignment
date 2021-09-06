<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="point__card">
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-row class="my-2 mx-10">
        <v-col cols="12">
          <v-alert v-if="hasExceptVal || isNotMatched || hasTwoZeros" prominent type="error" outlined dense border="left" class="mx-auto">
            <ul>
              <li v-if="hasExceptVal">与えられた数値を入力してください</li>
              <li v-if="isNotMatched">合計得点が 100 点になるように入力してください</li>
              <li v-if="hasTwoZeros">0 点が 2 つ以上にならないように入力してください</li>
            </ul>
          </v-alert>
        </v-col>
        <v-col v-for="(item, index) in items" :key="index" cols="12" lg="6" xl="6">
          <v-row>
            <v-col cols="7">
              <v-subheader class="black--text">
                {{ item.laboratory }} / <br />
                {{ item.teacher }}
              </v-subheader>
              <v-subheader>以前の得点: {{ oldPoints[index] }}点</v-subheader>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="item.point"
                suffix="点"
                :rules="[pointRules.required, pointRules.degit, pointRules.over]"
                :value="item.point"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <CardButton :title="btnTitle" :icon="btnIcon" :submit="postPoints" />
    </v-card>
  </v-row>
</template>

<script>
// TODO 得点のValidationの設定とエラーメッセージ
import { CardTitle, CardButton } from '~/components/cards/index'
export default {
  name: 'UserEdit',
  components: {
    CardTitle,
    CardButton,
  },
  data() {
    return {
      title: '得点の編集',
      subtitle: '希望研究室への得点を設定できます',
      btnTitle: '得点を保存する',
      btnIcon: 'mdi-pencil',
      hasExceptVal: false, // 入力フォームに与えられた数値が入力されているか
      isNotMatched: false, // 合計点と一致しているか
      hasTwoZeros: false, // 0点が2つ以上存在していないか
      oldPoints: [],
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
        // eslint-disable-next-line prettier/prettier
        over: (value) => ( this.totalPoint <= 100 || value === '0' ) || '合計で100点になるように入力してください',
      },
    }
  },
  computed: {
    totalPoint() {
      return this.items.reduce((sum, item) => sum + Number(item.point), 0)
    },
  },
  mounted() {
    this.setOldPoints()
  },
  methods: {
    setOldPoints() {
      const points = this.items.map((item) => item.point)
      this.oldPoints = points.slice()
    },
    postPoints() {
      let cnt = 0
      let sum = 0
      this.hasExceptVal = false
      this.isNotMatched = false
      this.hasTwoZeros = false

      for (const item of this.items) {
        // フォームのルールに沿わない値が入力されているかのチェック
        if (!this.validDigit(item.point) || item.point == null || item.point === '') {
          this.hasExceptVal = true
        }

        if (item.point === '0') {
          cnt++
        }

        sum += Number(item.point)
      }

      // 合計点が100点になっているかチェック
      if (sum !== 100) {
        this.isNotMatched = true
      }

      // 0点が2つ以上存在するかチェック
      if (cnt > 1) {
        this.hasTwoZeros = true
      }

      if (!this.hasExceptVal && !this.isNotMatched && !this.hasTwoZeros) {
        this.$router.push('/user')
      }
    },
    validDigit(value) {
      const num = 10 - this.items.length + 2
      // 研究室が20個以上になることはないだろうという希望的観測を持った実装
      // 20個以上できた時はValidationを出さない（その時は誰か実装頼みます）
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
