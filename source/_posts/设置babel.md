---
title: 设置 babel
date: 2018-02-18 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

> 配置 babel 来兼容 es6

<!--more-->

### 配置 .babelrc

Babel 的配置文件是 `.babelrc` ，存放在根目录下。使用 babel 必须要配置此文件

该文件用来设置转码规则和插件

```js
{
  "presets":[],
  "plugins":[]
}
```

`presets` 为编码规则 ，官方推荐

```shell
$ npm install --save-dev babel-preset-env
```

在没有任何配置选项的情况下，`babel-preset-env` 与 `babel-preset-latest`（或者 `babel-preset-es2015`，`babel-preset-es2016` 和 `babel-preset-es2017` 一起）的行为完全相同。

然后将 `babel-preset-env` 加入规则

```js
{
  "presets":["env"]
}
```

### babel-cli

安装命令如下

```shell
$ npm install --save-dev babel-cli
```

常用命令

```shell
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

方面使用的话可以改写 `package.json` 的文件

```js
{
  //...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  }
}
```

运行一下代码

```shell
$ npm run build
```

即可将 `src` 目录下的文件转换，生成于 `lib` 目录中的同名文件

### babel-node

`babel-cli` 提供一个 `babel-node` 命令，提供一个支持 ES6 的 REPL 环境。

> REPL(Read-eval-print-loop)：交互式解析器，在REPL环境下，可以定义和运行变量、函数、对象。进入 node 即进入REPL

执行 `babel-node` 即进入环境，执行 `babel-node ES6.js` 可以直接运行 `ES6.js` 这个 ES6 脚本

### babel-register

`babel-register` 模块改写 `require` 命令，为它加上一个钩子。此后，每当使用 `require` 加载 `.js`、`.jsx`、`.es` 和 `.es6` 后缀名的文件，就会先用 Babel 进行转码。

```shell
$ npm install --save-dev babel-register
```

使用时必须先加载 `babel-register`

```js
require("babel-register");
require("./index.js");
```

由于它是实时转码，所以只适合在开发环境使用。

### babel-core

如果某些代码需要调用 Babel 的 API 进行转码，就要使用 `babel-core` 模块。

```shell
$ npm install babel-core --save
```

具体调用有官方文档的介绍 http://babeljs.io/docs/usage/api/

**举个栗子**

```js
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

### babel-polyfill

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了 `Array.from` 方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用 `babel-polyfill` ，为当前环境提供一个垫片。

```shell
$ npm install --save babel-polyfill
```

然后，在脚本头部，加入如下一行代码。

```js
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

Babel默认不转码的API非常多，详细清单可以查看 `babel-plugin-transform-runtime` 模块的definitions.js文件。

### 在线转换

https://babeljs.io/repl/