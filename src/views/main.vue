<template>
  <div class="wrapper">
    <Menus 
      :height="viewHeight" 
      :menus="menus"
      :loginUser="userInfo"
      @breadsChange="handleBreads"
      @logout="handleLogout"
      ></Menus>

    <div class="container" :style="{height: viewHeight + 'px'}">
      <Breadcrumb :breads="breads"></Breadcrumb>

      <div class="view-page" :style="{height: (viewHeight - 80) + 'px'}">
        <transition name="fade" mode="out-in">
            <router-view 
              :height="viewHeight - 80"
              @breadChange="breadChange"></router-view>
          </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Menus from "@/components/Menus.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { menus } from "@/constants";
import util from "@/util";

export default {
  components: {
    Menus,
    Breadcrumb
  },
  data() {
    return {
      viewHeight: 0,
      breads: [], // 面包屑菜单组合
      append: null // 追加的面包屑
    };
  },
  /**
   * 初始加载
   */
  mounted() {
    // if (!this.userInfo) {
    //   let user = window.sessionStorage.getItem("user");
    //   if (user) {
    //     user = JSON.parse(user);
    //     this.$store.commit("LOGIN_SUCCESS", user);
    //   } else {
    //     location.href = "/#/login";
    //     return;
    //   }
    // }

    this.viewHeight = util.getViewPortHeight();
    window.onresize = () => {
      this.viewHeight = util.getViewPortHeight();
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    menus() {
      return menus;
    }
  },
  methods: {
    ...mapActions(["logout"]),

    /**
     * 处理面包屑数据
     */
    handleBreads(data) {
      this.breads = data;

      // 以防页面刷新追加bread未追加上
      if (this.append && this.breads.indexOf(this.append) < 0) {
        this.breads.push(this.append);
        this.append = null;
      }
    },

    /**
     * 面包屑动态变化
     */
    breadChange(type, item) {
      if (type === 1) {
        this.append = item;
        this.breads.push(item);
      } else {
        this.breads.pop();
      }
    },

    /**
     * 处理登出
     */
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  min-width: 1280px;

  .container {
    margin-left: 200px;
    padding: 0 20px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>

