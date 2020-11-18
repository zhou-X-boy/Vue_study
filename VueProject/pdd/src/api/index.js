//引入 ajax 模块
import ajax from './ajax'

//1；设置基础路径
const BASE_URL = 'http://127.0.0.1:3000';

//2：请求方法
//2.1：请求首页的轮播图
export const getHomeCasual = ()=> ajax(BASE_URL + '/api/homecasual');

//2.2：请求首页的导航
export const getHomeNav = ()=> ajax(BASE_URL + '/api/homenav');

//2.3：请求首页的商品数据
export const getHomeShopList = ()=> ajax(BASE_URL + '/api/homeshoplist');

//2.4：请求推荐的商品数据
export const getRecommendShopList = (params)=> ajax(BASE_URL + '/api/recommendshoplist',params);

//2.5：请求搜索列表数据
export const getSearchGoods = ()=> ajax(BASE_URL + '/api/searchgoods');

//2.6：请求短信验证码
export const getPhoneCode = (phone)=> ajax(BASE_URL + '/api/sendcode' ,{phone});
