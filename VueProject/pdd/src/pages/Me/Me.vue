<template>
  <div class="me">
    <select-login/>
  </div>
</template>

<script>
import SelectLogin from "../Login/SelectLogin";
export default {
  name: "Me",
  components: {SelectLogin}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.me
  width 100%
  height 100%
  background-color #f5f5f5
</style>
