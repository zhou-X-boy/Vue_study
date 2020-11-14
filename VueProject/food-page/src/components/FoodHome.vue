<template>
    <div class="wrapper-home">
        <!--            卡片内容-->
        <el-row type="flex" :gutter="10">
            <el-col :span="6" v-for="(item,index) in $store.getters.getState.foodList" :key="'item' + index">
                <el-card :body-style="{padding:'0px'}">
                    <!--                        食物图片-->
                    <div class="img-warp"><img :src="item.src" class="image"></div>
                    <!--                        食物信息-->
                    <div style="padding:14px;">
                        <span>{{item.name}}</span>
                        <el-button type="text" class="button" icon="el-icon-shopping-cart-2" @click="handleAdd(index)">
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                foodList: [
                    {id:1,name:'汉堡',src:'static/img/1.png',price:18},
                    {id:2,name:'宫保鸡丁',src:'static/img/2.png',price:19},
                    {id:3,name:'火锅',src:'static/img/3.png',price:38},
                    {id:4,name:'小炒牛肉',src:'static/img/4.png',price:20},
                    {id:5,name:'酸菜鱼',src:'static/img/5.png',price:25},
                    {id:6,name:'辣子鸡',src:'static/img/6.png',price:28},
                    {id:7,name:'酸辣土豆丝',src:'static/img/7.png',price:15},
                    {id:8,name:'椰子鸡',src:'static/img/8.png',price:30},
                ],
                carData:[]
            }
        },
        created() {
            //设置Vuex中foodList的数据
            this.$store.dispatch('setStateFood',this.foodList);
        },
        methods: {
            //单击菜品，将其添加到购物车
            handleAdd(index) {
                //获取状态管理中的carData数据
                this.carData = this.$store.getters.getState.carData;
                //判断购物车中有无单击的菜品
                if(JSON.stringify(this.carData).indexOf(JSON.stringify(this.foodList[index].name))>0){
                    //遍历购物车找到单击的菜品，并将其数量加1
                    this.carData.forEach((elm,foodIndex) => {
                        if (elm.id == this.foodList[index].id) {
                            elm.count +=1;
                        }
                    })
                } else {
                    //添加菜品到购物车中，数量为1
                    this.foodList[index].count = 1;
                    this.carData.push(this.foodList[index]);
                }
                //将购物车数据保存到状态管理中
                this.$store.dispatch('setStateData',this.carData);
                //设置路由跳转
                this.$router.push({path:'/cart'})
            }
        }
    }
</script>

<style>
    /*内容居中*/
    .wrapper-home {width: 1060px;margin: 0 auto 0;padding-top: 20px;box-sizing:border-box;min-height:calc(100vh - 140px);}
    /*卡片样式*/
    .xwrapper-home,.is-always-shadow {width: 225.5px;}
    .el-row.el-row--flex {flex-wrap: wrap;}
    .el-col {padding-left: 35px !important;margin-bottom: 20px;}
    /*图片*/
    .img-warp {width: 225.5px;height: 200px;}
    .img-warp img {width:100%;height:100%;}
    /*图标*/
    .button{padding: 0;float:right;font-size:20px;}
</style>