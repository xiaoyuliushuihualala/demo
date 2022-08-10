import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/atSomeOne",
    name: "atSomeOne",
    component: () => import("../views/AtSomeOne.vue"),
  },
  {
    path: "/atOtherWay",
    name: "atOtherWay",
    component: () => import("../views/AtOtherWay.vue"),
  },
  {
    path: "/fontStyle",
    name: "fontStyle",
    component: () => import("../views/fontStyle.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
