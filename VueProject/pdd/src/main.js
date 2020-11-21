import Vue from 'vue'
import App from './App'

//引入路由
import router from './router/index'
//引入第三方组件库
import LyTab from 'ly-tab'
//引用vuex的store
import store from './store'

//引入第三发组件mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

//引入第三方组件Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//全局引用Me页需要的字体图标
import '@/common/css/style.css'

//全局使用第三方库LyTab
Vue.use(LyTab);

//全局使用第三方组件mint-ui
Vue.use(Mint);

//全局使用第三方组件ElementUI
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

