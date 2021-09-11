<template>
  <v-row class="mb-6 mt-2" justify="center">
    <v-btn color="accent" depressed height="48" nuxt @click.stop="submit">
      <v-icon left> {{ icon }} </v-icon>
      {{ title }}
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'CardButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style></style>
