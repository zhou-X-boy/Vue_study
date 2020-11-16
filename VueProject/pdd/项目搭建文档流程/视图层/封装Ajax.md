# 封装AJAX

## 下载Ajax的[axios](https://github.com/axios/axios)库

> npm install axios

------

## 新建ajax请求的JS文件

> 在项目目录下的**api**文件夹下新建**ajax.js**请求文件
>
> api
>
> ​	----ajax.js

### ajax.js文件

> ajax.js文件内的操作
>
> ```javascript
> //引入axios模块
> import axios from 'axios'
> 
> export default function ajax(url = '',params = {},type = 'GET') {
>   //1：定义promise对象
>   let promise ;
>   //请求成功返回的方法 resolve,请求失败返回的方法 reject
>   return new Promise((resolve,reject)=> {
>     //2：判断请求方式
>     if('GET' === type){
>       //2.1：拼接请求的字符串
>       let paramsStr = '';
>       Object.keys(promise).forEach(key => {
>         paramsStr += key + '=' + params[key] +'&'
>       });
>       //2.2：最后一个字符 &
>       if(paramsStr !== ''){
>         //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
>         //lastIndexOf() 方法可返回一个指定的元素在数组中最后出现的位置，从该字符串的后面向前查找。
>         paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
>       }
>       //2.3：完整路径
>       url += '?' + paramsStr;
>       //2.4：发送 GTE 请求
>       promise = axios.get(url)
>     }else if('POST' === type){
>       //发送 POST 请求
>       promise = axios.post(url,params);
>     }
>     //3：返回请求的结果
>     promise.then((response) => {
>       resolve(response.data);
>     }).catch(error => {
>       reject(error);
>     })
>   })
> }
> 
> ```

## 项目源码地址

> https://github.com/zhou-X-boy/Study/tree/master/Vue_study/VueProject/pdd