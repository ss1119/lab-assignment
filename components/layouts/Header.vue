<template>
  <v-app-bar app dark color="primary" height="70">
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>
      <NuxtLink to="/" class="toolbar-title">研究室希望配属調査</NuxtLink>
    </v-toolbar-title>

    <v-tabs>
      <v-tab v-for="(menuItem, index) in menuItems" :key="index" nuxt class="text-subtitle-1" @click="redirectPage(menuItem.url)">
        {{ menuItem.name }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <div class="text-subtitle-2">ようこそ、{{ firstName }}さん</div>
  </v-app-bar>
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
  methods: {
    redirectPage(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: none;
}
</style>
