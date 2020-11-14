# Express框架

## express是什么

> 1：Express.js 框架是目前最流行的node.js后端框架之一,  相当于jQuery和js之间的关系;
>
> 2：Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能;
>
> 3：功能类似的后端框架：Koa.js, egg.js, hapi.js

## 安装express

> 1：进入应用目录
>
> 2：npm init 命令为你的应用创建一个 package.json 文件
>
> 3：安装 Express 并将其保存到依赖列表中：npm install express --save
>
> 4：如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可

## Express 应用生成器

> 通过应用生成器工具 express 可以快速创建一个应用的骨架。
>
> 1. 安装：npm install express-generator -g
>
> 2. 常用操作：express -h（-h 选项可以列出所有可用的命令行选项） 安装所有依赖包（npm install）
>
> 3. 设置视图模板：express --view=ejs demo1
>
> 4. 启动应用：MacOS 或 Linux 平台（set DEBUG=myapp & npm start）
>
> 5. 在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了
>
> 6. 通过 Express 应用生成器创建的应用一般都有如下目录结构
>
>    ![](E:\Pictures\资料\express应用生成目录结构.jpg)