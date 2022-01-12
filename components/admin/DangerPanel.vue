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
                    <v-select ref="year" v-model="year" label="年度" outlined dense :items="years" hide-details class="mr-auto mt-3 ml-1" />
                    <v-spacer />
                    <v-btn color="error" depressed height="40px" :disabled="btnDisabled" class="ml-auto mt-3 mr-1" @click.stop="confirmDialogOpen">
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

    <v-dialog v-model="confirmDialog" max-width="600px">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>

        <v-card-text>
          <p>{{ year }}年度の学生を削除します。</p>
          <p>実行する場合は、下記フォームに「{{ confirmLabel }}」と入力してください。</p>
          <p>
            データの削除が完了するまで、しばらく時間がかかることがあります。<br />
            連続して実行しないでください。
          </p>
        </v-card-text>

        <v-form class="form__wrap mx-10">
          <v-text-field v-model="value" label="確認しました" prepend-icon="mdi-alert" />
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close"> 閉じる </v-btn>
          <v-btn color="error" text :loading="loading" :disabled="deleteDisabled" @click="deleteUsers"> 削除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { httpsCallable } from 'firebase/functions'
import { functions } from '~/plugins/firebase'

export default {
  name: 'DangerPanel',
  data() {
    return {
      year: '',
      cardTitle: 'ユーザ削除の確認',
      value: '',
      loading: false,
      confirmDialog: false,
      confirmLabel: '確認しました',
    }
  },
  computed: {
    ...mapGetters({
      years: 'users/years',
    }),
    btnDisabled() {
      if (this.year === '') {
        return true
      } else {
        return false
      }
    },
    deleteDisabled() {
      if (this.value !== this.confirmLabel) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    confirmDialogOpen() {
      this.confirmDialog = true
    },
    close() {
      this.value = ''
      this.year = ''
      this.confirmDialog = false
    },
    deleteUsers() {
      this.loading = true
      this.deleteDisabled = true
      const deleteUsers = httpsCallable(functions, 'deleteUsersInAuthAndDB')
      deleteUsers(this.year).then((res) => {
        this.loading = false
        this.deleteDisabled = false
        this.close()
      })
    },
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
