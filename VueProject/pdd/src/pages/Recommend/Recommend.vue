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

//引入的第三方组件
import BScroll from "better-scroll"
import { Indicator } from 'mint-ui';

export default {
  name: "Recommend",
  data() {
    return {
      page: 1,
      count: 6,  //请求的数据个数
    }
  },
  components: {
    ShopList
  },
  //生命周期函数，组件创建后调用
  mounted() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    //2：请求首页导航数据
    this.$store.dispatch("reqRecommendShopList",{
      page: this.page,
      count: this.count,
      callback: ()=> {
        Indicator.close();
      }
    });
  },
  computed: {
    //3：获取首页导航数据
    ...mapState(['recommendshoplist'])
  },
  watch: {
   recommendshoplist() {
     this.$nextTick(()=> {
       //让当前页码加1
       this.page += 1;
       //初始化
       this._initBScroll();
     });
   }
  },
  methods: {
    _initBScroll(){
      //1：初始化
      this.listScroll = new BScroll('.recommend-container',{
        scrollY: true,
        probeType: 3
      });
      //2：监听列表的滚动
      this.listScroll.on('touchEnd',(pos)=> {
       //2.1：监听下拉
       //  console.log(pos.y);
       //  console.log(this.listScroll.maxScrollY);
        if(pos.y >= 50 ) {  //下拉刷新
          // console.log("下拉刷新");
          Indicator.open();
          this.$store.dispatch('reqRecommendShopList',{
            page: this.page,
            count: this.count,
            callback: ()=> {
              Indicator.close();
              //将原来数组中的元素颠倒顺序
              this.$store.state.recommendshoplist.reverse();
            },
          });
        }
        // 2.2：监听上拉
        if(this.listScroll.maxScrollY > pos.y + 20) {  //上拉加载更多
          // console.log("上拉加载更多");
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          //请求页面数据
          this.$store.dispatch('reqRecommendShopList',{
            page: this.page,
            count: this.count,
            callback: ()=> {
              Indicator.close();
            }
          })
        }
      });
      //3：监听列表滚动结束
      this.listScroll.on('scrollEnd',()=> {
        // console.log(111);
        this.listScroll.refresh();
      });
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend-container
  width 100%
  height 100%
  background-color #f5f5f5
  overflow hidden
  .recommend
    display flex  //伸缩布局
    flex-direction row  //灵活的项目将水平显示，正如一个行一样。
    flex-wrap wrap   //超出部分自动换行
    background-color #f5f5f5
    padding-bottom 50px
</style>
