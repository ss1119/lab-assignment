<template>
  <v-app>
    <Header />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Header } from '~/components/layouts/index'
export default {
  components: {
    Header,
  },
  data() {},
}
</script>
