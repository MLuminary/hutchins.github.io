---
title: LeanJs「 ES5 」-- 语法专题
date: 2018-01-26 21:24:07
tags: 
    - LeanJs
    - ES5
category: Note    
---

![Js](LeanJS语法专题/js.png)

<!--more-->

## 单线程模式

JavaScript 只在一个线程上运行，也就是说同时只能进行一个任务，其他任务必须要排队.但是这不代表 JavaScript 只有一个线程，实际上 JavaScript 引擎有多个线程。

单线程模式带来很多问题，因为新的任务只能加在任务队列的末尾，如果排在前面的任务加载需要过长的时间，后面的所有任务都会在等待，造成浏览器失去响应，又称为「假死」

而且有的时候并不是因为计算量大，而是因为有的时候输入输出设备或者一些耗时的请求阻碍队列的正常的进行，此时CPU在闲着确还是出现了假死的现象

### 消息队列

为了避免以上说的情况，设计者设计了一个消息队列，也就是对于一些耗时的操作， JavaScript 引擎提供了一个消息队列，排在任务队列的最后。先优先处理相对简单的任务，等任务队列处理完成之后，再处理消息队列。

### Event Loop

所谓Event Loop机制，指的是一种内部循环，用来**一轮又一轮地处理消息队列之中的消息，即执行对应的回调函数**。

消息队列是一个先进先出的数据结构，按顺序动态添加处理消息队列中的任务

## 定时器

### setTimeout()

第一个参数是要执行的函数名，回调函数或者是代码，如果传入的是代码要用字符串的形式，因为引擎内部用 `eval`，第二个参数是推迟的时间单位为毫秒

```js
setTimeout(func|code,timeout)
```

`setTimeout` 还允许添加更多的参数，多余的参数会被传入回调函数中，这种方式IE9以下不支持

```js
setTimeout(function(a,b){
  console.log(a+b);
},1000,1,2)
```

如果还是想实现传参的话可以自定义一个函数

```js
setTimeout(function(){
  add(a,b);
},1000)
```

`setTimeout` 传入的回调函数如果是某个对象的方法，那么该方法中的 `this` 会指向全局对象

```js
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  }
}

var user = new User('John');

setTimeout(user.sayHi, 1000); //undefined
```

写在回调函数中即可

```js
setTimeout(function(){
  user.sayHi()
}, 1000);
```

也可用 `bind`

```js
setTimeout(user.sayHi.bind(this),1000)
```

HTML 5标准规定，`setTimeout` 的最短时间间隔是4毫秒。为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE 9以上的版本，会将时间间隔切换到系统定时器，大约是15.6毫秒。

### setInterval()

`setInterval` 函数的用法与 `setTimeout` 完全一致，区别仅仅在于 `setInterval` 指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

`setInterval` 的时间间隔不是结束后的时间，而是开始后就开始算，假如 `delay` 时间设置的是 `1000ms` 假如这个任务执行了100ms，那么下次调用这个任务就是这个任务结束后的900ms执行，假如这个任务执行了1000ms那么后面的任务就在它执行后立马执行

为了确保两次执行的间隔之间相同，推荐使用 `setTimeout` 代替 `setInterval`

```js
var timer = setTimeout(function(){
  //do something
  var timer = setTimeout(arguments.callee,2000)
},2000)
```

也可以自定义一个函数来替代 `setInterval`

```js
function interval(func,delay){
  var interv = function(){
    //将func的this指向全局
    func.call(null);
    setTimeout(interv,delay)
  }
  setTimeout(interv,delay);
}
```

HTML 5标准规定，`setInterval` 的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒。

### clearTimeout() clearInterval()

`setTimeout` 和 `setInterval` 函数，都返回一个表示计数器编号的整数值，将该整数传入 `clearTimeout` 和 `clearInterval` 函数，就可以取消对应的定时器。

`setTimeout` 和 `setInterval` 返回的整数值是连续的。

利用这一点可以写一个函数取消当前所有的 `setTimeout()`

```js
(function() {
  var gid = setInterval(clearAllTimeouts, 0);

  function clearAllTimeouts() {
    //此id代表的数值为定义的定时器中最大的
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();
```

运行上面代码后，实际上再设置任何 `setTimeout` 都无效了。

