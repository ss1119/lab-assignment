<template>
  <v-app class="bg">
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

<style scoped>
.bg {
  background-color: #f5f5f5;
}
</style>
