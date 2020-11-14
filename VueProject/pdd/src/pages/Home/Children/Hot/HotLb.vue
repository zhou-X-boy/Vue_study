<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" v-if="homecasual.length > 0">
      <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index" >
        <img :src="casual.imgurl" alt="" width="100%">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
//引入swiper第三方库
import Swiper, { Navigation, Pagination,Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination,Autoplay]);
import 'swiper/swiper-bundle.css'

//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import {
  mapState
} from 'vuex'

export default {
  name: "HotLb",
  //生命周期函数，组件创建后调用
  mounted () {
    //:2：请求轮播图数据
    this.$store.dispatch("reqHomeCasual");
  },
  watch: {
    //监听homecasual数据，一旦发生改变就实例化一个Swiper渲染页面实现轮播效果
    homecasual() {
      //$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(()=> {
        //Swiper第三方组件库轮播图样式方法
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el:'.swiper-pagination',
          },
          autoplay:true,
          // autoplay: {
          //   delay: 3000,
          //   stopOnLastSlide: false,
          //   disableOnInteraction: true,
          // },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      })
    }
  },
  computed: {
    //3：获取轮播的数据
    ...mapState(['homecasual'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
