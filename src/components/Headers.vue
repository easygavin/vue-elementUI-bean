<template>
    <header class="header">
        <Logo></Logo>
    </header>
</template>
<script>
import Logo from "./Logo.vue";

export default {
  components: { Logo }
};
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 100;
  transition: all 0.5s ease;
  border-bottom: 1px solid #eee;
}
</style>
