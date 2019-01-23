---
title: LeanJs「 ES5 」-- 语法
date: 2018-01-23 21:24:07
tags: 
    - LeanJs
    - ES5
category: Note    
---
![Js](LeanJS基础语法/js.png)

<!--more-->

## 基本语法

### 语句

JavaScript 程序的执行单位为行「 line 」，也就是**一行一行**。一般情况下，每一行就是一个语句。


```js
var a = 1 + 3
```

这条语句先用 `var` 命令，声明了变量 `a`，然后将 `1 + 3` 的运算结果赋值给变量 `a`。

`1 + 3` 叫做表达式（expression），指一个为了得到返回值的计算式。语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。

### 变量

在 JS 中, **变量的声明与赋值是分开的两个步骤**

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升「 hoisting 」。

```JS
var a = 1
```

上面的代码实际上是

```js
var a
a = 1
```

这里强调一点

```js
var a = 1
var a
console.log(a)//1
```

如果用 `var` 声明一个已经存在的变量，是无效的。但是一旦进行了**赋值**操作，则会覆盖掉先前的值

### 区块

JavaScript 使用大括号，将多个相关的语句组合在一起，称为 「 区块 」（block）

```js
{
  var a = 1
}
console.log(a)//1
```

区块对于 `var` 命令不构成单独的作用域，与不使用区块没有任何区别。常见的区块`for`,`if`,`while`,`function`等

`function` 中的区块是函数作用域

### 标签

JavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置,通常与 `continue` 和 `break` 搭配

```js
top:
  for(var i=0; i<3; i++){
    if(i==1) continue top
    console.log(i)
  }
//0
//2
```

## 数据类型

### 概念

ES5中有六种数据类型:数值(number),字符串(string),布尔值(boolean),undefined,null,对象(object)

数值、字符串、布尔值这三种类型，合称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了。对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于 `undefined` 和 `null` ，一般将它们看成两个特殊值。

对象是最复杂的数据类型，又可以分成三个子类型。

狭义的对象(object),数组(array),函数(function)

### null 和 undefined

两者还是有一些细微的差别

**null表示"没有对象"，即该处不应该有值** 转为数值时为 0

```
1.作为函数的参数，表示为空
2.作为对象原型链的终点
3.为对象和值赋值为空
```

**undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义** 转为数值时为 ``NaN``

```
1.变量被声明了，但没有赋值时，就等于 undefined。
2.调用函数时，应该提供的参数没有提供，该参数等于 undefined。
3.对象没有赋值的属性，该属性的值为 undefined。
4.函数没有返回值时，默认返回 undefined。
```

### 布尔值

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为 `false`，其他值都视为 `true`。

```js
undefined
null
0
'' 或 ""
NaN
false
```

:heavy_exclamation_mark:注意

空对象和空数组也是 ``true``

## 数值

### 整数与浮点数

JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。

```js
1 === 1.0 // true
```

这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把 64 位浮点数，转成 32 位整数，然后再进行运算

```js
0.3 / 0.1 //2.9999999999999996
0.1 + 0.2 === 0.3 //false
```
#### 数值精度

精度最多只能到 53 个二进制位，这意味着，绝对值小于等于 2 的 53 次方的整数，即 -2^53 到 2^53

#### 数值范围

根据标准，64 位浮点数的指数部分的长度是 11 个二进制位，意味着指数部分的最大值是 2047（2 的 11 次方减 1）。也就是说，64 位浮点数的指数部分的值最大为2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为 2^1024 到2^-1023（开区间），超出这个范围的数无法表示。**正向溢出为 ``Infinity``,负向溢出为 0**

#### 科学计数法

小数点前数字多于 21 位，小数点后的零多于 5 个就会自动转换为科学计数法


#### +0 和 -0

几乎所有场合 +0 和-0都是相等的,只有当 +0 和 -0 作为分母的时候才不相同

```js
(1/+0) //+Infinity
(1/-0) //-Infinity
```

这两个的结果是不想等的

#### NaN

``NaN``是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。

特点

```js
0 / 0 //NaN
NaN === NaN//false
NaN 与任何数运算都是 NaN
NaN 不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于 Number
typeof NaN//'number'
```

### parseInt && parseFloat && Number

