<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="(data) in datalist"
        :key="data.filmId"
        @click="$router.push(`/details/${data.filmId}`)"
      >
        <div class="nowplay">
          <img :src="data.poster" alt="" />
          <div class="content">
            <p>
              {{ data.name }} <i>{{ data.filmType.name }}</i>
            </p>
            <div :class="data.grade ? '' : 'hidden'">
              观众评分 <span>{{ data.grade }}</span>
            </div>
            <div class="actors">主演: {{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
          <button>购票</button>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
// import axios from 'axios'
import http from '@/util/http'
import Vue from 'vue'
import { mapState } from 'vuex'
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) {
    return '暂无主演'
  }
  return data.map((item) => item.name).join(' ')
})
export default {
  name: 'NowPlaying',
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      num: 1,
      total: 0
    }
  },
  computed: {
    ...mapState(['cityId'])
  },
  mounted () {
    http({
      method: 'get',
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=9960287`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      this.datalist = res.data.films
      console.log(this.datalist)
      this.total = res.data.total
    })
  },
  methods: {
    onLoad () {
      // 总长度 等于该 接口响应条数 停止
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.num++
      console.log(this.num)
      http({
        method: 'get',
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.num}&pageSize=10&type=1&k=9960287`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.films)
        this.datalist = [...this.datalist, ...res.data.films]
        console.log(this.datalist)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.nowplay {
  width: 100%;
  overflow: hidden;
  padding: 0.9375rem;
  box-sizing: border-box;
  position: relative;
  img {
    width: 5rem;
    height: 6.875rem;
    float: left;
  }
  .hidden {
    visibility: hidden;
  }
  .content {
    width: 60%;
    margin: 0.5rem 0.625rem;
    float: left;
    p {
      font-size: 1rem;
      i {
        font-style: normal;
        background: rgb(210, 214, 220);
        font-size: 0.875rem;
        color: #fff;
      }
    }
    div {
      font-size: 0.85rem;
      color: rgb(133, 133, 137);
      padding: 0.0625rem 0;
      span {
        color: rgb(255, 181, 105);
        font-size: 1rem;
      }
    }
    .actors {
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  button {
    position: absolute;
    // padding: 0 .625rem;
    width: 3.5rem;
    height: 2rem;
    font-size: 1rem;
    right: 0.9375rem;
    top: 30%;
    border: 0.0625rem solid rgb(239, 195, 175);
    color: rgb(255, 110, 44);
    background: #fff;
    border-radius: 0.0625rem;
  }
}
</style>
