# 将JSON格式的文件数据批量插入到数据库中

> 在服务端**server**文件夹下的**router**文件夹下的**index.js**文件中操作

## index.js

> pdd\server\router\index.js
>
> index.js
>
> ```js
> const express = require('express');
> const router = express.Router();
> 
> //引入连接的mysql的模块
> const conn = require('./../db/db');
> 
> //批量将JSON格式的数据插入到数据库当中
> //1：获取到需要批量插入的JSON文件中的数据
> const recommendArr = require('./../data/recommend').data;
> router.get('/recommend/api', function (req, res, next) {
>   // 1. 定义临时数组
>   let temp_arr_all = [];
>   // 2. 遍历获取到的JSON文件获取到的数据
>   for (let i = 0; i < recommendArr.length; i++) {
>     // 2.1 取出该数据中的单个数据对象
>     let oldItem = recommendArr[i];
>     // 2.2 取出跟数据库表中对应的需要插入的数据的字段
>     let temp_arr = [];
>     temp_arr.push(oldItem.goods_id);
>     temp_arr.push(oldItem.goods_name);
>     temp_arr.push(oldItem.short_name);
>     temp_arr.push(oldItem.thumb_url);
>     temp_arr.push(oldItem.hd_thumb_url);
>     temp_arr.push(oldItem.image_url);
>     temp_arr.push(oldItem.price);
>     temp_arr.push(oldItem.normal_price);
>     temp_arr.push(oldItem.market_price);
>     temp_arr.push(oldItem.sales_tip);
>     temp_arr.push(oldItem.hd_url);
>     // 2.3 合并到定义的临时的数组中
>     temp_arr_all.push(temp_arr);
>   }
>   // console.log(temp_arr_all);
> 
>   // 3. 批量插入数据库表
>   // 3.1 数据库查询的语句
>   let sqlStr = "INSERT INTO pdd_recommend(goods_id,goods_name,short_name,thumb_url,hd_thumb_url,image_url,price,normal_price,market_price,sales_tip,hd_url) VALUES ?";
>   // 3.2 执行语句
>   conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {
>     if (error) {
>       console.log(error);
>       console.log('插入失败');
>     } else {
>       console.log('插入成功');
>     }
>   });
> });
> ```
>
> 重启服务端后，才浏览器输入 http://localhost:3000/recommend/api 查看控制台输出结果