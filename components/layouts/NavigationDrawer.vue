<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-subtitle-1 ml-3">ようこそ、{{ firstName }}さん</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
          <v-list-item-title>
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {}
</script>

<style></style>
