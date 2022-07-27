<template>
<ul>
        <li v-for="data in database" :key="data.cinemaId">
          <div class="left">
            <div>
              {{ data.name }}
            </div>
            <span>
              {{ data.address }}
            </span>
          </div>
          <div class="right">
            <div>￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
</template>
<script>
export default {
  props: ['database']
}
</script>
<style scoped lang="scss">
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.9375rem 0.9375rem;
    box-sizing: border-box;
    .left {
      width: 13.4375rem;
      span {
        display: inline-block;
        padding-top: 0.625rem;
        font-size: 0.8125rem;
        width: 13.4375rem;
        color: #535558;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      color: red;
    }
  }
</style>
