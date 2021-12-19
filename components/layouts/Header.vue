<template>
  <v-app-bar app dark color="primary" class="elevation-0">
    <v-app-bar-nav-icon class="appbar__icon" @click="toggle" />
    <v-toolbar-title class="toolbar__title">
      <NuxtLink to="/" class="toolbar__text">研究室希望配属調査</NuxtLink>
    </v-toolbar-title>

    <v-tabs v-if="isLoggined" class="appbar__tabs">
      <v-tab v-for="(menuItem, index) in loginMenu" :key="index" nuxt @click="redirectPage(menuItem.url)">
        {{ menuItem.name }}
      </v-tab>
    </v-tabs>

    <v-tabs v-else class="appbar__tabs">
      <v-tab v-for="(menuItem, index) in logoutMenu" :key="index" nuxt @click="redirectPage(menuItem.url)">
        {{ menuItem.name }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <div v-if="isLoggined || isAdmin" class="appbar__profile mr-3">
      <v-list-item-title>ようこそ、{{ firstName }}さん</v-list-item-title>
      <v-list-item-subtitle class="grey--text">{{ userEmail }}</v-list-item-subtitle>
    </div>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      firstName: 'Nakai',
    }
  },
  computed: {
    ...mapGetters({
      isLoggined: 'auth/isLoggined',
      isAdmin: 'auth/isAdmin',
      userEmail: 'auth/userEmail',
    }),
    drawer() {
      return this.$store.state.drawer.isOpen
    },
    loginMenu() {
      return this.$store.state.menu.loginMenu
    },
    adminMenu() {
      return this.$store.state.menu.adminMenu
    },
    logoutMenu() {
      return this.$store.state.menu.logoutMenu
    },
  },
  methods: {
    redirectPage(path) {
      if (path === '/signout') {
        this.$store.dispatch('auth/signOut')
      } else {
        this.$router.push({ path })
      }
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
