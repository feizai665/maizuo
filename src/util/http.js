
import axios from 'axios'
import { Toast } from 'vant'
// 在原本axios的基础上， 进行进一步的封装
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 5000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16584516871346021275729921","bc":"210200"}'
  }
})

// 在发出请求之前拦截 -- showLoading
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 可以在配置文件中在添加一些东西
  // 在发送之前 设置loading框 （加载）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 在成功后拦截 --  hideLoading
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 当数据成功回来取消 加载状态
  Toast.clear()
  // console.log(response.data)
  return response.data
}, function (error) {
  // 对响应错误做点什么
  // 当数据失败取消 加载状态

  Toast.clear()
  return Promise.reject(error)
})
export default http
