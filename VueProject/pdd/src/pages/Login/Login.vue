<template>
  <div class="login-container">
    <mt-header :title="loginMode? '手机号登录':'账号密码登录'" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back" class="back"></mt-button>
      </router-link>
    </mt-header>
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/Logo.png" alt="" width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript: " :class="{current: loginMode}" @click="dealLoginMode(true)">验证码登录</a>
          <a href="javascript: " :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <label>
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              </label>
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCode()"
              >
                获取验证码
              </button>
              <button
                v-else
                disabled="disabled"
                class="get-verification"
              >
                已发送（{{countDown}}s）
              </button>
            </section>
            <section class="login-verification">
              <label>
                <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
              </label>
            </section>
            <section class="login-hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <label>
                  <input type="text" maxlength="11" placeholder="用户名/手机/邮箱" v-model="name">
                </label>
              </section>
              <section class="login-verification">
                <label>
                  <input type="password" maxlength="18" placeholder="密码" v-if="pwdMode" v-model="pwd">
                  <input type="text" maxlength="18" placeholder="密码" v-else v-model="pwd">
                </label>
                <div class="switch-show">
                  <img @click.prevent="dealPwdModel(false)"  :class="{on: pwdMode}" src="./images/hide_pwd.png" alt="" width="20">
                  <img @click.prevent="dealPwdModel(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <label>
                  <input class="verification" type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img
                    ref="captcha"
                    class="get-verification"
                    src="http://localhost:3000/api/svgcaptcha"
                    alt="captcha"
                    @click.prevent="getCaptCha()"
                  >
                </label>
               </section>
            </section>
          </div>
        </form>
        <button class="login-submit" @click.prevent="login()">登录</button>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
//引入请求验证码的方法和手机验证码登录的方法
import  {getPhoneCode,phoneCodeLogin,pwdLogin} from "./../../api/index";
//引入第三方组件库mint-ui中的组件
import {Toast} from "mint-ui";

