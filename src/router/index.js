import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/Home.vue"
import recipe from "@/views/Recipe.vue"
import user from "@/views/index/index.vue"

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "home",
    component: home,
  },
  // 菜谱大全
  {
    path: "/recipe",
    name: "recipe",
    component: recipe,
  },
  // 登录注册
  {
    path: "/user",
    name: "user",
    component: user
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
