# front-end

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 正则验证

(vuelidate)[https://github.com/vuelidate/vuelidate]

## Alert 插件编写

alert.js

```js
import AlertComponent from "Alert.vue"
const Alert = {}
Alert.install = function(Vue) {
  if (this.installed) return
  this.installed = true
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement("div"))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = "alert"
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm = (msg, onSuccess, onCancle) => {
    instance.type = "confirm"
    instance.msg = "msg"
    instance.isShow = true
    typeof onSuccess === "function" && (instance.success = onSuccess)
    typeof onCancle === "function" && (instance.cancle = onCancle)
  }
}
export default Alert
```

## SEO

网站 SEO 重要的一个部分就是网站的性能优化

- 资源压缩，请求压缩
- 设置缓存，设置 dns 预处理
- 使用 CDN
