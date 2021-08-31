<template>
  <div>
    <v-app-bar absolute app color="primary" dark elevation="2.0" height="70">
      <v-toolbar-title>研究室希望配属調査</v-toolbar-title>

      <div class="text-subtitle-2 ml-10">ようこそ、{{ firstName }}さん</div>

      <v-spacer />

      <v-btn-toggle class="hidden-sm-and-down" tile group>
        <v-btn v-for="(menuItem, index) in menuItems" :key="index" :href="menuItem.url" class="text-subtitle-1">
          {{ menuItem.name }}
        </v-btn>
      </v-btn-toggle>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
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
          url: '/',
        },
        {
          name: '得点の編集',
          url: '/',
        },
        {
          name: '問い合わせ',
          url: '/',
        },
        {
          name: 'ログアウト',
          url: '/',
        },
      ],
    };
  },
};
</script>

<style></style>
