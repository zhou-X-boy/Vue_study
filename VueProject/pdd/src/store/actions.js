// vuex 中用于异步 commit 的发送

import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecommendShopList,
  getSearchGoods,
  getUserInfo,
  getLoginOut
} from '../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_GOODS,
  USER_INFO,
  RESET_USER_INFO
} from './mutation-types'

export default {
  //获取首页轮播图
  async reqHomeCasual({commit}){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getHomeCasual函数所获取到的数据
    const result = await getHomeCasual();
    //commit 异步 触发指定的 mutations 中的方法
    commit(HOME_CASUAL, {homecasual : result.message});
  },
  //获取首页导航
  async reqHomeNav({commit}){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getHomeNav函数所获取到的数据
    const result = await getHomeNav();
    //commit 异步 触发指定的 mutations 中的方法
    commit(HOME_NAV, {homenav : result.message});
  },
  //获取首页商品列表
  async reqHomeShopList({commit}){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getHomeShopList函数所获取到的数据
    const result = await getHomeShopList();
    //commit 异步 触发指定的 mutations 中的方法
    commit(HOME_SHOP_LIST, {homeshoplist: result.message.goods_list});
  },
  //获取推荐商品列表
  async reqRecommendShopList({commit},params){
    // console.log(params);
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getRecommendShopList函数所获取到的数据
    const result = await getRecommendShopList(params);
    //commit 异步 触发指定的 mutations 中的方法
    commit(RECOMMEND_SHOP_LIST, {recommendshoplist: result.message});
    params.callback && params.callback();
  },
  //获取搜索列表
  async reqSearchGoods({commit},callback){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中getSearchGoods函数所获取到的数据
    const result = await getSearchGoods();
    //commit 异步 触发指定的 mutations 中的方法
    commit(SEARCH_GOODS, {searchgoods: result.message.data});
    //回调执行，初始化滚动列表
    //callback && callback();
  },
  //同步用户信息
  syncUserInfo({commit},userInfo){
    //commit 异步 触发指定的 mutations 中的方法
    commit(USER_INFO,{userInfo});
  },
  //异步获取用户的信息
  async getUserInfo({commit}){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getUserInfo函数所获取到的数据
    const result = await getUserInfo();
    console.log(result);
    if(result.success_code === 200) {  //请求成功
      //commit 异步 触发指定的 mutations 中的方法
      commit(USER_INFO,{userInfo: result.message});
    }
  },
  //退出登录,异步清空userInfo中的用户信息
  async loginOut({commit}){
    //提取服务端的请求数据并赋值给一个新的数组，也就是api文件夹下的index.js中的getLoginOut函数所获取到的数据也就是空的数据
    const result = await getLoginOut();
    console.log(result);
    if(result.success_code === 200) {
      //commit 异步 触发指定的 mutations 中的方法
      commit(RESET_USER_INFO);
    }
  }
}
