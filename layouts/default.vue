<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Header />
    <NavDrawer />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Header, NavDrawer } from '~/components/layouts/index'
export default {
  components: {
    Header,
    NavDrawer,
  },
  data() {
    return {}
  },
}
</script>
