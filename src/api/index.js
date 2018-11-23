import * as API from './API'

/**
 * 登录
 * @param params 
 */
export async function login(params) {
  return await API.post('userInfo/login', params);
}

/**
 * 登出
 */
export async function logout() {
  return await API.post('userInfo/logout', null);
}