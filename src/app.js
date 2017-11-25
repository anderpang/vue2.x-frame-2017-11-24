import Vue from 'vue';
import "./common/use";
import "./common/components";

import router from "./router";
import App from "./App.vue";
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
