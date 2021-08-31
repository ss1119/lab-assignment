<template>
  <v-app>
    <Header />
    <Nuxt />
  </v-app>
</template>

<script>
import { Header } from '~/components/layouts/index';
export default {
  components: {
    Header,
  },
  data() {},
};
</script>
