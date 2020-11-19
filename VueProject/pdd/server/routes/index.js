const express = require('express');
const router = express.Router();


//引入连接的mysql的模块
const conn = require('./../db/db');

//引入svg-captcha模块
const svgCaptcha = require('svg-captcha');

//引入第三方短信提供商提供的短信接口,这里是腾讯云的
const sms_util = require("./../util/sms_util");

/**
 * res：客户端提交给服务器的信息
 * req：服务端发送给客户端的信息
 */

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*批量将recommend.json的数据插入到数据库的recommend表当中*/
//1：获取到需要批量插入的JSON文件中的数据
const recommendArr = require('./../data/recommend').data;
router.get('/recommend/api', function (req, res) {
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
router.get('/homenav/api',function(req,resp){
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
router.get('/homeshop/api',function(req,resp){
  //2：定义一个临时数组
  let tempArr_all = [];
  //3：遍历获取到的需要批量插入到数据库当中的JSON数据
  for(i = 0; i<homeshopArr.length; i++){
    //4：取得数组当中的单个数组
    let oldArr = homeshopArr[i];
    //5：取出对应数据库当中需要插入的字段
    let temp_arr = [];
    temp_arr.push(oldArr.id);
    temp_arr.push(oldArr.goods_id);
    temp_arr.push(oldArr.goods_name);
    temp_arr.push(oldArr.short_name);
    temp_arr.push(oldArr.image_url);
    temp_arr.push(oldArr.thumb_url);
    temp_arr.push(oldArr.hd_thumb_url);
    temp_arr.push(oldArr.market_price);
    temp_arr.push(oldArr.normal_price);
    temp_arr.push(oldArr.sales_tip);
    //6：合并到临时数组当中
    tempArr_all.push(temp_arr);
  }
  // console.log(tempArr_all);
  //7：定义一个数据库插入语句
  let sqlStr = "INSERT INTO homeshop(id,goods_id,goods_name,short_name,image_url,thumb_url,hd_thumb_url,market_price,normal_price,sales_tip) VALUES ?";
  //8：执行插入语句
  conn.query(sqlStr,[tempArr_all],(err,results)=> {
    if(err){
      console.log('插入失败'+err);
    }else{
      console.log('插入成功');
    }
  })
});



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
           affextedRows: 0
         })
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
  //获取参数
  let pageNo = req.query.page || 1;
  let pageSize = req.query.count || 20;
  // console.log(pageNo);
  // console.log(pageSize);

    // const data = require('../data/recommend');
    // res.json({success_code: 200, message: data})

    //1：定义查询语句
    let sqlStr = "select * from recommend LIMIT "+ (pageNo-1)*pageSize+","+pageSize;
    // console.log(sqlStr);
    //2：执行语句
    conn.query(sqlStr, (err, results)=>{
      if(err){
        res.json({
          error_code: 1,  //失败响应的状态码
          message: err,   //失败返回的数据
        })
      }else{
        setTimeout(()=> {
          res.json({
            success_code: 200,  //成功响应状态码
            message: results    //成功从数据库查询到的数据
          })
        },1500);
      }
    })

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


/**
 * 一次性图形验证码
 */
router.get('/api/svgcaptcha',(req, res)=> {
  //1：生成随机的图形验证码
  let captcha = svgCaptcha.create({
    color: true,  //颜色
    noise: 2,     //干扰的线条
    ignoreChars: 'o0ii',   //忽略的字母，也就是不会出现的字符
    size: 4,      //字符个数
    background: '#ffffff'    //背景颜色
  });
  // console.log(captcha.text);

  //2：保存到session当中     toLocaleLowerCase()方法，将字符全部转化为小写
  req.session.captcha = captcha.text.toLocaleLowerCase();
  // console.log(req.session.captcha);
  // //3：返回给客户端
  res.type('svg');
  res.send(captcha.data);
});

/**
 * 发送验证码短信
 */
let users = {}; //用户信息
router.get('/api/sendcode',(req,res)=> {
  //1：获取手机号码
  let phone = req.query.phone;
  //2：随机产生验证码   调用sms_util.js中的randomCode()方法
  let code = sms_util.randomCode(6);
  // console.log(code);
  // //通过短信提供商提供的接口发送验证码信息
  // sms_util.sendCode(phone,code, function (success) {
  //   if(success) {
  //     users[phone] = code;
  //     res.json({
  //       success_code: 200,
  //       message: '验证码获取成功'
  //     });
  //   }else {
  //     res.json({
  //       err_code: 0,
  //       message: '验证码获取失败'
  //     });
  //   }
  // });

  //因为短信提供商提供的短信接口需要付费，就让他成功后直接将验证吗码发送给客户端，不通过短信发送
  //成功
  setTimeout(()=> {
    users[phone] = code;
    res.json({
      success_code: 200,
      message: code
    });
  },2000);

  //默认都是成功，就不需要失败的返回参数
  //失败
  // setTimeout(()=> {
  //   res.json({
  //     error_code: 0,
  //     message: '验证码获取失败'
  //   });
  // },2000);

})

/**
 * 手机验证码登录
 */
router.post('/api/logincode',(req,res)=> {
  //1：获取客户端提交过来的数据包括手机号码，验证码
  const phone = req.body.phone;
  const code = req.body.code;
  //2：验证客户端发送过来的验证码是否匹配服务器发送过去的验证码
  if(users[phone] !== code) {
    return res.json({
      error_code: 0,
      message: '验证码错误'
    });
  }else {
    //3：删除用户验证码信息
    delete users[phone];
    //3：根据手机号码查询数据库中是否存在这个手机号码的用户
    //3.1：定义查询语句
    let sqlStr = "SELECT * FROM user_info WHERE user_phone = '" + phone + "' LIMIT 1";
    //3.2：执行查询语句
    conn.query(sqlStr,(error,results)=> {
      if(error) {
        res.json({
          error_code: 0,
          message: '从数据库请求数据失败'
        })
      }else {
        //3.3：将数组格式的数据转化为字符串格式后再转化为JSON格式
        results = JSON.parse(JSON.stringify(results));
        // console.log(results);
        // console.log(results[0]);
        //3.4：判断用户是否存在
        //用户已经存在
        if(results[0]) {
          //3.5：将从数据库查询到的数据的id保存到session中
          req.session.userId = results[0].id;
          //3.6：返回数据给客户端
          res.json({
            success_code: 200,
            message: {
              id: results[0].id,
              user_name: results[0].user_name,
              user_phone: results[0].user_name
            }
          })
        }else {  //用户不存在,新用，向数据库表中插如这个新用户的信息
          //3.7：定义一条向数据库表中插入这个信息的语句
          const addStr = "INSERT INTO user_info(user_name,user_phone) VALUES (?,?)";
          //3.8：需要向数据库表插入的数据
          const addParams = [phone,phone];
          //3.9：执行语句
          conn.query(addStr,addParams,(error,results)=> {
            //3.10：将数组格式的数据转化为字符串格式再转化为JSON格式
            results = JSON.parse(JSON.stringify(results));
            // console.log(results);
            if(!error) {
              //3.11：将感刚刚插入的数据的id保存到session中
              req.session.id = results.insertId;
              //3.12：定义一个查询语句，查询刚刚插入到数据库表中的新用户的信息
              let sqlStr = "SELECT * FROM user_info WHERE id = '" + results.insertId + "' LIMIT 1";
              //3.13：执行语句
              conn.query(sqlStr,(error,results)=> {
                if(error) {
                  res.json({
                    error_code: 0,
                    message: error
                  });
                }else {
                  //3.14：将从数据库表中查询到的数据转化为字符串格式再转化为JSON格式
                  results = JSON.parse(JSON.stringify(results));
                  //3.15；将数据发送给客户端
                  res.json({
                    success_code: 200,
                    message: {
                      id: results[0].id,
                      user_name: results[0].user_name,
                      user_phone: results[0].user_phone
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  }
});

module.exports = router;
