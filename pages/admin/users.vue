<template>
  <div>
    <Menu v-model="search.value" :icon="menuIcon" :title="menuTitle" :search="search" :buttons="btnItems" />

    <v-container class="my-3" fluid>
      <v-row justify="center">
        <v-card class="table__card" outlined>
          <CardTitle :title="cardTitle" :subtitle="cardSubtitle" />

          <v-data-table
            v-model="checked"
            :search="search.value"
            :headers="headers"
            :items="items"
            :single-select="singleSelect"
            item-key="id"
            show-select
            logding-text="loading-text"
            locale="ja-jp"
            class="elevation-0 ma-4"
            @toggle-select-all="selectAllCheck($event)"
            @item-selected="selectCheck($event)"
          />
        </v-card>
      </v-row>
    </v-container>

    <DangerPanel />
  </div>
</template>

<script>
import { CardTitle } from '~/components/card/index'
import { Menu, DangerPanel } from '~/components/admin/index'
export default {
  name: 'AdminUsers',
  components: {
    CardTitle,
    Menu,
    DangerPanel,
  },
  middleware: 'auth',
  data() {
    return {
      menuTitle: '学生一覧',
      menuIcon: 'mdi-account-multiple',
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
          slotName: 'account-plus',
        },
        email: {
          icon: 'mdi-email',
          color: 'accent',
          title: 'メール配信',
          disabled: false,
          displayDialog: true,
          slotName: 'email',
        },
        fileExcel: {
          icon: 'mdi-file-excel',
          color: 'accent',
          title: 'Excel出力',
          disabled: false,
          displayDialog: true,
          slotName: 'file-excel',
        },
        accountOff: {
          icon: 'mdi-account-off',
          color: 'error',
          title: '権限変更',
          disabled: true,
          displayDialog: true,
          slotName: 'account-off',
        },
      },
      cardTitle: 'ユーザの管理',
      cardSubtitle: 'ユーザに対して、メールの送信やログイン権限の変更ができます',
      singleSelect: false,
      checked: [],
      headers: [
        {
          text: '学籍番号',
          sortable: true,
          value: 'id',
        },
        {
          text: '名前',
          sortable: false,
          value: 'name',
        },
        {
          text: 'メールアドレス',
          sortable: false,
          filterable: false,
          value: 'mail',
        },
        {
          text: '希望設定済み',
          filterable: false,
          value: 'is_point_assigned',
        },
        {
          text: 'テスト/本番',
          filterable: false,
          value: 'is_test',
        },
        {
          text: 'ログイン可',
          filterable: false,
          value: 'is_active',
        },
        {
          text: '年度',
          value: 'year',
        },
      ],
      loadingText: '現在データを取得中です。しばらくお待ちください。',
      items: [
        {
          id: 'ctwf0127',
          name: '中井 綾一',
          mail: 'aaaa@mail4.doshisha.ac.jp',
          is_point_assigned: 'Yes',
          is_test: '本番',
          is_active: '可',
          year: '2021',
        },
        {
          id: 'ctwf0133',
          name: '竹内 一馬',
          mail: 'aaaa@mail4.doshisha.ac.jp',
          is_point_assigned: 'Yes',
          is_test: '本番',
          is_active: '可',
          year: '2022',
        },
        {
          id: 'ctwf0135',
          name: '細野 航平',
          mail: 'aaaa@mail4.doshisha.ac.jp',
          is_point_assigned: 'Yes',
          is_test: '本番',
          is_active: '可',
          year: '2021',
        },
        {
          id: 'ctwf0125',
          name: '中田 輝',
          mail: 'aaaa@mail4.doshisha.ac.jp',
          is_point_assigned: 'Yes',
          is_test: '本番',
          is_active: '可',
          year: '2021',
        },
      ],
    }
  },
  methods: {
    selectAllCheck(event) {
      if (event.value) {
        this.btnItems.accountOff.disabled = false
      } else {
        this.btnItems.accountOff.disabled = true
      }
    },
    selectCheck(event) {
      if (event.value) {
        this.btnItems.accountOff.disabled = false
      }
      if (!event.value && this.checked.length === 1) {
        this.btnItems.accountOff.disabled = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  &__card {
    width: 90%;
  }
}
</style>
