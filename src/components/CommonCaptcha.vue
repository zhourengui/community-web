<template>
  <div v-html="captcha" class="captcha" @click.stop="getCaptcha"></div>
</template>

<script>
import { getCaptcha } from "@/dao/public"
export default {
  name: "common-captcha",
  data() {
    return {
      captcha: "",
    }
  },
  methods: {
    async getCaptcha() {
      this.captcha = await getCaptcha(this.$store.state.auth.sid)
    },
    refreshCaptcha() {
      this.getCaptcha()
    },
  },
  created() {
    this.getCaptcha()
  },
}
</script>

<style lang="scss" scoped>
.captcha {
  margin-left: 10px;
  cursor: pointer;
}
</style>
