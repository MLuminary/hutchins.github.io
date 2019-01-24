---
title: LeanJs「 ES6 」-- Async
date: 2018-02-13 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSAsync/js.png)

<!--more-->

## 含义

就是 Generator 函数的语法糖。

>语法糖（Syntactic sugar），也译为糖衣语法，是由英国计算机科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。  --百度百科

Generator 函数依次读取两个文件的函数如下

```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

写成 `async` 函数，就是下面这样

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

`async` 函数就是将 Generator 函数的 `*` 替换成 `async` ，将 `yield` 替换成 `await` ，仅此而已

`async` 函数对 Generator 函数的改进体现在四点

**内置执行器** 

`async` 函数自带执行器，与普通函数一样，可以自动执行

```js
asyncReadFile()
```

不需要调用 `next` 方法

**更好的语义**

`async` 和 `await` 比起 `*` 和 `yield` 语义更清楚

**更广的适用性**

`yield` 命令后面只能是 Thunk 函数或 Promise 对象，而 `async` 函数的 `await` 命令后面，可以是 Promise 对象和原始类型的值

**返回值是 Promise**

`async` 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便

## 基本用法

下面是一个例子，指定多少毫秒后输出一个值

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

## 语法

### 返回 Promise 对象

`async` 函数返回一个 Promise 对象

`async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数

```js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

上面代码中，函数 `f` 内部 `return` 命令返回的值，会被 `then` 方法回调函数接收到

`async` 函数内部抛出错误，会导致返回的 Promise 对象变为 `reject` 状态，抛出的错误对象会被 `catch` 方法回调函数接收到

```js
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
```

Promise 对象的状态变化

## await 命令  

`await` 命令后面是一个 Promise 对象。如果不是，会被转成一个立即 `resolve` 的 Promise 对象

```js
async function f() {
  return await 123;
}

f().then(v => console.log(v))
// 123
```       

`await` 命令后面的 Promise 对象如果变成 `reject` 状态，则 `reject` 的参数会被 `catch` 方法的回调函数接收到

```js
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

注意，上面代码中，`await` 语句前面没有 `return`，但是 `reject` 方法的参数依然传入了 `catch` 方法的回调函数。这里如果在 `await` 前面加上 `return`，效果是一样的

只要有一个 `await` 语句后面的 Promise 变为 `reject` ，那么整个 `async` 函数都会中断执行

```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

第二个 `await` 语句是不会执行的，因为第一个 `await` 语句状态变成了 `reject`。但是有的时候我们希望即使第一个操作失败，也不要中断后面的异步操作，但么我们就需要用到以下两种方法

```js
//第一种
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world

//第二种
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```