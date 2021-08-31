<template>
  <div>
    <v-app-bar absolute app color="primary" dark elevation="2.0" height="70" fixed>
      <v-toolbar-title>
        <NuxtLink to="/" class="toolbar-title">研究室希望配属調査</NuxtLink>
      </v-toolbar-title>

      <div class="text-subtitle-2 ml-10 hidden-sm-and-down">ようこそ、{{ firstName }}さん</div>

      <v-spacer />

      <v-btn-toggle class="hidden-sm-and-down" tile group>
        <v-btn v-for="(menuItem, index) in menuItems" :key="index" class="text-subtitle-1" nuxt @click="redirectPage(menuItem.url)">
          {{ menuItem.name }}
        </v-btn>
      </v-btn-toggle>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-subtitle-1 ml-3">ようこそ、{{ firstName }}さん</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
            <v-list-item-title>
              {{ menuItem.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      firstName: 'Nakai',
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
          name: '問い合わせ',
          url: '/form',
        },
        {
          name: 'ログアウト',
          url: '/',
        },
      ],
    };
  },
  methods: {
    redirectPage(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: none;
}
</style>
