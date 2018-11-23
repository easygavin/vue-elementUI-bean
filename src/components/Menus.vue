<template>
    <div class="side-menu" :style="{height: height + 'px'}">
        <Logo></Logo>

        <!-- 菜单列表 -->
        <el-menu
        :default-active="active"
        :default-openeds="openeds"
        :unique-opened="true"
        :router="true"
        class="el-menu-dark" :style="{height: (height - 50) + 'px'}">

        <template v-for="(menu, index) in navMenus">
            <el-submenu v-if="menu.children && menu.children.length"
                        :index="index + ''" :key="'menu_' + index">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{menu.name}}</span>
            </template>

            <el-menu-item-group v-for="(submenu, subIndex) in menu.children" :key="'submenu_' + subIndex">
                <el-submenu v-if="submenu.children && submenu.children.length" :index="index + '-' + subIndex">
                <template slot="title">
                    <span>{{submenu.name}}</span>
                </template>
                <el-menu-item v-for="(supmenu, supIndex) in submenu.children"
                                :route="{path: supmenu.path}" :key="'supmenu_' + supIndex"
                                :index="index + '-' + subIndex + '-' + supIndex">
                    <span>{{supmenu.name}}</span>
                </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :route="{path: submenu.path}"
                            :index="index + '-' + subIndex" :key="'submenu_' + subIndex">
                <span>{{submenu.name}}</span>
                </el-menu-item>
            </el-menu-item-group>

            </el-submenu>
            <el-menu-item v-else :route="{path: menu.path}" :index="index + ''"
                        :key="'menu_' + index">
            <i :class="menu.icon"></i><span slot="title">{{menu.name}}</span>

            </el-menu-item>
        </template>

        </el-menu>
        <!-- /菜单列表 -->

        <!-- 头像菜单 -->
        <el-menu v-if="loginUser" :default-openeds="avaterOpeneds" @open="handleAvator()" @close="handleAvator()" class="el-menu-dark avater-menu">
            <el-submenu index="avater-pop">
                <el-menu-item index="avater-pop-1" @click="logout">
                    登出&nbsp;&nbsp;<i class="exit-icon"></i>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="avater" :class="{'is-close': !(avaterOpeneds.indexOf('avater-pop') > -1)}">
                <template slot="title">
                    <div :title="loginUser.name" class="avater-wrapper">
                        <img src="/static/images/g.jpeg" class="avater"/>
                        <span class="name">{{loginUser.name}}</span>
                    </div>
                </template>
            </el-submenu>
        </el-menu>
        <!-- /头像菜单 -->

    </div>
</template>
<script>
import Logo from "./Logo.vue";

export default {
  components: { Logo },
  props: {
    // 高度
    height: {
      type: Number,
      default: 600
    },

    // 菜单列表
    menus: {
      type: Array
    },

    // 登录用户信息
    loginUser: {
      type: Object
    }
  },
  data() {
    return {
      openeds: [], // 打开菜单
      active: "", // 焦点菜单key
      avaterOpeneds: [] // 显示焦点
    };
  },
  computed: {
    /**
     * 获取导航菜单
     */
    navMenus() {
      let focusMenus = this.getFixMenuIndex(this.menus);
      if (focusMenus) {
        if (focusMenus.menu && focusMenus.submenu) {
          this.openeds = [focusMenus.menuIndex + ""];
          this.active = focusMenus.menuIndex + "-" + focusMenus.submenuIndex;
        } else if (focusMenus.menu && !focusMenus.submenu) {
          this.openeds = [];
          this.active = focusMenus.menuIndex + "";
        } else {
          this.openeds = [];
          this.active = "";
        }
      } else {
        this.openeds = [];
        this.active = "";
      }
      return this.menus;
    }
  },
  methods: {
    /**
     * 当前加载地址菜单定位信息
     * @param menus
     * @returns {*}
     */
    getFixMenuIndex(menus) {
      if (!menus) {
        return null;
      }
      let hasNavMenu = false;
      let menu = null;
      let submenu = null;
      let menuIndex = -1;
      let submenuIndex = -1;
      let path = this.$route.path;
      for (menuIndex = 0; menuIndex < menus.length; menuIndex++) {
        menu = menus[menuIndex];
        if (menu.children && menu.children.length) {
          for (
            submenuIndex = 0;
            submenuIndex < menu.children.length;
            submenuIndex++
          ) {
            submenu = menu.children[submenuIndex];
            if (path.indexOf(submenu.path) > -1) {
              hasNavMenu = true;
              break;
            }
          }
        } else if (path.indexOf(menu.path) > -1) {
          hasNavMenu = true;
        }

        if (hasNavMenu) {
          break;
        }
      }

      if (hasNavMenu) {
        this.handleBreads(menu, submenu);
        return {
          menu: menu,
          submenu: submenu,
          menuIndex,
          submenuIndex
        };
      } else {
        this.handleBreads(null);
        return null;
      }
    },

    /**
     * 处理面包屑数组
     */
    handleBreads(menu, submenu, supmenu) {
      let breads = [];
      if (menu) {
        breads.push({ name: menu.name, path: menu.path });
      }
      if (submenu) {
        breads.push({ name: submenu.name, path: submenu.path });
      }
      if (supmenu) {
        breads.push({ name: supmenu.name, path: supmenu.path });
      }
      this.$emit("breadsChange", breads);
    },

    /**
     * 处理Avator显示
     */
    handleAvator() {
      if (this.avaterOpeneds.indexOf("avater-pop") > -1) {
        this.avaterOpeneds = [];
      } else {
        this.avaterOpeneds = ["avater-pop"];
      }
    },

    /**
     * 退出登录
     */
    logout() {
      this.$emit("logout");
    }
  }
};
</script>
<style lang="less" scoped>
.side-menu {
  width: 200px;
  float: left;
  position: relative;
  overflow-y: hidden;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    background-color: #283239;
  }
}

.exit-icon {
  display: inline-block;
  width: 24px;
  height: 18px;
  background: url("../assets/images/exit.svg") no-repeat center;
  background-size: contain;
  margin: 10px auto;
}
</style>

