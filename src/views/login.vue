<template>
  <div style="display: flex; justify-content: center">
    <el-tabs class="elTab" type="border-card" tab-position="top">
      <el-tab-pane label="登录" name="1">
        <el-form status-icon :model="login" label-position="top">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[
              { required: true, message: '用户名不能为空' },
              { type: 'number', message: '请输入用户名' },
            ]"
          >
            <el-input v-model="login.name"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空' },
              { type: 'number', message: '请输入密码' },
            ]"
          >
            <el-input
              type="password"
              v-model="login.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('login')"
              >提交</el-button
            >
            <el-button @click="resetForm('login')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="2">
        <el-form
          label-position="top"
          :model="ruleForm"
          status-icon
          label-width="100px"
        >
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[
              { required: true, message: '用户名不能为空' },
              { type: 'number', message: '请输入用户名' },
            ]"
          >
            <el-input v-model="login.name"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空' },
              { type: 'number', message: '请输入密码' },
            ]"
          >
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPassword"
            :rules="[
              { required: true, message: '密码不能为空' },
              { type: 'number', message: '请输入密码' },
            ]"
          >
            <el-input
              type="password"
              v-model="ruleForm.checkPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('login')"
              >提交</el-button
            >
            <el-button @click="resetForm('login')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        name: "",
        password: "",
      },
      ruleForm: {},
    };
  },
  methods: {},
};
</script>
<style lang="stylus">
.elTab {
  width: 40%;
  background-color: white;
}

.el-form {
  margin-top: 20px;
  padding: 20px;
}
</style>