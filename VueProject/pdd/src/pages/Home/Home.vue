<template>
  <div class="home">
    <div class="header">
      <!--搜索框-->
      <search-nav class="search" :isShowSearchPanel="isShowSearchPanel"/>
      <!--点击搜索框跳转的面板-->
      <search-panel v-if="isShow" :isShowSearchPanel="isShowSearchPanel"/>
      <!--首页头部导航-->
      <ly-tab v-model="selectedId"
              :items="items"
              :options="options"
              @change="handleChange"
              class="fix"
              v-show="!isShow"
      />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchNav from "../Search/Children/SearchNav";
import SearchPanel from "../Search/Children/SearchPanel";
export default {
  name: "Home",
  data () {
    return {
      isShow: false,  //设置搜索面板的显示
      selectedId: 0, //选择首页头部的子组件的ID
      items: [
        {label: '热门'},
        {label: '服饰'},
        {label: '鞋包'},
        {label: '母婴'},
        {label: '百货'},
        {label: '食品'},
        {label: '内衣'},
        {label: '男装'},
        {label: '电器'},
      ],
      options: {
        activeColor: '#e9232c' //设置首页头部选项选中的颜色
      },
      //二级路由
      subRouter: [
        '/home/hot',
        '/home/dress',
        '/home/box',
        '/home/mbaby',
        '/home/general',
        '/home/food',
        '/home/shirt',
        '/home/man',
        '/home/ele'
      ],
    }
  },
  components: {
    SearchNav,SearchPanel
  },
  methods: {
    //设置搜索面板的显示
    isShowSearchPanel(flag) {
      this.isShow = flag;
    },
    handleChange(item,index) {
      this.$router.replace(this.subRouter[index]);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home
  position relative
  width 100%
  height 100%
  background-color #f5f5f5
  .header
    height 45px
    background-color #ffffff
    z-index 1000
    .search
      height 47px
      font-size 12px
    .fix
      width 100%
      height 30px
      position fixed //生成固定定位的元素，相对于浏览器窗口进行定位。
      background-color #ffffff
      left 0
      top 40px
      z-index 1000
</style>
