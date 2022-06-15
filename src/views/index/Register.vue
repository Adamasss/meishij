<template>
	<el-form
		:model="ruleForm"
		ref="ruleForm"
		:rules="rules"
		label-width="100px"
		status-icon
		label-position="top"
	>
		<el-form-item label="用户名" prop="name">
			<el-input type="string" v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input
				type="password"
				v-model="ruleForm.password"
				autocomplete="off"
			></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input
				type="password"
				v-model="ruleForm.checkPass"
				autocomplete="off"
			></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { postCreate } from "@/apis";
export default {
	data() {
		// 输入校验
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
		// 确认密码
		var validatecheck = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.ruleForm.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {},
			rules: {
				name: [{ validator: validateUser, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatecheck, trigger: "blur" }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((val) => {
				if (val) {
					// 发送表单数据到注册的api 成功返回0 用户名重复返回1
					postCreate(this.ruleForm).then((res) => {
						alert(res.mes);
						if (res.code == 0) {
							this.$router.push(`/user?name=login`);
						}
					});
				}
			});
		},
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

<style></style>
