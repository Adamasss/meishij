<template>
	<div id="header">
		<el-row type="flex" justify="space-between" style="background-color: red">
			<el-col :span="5">
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
				<div
					v-if="user.token"
					style="display: flex; align-items: center; font-size: 0.8em"
				>
					<el-image
						style="width: 30px; height: 30px"
						:src="userInfo.avatar"
						fit="fill"
					></el-image>
					<p style="margin-right: 10px" v-if="userInfo.name">
						{{ userInfo.name | username }}
					</p>
					<router-link to="/publish">发布菜谱</router-link>
					<button @click="logOut">退出</button>
				</div>
				<!-- 登录 -->
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
		<headerVue></headerVue>
	</div>
</template>

<script>
import { postLogOut, postUserInfo } from "@/apis";
import headerVue from "./header.vue";
export default {
	components: { headerVue },
	data() {
		return {
			userInfo: [],
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
	mounted() {
		let parmas = {};
		parmas.userId = localStorage.getItem("userId");
		postUserInfo(parmas).then((res) => {
			this.userInfo = res.data;
		});
	},
	watch: {
		"$route.path": function () {
			this.user.token = localStorage.getItem("token");
			this.user._id = localStorage.getItem("_id");
			this.user.name = localStorage.getItem("name");
		},
	},
	// 过滤器 过滤用户名过长
	filters: {
		username: function (value) {
			return (value = value.substr(0, 4) + "...");
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
