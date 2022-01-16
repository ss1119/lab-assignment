<template>
  <v-dialog :value="open" width="600px" @input="close">
    <v-card>
      <v-card-title>
        {{ cardTitle }}
      </v-card-title>

      <v-card-text>
        <p>{{ cardText }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close"> 閉じる </v-btn>
        <v-btn color="accent" text @click="signOut"> ログアウト </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LogOutDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      cardTitle: 'ログアウトの確認',
      cardText: '本当にログアウトしますか？',
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    signOut() {
      this.$store.dispatch('auth/signOut')
      this.close()
    },
  },
}
</script>

<style></style>
