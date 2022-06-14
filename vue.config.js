const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false,
  devServer: {
    proxy: {
      // http://localhost:8080/api/banner -> http://39.102.89.187:7001/banner
      "^/api": {
        target: `http://39.102.89.187:7001`,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
})