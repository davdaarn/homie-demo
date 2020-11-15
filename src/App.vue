<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <span color="blue">Homie</span>
        <span class="font-weight-light">Demo</span>
      </div>
    </v-app-bar>

    <!-- <v-spacer></v-spacer> -->

    <v-main style="padding-left: 2em; padding-right: 2em">
      <Search />
      <v-spacer></v-spacer>
      <Table />
    </v-main>
  </v-app>
</template>

<script>
import Table from "./components/Table";
import Search from "./components/Search";

export default {
  name: "App",

  components: {
    Table,
    Search,
  },

  data: () => ({
    //
  }),
  mounted: () => {
    console.log(process.env.VUE_APP_KEY);
  },
};
</script>
