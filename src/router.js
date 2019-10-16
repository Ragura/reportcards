import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Rapport from "./views/Rapport.vue";
import Leerlingen from "./views/Leerlingen.vue";
import Punten from "./views/Punten.vue";
import Help from "./views/Help.vue";

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
      path: "/punten",
      name: "punten",
      component: Punten
    },
    {
      path: "/help",
      name: "help",
      component: Help
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      name: "fallback",
      component: Home
    }
  ]
});
