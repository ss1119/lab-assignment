<template>
  <v-container fluid>
    <v-row app class="menubar__wrap px-15" justify="center" align-content="center">
      <Dialog :open="open" :name="name" @close="close" />

      <div class="menubar__title">
        <v-icon left size="40"> {{ icon }} </v-icon>
        {{ title }}
      </div>

      <v-spacer v-if="search.isDisplay" />

      <div v-if="search.isDisplay" class="menubar_searchbox">
        <v-text-field
          append-icon="mdi-magnify"
          label="テーブルの要素で検索"
          outlined
          dense
          single-line
          hide-details
          color="accent"
          class="menubar_searchbox__width"
          :value="search.value"
          @input="updateValue"
        />
      </div>

      <v-spacer />

      <div class="menubar_items">
        <div v-for="(btn, index) in buttons" :key="index" class="mx-2 menubar_items__buttons">
          <v-btn :color="btn.color" depressed nuxt height="40px" :disabled="btn.disabled" @click.stop="openDialog(btn.displayDialog, btn.slotName)">
            <v-icon left> {{ btn.icon }} </v-icon>
            {{ btn.title }}
          </v-btn>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Dialog from './Dialog'
export default {
  name: 'Menu',
  components: {
    Dialog,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    search: {
      type: Object,
      default() {
        return {
          isDisplay: false,
          value: '',
        }
      },
      required: false,
    },
    buttons: {
      type: Object,
      default() {
        return {
          default: {
            icon: 'mdi-pencil',
            color: 'accent',
            title: '新規作成',
            disabled: false,
            displayDialog: false,
            slotName: 'none',
          },
        }
      },
      required: true,
    },
  },
  data() {
    return {
      open: false,
      name: '',
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e)
    },
    openDialog(dialog, name) {
      if (dialog) {
        this.open = true
        this.name = name
      }
    },
    close(e) {
      this.open = e
    },
  },
}
</script>

<style lang="scss" scoped>
.menubar {
  &__wrap {
    height: 60px;
    border-bottom: #dfdddb solid 1px;
    background-color: #ffffff;
  }
  &_searchbox {
    display: none;

    @include display_pc {
      display: flex;
    }

    &__width {
      width: 500px;
    }
  }
  &_items {
    display: none;

    @include display_tab {
      display: flex;
    }

    @include display_pc {
      display: flex;
    }

    &__selects {
      width: 100px;
    }
    &__buttons {
      height: 40px;
    }
  }
}
</style>
