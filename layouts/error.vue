<template>
  <v-app class="bg">
    <v-row class="app__height" justify="center" align-content="center">
      <v-card class="card" outlined>
        <CardTitle :title="cardTitle" :subtitle="subtitle" />
        <v-container>
          <v-row class="mt-5" justify="center">
            <img src="~/assets/images/404.svg" width="40%" />
          </v-row>
          <v-row class="my-10" justify="center">
            <NuxtLink to="/"> トップページへ戻る </NuxtLink>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import { CardTitle } from '~/components/card/index'
export default {
  components: {
    CardTitle,
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'ページが見つかりません',
      otherError: 'エラーが発生しました',
      subtitle: '下記のリンクからトップページに遷移してください',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  computed: {
    cardTitle() {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #f5f5f5;
}

.card {
  width: 90%;

  @include display_tab {
    width: 60%;
  }
}
</style>
