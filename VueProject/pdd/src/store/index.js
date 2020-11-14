//入口文件

//引入模块
import Vue from 'vue'
import Vuex from 'vuex'

//引入其他文件
import state from './state'
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters";

//1：使用vuex
Vue.use(Vuex);

//2：对外输出vuex的store对象
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
