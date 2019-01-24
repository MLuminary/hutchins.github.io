---
title: LeanJs「 ES6 」-- 函数的扩展
date: 2018-02-02 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJS函数的扩展/js.png)

<!--more-->

## 函数参数的默认值

### 基本用法

ES6 之前，给函数参数设定默认值要用如下写法

```js
function(x){
  x = x || 'hello'
}
```

但是这样写，如果传入的参数是空字符或者为 `false` ，会启用默认值，但这显然不是我们想要的结果。因此我们还要判断参数是否被赋值

```js
if (typeof x === 'undefined') {
  x = 'World';
}
```

ES6 给了我们更好的一种实现方法，可以把默认值直接写在参数的后面，而且非常的自然

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

使用参数默认值时不能有同名的参数

```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

参数默认值也可以是一个表达式，而且每次调用都会重新计算

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

### 与解构赋值默认值结合使用

```js
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

传入空对象时 `x` 无法解构到值，返回 `undefined` ，`y` 因为默认值，所以返回 `5`，当不传入空对象时， `x` 和 `y` 无法生成，所以报错。通过提供整个参数的默认值，可以避免报错

```js
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

如果没有传参，就默认传入一个空对象。

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

以上两种也是有很大差别

```js
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。当都不传值时不会出现差别，但是当传空对象时，因为写法二没有解构赋值的默认值，因此它对应的为空对象，返回的就是 `undefined`

### 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

参数是可以省略，但是无法只省略这一个参数，除非显示的输入 `undefined`。

### 函数的 length 属性

指定了默认值以后，函数的 `length` 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length` 属性将失真。

```js
(function(a){}).length// 1
(function(a = 1 ){}).length// 0
```

因为 `length` 属性的含义为该函数预期传入的参数个数，这里需要注意，如果设置默认值的参数不是尾参数，那么该参数后面的参数也不计入 `length`

```js
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### 作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

函数参数 `y=x` 的 `x` 为同一作用域下的参数 `x` ，不是全局变量 `x`

如果参数的默认值是一个函数，该函数的作用域也遵守这个规则

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

函数 `foo` 的参数形成了一个单独的作用域，这个作用域中，首先声明了变量 `x` ，然后声明了变量 `y` ，`y` 为一个匿名函数，函数中设置了 `x=2` ，此中的 `x` 为参数 `x`，然后在 `foo` 函数中声明了一个内部的 `x` ，而此 `x` 和参数中的 `x` 不在同一作用域内，因此不是同一个变量。

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```

这样函数内部的 `x` 就指向了参数，与匿名函数中的 `x` 是同一个变量，最后 `foo()` 输出的是 `2`，但是都没有影响全局变量

再看下面的例子

```js
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
```

这里的 `x` 会去找函数外的变量，局部变量无法影响到默认值

## rest 参数

ES6 引入 rest 参数，用于获取函数多余的参数，这样就不需要用 `arguments` 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组，形为 `...values`

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

rest 参数后面不能有其它参数，即只能为最后一个参数

```js
// 报错
function f(a, ...b, c) {
  // ...
}
```

函数的 `lenth` 属性，也不包括 rest 参数

```js
(function(...a) {}).length  // 0
```

## 严格模式

从 ES5 开始，允许在函数内部启用严格模式，但是在 ES6 中，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}
```

函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

解决方法就是全局设定严格模式，或者用一个立即执行函数包裹此函数。

## name 属性

返回函数的名字，和 ES5 中有些许的变化

```js
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```

`Function` 构造函数返回的函数实例，`name` 属性的值为 `anonymous`。

```js
(new Function).name // "anonymous"
```

`bind` 返回的函数，`name` 属性值会加上 `bound` 前缀。

```js
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

## 箭头函数

### 基本用法

```js
//ES6
var f = v => v;

//ES5
var f = function(v) {
  return v;
};
```

如果有多个参数，就需要用圆括号括起来

```js
var sum = (num1, num2) => num1 + num2;

//等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

如果箭头函数想直接返回一个对象，必须在外面加上圆括号，否则会报错

```js
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

### 使用注意点

- 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数。

尤其注意第一点，原因是箭头函数根本没有自己的 `this` ，导致内部的 `this` 其实就是外层代码块的 `this` 。同时也正是因为他没有 `this` ，所以他不能当作构造函数

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

这表明箭头函数根本没有自己的 `this` ，而是引用了外部的 `this`

除了 `this` ，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments` 、`super` 、`new.target` 。

```js
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```

上面代码中，箭头函数内部的变量 `arguments`，其实是函数 `foo` 的 `arguments` 变量。

另外，由于箭头函数没有自己的 `this`，所以当然也就不能用 `call()`、`apply()`、`bind()` 这些方法去改变 `this` 的指向。

### 嵌套的箭头函数

箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

```js
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}
```

上面这个函数，可以使用箭头函数改写。

```js
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```

## 双冒号运算符

有一个提案，「函数绑定运算符」，用来取代 `call`、`bind`、`apply`

函数绑定运算符是并排的两个冒号 `::`，双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即 `this` 对象），绑定到右边的函数上面。

```js
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
```

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

```js
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;
// 等同于
var method = obj.foo.bind(obj);
```

## 尾调用优化

### 尾调用

尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

```js
function f(x){
  return g(x);
}
```

上面代码中，函数 `f` 的最后一步是调用函数 `g`，这就叫尾调用，尾调用也不一定要出现在函数的尾部，只要最后一步操作即可

以下三种情况，都不属于尾调用。

```js
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
```

上面代码中，情况一是调用函数 `g` 之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。

```js
function f(x){
  g(x);
  return undefined;
}
```

### 尾调用优化

函数调用会在内存形成一个「调用记录」，又称 「调用帧」（call frame），保存调用位置和内部变量等信息。如果在函数 `A` 的内部调用函数 `B`，那么在 `A` 的调用帧上方，还会形成一个 `B` 的调用帧。等到 `B` 运行结束，将结果返回到 `A`，`B` 的调用帧才会消失。如果函数 `B` 内部还调用函数 `C`，那就还有一个 `C` 的调用帧，以此类推。所有的调用帧，就形成一个「调用栈」（call stack）

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

看上面的话很难懂，其实就是只要尾部调用的函数不用到外部函数中的内部变量，就可以调用帧，减少代码

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

如果内部函数用到外部函数的内部变量，就无法进行尾部优化

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

上面的函数不会进行尾调用优化，因为内层函数 `inner` 用到了外层函数 `addOne` 的内部变量 `one`。

### 尾递归

函数调用自身称为递归，如果尾调用自身，就称为递归

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生「栈溢出」错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生「栈溢出」错误。

有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。

非尾递归

```js
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
```

尾递归优化后 

```js
function Fibonacci(n, ac1 = 1, ac2 = 2){
  if(n <= 1){return ac2}

  return Fibonacci(n-1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

## 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(
  param1,
  param2
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar'
);
```

上面代码中，如果在 `param2` 或 `bar` 后面加一个逗号，就会报错。

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数 `clownsEverywhere` 添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

```js
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

