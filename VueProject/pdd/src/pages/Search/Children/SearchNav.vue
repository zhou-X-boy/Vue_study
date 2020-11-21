<template>
  <div class="search-nav">
    <a href="" class="search-nav-icon" @click.prevent="isShowSearchPanel(true)">
      <img src="../images/search.png" alt="" width="25px">
      <span>拼多多</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "SearchNav",
  props: {
    isShowSearchPanel : Function
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.search-nav
  width 100%
  height 60px
  background-color #ffffff
  border-bottom-1px(#cccccc)  //导入的mixins.style中的一个样式   1px下边线
  position fixed
  display flex  //伸缩布局
  justify-content center  //水平居中
  align-items center    //垂直居中
  z-index 1000
  .search-nav-icon
    width 90%
    height 70%
    background-color #e8e8e8
    border-radius 10px //边框角
    display flex //伸缩布局
    justify-content center  //水平居中
    align-items center  //垂直居中
    span
      color #aaa
      margin-left 6px
      font-size 18px
      font-weight lighter  //字体变细
</style>
