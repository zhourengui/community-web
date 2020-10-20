import Vue from "vue"
import VueRouter from "vue-router"
import Public from "@/views/public"
const Login = () =>
  import(/* webpackChunkName: 'login' */ "@/views/public/components/Login.vue")
const Register = () =>
  import(
    /* webpackChunkName: 'register' */ "@/views/public/components/Register.vue"
  )
const Forget = () =>
  import(
    /* webpackChunkName: 'forget' */ "@/views/public/components/Forget.vue"
  )
const Reset = () =>
  import(/* webpackChunkName: 'reset' */ "@/views/public/components/Reset.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: "/public",
    name: "public",
    component: Public,
    redirect: "/public/login",
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
      {
        path: "forget",
        name: "forget",
        component: Forget,
      },
      {
        path: "reset",
        name: "reset",
        component: Reset,
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const whites = ["login", "register", "forget", "reset"]
router.beforeEach((to, from, next) => {
  const isWhite = whites.includes(to.name)
  if (isWhite) return next()
  if (!isWhite) {
    const token = localStorage.getItem("token")
    token && next()
    !token && next({ name: "login" })
  }
})

export default router
