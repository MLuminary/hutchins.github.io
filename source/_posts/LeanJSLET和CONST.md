---
title: LeanJs「 ES6 」-- Let 和 Const 命令
date: 2018-01-28 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---
![Js](LeanJSLET和CONST/js.png)

<!--more-->

## Let 命令

### 基本用法

`let` 所声明的变量只在 `let` 命令所在的代码块内有效

```js
{
  var a = 10;
  let b = 10;
}

a // 10
b // Uncaught ReferenceError: b is not defined
```

对于我们以前碰到的循环中很经典的问题，就可以用 `let` 来解决

```js
var a = [];
for(var i = 0 ; i < 5 ; i++){
  a[i] = function(){
    console.log(i);
  }
}

a[1]()//5
```

上面这种情况用 `var` 声明 `i`，它在全局作用内都有效，最后调用 `a[1]()` 时，循环早已结束，输出的是全局作用域中的 `i`

```js
var a = [];
for(let i = 0 ; i < 5 ; i++){
  a[i] = function(){
    console.log(i);
  }
}

a[1]()//1
```

因为 `let` 声明的变量仅在当前块级作用域中有效，当前的 `i` 只在本轮循环中有效，所以每次循环的 `i` 其实都相当于一个新的变量。

用 `babel` 转换成 ES5 语法其实是下面这个样子

```js
"use strict";

var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 5; i++) {
  _loop(i);
}
```

`for` 循环设置循环变量的那部分是一个父级作用域，而循环体内部是一个单独的子作用域

### 不存在变量提升

`let` 命令它所声明的变量一定要在声明后使用，否则报错。

```js
console.log(varName);//undefined
var varName = 'h';

console.log(letName);//letName is not defined
let letName = 'p';
```

### 暂时性死区

只要块级作用域存在 `let` 命令，它所声明的变量就「绑定」这个区域，不再受外部的影响

ES6 明确规定，如果区块内部存在 `let` 和 `const` 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

在代码块内，从开始到用 `let` 声明变量之前，改变量都是不可用的，在语法上被称为 「暂时性死区」(temporal dead zone，简称 TDZ)

```js
{
  //TDZ开始
  tmp = "abc"; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp;//TDZ结束
  console.log(tmp); //undefined

  tmp = 123;
  console.log(tmp);//123

}
```

有些死区比较隐蔽

```js
function bar(x = y,y = 2){
  return [x,y];
}

bar();//y is not defined
```

参数 `x` 默认等于 `y` ，而此时 `y` 还没有声明

```js
let x = x;
```

使用 `let` 声明变量时，只要变量在还没有声明完成前使用，就会报错。上面 `x` 还没有声明完成就取 `x` 的值，就会报错

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 不允许重复声明

`let` 不允许在**相同作用域**内，重复声明一个变量

```js
function(){
  let a = 1;
  var a = 10;//报错
}

function(){
  let a = 1;
  let a = 10;//报错
}

function(a){
  let a; //报错
}

function(a){
  {
    let a ;//不报错
  }
}
```

## 块级作用域

ES5 中只有「全局作用域」和「函数作用域」，没有「块级作用域」，这带来很多不便

首先就是众所周知的 `for` 循环的问题

```js
for(var i = 0;i < 10 ;i++){
  ...
}

i //10
```

用来计数的 `i` 泄漏为全局变量

内存变量覆盖外层变量

```js
var tem = 'hello';

function f(){
  console.log(tem);
  if(false){
    var tem = 'world'
  }
}

f()//undefined
```

`if` 代码块中的 `tem` 因为变量提升其实是下面的代码

```js
function f(){
  var tem;
  console.log(tem);
  if(false){
    tem = 'world'
  }
}
```

ES6 块级作用域也代替了立即执行函数（IIFE）

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

## const 命令

`const` 声明一个只读的常量。一旦声明，常量的值就不能改变，这意味着 `const` 必须声明时就赋值。

```js
const foo;//Missing initializer in const declaration
```

但其实 `const` 保证的不是变量的值不能改动，而是变量指向的那个内存地址不得变动，对于简单类型的数据，就是值不能改动，但是对于复杂类型来说就是地址了

```js
const foo = {};
foo.add = 123;
foo.add //123

foo = {}//Assignment to constant variable
```

`const` 的作用域以及其它特点都和 `let` 相同，上面只是比 `let` 多出来的特点

## 顶层对象

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是global对象。ES5 之中，「顶层对象」的属性与「全局变量」是等价的。 

顶层对象和全局变量挂钩，会造成很多问题，首先就是无法在编译时就报出未声明的错误；其次，程序员很容易就创建了全局变量。

ES6 为了改变这一点，又为了保持兼容性，规定 `var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
window.a //1

let b = 2;
window.b //undefined
```

