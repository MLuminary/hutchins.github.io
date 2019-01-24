---
title: LeanJs「 ES6 」-- Decorator
date: 2018-02-15 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSDecorator/js.png)

<!--more-->

## 类的修饰

基本上，修饰器的行为就是下面这样。

```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

## 方法的修饰

修饰器不仅可以修饰类，还可以修饰类的属性。

```js
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
```

上面代码中，修饰器 `readonly` 用来修饰「类」的 `name` 方法。

修饰器函数 `readonly` 一共可以接受三个参数。

```js
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

修饰器第一个参数是类的原型对象，上例是 `Person.prototype`，修饰器的本意是要「修饰」类的实例，但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时 `target` 参数指的是类本身）；第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

## Mixin

所谓 `Mixin` 模式，就是对象继承的一种替代方案，中文译为「混入」（mix in），意为在一个对象之中混入另外一个对象的方法。

```js
const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
```

上面代码之中，对象 `Foo` 有一个 `foo` 方法，通过 `Object.assign` 方法，可以将 `foo` 方法「混入」`MyClass` 类，导致 `MyClass` 的实例 `obj` 对象都具有 `foo` 方法。这就是「混入」模式的一个简单实现。