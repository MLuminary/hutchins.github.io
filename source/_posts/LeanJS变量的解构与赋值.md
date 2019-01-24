---
title: LeanJs「 ES6 」-- 变量的解构赋值
date: 2018-01-29 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---
![Js](LeanJS变量的解构与赋值/js.png)

<!--more-->

## 数组的解构赋值

### 基本用法

>ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

本质上来说就是一种「模式匹配」，如果右边不是可遍历的结构，即本身不具有 Iterator 接口，或者转换为对象也不具备 Iterator 接口，才会报错

```js
//ES6
let [a, b, c] = [1, 2, 3];

//ES5
var a = 1,
    b = 2,
    c = 3;
```

如果等号左边的值多于等号右边的值，就会匹配不成功

```js
let [a, b] = [4];

a //4
b //undefiend
```

匹配不成功，变量的值就为 `undefined`，将上述代码转换成 ES5 后可以看清原理

```js
"use strict";

var _ref = [4],
    a = _ref[0],
    b = _ref[1];
```

如果等号左边的值少于等号右边的值，为不完全解构

```js
let [x, y] = [1, 2, 3];
x // 1
y // 2
```

### 默认值

结构赋值允许指定默认值

```js
let [a, b = 4] = [3]
b//4
let [a, b = 4] = [3, 3]
b//3
```

工作原理如下

```js
"use strict";

var _ref = [3],
    a = _ref[0],
    _ref$ = _ref[1],
    b = _ref$ === undefined ? 4 : _ref$;
```

只有右边相对应的值是 `undefined` ，才会为默认值

```js
let [b = 4] = [null]
b//null
```

因为 `null` 不严格等于 `undefined` 所以默认值不会生效

默认值也可以是一个表达式，也可以引用解构赋值的其它变量

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

## 对象的解构赋值

### 基本用法

对象的解构与数组有一个重要的不同，数组是按照次序，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名才能相互匹配

```js
let {bar , foo} = {foo : 'aaa',bar : 'bbb'}
bar // 'bbb'
foo // 'aaa'
```

以上代码可以看出，对象的解构赋值完全不受次序影响，转换为 ES5 代码如下

```js
var _foo$bar = { foo: 'aaa', bar: 'bbb' },
    bar = _foo$bar.bar,
    foo = _foo$bar.foo;
```

但其实以上代码是下面代码的简写形式

```js
let {bar: bar ,foo: foo} = {foo : 'aaa',bar : 'bbb'}
```

为什么这么说嘞，请看下面的代码

```js
let {baz: a, foo: b} = {foo : 'aaa',bar : 'bbb'}

foo //foo is not defined
b //'aaa'
```

上面的代码转换成 ES5 的代码为

```js
var _foo$bar = { foo: 'aaa', bar: 'bbb' },
    a = _foo$bar.baz,
    b = _foo$bar.foo;
```

也就是说对象赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者。因此上面的代码中，`foo` 只是模式匹配，`a` 才是真正被赋值的变量

解构也可以用于嵌套结构的对象

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

但是 `p` 为匹配的模式，不是变量，因此不会赋值。如果 `p` 要赋值，可以写成下面这样

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

看下面这个例子

```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

上面代码有三次解构赋值，分别是对 `loc` 、`start` 、`line` 三个属性的解构赋值。注意，最后一次对 `line` 属性的解构赋值之中，只有 `line` 是变量，`loc` 和 `start` 都是模式，不是变量。

对象的解构也可以指定默认值，默认值生效的条件是，相对应的对象的属性严格等于　`undefined`

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```js
let {foo: {bar}} = {baz: 'baz'};
```

原因就是等号左边的 `foo` 属性对应了一个对象，如果想给 `bar` 赋值需要经过这样的步骤

```js
let _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错
```

因为 `_tmp.foo` 为 `undefined`，当然就会报错

如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将 `{x}` 理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({x} = {x: 1});
```

## 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个 `length` 属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```

## 数值和布尔值解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错。

## 函数参数的解构赋值

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

函数的参数的解构也可以使用默认值

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

注意，下面的写法会得到不一样的结果。

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数 `move` 的参数指定默认值，而不是为变量 `x` 和 `y` 指定默认值，所以会得到与前一种写法不同的结果。

## 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号

#### 变量声明语句

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

#### 函数参数

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

#### 赋值语句中的模式

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

### 可以使用圆括号

只有一种，那就是赋值语句中的非模式

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是 `p` ，而不是 `d` ；第三行语句与第一行语句的性质一致。