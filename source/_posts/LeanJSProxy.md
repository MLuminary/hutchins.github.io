---
title: LeanJs「 ES6 」-- Proxy
date: 2018-02-07 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSProxy/js.png)

<!--more-->

## 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种「元编程」，即对程序语言进行编程

Proxy 可以理解成，在目标对象之前架设一层「拦截」，外界对该对象进行访问，都必须先通过这个拦截，因此提供了一种机制，可以对外面访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由他来「代理」某些操作，可以译为「代理器」

## 语法

```js
let p = new Proxy(target, handler);
```

- `target` : 用 proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至是一个代理）
- `handler` : 一个对象，其属性是当执行一个操作时定义代理的行为的函数，用来定制拦截的行为。

如果 `handler` 没有设置任何拦截，那就等同于直接通向原对象。

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

## 方法

proxy 一共支持十三种操作方法

- `get(target, propKey, receiver)` ：拦截对象属性的读取，比如 `proxy.foo` 和 `proxy['foo']`。
- `set(target, propKey, value, receiver)` ：拦截对象属性的设置，比如 `proxy.foo = v` 或 `proxy['foo'] = v`，返回一个布尔值。
- `has(target, propKey)` ：拦截 `propKey in proxy`的操作，返回一个布尔值。
- `deleteProperty(target, propKey)` ：拦截 `delete proxy[propKey]` 的操作，返回一个布尔值。
- `ownKeys(target)`：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性。
- `getOwnPropertyDescriptor(target, propKey)` ：拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
-  `defineProperty(target, propKey, propDesc)` ：拦截 `Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- `preventExtensions(target)`：拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。
- `getPrototypeOf(target)` ：拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。
- `isExtensible(target)`：拦截 `Object.isExtensible(proxy)`，返回一个布尔值。
- `setPrototypeOf(target, proto)` ：拦截 `Object.setPrototypeOf(proxy, proto)` ，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- `apply(target, object, args)` ：拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`。

为了方便理解，拿出 `get` 方法具体说一下

`get` 方法用于拦截某个属性的读取操作，可以接受三个参数，依次是目标对象，属性名和 proxy 实例本身 （即 `this` 关键字指向的那个对象），其中最后一个可选

举一个具体的例子

```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```

上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回 `undefined`。

下面是一个 `get` 方法的第三个参数的例子。

```js
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
```

## this 问题

由上面可知，在 proxy 代理的情况下，目标对象内部的 `this` 关键字会指向 proxy

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
``` 

上面代码中，`getDate` 方法只能在 `Date` 对象实例上面拿到，如果 `this` 不是 `Date` 对象实例就会报错。这时，`this` 绑定原始对象，就可以解决这个问题。

```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

