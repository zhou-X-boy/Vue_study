<template>
  <a class="recommend-item"  >
    <img :src="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">￥{{item.price / 100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn">加入购物车</button>
    </div>
  </a>
</template>

<script>
export default {
  name: "ShopList",
  props: {
    item: Object
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend-item:nth-child(2n-1)  //奇数列表
  margin-right 1px
.recommend-item
  width 49.5%
  background-color #ffffff
  padding-bottom 15px
  margin-bottom 15px
  .item-title
    line-height 20px
    font-size 10px
    font-weight lighter
    height 20px
    overflow hidden   //超出部分隐藏
    margin  0 5px //外部上下  左右  边距
    padding 0 8px //内部上下  左右 边距
  .item-bottom
    display flex  //伸缩布局
    flex-direction row  //横向分布，排列一行
    align-items center //垂直居中
    padding 0 4px  //内部上下  左右 边距
    .item-price
      flex 2
      color red
      font-weight bolder
      font-size 10px
      margin-left -3px
    .item-sales
      flex 4
      font-size 6px
      color #666666
    .item-btn
      flex 4
      border 1px solid orange
      height 25px
      border-radius 5px
      font-size 10px
      background-color transparent  //背景透明
      color red
</style>
