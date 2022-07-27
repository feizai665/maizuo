<template>
  <div class="swiper" :class="className">
    <div class="swiper-wrapper" >
      <slot></slot>
    </div>
    <div class="swiper-pagination" v-if="isSwiper"></div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle' // 全部圈闭
import 'swiper/css/bundle'
export default {
  props: {
    option: Object, // 规定传来的类型
    isSwiper: Boolean,
    className: {
      type: String,
      default: 'swiper'
    }
  },
  mounted () {
    new Swiper('.' + this.className, this.option)
  }
}
</script>
<style scoped>

</style>
