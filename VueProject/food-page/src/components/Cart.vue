<template>
    <div class="order-wrapper">
        <h4 class="order-title">购物清单</h4>
        <el-table :data="data" class="tab-wrap" ref="multipleTable" v-bind:key="restId">
            <el-table-column prop="src" label="图片" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.src" width="40" height="40" class="head_pic">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="菜名" width="200"></el-table-column>
            <el-table-column label="数量">
                <template slot-scope="scope">
                    <input type="button" @click="numReduce(scope.$index)" value="-" :disabled="data[scope.$index].count == 1">
                    <input type="text" v-model="data[scope.$index].count"><input type="button" @click="numAdd(scope.$index)" value="+">
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价（元）">
                <template slot-scope="scope">
                    <p class="red-text">￥<span>{{data[scope.$index].price}}</span></p>
                </template>
            </el-table-column>
            <el-table-column label="金额（元）">
                <template slot-scope="scope">
                    <p class="red-text">￥<span>{{data[scope.$index].count * data[scope.$index].price}}</span></p>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <p class="delete" @click="del(scope.$index)">
                        <i class="el-icon-delete"></i>
                    </p>
                </template>
            </el-table-column>
        </el-table>
<!--        统计信息-->
        <div class="order-info">
            <p class="fr text-price red-text">￥<span>{{getTotal.totalPrice}}</span></p>
            <p class="fr text-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含配送费）：</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: this.$store.getters.getState.carData,
                getTotal: {totalPrice: 0,totalNum: 0},
                restId: 1
            }
        },
        methods:{
          //计算总价格和总数量
          getAllTotal(){
              let totalPrice = 0,totalNum = 0;
              //遍历被选中的数据
              this.data.forEach((elm,index) => {
                  totalPrice = totalPrice+elm.count*elm.price;
                  totalNum = totalNum+elm.count;
              });
              this.getTotal.totalPrice = totalPrice;
              this.getTotal.totalNum = totalNum;
          },
          //增加数量
            numAdd(index){
              this.restId++;
              this.data[index].count++;
              this.$options.methods.getAllTotal.call(this);
            },
            //减少数量
            numReduce(index){
              this.restId--;
              this.data[index].count--;
              this.$options.methods.getAllTotal.call(this);
            },
            //删除单条数据
            del(index){
              this.data.splice(index,1);
              this.$options.methods.getAllTotal.call(this);
            }
        },
        created() {
            this.getAllTotal();
        }
    }
</script>

<style>
    .fr {float:right;}
    .fl {float:left;}
    .red-text {color:#e94826;font-weight: 600;}
    .order-wrapper {margin:20px auto 0;width: 900px;min-height: calc(100vh - 140px);}
    /*标题*/
    .order-title {line-height: 60px;padding-left: 80px;border: 1px solid #ebeef5;border-top:2px solid #409eff;}
    /*table表格*/
    .tab-wrap {border:1px solid #ebeef5;}
    input[type='button']{width:20px;height:20px;}
    input[type='text']{width:50px;height:18px;}
    /*统计信息*/
    .order-info {height:40px;line-height:40px;background-color: antiquewhite;color:#333;font-size:12px;padding:0 20px;}
    .text-price{font-size: 16px;}
    .text-num span{color:#e94826;font-weight:600;}
    /*删除按钮*/
    .delete i {padding:0 5px;cursor:pointer;}
    /*删除选中按钮*/
    .deleteSelect{cursor: pointer;}
    .deleteSelect i {margin-right:5px;}
</style>