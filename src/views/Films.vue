<template>
  <div>
    <swiper
      :option="options"
      :isSwiper="true"
      :key="datalist.length"
      class="swiper"
    >
      <swiper-item v-for="data in datalist" :key="data.id" class="swiperItem">
        <img :src="data.imgUrl" alt="" />
      </swiper-item>
    </swiper>
    <!-- 导航栏 -->
    <div :class="isNavFixed ? 'fixed' : ''">
    <van-nav-bar title="电影" @click-left="$router.push('/city')" ref="navBar" v-show="isNavFixed">
      <template #left>
        {{ cityName }}&nbsp;
        <van-icon name="arrow-down" color="#2c3e50" size="2" />
      </template>
    </van-nav-bar>
    <navbar ></navbar>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import swiper from '@/components/films/Swiper.vue'
import swiperItem from '@/components/films/SwiperItem.vue'
import axios from 'axios'
import navbar from '@/components/Navbar.vue'
// 引入vuex
import { mapState } from 'vuex'
export default {
  name: 'myFilms',
  data () {
    return {
      isNavFixed: false,
      options: {
        // loop: true, // 循环模式选项
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      },
      datalist: []
    }
  },
  computed: {
    ...mapState(['cityName', 'filmHead'])
  },
  mounted () {
    axios.get('/swiper.json').then((res) => {
      this.datalist = res.data.banner
    })
    window.onscroll = () => {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        this.filmHead
      ) {
        this.isNavFixed = true
      } else {
        this.isNavFixed = false
      }
    }
  },
  destroyed () {
    window.onscroll = null
  },
  components: {
    swiper,
    swiperItem,
    navbar
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  width: 23.4375rem;
  height: 10.793rem;
}
.swiperItem {
  img {
    width: 100%;
    height: 10.75rem;
  }
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  background: #fff;
}
.van-nav-bar__left{
  font-size: .6875rem;
}
</style>
