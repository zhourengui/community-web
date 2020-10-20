const path = require("path")
const styleResource = {
  scss: ["./src/styles/variable.scss", "./element-variables.scss"],
}
const { proxyPrefix, proxyTarget, NODE_ENV } = process.env
let proxy = {}

if (proxyPrefix && proxyTarget) {
  const prefixs = proxyPrefix.split(",")
  const targets = proxyTarget.split(",")
  proxy = prefixs
    .map((prefix, prefixIndex) => ({
      prefix,
      target: targets[prefixIndex],
    }))
    .reduce(
      (total, { prefix, target }) => ({ ...total, [prefix]: { target } }),
      {}
    )
}

if (NODE_ENV !== "production") console.log(proxy)

module.exports = {
  devServer: {
    open: true,
    proxy,
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"]
    for (let styleType in styleResource) {
      const styleTypeItem = styleResource[styleType]
      const styleTypeItemLength = styleTypeItem.length
      for (let i = 0; i < styleTypeItemLength; i++) {
        types.forEach((type) =>
          addStyleResource(
            config.module.rule(styleType).oneOf(type),
            styleTypeItem[i]
          )
        )
      }
    }
  },
}

function addStyleResource(rule, file) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, file)],
    })
}
