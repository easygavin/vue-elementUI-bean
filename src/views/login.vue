<template>
  <section class="container">
    <div class="widget animated fadeInDown">
      <div class="widget-header">
        <i class="logo"></i>
        <p class="widget-caption">欢迎登录</p>
      </div>
      <el-form v-loading="loading" :model="form" ref="loginForm" class="widget-body">
        <el-form-item prop="name" :rules="[{ required: true, message: '手机号/用户名不能为空'}]">
          <el-input prefix-icon="name-icon" @keyup.enter.native="submit()"
                    v-model="form.name" auto-complete="off" placeholder="手机号/用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" :rules="[{ required: true, message: '密码不能为空'}]">
          <el-input prefix-icon="password-icon" @keyup.enter.native="submit()"
                    v-model="form.pwd" type="password" auto-complete="off" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <a class="submit-btn" @click="submit()">
            立即登录
          </a>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import * as api from "@/api";

export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        pwd: ""
      }
    };
  },
  mounted() {},
  methods: {
    /**
     * 立即登录
     */
    async submit() {
      try {
        let valid = await this.$refs["loginForm"].validate();

        if (valid) {
          this.loading = true;
          const data = await api.login(this.form);

          if (data && data.code === "OK") {
            // 存储登录数据
            this.$store.commit("LOGIN_SUCCESS", data.result);
            this.$router.push("/service");
          }
        }
      } catch (e) {
        if (e.msg) {
          this.$message.warning(e.msg);
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding-top: 10%;
}

.widget {
  box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22),
    0 25px 55px 0 rgba(0, 0, 0, 0.21);
  width: 322px;
  background: #fff;
  margin: 0 auto;
  border: 1px solid #eee;

  .widget-header {
    padding: 5px 10px;
    margin: 20px 10px;
    height: 40px;

    .logo {
      display: block;
      height: 40px;
      width: 170px;
      background: url("../assets/images/logo_anti.svg") no-repeat;
      background-size: contain;
      float: left;
    }

    .widget-caption {
      font-size: 26px;
      height: 40px;
      float: left;
    }
  }
}

.widget-body {
  background-color: #fbfbfb;
  padding: 20px 20px 10px;
  text-align: left;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInDown {
  animation-name: fadeInDown;
}

.submit-btn {
  background: #169bd5;
  display: inline-block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  text-decoration: none;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  vertical-align: middle;
  z-index: 1;
  will-change: opacity, transform;
  transition: all 0.3s ease-out;

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
      0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>

