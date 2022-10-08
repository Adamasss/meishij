// 引入封装好的request
import request from "@/utils/request";

//获取 banner 数据
export async function getBanner() {
  return await request.get("/banner");
}

// jsDoc
/**
 * 获取菜单
 * @param {Object} {params} -> 对象
 * @param {string} {params.userID} -> 用户ID
 * @param {string} {params.classify} 菜谱属性 -> 菜谱分类
 * @param {string} {params.craft} 菜谱属性 -> 工艺
 * @param {string} {params.flavor} 菜谱属性 -> 口味
 * @param {string} {params.hard} 菜谱属性 -> 难度
 * @param {string} {params.people} 菜谱数据 -> 人数
 * @param {string} {params.page} -> 页码
 */
export async function getMenu(params) {
  return await request.get("/menu/query", {
    params: params,
  });
}

// 获取菜谱分类
export async function getClassify() {
  return await request.get("/menu/classify");
}

// 获取所有属性分类
export async function getProperty() {
  return await request.get("/menu/property");
}

// 注册账号
export async function postCreate(params) {
  return await request.post("/user/create", params)
}

// 登陆账号
export async function postLogin(params) {
  return await request.post("/user/login", params)
}

// 退出登录
export async function postLogOut(params) {
  return await request.post("/user/login_out", params);
}

// 获取用户信息
export async function postUserInfo(params) {
  return await request.post("/user/info", params);
}

// 获取菜单详情
export async function getMenuInfo(params) {
  return await request.get("/menu/menuInfo", { params: params });
}