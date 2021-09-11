<template>
  <v-dialog :value="open" @input="close">
    <v-card v-if="name === accountOff">
      <AccountOff />
    </v-card>
    <v-card v-else-if="name === accountPlus">
      <AccountPlus />
    </v-card>
    <v-card v-else-if="name === email">
      <Email />
    </v-card>
    <v-card v-else-if="name === fileExport">
      <FileExport />
    </v-card>
  </v-dialog>
</template>

<script>
import { AccountOff, AccountPlus, Email, FileExport } from './dialogs/index'
export default {
  name: 'Dialog',
  components: {
    AccountOff,
    AccountPlus,
    Email,
    FileExport,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      accountOff: 'account-off',
      accountPlus: 'account-plus',
      email: 'email',
      fileExport: 'file-export',
    }
  },
  methods: {
    close(e) {
      this.$emit('close', e)
    },
  },
}
</script>

<style></style>
