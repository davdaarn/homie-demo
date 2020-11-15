<template>
  <div style="margin-top: 80px">
    <!-- :expanded.sync="expanded" -->
    <!-- show-expand -->
    <!-- :single-expand="singleExpand" -->
    <v-data-table
      :headers="propertyHeaders"
      :items="properties.properties"
      item-key="property_id"
      class="elevation-1"
      :loading="isLoading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Property Listings</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
          ></v-switch> -->
        </v-toolbar>
      </template>
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
      </template> -->
      <template v-slot:[`item.rdc_web_url`]="{ value }">
        <a target="_blank" :href="value">
          <!-- {{ value }} -->
          Listing Details
        </a>
      </template>
      <template v-slot:[`item.traditionalFee`]="{ value }">
        <span class="red--text">
          {{ value }}
        </span>
      </template>
      <template v-slot:[`item.potentialSavings`]="{ value }">
        <span class="green--text">
          {{ value }}
        </span>
      </template>
    </v-data-table>
    <!-- {{ properties.properties }} -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { GetListOfPropertiesResponseDto } from "../dtos/getListOfPropertiesResponseDto";

export default {
  name: "Table",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      propertyHeaders: [
        { text: "List Price", value: "price", sortable: true },
        { text: "Address", value: "address.line", sortable: false },
        { text: "Listing", value: "rdc_web_url" },
        {
          text: "Traditional Realtor Fee",
          value: "traditionalFee",
          sortable: true,
          align: "end",
        },
        {
          text: "Potential Savings",
          value: "potentialSavings",
          sortable: true,
          align: "end",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      // "isLoading",
      "getProperties",
    ]),
    ...mapState(["isLoading", "properties"]),
  },
  methods: {
    ...mapActions(["setProperties"]),
    calculateFee(fee) {
      return fee * 0.6;
    },
  },
};
</script>

<style>
</style>