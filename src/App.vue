<template>
  <div class="app">
    <section>
       <router-view></router-view>
    </section>
    <Tabbar v-show="$store.state.isTabShow"></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
  components: {
    Tabbar
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
  $width:23.4375rem; // 定义css样式变量
  .app{
    width: 23.4375rem;
    li{
      list-style: none;
    }
    section{
      margin-bottom: 3.0625rem;
    }
  }
</style>
