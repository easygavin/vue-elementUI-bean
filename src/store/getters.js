export default {
  /**
   * toast
   * @param state
   * @returns {*}
   */
  userInfo: (state) => {
    if (state && state.user && state.user.userInfo) {
      return state.user.userInfo;
    }
    return null;
  }

};
