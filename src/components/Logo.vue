<template>
    <div class="logo-wrapper pull-left">
        <a href="/" class="logo"></a>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.logo-wrapper {
  position: relative;
  background: #1e222a;
  padding: 6px 0;
  width: 200px;

  .logo {
    position: relative;
    display: block;
    width: 171px;
    height: 48px;
    background: url("/static/logo_ns.svg") no-repeat center;
    background-size: contain;
    margin: 0 auto;
  }
}
</style>
