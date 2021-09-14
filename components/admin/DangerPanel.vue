<template>
  <v-container class="my-6">
    <v-row justify="center">
      <v-card outlined class="panel__card">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="panel__header">
                <v-icon left color="error"> mdi-alert-circle </v-icon>
                Danger Zone
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="panel__alert">
              <v-alert outlined color="error">
                <v-header>選択した年度の学生を削除する</v-header>
                <v-container>
                  <v-row>
                    <v-select
                      ref="year"
                      v-model="year"
                      label="年度"
                      outlined
                      dense
                      :items="selectItems"
                      item-text="state"
                      item-value="abbr"
                      hide-details
                      class="mr-auto mt-3 ml-1"
                    />
                    <v-spacer />
                    <v-btn color="error" depressed height="40px" class="ml-auto mt-3 mr-1">
                      <v-icon left> mdi-delete </v-icon>
                      削除する
                    </v-btn>
                  </v-row>
                </v-container>
              </v-alert>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DangerPanel',
  data() {
    return {
      selectItems: [
        {
          state: '2020',
          abbr: '2020',
        },
        {
          state: '2021',
          abbr: '2021',
        },
        {
          state: '2022',
          abbr: '2022',
        },
      ],
      year: '',
      confirmDialog: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.v-expansion-panel::before {
  box-shadow: none !important;
}

.panel {
  &__card {
    width: 90%;
    @include display_tab {
      width: 50%;
    }
  }
  &__header {
    color: #dd2c00;
  }
  &__alert {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
