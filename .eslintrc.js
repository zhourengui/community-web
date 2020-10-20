const isDevMode = process.env.NODE_ENV !== "production"

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": isDevMode ? 0 : 2,
    "no-debugger": isDevMode ? 0 : 2,
    semi: [2, "never"],
    quotes: [2, "double"],
    "no-extra-semi": 2,
    "comma-dangle": 0,
    "space-before-function-paren": 0,
  },
}
