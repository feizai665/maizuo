<template>
    <div>
        <ul class="hotShowing">
            <li><button @click="getAxios">加载图片</button></li>
            <li v-for="data in datalist" :key="data.id">{{data.videoName}}
              <video class="video" controls>
                  <source :src="data.videourl" type="video/mp4">
                  <source src="movie.ogg" type="video/ogg">
              </video>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'sideBar',
  data () {
    return {
      datalist: []
    }
  },
  methods: {
    getAxios () {
      axios.get('/test.json')
        .then(res => {
          this.datalist = res.data
          console.log(this.datalist)
        })
    }
  },
  mounted () {
    axios.get('/ztf/api/mmdb/movie/v3/list/hot.json?ct=%E9%83%91%E5%B7%9E&ci=73&channelId=4')
      .then(res => {
        console.log(res)
      })
  }
}
</script>
<style lang="scss" scoped>
    ul{
        // background: yellow;
    }
    .hotShowing{
        width: 400px;
        li{
            border: 1px solid #ccc;
        }
    }
    .video{
        width: 300px;
        height: 380px;
    }
</style>
