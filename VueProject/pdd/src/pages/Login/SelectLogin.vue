<template>
  <div class="select-login">
    <mt-header fixed  class="header">
      <router-link tag="div" to="/" slot="left">
        <mt-button icon="back" class="btn"></mt-button>
      </router-link>
    </mt-header>
    <div class="bottom">
      <img src="./images/Logo.png" alt="" width="250px" height="100px">
    </div>
    <h4>请点击登录</h4>
    <router-link tag="button" to="/login">登录</router-link>
  </div>
</template>

<script>
export default {
  name: "SelectLogin"
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.select-login
  background-color #f5f5f5
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  z-index 1000
  display flex  //伸缩布局
  flex-direction column   //向下分布
  justify-content center  //水平居中
  align-items center   //垂直居中
  margin-bottom 40px
  header
    background-color #f5f5f5
    color black
    .btn
      top -25px
      left 10px
      width 40px
      color black
      font-size 17px
      font-weight lighter
      background-color #f5f5f5
  h4
    position fixed
    top 300px
    font-size 17px
  button
    position fixed
    top 320px
    width 80%
    height 38px
    background-color limegreen
    border none
    border-radius 5px  //边框角
    font-size 20px
    color #ffffff
    margin-top 30px
  .bottom
    position fixed
    top 130px
    left 50%
    margin-left -125px
</style>
