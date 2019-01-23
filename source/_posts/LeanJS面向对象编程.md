---
title: LeanJs「 ES5 」-- 面向对象编程
date: 2018-01-25 22:26:20
tags:
    - LeanJs
    - ES5   
category: Note
---

![Js](LeanJS面向对象编程/js.png)

<!--more-->

## 构造函数与 new 命令

面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

**对象是单个实物的抽象**

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

**对象是一个容器，封装了属性（property）和方法（method）**

属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

### new 

```js
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

使用 `new` 命令时，根据需要，构造函数也可以接受参数。

```js
var Vehicle = function (p) {
  this.price = p;
};

var v = new Vehicle(500);
```

`new` 命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。下面两行代码是等价的。

```js
var v = new Vehicle();
var v = new Vehicle;
```

**注意**

`new` 必须要使用,不使用 `new` 就不会产生实例对象，此时的 `this` 就会指向全局对象

```js
var Vehicle = function (){
  this.price = 1000;
};

var v = Vehicle();
v.price
// Uncaught TypeError: Cannot read property 'price' of undefined

price
// 1000
```

### new 的原理

- 创建一个空对象，作为将要返回的对象实例
- 将这个空对象的原型，指向构造函数的prototype属性
- 将这个空对象赋值给函数内部的this关键字
- 开始执行构造函数内部的代码

也就是说，构造函数内部，`this` 指的是一个新生成的空对象，所有针对 `this` 的操作，都会发生在这个空对象上。构造函数之所以叫「构造函数」，就是说这个函数的目的，就是操作一个空对象（即 `this` 对象），将其「构造」为需要的样子。

如果构造函数内部有 `return` 语句，而且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象；否则，就会不管 `return`语句，返回 `this` 对象。

但是，如果 `return` 语句返回的是一个跟 `this` 无关的新对象，`new` 命令会返回这个新对象，而不是 `this` 对象。这一点需要特别引起注意。
```js
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price
// 2000
```
上面代码中，构造函数 `Vehicle` 的 `return` 语句，返回的是一个新对象。**`new` 命令会返回这个对象，而不是 `this` 对象**。

**另一方面，如果对普通函数（内部没有 `this` 关键字的函数）使用 `new` 命令，则会返回一个空对象**。
```js
function getMessage() {
  return 'this is a message';
}

var msg = new getMessage();

msg // {}
typeof msg // "object"
```
上面代码中，`getMessage` 是一个普通函数，返回一个字符串。对它使用 `new` 命令，会得到一个空对象。这是因为 `new` 命令总是返回一个对象，要么是实例对象，要么是 `return` 语句指定的对象。本例中，`return` 语句返回的是字符串，所以 `new` 命令就**忽略了该语句**。

### new.target


函数内部可以使用 `new.target` 属性。如果当前函数是 `new` 命令调用，`new.target` 指向当前函数，否则为 `undefined`。
```js
function f() {
  console.log(new.target === f);
}

f() // false
new f() // true
```
使用这个属性，可以判断函数调用的时候，是否使用 `new` 命令。
```js
function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}

f() // Uncaught Error: 请使用 new 命令调用！
```
上面代码中，构造函数 `f` 调用时，没有使用 `new` 命令，就抛出一个错误。

### Object.create()

构造函数作为模板，可以生成实例对象。但是，有时只能拿到实例对象，而该对象根本就不是由构造函数生成的，这时可以使用 `Object.create()` 方法，直接以某个实例对象作为模板，生成一个新的实例对象。
```js
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```

## this

`this` 总是返回一个对象，就是返回属性和方法「当前」所在的对象

由于对象的属性和可以赋给另一个对象，所以相同属性所在的当前对象是可变的，即 `this` 的指向是可以改变的

```js
function printf(){
  return this.name;
}

var A = {
  name : 'Hutchins',
  print : printf
}

var B = {
  name : 'zhangsan',
  print : printf
}

