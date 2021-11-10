module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://toutiao.itheima.net',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: '#3296FA',
          'text-color': '#333'
        }
      }
    }
  }
}
