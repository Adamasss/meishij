import axios from "axios";

// 拦截器 （请求request 响应response）
// 请求
axios.interceptors.request.use(
  (config) => {
    // 以后所有请求地址自动携带api
    config.baseURL = "/api";
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