``parseInt`` 和 ``parseFloat`` 相似，用于将字符串转换成数值.特点如下

```
1.如果字符串头部有空格,空格会自动去除
2.是一个一个字符依次转换,如果碰到不能转换成数字的字符,就不在进行下去，返回已经转好的部分
3.如果字符串的第一次字符就不能转换成数字，则返回 NaN
4.``parseFloat``可以转换科学技术法为十进制数字
5.遇到空字符串转为 NaN
```

``Number`` 只要碰到字符串就返回 ``NaN``

### isNaN

判断一个值是否为 ``NaN``

但是，`isNaN` 只对数值有效，**如果传入其他值，会被先转成数值**。比如，传入字符串的时候，字符串会被先转成 `NaN`，所以最后返回 `true`，这一点要特别引起注意。也就是说，`isNaN` 为 `true` 的值，有可能不是 `NaN`，而是一个字符串。

因此判断是否为 ``NaN`` 可以利用它与自身不等的特性

```js
function myIsNaN(value){
  return value !== value
}
```

## 字符串

```js
'a
b
c'
// SyntaxError: Unexpected token ILLEGAL
```
上面代码将一个字符串分成三行，JavaScript 就会报错。

如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。

```js
var str = 'a\
b\
c'
str // abc
```

字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）。**但是仅仅是相似而已，无法改变字符串中的单个字符** ``length``属性也是如此

### 字符集

每个字符在 JavaScript 内部都是以 16 位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为 16 位长度，即 2 个字节。由于历史遗留问题,JavaScript只支持两个字节的字符，**四个字节的字符会识别成两个字符**

### Base64转码

```js
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
```

但这两种方法不适合非ASCII码的字符,要加一个转码环节

```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str))
}

function b64Decode(str) {
  return decodeURIComponent(atob(str))
}
```

## 对象

### 值传递

