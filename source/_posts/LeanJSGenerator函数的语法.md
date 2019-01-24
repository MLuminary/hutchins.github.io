---
title: LeanJs「 ES6 」-- Generator 函数的语法
date: 2018-02-11 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSGenerator函数的语法/js.png)

<!--more-->

## 简介

Generator 英文为 「生产机」的意思，内部封装了多个状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

Generator 函数有两个特征

- `function` 关键子与函数名之间有一个星号
- 函数体内部使用 `yield` 表达式，表示不同的内部状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

在函数名后面加上一对圆括号后，Generator 函数并不执行，返回的也不是函数运行的结果，而是一个指向内部状态的指针对象，也就是 Iterator Object

必须调用遍历器对象的 `next` 方法，使得指针移向下一个状态。也就是说，每次调用 `next` 内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 `yield` 表达式（或 `return` 语句）为止。换言之，Generator 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

第一次调用，Generator 函数开始执行，直到遇到第一个 `yield` 表达式为止。`next` 方法返回一个对象，它的 `value` 属性就是当前 `yield` 表达式的值 `hello`，`done` 属性的值 `false`，表示遍历还没有结束。

第二次调用，Generator 函数从上次 `yield` 表达式停下的地方，一直执行到下一个 `yield` 表达式。`next` 方法返回的对象的 `value` 属性就是当前 `yield` 表达式的值 `world`，`done` 属性的值 `false` ，表示遍历还没有结束。

第三次调用，Generator 函数从上次 `yield` 表达式停下的地方，一直执行到 `return` 语句（如果没有 `return` 语句，就执行到函数结束）。`next` 方法返回的对象的 `value` 属性，就是紧跟在 `return` 语句后面的表达式的值（如果没有 `return` 语句，则 `value` 属性的值为 `undefined` ），`done` 属性的值 `true`，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，`next` 方法返回对象的 `value` 属性为 `undefined`，`done` 属性为 `true` 。以后再调用 `next` 方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 `next` 方法，就会返回一个有着 `value` 和 `done` 两个属性的对象。`value` 属性表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值；`done` 属性是一个布尔值，表示是否遍历结束。

ES6 没有规定，`function` 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· } //常用
function*foo(x, y) { ··· }
```

## yield 表达式

Generator 函数返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield` 表达式就是「暂停标志」

1 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值

2 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式

3 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，知道 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值

需要注意的是，`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的「惰性求值」（Lazy Evaluation）的语法功能。

```js
function* gen() {
  yield  123 + 456;
}
```

上面代码中，`yield` 后面的表达式 `123 + 456`，不会立即求值，只会在 `next` 方法将指针移到这一句时，才会求值。

`yield` 只能用在 Generator 函数里面，用在其他地方报错

```js
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

另外，`yield` 表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

`yield` 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

```js
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```


## 与  Iterator 接口的关系

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 `Symbol.iterator` 属性，从而使得该对象具有 Iterator 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给 `Symbol.iterator` 属性，从而使得 `myIterable` 对象具有了 Iterator 接口，可以被 `...` 运算符遍历了。

## next 方法的参数

`yield` 表达式本身没有返回值，或者说总是返回 `undefined`。`next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

上面代码定义了一个可以无限循环的 Generator 函数 `f`，因为 `yield` 本身没有返回值，所以每次程序运行到 `yield` 表达式时，`yield i` 返回的都是 `undefined`，也是就说，当 `next()` 不传任何参数的时候，`reset` 的值始终为 `undefined`。当传入 `true` 时，`true` 就会代替 `yield i` 传递给 `reset` ，然后执行 `i = -1`，最后返回 `value:0`。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

上面代码中，第二次运行 `next` 方法的时候不带参数，导致 `y` 的值等于 `2 * undefined` （即 `NaN`），除以 `3` 以后还是 `NaN`，因此返回对象的 `value` 属性也等于 `NaN`。第三次运行 `Next` 方法的时候不带参数，所以 `z` 等于 `undefined`，返回对象的 `value` 属性等于 `5 + NaN + undefined`，即 `NaN`。

如果向 `next` 方法提供参数，返回结果就完全不一样了。上面代码第一次调用 `b` 的 `next` 方法时，返回 `x+1` 的值 `6` ；第二次调用 `next` 方法，将上一次 `yield` 表达式的值设为 `12`，因此 `y` 等于 `24`，返回 `y / 3` 的值 `8` ；第三次调用 `next` 方法，将上一次 `yield` 表达式的值设为 `13` ，因此 `z` 等于 `13`，这时 `x` 等于 `5`，`y` 等于 `24`，所以 `return` 语句的值等于 `42`。

注意，**由于 `next` 方法的参数表示上一个 `yield` 表达式的返回值，所以在第一次使用 `next` 方法时，传递参数是无效的**。V8 引擎直接忽略第一次使用 `next` 方法时的参数，只有从第二次使用 `next` 方法开始，参数才是有效的。从语义上讲，第一个 `next` 方法用来启动遍历器对象，所以不用带有参数。

```js
function* gen() {
   var val =100;
   while(true) {
      val = yield val;  // i=0 时传入参数(0)并调用yield val，参数(0)被丢弃
                        // 第一次yield val 返回循环前的val = 100
      console.log(val); // i=1 时传入参数(1)并调用yield，将参数1赋给上一句
   }                    // yield的返回赋值，然后yield val，返回val = 1
}

var g = gen();
for(let i =0;i<5;i++){
   console.log(i,g.next(i).value);
}

/* 返回：
 0 100
 1   .......这个"1"是第二次调用yield，由while内部console.log(val)产生的
 1 1 .......这个"1 1 "是yield返回，console.log(i,g.next(i).value)产生的
 2
 2 2
 3
 3 3
 4
 4 4
*/
```

## yield* 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。这时就需要用到 `yield*`

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

`yield*` 后面的 Generator 函数（没有 `return` 语句时），等同于在 Generator 函数内部，部署一个 `for...of` 循环。

```js
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
```
上面代码说明， `yield*` 后面的 Generator 函数（没有 `return` 语句时），不过是 `for...of` 的一种简写形式，完全可以用后者替代前者。反之，在有 `return` 语句时，则需要用 `var value = yield* iterator` 的形式获取 `return` 语句的值。