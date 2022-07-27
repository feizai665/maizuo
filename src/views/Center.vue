<template>
    <div>
        center
        <van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button><van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
    </div>
</template>
<script>
import http from '@/util/http'
export default {
  name: 'CenTer',
  mounted () {
    http({
      method: 'get',
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9960287',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
    <style scoped>
</style>
