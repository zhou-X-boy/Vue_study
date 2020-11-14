//打包方法一：在当前文件的控制台运行webpack ./main.js -o build.js

//打包方法二：在package.json文件中将script中的内容
// "test": "echo \"Error: no test specified\" && exit 1",修改为
//"build": "webpack ./main.js -o ./build.js"
//在控制台运行npm run build

//es6Module的莫库斯导入
import Vue from '../node_modules/vue/dist/vue.js';
import App from './App.js';
import {num1,num2,add} from './App.js'
import './main.css'


console.log(num1);
console.log(num2);
add(3,5);

new Vue({
  el: '#app',
  components: {
    App
  },
  template: `
    <App></App>
  `
});