<template>
  <div>
    login
    <button @click="login">登录</button>
  </div>
</template>
<script>
export default {
  name: 'loginName',
  methods: {
    login () {
      localStorage.setItem('token', '后台请求回来的token')
      //   1 .....
      //   const path = sessionStorage.fromPath
      //   this.$router.push(path)

      // 2. ...
      //   路由拦截跳转时使用 query传参 把从哪来到哪去的路径传过来
      /* fromPath: "/films/nowplaying"
        toPath: "/center" */
      console.log(this.$route)
      this.$router.push(this.$route.query.toPath)
    }
  }
}
</script>
<style scoped>
</style>