A.print() //'Hutchins'
B.print() //'zhangsan'
```

在 `printf` 中使用了 `this` 关键字，随着 `printf` 所在的当前对象的不同，`this` 的指向也不同

只要函数被赋给另一个变量，`this` 的指向也会发生改变

```js
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var name = '李四';
var f = A.describe;
f() // "姓名：李四"
```

`A.describe` 被赋值给 `f` ，**内部的 `this` 就会指向 `f` 运行时所在的对象**(本例是顶层对象)

### 多层对象

如果某个方法位于多层对象的内部，这时 `this` 只是指向当前一层的对象，而不会继承更上面的层。

```js
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this);//b{..}
      console.log(this.p);
    }
  }
};

a.b.m() // undefined
```

`a.b.m` 方法在 `a` 对象的第二层，该方法内部的 `this` 不是指向 `a` ，而是指向 `a.b` 。这是因为实际执行的是下面的代码。

```js
var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};

(a.b).m() // 等同于 b.m()
```

如果这时将嵌套对象内部的方法赋值给一个变量，`this` 依然会指向全局对象。

```js
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined
```

上面代码中，`m` 是多层对象内部的一个方法。为求简便，将其赋值给 `hello` 变量，结果调用时，`this` 指向了顶层对象。为了避免这个问题，可以只将 `m` 所在的对象赋值给 `hello`，这样调用时，`this` 的指向就不会变。

```js
var hello = a.b;
hello.m() // Hello
```

### 避免多层this

由于 `this` 的指向是不确定的，所以切勿在函数中包含多层的 `this`。

```js
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
```

上面代码包含两层 `this` ，结果运行后，第一层指向该对象，第二层指向全局对象

一个解决方法是在第二层改用一个指向外层 `this` 的变量。

```js
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
```

上面代码定义了变量 `that` ，固定指向外层的 `this` ，然后在内层使用 `that`，就不会发生 `this` 指向的改变。

### 避免数组处理方法中的this

数组的 `map` 和 `foreach` 方法，允许提供一个函数作为参数。这个函数内部不应该使用 `this`。
```js
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()
// undefined a1
// undefined a2
```

上面代码中，`foreach` 方法的回调函数中的 `this` ，其实是指向 `window` 对象，因此取不到 `o.v` 的值。原因跟上一段的多层 `this` 是一样的，就是内层的 `this` 不指向外部，而指向**顶层对象**。

解决这个问题的一种方法，是使用中间变量。
```js
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}

o.f()
// hello a1
// hello a2
```
另一种方法是将 `this` 当作 `foreach` 方法的第二个参数，固定它的运行环境。

```js
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()
// hello a1
// hello a2
```

### 绑定this的方法

#### function.prototype.call()

`call` 方法的参数，应该是一个对象。如果参数为空、`null` 和 `undefined`，则默认传入全局对象。

```js
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

上面代码中，`a` 函数中的 `this` 关键字，如果指向全局对象，返回结果为 `123` 。如果使用 `call` 方法将 `this` 关键字指向 `obj` 对象，返回结果为 `456` 。可以看到，如果 `call` 方法没有参数，或者参数为 `null` 或 `undefined` ，则等同于指向全局对象。

如果 `call` 方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入 `call` 方法。

```js
var f = function () {
  return this;
};

f.call(5)
// Number {[[PrimitiveValue]]: 5}
```

上面代码中， `call` 的参数为5，不是对象，会被自动转成包装对象（Number的实例），绑定 `f` 内部的 `this`。

`call` 方法还可以接受多个参数。

```js
func.call(thisValue, arg1, arg2, ...)
```

`call` 的第一个参数就是 `this` 所要指向的那个对象，后面的参数则是函数调用时所需的参数。

`call` 方法的一个使用是调用对象的原始方法

```js
var num = 6;
num.toString()//"6"

Object.prototype.toString.call(num)//"[object Number]"
```

