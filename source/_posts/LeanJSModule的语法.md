---
title: LeanJs「 ES6 」-- Module 的语法
date: 2018-02-16 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSModule的语法/js.png)

<!--more-->

## 概述

ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，再通过 `import` 命令输入。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 `fs` 模块加载 3 个方法，其他方法不加载。这种加载称为 「编译时加载」或者 「静态加载」，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

## 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 `"use strict"`;。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 `with` 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 `0` 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 `delete prop`，会报错，只能删除属性 `delete global[prop]`
- `eval` 不会在它的外层作用域引入变量
- `eval` 和 `arguments` 不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用 `arguments.callee`
- 不能使用 `arguments.caller`
- 禁止 `this` 指向全局对象
- 不能使用 `fn.caller` 和 `fn.arguments`  获取函数调用的堆栈
- 增加了保留字（比如 `protected`、`static` 和 `interface`）

## export 命令

模块功能主要有两个命令构成： `export` 和 `import` 。 `export` 命令用于规定模块的对外接口，`import` 用于输入其它模块提供的功能

一个模块就是一个独立的文件，该文件内部的所有变量， 外部无法获取。如果需要让外部获取到的话，就需要使用 `export`

为了配合下面的 `import` 命令，下面这段代码就当写在 `profile.js` 中

```js
//方法一
export var Name = 'Hutchins';
export var age = '21';
export var sex = '1';

//方法二
var Name = 'Hutchins';
var age = '21';
var sex = '1';

export {Name,age,sex};
```

以上两种方法都可以导出模块内部的变量，优先推荐使用第二种方法，因为一眼可以看出导出的变量内容

`export` 还可以导出函数

```js
//方法一
export function multiply(x, y) {
  return x * y;
};

//方法二
function multiply(x, y) {
  return x * y;
};

export {multiply}
```

同样也有以上两种导出函数的方法

如果想改名字的话也可以用 `as` 关键字重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

上面代码使用 `as` 关键字，重命名了函数 `v1` 和 `v2` 的对外接口。重命名后，`v2` 可以用不同的名字输出两次。

需要特别注意，`export` 命令规定的是对外的接口，必须与模块内部的变量建立一一对应的关系

```js
// 报错
export 1;

// 报错
var m = 1;
export m;
```

以上两种方法都没有提供对外的接口，都是错误的

```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

同样的，`function` 和 `class` 的输出，也必须遵守这样的写法。

```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

## import 命令

`import` 命令用于加载模块

```js
// main.js
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

上面代码的 `import` 命令，用于加载 `profile.js` 文件，并从中输入变量。`import` 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块 `profile.js` 对外接口的名称相同。

如果想要将载入的模块的变量重命名，可以使用 `as` 关键字

```js
import {lastName as surname} from './profile.js'
```

`import` 导入的变量都是只读的，不允许在加载模块脚本里面改写接口，但是如果导入的是一个对象，为其赋值是可以的，但是建议**将导入的变量完全当作只读，因为如果别的模块改写的话出错很难查错**

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

由于 `import` 是静态执行，所以不能使用表达式

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

`import` 有提升效果，所以推荐写在前面

## 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号 `*` 指定一个对象，所有输出值都加载在这个对象上面。

```js
//circle.js
function area(radius) {
  return Math.PI * radius * radius;
}

function circumference(radius) {
  return 2 * Math.PI * radius;
}

export { area, circumference }
```

加载模块

```js
import {area, circumference} from './circle'

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面是逐一加载，整体加载的写法如下

```js
import * as circle from './circle'

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象，应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

## export default

导出变量和函数导入时不需要知道它的名字

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

其它模块加载该模块时，`import` 可以为该匿名函数指定任意名字

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

而且对应的 `import` 语句不需要使用大括号。也可以加载有名字的函数，但是也会视为匿名函数

其实 `export default` 命令其实只是输出一个叫做 `default` 的变量，所以他后面不能跟变量声明语句

```js
// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
``` 

上面代码中，`export default a` 的含义是将变量 `a` 的值赋给变量 `default`，因此后面直接跟一个值也是可以的

## export 与 import 的复合写法

如果在一个模块中，先输入一个模块再将其输出，可以写在一行

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar }; 
```

在这里要注意的是，写成一行的话只是相当于转发， `foo` 和 `bar` 实际上根本没有导入当前的模块

可以利用这种写法将其更名，或者改为默认接口

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口
export { default } from 'foo';
```

## 跨模块常量

设置常量能被多个模块共享

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

如果要使用的常量非常多，可以建一个专门的 `constants` 目录，将各种常量写在不同的文件里面，保存在该目录下。

## import()

因为 `export` 和 `import` 都是静态加载，这就导致无法在运行时加载模块

```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

不能像 `node` 的 `require` 那样运行时加载模块

```js
const path = './' + fileName;
const myModual = require(path);
```

上面到底加载哪个模块，要运行时才知道，因此有一个提案，用 `import()` 实现动态加载

```js
const path = './' + fileName;
const myModual = import(path);
``` 

`import` 类似于 `require` ，区别是前者是异步加载，后者是同步加载
