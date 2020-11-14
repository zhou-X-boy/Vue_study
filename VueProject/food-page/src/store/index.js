import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {foodList : [],carData: []}
const mutations = {
    //方法名称官方建议使用大写
    SETSTATEFOOD(state,data){state.foodList = data;},
    SETSTATEDATA(state,data){state.carData = data;}
};
const actions = {
    setStateFood(context,data){context.commit('SETSTATEFOOD',data);},
    setStateData(context,data){context.commit('SETSTATEDATA',data);}
};
const getters = {
    getState(state){return state;}
}
export default new Vuex.Store({state,mutations,actions,getters});