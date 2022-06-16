<template>
    <div class="create">
        <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm">
            <el-form-item label="用户名：" prop="name">
                <el-input type="string" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { postCreate } from "@/apis";
    export default {
        data() {
            // 用户名
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            // 密码
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            // 确认密码
            var validatecheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                // 注册用户信息
                ruleForm: {
                    name: '',
                    password: '',
                    checkPass: '',
                },
                // 用户格式
                rules: {
                    name: [
                        { validator: validateUser, trigger: 'blur' },
                        // { min: 6, max: 18, message: "长度在6到18个字符", trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        // { min: 6, max: 18, message: "长度在6到18个字符", trigger: 'blur' },
                    ],
                    checkPass: [
                        { validator: validatecheck, trigger: 'blur' },
                        // { min: 6, max: 18, message: "长度在6到18个字符", trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            // 提交 点击事件
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 发送表单数据到注册的api 成功返回0 用户名重复返回1
                        postCreate(this.ruleForm).then((res) => {
                            alert(res.mes)
                            if (res.code=='0'){
                                this.$router.push(`/user?name=login`)
                            }
                        })
                    }
                });
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        watch:{
            $route:{
                handler(val) {
                    // 跳转页面刷新注册栏状态
                    this.resetForm('ruleForm')
                },
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .el-input{
        width: 95%;
    }
</style>