---
title: Node学习笔记一
date: 2017-11-25 23:16:00
tags: 
  - node
  - js
category: node
---
## node概述

>一个搭建在Chrome JavaScript运行时上的平台，用于构建高速、可伸缩的网络程序。Node.js采用的事件驱动、非阻塞I/O模型,使它既轻量又高效，并成为构建运行在分布式设备上的数据密集型实时程序的完美选择。

我通俗的理解就是在服务器上用chrome v8运行的js。完全支持ES6新特性

## Node.js的运行模式

### 交互模式

REPL:Read Evaluate Print Loop,输入一行代码执行一行。在命令行中输入``node``,然后编写代码回车执行。自带输出功能，不必写``console.log``(就相当于chrome的开发者工具)

### 脚本模式

把要执行的所有语句编写的一个文本文件中（后缀名任意，没有都行）

```js
node 完整路径名 回车
```

<!--more-->

## 模块

一个Web项目功能可以分为很多不同的“模块”，如商店管理模块、用户管理“模块”...

Node.js按照功能的不同，可以把函数、对象分处到不同的文件、目录下，这些文件/目录在Node.js中就称为"Module"

Node.js中每个模块都是一个独立的对象，解释器会为每个.js文件添加如下代码

```js
(function(exports,require,module,__filename,__dirname)){
//exports:{}用于声明向外部导出的自己的成员
//require:fn 用于导入其它模块，创建指定模块对象
//module: 用于指代当前模块
//__filename: 返回当前模块的文件全名
//__dirname: 返回当前模块所在目录
//自己编写的内容
})
```

每一个模块都可以使用自己的require()函数引入另一个模块；底层本质就是创建了指定模块的一个对象实例

```js
var obj = require('./模块文件名')
```

每个模块可以使用exports对象向外导出/公开一些自己内部的成员供其它模块使用。

```js
exports.成员名=成员值
```

### exports && module.exports

二者都可以用于向外界导出自己内部的成员

module变量指代当前模块对象，真正导出的是该对象

```js
//底层
exports = module.exports
//最终导出的就是module
```

所以``exports.age``等价于``module.exports.age``,但是``exports={..}``与``module.exports={..}``是不等价的.
因为``exports={..}``相当于将``exports``又指代了一个新的对象，至于为什么对象会出现这种差别，请看我以前写的一篇文章，[谈谈值传递](http://hutchins.cn/2017/07/25/%E8%B0%88%E8%B0%88%E5%80%BC%E4%BC%A0%E9%80%).因为真正导出的对象是module，所以就会造成导不出内容的现象.用``module.exports={..}``便可以正常导出

所以：若只是给``exports``对象添加新的成员，则等价于给``module.exports``添加新成员；但是若修改了``exports``的指向，则不会产生实质作用

### 模块的分类

Node.js中没有全局命名空间的概念，每个被``require``加载的JS文件或者目录都是一个模块，JS文件中定义的变量和函数都是模块内部的对象，只有通过``module.exports``导出的成员才能被其它模块使用；所以不会出现一个模块中定义的成员与其它模块中的成员命名冲突的问题。

#### Node.js官方提供的模块

Node有一些被编译到二进制文件里的模块，被成为核心模块，它们不能通过路径来引用，只能用模块名。核心模块拥有最高的加载优先级，即使已经有了一个同名的第三方模块，核心模块也会被优先加载。比如，如果想加载http核心模块：

```js
var http = require('http');
```

#### 第三方编写的模块

如果``require``函数的参数不是相对路径，也不是核心模块名，Node会在当前目录的``node_modules``子目录下查找，比如下面的代码,Node会查找  ``node_modules/myModule.js``;

```js
var myModule =require('myModule.js');
```

如果没找到，Node会继续在上级目录的``node_modules``文件夹下查找，直到找到对应的模块或者到达根目录。

#### 用户自定义模块

使用绝对路径从文件系统里加载模块

```js
var myModule1 = require('d:/my_modules/module1');
```

基于当前文件的相对路径

```js
var myModule2 = require('../my_modules/my_module2');
var myModule3 = require('./lib/my_module3')
```

使用目录

```js
var  myModule = require('./myModuleDir');
```

Node会假定这个目录是模块包，并尝试在这个目录下搜索包定义文件package.json。如果没找到，Node会假设包的入口点是index.js文件。以上面为例，Node会尝试查找./myModuleDir/index.js文件。如果找到了package.json文件，Node会尝试解析它,并查找包定义里的main属性，然后把main属性的值当作入口点的相对路径。
















