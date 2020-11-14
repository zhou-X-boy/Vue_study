# 建立联系

## 下载[MySQL](https://github.com/mysqljs/mysql)第三方库

> 在服务端文件夹server下下载
>
> npm install mysql --save

------

## 服务端跟数据库进行关联

### 新建文件夹db

> 在服务端server文件夹下新建一个文件夹**db**用来存放跟数据库建立连接的文件

### 新建JS文件

> 在**db**文件夹下新建一个JS文件**db.js**进行连接数据库操作
>
> db.js
>
> ```js
> //1：引入mysql模块
> const mysql = require('mysql');
> 
> //2：建立连接
> const conn = mysql.createConnection({
>   host: '127.0.0.1',  //连接的数据库所再的主机
>   user: 'root',    //账号
>   password: 'zhou0317',   //密码
>   database: 'pdd',   //所要连接的数据库的名字
>   multipleStatements: true //允许执行多条语句
> })
> //3：进行连接
> conn.connect();
> //4：将conn暴露出去
> module.exports = conn;
> 
> ```
>
> 