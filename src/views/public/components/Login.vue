<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="手机/邮箱" prop="account">
        <el-input
          v-model="form.account"
          placeholder="请输入手机/邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <div class="login_captcha-box">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <common-captcha></common-captcha>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">点击登陆</el-button>
        <router-link to="/public/forget" tag="el-button"
          >忘记密码？</router-link
        >
      </el-form-item>
    </el-form>
    <div class="login_other-may">
      <span>或者使用社交账号登陆</span>
      <span class="iconfont login_other-may_qq-icon">&#xe600;</span>
      <span class="iconfont login_other-may_microblog-icon">&#xe63e;</span>
    </div>
  </div>
</template>
<script>
import { login } from "@/dao/public"
export default {
  name: "login",
  data() {
    return {
      form: {
        account: "",
        password: "",
        code: "",
      },
      rules: {
        account: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (
                this.$regExp.emailExp.test(value) ||
                this.$regExp.mobilePhoneExp.test(value)
              ) {
                return callback()
              }
              callback(new Error("请输入手机/邮箱"))
            },
          },
        ],
        password: [
          {
            min: 6,
            max: 20,
            required: true,
            message: "请输入6-20位的密码",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    }
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        const token = await login({
          ...this.form,
          sid: this.$store.state.auth.sid,
        })
        localStorage.setItem("token", token)
        this.$refs.form.resetField()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.login {
  &_captcha-box {
    display: flex;
  }
  &_other-may {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
    &_qq-icon {
      font-size: 24px;
      cursor: pointer;
      color: burlywood;
    }
    &_microblog-icon {
      font-size: 30px;
      color: #ff6a6a;
      cursor: pointer;
      margin-top: 3px;
    }
  }
}
</style>
