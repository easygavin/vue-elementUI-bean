// initial state
const state = {
  userInfo: null // 登录用户信息
};

// mutations
const mutations = {

  /**
   * 登录成功
   * @param state
   * @param data
   */
  LOGIN_SUCCESS: (state, data) => {
    state.userInfo = data;
    if (window.sessionStorage) {
      window.sessionStorage.setItem('user', JSON.stringify(data));
    }
  },

  /**
   * 登出成功
   * @param state
   * @param data
   */
  LOGOUT_SUCCESS: (state, data) => {
    state.userInfo = null;
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
  }
};

export default {
  state,
  mutations,
};
