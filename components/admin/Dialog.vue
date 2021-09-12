<template>
  <v-dialog :value="open" scrollable max-width="600px" @input="close">
    <div v-if="name === accountOff">
      <AccountOff :open="open" @close="close" />
    </div>
    <div v-else-if="name === accountPlus">
      <AccountPlus :open="open" @close="close" />
    </div>
    <div v-else-if="name === email">
      <Email :open="open" @close="close" />
    </div>
    <div v-else-if="name === fileExport">
      <FileExport :open="open" @close="close" />
    </div>
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
