<template>
  <div class="user-detail">
    <mt-header fixed title="个人资料" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="user-detail-top"></div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="../images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{phone}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><label>
<input type="text">
</label></span>
      </div>
      <div class="user-item" >
        <span>性别</span>
        <span></span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span>
          <label>
            <input type="text">
          </label>
        </span>
      </div>
      <div class="user-item">
        <span>生日</span>
        <span></span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span>
          <label>
            <input type="text">
          </label>
        </span>
      </div>
      <button >修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeDetail",
  data () {
    return {
      phone: this.$store.state.userInfo.user_phone,
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  background-color #fff
  color black
  font-weight lighter
  font-size 16px
.user-detail
  width 100%
  height 100%
  .user-detail-top
    width 100%
    height 60px
    line-height 60px
    padding-left 10px
    font-weight bold
  .user-detail-group
    .user-icon
      height 60px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex
      justify-content space-between
      align-items center
      img
        width 50px
        border-radius 50%
    .user-item
      height 40px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex
      justify-content space-between
      align-items center
      input
        border none
        outline none
        text-align right
    button
      width 90%
      height 40px
      line-height 40px
      background-color #e9232c
      text-align center
      margin 20px 5%
      border none
      font-size 16px
      color #fff
      border-radius 10px
  .right-title-color
    color #999
    font-size 14px

</style>