[谈谈值传递](https://blog.haoqinzz.cn/2017/07/25/%E8%B0%88%E8%B0%88%E5%80%BC%E4%BC%A0%E9%80%92/#more)

### 表达式还是语句？

```js
{foo:123}
```

JavaScript 引擎读到上面这行代码，会发现可能有两种含义。第一种可能是，这是一个表达式，表示一个包含 `foo` 属性的对象；第二种可能是，这是一个语句，表示一个代码区块，里面有一个标签 `foo`，指向表达式 `123`。

为了避免这种歧义，JavaScript 规定，如果行首是大括号，一律解释为语句（即代码块）。如果要解释为表达式（即对象），必须在大括号前加上圆括号。

```js
({foo:123})
```

在``eval``中可以体现出差异

```js
eval('{foo: 123}') // 123
eval('({foo: 123})') // {foo: 123}
```

### 属性(键名)

可以采用点运算符和方运算符

:heavy_exclamation_mark:注意

数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。

```js
var str = 'foo'
var obj = {
  123: 2,
  foo: 6,
  str: 5
}
obj.123//错误
obj[123]//2
obj[str]//6
obj['str']//5
```

### 查看所有属性

```js
var obj = {
  123: 2,
  foo: 6,
  str: 5
}
Object.keys(obj)//(3) ["123", "foo", "str"]
```

### 删除属性

``delete``用于删除对象的属性

```js
var obj = {
  123: 2,
  foo: 6,
  str: 5
}
delete obj.foo
obj.foo //undefined
```

:heavy_exclamation_mark:注意

用 ``delete`` 删除一个属性,不会报错,而且还会返回 `true`,因此不能根据``delete``返回的结果来判断是否有该属性

只有一种情况,``delete`` 返回 ``false``,那就是该属性存在，且不得删除

``delete``命令只能删除对象本身的属性，无法删除继承的属性


### in运算符

``in`` 运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回 `true`，否则返回 `false`。

```js
var obj = {
  123: 2,
  foo: 6,
  str: 5
}

'foo' in obj//true
```

但是 ``in`` 运算符无法判断哪些属性是自身的，哪些属性是继承的。他都会返回 ``true``

:coffee: ``for..in..`` 就是用来遍历对象的所有属性

### with

操作同一个对象的多个属性

```js
// 例一
var obj = {
  p1: 1,
  p2: 2,
}
with (obj) {
  p1 = 4
  p2 = 5
}
// 等同于
obj.p1 = 4
obj.p2 = 5

// 例二
with (document.links[0]){
  console.log(href)
  console.log(title)
  console.log(style)
}
// 等同于
console.log(document.links[0].href)
console.log(document.links[0].title)
console.log(document.links[0].style)
```

如果``with``区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。

这就造成一个弊端，就是绑定对象不明确,所以不推荐使用

## 数组

本质上就是对象

由于数组本质上就是一个对象,所以可以为数组添加属性，但是这并不影响 ``length`` 属性的值。因为 ``length`` 属性的值就是最大的数字键加 1,如果这个数组没有数字键，那它的 ``lenth`` 保持为 0

:heavy_exclamation_mark:注意

如果键名是超出范围的数值，也会被转换成字符串

### 空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。

空位不会影响 `length` 属性

```js
var arr = [1,,3] //length 3 
var arr1 = [1,2,3,] //length 3
```

数组的空位可以读取，为 ``ndefined``，但是空位用遍历的是读取不到的，而``undefined``是可以读取出来的

使用``delete``删除一个数组成员，会形成空位，不会影响``length``

### 类数组对象

如果一个对象的所有键名都是正整数或零，并且有 `length` 属性，那么这个对象就很像数组，语法上称为 “类似数组的对象”（array-like object）

典型的类数组对象

```js
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b')

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3')
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

用数组的``slice``方法可以转换成真正的数组

```js
var arr = Array.prototype.slice.call(arrayLike)
```

`slice` 为什么可以转换成数组呢，`slice` 内部可能执行了如下的代码

```js
Array.prototype.slice = function(start,end){
     var result = new Array()
     start = start || 0
     end = end || this.length //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
     for(var i = start; i < end; i++){
          result.push(this[i])
     }
     return result
}
```

还可以使用``call``方法使类数组使用数组的方法

```js
Array.prototype.forEach.call(arrayLike,funtion(){..})
```

但是这种方法要比原生的 ``forEach`` 要慢，因此还是推荐先转换成数组再用``forEach``

## 函数

### 第一等公民

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。**凡是可以使用值的地方，就能使用函数**。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。

```js
function add(x,y){
  return x+y
}
```

### 函数名的提升

```js
var f = function(){
  console.log(1)
}
function f(){
  console.log(2)
}
f()//1
```
由于存在函数名的提升，其实会变成以下样子

```js
var f

function f(){
  console.log(2)
}
f = function(){
  console.log(1)
}
f()
```

函数声明形式等同于赋值语句声明同一个函数，所以后面执行的会**覆盖**先前相同的函数.


### 不能在条件语句中声明函数

根据 ES5 的规范，不得在非函数的代码块中声明函数，最常见的情况就是if和try语句。

要达到在条件语句中定义函数的目的，只有使用函数表达式。

```js
if (false) {
  var f = function () {}
}

f() // undefined
```

### name

函数``name``属性返回紧跟在``function``关键字之后的那个函数名

```js
function f1() {}
f1.name // 'f1'

var f2 = function () {}
f2.name // ''

var f3 = function myName() {}
f3.name // 'myName'
```

上面代码中，函数的``name``属性总是返回紧跟在``function``关键字之后的那个函数名。对于f2来说，返回空字符串，匿名函数的``name``属性总是为空字符串；对于f3来说，返回函数表达式的名字（**真正的函数名还是f3，myName这个名字只在函数体内部可用**）。

### length

函数的``length``属性返回函数预期传入的参数个数，即**函数定义之中的参数个数**。在之后调用的话，无论输入多少个参数,``length``属性始终返回函数定义时的参数个数

```js
function len(a,b){
  len.length //2
}
```

``length``属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的「重载」（overload）。

### toString

函数的 `toString` 方法返回一个字符串，内容是函数的源码,注释也可以返回.

[函数基础](https://blog.haoqinzz.cn/2017/08/17/js%E5%87%BD%E6%95%B0%E5%9F%BA%E7%A1%80/)

### 函数作用域

:heavy_exclamation_mark: 注意

函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其**声明时所在的作用域，与其运行时所在的作用域无关**。

对于 `var` 命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。

```js
var a = 1
var x = function () {
  console.log(a)
}

function f() {
  var a = 2
  x()
}

f() // 1
```

x 函数定义的时候就是全局作用域,x 函数内部的 a 不会到 f 函数中取 a 的值。

```js
var x = function () {
  console.log(a)
}

function y(f) {
  var a = 2
  f()
}

y(x)
// ReferenceError: a is not defined
```

上面代码将函数 x 作为参数，传入函数 y。但是，函数 x 是在函数 y 体外声明的，作用域绑定外层，因此找不到函数 y 的内部变量 a，导致报错。

```js
function foo() {
  var x = 1
  function bar() {
    console.log(x)
  }
  return bar
}

var x = 2
var f = foo()
f() // 1
```

上面代码中，函数``foo``内部声明了一个函数`bar`，`bar`的作用域绑定`foo`。当我们在`foo`外部取出`bar`执行时，变量`x`指向的是`foo`内部的`x`，而不是`foo`外部的`x`。正是这种机制，构成了下文要讲解的「闭包」现象。

### 传递方式

```js
var a = 2
function b(a){
  a = 3
}
b()
a//2
```

```js
var a = 2
function b(){
  a = 3
}
b()
a//3
```

上面代码中，变量`a`是一个原始类型的值，传入函数`b`的方式是传值传递。因此，在函数内部，`a`的值是原始值的拷贝，无论怎么修改，都不会影响到原始值。

但是，如果函数参数是**复合类型的值（数组、对象、其他函数）**，传递方式是传址传递（pass by reference）。也就是说，传入函数的原始值的地址，因此在函数**内部修改参数**，将会影响到原始值。

### 同名参数

如果有同名参数,则取最后那个值
```js
function f(a, a) {
  console.log(a)
}

f(1, 2) // 2
```
上面代码中，函数f有两个参数，且参数名都是a。取值的时候，以后面的a为准，即使后面的a没有值或被省略，也是以其为准。

```js
function f(a, a) {
  console.log(a)
}

f(1) // undefined
```

调用函数f的时候，没有提供第二个参数，a的取值就变成了undefined。这时，如果要获得第一个a的值，可以使用arguments对象。

```js
function f(a, a) {
  console.log(arguments[0])
}

f(1) // 1
```


### arguments

函数体内是严格模式，这时修改``arguments``对象就是无效的。

``arguments``为类数组对象,要转换成真正的数组

```js
var args = Array.prototype.slice.call(arguments)

// 或者
var args = []
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i])
}

