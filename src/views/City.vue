<template>
  <div class="city">
    <van-index-bar :index-list="indexList" @select="citySelect">
      <div v-for="letter in datalist" :key="letter.type">
        <van-index-anchor :index="letter.type" />
        <van-cell
          :title="data.name"
          v-for="data in letter.citylist"
          :key="data.cityId"
          @click="cityClick(data)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    http({
      url: '/gateway?k=125943',
      method: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      //   this.datalist = res.data.cities
      //   console.log(this.datalist)
      // 实现高聚合低耦合， 将处理的操作， 交给methods
      this.filterCity(res.data.cities)
    })
  },
  computed: {
    indexList () {
      return this.datalist.map(item => item.type)
    }
  },
  methods: {
    filterCity (list) {
      //   console.log(list)
      const newLetter = []
      for (let i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i))
        newLetter.push(String.fromCharCode(i))
      }
      //   console.log(newLetter) // 26个字母
      newLetter.forEach((letter) => {
        const cityArr = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        if (cityArr.length === 0) {
          return
        }
        this.datalist.push({
          type: letter,
          citylist: cityArr
        })
      })
      console.log(this.datalist)
    },
    // 选择 城市索引时， 轻提示 首字母
    citySelect (data) {
      Toast(data)
    },
    cityClick (data) {
    //   console.log(data.name)
    //   console.log(data.cityId)
      this.$store.commit('changeCity', data)

      this.$router.back()
      //  选择城市， 需要在 film页面和cinemas页面使用该 id值
      // 1. 传统的多页面方案 ----------- 页面逻辑复杂， 每个页面都要使用 getItem和setItem
      //      1.1: location.href = '#/cinemas?cityname=' + data.name
      //      2.2: cookie, localStorage

      // 2. 单页面应用 ---------- 页面逻辑复杂，每个页面都要使用 $on $emit
      //    2.1: 中间人模式
      //    2.2：事件总线 bus：$on和$emit

    //   最好的解决方法
      // 使用 vuex--状态管理模式
    }
  }
}
</script>
<style lang="scss">
//  需要设置成全局样式，否则没有效果
    .van-toast--html, .van-toast--text{
        min-width: 1.875rem;
    }

</style>
