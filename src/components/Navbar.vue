<template>
    <ul class="navbar" ref="navBar">
        <router-link to="/films/nowplaying" custom v-slot="{navigate,isActive}" >
            <li @click="navigate">
                <span  :class="isActive?'activeColor':''">正在热映</span>
            </li>
        </router-link>
          <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}" >
            <li @click="navigate">
                <span  :class="isActive?'activeColor':''">即将上映</span>
            </li>
        </router-link>
    </ul>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  mounted () {
    console.log(this.$refs.navBar.offsetTop)
    const heightTop = this.$refs.navBar.offsetTop + this.$refs.navBar.offsetHeight
    this.filmTop(heightTop)
  },
  methods: {
    ...mapMutations(['filmTop'])
  }
}
</script>
<style lang="scss" scoped>
    .navbar{
        // position: sticky;
        // top: 0px;
        background: #fff;
        z-index: 10;
        width: 23.4375rem;
        height: 3.0625rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 3.0625rem;
        li{
            flex: 1;
            text-align: center;
            height: 3.0625rem;
            span{
                display: inline-block;
                height: 100%;
                box-sizing: border-box;
                font-size: .875rem;
            }
        }
    }
    .activeColor{
        color:  #ff5f16;
        border-bottom: 2px solid  #ff5f16;
    }
</style>
