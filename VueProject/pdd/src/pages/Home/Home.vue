<template>
  <div class="home">
    <ly-tab v-model="selectedId"
            :items="items"
            :options="options"
            @change="handleChange"
            class="fix"
    />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {
      selectedId: 0, //选择首页头部的子组件的ID
      items: [
        {label: '热门'},
        {label: '服饰'},
        {label: '鞋包'},
        {label: '母婴'},
        {label: '百货'},
        {label: '食品'},
        {label: '内衣'},
        {label: '男装'},
        {label: '电器'},
      ],
      options: {
        activeColor: '#e9232c' //设置首页头部选项选中的颜色
      },
      //二级路由
      subRouter: [
        '/home/hot',
        '/home/dress',
        '/home/box',
        '/home/mbaby',
        '/home/general',
        '/home/food',
        '/home/shirt',
        '/home/man',
        '/home/ele'
      ],
    }
  },
  methods: {
    handleChange(item,index) {
      this.$router.replace(this.subRouter[index]);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home
  position relative
  width 100%
  height 100%
  background-color #f5f5f5
  .fix
    width 100%
    position fixed //生成固定定位的元素，相对于浏览器窗口进行定位。
    left 0
    top 0
    z-index 998
</style>
