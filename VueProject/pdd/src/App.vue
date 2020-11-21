<template>
  <div id="app" >
    <!--路由组件-->
    <router-view></router-view>
    <!--底部路由组件-->
    <tab-bar v-if="$route.meta.showBottomTabBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/TabBar/TabBar";
export default {
  name: "App",
  components: {
    TabBar
  },
  //生命周期函数，vue实例化时被调用
  created () {
    this.$store.dispatch('getUserInfo');
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background-color #f5f5f5

</style>