```

``arguments``对象带有一个`callee`属性，返回它所对应的原函数。调用自身函数，不常用。

### 闭包

闭包就是将函数内部和函数外部连接起来的一座桥梁

:heavy_exclamation_mark: 注意

外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题


### 立即调用的函数表达式（IIFE）

在 Javascript 中，圆括号``()``是一种运算符，跟在函数名之后，表示调用该函数。比如，``print()``就表示调用``print``函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

```js
function(){ /* code */ }()
// SyntaxError: Unexpected token (
```

产生这个错误的原因是，``function``这个关键字即可以当作语句，也可以当作表达式。

```js
// 语句
function f() {}

// 表达式
var f = function f() {}
```

为了避免解析上的歧义，JavaScript 引擎规定，如果``function``关键字出现在行首，一律解释成语句。因此，JavaScript引擎看到行首是`function`关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决方法就是**不要让`function`出现在行首**，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

```js
(function(){ /* code */ }())
// 或者
(function(){ /* code */ })()
```

上面两种写法都是以圆括号开头，(不一定非要是圆括号)引擎就会认为后面跟的是一个表示式，而不是函数定义语句，所以就避免了错误。这就叫做「立即调用的函数表达式」（Immediately-Invoked Function Expression），简称 IIFE。

注意，上面两种写法最后的分号都是必须的。如果省略分号，遇到连着两个 IIFE，可能就会报错

```js
// 报错
(function(){ /* code */ }())
(function(){ /* code */ }())
```

上面代码的两行之间没有分号，JavaScript 会将它们连在一起解释，**将第二行解释为第一行的参数**。

### eval

`eval`命令的作用是，将字符串当作语句执行。

放在`eval`中的字符串，应该有独自存在的意义，不能用来与`eval`以外的命令配合使用

`eval`没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

```js
var a = 2
eval('a=3')
a//3
```

如果使用严格模式，`eval`内部声明的变量，不会影响到外部作用域。但是还是会修改当前作用域下的变量

```js
'use strict'
var a = 2
eval('a=3')
a//3

