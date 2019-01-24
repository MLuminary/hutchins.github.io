---
title: LeanJs「 ES6 」-- 数组的扩展
date: 2018-02-03 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJS数组的扩展/js.png)

<!--more-->

## 扩展的运算符

### 含义

扩展运算符(spread)是三个点 `...`。它好比 rest 参数的逆运算。将一个数组转为用逗号分割的参数列表

```js
console.log(...[1, 2, 3])
```

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```js
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

函数定义时参数中的 `...values` 为 rest 参数，函数调用时参数中的 `...values` 为扩展运算符，即将数组 `values` 分割开

### 替代函数 apply 的方法

由于扩展运算符可以展开数组，所以不再需要 `apply` 方法，将数组转为函数的参数了。

```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

下面是扩展运算符取代 `apply` 方法的一个实际的例子，应用 `Math.max` 方法，简化求出一个数组最大元素的写法。

```js
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```

另一个例子是通过 `push` 函数，将一个数组添加到另一个数组的尾部。

```js
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

上面代码的 ES5 写法中，`push` 方法的参数不能是数组，所以只好通过 `apply` 方法变通使用 `push` 方法。有了扩展运算符，就可以直接将数组传入 `push` 方法。

### 扩展运算符的应用

#### 复制数组

数组是复合类型，直接复制只是复制了指向底层数据解构的指针。ES5 使用 `concat()` 来克隆数组，ES6 中用扩展运算符更容易实现

```js
//ES5
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

//ES6
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

以上写法 `a2` 都是 `a1` 的克隆数组

#### 合并数组

扩展运算符提供了数组合并的新写法。

```js
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]
```

#### 与解构赋值结合

扩展运算符可以与解构赋值结合起来

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```js
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

#### 字符串

扩展运算符还可以将字符串转为真正的数组。

```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

```js
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```

#### 实现了 Iterator 接口的对象

任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

```js
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```

## Array.from

`Array.from` 方法用于将两类对象转为真正的数组：类数组的对象和可遍历的对象

```js
et arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的 `arguments` 对象。`Array.from` 都可以将它们转为真正的数组。

```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

只要部署了 Iterator 接口的数据结构， `Array.from` 都能将其转为数组

`Array.from` 还可以接受第二个参数，作用类似于数组的 `map` 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

## Array.of()

`Array.of` 方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

这个方法的主要目的，是弥补数组构造函数 `Array()` 的不足。因为参数个数的不同，会导致 `Array()` 的行为有差异。

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

上面代码中，`Array` 方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，`Array()` 才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

## 数组实例的 copyWithin()

数组实例的 `copyWithin` 方法，在当前数组内部，将指定位置的成员复制到其他位置，然后返回当前数组。使用这个方法，会修改当前数组

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

- `target`（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- `start`（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- `end`（可选）：到该位置**前**停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

## 数组实例的 find() 和 findIndex() 

数组实例的 `find` 方法，用于找出第一个符合条件的数组成员

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

数组实例的 `findIndex` 方法，用于找出第一个符合条件的数组成员的下标

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 2
```

## 数组实例的 fill()

fill方法使用给定值，填充一个数组。

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

上面代码表明，`fill` 方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

`fill` 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

上面代码表示，`fill` 方法从 1 号位开始，向原数组填充 7，到 2 号位之**前**结束。

## 数组实例的 entries()，keys()和values()

ES6 提供三个新的方法——`entries()`，`keys()` 和 `values()` ——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## 数组实例的 includes()

`Array.prototype.includes` 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 `includes` 方法类似。ES2016 引入了该方法。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为 `0`。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为 `-4`，但数组长度为 `3`），则会重置为从 `0` 开始。

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

## 数组的空位

数组的空位指，数组的某一个位置没有任何值。

```js
Array(3) // [, , ,]
```

空位不是 `undefined` ，一个位置的值等于 `undefined`，依然是有值的


ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- `forEach()`, `filter()`,`reduce()`, `every()` 和 `some()` 都会跳过空位。
- `map()` 会跳过空位，但会保留这个值
- `join()` 和 `toString()` 会将空位视为 `undefined`，而 `undefined` 和 `null` 会被处理成空字符串。


ES6 则是明确将空位转为 `undefined`。ES6 新增方法都会将空位处理成 `undefined`

