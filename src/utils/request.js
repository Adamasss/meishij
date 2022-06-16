import axios from "axios";

// 拦截器 （请求request 响应response）
// 请求
axios.interceptors.request.use(
  (config) => {
    // 以后所有请求地址自动携带api
    config.baseURL = "/api";
    let token = localStorage.getItem("token");
    // 判断是否存在token 如果存在 则每个request请求的headers都需加上token
    if (token) {
      config.headers.authorization = "token " + token;
    }
    return config;
  },
  (err) => {
    return console.log("请求失败", err);
  }
);

// 响应
axios.interceptors.response.use(
  (res) => {
    // 成功
    return res.data;
  },
  (err) => {
    // 失败 成功resolve 失败reject
    return Promise.reject(err);
  }
);

export default axios;
