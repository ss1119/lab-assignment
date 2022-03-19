<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="point__card" outlined>
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-container class="point__container">
        <v-row>
          <v-col cols="12" class="mt-4 mb-n4 mx-n3">
            <p class="ml-4">順位</p>
          </v-col>
          <v-col cols="12" class="mt-n4">
            <v-subheader>あなたは {{ user.rank }}位 {{ user.group }}グループ です</v-subheader>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="mt-4 mb-n4 mx-n3">
            <p class="ml-4">{{ subheader1 }}</p>
          </v-col>
          <v-col cols="12" class="mt-n4">
            <v-data-table :items-per-page="itemsPerPage" :headers="headers" :items="items" hide-default-footer class="mx-auto" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="mt-4 mb-n4 mx-n3">
            <p class="ml-4">{{ subheader2 }}</p>
          </v-col>
          <v-col cols="12" class="mt-n4">
            <v-subheader>大学院進学を{{ isGraduateText }}</v-subheader>
          </v-col>
        </v-row>
      </v-container>

      <CardButton :title="btnTitle" :icon="btnIcon" :submit="redirectEditPage" />
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { CardTitle, CardButton } from '~/components/card/index'

export default {
  name: 'UserIndex',
  components: {
    CardTitle,
    CardButton,
  },
  data() {
    return {
      title: '研究室配属希望状況の確認',
      subtitle: 'ご自身の得点や大学院進学希望状況の確認と編集ができます',
      subheader1: '得点状況',
      subheader2: '大学院進学希望状況',
      btnTitle: '得点を編集する',
      btnIcon: 'mdi-pencil',
      uid: '',
      isGraduateText: '希望しない',
      items: [],
      itemsPerPage: 20,
      headers: [
        {
          text: '教授名',
          sortable: false,
          value: 'name',
        },
        {
          text: '研究室名',
          sortable: false,
          value: 'lab',
        },
        {
          text: '得点',
          sortable: false,
          value: 'point',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/item',
      teachers: 'teachers/items',
    }),
  },
  mounted() {
    const userPoint = Object.keys(this.user.point)
    this.teachers.forEach((teacher) => {
      const item = {
        name: teacher.name,
        lab: teacher.lab,
        point: 0,
      }
      if (userPoint.includes(teacher.id)) {
        item.point = Number(this.user.point[teacher.id])
      }
      this.items.push(item)
    })
    if (this.user.isGraduate) {
      this.isGraduateText = '希望する'
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
    width: 90%;
    @include display_tab {
      max-width: 900px;
      width: 70%;
    }
  }
  &__container {
    width: 90%;
  }
}
</style>
