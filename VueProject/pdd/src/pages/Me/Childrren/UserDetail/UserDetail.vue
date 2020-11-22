<template>
  <div class="user-detail">
    <mt-header fixed title="个人资料" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="user-detail-top"></div>
    <div class="user-detail-group" ref="scroll">
      <div class="user-icon" @click.prevent="userIconSheetVisible = true">
        <span>头像</span>
        <img src="../../images/me_icon.png" alt="">
      </div>
      <div class="user-item" @click.prevent="changephone">
        <span>手机</span>
        <span v-if="user_phone">
          {{user_phone | phoneFormat}}
          <i class="itlike-uniE909"></i>
        </span>
        <span v-else>
          绑定手机号
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <div class="user-item" @click.prevent="changeName">
        <span>用户名</span>
        <span>
          <label>
            <input type="text" v-model="user_name">
          </label>
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <div class="user-item" @click.prevent="sheetVisible=true">
        <span>性别</span>
        <span>
          {{user_sex}}
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <div class="user-item" @click.prevent="changeAddress">
        <span>常住地</span>
        <span>
          <label>
            <input type="text" v-model="user_address">
          </label>
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <div class="user-item" @click.prevent="openPicker">
        <span>生日</span>
        <span>
          {{user_birthday}}
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <div class="user-item" @click.prevent="changeSign">
        <span>个性签名</span>
        <span>
          <label>
            <input type="text" v-model="user_sign">
          </label>
          <i class="itlike-uniE909"></i>
        </span>
      </div>
      <button @click.prevent="saveUserInfo">保存</button>
    </div>
    <!--头像-->
    <mt-actionsheet
      :actions="usericonactions"
      v-model="userIconSheetVisible">
    </mt-actionsheet>
    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择出生日期-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate= startDate
      :endDate= endDate
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
//引入javascript日期处理类库
import moment from 'moment'
import {MessageBox, Toast} from 'mint-ui';

import {mapState} from 'vuex';

import {changeUserInfo} from "../../../../api";

export default {
  name: "MeDetail",
  data () {
    return {
      user_phone: '',
      user_name: '',
      user_sign: '',
      user_address: '',
      user_sex: '',
      user_birthday: '',
      userIconSheetVisible: false, //头像弹出框
      sheetVisible: false, //性别弹出框
      usericonactions: [
        {name: '查看大图',method: this.changeUserIcon},
        {name: '从手机相册选择',method: this.changeUserIcon},
        {name: '拍照',method: this.changeUserIcon}
      ],
      actions: [
        {name: '男',method: this.selectSex},
        {name: '女',method: this.selectSex}
      ],
      startDate: new Date('1945-01-01'),  //日期最小可选值
      endDate: new Date(),  //日期最大可选值
    }
  },
  methods: {
    //修改头像
    changeUserIcon() {
      Toast('暂不支持')
    },
    //修改电话号码
    changephone() {
      MessageBox.prompt('修改手机号').then(({ value, action }) => {
        // console.log(value);
        if(!/^[1][3,5,7,8][0-9]{9}$/.test(value)){
          Toast({
            message: '修改失败，请校验输入的手机号是否正确',
            position: 'center',
            duration: 3000,
          });
        }else if(value.length === 11) {
          this.user_phone = value
          Toast({
            message: '修改成功',
          });
        }
      });
    },
    //修改昵称
    changeName() {
      MessageBox.prompt('修改昵称').then(({ value, action }) => {
        // console.log(value);
        this.user_name = value
      });
    },
    //修改签名
    changeSign() {
      MessageBox.prompt('修改个新签名').then(({ value, action }) => {
        // console.log(value);
        this.user_sign = value
      });
    },
    //修改地址
    changeAddress() {
      MessageBox.prompt('修改地址').then(({ value, action }) => {
        // console.log(value);
        this.user_address = value
      });
    },
    //性别赋值
    selectSex(props) {
      // console.log(props);
      this.user_sex = props.name;
    },
    //打开出入日期弹出框
    openPicker() {
      this.$refs.picker.open();
    },
    //出入日期赋值
    handleBirthday(date) {
      // console.log(date);
      // console.log(moment(date).format("yyyy-MM-DD"));
      this.user_birthday = moment(date).format("yyyy-MM-DD");
    },
    //保存修改的用户信息
    async saveUserInfo() {
      //1：请求接口
      let result = await changeUserInfo(this.userInfo.id,this.user_name,this.user_phone,this.user_sex,this.user_address,this.user_birthday,this.user_sign);
      // console.log(result);
      Toast({
        message: result.message,
        position: 'bottom',
        duration: 2000
      })
      if(result.success_code === 200){
        //更新本地数据
        await this.$store.dispatch('getUserInfo');
        //返回上一级页面
        setTimeout(()=> {
          this.$router.go(-1);
        },2000)
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  mounted() {

    this.user_phone = this.userInfo.user_phone;
    this.user_name = this.userInfo.user_name;
    this.user_sign = this.userInfo.user_sign;
    this.user_address = this.userInfo.user_address;
    this.user_sex = this.userInfo.user_sex;
    this.user_birthday = this.userInfo.user_birthday;
  },
  filters: {
    //将手机号码由13333333333 转换为 133****3333
    phoneFormat(phone) {
      //1：将字符串换为数组
      let phoneArr = [...phone];
      //let phoneArr = phone.split('');
      //2：遍历数组
      let str = '';
      phoneArr.forEach((item,index)=> {
        if(index === 3 | index === 4 | index === 5 | index === 6) {
          str += "*";
        }else {
          str += item;
        }
      });
      return str;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.user-detail
  width 100%
  height 100%
  .header
    background-color #fff
    color black
    font-weight lighter  //字体变细
    font-size 16px
  .user-detail-top
    width 100%
    height 60px
    line-height 60px  //行高
    padding-left 10px
    font-weight bold  //字体加粗
  .user-detail-group
    .user-icon
      height 60px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex  //伸缩布局
      justify-content space-between  //让元素左右贴边
      align-items center  //水平居中
      img
        width 50px
        border-radius 50%  //边框角
    .user-item
      height 40px
      padding 0 10px
      background-color #fff
      border-bottom: 1px solid #e0e0e0
      display flex  //伸缩布局
      justify-content space-between //让元素左右贴边
      align-items center  //水平居中
      input
        border none   //边框无
        outline none
        text-align right
    button
      width 90%
      height 40px
      line-height 40px
      background-color #ffffff
      text-align center
      margin 20px 5%
      border none
      font-size 16px
      color black
      border-radius 10px
  .right-title-color
    color #999
    font-size 14px
</style>
