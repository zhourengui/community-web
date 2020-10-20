<template>
  <el-container class="public">
    <common-header></common-header>
    <el-main class="public_main">
      <div class="public_content">
        <div class="public_content_tabs">
          <span
            @click.stop="tabClick(tab)"
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'public_content_tabs--active': tab.name === currentTab }"
            >{{ tab.name }}</span
          >
        </div>
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </el-main>
    <common-footer></common-footer>
  </el-container>
</template>

<script>
const tabMap = {
  "/public/login": "登录",
  "/public/register": "注册",
  "/public/forget": "找回密码",
  "/public/reset": "重置密码",
}
export default {
  name: "public",
  data() {
    return {
      currentTab: "",
      tabs: [],
    }
  },
  created() {
    this.initCurrentTab()
  },
  methods: {
    tabClick({ name, to }) {
      name !== this.currentTab &&
        (this.currentTab = name) &&
        this.$router.replace(to)
    },
    initCurrentTab() {
      const currentRoutePath = this.$route.path
      const tabPaths = Object.keys(tabMap)
      const tabIndex = tabPaths.indexOf(currentRoutePath)
      let visiablePaths = []
      tabIndex !== 0 && (visiablePaths = [tabPaths[0], tabPaths[tabIndex]])
      tabIndex === 0 && (visiablePaths = [tabPaths[0], tabPaths[1]])
      this.tabs = visiablePaths.map((path) => ({
        to: path,
        name: tabMap[path],
      }))
      this.currentTab = tabMap[currentRoutePath]
    },
  },
  watch: {
    "$route.path": function (val) {
      this.initCurrentTab()
    },
  },
}
</script>

<style scoped lang="scss">
.public {
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  &_main {
    padding: 0 60px;
  }
  &_content {
    padding: 0 30px;
    padding-top: 20px;
    background: #fff;
    overflow: hidden;
    &_tabs {
      height: 60px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-bottom: 2px solid #eee9e9;
      display: flex;
      span {
        display: flex;
        width: 140px;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      &--active {
        color: $--color-primary;
        position: relative;
        &::before {
          content: "";
          width: 100%;
          height: 2px;
          background: $--color-primary;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
  ::v-deep .el-input {
    width: 300px !important;
  }
}
</style>
