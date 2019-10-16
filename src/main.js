import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";

import "@/assets/css/tailwindcss.css";
import "@/assets/css/material-design-icons.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Toasted, {
  duration: 2000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
