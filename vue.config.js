module.exports = {
      lintOnSave: false, //关闭语法检查
      devServer: {
            proxy: {
              '/admin': {
                target: 'http://localhost:8021',
                pathRewrite: {'^/admin':''},
              }
            }
      }
}