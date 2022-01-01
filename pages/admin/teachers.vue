<template>
  <div class="app__height">
    <Menu v-model="search.value" :icon="menuIcon" :title="menuTitle" :search="search" :buttons="btnItems" />

    <v-container class="my-3 teacher__height" fluid>
      <v-row justify="center" align="center" class="teacher__height">
        <v-card class="table__card" outlined>
          <CardTitle :title="cardTitle" :subtitle="cardSubtitle" />

          <v-data-table
            :search="search.value"
            :headers="headers"
            :items="teachers"
            hide-default-footer
            logding-text="loading-text"
            locale="ja-jp"
            class="elevation-0 ma-4"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <v-icon small class="mr-2" @click.stop="editItem(item)"> mdi-pencil </v-icon>
              <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title>研究室の編集</v-card-title>
        <v-container class="form__scroll">
          <v-form class="form__wrap">
            <v-text-field label="教授名（半角スペースあり）" color="accent" prepend-icon="mdi-account" />
            <v-text-field label="研究室名" color="accent" prepend-icon="mdi-label" />
          </v-form>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeEdit"> 閉じる </v-btn>
          <v-btn color="accent" text @click="saveEdit"> 保存する </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title>研究室の削除</v-card-title>
        <v-card-text>本当に削除してよろしいですか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDelete"> 閉じる </v-btn>
          <v-btn color="error" text @click="saveDelete"> 削除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CardTitle } from '~/components/card/index'
import { Menu } from '~/components/admin/index'

export default {
  name: 'AdminTeachers',
  components: {
    CardTitle,
    Menu,
  },
  data() {
    return {
      menuTitle: '教授一覧',
      menuIcon: 'mdi-school',
      search: {
        isDisplay: true,
        value: '',
      },
      btnItems: {
        accountPlus: {
          icon: 'mdi-account-plus',
          color: 'accent',
          title: '新規追加',
          disabled: false,
          displayDialog: true,
          slotName: 'teacher-plus',
        },
      },
      cardTitle: '研究室の管理',
      cardSubtitle: '研究室の新規作成や削除を行うことができます',
      headers: [
        {
          text: '教授名',
          sortable: true,
          value: 'name',
        },
        {
          text: '研究室名',
          sortable: true,
          value: 'lab',
        },
        {
          text: '編集/削除',
          value: 'action',
          width: '120',
          sortable: false,
        },
      ],
      // teachers: [],
      loadingText: '現在データを取得中です。しばらくお待ちください。',
      dialogDelete: false,
      dialogEdit: false,
      editedItem: {
        name: '',
        lab: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/data',
    }),
  },
  // created() {
  //   this.$store.dispatch('teachers/get').then((teachers) => {
  //     this.teachers = teachers
  //   })
  // },
  created() {
    this.$store.dispatch('teachers/get')
  },
  mounted() {
    this.startListener()
  },
  beforeDestroy() {
    this.stopListener()
  },
  methods: {
    ...mapActions({
      startListener: 'teachers/startListener',
      stopListener: 'teachers/stopListener',
    }),
    editItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },
    deleteItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeEdit() {
      this.dialogEdit = false
    },
    closeDelete() {
      this.dialogDelete = false
    },
    saveEdit() {
      this.dialogEdit = false
    },
    saveDelete() {
      this.dialogDelete = false
    },
  },
}
</script>

<style lang="scss" scoped>
.teacher {
  &__height {
    height: 92%;
  }
}
.table {
  &__card {
    width: 60%;
  }
}
</style>
