// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@icons': path.resolve(__dirname, 'src/components/icons'),
      }
    }
  }
});
