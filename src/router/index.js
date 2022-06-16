import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "home",
    component: () => {
      import("@/views/Home.vue")
    },
  },
  // 菜谱大全
  {
    path: "/recipe",
    name: "recipe",
    component: () => {
      import("@/views/Recipe.vue")
    },
  },
  // 登录注册
  {
    path: "/index",
    name: "index",
    component: () => {
      import("@/views/index/index.vue")
    },
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
