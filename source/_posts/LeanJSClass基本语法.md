---
title: LeanJs「 ES6 」-- Class 的基本语法
date: 2018-02-14 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJSClass基本语法/js.png)

<!--more-->

## 简介

ES5 中生成实例对象

```js
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

ES6 提供了更接近传统语言的写法，引入了 Class 这个概念，作为对象的模板。通过 `class` 关键字，可以定义类

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

在 `Class` 中定义方法不需要用逗号，添加逗号反而会报错

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

类的属性名，可以采用表达式

```js
let methodName = 'getArea';

class Square{
  constructor(length){
    //...
  }

  [methodName](){
    //...
  }
}
```

## constructor 方法

`constructor` 方法是类的默认方法，通过 `new` 命令生成对象的实例时，自动生成该方法。生成对象时也必须使用 `new` 来生成；一个类必须要有 `constructor` ，如果没有显式定义，一个空的 `constructor` 也会被默认添加

## Class 表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = class Me{
  getClassName(){
    return Me.name;
  }
}
```

这个类的名字是 `MyClass` 而不是 `Me`，`Me` 只在 Class 的内部代码可用，指代当前类

```js
let inst = new MyClass();
inst.getClassName() //Me
Me.name // ReferenceError: Me is not defined
```

如果内部没有用到 `Me` ，完全可以省略

```js
const MyClass = class { /* ... */ };
```

采用 Class 表达式，可以写出立即执行的 Class

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

## 不存在变量提升

类不存在变量提升 (hoist) 

```js
new Foo(); // ReferenceError
class Foo {}
```

## 私有的方法

将私有方法移出模块

```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值

```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中，`bar` 和 `snaf` 都是 `Symbol` 值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

## 私有属性的提案

与私有方法一样，ES6 不支持私有属性。目前，有一个提案，为 `class` 加了私有属性。方法是在属性名之前，使用 `#` 表示。

```js
class Point {
  #x;

  constructor(x = 0) {
    #x = +x; // 写成 this.#x 亦可
  }

  get x() { return #x }
  set x(value) { #x = +value }
}
```

上面代码中，`#x` 就表示私有属性 `x`，在 `Point` 类之外是读取不到这个属性的。还可以看到，私有属性与实例的属性是可以同名的（比如，`#x` 与 `get x()` ）。

## this 的指向

类的方法内部如果含有 `this` ，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能会报错

```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName` 方法中的 `this`，默认指向 Logger 类的实例。但是，如果将这个方法提取出来单独使用，`this` 会指向该方法运行时所在的环境，因为找不到 `print` 方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定 `this` ，这样就不会找不到 `print` 方法了。

```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。

```js
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

## Class 的取值函数（getter）和存值函数（setter）

与 ES5 一样，在「类」的内部可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

上面代码中，`prop` 属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

##Class 的 Generator 方法

如果某个方法之前加上星号 `*`，就表示该方法是一个 Generator 函数。

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

上面代码中，`Foo` 类的 `Symbol.iterator` 方法前有一个星号，表示该方法是一个 Generator 函数。`Symbol.iterator` 方法返回一个 `Foo` 类的默认遍历器，`for...of` 循环会自动调用这个遍历器。

## Class 的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为「静态方法」。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo` 类的 `classMethod` 方法前有 `static` 关键字，表明该方法是一个静态方法，可以直接在 `Foo` 类上调用 `Foo.classMethod()`，而不是在 `Foo` 类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

## Class 的静态属性和实例属性

静态属性指的是 Class 本身的属性，即 `Class.propName`，而不是定义在实例对象 `this` 上的属性。

```js
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为 `Foo` 类定义了一个静态属性 `prop`。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

```js
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

目前有一个静态属性的提案，类的静态属性只要在上面的实例属性写法前面，加上 `static` 关键字就可以了。

```js
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```