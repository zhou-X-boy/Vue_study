# 配置Vuex

## Vuex是？

> 1：Vuex是一个专为Vue.js应用程序开发的状态管理模式
>
> 2：当项目比较庞大的时候，每个组件的状态比较多，为了方便管理，需要把组件中的状态抽取出来，放入Vuex中进行统一管理。
>
> 作用：对项目中多个组件的共享状态进行集中式的管理(读/写)

------

## 安装Vuex

> npm install vuex --save

------

## Vuex图示

### vuex官方图示

> 官方图示
>
> ![](E:\Pictures\资料\vuex1.png)

### 手写图示

> 手写图示
>
> ![](E:\Pictures\资料\vuex.png)

------

## 创建vuex状态管理

> 在项目文件夹下的**src**文件夹中的store文件夹新建vuex状态管理相关文件
>
> ​	src
>
> ​		----store
>
> ​				index.js	  			Vuex入口文件
>
> ​				state.js					Vuex中的基本数据所在的文件  	
>
> ​				actions.js     			Vuex向mutations.js提交改变数据的请求，这里为通过commit方法异步 触发指定的mutations中的方法
>
> ​				mutation-types.js   Vuex统一常量所在文件夹
>
> ​				mutations.js			Vuex的store的状态管理的所有方法所在的文件 
>
> ​				getters.js 				  Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

### index.js

> index.js  Vuex入口文件
>
> ```javascript
> //入口文件
> 
> //引入模块
> import Vue from 'vue'
> import Vuex from 'vuex'
> 
> //引入其他文件
> import state from './state'
> import actions from "./actions"
> import mutations from "./mutations"
> import getters from "./getters";
> 
> //1：使用vuex
> Vue.use(Vuex);
> 
> //2：对外输出vuex的store对象
> export default new Vuex.Store({
>   state,
>   actions,
>   mutations,
>   getters
> })
> ```
>
> 

### state.js

> sates.js    Vuex中的基本数据所在的文件  	
>
> ```javascript
> //Vuex中的基本数据所在的文件
> 
> export default {
>   //首页轮播图
>   homecasual: [],
>   //首页导航
>   homenav: []
> }
> 
> ```
>
> 

### actions.js

> actions.js 	Vuex中通过commit方法异步 触发指定的mutations中的方法
>
> ```javascript
> // vuex 中用于异步 commit 的发送
> 
> //1：从服务端index.js文件中引入请求数据的方法
> import {
>   getHomeCasual,
>   getHomeNav
> } from '../api'
> 
> //2：从统一常量文件夹mutation-types.js文件中引入常量
> import {
>   HOME_CASUAL,
>   HOME_NAV
> } from './mutation-types'
> 
> 
> export default {
>       //3：获取首页轮播图
>       async reqHomeCasual({commit}){
>            //4：提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getHomeCasual函数所获取到的数据
>            const result = await getHomeCasual();
>            //5：commit 异步 触发指定的mutations中的方法
>            commit(HOME_CASUAL, {homecasual : result.message.data});
>       },
>    
>       //获取首页导航
>       async reqHomeNav({commit}){
>            //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getHomeNav函数所获取到的数据
>            const result = await getHomeNav();
>            //commit 异步 触发指定的mutations中的方法
>            commit(HOME_NAV, {homenav : result.message.data});
>       }
> }
> 
> ```
>
> 

### mutation-types.js

> mutation-types.js   Vuex统一常量所在文件夹
>
> ```javascript
> //统一常量
> 
> export const HOME_CASUAL = 'home_casual'; //首页轮播图
> export const HOME_NAV = 'home_nav';//首页导航
> 
> ```
>
> 

### mutations.js

> mutations.js     Vuex的store的状态管理的所有方法所在的文件 
>
> ```javascript
> // 从统一常量所在文件mutation-types.js所在文件中引入统一常量
> import {
>   HOME_CASUAL,
>   HOME_NAV
> } from './mutation-types'
> 
> export default {
>       //首页轮播图
>       [HOME_CASUAL](state,{homecasual}){
>            //将服务器请求过来的 homecasual 赋值给state中自定义的数组 homecasual
>            state.homecasual = homecasual;
>       },
>       //首页导航
>       [HOME_NAV](state,{homenav}){
>            //将服务器请求过来的 homenav 赋值给state中自定义的数组 homenav
>            state.homenav = homenav;
>       }
> }
> ```
>
> 

### getters.js

> getters.js    

## 项目源码地址

> https://github.com/zhou-X-boy/Study/tree/master/Vue_study/VueProject/pdd