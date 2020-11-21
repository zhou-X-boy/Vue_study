<template>
  <div class="me">
    <div v-if="userInfo.id">
      <me-top/>
    </div>
    <select-login v-else/>
  </div>
</template>

<script>
import SelectLogin from "../Login/SelectLogin";
import MeTop from "./Childrren/MeTop"

import {mapState} from 'vuex';

export default {
  name: "Me",
  components: {
    SelectLogin,
    MeTop
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.me
  width 100%
  height 100%
  background-color #f5f5f5
</style>
