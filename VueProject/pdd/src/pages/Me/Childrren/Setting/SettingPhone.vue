<template>
  <div class="settingphone">
    <top :title="phone ? '解绑手机号':'绑定手机号'"/>
  </div>
</template>

<script>
import Top from '../../../../components/SettingTop/SettingTop'
import {mapState} from 'vuex';
export default {
  name: "SettingPhone",
  data () {
    return {
      phone: '',
    }
  },
  components: {
    Top
  },
  mounted () {
    this.phone = this.userInfo.user_phone
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
