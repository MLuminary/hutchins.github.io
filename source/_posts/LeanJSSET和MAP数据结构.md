---
title: LeanJs「 ES6 」-- SET 和 MAP 数据结构
date: 2018-02-06 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSSET和MAP数据结构/js.png)

<!--more-->

## Set

### 基本用法

ES6 提供了新的数据解构 Set，它类似与数组，但是成员值都是唯一的，没有重复值，因此也有一个数组去重的办法

```js
[...new Set(array)]
```

向 Set 添入值的时候，`5` 和 `'5'` 是两个不同的值，Set 内部判断两个值是否相等类似于 `===`，但是他会正确判断 `NaN`。另外，两个对象总是不想等的

```js
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

### Set 实例的属性和方法

Set 结构的属性

- `Set.prototype.constructor` 构造函数，默认就是 `Set` 函数 
- `Set.prototype.size` 返回 `Set` 实例的成员总数

Set 结构的方法，分为两大类，操作方法和遍历方法，下面是操作方法

- `add(value)` 添加某个值，返回 Set 结构本身
- `delete(value)` 删除某个值，返回布尔值，表示删除是否成功
- `has(value)` 返回一个布尔值，表示该值是否为 `Set` 的成员
- `clear()` 清除所有成员

Set 结构的遍历方法

- `keys()` 返回键名
- `values()` 返回键值
- `entries()` 返回键值对
- `forEach()` 使用回调函数遍历每个成员

因为 Set 结构没有键名，所以 `keys()` 和 `values()` 返回的都是键值

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

## WeakSet

### 含义

WeakSet 和 Set 结构类似，也是不重复的值的集合。但是 WeakSet 中的值必须是对象，而且都是弱引用，垃圾回收不考虑，因此适合临时存放一组对象。由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

### 语法

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

上面中，是数组 `a` 中的成员成为了 WeakSet 的成员，并不是 `a` 数组本身。这意味着，数组的成员只能是对象

```js
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

WeakSet 结构有以下三个方法

- `WeakSet.prototype.add(value)` 向 WeakSet 添加一个成员
- `WeakSet.prototype.delete(value)` 清除 WeakSet 的指定成员
- `WeakSet.prototype.has(value)` 返回一个布尔值，表示这个值是否在 WeakSet 中 

WeakSet 不能遍历也没有 `size` 和 `forEach` 属性

## Map

### 含义和基本用法

其结构的键名不止局限与字符串，各种类型的值都可以当作键名

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

上面中用 `set` 方法将对象 `o` 当作 `m` 的一个键，然后又用 `get` 方法读取这个键。

如果对同一个键多次赋值，后面的值将覆盖前面的值。

```js
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"
```

上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

上面代码的 `set` 和 `get` 方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此 `get` 方法无法读取该键，返回 `undefined`。Map 的键是根据其内存地址判断是否为相同的值

### 实例的属性和操作方法

#### size 属性

`size` 属性返回 Map 结构的成员总数。

```js
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
```

#### set(key,value)

`set` 方法设置键名 `key` 对应的键值为 `value`，然后返回整个 Map 结构。如果 `key` 已经有值，则键值会被更新，否则就新生成该键。

```js
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
```

`set` 方法返回的是当前的 Map 对象，因此可以采用链式写法。

```js
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

#### get(key)

`get` 方法读取 `key` 对应的键值，如果找不到 `key`，返回 `undefined`。

```js
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!
```

#### has(key)

`has` 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```js
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

#### delete(key)

`delete` 方法删除某个键，返回 `true`。如果删除失败，返回 `false`。

```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```
#### clear()

`clear` 方法清除所有成员，没有返回值。

```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### 遍历方法

- `keys()` ：返回键名的遍历器。
- `values()` ：返回键值的遍历器。
- `entries()` ：返回所有成员的遍历器。
- `forEach()` ：遍历 Map 的所有成员。

## WeakMap

### 含义

`WeakMap` 和 `Map` 的结构类似，也是用于生成键值对的集合

`WeakMap` 只接受对象作为键名.

```js
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

上面代码中，`e1` 和 `e2` 是两个对象，我们通过 `arr` 数组对这两个对象添加一些文字说明。这就形成了 `arr` 对 `e1` 和 `e2` 的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放 `e1` 和 `e2` 占用的内存。

```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

### WeakMap 语法

`WeakMap` 和 `WeakSet` 相似，没有遍历操作，也没有 `size` 属性，也无法用 `clear` 清空