#### function.prototype.apply()

`apply` 方法的作用与 `call` 方法类似，也是改变 `this` 指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。

```js
func.apply(thisValue, [arg1, arg2, ...])
```

**将数组的空元素变为 `undefined`**

通过 `apply` 方法，利用 `Array` 构造函数将数组的空元素变成 `undefined`。

```js
Array.apply(null, ["a",,"b"])
// [ 'a', undefined, 'b' ]
```

空元素与 `undefined` 的差别在于，数组的 `forEach` 方法会跳过空元素，但是不会跳过 `undefined` 。因此，遍历内部元素的时候，会得到不同的结果。

```js
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
```

**类数组转换**

```js
var arr = Array.prototype.slice.call(arrayLike);
```

#### function.prototype.bind()

`bind` 方法用于将函数体内的 `this` 绑定到某个对象，然后返回一个新函数。 

`bind` 比 `call` 方法和 `apply` 方法更进一步的是，除了绑定 `this` 以外，还可以绑定原函数的参数。
```js
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);

newAdd(5)
// 20
```

上面代码中，`bind` 方法除了绑定 `this` 对象，还将 `add` 函数的第一个参数 `x` 绑定成 `5` ，然后返回一个新函数 `newAdd` ，这个函数只要再接受一个参数 `y` 就能运行了。

## prototype 对象

JavaScript 继承机制的设计就是，原型的所有属性和方法，都能被子对象共享。

```js
function Car(name){
  this.name = name;
}
Car.prototype.speed = 70;

var car1 = new Car('baoma');
var car2 = new Car('benchi');
car1.speed // 70
car2.speed // 70
```

在原型上定义了一个 `speed` 属性，所有 `Car` 实例对象都有这一个属性，如果实例对象也定义 `speed` 属性，那么就会有一个其自身的 `speed` 属性，不会影响其它原型上的属性和其它实例对象

### 原型链

所有对象的原型都可以追溯到 `Object.prototype` ，而 `Object.prototype` 的原型就是没有任何属性和任何方法的 `null` 对象。而 `null` 没有自己的原型

「原型链」的作用是，读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的 `Object.prototype` 还是找不到，则返回 `undefined`。

如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做「覆盖」（overriding）。

需要注意的是，一级级向上，在原型链寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

如果让某个函数的 `prototype` 指向一个数组，就意味着这个函数可以当作数组的构造函数，因为它生成的实例对象都可以调用数组的属性和方法

```js
var MyArray = function(){};

MyArray.prototype = new Array();

var mine = new myArray()
mine.push(1,2,3);

mine.length // 3
mine instanceof Array // true
```

### constructor

`prototype` 对象有一个 `constructor` 属性，默认指向 `prototype` 对象所在的构造函数。

由于 `constructor` 属性定义在 `prototype` 对象上面，意味着可以被所有实例对象继承

```js
function P(){};
var p = new P();

P.prototype.constructor === p.constructor//true
```

但是实例对象自身是没有 `constructor` 属性

```js
p.hasOwnProperty('constructor')//false
```

通过 `constructor` 的 `name` 属性可以获得构造函数的名字

```js
p.constructor.name // 'P'
```

`constructor` 属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改 `constructor` 属性，防止引用的时候出错。

修改原型对象时，一般要同时校正 `constructor` 属性的指向。

```js
// 避免这种写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 较好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好好的写法
C.prototype.method1 = function (...) { ... };
```

### instanceof

`instanceof` 运算符的左边是实例对象，右边是构造函数。它会检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。

`instanceof` 的原理是检查原型链，对于那些不存在原型链的对象，就无法判断。例如 `null`

`instanceof` 运算符只能用于对象，不适用原始类型的值。

对于 `undefined` 和 `null` ，`instanceOf` 运算符总是返回 `false` 。

### Object.getPrototypeOf()

