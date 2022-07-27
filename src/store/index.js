import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // 存储状态， 会自动将数据存在  localStorage
  plugins: [createPersistedState({
    storage: window.sessionStorage, // 默认是localStorage
    // 将指定的值 存在 本地存储中
    reducer (state) {
      return {
        cityName: state.cityName,
        cityId: state.cityId
      }
    }
  })],
  // 状态管理
  state: {
    cityName: '上海',
    cityId: '310100',
    filmHead: 0,
    cinemasList: [],
    isTabShow: false
  },
  // 计算属性
  getters: {
  },
  // 统一管理, 同步状态,  可以起到监听的作用, 可以被devtools监听到变化
  mutations: {
    // 城市信息
    changeCity (state, city) {
      // console.log(city)
      state.cityName = city.name
      state.cityId = city.cityId
      // 每次更改城市, 将上个城市的影院数据清空
      state.cinemasList = []
    },
    // 电影页的header部分的高度
    filmTop (state, filmTop) {
      // console.log(filmTop)
      state.filmHead = filmTop
    },
    // 影院和搜索的数据请求得到的数据
    CinemaSearch (state, cinSea) {
      // console.log(cinSea)
      state.cinemasList = cinSea
    },
    hien (state) {
      state.isTabShow = false
    },
    show (state) {
      state.isTabShow = true
    }
  },
  // 处理异步请求
  actions: {
    asyncCinemasData (store, cinemaData) {
      return http({
        method: 'get',
        url: `/gateway?cityId=${cinemaData}&ticketFlag=1&k=3708869`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      })
        .then((result) => {
          // 请求成功后, 将数据提交给 mutations, 让他修改 状态
          store.commit('CinemaSearch', result.data.cinemas)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})

// vuex 默认管理在内存中, 刷新就会丢

// vuex 项目应用
// 1. 非父子的通信
// 2. 后端数据的缓存快照,减少重复数据请求,减少服务器压力,提高用户体验
