import * as api from '@/api';

/**
 * 登出
 * @param commit
 * @param params
 * @returns {Promise<void>}
 */
export async function logout({ commit }) {
  const data = await api.logout();
  commit('LOGOUT_SUCCESS', data);
}
