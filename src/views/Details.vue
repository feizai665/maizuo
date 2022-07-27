<template>
  <div class="conter" v-if="films">
    <!-- 组件封装 -->
    <details-header v-scroll ="50">
        {{films.name}}
    </details-header>
    <div class="details">
      <div class="headImg" :style="{ backgroundImage: `url(${films.poster})` }">
        <i class="iconfont icon-arrow-left-bold" @click="$router.back()"></i>
      </div>
      <div class="title">{{ films.name }}</div>
      <div class="content-text">
        <div>
          {{ films.category | strFilter }}
        </div>
        <div>{{ films.premiereAt | dataFilter }}上映</div>
        <div>{{ films.nation }} | {{ films.runtime }}分钟</div>
        <div class="synopsis" :class="isTextShow ? 'hidden' : ''">
          {{ films.synopsis }}
        </div>
        <div class="TextIcon">
          <i
            class="iconfont"
            :class="isTextShow ? ' icon-arrow-down-bold' : 'icon-arrow-up-bold'"
            @click="isTextShow = !isTextShow"
          ></i>
        </div>
      </div>
    </div>
    <div class="starring">
      <div class="starrText">演职人员</div>
      <div>
        <swiper
          :isSwiper="false"
          :option="option"
          v-if="films.actors.length"
          className="starrPerson"
        >
          <swiper-item
            v-for="data in films.actors"
            :key="data.name"
            class="starrSwiper"
          >
            <img
              :src="data.avatarAddress | urlFilter"
              alt=""
              class="starrimg"
            />
            <div class="starrName">
              {{ data.name }}
            </div>
            <div class="starrRole">
              {{ data.role }}
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div class="starring">
      <div class="starrText">剧照</div>
      <div>
        <swiper
          :isSwiper="false"
          :option="photos"
          v-if="films.photos.length"
          className="photos"
        >
          <swiper-item
            v-for="(data,index) in films.photos"
            :key="data.name"
            class="starrSwiper photosSwiper"
          >
            <img :src="data" alt="" class="photosimg" @click="Preview(index)" />
            <div class="starrName">
              {{ data.name }}
            </div>
            <div class="starrRole">
              {{ data.role }}
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
// 函数调用图片预览
import { ImagePreview } from 'vant'

import swiper from '@/components/films/Swiper'
import swiperItem from '@/components/films/SwiperItem'
import detailsHeader from '@/components/details/DetailsHeader'
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
// 设置语言
moment.locale('zh-cn')
// console.log()
Vue.filter('dataFilter', (data) => {
  //   console.log(data)
  // 将时间搓 转为 年月份的格式
  return moment(data * 1000).format('YYYY-MM-DD')
})
Vue.filter('strFilter', (data) => {
  return data.replace('|', ' | ')
})
Vue.filter('urlFilter', (data) => {
  return data + '?x-oss-process=image/quality,Q_70'
})
Vue.directive('scroll', {
  // 操作底层dom
  // 获取完dom节点 执行
  inserted (el, binding) {
    // console.log(el,binding.value)
    el.style.display = 'none'
    window.onscroll = function () {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  //   销毁指令执行
  upbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      films: null,
      isTextShow: true,
      option: {
        slidesPerView: 3.5,
        spaceBetween: 30,
        freeMode: true
      },
      photos: {
        slidesPerView: 2.2,
        spaceBetween: 30,
        freeMode: true
      }
    }
  },
  components: {
    swiper,
    swiperItem,
    detailsHeader
  },
  mounted () {
    console.log(this.$route.params.id)
    http({
      method: 'get',
      url: '/gateway?filmId=' + this.$route.params.id + '&k=401318',
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res)
      this.films = res.data.film
      console.log(this.films)
    })
  },
  methods: {
    Preview (index) {
      ImagePreview({
        images: this.films.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.conter {
  background: rgb(244, 244, 244);
}
.details {
  width: 100%;
  font-family: "微软雅黑";
  padding-bottom: 0.9375rem;
  margin-bottom: 0.625rem;
  background: #fff;
  .headImg {
    width: 100%;
    height: 13.125rem;
    background-position: center;
    background-size: cover;
    position: relative;
    i{
        position: absolute;
        width: 1.875rem;
        height: 1.875rem;
        line-height: 1.875rem;
        text-align: center;
        border-radius: 50%;
        background: rgba(244,244,244,.5);
        font-size: 1.25rem;
        font-weight: normal;
        color:#535558;
        left: .9375rem;
        top: .625rem;
    }
  }
  .title {
    font-size: 1rem;
    padding-top: 0.9375rem;
    padding-left: 0.9375rem;
  }
  .content-text {
    font-size: 0.8125rem;
    color: #797d82;
    margin-top: 0.375rem;
    padding-left: 0.9375rem;
    div {
      margin-top: 0.25rem;
    }
    div:last-child {
      padding-top: 0.625rem;
    }
    .synopsis {
      line-height: 1rem;
      padding-top: 0.625rem;
    }
    .TextIcon {
      text-align: center;
      margin-top: 0;
      padding-top: 0.25rem !important;
    }
    .hidden {
      height: 1.875rem;
      overflow: hidden;
    }
  }
}
.starring {
  background: #fff;
  // padding: .9375rem 0 0 .9375rem;
  width: 23.4375rem;
  box-sizing: border-box;
  padding-top: 0.9375rem;
  // padding-left: .9375rem;
  margin-bottom: 0.625rem;
  .starrText {
    padding-left: 0.9375rem;
    // padding-bottom: 0.9375rem;
  }
  .starrSwiper {
    padding-left: 0.9375rem;

    margin: 0 !important;
    text-align: center;
    div {
      margin-top: 0.25rem;
    }
    .starrimg {
      width: 5rem;
      height: 6.9375rem;
    }
    .photosimg {
      width: 9.375rem;
      height: 6.25rem;
    }

    .starrName {
      font-size: 0.9375rem;
    }
    .starrRole {
      font-size: 0.8125rem;
      color: #797d82;
    }
  }
    .photosSwiper {
        width: 9.375rem;
        height: 6.25rem;
    }
  .photosSwiper:nth-of-type(1) {
    width: 172.5px;
    height: 6.25rem;
    position: relative;
    overflow: hidden;
    .photosimg:nth-last-of-type(1) {
      width: 9.375rem;
      height: 14rem;
      position: absolute;
      top: -2rem;
      left: 0.9375rem;
    }
  }
}
.starrPerson {
    padding: 1.5625rem 0;
}
.photos{
    padding: 1.5625rem 0;
}
</style>
