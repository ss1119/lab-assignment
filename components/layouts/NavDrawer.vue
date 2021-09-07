<template>
  <v-navigation-drawer v-model="drawer" app temporary stateless>
    <v-list>
      <v-list-item>
        <v-btn color="primary" outlined @click="close">
          <v-icon dark left>mdi-arrow-left</v-icon>
          閉じる
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-list-content>
          <v-list-item-title>ようこそ、{{ firstName }}さん</v-list-item-title>
          <v-list-item-subtitle class="grey--text">{{ mail }}</v-list-item-subtitle>
        </v-list-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in menuItems" :key="index" @click="close">
          <v-list-item-title>
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'NavDrawer',
  data() {
    return {
      firstName: 'Nakai',
      mail: 'ctwf0127@mail4.doshisha.ac.jp',
      menuItems: [
        {
          name: '得点確認',
          url: '/user',
        },
        {
          name: '得点の編集',
          url: '/user/edit',
        },
        {
          name: 'お問い合わせ',
          url: '/form',
        },
        {
          name: 'ログアウト',
          url: '/',
        },
      ],
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer.isOpen
      },
      set(val) {
        return val
      },
    },
  },
  methods: {
    ...mapMutations({
      close: 'drawer/close',
    }),
  },
}
</script>

<style></style>
