module.exports = {
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    // overlay: {
    //     warnings: false,
    //     errors: false
    // },
    port: 8081, // 端口号
    proxy: {
      '/apis': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apis': '', //请求的时候使用这个api就可以
        },
      },
    },
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: "@import '~@/styles/variables.scss';",
      },
    },
  },
  lintOnSave: true,
};