'use strict'
eval('var b = 4')
b//Uncaught ReferenceError: b is not defined
```

此外，`eval`的命令字符串不会得到 JavaScript 引擎的优化，运行速度较慢。这也是一个不应该使用它的理由。

常情况下，`eval`最常见的场合是解析 JSON 数据字符串，不过正确的做法应该是使用浏览器提供的`JSON.parse`方法。

JavaScript 引擎内部，`eval`实际上是一个引用，默认调用一个内部方法。这使得`eval`的使用分成两种情况，一种是像上面这样的调用`eval(expression)`，这叫做「直接使用」，这种情况下`eval`的作用域就是当前作用域。除此之外的调用方法，都叫「间接调用」，此时`eval`的作用域总是**全局作用域**。

```js
var a = 1

function f() {
  var a = 2
  var e = eval
  e('console.log(a)')
}

f() // 1
```
上面代码中，`eval`是间接调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的`a`为全局变量。

`eval`的间接调用的形式五花八门，**只要不是直接调用，都属于间接调用**

[图解作用域和闭包](https://blog.haoqinzz.cn/2017/08/20/%E5%9B%BE%E8%A7%A3%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%8F%8A%E9%97%AD%E5%8C%85/#more)

## 运算符

### 加法运算符

```js
3+5+'6' //86
'6'+3+5 //635
```

从左到右的运算顺序，字符串或字符出现的顺序将导致结果的不同,减法除法乘法运算符都会先将字符串转换成数字再进行运算。

如果运算是对象，必须先转换成原始类型，然后再进行相加

```js
var obj = { p: 1 }
obj + 2 // "[object Object]2"
```

`obj`转换成原始类型为`[object Object]`

对象转换成原始类型，规则如下

首先，自动调用`valueOf`方法,一般来说`valueOf`方法会返回对象本身，然后再调用`toString()`方法将其转换为字符串

```js
var obj = {p:1}
obj.valueOf().toString()//[object Object]
```

当知道了这个规则之后，就可以自己定义`valueOf`和`toString`方法来得到自己想要的结果

```js
var obj = {
  valueOf: function () {
    return 1
  }
}

obj + 2 // 3
```

上面代码中，我们定义`obj`对象的`valueOf`方法返回1，于是`obj` + 2就得到了3。这个例子中，由于`valueOf`方法直接返回一个原始类型的值，所以不再调用`toString`方法。

下面是自定义`toString`方法的例子。
```js
var obj = {
  toString: function () {
    return 'hello'
  }
}

obj + 2 // "hello2"
```

上面代码中，对象`obj`的`toString`方法返回字符串`hello`。前面说过，只要有一个运算子是字符串，加法运算符就变成连接运算符，返回连接后的字符串。

:heavy_exclamation_mark: 注意

这里有一个特例，如果运算子是一个`Date`对象的实例，那么会优先执行`toString`方法
。
```js
var obj = new Date()
obj.valueOf = function () { return 1 }
obj.toString = function () { return 'hello' }

obj + 2 // "hello2"
```

上面代码中，对象`obj`是一个`Date`对象的实例，并且自定义了`valueOf`方法和`toString`方法，结果`toString`方法优先执行。


### 比较运算符

字符串比较是按照字典顺序，如果第一个相等就比较下一个

与原始类型比较的话，如果不是数字，都是先用`Number` 转成数字再进行比较。其中和`NaN`比较都返回`false`

与非原始类型比较就先转换成原始类型，规则还是复合类型先调用`valueOf`再调用`toString`，`Date`还是一样特殊

### === && == 

`===`先会比较两个值的类型，如果类型不相同，则直接返回`false`,`==`也是先比较类型，如果类型不相同，他会先转换成同一类型的值然后再进行`===`比较

#### ===

不同类型直接返回`false`

都是原始类型值相等返回`true`,`NaN`不严格等于任何值也不和自己严格相等

都是复合类型不是判断他们的值是否相等，而是判断他们指向的地址是否相等

`undefined`和`null`只与自己严格相等

`!==`是对`===`的取反

#### == 

相同类型的话和`===`判断算法相同

原始类型的数据会转换成数值来比较，调用`Number`方法

复合类型和原始类型进行比较，复合类型先转换成原始类型

```js
//与数字比较
[1] == 1 // true
// 等同于 Number([1]) == 1

