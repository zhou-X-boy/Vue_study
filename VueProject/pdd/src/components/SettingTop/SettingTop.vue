<template>
  <mt-header fixed  :title=title class="header">
    <router-link to="/setting"  slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
</template>

<script>
export default {
  name: "Top",
  data(){
    return{

    }
  },
  props: {
    title: String
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  color black
  background-color #ffffff
</style>
