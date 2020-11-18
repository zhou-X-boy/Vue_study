<template>
  <div class="select-login">
    <div class="bottom">
      <img src="./images/Logo.png" alt="" width="250px" height="100px">
    </div>
    <h4>选择登录方式</h4>
    <router-link tag="button" to="/login">手机登录</router-link>
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
  h4
    position fixed
    top 300px
    font-size 17px
  button
    position fixed
    top 320px
    width 80%
    height 38px
    background-color red
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