//与字符串比较
[1] == '1' // true
// 等同于 String([1]) == '1'

//与布尔值比较
[1] == true // true
// 等同于 Number([1]) == Number(true)
```

`undefined`和`null`与其它类型比较时都为`false`,**相互比较时为`true`**

`!=`是对`==`结果的取反

### 取反

任何类型的数值经过`!`后都变成了布尔值，`!!x`相当于`Boolean(x)`

### 位运算

位运算符只对整数起作用，如果一个运算子不是整数，**会自动转为整数后再执行**。另外，虽然在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数。

```js
i = i | 0 //就是将i转为32位的整数
~~i //对i取整 方法最快
i^0//对i取整
```

#### 异或

异或运算（^）在两个二进制位不同时返回1，相同时返回0。

```js
//用来交换
var a = 1
var b = 2
a ^=b,b^=a,a^=b
a//2
b//1
```

#### 左移右移

```js
4 << 1
```

左移1为 4的二进制为100，左移为1000，结果就为8，所以`x`左移`n`位相当于`x`乘`2`的`n`次方

### void

`void`运算符的作用是执行一个表达式，然后不返回任何值，或者说返回`undefined`。


```js
<a href="javascript: void(document.form.submit())">
  提交
</a>
```

`void`执行速度快，执行提交后不返回任何值所以也阻止了`a`标签的默认跳转

### 逗号运算符

```js
'a', 'b' // "b"

var x = 0
var y = (x++, 10)
x // 1
y // 10
```

### 优先级

根据语言规格，这五个运算符的优先级从高到低依次为：小于等于`<=`、严格相等`===`、或`||`、三元`?:`、等号`=`。因此上面的表达式，实际的运算顺序如下。

### 圆括号

圆括号不是运算符，而是一种**语法结构**。它一共有两种用法：一种是把表达式放在圆括号之中，提升运算的优先级；另一种是跟在函数的后面，作用是调用函数。

圆括号中只能放置表达式，不能放置语句，如果将语句放置在圆括号中会报错


## 数据类型的转换

### Number

`Number`转换对象时，将返回`NaN`，除非是有单个数值的数组

`Number`转换的规则

第一步，调用对象自身的`valueOf`方法。如果返回原始类型的值，则直接对该值使用`Number`函数，不再进行后续步骤。

第二步，如果`valueOf`方法返回的还是对象，则改为调用对象自身的`toString`方法。如果`toString`方法返回原始类型的值，则对该值使用`Number`函数，不再进行后续步骤。

第三步，如果`toString`方法返回的是对象，就报错。

### String

`String`方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

`String`方法背后的转换规则，与`Number`方法基本相同，只是互换了`valueOf`方法和`toString`方法的执行顺序。

### Boolean

`Boolean`函数可以将任意类型的值转为布尔值。

除了以下为`false`，其余都为`true`

```
undefined
null
''
+0 -0
NaN
```

:heavy_exclamation_mark:注意

`undefined`转换成数字为`NaN` `null`为0

## 错误(Error)

### SyntaxError

``SyntaxError``对象是解析代码时发生的语法错误。

```js
// 变量名错误
var 1a
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello')
// Uncaught SyntaxError: Unexpected string      
```

### ReferenceError

``ReferenceError``对象是引用一个不存在的变量时发生的错误。

```js
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined
```

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者`this`赋值。

```js
// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment

// this 对象不能手动赋值
this = 1
// ReferenceError: Invalid left-hand side in assignment
```

### RangeError

`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

### TypeError 

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。  

### URIError

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

### EvalError

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

### try .. catch .. finally

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。

```js
try{
  
}catch(err){//接受错误类型
  //处理错误
}finally{
  //不管出现任何错误都执行
}
```


