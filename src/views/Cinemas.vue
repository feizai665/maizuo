<template>
  <div class="cniemas">
    <van-nav-bar title="影院" @click-left="$router.push('/city')" ref="navBar">
      <template #left>
        {{ cityName }}&nbsp;
        <van-icon name="arrow-down" color="#2c3e50" size="2" />
      </template>
      <template #right>
        <van-icon
          name="search"
          @click="$router.push('/cinemas/search')"
          color="#2c3e50"
          size="22"
        />
      </template>
    </van-nav-bar>
    <div
      class="box"
      :style="{
        height: height,
      }"
    >
      <Content :database="cinemasList"></Content>
    </div>
  </div>
</template>
<script>
// 引入滚动模块
import BetterScroll from 'better-scroll'
// 引入vuex
import { mapState, mapActions } from 'vuex'
//
import Content from '@/components/cinemas/CinemasCon'
export default {
  name: 'CineMas', // 路由的生命周期
  /* beforeRouteEnter (to, from, next) {
    // ...
    if (localStorage.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          fromPath: from.path,
          toPath: to.path
        }
      })
    }
  } */
  components: {
    Content
  },
  computed: {
    ...mapState(['cityName', 'cityId', 'cinemasList'])
  },
  methods: {
    ...mapActions(['asyncCinemasData'])
  },
  data () {
    return {
      // cinemaslist: [],
      height: '0px'
    }
  },
  mounted () {
    // 可以通过vuex 传值， 获取底部的高度传值
    // 这是没用vuex 的写法
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navBar.$el.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'

    //! 问题
    // 1. 每次都进行了请求, 并没有达到使用缓存的效果
    // 2. better-scroll 没有初始化
    if (this.cinemasList.length === 0) {
      // 当vuex 中的数据等于0的时候, 分发给 actions 请求数据
      // this.$store
      // 1  .dispatch('asyncCinemasData', this.$store.state.cityId) // 刚进页面, 分发给vuex的actions对象,调用asyncCinemasData方法, 并给他传了城市的id
    //  2.
      this.asyncCinemasData(this.cityId)
      //! 让第一次也进行 better-scroll 初始化, 在vuex 中的actions 的异步中, 将请求return,  axios是一个promise对象
        .then(() => {
          // 等结果返回在进行初始化
          this.$nextTick(() => {
            new BetterScroll('.box', {
              scrollbar: {
                fade: true
              }
            })
          })
        })
    } else {
      // 不等于0的时候, 使用缓存
      console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    // console.log(this.cityId)

    /*     http({
      method: 'get',
      url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=3708869`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    })
      .then((result) => {
        this.cinemaslist = result.data.cinemas
        console.log(this.cinemaslist)
        // 等dom全部渲染完， 加载滚动
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
      .catch((err) => {
        console.log(err)
      }) */
  }
}
</script>
<style scoped lang="scss">
.cniemas {
  width: 100%;
  box-sizing: border-box;
}
// 在需要滚动的大盒子外， 一定要加个 盒子， 初始化这个盒子 new betterScroll
.box {
  // 需要加高度 和 隐藏 ， 将滚动权限交给betterScroll
  overflow: hidden;
  position: relative;
}
</style>