防抖动函数也可以利用 `setTimeout` 改写

```js
funciton debounce(func,delay){
  var timer = null;
  return function(){
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    var timer = setTimeout(function(){
      func.apply(context,args);
    },delay)
  }
}
```

### 运行机制

`setTimeout` 和 `setInterval` 的运行机制是，将指定的代码移出本次执行，等到下一轮 Event Loop 时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮 Event Loop 时重新判断。

### setTimeout(f,0)

#### 调整事件的执行顺序

用户自定义的回调函数，通常在浏览器的默认动作之前触发。比如，用户在输入框输入文本，`keypress` 事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。

```js
document.getElementById('input-box').onkeypress = function(event) {
  this.value = this.value.toUpperCase();
}
```

上面代码想在用户输入文本后，立即将字符转为大写。但是实际上，它只能将上一个字符转为大写，因为浏览器此时还没接收到文本，所以 `this.value` 取不到最新输入的那个字符。只有用 `setTimeout` 改写，上面的代码才能发挥作用。

```js
document.getElementById('my-ok').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
```

上面代码将代码放入 `setTimeout` 之中，就能使得它在浏览器接收到文本之后触发。

#### 分批处理耗时的任务

由于 `setTimeout(f,0)` 实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到 `setTimeout(f,0)` 里面执行。

```js
var div = document.getElementsByTagName('div')[0];

// 写法一
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二
var timer;
var i=0x100000;

function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
```

上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器「堵塞」，**因为JavaScript执行速度远高于DOM**，会造成大量DOM操作「堆积」，而写法二就不会，这就是 `setTimeout(f, 0)` 的好处。

另一个使用这种技巧的例子是代码高亮的处理。如果代码块很大，一次性处理，可能会对性能造成很大的压力，那么将其分成一个个小块，一次处理一块，比如写成 `setTimeout(highlightNext, 50)` 的样子，性能压力就会减轻。

### 正常任务和微任务

这时，需要区分两种任务：正常任务（task）与微任务（microtask）。它们的区别在于，「正常任务」在下一轮Event Loop执行，「微任务」在本轮Event Loop的所有任务结束后执行。

微任务主要是 `process.nextTick`和 Promise

正常任务为 

- setTimeout
- setInterval
- setImmediate
- I/O
- 各种事件（比如鼠标单击事件）的回调函数


```js
console.log(1);

setTimeout(function() {
  console.log(2);
}, 0);

Promise.resolve().then(function() {
  console.log(3);
}).then(function() {
  console.log(4);
});

console.log(5);

// 1
// 5
// 3
// 4
// 2
```

`setTimeout` 为正常任务，在下一轮执行，Promise 在队列结束后立马执行，所以 5 后先是 3 和 4 然后再是 2

## Promise

### JavaScript 的异步执行

「异步模式」则完全不同，每一个任务分成两段，第一段代码包含对外部数据的请求，第二段代码被写成一个回调函数，包含了对外部数据的处理。第一段代码执行完，不是立刻执行第二段代码，而是将程序的执行权交给第二个任务。等到外部数据返回了，再由系统通知执行第二段代码。所以，程序的执行顺序与任务的排列顺序是不一致的、异步的。

#### 回调函数

回调函数是异步编程最基本的方法

回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），使得程序结构混乱、流程难以追踪（尤其是回调函数嵌套的情况），而且每个任务只能指定一个回调函数。

#### 事件监听

另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以「去耦合」（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

#### 发布/订阅

“事件”完全可以理解成”信号”，如果存在一个”信号中心”，某个任务执行完成，就向信号中心”发布”（publish）一个信号，其他任务可以向信号中心”订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式“（publish-subscribe pattern），又称”观察者模式“（observer pattern）。

这个模式有多种实现，下面采用的是Ben Alman的Tiny Pub/Sub，这是jQuery的一个插件。

首先，f2向”信号中心”jQuery订阅”done”信号。

```js
jQuery.subscribe("done", f2);
```

然后，f1进行如下改写：

```js
function f1(){
	setTimeout(function () {
		// f1的任务代码
		jQuery.publish("done");
	}, 1000);
}
```
jQuery.publish(“done”)的意思是，f1执行完成后，向”信号中心”jQuery发布”done”信号，从而引发f2的执行。

