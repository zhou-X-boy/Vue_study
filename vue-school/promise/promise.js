/**
 * promise是一种异步处理机制,用来处理回调地域问题
 * promise的三种状态
 * pending：等待状态（理解为程序运行前）
 * fulfill：满足状态，调用 resolve 状态，此时会运行下一个 then
 * reject： 拒绝状态，主动回调 reject 时，就处于该状态，并且会回调 .catch()
 * 链式编程
 * resolve 用于处理外部传递过来的数据
 * reject 用于处理错误信息
 * 在操作时可以进行链式编程
 * .then(data => {
 *   基本操作语法
 *   完整的写法
 *   return Promise.resolve(data + 'a');  //一定要存在返回值
 *   缩写
 *   return data + 'b'
 * })
 * 任何一个 then 当中可以像 promise 回调一样，有 resolve 和 reject
 */

/**
 * 基本语法
 * new Promise((resolve,reject)=> {
 *
 * }).then((resolve)=> {
 *
 * }).catch((error))=> {
 *
 * }
 */


/**
 * 链式编程
 */
new Promise((resolve, reject) => {
  setTimeout(() =>{
    resolve('123');
  },400)
}).then(data =>{
  console.log(data);
  return data + 'a'
}).then(data => {
  console.log(data);
  return Promise.resolve(data + 'b');
}).then(data => {
  console.log.log(data);
  return Promise.resolve(data + 'c');
}).then(error => {
  return Promise.reject(error);
}).catch(error => {
  console.log.log(error);
})

/**
 * 配合 ajax 请求的 axios库 进行封装ajax请求
 * import axios from 'axios'  //引入axios库
 *export default ajax(url: '', params: {}, type: 'GET') {
 *   //定义一个promise对象
 *   let promise = {},
 *   return new Promise((resolve,reject)=> {
 *      if(type === 'GET') {
 *        let urlStr = '',
 *        Object.keys(params).forEach((key)=> {
 *          urlStr += key + '=' + params[key] + '&'
 *        })
 *        //这时候的路径为 user=123&name=z&
 *
 *        //去除最后一个字符 &
 *        if(urlStr !== '') {
 *          urlStr += urlStr.substr(0,urlStr.lastIndexOf('&'));
 *        }
 *        //这时候的路径为 user=123&name=z
 *
 *        //完整路径
 *        url = '?' + urlStr
 *        //这时候的路径为 http://localhost:8080/?user=1234&name=z
 *
 *        promise = axios.get(url);
 *      }else if(type === 'POST'){
 *        promise = axios.post(url, params)
 *      }
 *   }).then(response => {
 *     resolve(response.data)
 *   })
 *}
 */
