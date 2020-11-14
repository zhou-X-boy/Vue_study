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
        {path: 'hot', component: Hot},
        {path: 'dress', component: Dress},
        {path: 'box', component: Box},
        {path: 'mbaby',component: Mbaby},
        {path: 'general',component: General},
        {path: 'food',component: Food},
        {path: 'shirt',component: Shirt},
        {path: 'man',component:Man},
        {path: 'ele',component:Ele},
        {path: '/home',redirect:'/home/hot'}
      ]
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/Chat',
      component: Chat
    },
    {
      path: '/me',
      component: Me
    },
    {
      path: '/',
      redirect:'/home'
    }
  ]
})
