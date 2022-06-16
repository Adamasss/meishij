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
				<!-- 登陆成功 -->
				<div v-if="token">
					<el-image src="" fit="fill"></el-image>
					<p>{{ user.name }}</p>
					<router-link to="/">发布菜谱</router-link>
					<button @click="logOut">退出</button>
				</div>
				<!-- 登录 -->
				<div v-if="!token">
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
		<headerVue></headerVue>
	</div>
</template>

<script>
import { postLogOut } from "@/apis";
import headerVue from "./header.vue";
export default {
	components: { headerVue },
	data() {
		return {
			user: {
				_id: localStorage.getItem("_id"),
				name: localStorage.getItem("name"),
				token: localStorage.getItem("token"),
			},
		};
	},
	methods: {
		logOut() {
			const authorization = this.user.token;
			postLogOut(authorization).then((res) => {
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