//引入vuex中的方法
import  {mapActions} from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      loginMode: true,  //登录方式 true,验证码登录； false，密码登录
      phone: '', //手机号码,
      name: '',   //用户名
      countDown: 0,  //验证码倒计时
      pwdMode: true,  //密码的显示方式 true，密文显示；false，明文显示
      pwd: '',   //密码
      code: '',   //短信验证码
      captcha: '',  //图形验证码
      userInfo: {},  //用户的个人信息
    }
  },
  methods: {
    ...mapActions(['syncUserInfo']),
    //验证码登录和密码登录表单切换
    dealLoginMode(flag) {
      this.loginMode = flag
    },
    //获取短信验证码
    async getVerifyCode() {
      //开启倒计时,手机号码正确开启倒计时
      if(this.phoneRight){
        //1：设置倒计时开始的时长
        this.countDown = 60;
        //2：设置一个定时器实现倒计时
        this.intervalId = setInterval(()=> {
          //3：进行计时数字递减
          this.countDown--;
          //4：判断，当倒计时为0时，清除定时器
          if(this.countDown === 0){
            clearInterval(this.intervalId);
          }
        },1000);
      }
      //获取短信验证码
      let result = await getPhoneCode(this.phone);
      console.log(result);
      this.code = result.message;
      // Toast('短信验证码为：'+ result.message);

      //获取验证码失败
      if(result.error_code === 0){
        Toast({
          message: '获取验证码失败',
          position: 'center',
          duration: 3000
        });
        //清除定时器
        // clearInterval(this.intervalId);
        //重新开始计时
        // this.countDown = 0
      }
    },
    //密码的显示方式，明文或者密文
    dealPwdModel(flag) {
      this.pwdMode = flag;
    },
    //获取图形验证码
    getCaptCha() {
      //动态的将请求到的图形验证码绑定到ref=captcha的上面，也就是图形验证码所在的img标签上
      this.$refs.captcha.src = 'http://localhost:3000/api/svgcaptcha?time=' + new Date();
    },
    //实现登录
    async login() {
      //判断是验证码登录还是密码登录；loginMode为true为验证码登录；为false为密码登录
      if(this.loginMode) {   //验证码登录
        //1：前端校验，
        //手机号码是否存在，是否为空
        if(!this.phone) {  //手机号码为空
          return  Toast('请输入手机号码');
        }else if(!this.phoneRight) {  //手机号码不正确
          return Toast('请输入正确的手机号码');
        }
        //验证码是否存在，格式是否正确
        if(!this.code) {  //验证码为空
          return Toast('请输入验证码');
        }else if(!(/^\d{6}$/gi.test(this.code))) {  //验证码格式错误
          return Toast('请输入正确格式的验证码');
        }
        //2：手机验证码登录
          //获取从服务端传递过来的用户信息
        const result = await phoneCodeLogin(this.phone,this.code);
        console.log(result);
        if(result.success_code === 200) {  //请求用户信息正确
          //2.1：将用户信息放到自己定义的数据userInfo中
          this.userInfo = result.message;
          Toast('登录成功');
        }else {   //登录失败
          this.userInfo = {
            message: '登录失败' + result.message
          }
        }
      }else {   //账号密码登录
        //1：前端校验
        //用户名是否为空，密码是否为空，图形验证码是否为空
        if(!this.name) {  //用户名为空
          return  Toast('用户名不能为空');
        }else if(!this.pwd) {  //密码为空
          return Toast('密码不能为空');
        }else if(!this.captcha) { //图形验证码为空
          return Toast('图形验证码不能为空');
        }
        //2；用户名和密码的登录
          //获取从服务端传递过来的用户信息
        const  result = await pwdLogin(this.name,this.pwd,this.captcha);
        console.log(result);
        if(result.success_code === 200) {  //请求用户信息正确
          //2.1：将用户信息放到自己定义的数据userInfo中
          this.userInfo = result.message;
          Toast(result.info);
        }else {   //登录失败
          this.userInfo = {
            message: result.message
          }
          this.getCaptCha();
        }
      }
      //其他后续处理，统一处理用户验证码登录和密码登录出现的状态变化
      if(!this.userInfo.id) {  //用户id不存在，失败
        Toast(this.userInfo.message);
        if(!this.loginMode){
          // this.getCaptCha();
        }
      }else {
        //1：同步用户的数据，通过Vuex状态管理，
        this.syncUserInfo(this.userInfo);
        //2：回到个人中心主界面
         this.$router.back();
      }
    }
  },
  computed: {
    //验证手机号码是否正确
    phoneRight() {
      // return /^[1][3,5,7,8][0-9]{9}$/.test(this.phone);
      if(!/^[1][3,5,7,8][0-9]{9}$/.test(this.phone)){
        if(this.phone.length === 11){
          Toast({
            message: '请输入正确格式的手机号码13*/15*/17*/18*',
            position: 'center',
            duration: 3000,
          });
        }
      }else {
        return /^[1][3,5,7,8][0-9]{9}$/.test(this.phone);
      }

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.login-container
  width 100%
  height 100%
  background #fff
  .header
    top 5px
    color black
    background-color #ffffff
    .back
      position flex
      left 15px
  .login-inner
    padding-top 30px
    width 80%
    margin 0 auto
    .login-header
      .login-logo
        font-size 40px
        font-weight bold
        color red
        text-align center
      .login-header-title
        padding-top 40px
        padding-bottom 10px
        text-align center
        > a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.current
            color red
            font-weight 700
            border-bottom 2px solid red
    .login-content
      > form
        > div
          display none
          &.current
            display block
          input
            width 100%
            height 100%
            padding-left 8px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid red
          .login-message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .verification
              width 140px
              font-size 19px
              font-weight lighter
            .get-verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 15px
              background transparent
              &.phone_right
                color red
          .login-verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch-show
              position absolute
              right 10px
              top 12px
              img
                display none
              img.on
                display block
          .login-hint
            margin-top 12px
            color #999
            font-size 12px
            line-height 20px
            > a
              color red
      .login-submit
        display block
        width 100%
        height 42px
        margin-top 30px
        border-radius 4px
        background red
        color #fff
        text-align center
        font-size 16px
        line-height 42px
        border 0
      .login-back
        display block
        width 100%
        height 42px
        margin-top 15px
        border-radius 4px
        background transparent
        border: 1px solid red
        color red
        text-align center
        font-size 16px
        line-height 42px
</style>
