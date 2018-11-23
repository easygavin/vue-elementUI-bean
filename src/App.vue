<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/util';

export default {
  mounted() {
    // vue对象用于提示信息
    util.vue = this;
  }
}
</script>
