// 配置完成路由后,  会自动增加了两个属性供访问使用: $router 、$route

//1：引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入一级路由
import Home from './../pages/Home/Home'
import Recommend from './../pages/Recommend/Recommend'
import Search from './../pages/Search/Search'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Login from './../pages/Login/Login'

// 引入首页二级路由
import Hot from '../pages/Home/Children/Hot/Hot'
import Dress from "../pages/Home/Children/Dress/Dress"
import Box from "../pages/Home/Children/Box/Box"
import Mbaby from "../pages/Home/Children/Mbaby/Mbaby"
import General from "../pages/Home/Children/General/General"
import Food from "../pages/Home/Children/Food/Food"
import Shirt from "../pages/Home/Children/Shirt/Shirt";
import Man from "../pages/Home/Children/Man/Man";
import Ele from "../pages/Home/Children/Ele/Ele";

//引入个人中心页二级路由
import MeSetting from "../pages/Me/Childrren/MeSetting";
import MeDetail from "../pages/Me/Childrren/UserDetail/UserDetail";
import MePwd from "../pages/Me/Childrren/Setting/SettingPwd";
import SettingPhone from "../pages/Me/Childrren/Setting/SettingPhone";


//2：声名使用
Vue.use(VueRouter);

//3：输出路由对象
export default new VueRouter({
  //3.1：配置1级路由
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {path: 'hot', component: Hot,meta: {showBottomTabBar: true}},
        {path: 'dress', component: Dress,meta: {showBottomTabBar: true}},
        {path: 'box', component: Box,meta: {showBottomTabBar: true}},
        {path: 'mbaby',component: Mbaby,meta: {showBottomTabBar: true}},
        {path: 'general',component: General,meta: {showBottomTabBar: true}},
        {path: 'food',component: Food,meta: {showBottomTabBar: true}},
        {path: 'shirt',component: Shirt,meta: {showBottomTabBar: true}},
        {path: 'man',component:Man,meta: {showBottomTabBar: true}},
        {path: 'ele',component:Ele,meta: {showBottomTabBar: true}},
        {path: '/home',redirect:'/home/hot'}
      ],
      meta: {showBottomTabBar: true}
    },
    {
      path: '/recommend',
      component: Recommend,
      meta: {showBottomTabBar: true}

    },
    {
      path: '/search',
      component: Search,
      meta: {showBottomTabBar: true}

    },
    {
      path: '/Chat',
      component: Chat,
      meta: {showBottomTabBar: true}

    },
    {
      path: '/me',
      component: Me,
      meta: {showBottomTabBar: true}
    },
    {
      path: '/mepwd',
      name:'mePwd',
      component: MePwd
    },
    {
      path: '/setting',
      name:'setting',
      component: MeSetting
    },
    {
      path:'/settingphone',
      component: SettingPhone
    },
    {
      path: '/detail',
      component: MeDetail
    },
    {path: '/login', component: Login},
    {path: '/', redirect:'/home'}
  ]
})
