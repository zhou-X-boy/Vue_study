<template>
    <div class="footer">
<!--        页脚-->
        <el-row>
            <!-- 联系我们-->
            <el-col :span="6">
                <div class="grid-content"><a href="#">联系我们</a></div>
            </el-col>
            <!-- 关于我们-->
            <el-col :span="6">
                <div class="grid-content"><a href="#">关于我们</a></div>
            </el-col>
            <!-- 关注我们-->
            <el-col :span="6">
                <div class="grid-content"><a href="#">关注我们</a></div>
            </el-col>
            <!-- 加入我们-->
            <el-col :span="6">
                <div class="grid-content"><a href="#">加入我们</a></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style>
/*页脚*/
.footer{height: 60px;width: 100%;background-color: #303133;box-sizing:border-box;line-height:60px;text-align:center;}
/*页脚连接    */
.footer a{color:#fff;text-decoration: none;font-size: 14px;}
</style>