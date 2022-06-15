<template>
	<div style="display: flex; justify-content: center">
		<el-tabs
			@tab-click="handleClick"
			v-model="activeName"
			class="elTab"
			type="border-card"
			tab-position="top"
		>
			<el-tab-pane label="登录" name="login">
				<Login></Login>
			</el-tab-pane>
			<el-tab-pane label="注册" name="register">
				<Register></Register>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
	components: {
		Login,
		Register,
	},
	data() {
		return {
			activeName: this.$route.query.name,
		};
	},
	methods: {
		handleClick(tab) {
			this.$router.push(`/user?name=${tab.name}`);
		},
	},
	watch: {
		$route: {
			handler(val) {
				// 获取导航栏菜单信息
				this.activeName = this.$route.query.name;
			},
		},
	},
};
</script>
<style lang="stylus">
.elTab {
  margin-top:20px;
  width: 40%;
  background-color: white;
}

.el-form {
  margin-top: 20px;
  padding: 20px;
}
</style>
