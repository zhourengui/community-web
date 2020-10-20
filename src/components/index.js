const modulesFiles = require.context("./", true, /\.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1") // 获取文件名
  const value = modulesFiles(modulePath) // 获取文件
  modules[moduleName] = value.default
  return modules
}, {})

class InstallComponents {
  install(Vue) {
    if (!this.installed) {
      this.installed = true
      Object.keys(modules).forEach((module) =>
        Vue.component(modules[module].name, modules[module])
      )
    }
  }
}

export default InstallComponents
