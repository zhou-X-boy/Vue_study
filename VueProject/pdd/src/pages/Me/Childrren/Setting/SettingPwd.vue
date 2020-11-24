<template>
  <div class="mepwd">
    <top to="/me" title="账号与安全"/>
    <div style="margin-top:40px">
      <setting-common-cell left-icon="itlike-4" left-title="修改密码"/>
    </div>
  </div>
</template>

<script>
import Top from "../../../../components/SettingTop/SettingTop";
import SettingCommonCell from "./SettingCommonCell";
export default {
  name: "MePwd",
  components: {
    Top,SettingCommonCell
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
