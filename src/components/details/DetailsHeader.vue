<template>
<!-- 组件封装 -->
<div class="header">
    <i class="iconfont icon-arrow-left-bold" @click="$router.back()"></i>
    <slot></slot>
</div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
    .header{
        width: 100%;
        height: 2.75rem;
        line-height: 2.75rem;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 10;
        i{
            font-size: 1.25rem;
            color: #191a1b;
            position: fixed;
            left: .25rem;
            top: 0;
                    height: 2.75rem;
        line-height: 2.75rem;
        }
        .icon-arrow-left-bold:before{
            font-weight: normal !important;
        }
    }
</style>
