/**
 * 通过commit异步触发mutations.js文件中的方法，
 */
import {} from './mutation-types'

export default {
  /**
   * async 方法名({commit},params,callback) {
   * //params：向服务器传递的参数，存在就写，不存在就不写
   * //callback：回调函数
   *    //result 从服务端请求到的数据
   *   let result = await 请求数据的方法名(params);
   *   //将请求到的数据发送给mutations文件中
   *   commit(常量名,{变量名（一般跟state中的数据名相同命名): result});  //将请求到的数据赋值给一个变量
   *   //执行回调函数
   *   params.callback && params.callback();
   * }
   */

  /**
   * 在页面所在文件，比如App.vue中调用这里面的方法就可以进行对数据层的操作（引用，修改，更新）
   * 如：
   * //引入相应的模块
   * import {mapState} from 'vuex'
   * //在export default{} 中写入
   * mounted() {
   *  this.$store.dispatch('actions.js文件中定义的方法名',
   *    {
   *    //需要向服务端传递的params参数
   *    page = this.page,
   *    count = this.count,
   *    //回调函数
   *    callback:(=> {
   *
   *      }
   *    });
   * },
   * computed: {
   *    //获取state.js文件中的数据
   *    ...mapState(['数据名'])
   * }
   *
   */
}