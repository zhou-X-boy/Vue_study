//store的状态管理的所有方法所在的文件

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_GOODS
} from './mutation-types'

export default {
  //首页轮播图
  [HOME_CASUAL](state,{homecasual}){
    //将服务器请求过来的 homecasual 赋值给state中自定义的数组 homecasual
    state.homecasual = homecasual;
  },
  //首页导航
  [HOME_NAV](state,{homenav}){
    //将服务器请求过来的 homenav 赋值给state中自定义的数组 homenav
    state.homenav = homenav;
  },
  //首页商品列表
  [HOME_SHOP_LIST](state,{homeshoplist}){
    //将服务端请求过来的 homeshoplist 赋值给state中定义的数组 homeshoplist
    state.homeshoplist = homeshoplist;
  },
  //推荐商品列表
  [RECOMMEND_SHOP_LIST](state,{recommendshoplist}){
    //将服务端请求过来的 recommendshoplist 赋值给state中定义的数组 recommendshoplist
    state.recommendshoplist = recommendshoplist;
  },
  //搜索列表
  [SEARCH_GOODS](state,{searchgoods}){
    //将服务端请求过的 searchgoods 赋值给state中定义的数组 searchgoods
    state.searchgoods = searchgoods;
  }
}
