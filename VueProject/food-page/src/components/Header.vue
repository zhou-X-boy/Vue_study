<template>
    <div class="header">
        <el-row>
<!--            页头logo-->
            <el-col :span="1"><div class="logo"><img src="../assets/logo.png"></div></el-col>
<!--            页头导航-->
            <el-col :span="6" class="navList">
<!--            首页-->
            <router-link to="/home">
                <p class="nav-label">首页</p>
            </router-link>
<!--            购物车-->
            <router-link to="/cart">
                <p class="nav-label">购物车</p>
            </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style>
/*页头*/
.header{width: 100%;height: 60px;border-bottom: 1px solid #e9e9e9;}
/*页头logo图片    */
.header .logo img{height: 60px;}
/*导航链接    */
.navList a {text-decoration: none;display: inline-block;padding: 20px;}
/*导航内容    */
.navList p {color: #333;}
</style>