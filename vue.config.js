module.exports = {
  lintOnSave: false, //关闭语法检查
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://192.168.1.104:8200',
      },
      '/user': {
        target: 'http://192.168.1.104:8201',
      },
      '/publish': {
        target: 'http://192.168.1.104:8202',
      },
      '/team': {
        target: 'http://192.168.1.104:8204',
      }
    }
  }
}