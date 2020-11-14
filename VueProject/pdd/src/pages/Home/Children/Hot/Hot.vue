<template>
  <div class="hot">
    <!--轮播图-->
    <hot-lb/>
    <!--中间的nav-->
    <hot-nav/>
    <!--广告位-->
    <hot-ad/>
    <!--商品列表-->
    <hot-shop-list/>
  </div>
</template>

<script>
//引入其他组件
import HotLb from "./HotLb";
import HotNav from "./HotNav";
import HotAd from "./HotAd";
import HotShopList from "./HotShopList";

export default {
  name: "Hot",
  components: {
    HotLb,HotNav,HotAd,HotShopList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.hot
  width 100%
  height 100%
  padding-top 46px
  background-color #f5f5f5
</style>
