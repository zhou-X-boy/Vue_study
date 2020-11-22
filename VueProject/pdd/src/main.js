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
import { Actionsheet,DatetimePicker,Picker,Popup } from 'mint-ui';


//引入第三方组件Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//全局引用Me页需要的字体图标
import '@/common/css/style.css'

//引入第三方组件 地区选择
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);


//全局使用第三方库LyTab
Vue.use(LyTab);

//全局使用第三方组件mint-ui
Vue.use(Mint);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);


//全局使用第三方组件ElementUI
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

