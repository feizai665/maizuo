<template>
<footer>
  <ul>
    <!--
      当vue-router 路由版本为3或3以下时，tag属性好使不会报错，
      当vue-router版本为4时  tag属性就会去掉， 我们想转其他标签时应该用插槽
      vue-router.esm.js?3423:16 [vue-router] <router-link>'s tag prop is deprecated and has been removed in Vue Router 4. Use the v-slot API to remove this warning -->
    <!-- <router-link to='/films' tag="li" active-class="avtiveColor">films</router-link>
    <router-link to='/cinemas' tag="li" active-class="avtiveColor">cinemas</router-link>
    <router-link to='/center' tag="li" active-class="avtiveColor">center</router-link> -->

    <!-- 使用插槽写法：加active-class就不好用了 需要使用 custom 自定义，加上v-slot="{navigate,isActive}"  给router-link里的标签加 点击事件触发 navigate， 点击的时候vue会自己去跳转到to的路径isActive 判断是否选中，选中为 true没选中为 false-->
    <router-link
      :to="path.path"
      custom
      v-slot="{ navigate, isActive }"
      v-for="path in tiaozhuan"
      :key="path.id"
    >
      <li @click="navigate" :class="isActive ? 'avtiveColor' : ''">
        <i :class="'iconfont '+path.icon"></i>{{ path.text }}
      </li>
    </router-link>
  </ul>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      tiaozhuan: [
        {
          path: '/films',
          text: '首页',
          icon: 'icon-dianyingpiaoiocn',
          id: 1
        },
        {
          path: '/cinemas',
          text: '影院',
          icon: 'icon-yingyuan',
          id: 2

        },
        {
          path: '/center',
          text: '我的',
          icon: 'icon-wode',
          id: 3

        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.avtiveColor {
  color: red;
}
footer{
  width: 100%;
  height: 3.0625rem;
  position: fixed;
  background: #fff;
  z-index: 2;
  bottom: 0;
  right: 0;
  ul{
    display: flex;
    justify-content: space-around;
    // height: 100%;
  line-height: 1.5313rem;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1rem;
      i{
        font-size: 1rem;
      }
    }
  }
}
</style>
