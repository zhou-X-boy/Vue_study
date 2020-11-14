// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
//导入Vuex
import store from './store'
import Header from './components/Header'
import Footer from './components/Footer'
Vue.component('Header',Header)
Vue.component('Footer',Footer)
new Vue({
  el: '#app',
  router,
  //使用Vuex
  store,
  components: { App },
  template: '<App/>'
})
