---
title: LeanJs「 ES6 」-- 对象的扩展
date: 2018-02-04 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJS对象的扩展/js.png)

<!--more-->

## 属性的简洁表示法

ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};
```

函数也可以简写

```js
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};
```

注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。

```js
const obj = {
  class () {}
};

// 等同于

var obj = {
  'class': function() {}
};
```

## 属性名表达式

JavaScript 定义对象的属性，有两种方法

```js
//方法一
obj.foo = true;

//方法二
obj['a'+'bc'] = 123
```

但是如果在大括号中，ES5 只允许第一种方法，ES6 中可以允许以上两种方法

```js
// ES5 
var obj = {
  foo: true,
  abc: 123
};

// ES6 
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

表达式还可以用于定义方法名。

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

如果属性名是一个对象，默认情况下会自动将对象转为字符串`[object Object]`

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

## 方法的 name 属性

返回函数的名字，如果对象的方法使用了取值函数 `getter` 和存值函数 `setter`，则 `name` 属性不是在该方法上面，而是该方法的属性的描述对象的 `get` 和 `set` 属性上面，返回值是方法名前加上 `get` 和 `set`。

有两种特殊情况：`bind` 方法创造的函数，`name` 属性返回 `bound` 加上原函数的名字；`Function` 构造函数创造的函数，`name` 属性返回 `anonymous`。

## Object.is()

ES5 中，比较两个值相等，只有两个运算符，`==` 和 `===`，但这两个无法判断两个数值严格意义上的相等，`==` 会强制转换，`===` 中 `NaN` 与自己本身也不想等。

`Object.is()` 就是来实现比较两个值是否完全相等，其行为与 `===` 几乎一致，不同之处只有两个：一是 `+0` 不等于 `-0` ，二是 `NaN` 等于自身。

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Object.assign()

### 基本用法

`Object.assign` 方法用于对象的合并，将源对象 `source` 的所有可枚举属性，复制到目标对象 `target`。

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

`Object.assign` 方法的第一个参数是「目标对象」，后面的参数都是「源对象」。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

对于第一个参数，如果该参数不是对象，则会先转成对象，然后返回。如果转换不了，则报错

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果 `undefined` 和 `null` 不在首参数，就不会报错。

```js
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```js
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

上面代码中，`v1`、`v2`、`v3` 分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。

`Object.assign` 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性 `enumerable: false`。

### 注意点

#### 浅拷贝

`Object.assign()` 是浅拷贝，也就是说，如果源对象某个属性值是对象，那么目标对象拷贝得到的是这个对象的引用

```js
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```

上面代码中，源对象 `obj1` 的 `a` 属性的值是一个对象，`Object.assign` 拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。

### 同名属性的替换

对于这种嵌套的对象，一旦遇到同名属性，`Object.assign` 的处理方法是替换，而不是添加。

```js
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
```

上面代码中，`target` 对象的 `a`属性被 `source`对象的a属性整个替换掉了，而不会得到 `{ a: { b: 'hello', d: 'e' } }` 的结果。这通常不是开发者想要的，需要特别小心。

### 数组的处理

`Object.assign` 可以用来处理数组，但是会把数组视为对象。

```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

上面代码中，`Object.assign` 把数组视为属性名为 `0`、`1`、`2` 的对象，因此源数组的 `0` 号属性 `4` 覆盖了目标数组的 `0` 号属性 `1`。

### 取值函数的处理

`Object.assign` 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```js
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

上面代码中，`source` 对象的 `foo` 属性是一个取值函数，`Object.assign` 不会复制这个取值函数，只会拿到值以后，将这个值复制过去。

## 属性的可枚举和遍历

### 可枚举性

描述对象的 `enumerable` 属性，称为「可枚举性」，如果该属性为 `false`，就表示某些操作会忽略当前属性。

目前有四个操作会忽略 `enumerable` 为 `false` 的属性

- `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()` ：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()` ：只串行化对象自身的可枚举的属性。
- `Object.assign()` ： 忽略 `enumerable` 为 `false` 的属性，只拷贝对象自身的可枚举的属性。

### 属性的遍历

#### for...in

`for...in` 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

### Object.keys(obj)

`Object.keys` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

### Object.getOwnPropertyNames(obj)

`Object.getOwnPropertyNames` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

### Object.getOwnPropertySymbols(obj)

`Object.getOwnPropertySymbols` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

### Reflect.ownKeys(obj)

`Reflect.ownKeys` 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

## Object.getOwnPropertyDescriptors() 

前面说过，`Object.getOwnPropertyDescriptor` 方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了 `Object.getOwnPropertyDescriptors` 方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

上面代码中，`Object.getOwnPropertyDescriptors` 方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

## `__proto__` 属性，Object.setPrototypeOf()，Object.getPrototypeOf()

### `__proto__` 

用来读取和设置当前对象的 `prototype`，但是 `__prototype__` 是一个内部属性，但实际上 `__proto__` 调用的是 `Object.prototype.__proto__` 因此不能用其进行操作

### Object.setPrototypeOf()

```js
// 格式
Object.setPrototypeOf(object, prototype)
```

该方法等同于下面的函数

```js
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

### Object.getPrototypeOf()

读取一个对象的原型函数

## super 关键字

`this` 总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 `super`，指向当前的原型对象

```js
const proto = {
  foo: 'hello'
};

const obj = {
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

注意，`super` 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

```js
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```

上面三种 `super` 的用法都会报错，因为对于 JavaScript 引擎来说，这里的 `super` 都没有用在对象的方法之中。第一种写法是 `super` 用在属性里面，第二种和第三种写法是 `super` 用在一个函数里面，然后赋值给 `foo` 属性。**目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法**。

JavaScript 引擎内部，`super.foo` 等同于 `Object.getPrototypeOf(this).foo`（属性）或 `Object.getPrototypeOf(this).foo.call(this)`（方法）。

## Object.keys()，Object.values()，Object.entries() 

ES5 引入了 `Object.keys` 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的**键名**,`Object.values`方法，返回一个数组，成员为所有可遍历属性的**值**，`Object.entries`方法返回一个数组，成员为所有可遍历的**键值对**

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

ES2017 引入了跟 `Object.keys` 配套的 `Object.values` 和 `Object.entries`，作为遍历一个对象的补充手段，供 `for...of` 循环使用。

```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]****
```

## 对象的扩展运算符

### 解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的 `enumerable` 、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

解构赋值必须是最后一个参数，否则会报错。

```js
let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
```

注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

### 扩展运算符

对象的扩展运算符 `...` 用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

这等同于使用 `Object.assign` 方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

扩展运算符可以用于合并两个对象。

```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```





