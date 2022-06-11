import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipe from "../views/Recipe.vue";
import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "home",
    component: Home,
  },
  // 菜谱大全
  {
    path: "/recipe",
    name: "recipe",
    component: Recipe,
  },
  // 登录注册
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

// 解决导航重复点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
