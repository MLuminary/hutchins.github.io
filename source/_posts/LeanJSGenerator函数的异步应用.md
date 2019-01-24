---
title: LeanJs「 ES6 」-- Generator 函数的异步应用
date: 2018-02-12 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSGenerator函数的异步应用/js.png)

<!--more-->

## Generator 函数

### 协程

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做「协程」（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下。

第一步，协程 `A` 开始执行。
第二步，协程 `A` 执行到一半，进入暂停，执行权转移到协程 `B`。
第三步，（一段时间后）协程 `B` 交还执行权。
第四步，协程 `A` 恢复执行。
上面流程的协程 `A`，就是异步任务，因为它分成两段（或多段）执行。

举例来说，读取文件的协程写法如下。

```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```

上面代码的函数 `asyncJob` 是一个协程，它的奥妙就在其中的 `yield` 命令。它表示执行到此处，执行权将交给其他协程。也就是说，`yield` 命令是异步两个阶段的分界线。

协程遇到 `yield` 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除 `yield` 命令，简直一模一样。

### 异步任务的封装

下面看看如何使用 Generator 函数，执行一个真实的异步任务。

```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
```

上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了 `yield` 命令。

执行这段代码的方法如下。

```js
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用 `next` 方法（第二行），执行异步任务的第一阶段。由于 `Fetch` 模块返回的是一个 Promise 对象，因此要用 `then` 方法调用下一个 `next` 方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。