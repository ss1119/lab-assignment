<template>
  <v-app-bar app dark color="primary" height="70">
    <v-app-bar-nav-icon class="appbar__icon" @click="toggle" />
    <v-toolbar-title class="toolbar__title">
      <NuxtLink to="/" class="toolbar__text">研究室希望配属調査</NuxtLink>
    </v-toolbar-title>

    <v-tabs class="appbar__tabs">
      <v-tab v-for="(menuItem, index) in menuItems" :key="index" nuxt @click="redirectPage(menuItem.url)">
        {{ menuItem.name }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <div class="appbar__profile mr-3">
      <v-list-item-title>ようこそ、{{ firstName }}さん</v-list-item-title>
      <v-list-item-subtitle class="grey--text">{{ mail }}</v-list-item-subtitle>
    </div>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
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
    drawer() {
      return this.$store.state.drawer.isOpen
    },
  },
  methods: {
    redirectPage(path) {
      this.$router.push({ path })
    },
    ...mapMutations({
      toggle: 'drawer/toggle',
    }),
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  &__title {
    margin-right: 38px;
    overflow: visible;
  }

  &__text {
    color: inherit;
    text-decoration: none;
  }
}

.appbar {
  &__icon {
    @include display_pc {
      display: none;
    }
  }
  &__tabs {
    display: none;

    @include display_pc {
      display: flex;
    }
  }
  &__profile {
    display: none;

    @include display_pc {
      display: block;
    }
  }
}
</style>
