import Vue from 'vue';
import Vuex from 'vuex';
import { GetListOfPropertiesResponseDto } from './dtos/getListOfPropertiesResponseDto';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    properties: new GetListOfPropertiesResponseDto(),
    resultsFound: true,
    errorMessage: "",
  },
  mutations: {
    updateListings: (state, payload) => {
      console.log(payload);
      state.properties = payload;

    },
    setLoadingState: (state, payload) => {
      state.isLoading = payload;

    },
    setResultsFound: (state, payload) => {
      state.resultsFound = payload;

    },
    setErrorMessage: (state, payload) => {
      state.errorMessage = payload;

    }
  },
  actions: {
    async setProperties({ commit, dispatch }, searchValues) {

      commit('setLoadingState', true);
      // console.log(searchValues);

      let city = searchValues.city;
      let stateCode = searchValues.stateCode;
      let limit = 200;
      let offset = 0;

      let response = await fetch(
        `https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&limit=200&offset=0&state_code=${stateCode}&sort=relevance`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.VUE_APP_KEY,
            "x-rapidapi-host": process.env.VUE_APP_HOST,
          },
        }
      );

      if (response.ok) {
        let json = await response.json();
        let properties = new GetListOfPropertiesResponseDto(json);
        commit('updateListings', properties);
        commit('setLoadingState', false);

        if (properties.properties.length > 0) {

          commit('setResultsFound', true)
          commit('setError', '')
        } else {
          commit('setResultsFound', false)
          commit('setErrorMessage', 'No listings found')
        }
      } else {
        commit('setErrorMessage', 'A network error occured')
        commit('setResultsFound', false)
      }
    },
  },
  getters: {
    isLoading(state) { return state.isLoading },
    getProperties(state) { return state.properties },
  },
})