<template>
  <v-navigation-drawer v-model="drawer" app temporary stateless>
    <v-list>
      <v-list-item>
        <v-btn color="primary" outlined @click="close">
          <v-icon dark left>mdi-arrow-left</v-icon>
          閉じる
        </v-btn>
      </v-list-item>
      <v-list-item v-if="isLoggined || isAdmin">
        <v-list-content>
          <v-list-item-title>ようこそ、{{ firstName }}さん</v-list-item-title>
          <v-list-item-subtitle class="grey--text">{{ userEmail }}</v-list-item-subtitle>
        </v-list-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list v-if="isLoggined" nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in loginMenu" :key="index" @click="redirectPage(menuItem.url)">
          <v-list-item-title>
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list v-else-if="isAdmin" nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in adminMenu" :key="index" @click="redirectPage(menuItem.url)">
          <v-list-item-title>
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list v-else nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in logoutMenu" :key="index" @click="redirectPage(menuItem.url)">
          <v-list-item-title>
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavDrawer',
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
    drawer: {
      get() {
        return this.$store.state.drawer.isOpen
      },
      set(val) {
        return val
      },
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
      this.close()
    },
    close() {
      this.$store.commit('drawer/close')
    },
  },
}
</script>

<style></style>
