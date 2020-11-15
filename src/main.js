import Vue from 'vue';
import App from './App';
// import router from "./router";
import store from "./store";
import './plugins/vuetify';
import vuetify from './plugins/vuetify';

new Vue({

  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
