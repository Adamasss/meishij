import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipe from "../views/Recipe.vue";
import user from "../views/index/user.vue";
import Detail from "../views/detail/Detail.vue";

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
    path: "/user",
    name: "user",
    component: user,
  },
  // 菜谱详情
  {
    path: "/detail",
    name: "detail",
    component: Detail,
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
