import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RoutesNames from "./routesNames";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Login",
    name: RoutesNames.Login,
    component: () => import("../components/Login.vue"),
    meta: {
      anonymousOnly: true,
    },
  },
  {
    path: "/",
    name:  RoutesNames.dashboard,
    component: () => import("../components/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next("/Login");
      }
    },
  },
  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: '/Login',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
