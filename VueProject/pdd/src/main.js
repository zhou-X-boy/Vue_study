import Vue from 'vue'
import App from './App'

//引入路由
import router from './router/index'
//引入第三方组件库
import LyTab from 'ly-tab'
//引用vuex的store
import store from './store'

//全局使用第三方库LyTab
Vue.use(LyTab);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

