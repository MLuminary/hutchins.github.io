---
title: Node学习笔记二
date: 2017-11-29 17:03:32
tags: 
  - node
  - js
category: node
---
## 自定义模块的两种形式 

### 文件模块

``require('文件目录')``

### 目录模块                    

方式一：创建一个目录，假设名为m1，其中创建名为index.js的文件。其它在当前目录的模块可以``require('./m1')``调用此目录中index模块

方式二：创建一个目录，假设名为m2，其中创建名为2.js的文件，若想``require('./m2')``来调用2.js模块，需要新建一个package.json文件，其中声明main属性指定默认执行的启动js文件，那其实第一个也是因为默认设置了``main:'index.js'``

方式三（常用）:创建一个目录，目录名为node_modules，再创建目录模块，假设命名m3，其中要创建package.json文件，其中声明main属性指定默认执行的启动js文件，就可以用``require('./m3')``来调用此模块

当目录中既有可调用的文件夹m4又有m4.js时，用``require('./m4')``调用的是m4.js模块

<!--more-->
### require('X')的搜索顺序

既然知道上述所说的目录模块和文件模块的导入，那假若有个文件名为m5.js，还有个目录m5/index.js，还有个node_modules/m5/index.js，最后在app.js中``require('./m7')``引入的是哪个模块呢？。

``require('X')``的搜索顺序如下，加载到了相应的文件后就会停止，不会再继续查找还有没有除此之外相对应的文件。

#### 首先,如果X是核心模块

加载并返回核心模块

#### 然后，如果X以'./'||'/'||'../'开始

##### 先当作文件

LOAD_FILE()

##### 当作目录

LOAD_DIR()

#### 其次，在node_modules中寻找文件

首先在当前目录中查找``node_modules``文件夹,如果找到，就在其中依次执行``LOAD_FILE``和``LOAD_DIR``。如果没找到，就继续向根目录中查找``node_modules``文件夹然后再执行相同的操作，直到找到对应的文件或者已经到达了根目录。

#### 最后，抛出异常"not found"


#### function LOAD_FILE

1. 如果X是个文件，把X作为js脚本加载
2. 如果X.js是个文件，把X作为js脚本加载
3. 如果X.node是个文件，把X.node作为Node二进制插件加载



#### function LOAD_DIR

如果X/package.json文件存在

1. 解析package.json，查找"main".
2. 寻找并加载(X+main中值)的文件

如果X/package.json文件不存在

1. 如果X/index.js文件存在,把X/index.js作为js脚本加载
2. 如果X/index.node文件存在,把X/index.node最为Node二进制插件加载

## NPM

Node Package Manager:Node.js的第三方模块/包管理器，可用于下载、更新、删除、维护包依赖关系的工具。
npm工具默认到www.npmjs.org网站下载所需的第三方模块包。
使用NPM工具下载一个新的软件包:
``npm install 包名``
``npm uninstall 包名（卸载 ）``


## Node官方提供的原生模块

列举几个常用的主要的API和主要的方法

### querystring

querystring模块用于处理HTTP请求URL中的查询字符串

```js
var qs = require('querystring');
var obj = qs.parse(str) //把查询字符串解析为JS对象
var str = qs.stringify(obj) //把JS对象转换为查询字符串
```

### url

url模块用于解析一个HTTP请求地址，获取其中各个不同的部分
```js
var obj = url.parse(str) //把URL字符串解析为一个对象
var obj = url.parse(str,true) //把URL字符串解析为一个对象，把其中的查询字符串也解析为对象
```

#### 举个栗子

```js
const url = require('url');

var str = "https://hutchins:123456@www.jd.com:80/index/ad?name=hutchins&age=21";
var result = url.parse(str,true);
console.dir(result);
/*Url {
  protocol: 'https:',
  slashes: true,
  auth: 'hutchins:123456',
  host: 'www.jd.com:80',
  port: '80',
  hostname: 'www.jd.com',
  hash: null,
  search: '?name=hutchins&age=21',
  query: { name: 'hutchins', age: '21' },
  pathname: '/index/ad',
  path: '/index/ad?name=hutchins&age=21',
  href: 'https://hutchins:123456@www.jd.com:80/index/ad?name=hutchins&age=21' }*/
```


### Buffer

缓冲区，本质是一块内存区域，用于暂存以后要用到的数据，该区域就成为“缓存”
Buffer在node中是一个全局变量，不需要``require``引用

```js
//分配一个指定大小的缓冲区
var buf1 = Buffer.alloc(1024);
//使用一个数字数组创建一个缓冲区
var buf2 = Buffer.from([1,3,5]);
//使用一个字符串创建一个缓冲区
var buf3 = Buffer.from('abcdef');
//把一个缓冲区中的数据转换成一个字符串
var str = buf3.toString();
```

### fs

fs模块提供了对文件系统中的文件/目录进行增删改查、读写的功能。
```js
//同步读取文件中的内容
var data=fs.readFileSync(file);
//同步向文件写出内容
fs.writeFileSync(file,anotherfile);
//同步向文件追加内容
fs.appendFileSync(file,anotherfile);
//异步读取文件内容
fs.readFile(file,function(err,data){
  //读取操作结束后
});
fs.writeFile(file,another,function(err){
  //写操作结束后
})
```

### http
HTTP模块可用于编写基于HTTP协议的客户端程序（即浏览器）;也可以编写基于HTTP协议的服务器端程序（即Web服务器）
用http模块编写一个Web服务器
1. 接受客户端的HTTP请求
2. 解析客户端的请求消息
3. 读取客户端请求的文件
4. 向客户端发送HTTP响应消息,主体就是客户端请求的文件

```js
//创建web服务器
var server = http.createServer();
//监听端口
server.listen(80);
server.on('request',function(req,res){
  //解析请求消息
  //向客户端写出相应请求
})
```




 
