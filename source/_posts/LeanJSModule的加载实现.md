---
title: LeanJs「 ES6 」-- Module 的加载实现
date: 2018-02-17 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSModule的加载实现/js.png)

<!--more-->

## 浏览器加载

### 传统方法

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

默认情况下，浏览器是同步加载 JavaScript 脚本，当碰到脚本体积过大，就会造成浏览器堵塞。

当然，浏览器允许脚本异步加载

```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

`<script>` 标签打开 `defer` 或 `async` 属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer` 是「渲染完再执行」，`async` 是「下载完就执行」

### 加载规则

浏览器加载 ES6 模块，也使用 `<script>` 标签，但是要加入 `type="module"` 属性

```js
<script type="module" src="./foo.js"></script>
```

浏览器对于有 `type="module"` 的 `<script>` 都会异步加载，相当于添加了 `defer` 属性

对于外部的模块脚本，有几点需要注意。

- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有声明 `use strict`。
- 模块之中，可以使用 `import` 命令加载其他模块（`.js`后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 `export` 命令输出对外接口。
- 模块之中，顶层的 `this` 关键字返回 `undefined`，而不是指向 `window`。也就是说，在模块顶层使用 `this` 关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次。

## ES6 模块与 CommonJs 模块的差异

**CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**。

**CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。**

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件 `lib.js` 的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量 `counter` 和改写这个变量的内部方法 `incCounter`。然后，在 `main.js`  里面加载这个模块。

```js
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，`lib.js` 模块加载以后，它的内部变化就影响不到输出的 `mod.counter` 了。这是因为 `mod.counter` 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

ES6 模块运行机制与 CommomJs 不一样.ES6 的模块是动态引用，并且不会缓存

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

## Node 加载

### 概述

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前解决方案是将两者分开

Node 要求 ES6 模块采用 `.mjs` 后缀文件名。也就是说，只要脚本文件里面使用 `import` 或者 `export` 命令，那么就必须采用 `.mjs` 后缀名。`require` 命令不能加载 `.mjs` 文件，会报错，只有 `import` 命令才可以加载 `.mjs` 文件。反过来，`.mjs` 文件里面也不能使用 `require` 命令，必须使用 `import`。

目前，这项功能还在试验阶段。安装 `Node v8.5.0` 或以上版本，要用 `--experimental-modules` 参数才能打开该功能。

```shell
$ node --experimental-modules my-app.mjs 
```

如果模块名不含路径，那么 `import` 命令会去 `node_modules` 目录寻找这个模块。

```js
import 'baz';
import 'abc/123';
```

如果模块名包含路径，那么 `import` 命令会按照路径去寻找这个名字的脚本文件。

```js
import 'file:///etc/config/app.json';
import './foo';
import './foo?search';
import '../bar';
import '/baz';
```

如果脚本文件省略了后缀名，比如 `import './foo'`，Node 会依次尝试四个后缀名：`./foo.mjs`、`./foo.js`、`./foo.json`、`./foo.node`。如果这些脚本文件都不存在，Node 就会去加载 `./foo/package.json` 的 `main` 字段指定的脚本。如果 `./foo/package.json` 不存在或者没有 `main` 字段，那么就会依次加载 `./foo/index.mjs`、`./foo/index.js`、`./foo/index.json` 、 `./foo/index.node` 。如果以上四个文件还是都不存在，就会抛出错误。


最后，Node 的 `import` 命令是异步加载，这一点与浏览器的处理方法相同。

### ES6 模块加载 CommonJS 模块

CommonJS 模块的输出都定义在 `module.exports` 这个属性上面。Node 的 `import` 命令加载 CommonJS 模块，Node 会自动将 `module.exports` 属性，当作模块的默认输出，即等同于 `export default xxx`。

```js
// a.js
module.exports = {
  foo: 'hello',
  bar: 'world'
};

// 等同于
export default {
  foo: 'hello',
  bar: 'world'
};
```

所以，一共有三种写法，可以拿到 CommonJS 模块的 `module.exports`。

```js
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';
// baz = {
//   get default() {return module.exports;},
//   get foo() {return this.default.foo}.bind(baz),
//   get bar() {return this.default.bar}.bind(baz)
```

## CommonJS 模块加载 ES6 模块

CommonJS 模块加载 ES6 模块，不能使用 `require` 命令，而要使用 `import()` 函数。ES6 模块的所有输出接口，会成为输入对象的属性。

```js
// es.mjs
let foo = { bar: 'my-default' };
export default foo;
foo = null;

// cjs.js
const es_namespace = await import('./es');
// es_namespace = {
//   get default() {
//     ...
//   }
// }
console.log(es_namespace.default);
// { bar:'my-default' }
```

上面代码中，`default` 接口变成了 `es_namespace.default` 属性。另外，由于存在缓存机制，`es.mjs` 对 `foo` 的重新赋值没有在模块外部反映出来。

## 循环加载

「循环加载」指的是，`a` 脚本的执行依赖 `b` 脚本，而 `b` 脚本的执行又依赖 `a` 脚本

### CommonJS 模块的加载原理

CommonJS 的一个模块，就是一个脚本文件。`require` 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

上面代码就是 Node 内部加载模块后生成的一个对象。该对象的 `id` 属性是模块名，`exports` 属性是模块输出的各个接口，`loaded` 属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。

以后需要用到这个模块的时候，就会到 `exports` 属性上面取值。即使再次执行 `require` 命令，也不会再次执行该模块，而是到缓存之中取值

### CommonJS 模块的循环加载

```js
//a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

`a.js` 输出一个 `done` 变量，然后加载另一个脚本文件 `b.js`，此时 `a.js` 代码就停在了这里，要等待 `b.js` 执行完毕后才能继续执行

```js
//b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

`b.js` 如上所示，执行到第二行就会去加载 `a.js`，但此时 `a.js` 并没有执行完毕，只会返回已经执行的部分，相当于就运行了 `exports.done = false`，然后 `b.js` 接着往下执行，等到 `b.js` 执行完毕，再执行 `a.js` ，我们可以用 `main.js` 来验证这个过程

```js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

运行结果如下

```shell
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

## ES6 模块的循环加载

ES6 模块是动态引用，因此和 CommonJS 有很大的不同

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
```

执行 `a.mjs` 运行结果如下

```shell
$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined
```

运行 `a.mjs` ，当执行到第一行代码的时候，发现引入了 `b.mjs`，引擎会先去执行 `b.mjs` 在回去执行 `a.mjs` ，当执行 `b.mjs` 时，发现导入了 `a.mjs` ，此时引擎会当作 `a.mjs` 已经被导入了。当执行到第三行时，发现 `foo` 根本没有定义，就报出错误。解决这个问题的方法，就是让 `b.mjs` 运行的时候，`foo` 已经有定义了

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```

因为函数有提升的特点，因此在 `import` 执行前，`foo` 就已经被定义了。

## 转码

因为 ES6 模块现在浏览器还不支持，因此需要将其转为 ES5 的写法，可以使用 [babel](http://babeljs.io/)、 [ES6 module transpiler](https://github.com/esnext/es6-module-transpiler)、[Systemjs](https://github.com/systemjs/systemjs) 等转码工具