`Object.getPrototypeOf` 方法返回一个对象的原型。这是获取原型对象的标准方法。

```js
Object.getPrototypeOf({}) === Object.prototype
```

### Object.setPrototypeOf()

`Object.setPrototypeOf` 方法可以为现有对象设置原型，返回一个新对象。

`Object.setPrototypeOf` 方法接受两个参数，第一个是现有对象，第二个是原型对象。

`new` 命令通过构造函数新建实例对象，实质就是将实例对象的原型，指向构造函数的 `prototype` 属性，然后在实例对象上执行构造函数。

```js
var F = function () {
  this.foo = 'bar';
};

var f = new F();

// 等同于
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);//绑定this
```

### Object.create()

```js
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
```

`Object.create` 方法的实质是新建一个构造函数 `F` ，然后让 `F.prototype` 属性指向参数对象 `obj` ，最后返回一个 `F` 的实例，从而实现让该实例继承 `obj` 的属性

使用 `Object.create` 方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。

```js
Object.create()
// TypeError: Object prototype may only be an Object or null

Object.create(123)
// TypeError: Object prototype may only be an Object or null
```

`object.create` 方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。

```js
var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
obj2.p
// 2
```

上面代码中，修改对象原型 `obj1` 会影响到新生成的实例对象 `obj2`。

除了对象的原型，`Object.create` 方法还可以接受第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

```js
var obj = Object.create({}, {
  p1: {
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
```

`Object.create` 方法生成的对象，继承了它的原型对象的构造函数。

```js
function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A // true
b instanceof A // true
```

上面代码中，`b` 对象的原型是 `a` 对象，因此继承了 `a` 对象的构造函数 `A`。

### Object.prototype.isPrototypeOf()

对象实例的 `isPrototypeOf` 方法，用来判断一个对象是否是另一个对象的原型。

只要某个对象处在原型链上，`isPrototypeOf` 都返回 `true`。

## Object 对象与继承

### Object.getOwnPropertyNames()

`Object.getOwnPropertyNames` 方法返回一个数组，**成员是对象本身的所有属性的键名，不包含继承的属性键名**，而且会将不可枚举的也一同获取到

### Object.keys()

`Object.keys` 也是返回一个数组，与 `Object.getOwnPropertyNames` 不同的是，**只能枚举出可枚举的自身属性**

### Object.prototype.hasOwnProperty()

对象实例的 `hasOwnProperty` 方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。

### in 运算符和 for…in 循环

`in` 运算符返回一个布尔值，表示一个对象是否具有某个属性。**它不区分该属性是对象自身的属性，还是继承的属性**。

`for...in`会枚举出所有**可枚举的属性，不论是自身的还是继承的**

## 面向对象编程模式

### 构造函数的继承

一个构造函数继承另一个构造函数

```js
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function(x,y){
  this.x+=x;
  this.y+=y;
  console.log('shape moved');
}
```

然后用 `Rectange` 构造函数继承 `Shape`

```js
//第一步 子类构造函数继承父类的实例 
//就相当于在子类构造函数中用子类this调用父类构造函数
function Rectange(){
  Shape.call(this);
}

//另一种写法
function Rectange(){
  this.base = Shape;
  this.base();
}

//子类继承父类的原型
Rectange.prototype = Object.create(Shape.prototype);
Rectange.prototype.constructor = Rectange;
```

在此处 `Rectange.prototype` 不能直接等于 `Shape.prototype` ，要等于 `Object.create(Shape.prototype)`，相当于等于 `Shape.prototype`的一个副本，直接等于的话后面在修改 `Rectange.prototype` 的时候会连 `Shape.prototype` 一同修改掉

也可以仅实现单个方法的继承

```js
Rectange.prototype.printf = function(){
  Shape.prototype.printf.call(this);
}
```

[关于模块，多重继承，封装私有变量](http://javascript.ruanyifeng.com/oop/pattern.html)








