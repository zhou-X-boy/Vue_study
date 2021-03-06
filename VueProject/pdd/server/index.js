
const express = require('express');
const router = express.Router();

//引入连接的mysql的模块
const conn = require('./../db/db');

/* GET home page. */
router.get('/', function(req, res, ) {
  res.render('index', { title: 'Express' });
});

/*批量将recommend.json的数据插入到数据库的recommend表当中*/
//1：获取到需要批量插入的JSON文件中的数据
const recommendArr = require('./../data/recommend').data;
router.get('/recommend/api', function (req, res, ) {
  // 1. 定义临时数组
  let temp_arr_all = [];
  // 2. 遍历获取到的JSON文件获取到的数据
  //
  for (let i = 0; i < recommendArr.length; i++) {
    // 2.1 取出该数据中的单个数据对象
    let oldItem = recommendArr[i];
    // 2.2 取出跟数据库表中对应的需要插入的数据的字段
    let temp_arr = [];
    temp_arr.push(oldItem.goods_id);
    temp_arr.push(oldItem.goods_name);
    temp_arr.push(oldItem.short_name);
    temp_arr.push(oldItem.thumb_url);
    temp_arr.push(oldItem.hd_thumb_url);
    temp_arr.push(oldItem.image_url);
    temp_arr.push(oldItem.price);
    temp_arr.push(oldItem.normal_price);
    temp_arr.push(oldItem.market_price);
    temp_arr.push(oldItem.sales_tip);
    temp_arr.push(oldItem.hd_url);
    // 2.3 合并到定义的临时的数组中
    temp_arr_all.push(temp_arr);
  }
  // console.log(temp_arr_all);

  // 3. 批量插入数据库表
  // 3.1 数据库插入的语句
  let sqlStr = "INSERT INTO recommend(goods_id,goods_name,short_name,thumb_url,hd_thumb_url,image_url,price,normal_price,market_price,sales_tip,hd_url) VALUES ?";
  // 3.2 执行语句
  conn.query(sqlStr, [temp_arr_all], (error, results) => {
    if (error) {
      console.log('插入失败'+error);
    } else {
      console.log('插入成功');
    }
  });
});

/*批量将homenav.json转换到数据库的homenav表中*/
//1：获取到需要批量插入的JSON数据
const homenavArr = require('./../data/homenav.json').data;
router.get('/homenav/api',function(req,resp,next){
  //2：定义一个临时数组
  let tempArr_all = [];
  //3：遍历获取到的需要批量插入到数据库表中的JSON数据
  for(i = 0;i<homenavArr.length;i++){
    //4：取得该数组中的单个数组
    let oldAll = homenavArr[i];
    //5：取出对应数据库表当中需要插入的字段
    let temp_arr = [];
    temp_arr.push(oldAll.iconurl);
    temp_arr.push(oldAll.icontitle);
    //6：合并到临时数组当中
    tempArr_all.push(temp_arr);
  }
  // console.log(tempArr_all);
  //7：定义一个数据库插入语句
  let sqlStr = "INSERT INTO homenav(iconurl,icontitle) VALUES ?"
  //8：执行语句
  conn.query(sqlStr,[tempArr_all],(err,results)=> {
    if (err){
      console.log("插入失败"+err);
    }else{
      console.log("插入成功");
    }
  });
});

