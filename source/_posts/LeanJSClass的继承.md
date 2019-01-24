---
title: LeanJs「 ES6 」-- Class 的继承
date: 2018-02-14 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSClass的继承/js.png)

<!--more-->

## 简介

Class 可以通过 `extends`关键字实现继承

```js
class Point {

}

class ColorPoint extends Point {

}
```

`ColorPoint` 该类就继承了 `Point` 类的所有属性和方法

子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 `this` 对象，而是继承父类的 `this` 对象，然后对其加工。如果不调用 `super` 方法，子类就得不到 `this`

```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

ES5 的继承，实质是先创造子类的实例对象 `this` ，然后再将父类的方法 添加到此 `this` 上面。 ES6 的继承机制完全不同，实质是先创造父类的实例对象 `this`，然后再用子类的构造函数修改 `this` 

如果子类没有定义的 `constructor` ，这个会被默认添加

```js
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

如果不调用 `super`，无法使用 `this` 关键字

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

## super 关键字

既可以当作函数使用，也可以当作对象使用

`super` 作为函数调用时，代表父类构造函数，虽然代表的是父类构造函数，但是返回的是子类的实例

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}

new A() // A
new B() // B
```

`super()` 相当于 `A.prototype.constructor.call(this)`

作为函数时，`super` 只能用在子类的 `constructor` 中

```js
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

当 `super` 用做对象时，指向父类的原型对象；在静态方法中，指向父类

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

`super.p()` 调用了父类原型对象上的方法 `p`

由于 `super` 调用的是父类原型对象上的方法，因此父类实例上的方法和属性是无法被调用的

```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```

ES6 规定，通过 `super` 调用父类原型对象上的方法，其 `this` 指向子类

```js
lass A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

上面代码中，`super.print()` 虽然调用的是 `A.prototype.print()`，但是 `A.prototype.print()` 内部的 `this` 指向子类 `B`，导致输出的是 `2`，而不是 `1`。也就是说，实际上执行的是 `super.print.call(this)`。

## 类的 prototype 属性和 `__proto__` 属性 

子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。

子类 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性。
 
```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

## extends 的继承目标

`extends` 关键字后面可以跟多种类型的值。

```js
class B extends A {
}
```

上面代码的 `A` ，只要是一个有 `prototype` 属性的函数，就能被 `B` 继承。由于函数都有 `prototype` 属性（除了 `Function.prototype` 函数），因此 `A` 可以是任意函数。

