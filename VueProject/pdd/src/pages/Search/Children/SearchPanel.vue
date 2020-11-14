<template>
  <div class="search-panel">
    <!--搜索框-->
    <div class="search-nav">
      <div class="search-input">
        <img src="../images/search.png" alt="" width="25px">
        <label>
          <input ref="mySearch" type="search" placeholder="拼多多">
        </label>
      </div>
      <button @click.prevent="isShowSearchPanel(false)">取消</button>
    </div>
    <!--内容-->
    <div class="search-content">
      <div class="title">
        <img src="../images/hot.png" alt="" width="25">
        <span>热门搜索</span>
      </div>
      <ul class="search-list">
        <li>抽纸批发</li>
        <li>浴巾可穿</li>
        <li>石榴水果</li>
        <li>富豪卷纸</li>
        <li>冰箱收纳盒</li>
        <li>毛巾衣服</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    isShowSearchPanel: Function
  },
  //生命周期函数，DOM创建时调用
  mounted() {
    //focus() 获取焦点
    this.$refs.mySearch.focus();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.search-panel
  width 100%
  height 100%
  background-color #fff
  position fixed  //生成固定定位的元素，相对于浏览器窗口进行定位
  left 0
  top 0
  z-index 1000
  .search-nav
    width 100%
    height 10vh
    border-bottom-1px(#ddd)
    padding 0 20px  //内部距边框上下 左右 距离
    display flex //伸缩布局
    flex-direction row //水平显示对齐
    justify-content space-between  //项目位于各行之间留有空白的容器内。
    align-items center //垂直居中
    .search-input
      display flex //伸缩布局
      flex-direction row //水平显示对齐
      align-items center //垂直居中
      background-color #ededed
      width 85%
      height 6vh
      border-radius 10px //边框角
      padding 0 10px //内部距边框上下 左右 距离
      margin 0 5px   //外部距上下 左右 距离
      input
        width 120%
        height 7vh
        padding-left 13px
        background-color transparent //背景透明
        font-size 16px
        outline none  //去除获取焦点时显示的边框
    button
      background-color transparent  //背景透明
      color #aaa
      font-size 14px
  .search-content
    padding 30px 15px  //内部距上下 左右 边距
    .title
      display flex  //伸缩布局
      flex-direction row //水平分布显示
      align-items center //垂直居中
      color #aaa
      margin-bottom  10px
    .search-list
      display flex  //伸缩布局
      flex-direction row  //水平分布
      flex-wrap wrap  //超出部分自动换行
      li
        background-color #ededed
        color #aaa
        margin 5px 10px //外部距上下 左右 边距
        padding 5px
        border-radius  8px
        font-size 13px
        font-weight lighter //字体变细
</style>
