import imgSrc from './my.jpg';
var app = {
    data() {
        return {
            imgSrc: imgSrc
        };
    },
    template: `
    <div>
      <img :src='imgSrc'>
    </div>
  `
};
//声明并导出
export var num1 = 5; //做为一整个对象key导出
//声明再导出
var num2 = 10;
export { num2 }

export function add(x, y) {
    return console.log(x + y);
}

//抛出对象
export default app;