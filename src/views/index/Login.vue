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
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { postLogin } from "@/apis";
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
		return {
			ruleForm: {},
			rules: {
				name: [{ validator: validateUser, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					postLogin(this.ruleForm).then((res) => {
						if (res.code == "0") {
							localStorage.setItem("_id", res.data._id);
							localStorage.setItem("name", res.data.name);
							localStorage.setItem("token", res.data.token);
							this.$message({
								showClose: true,
								message: res.mes,
								type: "success",
							});
							this.$router.push(`/`);
						} else {
							this.$message({
								showClose: true,
								message: res.mes,
								type: "error",
							});
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
