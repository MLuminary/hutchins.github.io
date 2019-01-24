---
title: LeanJs「 ES6 」-- Promise
date: 2018-02-09 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSPromise/js.png)

<!--more-->

## 含义

Promise 是「异步编程」的一种解决方案，比传统的解决方案「回调函数和事件」更合理和更强大。它由社区最早提出和实现。

`Promise` 是一个对象，它可以获取异步操作的消息，就像一个容器。它允许你为异步操作的成功和失败分别绑定相应的处理方法。

一个 `Promise` 有三种状态

- `pending` : 初始状态，既不是成功，也不是失败
- `fulfilled` : 意味着操作成功完成
- `rejected` : 意味着操作失败

`Promise` 对象状态的改变只有两种可能 从 `pending` 变为 `fulfilled` 和从 `pending` 变为 `rejected`。而且一旦状态改变就不会再变了，这个容器只有这两个出口，而容器中发生任何内部错误不会反应到外部。

## 语法

下面代码创造了一个 `Promise`实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`resolve()` 在成功时调用，`reject()` 在出错时调用，用来传递给外部

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then` 方法可以接受两个回调函数作为参数。第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用，第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 `Promise` 对象传出的值作为参数。

注意，调用 `resolve` 或 `reject` 并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

上面代码中，调用 `resolve(1)` 以后，后面的 `console.log(2)` 还是会执行，并且会首先打印出来。这是因为立即 `resolved` 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用 `resolve` 或 `reject` 以后，Promise 的使命就完成了，后继操作应该放到 `then` 方法里面，而不应该直接写在 `resolve` 或 `reject` 的后面。所以，最好在它们前面加上 `return` 语句，这样就不会有意外。

## Promise.prototype.then()

`then` 方法返回的是一个新的实例，因此可以采用链式写法。第一个参数为 `resolved` 状态的回调函数，第二个参数（可选）为 `rejected` 状态的回调参数

```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

上面的代码使用 `then` 方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

## Promise.prototype.catch()

`Promsie.prototype.catch()` 方法是 `.then(null,rejection)` 的别名，用于指定发生错误的回调函数

一般来说，不要在 `then` 方法里面定义 `Reject` 状态的回调函数（即then的第二个参数），总是使用 `catch` 方法。

```js
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面 `then` 方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用 `catch` 方法，而不使用 `then` 方法的第二个参数。

一般总是建议，Promise 对象后面要跟 `catch方` 法，这样可以处理 Promise 内部发生的错误。 `catch` 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 `then` 方法。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```

上面代码运行完 `catch` 方法指定的回调函数，会接着运行后面那个 `then` 方法指定的回调函数s

## Promise.prototype.finally

`finally` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。 

```js
 promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管 `promise` 最后的状态，在执行完 `then` 或 `catch` 指定的回调函数以后，都会执行 `finally` 方法指定的回调函数。

## Promise.all

`Promise.all` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1,p2,p3]);
```

上面代码中，`Promise.all()` 接受了一个数组作为参数，`p1`、`p2` 、`p3` 都是 Promise 实例，如果不是，就会先调用下面讲到的 `Promise.resolve` 方法，将参数转为 Promise 实例，再进一步处理。（ `Promise.all` 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

`p` 的状态由 `p1`、`p2`、`p3` 共同决定，当其三个全为 `fulfilled` 时，`p` 的状态为 `fulfilled` ，当这三个其中有一个是 `rejected` 时，`p` 的状态为 `rejected`

```js
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

注意，如果作为参数的 Promise 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法。

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

上面代码中，`p1` 会 `resolved`，`p2` 首先会 `rejected`，但是 `p2` 有自己的 `catch` 方法，该方法返回的是一个新的 Promise 实例，`p2` 指向的实际上是这个实例。**该实例执行完 `catch` 方法后，也会变成 `resolved`**，导致 `Promise.all()` 方法参数里面的两个实例都会 `resolved` ，因此会调用 `then` 方法指定的回调函数，而不会调用 `catch` 方法指定的回调函数。

## Promise.race()

`Promise.race` 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要 `p1`、`p2`、`p3` 之中有一个实例率先改变状态，`p` 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 `p` 的回调函数。

## Promise.resolve()

将现有对象转换为 Promise 对象

`Promise.resolve` 等价于下面的写法。

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve` 方法的参数分成四种情况。

### 参数是一个 Promise 实例

如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

### 参数是一个thenable对象

`thenable `对象指的是具有 `then` 方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then`方法。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

### 参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 Promise 对象，状态为 `resolved`。

```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

### 不带有任何参数

`Promise.resolve` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 Promise 对象。

```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量 `p` 就是一个 Promise 对象。

需要注意的是，立即 `resolve` 的 Promise 对象，是在本轮「事件循环」（event loop）的结束时，而不是在下一轮「事件循环」的开始时。

```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

## Promise.reject()

`Promise.reject(reason)` 方法也会返回一个新的 Promise 实例，该实例的状态为 `rejected`。

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

上面代码生成一个 Promise 对象的实例 `p` ，状态为 `rejected`，回调函数会立即执行。

## Promise.try()

让同步函数同步执行，异步函数异步执行

```js
Promise.try(database.users.get({id: userId}))
  .then(...)
  .catch(...)
```