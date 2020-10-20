<template>
  <div class="forget">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="邮箱" prop="account">
        <el-input v-model="form.account" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <div class="forget_captcha-box">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <common-captcha ref="captcha"></common-captcha>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from "element-ui"
import { sendMail } from "@/dao/public"
export default {
  name: "forget",
  data() {
    return {
      form: {
        account: "",
        code: "",
      },
      rules: {
        account: [
          {
            required: true,
            trigger: "blur",
            type: "email",
            message: "请输入有效邮箱",
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
        const { account } = this.form
        await sendMail(account)
        this.$refs.form.resetFields()
        this.$refs.captcha.refreshCaptcha()
        Message({
          message: "发送成功",
          type: "success",
          duration: 5 * 1000,
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.forget {
  &_captcha-box {
    display: flex;
  }
}
</style>
