import Vue from "vue"
import App from "./App.vue"
import VueI18n from "vue-i18n"
import enLocale from "element-ui/lib/locale/lang/en"
import zhLocale from "element-ui/lib/locale/lang/zh-CN"
import { v4 as uuidv4 } from "uuid"
import router from "./router"
import store from "./store"
import {
  Container,
  Main,
  Form,
  FormItem,
  Input,
  Button,
  TabPane,
  Tabs,
  Message,
} from "element-ui"
import http from "@/utils/http"
import regExp from "@/utils/regExp"
import InstallComponents from "@/components/index.js"
import "normalize.css"
import "@/assets/iconfont/iconfont.css"

Vue.use(VueI18n)
  .use(Container)
  .use(Main)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(TabPane)
  .use(Tabs)
  .use(new InstallComponents())

Vue.config.productionTip = false
Vue.config.lang = "zh-cn"
Vue.locale("zh-cn", zhLocale)
Vue.locale("en", enLocale)
Vue.prototype.$http = http
Vue.prototype.$regExp = regExp
Vue.prototype.$message = Message

// 设置本地的唯一标识
const sid = uuidv4()
const localStorageSid = localStorage.getItem("sid")
localStorageSid && store.commit("auth/setSid", localStorageSid)
!localStorageSid &&
  localStorage.setItem("sid", uuidv4()) &&
  store.commit("auth/setSid", sid)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
