<template>
  <v-row class="app__height my-3" justify="center" align-content="center">
    <v-card class="point__card" outlined>
      <CardTitle :title="title" :subtitle="subtitle" />

      <v-data-table items-per-page="20" :headers="headers" :items="items" class="my-8 mx-4" hide-default-footer />

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
      title: '得点状況の確認',
      subtitle: 'ご自身得点状況の確認と編集ができます',
      btnTitle: '得点を編集する',
      btnIcon: 'mdi-pencil',
      uid: '',
      items: [],
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
        item.point = this.user.point[teacher.id]
      }
      this.items.push(item)
    })
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
