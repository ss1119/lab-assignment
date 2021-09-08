<template>
  <v-container fluid>
    <v-row app class="menubar__wrap px-15" justify="center" align-content="center">
      <div class="menubar__title">
        <v-icon left size="40"> {{ icon }} </v-icon>
        {{ title }}
      </div>

      <v-spacer />

      <div class="menubar_searchbox">
        <v-text-field
          append-icon="mdi-magnify"
          label="検索"
          outlined
          dense
          single-line
          hide-details
          color="accent"
          class="menubar_searchbox__width"
          :value="searchValue"
          @input="updateValue"
        />
      </div>

      <v-spacer />

      <div class="menubar_items">
        <div v-if="selects.isDisplay" class="mx-2 menubar_items__selects">
          <v-select label="年度" :items="selects.items" item-text="state" item-value="abbr" dense outlined color="accent" hide-details />
        </div>

        <div v-for="(btn, index) in buttons" :key="index" class="mx-2 menubar_items__buttons">
          <v-btn :color="btn.color" depressed nuxt height="40px" :disabled="btn.disabled">
            <v-icon left> {{ btn.icon }} </v-icon>
            {{ btn.title }}
          </v-btn>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminMenu',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    searchValue: {
      type: String,
      default: '',
      required: false,
    },
    selects: {
      type: Object,
      default() {
        return {
          isDisplay: false,
          items: [
            {
              state: '全て',
              abbr: 'all',
            },
          ],
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
          },
        }
      },
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e)
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
      width: 320px;
    }
  }
  &_items {
    display: none;

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
