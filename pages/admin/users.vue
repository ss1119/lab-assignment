<template>
  <div>
    <AdminMenu :icon="menuIcon" :title="menuTitle" :selects="selectsItems" :buttons="btnItems" />
    <v-container class="app__height my-3">
      <v-row justify="center" align-content="center">
        <v-card class="form__card" outlined>
          <CardTitle :title="cardTitle" :subtitle="cardSubtitle" />
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CardTitle, CardButton } from '~/components/cards/index'
import { AdminMenu } from '~/components/admin/index'
export default {
  name: 'AdminUsers',
  components: {
    CardTitle,
    CardButton,
    AdminMenu,
  },
  data() {
    return {
      menuTitle: 'ユーザ一覧',
      menuIcon: 'mdi-account-multiple',
      selectsItems: {
        isDisplay: true,
        items: [
          {
            state: '全て',
            abbr: 'all',
          },
          {
            state: '2020',
            abbr: '2020',
          },
        ],
      },
      btnItems: {
        accountPlus: {
          icon: 'mdi-account-plus',
          color: 'accent',
          title: '新規追加',
          disabled: false,
        },
        fileExport: {
          icon: 'mdi-file-export',
          color: 'accent',
          title: 'csv出力',
          disabled: true,
        },
        email: {
          icon: 'mdi-email',
          color: 'warning',
          title: 'メール配信',
          disabled: true,
        },
        accountOff: {
          icon: 'mdi-account-off',
          color: 'error',
          title: '権限変更',
          disabled: true,
        },
      },
      cardTitle: 'ユーザの管理',
      cardSubtitle: 'ユーザに対して、メールの送信やログイン権限の変更ができます',
    }
  },
}
</script>

<style></style>
