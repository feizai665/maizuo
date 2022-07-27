// vue项目的配置文件， 覆盖vue默认配置项
// 配置文件修改重启服务器
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 暂时关闭代码格式检测  eslint

  // 配置反向代理, 将以api开头的请求， 有服务器转发给 maoyan.com
  // 服务器没有跨域限制
  devServer: {
    proxy: {
      // 以什么开头
      // '/api': {
      //   // 转发到哪
      //   target: 'https://i.maoyan.com',
      //   changeOrigin: true // true 允许转发， false不允许转发
      // },
      // 如果有 两个地址，的接口都是以 api开头， 我们需要时使用 代替接口
      '/ztf': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // 支持正则表达式
          '^/ztf': '' // 将以/ztf 开头的路径转为 ''
        }
      }
    }
  },
  // 配置别名， 相当于 找路径时 @相当于绝对路径
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views' // 访问viwes就可以访问到 views文件夹
      }
    }
  }
})
