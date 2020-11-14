<template>
  <div class="recommend-container" v-if="recommendshoplist.length > 0">
    <ul class="recommend">
      <shop-list
        tag="li"
        v-for="(item,index) in recommendshoplist"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import {mapState} from 'vuex'

import ShopList from './../../components/ShopList/ShopList'

export default {
  name: "Recommend",
  components: {
    ShopList
  },
  //生命周期函数，组件创建后调用
  mounted() {
    //2：请求首页导航数据
    this.$store.dispatch("reqRecommendShopList");
  },
  computed: {
    //3：获取首页导航数据
    ...mapState(['recommendshoplist'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend-container
  width 100%
  height 100%
  background-color #f5f5f5
  .recommend
    display flex  //伸缩布局
    flex-direction row  //灵活的项目将水平显示，正如一个行一样。
    flex-wrap wrap   //超出部分自动换行
    background-color #f5f5f5
    margin-bottom 50px
</style>
