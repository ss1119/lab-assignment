<template>
  <v-app-bar absolute app color="primary" dark elevation="2.0">
    <v-toolbar-title>研究室希望配属調査</v-toolbar-title>

    <v-spacer />

    <v-app-bar-nav-icon class="hidden-md-and-down" @click="drawer = true"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItem: [
        {
          name: '',
          url: '',
        },
      ],
    };
  },
};
</script>

<style></style>
