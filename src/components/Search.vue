<template>
  <div style="margin-top: 40px">
    <div>
      <!-- <button @click="setProperties">Run</button> -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="city"
          :counter="20"
          :rules="cityRules"
          label="City"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'State is required']"
          label="State"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="teal accent-1"
          class="mr-4"
          @click="submit"
        >
          Search Homes For Sale
        </v-btn>

        <span v-if="!resultsFound">
          {{ errorMessage }}
        </span>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import { GetListOfPropertiesResponseDto } from "../dtos/getListOfPropertiesResponseDto";

export default {
  city: "Search",
  data: () => ({
    valid: false,
    city: "",
    cityRules: [
      (v) => !!v || "City is required",
      (v) => (v && v.length <= 20) || "City must be less than 30 characters",
    ],
    select: null,
    items: ["UT", "AZ"],
  }),
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapState(["resultsFound", "errorMessage"]),
  },
  methods: {
    ...mapActions(["setProperties"]),
    submit() {
      if (this.$refs.form.validate()) {
        let city = this.city;
        let stateCode = this.select;
        this.setProperties({ city, stateCode });
      }
    },
  },
};
</script>

<style>
</style>