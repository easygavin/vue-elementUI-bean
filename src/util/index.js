export default {
  vue: null,

  /**
   * 获取可视窗口高度
   */
  getViewPortHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
  },

  /**
   * 返回code处理
   * @param data
   */
  handleRes(data) {
    let msg = data['message'] || '请求异常！';
    if (data['code']) {
      switch (data['code']) {
        case 'OK':
          this.vue.$message.success('操作成功！');
          break;
        case 'SYS401':
          setTimeout(() => {
            if (this.vue.$route.path !== '/login') {
              this.vue.$alert('长时间不操作或账户被再次登录，需要重新登录!', '提示', {
                confirmButtonText: '退出登录',
                callback: action => {
                  this.toLogin();
                }
              }).catch(e => {});
            }
          }, 200);
          break;
        default:
          this.vue.$message.warning(msg);
          break;
      }
    }
  },

  toLogin() {
    if (this.vue.$route.path !== '/login') {
      location.href = '/#/login';
    }
  },
};
