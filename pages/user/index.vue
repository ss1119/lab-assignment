<template>
  <v-row class="app__height" justify="center" align-content="center">
    <v-card class="point__card">
      <div class="ma-3">
        <v-card-title>
          <h4>得点状況の確認</h4>
        </v-card-title>
      </div>

      <v-divider class="mx-auto" />

      <v-data-table :headers="headers" :items="data" class="ma-8" />
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
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
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.point {
  &__card {
    max-width: 800px;
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
