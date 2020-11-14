<template>
  <div class="search">
    <!--搜索框-->
    <search-nav :isShowSearchPanel="isShowSearchPanel"/>
    <!--商品分类-->
    <shop/>
    <!--点击搜索框跳转的面板-->
    <search-panel v-if="isShow" :isShowSearchPanel="isShowSearchPanel"/>
  </div>
</template>

<script>
//引入子组件
import SearchNav from "./Children/SearchNav";
import Shop from './Children/Shop';
import SearchPanel from "./Children/SearchPanel";

//引入第三方插件库实现滚动效果
import BScroll from 'better-scroll'

export default {
  name: "Search",
  data() {
    return {
      isShow: false,  //设置搜索面板的显示
    }
  },
  components: {
    SearchNav,Shop,SearchPanel
  },
  methods: {
    //设置搜索面板的显示
    isShowSearchPanel(flag) {
      this.isShow = flag;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.search
  width 100%
  height 100%
  background-color #f5f5f5
  overflow hidden   //超出部分隐藏
</style>
