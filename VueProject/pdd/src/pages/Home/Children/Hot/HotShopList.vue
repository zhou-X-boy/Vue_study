<template>
  <div class="shop-container" v-if="homeshoplist.length > 0">
    <ul class="shop-list">
      <li class="shop-list-item" v-for="(shop,index) in homeshoplist" :key="index" >
        <img :src="shop.image_url" alt="" width="100%" >
        <h4 class="list-item-title">{{shop.goods_name}}</h4>
        <div class="list-item-bottom">
          <span class="item-price">￥{{shop.normal_price / 100}}</span>
          <span class="item-counter">{{shop.sales_tip}}</span>
          <span class="item-user">
            <img :src="user.avatar" alt="" v-for="(user,index1) in shop.bubble" :key="index1" >
          </span>
          <span class="item-buy">
            <button>去拼单 ></button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import {
  mapState
} from 'vuex'

export default {
  name: "HotShopList",
  //生命周期函数，组件创建后调用
  mounted() {
    //2：请求首页商品列表数据
    this.$store.dispatch('reqHomeShopList');
  },
  computed: {
    //3：获取商品列表数据
    ...mapState(['homeshoplist'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.shop-container
  margin-bottom 50px
  background-color #f5f5f5
  .shop-list
    .shop-list-item
      margin-bottom 10px
      background-color #ffffff
      display flex //伸缩布局
      flex-direction column //灵活的项目将垂直显示，正如一个列一样。
      .list-item-title
        line-height 22px  //设置行高
        width 94%
        margin-left 3%
        height 44px
        overflow hidden //超出隐藏
      .list-item-bottom
        margin 10px 0
        display flex //伸缩布局
        flex-direction row //水平分布
        justify-content space-around //位于各行之前、之间、之后都留有空白的容器内。
        align-items center  //垂直居中
        .item-price
          font-size 18px
          font-width border
          color red
          text-align center
          flex 1 //在.list-item-bottom中占一份位置
        .item-counter
          flex 2 //在.list-item-bottom中占两份位置
          font-size 12px
          color #cccccc
        .item-user
          display flex //伸缩布局
          justify-content center //水平居中
          align-items center //垂直居中
          flex 1 //在.list-item-bottom中占一份位置
          img
            width 40%
            border-radius 50% //将图片设置为圆角
          img:nth-child(2)
            margin-left -7%
        .item-buy
          flex 2 //在.list-item-bottom中占两份位置
          button
            width 80%
            height 34px
            font-size 15px
            border none  //去除按钮的边框
            color #ffffff
            display flex //伸缩布局
            justify-content center  //水平居中
            align-items center   //垂直居中
            background-color red
            margin-left 7%
            border-radius 8px
</style>
