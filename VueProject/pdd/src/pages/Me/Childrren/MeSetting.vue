<template>
  <div class="me-setting">
    <mt-header fixed title="设置" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div>
      <me-common-cell
        v-if="phone"
        left-icon="itlike-3"
        left-title="已绑定手机号"
        :right-title="phone | phoneFormat "
        right-title-color="#666666"
      />
      <me-common-cell
        v-else
        left-icon="itlike-3"
        left-title="请绑定手机号"
        right-title-color="#666666"
      />
      <me-common-cell left-icon="itlike-1" left-title="账户与安全"/>
    </div>
    <div style="margin-top:6px">
      <me-common-cell left-icon="itlike-4" left-title="免密支付设置" :click-cell="dealCellClick"/>
      <me-common-cell left-icon="itlike-4" left-title="免拼设置"/>
      <me-common-cell left-icon="itlike-4" left-title="拼小圈设置"/>
      <me-common-cell left-icon="itlike-4" left-title="快递助手设置"/>
      <me-common-cell left-icon="itlike-4" left-title="消息助手设置"/>
      <me-common-cell left-icon="itlike-4" left-title="直播设置"/>
    </div>
    <div style="margin-top:6px">
      <me-common-cell left-icon="itlike-2" left-title="常见问题"/>
      <me-common-cell left-icon="itlike-2" left-title="意见反馈"/>
    </div>
    <div style="margin-top:6px">
      <me-common-cell left-icon="itlike-5" left-title="商家免费入驻"/>
    </div>
    <div style="margin-top:6px">
      <me-common-cell left-icon="itlike-4" left-title="清除缓存"/>
      <me-common-cell left-icon="itlike-3" left-title="关于拼多多"/>
    </div>
    <div class="loginout" @click.prevent="dealLoginOut">
      退出登录
    </div>
  </div>
</template>

<script>
import MeCommonCell from "./MeCommonCell";
//1：引入vuex中从服务器端发送过来的数据，也就是state.js中的数据
import {
  mapState,
  mapActions
} from 'vuex';

import {Toast,MessageBox } from 'mint-ui'

export default {
  name: "MeSetting",
  data() {
    return {
      phone: this.$store.state.userInfo.user_phone
    }
  },
  components: {
    MeCommonCell
  },
  methods:{
    //获取actions.js中的方法
    ...mapActions(['loginOut']),
    //点击提示
    dealCellClick(props) {
      Toast('点击了'+props)
    },
    //退出登录方法
    dealLoginOut() {
      MessageBox.confirm('确定登录吗?').then(action => {
        // console.log(action);
        if('confirm' === action) {  //点击确定
          //1：调用actions.js中的清空用户信息的方法，退出登录状态
          const result = this.loginOut({});
          console.log(result);
          //2：回到主界面
          this.$router.replace('/home');
        }
        Toast('退出登录成功');
      });
    }
  },
  mounted() {
    //请求当前用户数据
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    //获取当前用户数据
    ...mapState(['userInfo']),
  },
  filters: {
    //将手机号码13333333333 转换为 133****3333
    phoneFormat(phone) {
      //1：将字符串转换为数组
      let phoneArr = [...phone];
      //2：遍历数组
      let str = ''
      phoneArr.forEach((item,index)=> {
        if(index ===3 |index ===4 |index ===5 |index ===6 ){
          str += '*'
        }else {
          str += item
        }
      });
      return str;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  color black
  background-color #ffffff
.me-setting:nth-child(1)
  margin-top 50px
.loginout
  width 100%
  height 44px
  margin-top 10px
  background-color #fff
  display flex  //伸缩布局
  justify-content center //水平居中
  align-items center   //垂直居中
  text-align center   //文本居中
</style>
