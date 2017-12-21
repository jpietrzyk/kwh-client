<template>
  <v-app id="electricityConsumption">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Electricity consumption</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout
          justify-center
          align-center
        >
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017 jpietrzyk</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
