import { createRouter, createWebHistory } from "vue-router";

import Molecular from "../views/Molecular.vue";
import Empirical from "../views/Empirical.vue";
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
      path: "/empirical",
      name: "empirical",
      component: Empirical,
    },
    {
      path: "/balance",
      name: "balance",
      component: Balance,
    },
  ],
});

export default router;
