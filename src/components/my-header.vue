<template>
	<div id="header">
		<el-row type="flex" justify="space-between" style="background-color: red">
			<!-- logo -->
			<el-col :span="6">
				<router-link to="/">
					<el-image
						class="logo"
						:src="require('../assets/images/logo.png')"
						fit="fill"
					></el-image>
				</router-link>
			</el-col>
			<!-- 登陆注册 -->
			<el-col :span="6" style="line-height: 58px">
				<!-- 登陆成功 -->
				<div v-if="user.token">
					<!-- 暂无数据 -->
					<el-image src="" fit="fill"></el-image>
					<p>{{ user.name }}</p>
					<router-link to="/">发布菜谱</router-link>
					<button @click="logOut">退出</button>
				</div>
				<div v-if="!user.token">
					<router-link style="color: white" to="user?name=login"
						>登录</router-link
					>
					|
					<router-link style="color: white" to="user?name=register"
						>注册</router-link
					>
				</div>
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
import { postLoginOut } from "@/apis";
export default {
	data() {
		return {
			user: {
				id: localStorage.getItem("_id"),
				name: localStorage.getItem("name"),
				token: localStorage.getItem("token"),
			},
			activeRouter: "home",
		};
	},
	methods: {
		logOut() {
			const authorization = this.user.token;
			postLoginOut(authorization).then((res) => {
				if (res.code == "0") {
					localStorage.setItem("_id", "");
					localStorage.setItem("name", "");
					localStorage.setItem("token", "");
					location.reload();
				} else {
					this.$message({
						showClose: true,
						message: res.mes,
						type: "error",
					});
				}
			});
		},
	},
	watch: {
		$route: {
			handler(val) {
				this.activeRouter = val.name;
			},
			immediate: true, // 立即执行
		},
		"$route.path": function () {
			this.user._id = localStorage.getItem("_id");
			this.user.name = localStorage.getItem("name");
			this.user.token = localStorage.getItem("token");
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