f2完成执行后，也可以取消订阅（unsubscribe）。

```js
jQuery.unsubscribe("done", f2);
```
这种方法的性质与”事件监听”类似，但是明显优于后者。因为我们可以通过查看”消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

### 异步操作的流程控制

经历回调函数嵌套、串行执行、并行执行到串行与并行的结合

所谓并行与串行的结合，就是设置一个门槛，每次最多只能并行执行n个异步任务。这样就避免了过分占用系统资源。

### Promise 对象

`Promise` 对象是 CommonJS 工作组提出的一种规范，目的是为异步操作提供统一接口。

它的思想是，每一个异步任务立刻返回一个 `Promise` 对象，由于是立刻返回，所以可以采用同步操作的流程。这个 `Promises` 对象有一个 `then` 方法，允许指定回调函数，在异步任务完成后调用。

前面说过，Promise接口的基本思想是，异步任务返回一个Promise对象。

Promise对象只有三种状态。

异步操作「未完成」（pending）、异步操作 「已完成」（resolved，又称fulfilled）、异步操作「失败」（rejected）

三种状态的变化途径也只有两种

未完成到成功、未完成到失败

变化只能发生一次，异步操作成功，Promise对象传回一个值，状态变为 `resolved`，异步操作失败，Promise对象抛出一个错误，状态变为 `rejected`。

```js
po.then(step1)
  .then(step2)
  .then(step3)
  .then(
    console.log,
    console.error
  )
```

`po`的状态一旦变为 `resolved` 就调用下一个 `then` 中的方法，依次进行。`console.log` 这个方法只显示 `step3` 的返回值，而 `console.error` 会显示 `step1` 、 `step2` 、 `step3` 中的任意一个错误。因为假定 `step1` 执行出错，这时 `step2` `step3` 就不会再执行下去，然后 Promise 就会**寻找接下来第一个操作失败的回调函数**

Promise 对象的例子

```js
var promise = new Promise(function(resolve,reject){
  //异步操作的代码
  if(//异步操作成功){
    resolve(value);
  }else{
    reject(error);
  }
})
```

#### 用法辨析

`finalHandler` 回调函数的参数，是 `doSomethingElse` 函数的运行结果

```js
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
```

`findlHandler` 回调函数的参数是 `undefined`

```js
doSomething().then(function () {
  doSomethingElse();
  return;
}).then(finalHandler);
```

`finalHandler` 回调函数的参数是 `doSomethingElse` 函数的返回值

```js
doSomething().then(doSomethingElse())
  .then(finalHandler);
```

`doSomethingElse` 的参数是 `doSomething` 的返回值

```
doSomething().then(doSomethingElse)
  .then(finalHandler);
```

### Promise 应用

#### 加载图片

```js
var preloadImage = function(path){
  return new Promise(function(resolve,reject){
    var img = new Image();
    img.onload = resolve;
    img.error = reject;
    img.src = path;
  })
}
```

#### Ajax 操作

```js
function search(term) {
  var url = 'http://example.com/search?q=' + term;
  var xhr = new XMLHttpRequest();
  var result;

  var p = new Promise(function (resolve, reject) {
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
      if (this.status === 200) {
        result = JSON.parse(this.responseText);
        resolve(result);
      }
    };
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send();
  });

  return p;
}

search("Hello World").then(console.log, console.error);
```

#### 小结

Promise对象的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚。它的一整套接口，可以实现许多强大的功能，比如为多个异步操作部署一个回调函数、为多个回调函数中抛出的错误统一指定处理方法等等。

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是，编写和理解都相对比较难。

## 严格模式

### 设计目的

- 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 JavaScript 语法做好铺垫。

### 特点

在文件头或者函数内部添加 `use strict` 即可开启严格模式。

```html
<script>
'use strict'
//严格模式
</script>

<script>
//正常模式
</script>
```

```js
//正常模式
'use strict'
// 严格模式
```

有的时候需要合并不同的脚本，严格模式的脚本在前，则合并的脚本都是严格模式，如果正常的脚本在前，则合并后都是正常模式的脚本，但是这两种情况都是错误的，这时可以考虑把整个脚本放在一个立即执行的函数之中

### 显示报错

http://javascript.ruanyifeng.com/advanced/strict.html

