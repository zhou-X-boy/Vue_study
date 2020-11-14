module.exports = {
  //入口
  entry: {
    //可以有多个入口，也可以有一个，如果有一个就默认从这一个入口解析
    "main" : "./main.js"
  },
  output: {
    filename : './build.js/'
  },
  //声明模块 包含各个loader
  module: {
    loaders:[
      {
        //style-loader css-loader
      test:/\.css$/,
      loader: 'style-loader!css-loader'
      }
      
    ]
  },
  watch: true,//文件监视改动 自动产出build.js
}