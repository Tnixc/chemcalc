import { createRouter, createWebHistory } from "vue-router";

import Molecular from "../views/Molecular.vue";
import Emperical from "../views/Emperical.vue";
import Balance from "../views/Balance.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/molecular",
    },
    {
      path: "/molecular",
      name: "molecular",
      component: Molecular,
    },
    {
      path: "/emperical",
      name: "emperical",
      component: Emperical,
    },
    {
      path: "/balance",
      name: "balance",
      component: Balance,
    },
  ],
});

export default router;
