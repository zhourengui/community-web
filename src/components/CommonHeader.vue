<template>
  <div class="common-header">
    <div class="common-header_logo-box">
      <img src="@/assets/images/logo.png" class="common-header_logo-image" />
      <span class="common-header_logo-text">Little Boy</span>
    </div>
    <div class="common-header_public-box">
      <span class="iconfont common-header_user-icon">&#xe60a;</span>
      <router-link
        to="/public/login"
        tag="span"
        class="common-header_public-box_text"
        >登陆</router-link
      >
      <router-link
        to="/public/register"
        tag="span"
        class="common-header_public-box_text"
        >注册</router-link
      >
      <span class="iconfont common-header_qq-icon">&#xe600;</span>
      <span class="iconfont common-header_microblog-icon">&#xe63e;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "common-header",
}
</script>

<style scoped lang="scss">
.common-header {
  background: #393d49;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px !important;
  padding: 0 60px;
  &_logo-box {
    display: flex;
    align-items: center;
  }
  &_logo-image {
    width: 50px;
    height: 50px;
  }
  &_logo-text {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
    margin-left: 10px;
    font-size: 20px;
  }
  &_public-box {
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    line-height: 1;
    &_text {
      font-size: 17px;
    }
    span {
      margin-left: 20px;
      cursor: pointer;
    }
  }
  &_user-icon {
    font-size: 38px;
  }
  &_qq-icon {
    font-size: 32px;
    margin-bottom: 4px;
  }
  &_microblog-icon {
    font-size: 40px;
  }
}
</style>
