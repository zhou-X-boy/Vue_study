<template>
  <div class="cell" @click="clickCell(leftTitle)">
    <div class="cell-left" :style="leftTitleColor">
      <i :class="leftIcon" v-show="leftIcon"></i>
      <span v-show="leftTitle">{{leftTitle}}</span>
    </div>
    <div class="cell-right" :style="{color: rightTitleColor}">
      <span v-show="rightTitle">{{rightTitle}}</span>
      <i class="itlike-uniE909" v-show="isShowRightArrow"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeCommonCell",
  props: {
    leftTitle: {type: String,default: ''},
    leftIcon: {type: String,default: ''},
    rightTitle: {type: String,default: ''},
    leftTitleColor: {type: String,default: ''},
    rightTitleColor: {type: String,default: ''},
    isShowRightArrow: {type: Boolean,default: true},
    clickCell: {type: Function,default: ()=> {}},
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cell
  height 40px
  background-color #fff
  display flex  //伸缩布局
  justify-content space-between  //各行之间留有空白的容器内。
  align-items center  //垂直居中
  padding 0 10px
  border-bottom 1px solid #ececec
  .cell-left,
  .cell-right
    display flex
    align-items center  //垂直居中
    i
      margin-right 5px
  .cell-right
    span
      margin-right 10px
      font-weight lighter
      font-size 13px
      align-items center
</style>
