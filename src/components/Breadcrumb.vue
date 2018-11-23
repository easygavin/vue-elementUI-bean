<template>
    <el-breadcrumb separator="/" class="breadcrumb-block" >
        <template v-if="menus && menus.length > 0" v-for="(bread, index) in menus">
            <el-breadcrumb-item v-if="index === 0" :key="'bread_' + index">{{bread.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else-if="index === menus.length - 1" :key="'bread_' + index">{{bread.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="'bread_' + index"><router-link :to="{ path: bread.path}">{{bread.name}}</router-link></el-breadcrumb-item>
        </template>
        <template v-if="!menus || menus.length === 0">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>
<script>
export default {
  props: {
    breads: {
      type: Array
    }
  },
  computed: {
    // 菜单列表
    menus() {
      return this.breads;
    }
  }
};
</script>