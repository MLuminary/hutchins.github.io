---
title: LeanJs「 ES6 」-- Promise
date: 2018-02-10 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSIterator和forIn/js.png)

<!--more-->

## Iterator 的概念

JavaScript 原有的表示「集合」的数据结构，主要是数组 `Array` 和对象 `Object`，ES6 又添加了 `Map` 和 `Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是 `Map`，`Map` 的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供**统一**的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的遍历过程是这样的

1 创建一个指针对象，指向当前数据结构的起始位置。遍历器本质上就是一个指针对象

2 第一次调用指针对象的 `next` 方法，可以将指针指向数据结构的第一个成员

3 第二次调用指针对象的 `next`方法，指针就指向数据结构的第二个成员。

4 不断调用指针对象的 `next` 方法，直到它指向数据结构的结束位置。

每一次调用 `next` 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 `value` 和 `done` 两个属性的对象。其中，`value` 属性是当前成员的值，`done` 属性是一个布尔值，表示遍历是否结束。

下面我们模拟一下 Iterator 的遍历过程

```js
function makeIterator(array){
  var nextIndex = 0;
  return {
    next:function(){
      return nextIndex < array.length ? 
      {value:array[nextIndex++]} :
      {done:true}
    }
  }
}
```

## 默认 Iterator 接口

Iterator 接口是为所有数据结构提供一种统一的访问机制，即 `for...of` 循环。一个数据结构只要部署了 `Iterator` 接口，我们就称这种数据结构是「可遍历的」

默认的 Iterator 接口部署在数据结构的 `Symbol.iterator` 属性，它本身是一个函数，执行这个函数，就会返回一个遍历器。具备原生 Iterator 的数据无需处理就可以被 `for...of` 循环遍历.

原生具备 Iterator 接口的数据结构如下

- Array 
- Map
- Set
- String
- TypedArray
- arguments
- NodeList

数组的 `Symbol.iterator` 属性可以像下面这样使用

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

对于没有 Iterator 接口的数据结构，就需要自己在 `Symbol.iterator` 属性上面部署，这样才会被 `for...of` 循环遍历，其实主要针对的就是对象

```js
var a = {a:1,b:2,c:3}
for(var key of a){
	console.log(key);
}
// a is not iterable
```

因为 Iteartor 接口本质上是一个线性遍历，但是对象有时并不知道需要先遍历哪个。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 `Map` 结构使用，ES5 没有 `Map` 结构，而 ES6 原生提供了。

一个对象如果要具备可被 `for...of` 循环调用的 Iterator 接口，就必须在 `Symbol.iterator` 的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
```

上面代码是一个类部署 Iterator 接口的写法。`Symbol.iterator` 属性对应一个函数，执行后返回当前对象的遍历器对象。

对于类似数组的对象（存在数值键名和 `length` 属性），部署 Iterator 接口，有一个简便方法，就是 `Symbol.iterator` 方法直接引用数组的 Iterator 接口。

```js
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```

对于对象，也可以使用 `for...in` 遍历属性

```js
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard
```
