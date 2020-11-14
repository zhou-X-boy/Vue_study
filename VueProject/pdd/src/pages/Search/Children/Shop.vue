<template>
  <div class="shop">
    <!--左边-->
    <div class="menu-wrapper">
      <ul>
        <li class = "menu-item"
            v-for = "(goods, index) in searchgoods"
            :key = "index"
            :class = "{current: index === currentIndex}"
            @click = "clickLeftItem(index)"
            ref = "menulist"
        >
          <span>{{goods.name}}</span>
        </li>
      </ul>
    </div>
    <!--右边-->
    <div class="shop-wrapper">
      <ul ref="shopsParent" >
        <li class="shops-li" v-for="(goods, index) in searchgoods" :key="index" >
          <div class="shops-title">
            <h4>{{goods.name}}</h4>
            <a href="">查看更多 ></a>
          </div>
          <ul class="phone-type" v-if="goods.tag === 'phone'">
            <li v-for="(phone,index3) in goods.category" :key="index3" >
              <img :src="phone.icon" alt="">
            </li>
          </ul>
          <ul class="shops-items">
            <li v-for="(item, index2) in goods.items" :key="index2">
              <img :src="item.icon" alt="">
              <span>{{item.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import { mapState} from 'vuex';
//引入第三方插件库实现滚动效果
import BScroll from 'better-scroll'

export default {
  name: "Shop",
  data() {
    return {
      scrollY: 0,  //右侧列表滑动的Y轴坐标（实时更新）
      rightLiTops: []  //所有分类的头部位置
    }
  },
  //生命周期函数，组件创建后调用
  mounted() {
    //:2：请求搜索列表数据
    this.$store.dispatch('reqSearchGoods'
      // //通过actions.js中的执行回调来在数据刷新后渲染页面
      // ,()=>{
      //   this._initBScroll();
      // }
    );
  },
  //计算属性
  computed: {
    //3：获取搜索列表数据
    ...mapState(['searchgoods']),
    //用于动态决定左侧哪个选项被选中
    currentIndex() {
      //1：获取数据
      const {scrollY,rightLiTops} = this;
      //2：遍历rightLiTops数组，取出索引
      /*
      *findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
      *当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，
      * 如果没有符合条件的元素返回 -1
      */
      return rightLiTops.findIndex((liTop,index)=> {
        this._leftScroll(index);
        return scrollY >= liTop && scrollY < rightLiTops[index + 1]
      })
    }
  },
  //监听方法，数据发生变化，才开始执行
  watch: {
    //监听searchgoods数据变化
    searchgoods() {
      //$nextTick()方法 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它
      this.$nextTick(()=>{
        //1.1：监听初始化方法
        this._initBScroll();
        //1.2：监听右侧所有版块的的头部位置
        this._initRightLiTops();
      })
    }
  },
  methods: {
    //1.1：初始化方法
    _initBScroll() {
      //1.1：左边
      //let leftScroll 改为 this.leftScroll 就讲局部的对象变为全局的对象
      this.leftScroll = new BScroll('.menu-wrapper', {
        scrollY: true,  //当设置为 true 的时候，可以开启纵向滚动。
        click: true
      });
      //1.2：右边
      //let rightScroll 改为 this.rightScroll 就讲局部的对象变为全局的对象
      this.rightScroll = new BScroll('.shop-wrapper', {
        scrollY: true,  //当设置为 true 的时候，可以开启纵向滚动。
        click: true,
        /*
        * 有时候我们需要知道滚动的位置。
        * 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        * 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        */
        probeType: 3
      });
      //1.3：右侧滑动事件，通过better-scroll库中带有的on(type, fn, context)方法
      this.rightScroll.on('scroll', (pos)=>{
        //通过Math.abs(int a)方法取得Y轴 ,返回int 值的绝对值。如果参数为非负数，则返回该参数。如果参数为负数，则返回该参数的相反数。
        this.scrollY = Math.abs(pos.y);
        // console.log(this.scrollY)
      });
      this.rightScroll.on('scrollEnd', (pos)=>{
        this.scrollY = Math.abs(pos.y);
      })
    },
    //1.2：求出右侧所有版块的头部位置
    _initRightLiTops() {
      //1.2.1：创建临时数组
      const tempArr = [];
      //1.2.2：定义一个新的变量记录高度
      let top = 0;
      //1.2.3：将定义的变量加入到临时数组中
      tempArr.push(top);
      //1.2.4：遍历右侧商品列表class为shops-li的li标签，成为一个类数组
      let allLis = this.$refs.shopsParent.getElementsByClassName('shops-li');
      /*1.2.5：转化为一个真数组，Array.prototype（数组原型） slice.call()方法将类数组转化为真正的数组
       通过forEach()方法遍历这个数组
       */
      Array.prototype.slice.call(allLis).forEach(li => {
        //1.2.6：通过li.clientHeight()方法取得li的高度，并叠加计算每个li的高度
        top += li.clientHeight;
        //1.2.7：将取得的每个li得高度加入到tempArr数组中
        tempArr.push(top);
      });
      //1.2.8：更新数据，将tempArr数组赋值给创建的空数组rightLiTops
      this.rightLiTops = tempArr;
      // console.log(this.rightLiTops);
    },
    //1.3：点击左侧商品列表切换右侧商品列表
    clickLeftItem(index) {
      //1.3.1：从数组rightLiTops中取出对应索引的值赋值给scrollY
      this.scrollY = this.rightLiTops[index];
      //1.3.2：让右侧商品列表进行滚动
      this.rightScroll.scrollTo(0,-this.scrollY,300);
    },
    //1.4：滚动右侧商品列表切换左侧商品列表
    _leftScroll(index){
      //取得左侧li标签
      let menuLists = this.$refs.menulist;
      //取得滚动右侧联动左侧当前索引所在的li标签
      let el = menuLists[index];
      //console.log(el);
      this.leftScroll.scrollToElement(el,300,0,-100);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.shop
  display flex  //伸缩布局
  position absolute  //生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
  top 60px
  bottom 50px
  width 100%
  overflow hidden   //超出部分隐藏
  .menu-wrapper
    background-color #e0e0e0
    width 80px
    flex 0 0 80px
    position relative    //生成相对定位的元素，相对于其正常位置进行定位。
    .menu-item
      width 100%
      height 60px
      background-color #fafafa
      display flex   //伸缩布局
      justify-content center  //水平居中
      align-items center   //垂直居中
      font-weight lighter   //字体变细
      color #666666
    .current
      color #e02e24
    .current::before   //:before 在元素之前插入内容
      content '' //插入的内容
      background-color #e02e24
      width 4px
      height 30px
      position absolute  //绝对定位
      left 0
  .shop-wrapper
    flex 1
    background-color #ffffff
    .shops-li
      height 600px;
      .shops-title
        display flex  //伸缩布局
        flex-direction row  //灵活的项目将水平显示，正如一个行一样。
        padding 0 10px  //设置内部上下 左右边距
        height 44px
        align-items center  //垂直居中
        justify-content space-between   //水平两端对齐
        color #999999
        font-size 15px
        a
          color #999999
          text-decoration none  //去除超链接下划线
          font-weight lighter // 字体变细
      .shops-items
        display flex //伸缩布局
        flex-wrap wrap   //超出部分自动换行
        li
          display flex  //伸缩布局
          flex-direction column  //将内容垂直显示
          width 33.3%
          height 90px
          justify-content center //水平居中
          align-items center  //垂直居中
          color #666666
          font-size 14px
          font-weight lighter  //字体变细
          img
            width 60%
            height 60%
            margin-bottom 10px
      .phone-type
        width 100%
        display flex  //伸缩布局
        flex-direction row  //水平显示
        flex-wrap wrap  //超出部分换行
        border-bottom-1px(#ccc)
        li
          width 33.3%
          display flex //伸缩布局
          justify-content center //水平居中
          align-items center  //垂直居中
          margin 7px 0
          img
            width 80%
</style>
