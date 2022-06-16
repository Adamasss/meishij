<template>
	<div class="user">
		<el-tabs @tab-click="handleClick" v-model="activeName" type="card">
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
import Login from "./login";
import Register from "./register.vue";
export default {
	components: { Login, Register },
	data() {
		return {
			activeName: this.$route.query.name, // 导航栏 name 信息
		};
	},
	methods: {
		handleClick(tab) {
			// 点击菜单更新导航栏数据
			this.$router.push(`/user?name=${tab.name}`);
		},
	},
	watch: {
		$route: {
			handler(val) {
				// 获取导航栏 name 信息
				this.activeName = this.$route.query.name;
			},
		},
	},
};
</script>
<style lang="stylus" scoped>
.user{
    height: 520px
    padding: 3em 0 0 0;
    .el-tabs{
        width: 60%;
        background-color: #fff;
        margin: 0 auto;
        box-shadow: 0 0 25px #cac6c6;
        border-radius: 13px;
    }
}
</style>
