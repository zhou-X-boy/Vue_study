# 实现服务器端访问MySQL数据库中的数据

## 在服务器端进行操作

> 在服务器端**server**文件夹下的**router**文件夹下的**index.js**中进行操作
>
> server
>
> ​		--------router
>
> ​				---------index.js

### index.js

> index.js
>
> ```javascript
> const express = require('express');
> const router = express.Router();
> 
> //引入连接的mysql的模块
> const conn = require('./../db/db');
> 
> /**
>  * 获取首页轮播图
>  */
> router.get('/api/homecasual', (req, res)=>{
>   //1：定义查询数据库中的轮播图语句
>   let sqlStr = 'select * from pdd_homecasual';
>   /*2：执行语句
>   * conn.query('select * from homecasual',functuon()=>{})
>   * err，执行错误返回的错误语句
>   * results，执行成功时返回的从数据库中查询到的数据
>   * res.json()数据为json格式
>   * */
>    conn.query(sqlStr, (err, results) => {
>        if (err){
>          res.json({
>            err_code: 1,  //执行错误返回的状态码
>            message: '资料不存在',
>            affextedRows: 0})
>        }else {
>          res.json({
>            success_code: 200,  //执行成功返回的状态码
>            message: results,   //执行成功返回的数据
>            affextedRows: results.affextedRows
>          })
>        }
>    })
> 
> });
> 
> module.exports = router;
> ```
>
> 

> 当这个数据访问的是数据库中的数据后，从数据库中返回出得数据被转化为JSON格式后，
>
> 刷新页面后，页面会报错，
>
> 需要在项目客户端**pdd**文件夹下的的**src**文件夹下的**store**文件夹下的**actions.js**文件中
>
> 查看**commit**发送的异步触发mutations.js的方法获取的数据是否还是原来的那个
>
> 此处
>
> ```
> 原
> commit(HOME_CASUAL, {homecasual : result.message.data});
> 
> 现
> commit(HOME_CASUAL, {homecasual : result.message});
> ```

