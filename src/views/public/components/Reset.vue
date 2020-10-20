<template>
  <div class="reset">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入6-20位的新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain">
        <el-input
          v-model="form.passwordAgain"
          type="password"
          placeholder="请重新确认密码"
        ></el-input>
      </el-form-item>
      <div class="reset_captcha-box">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <common-captcha></common-captcha>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "reset",
  data() {
    return {
      form: {
        password: "",
        passwordAgain: "",
      },
      rules: {
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
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    }
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
      }
    },
  },
}
</script>

<style scoped lang="scss">
.reset {
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
