<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-content" v-if="homenav.length > 0">
      <div class="nav-content-inner">
        <a class="inner-item" v-for="(nav,index) in homenav" :key="index">
          <img :src="nav.iconurl"  alt="" >
          <span>{{nav.icontitle}}</span>
        </a>
      </div>
    </div>
    <!--滚动条区域-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle">

      </div>
    </div>
  </div>
</template>

<script>
//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import {mapState} from 'vuex'

export default {
  name: "HotNav",
  data(){
    return {
      //1：屏幕的宽度
      screenW: window.innerWidth || document.documentElement .clientWidth  || document.body.clientWidth,
      //2：滚动内容的宽度 .nav-content-inner
      scrollContentW: 720,
      //3：滚动条背景的长度 .hot-nav-bottom
      bgBarW: 100,
      //4：滚动条的长度 .hot-nav-bottom-inner
      barXWidth: 0,

      //1：触摸时的起点
      startX: 0,
      //2：结束触摸时的位置
      endFlag: 0,
      //3：移动的位置
      barMoveWidth: 0
    }
  },
  //计算属性
  computed: {
    //3：获取首页导航数据
    ...mapState(["homenav"]),
    //计算滚动条的样式属性
    innerBarStyle() {
      return {
        width: `${this.barXWidth}px`,
        left: `${this.barMoveWidth}px`
      }
    }
  },
  //生命周期函数，组件创建后调用
  mounted() {
    //:2：请求首页导航数据
    this.$store.dispatch('reqHomeNav');
    //获取滚动条的长度
    this.getBottomBarWidth();
    //移动端事件监听
    this.bindEvent();
  },
  methods: {
    //获取滚动条的动态长度
    getBottomBarWidth() {
      this.barXWidth = this.bgBarW * (this.screenW / this.scrollContentW)
    },
    //移动端事件监听
    bindEvent() {
      this.$el.addEventListener('touchstart',this.handleTouchStart, false);
      this.$el.addEventListener('touchmove',this.handleTouchMove,false);
      this.$el.addEventListener('touchend',this.handleTouchEnd,false);
    },
    //开始触摸
    handleTouchStart(event) {
      // console.log(event.touches);
      //1：获取第一个触点
      let touch = event.touches[0];
      //2：起始点的位置
      this.startX = Number(touch.pageX);
    },
    //开始移动
    handleTouchMove(event) {
      // console.log('开始移动');
      //1：获取第一个触点
      let touch = event.touches[0];
      //2：移动的距离
      let moveWidth = Number(touch.pageX) - Number(this.startX);
      // console.log(moveWidth);
      //3：求出滚动条移动的距离
      this.barMoveWidth = -((this.bgBarW / this.scrollContentW) * moveWidth - this.endFlag);
      //4：滚动条边界值处理
      if(this.barMoveWidth <= 0){ //左边边界
        this.barMoveWidth = 0;
      }else if(this.barMoveWidth >= this.bgBarW - this.barXWidth){ //右边边界
        this.barMoveWidth = this.bgBarW - this.barXWidth;
      }
    },
    //结束触摸
    handleTouchEnd() {
      // console.log('结束触摸');
      this.endFlag = this.barMoveWidth
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.hot-nav
  width 100%
  height 180px
  position relative //生成相对定位的元素，相对于其正常位置进行定位。
  background #fff
  padding-bottom 10px
  z-index 998
  .hot-nav-content
    width 100%
    overflow-x scroll // 水平超出部分滚动
    .nav-content-inner
      width 720px
      height 180px
      display flex   // 伸缩布局
      flex-wrap wrap // 一行显示不下，自动换行
      .inner-item
        width 90px
        height 90px
        display flex  //伸缩布局
        flex-direction column //垂直向下分布显示
        justify-content center //水平居中
        align-items center //垂直居中
        font-size 13px
        color #666666
        img
          width 40%
          margin-bottom 10px //距下边的边距
  .hot-nav-content::-webkit-scrollbar  //-webkit-scrollbar默认滚动条整体部分
    display none
  .hot-nav-bottom
    width 100px
    height 2px
    background-color #cccccc
    position absolute //生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
    //设置居中显示
    left 50%
    margin-left -50px
    bottom 8px
    //
    .hot-nav-bottom-inner
      position absolute //生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
      width 0
      left 0
      height 100%
      background-color orange

</style>