/*批量将shopList.json中的数据插入到数据库的表homeshop当中*/
//1：获取到需要批量插入的JSON数据
const homeshopArr = require('./../data/shopList.json').goods_list;
router.get('/homeshop/api',function(req,resp,next){
  //2：定义一个临时数组
  let tempArr_all = [];
  //3：遍历获取到的需要批量插入到数据库当中的JSON数据
  for(i = 0; i<homeshopArr.length; i++){
    //4：取得数组当中的单个数组
    let oldArr = homeshopArr[i];
    //5：取出对应数据库当中需要插入的字段
    let temp_arr = [];
    temp_arr.push(oldArr.goods_id);
    temp_arr.push(oldArr.goods_name);
    temp_arr.push(oldArr.short_name);
    temp_arr.push(oldArr.image_url);
    temp_arr.push(oldArr.thumb_url);
    temp_arr.push(oldArr.hb_thumb_url);
    temp_arr.push(oldArr.market_price);
    temp_arr.push(oldArr.normal_price);
    temp_arr.push(oldArr.sales_tip);
    //6：合并到临时数组当中
    tempArr_all.push(temp_arr);
  }
  // console.log(tempArr_all);
  //7：定义一个数据库插入语句
  let sqlStr = "INSERT INTO homeshop(goods_id,goods_name,short_name,image_url,thumb_url,hb_thumb_url,market_price,normal_price,sales_tip) VALUES ?";
  //8：执行插入语句
  conn.query(sqlStr,[tempArr_all],(err,results)=> {
    if(err){
      console.log('插入失败'+err);
    }else{
      console.log('插入成功');
    }
  })
});

/*批量将search.json中的数据插入到数据库的表search当中*/

router.get('/search/api',function(req, res){
  let sqlStr = 'SELECT * FROM homeshop;SELECT a.goods_id,b.group_order_id,b.avatar1,b.avatar2 FROM homeshop a INNER JOIN bubble b on a.goods_id=b.group_order_id WHERE b.group_order_id';
  conn.query(sqlStr,(err,results)=>{
    if(err){
      res.json({
        err_code:1,
        message:err,
      })
    }else {
      res.json({
        success_code:200,
        message: results,
      })
    }
  })
})


/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
  // const data = require('../data/homecasual');
  // res.json({success_code: 200, message: data})

  //1：定义查询数据库中的轮播图语句
  let sqlStr = 'select * from homecasual';
  /*2：执行语句
  * conn.query('select * from homecasual',functuon()=>{})
  * err，执行错误返回的错误语句
  * results，执行成功时返回的从数据库中查询到的数据
  * */
   conn.query(sqlStr, (err, results) => {
       if (err){
         res.json({
           err_code: 1,  //执行错误返回的状态码
           message: '资料不存在',
           affextedRows: 0})
       }else {
         res.json({
           success_code: 200,  //执行成功返回的状态码
           message: results,   //执行成功返回的数据
           affextedRows: results.affextedRows
         })
       }
   })

});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
  // const data = require('../data/homenav');
  // res.json({success_code: 200, message: data});
  //1：定义查询语句
  let sqlStr = "SELECT * FROM homenav";
  //2：执行语句
  conn.query(sqlStr, (err, results)=> {
    if(err){
      res.json({
        err_code: 1,
        message: err
      })
    }else{
      res.json({
        success_code: 200,
        message: results
      })
    }
  })

});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
  /*
 let sqlStr = 'select * from homeshoplist';
  conn.query(sqlStr, (err, results) => {
      if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
      res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
  })
  */
  setTimeout(function () {
    const data = require('../data/shopList');
    res.json({success_code: 200, message: data})
  }, 300);
});

/**
 * 获取推荐商品列表
 */
router.get('/api/recommendshoplist', (req, res)=>{
  setTimeout(function () {
    // const data = require('../data/recommend');
    // res.json({success_code: 200, message: data})

    //1：定义查询语句
    let sqlStr = "select * from recommend"
    //2：执行语句
    conn.query(sqlStr, (err, results)=>{
      if(err){
        res.json({
          error_code: 1,  //失败响应的状态码
          message: err,   //失败返回的数据
        })
      }else{
        res.json({
          success_code: 200,  //成功响应状态码
          message: results    //成功从数据库查询到的数据
        })
      }
    })
  }, 10);
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/recommend_users');
    res.json({success_code: 200, message: data})
  }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res)=>{
  setTimeout(function () {
    const data = require('../data/search');
    res.json({success_code: 200, message: data})
  }, 10);
});

module.exports = router;
