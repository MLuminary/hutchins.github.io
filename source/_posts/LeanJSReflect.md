---
title: LeanJs「 ES6 」-- Reflect
date: 2018-02-08 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSReflect/js.png)

<!--more-->

## 设计目的

1 将 `Object` 对象的一些明显属于语言内部的方法，放到 `Reflect` 对象上。现阶段，某些方法同时在 `Object` 和 `Reclect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。也就是说，从 `Reflect` 对象上可以拿到语言内部的方法

2 修改某些 `Object` 方法的返回结果，让其变得更合理。比如，`Object,defineProperty(obj,name,desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false`

```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

3 让 `Object` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]`,而`Reflect.has(obj,name)` 和 `Reflect.deteProperty(obj,name)` 让他们变成了函数行为

4 `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect`对象上找到对应的方法。这就让 `Proxy` 对象可以方便的调用对应的 `Reflect` 方法，完成默认行为。也就是说，不管 `Proxy` 怎么修改默认行为，你总可以在 `Reflect` 上获取默认行为

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target,name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

上面的 `proxy` 先是定义了 `set` ，然后调用 `Reflect.set` 方法将值复制给对象的属性，保持了 `set` 原有的行为.

## 静态方法

`Reflect` 对象一共有 13 个静态方法
 
- `Reflect.apply(target, thisArg, args)` : 等同于 `Function.prototype.apply.call(func, thisArg, args)`，用于绑定 `this` 对象后执行给定函数。
- `Reflect.construct(target, args)` : 等同于 `new target(...args)`，这提供了一种不使用 `new`，来调用构造函数的方法。
- `Reflect.get(target, name, receiver)` : 方法查找并返回 `target` 对象的 `name` 属性。
- `Reflect.set(target, name, value, receiver)` : 设置 `target` 对象的 `name` 属性等于`value`。
- `Reflect.defineProperty(target, name, desc)` :  基本等同于 `Object.defineProperty`，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用 `Reflect.defineProperty` 代替它。
- `Reflect.deleteProperty(target, name)` : 等同于 `delete obj[name]`，用于删除对象的属性。
- `Reflect.has(target, name)` : `Reflect.has`方法对应 `name in obj` 里面的 `in` 运算符。
- `Reflect.ownKeys(target)` : 用于返回对象的所有属性，基本等同于 `Object.getOwnPropertyNames` 与`Object.getOwnPropertySymbols` 之和。
- `Reflect.isExtensible(target)` : 对应 `Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。
- `Reflect.preventExtensions(target)` : 对应 `Object.preventExtensions` 方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
- `Reflect.getOwnPropertyDescriptor(target, name)` : 基本等同于 `Object.getOwnPropertyDescriptor`，用于得到指定属性的描述对象，将来会替代掉后者。
- `Reflect.getPrototypeOf(target)` : 用于读取对象的 `__proto__` 属性，对应 `Object.getPrototypeOf(obj)`。
- `Reflect.setPrototypeOf(target, prototype)` : 用于设置对象的 `__proto__` 属性，返回第一个参数对象，对应`Object.setPrototypeOf(obj, newProto)`。

上面这些方法的作用，大部分与 `Object` 对象的同名方法的作用都是相同的，而且它与 `Proxy` 对象的方法是一一对应的。

### get 

`Reflect.get` 方法查找并返回 `target` 对象的 `name` 属性，如果没有该属性，则返回 `undefined`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

如果 `name` 属性部署了读取函数（`getter`），则读取函数的 `this` 绑定 `receiver`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

如果第一个参数不是对象，`Reflect.get` 方法会报错。

```js
Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
```
