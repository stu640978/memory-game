const { defineConfig } = require("@vue/cli-service");

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/global_style.scss";
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack').default({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-vue-components/webpack').default({
        resolvers: [ElementPlusResolver()]
      }),
    ],
  }
});
