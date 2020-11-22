<template>
  <div class="chat">
    <div v-if="userInfo.id">
      <!--头部区域-->
      <div class="header">
        <a href="" class="icon_back"></a>
        <h3>购物车</h3>
        <a href="" class="icon_menu"></a>
      </div>
      <!--安全提示-->
      <div class="jd_safe_tip">
        <p class="tip_word">
          您正在安全购物环境中，请放心购物
        </p>
      </div>
      <!--中间的列表-->
      <main class="jd_shopCart_list">
        <section>
          <div class="shopCart_list_con" >
            <div class="list_con_left">
              <a href="javascript:" class="cart_check_box" checked></a>
            </div>
            <div class="list_con_right">
              <div class="shop_img">
<!--              <img src="./images/" alt="">-->
              </div>
              <div class="shop_con">
                <a href="">aaa</a>
                <p class="shop_price">&yen;1111</p>
                <div class="shop_deal">
                  <div class="shop_deal_left">
                    <span>-</span>
                    <label>
                      <input type="tel" value="1" >
                    </label>
                    <span>+</span>
                  </div>
                  <div class="shop_deal_right">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shopCart_list_con" >
            <div class="list_con_left">
              <a href="javascript:" class="cart_check_box" checked></a>
            </div>
            <div class="list_con_right">
              <div class="shop_img">
<!--              <img src="./images/" alt="">-->
              </div>
              <div class="shop_con">
                <a href="">aaa</a>
                <p class="shop_price">&yen;1111</p>
                <div class="shop_deal">
                  <div class="shop_deal_left">
                    <span>-</span>
                    <label>
                      <input type="tel" value="1" >
                    </label>
                    <span>+</span>
                  </div>
                  <div class="shop_deal_right">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <!--底部通栏-->
      <div id="tab_bar">
        <div class="tab-bar-left">
          <a href="javascript:" class="cart_check_box" checked></a>
          <span style="font-size: 16px;">全选</span>
          <div class="select-all">
            合计：<span class="total-price">&yen;999.00</span>
          </div>
        </div>
        <div class="tab-bar-right">
          <a href="#" class="pay">去结算</a>
        </div>
      </div>
    </div>
    <select-login v-else/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import SelectLogin from './../Login/SelectLogin'

export default {
  name: "Chat",
  computed: {
    ...mapState(['userInfo']),
  },
  mounted() {
    // 请求商品数据
    // this.$store.dispatch('reqCartsGoods');
  },
  components: {
    SelectLogin
  }
}
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
.chat
  width 100%
  height 100%
  background-color #e0e0e0
  .header
    width: 100%;
    height: 44px;
    background: #fff;
    -webkit-background-size: 1px 44px;
    background-size: 1px 44px;
    border-bottom: 1px solid #e0e0e0;
    position: fixed;
    left: 0;
    top: 0;
    display flex
    justify-content center
    align-items center
    font-size 18px
    font-weight bolder
    color #E9232C
    z-index 999
  .jd_safe_tip
    margin-top 44px
    height 36px
    line-height 36px
    border-bottom: 1px solid #e0e0e0;
    background-color #fff
    text-align center
    .tip_word
      display inline-block
      font-size 14px
      padding-left 20px
      position relative
      &:before
        content ''
        width 18px
        height 18px
        background url("./images/safe_icon.png") no-repeat
        -webkit-background-size 18px 18px
        background-size 18px 18px
        position absolute
        top 9px
        left 0
  .jd_shopCart_list
    margin-bottom 64px
    background-color #e0e0e0
    section
      margin-top 7px
      border-top 1px solid #e0e0e0
      background-color #fff
      .shopCart_list_con
        padding: 10px 0
        border-bottom 1px solid #e0e0e0
        .list_con_left
          .cart_check_box
            float left
            background url("./images/shop-icon.png") no-repeat
            -webkit-background-size 50px 100px
            background-size 50px 100px
            width 20px
            height 20px
            margin-top 17px
            margin-left 7px
          .cart_check_box[checked]
            background-position -25px 0
        .list_con_right
          overflow: hidden;
          padding: 0 7px;
          .shop_img
            float left
            img
              width 80px
              height 80px
              display block
          .shop_con
            overflow hidden
            padding-left 7px
            & > a
              font-size 14px
              color #666
              line-height 20px
              height 40px
              overflow hidden
              display block
              text-decoration none
            .shop_price
              color #E9232C
              margin-top 5px
            .shop_deal
              margin-top 5px
              .shop_deal_left
                float left
                & > span
                  border 1px solid #e0e0e0
                  display inline-block
                  width 30px
                  height 25px
                  line-height 25px
                  text-align center
                  float left
                  &:first-child
                    border-top-left-radius 3px
                    border-bottom-left-radius 3px
                  &:last-child
                    border-top-right-radius 3px
                    border-bottom-right-radius 3px
                input
                  border none
                  border-top 1px solid #e0e0e0
                  border-bottom 1px solid #e0e0e0
                  float left
                  width 50px
                  height 23px
                  text-align center
              .shop_deal_right
                float right
                & > span:first-child
                  background url('./images/delete_up.png') no-repeat
                  background-size 18px 4px
                  width 18px
                  height 4px
                  display block
                & > span:last-child
                  background url('./images/delete_down.png') no-repeat
                  background-size 17px 17px
                  width 17px
                  height 17px
                  display block
                  margin-top -3px
  #tab_bar
    position: fixed
    left 0
    bottom 50px
    width 100%
    height 44px
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    box-shadow 0 -5px 5px #e0e0e0
    border-bottom: 1px solid #e0e0e0
    .tab-bar-left
      display flex
      align-items center
      margin-left 7px
      .cart_check_box
        float left
        background url("./images/shop-icon.png") no-repeat
        -webkit-background-size 50px 100px
        background-size 50px 100px
        width 20px
        height 20px
        margin-top 4px
        margin-left 4px
      .cart_check_box[checked]
        background-position -25px 0
      .select-all
        margin-left 8px
        font-size 16px
    .tab-bar-right
      .pay
        width 90px
        height 44px
        background-color #E9232C
        display flex
        justify-content center
        align-items center
        font-size 18px
        color #fff
        text-decoration none
</style>
