<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="point__card">
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-data-table :headers="headers" :items="data" class="my-8 mx-4" hide-default-footer />

      <div class="pb-8 pt-2 text-center">
        <v-btn color="accent" depressed height="48" nuxt @click.stop="redirectEditPage">
          <v-icon left> mdi-pencil </v-icon>
          得点を編集する
        </v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { CardTitle } from '~/components/cards/index'
export default {
  components: {
    CardTitle,
  },
  data() {
    return {
      title: '得点状況の確認',
      subtitle: 'ご自身得点状況の確認と編集ができます',
      headers: [
        {
          text: '教授名',
          sortable: false,
          value: 'teacher',
        },
        {
          text: '研究室名',
          sortable: false,
          value: 'laboratory',
        },
        {
          text: '得点',
          value: 'point',
        },
      ],
      data: [
        {
          teacher: '先生1',
          laboratory: '研究室1',
          point: '1',
        },
        {
          teacher: '先生2',
          laboratory: '研究室1',
          point: '1',
        },
        {
          teacher: '先生3',
          laboratory: '研究室2',
          point: '1',
        },
        {
          teacher: '先生4',
          laboratory: '研究室2',
          point: '1',
        },
      ],
    }
  },
  methods: {
    redirectEditPage() {
      this.$router.push('/user/edit')
    },
  },
}
</script>

<style lang="scss" scoped>
.point {
  &__card {
    max-width: 900px;
    width: 70%;
    min-width: 400px;
  }
}
</style>
