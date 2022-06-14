<template>
  <div id="header">
    <el-row type="flex" justify="space-between" style="background-color: red">
      <el-col :span="6">
        <router-link to="/">
          <el-image
            class="logo"
            :src="require('../assets/images/logo.png')"
            fit="fill"
          ></el-image>
        </router-link>
      </el-col>
      <el-col :span="6" style="line-height: 58px">
        <router-link style="color: white" to="login">登录</router-link> |
        <router-link style="color: white" to="login">注册</router-link>
      </el-col>
    </el-row>
    <div style="background-color: white">
      <!-- default-active的值与子项中index的值相对应 -->
      <el-menu
        mode="horizontal"
        router
        :default-active="activeRouter"
        style="width: 1200px; margin: 0 auto"
      >
        <el-menu-item index="home" :route="{ name: 'home' }">首页</el-menu-item>
        <el-menu-item index="recipe" :route="{ name: 'recipe' }"
          >菜谱大全</el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeRouter: "home",
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.activeRouter = val.name;
      },
      immediate: true, // 立即执行
    },
  },
};
</script>

<style lang="stylus" scoped>
.logo {
  width: 106px;
  height: 54px;
  float: right;
}
</style>