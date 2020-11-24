<template>
  <div class="settingphone">
    <top :title="phone ? '解绑手机号':'绑定手机号'"/>
    <div style="margin-top: 40px">
      <setting-common-cell
        left-icon="itlike-4"
        :left-title="phone ? '手机号解绑' : '绑定手机号'"
      ></setting-common-cell>
    </div>
  </div>
</template>

<script>
import Top from '../../../../components/SettingTop/SettingTop'
import SettingCommonCell from './SettingCommonCell'
import {mapState} from 'vuex';
export default {
  name: "SettingPhone",
  data () {
    return {
      phone: '',
    }
  },
  components: {
    Top,SettingCommonCell
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
