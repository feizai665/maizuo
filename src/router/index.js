import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    component: () => import('@/views/Films'),
    // 嵌套路由
    children: [
      {
        path: '/films/nowplaying',
        component: () => import('@/views/films/Nowplaying')
      },
      {
        path: '/films/comingsoon',
        component: () => import('@/views/films/ComingSoon')
      },
      {
        path: '/films',
        redirect: '/films/nowplaying' // 重定向
      }
    ]
  },
  {
    path: '/cinemas',
    component: () => import('@/views/Cinemas')
    //!  独享路由配置
    /* beforeEnter: (to, from, next) => {
      // ...
      if (localStorage.token) {
        next()
      } else {
        // 记录登录状态， 保存在会话空间内， 登录成功后跳转回之前路径
        // sessionStorage.setItem('fromPath', from.path)
        next({
          path: '/login',
          query: {
            fromPath: from.path,
            toPath: to.path
          }
        })
      }
    } */
  },
  {
    path: '/cinemas/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/city',
    component: () => import('@/views/City'),
    meta: {
      isShowTab: true
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    //! 路由元信息, 可以在拦截的时候， 判断此值
    meta: {
      isRouterHold: true
    }
  },
  {
    path: '/details/:id',
    component: () => import('@/views/Details'),
    meta: {
      isShowTab: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  mode: 'history', // mode: 'hash'
  // ! history  路由不带#号， 虽是前端路由但是 样子是后端路由样子， 浏览器可能会认为是后端路由。。去后端路由找
  // ! 解决方法： 在vue官方文档中，  需要让后端人员在后端服务器 将处理不了的路径， 重定向到前端的index.html

  // ! hash  前端路由
  // base: process.env.BASE_URL,
  routes
})

//! 路由拦截
router.beforeEach((to, from, next) => {
  // console.log(from)
  // 路由拦截
  //! 1. 如果去的路径是 center 则判断有没有登录
  /*   if (to.path === 'center') {
    if (localStorage.token) {
      next()
    } else {
      next('login')
    }
  } else {
    next()
  } */
  if (to.meta.isShowTab) {
    store.commit('hien')
  } else {
    store.commit('show')
  }
  //! 2. 通过在配置路由时加上， 一个状态， 等于true说明要拦截（黑名单）， 等于false说明不拦截（白名单）
  //!     通过to.meta.状态 可以知道是否拦截

  if (to.meta.isRouterHold) {
    if (localStorage.token) {
      next()
    } else {
      // 记录登录状态， 保存在会话空间内， 登录成功后跳转回之前路径
      // sessionStorage.setItem('fromPath', from.path)
      next({
        path: '/login',
        query: {
          fromPath: from.path,
          toPath: to.path
        }
      })
    }
  } else {
    next()
  }
})
export default router
