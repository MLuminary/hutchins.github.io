---
title: LeanJs「 ES6 」-- Symbol
date: 2018-02-05 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSSymbol/js.png)

<!--more-->

## 概述

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。如果有一种机制，保证每个属性的名字都是独一无二的，这样就从根本上防止了属性名的冲突，这就是 ES6 引入 `Symbol` 的原因

```js
let s = Symbol()

typeof s //'symbol'
```

声明不能加 `new` 命令，因为 `symbol` 生成的是原始数据类型，和字符串相似，每个 `symbol` 都是独一无二的。

```js
let s = Symbol('foo')

s//'Symbol(foo)'
```

`symbol` 可以接受一个参数，表示对当前 `symbol` 的描述，传入对象的话也会调用 `toString` 强制转换为字符串，传入的参数可以重复，仅仅是描述相同，但实际上两个 `symbol` 是不同的

```js
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

`symbol` 的值不能进行运算，可以转换为字符串和布尔值，但不能转换为数值

```js
let sym = Symbol();
sym.toString() // 'Symbol(My symbol)'
Boolean(sym) // true
Number(sym) // TypeError
```

## 作为属性名的 Symbol

`Symbol` 作为属性名时，不能用 `.` 运算符

```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

上面代码中，因为点运算符后面总是字符串，所以不会读取 `mySymbol` 作为标识名所指代的那个值，导致 `a` 的属性名实际上是一个字符串，而不是一个 `Symbol` 值。

用 `symbol` 定义方法的时候也同样

```js
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);

//alse
let obj = {
  [s](arg){
    ...
  }
}
```

## 属性名的遍历

Symbol 作为属性名，该属性不会出现在 `for..in`、`for..of` 循环中，也不会被 `Object.keys()`,`Object.getOwnPropertyNames()`,`JSON.stringify()` 返回，但是他不是私有属性，用 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 Symbol。

```js
const obj = {};

let foo = Symbol("foo");

Object.defineProperty(obj, foo, {
  value: "foobar",
});

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj)
// []

Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]
```

`Reflect.ownKeys` 可以返回所有类型的键名，包括常规键名和 Symbol 键名

```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

## Symbol.for()，Symbol.keyFor()

它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

`Symbol.for()` 与 `Symbol()` 这两种写法，都会生成新的 Symbol。它们的区别是，**前者会被登记在全局环境中供搜索，后者不会**。`Symbol.for()` 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 `key` 是否已经存在，如果不存在才会新建一个值。比如，如果你调用 `Symbol.for("cat")30` 次，每次都会返回同一个 Symbol 值，但是调用 `Symbol("cat")` 30 次，会返回 30 个不同的 Symbol 值。

```js
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```

上面代码中，由于 `Symbol()` 写法没有登记机制，所以每次调用都会返回一个不同的值。

`Symbol.keyFor` 方法返回一个已登记的 Symbol 类型值的 `key`。

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

上面代码中，变量 `s2` 属于未登记的 Symbol 值，所以返回 `undefined`。