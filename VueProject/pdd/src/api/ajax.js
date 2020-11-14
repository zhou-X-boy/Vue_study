//引入axios模块
import axios from 'axios'

export default function ajax(url = '',params = {},type = 'GET') {
  //1：定义promise对象
  let promise ;
  //请求成功返回的方法 resolve,请求失败返回的方法 reject
  return new Promise((resolve,reject)=> {
    //2：判断请求方式
    if('GET' === type){
      //2.1：拼接请求的字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] +'&'
      });
      //2.2：最后一个字符 &
      if(paramsStr !== ''){
        //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
        //lastIndexOf() 方法可返回一个指定的元素在数组中最后出现的位置，从该字符串的后面向前查找。
        paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
      }
      //2.3：完整路径
      url += '?' + paramsStr;
      //2.4：发送 GTE 请求
      promise = axios.get(url)
    }else if('POST' === type){
      //发送 POST 请求
      promise = axios.post(url,params);
    }
    //3：返回请求的结果
    promise.then((response) => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    })
  })
}
