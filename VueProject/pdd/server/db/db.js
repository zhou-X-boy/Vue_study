
//1：引入mysql模块
const mysql = require('mysql');

//2：建立连接
const conn = mysql.createConnection({
  host: '127.0.0.1',  //连接的数据库所再的主机
  user: 'root',    //账号
  password: 'zhou0317',   //密码
  database: 'pdd',   //所要连接的数据库的名字
  multipleStatements: true //允许执行多条语句
})
//3：进行连接
conn.connect();
//4：将conn暴露出去
module.exports = conn;
