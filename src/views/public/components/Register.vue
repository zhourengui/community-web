<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="手机/邮箱" prop="account">
        <el-input
          v-model="form.account"
          placeholder="请输入手机/邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入6-20位的密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain">
        <el-input
          v-model="form.passwordAgain"
          type="password"
          placeholder="请重新确认密码"
        ></el-input>
      </el-form-item>
      <div class="register_captcha-box">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <common-captcha></common-captcha>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">点击注册</el-button>
      </el-form-item>

      <div class="register_other-may">
        <span>或者使用社交账号快捷登录</span>
        <span class="iconfont register_other-may_qq-icon">&#xe600;</span>
        <span class="iconfont register_other-may_microblog-icon">&#xe63e;</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import { register } from "@/dao/public"
import { mapMutations } from "vuex"
export default {
  name: "register",
  data() {
    return {
      form: {
        account: "",
        nickname: "",
        password: "",
        code: "",
        passwordAgain: "",
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
        passwordAgain: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value === this.form.password) {
                return callback()
              }
              callback(new Error("两次密码不一致"))
            },
          },
        ],
        code: [
          { max: 4, required: true, message: "请输入验证码", trigger: "blur" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    }
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        const payload = await register({
          ...this.form,
          sid: this.$store.state.auth.sid,
        })
        this.setInfo(payload)
        this.$router.push({ name: "login" })
        this.$message({
          type: "success",
          message: "注册成功",
        })
      }
    },
    ...mapMutations("user", ["setInfo"]),
  },
}
</script>

<style scoped lang="scss">
.register {
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
