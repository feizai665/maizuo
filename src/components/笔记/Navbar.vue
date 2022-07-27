<template>
    <div>
        我i收navbar rrrrrrrrrrr --------------{{myname}}
        <button @click="kongzhi">Navbar控制sidebar</button>
        <b v-show="mya">aaaaaaaaaaaaaaaaaaaaa</b>
    </div>
</template>
<script>
export default {
  name: 'navBar',
  props: {
    myname: String,
    mya: Boolean
  },
  data () {
    return {

    }
  },
  methods: {
    kongzhi () {
      // 子传父， 通过events 调用父组件的 某一个状态
    //   需要是字符串
      this.$emit('events')
    }
  }
}
</script>
<style lang="scss">

</style>
