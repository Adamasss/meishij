<template>
	<div class="login">
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="用户名：" prop="name">
				<el-input
					type="string"
					v-model="ruleForm.name"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="password">
				<el-input
					type="password"
					v-model="ruleForm.password"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')"
					>登录</el-button
				>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { postLogin } from "@/apis";
export default {
	data() {
		// 用户名
		var validateUser = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else {
				callback();
			}
		};
		// 密码
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				name: "",
				password: "",
			},
			rules: {
				name: [{ validator: validateUser, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
			},
		};
	},
	methods: {
		// 提交 点击事件
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					postLogin(this.ruleForm).then((res) => {
						alert(res.mes);
						if (res.code == "0") {
							localStorage.setItem("_id", res.data._id);
							localStorage.setItem("name", res.data.name);
							localStorage.setItem("token", res.data.token);
							this.$router.push(`/`);
						}
					});
				}
			});
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	watch: {
		$route: {
			handler(val) {
				// 跳转页面刷新登录栏状态
				this.resetForm("ruleForm");
			},
		},
	},
};
</script>
<style lang="stylus" scoped>
.el-input{
    width: 95%;
}
</style>
