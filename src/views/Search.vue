<template>
  <div>
    <van-search
    class="search"
    v-model.trim="value"
    show-action
    placeholder="请输入搜索关键词"
    @cancel="onCancel"
  />
  <div v-if="value">
    <Content :database="SearchList"></Content>
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Content from '@/components/cinemas/CinemasCon'
export default {
  name: 'searchName',
  data () {
    return {
      value: ''
    }
  },
  components: {
    Content
  },
  computed: {
    ...mapState(['cinemasList']),
    SearchList () {
      return this.cinemasList.filter(item => {
        return item.name.toUpperCase().includes(this.value.toUpperCase()) === true || item.address.toUpperCase().includes(this.value.toUpperCase()) === true
      })
    }
  },
  mounted () {
    if (this.cinemasList.length === 0) {
      // 当vuex 中的数据等于0的时候, 分发给 actions 请求数据
      this.$store.dispatch('asyncCinemasData', this.$store.state.cityId)
    } else {
      console.log('缓存')
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.search{
  width: 100%;
  height: 3.0625rem;
  .van-search__content{
    width: 18.75rem;
    height: 1.875rem;
    background: #f4f4f4;
    .van-field__control{
      font-size: .8125rem;
      color: #000;
    }
  }
}

</style>
