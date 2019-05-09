import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Rapport from "./views/Rapport.vue";
import Leerlingen from "./views/Leerlingen.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/rapport",
      name: "rapport",
      component: Rapport
    },
    {
      path: "/leerlingen",
      name: "leerlingen",
      component: Leerlingen
    },
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});
