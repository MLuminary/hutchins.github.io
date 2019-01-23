---
title: LearnJS标准库
date: 2018-01-24 22:26:20
tags:
    - LeanJs
    - ES5   
category: Note
---

![Js](LearnJS标准库/js.png)

<!--more-->

# 标准库

## Object

### Object()

`Object()`本身是一个函数，可以将任意值转换为对象

```js
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);
```

如果要被转换的值为原始类型，`Object`会将其转换成对应的包装类型，如果要转换的值是对象，它总是返回该对象，即不用转换

```js
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true
```

因此可以用`Object`来判断是否为对象

```js
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true

function isObj(value){
  return value === Object(value);
}
```

### Object构造函数

```js
var obj = new Object();

//等同于

var obj = {};
```

`new Object(value)`中也可以传入值，和`Object(value)`相同，只不过在语义上有所差别。前者表示生成一个对象，它的值为`value`，后者表示将`value`转换为对象

### 静态方法

部署在`Object`对象自身的方法

#### Object.keys() && Object.getOwnPropertyNames()

`Object.keys`方法和`Object.getOwnPropertyNames`方法都用来遍历对象的属性。

`Object.keys()`和`Object.getOwnPropertyNames()`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

`Object.getOwnPropertyNames()`还可以遍历出不可枚举的属性，`Object.keys()`不可以

```js
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

#### Object.prototype.toString

`toString`方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

数组、字符串、函数、Date对象都分别部署了自定义的`toString`方法

可以用来准确的判断数据类型

```js
Object.prototype.toString.call(value)
```

这样可以任意调用`Object.prototype.toString`方法

各种类型的返回结果

```
数值：返回[object Number]。
字符串：返回[object String]。
布尔值：返回[object Boolean]。
undefined：返回[object Undefined]。
null：返回[object Null]。
数组：返回[object Array]。
arguments 对象：返回[object Arguments]。
函数：返回[object Function]。
Error 对象：返回[object Error]。
Date 对象：返回[object Date]。
RegExp 对象：返回[object RegExp]。
其他对象：返回[object Object]。
```

利用这个可以写出比`typeof`更加准确的类型判断函数

```js
function checkType(value){
  var s = Object.prototype.toString.call(value);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
```

JavaScript中`match`函数方法返回的数组有三个属性：`input`、`index`和`lastIndex`。`Input` 属性包含整个的被查找字符串。`Index` 属性包含了在整个被查找字符串中匹配的子字符串的位置。`LastIndex` 属性包含了最后一次匹配中最后一个字符的下一个位置。如果没有设置全局标志 `g`，数组的0元素包含整个匹配，而第 1 到 n 元素包含了匹配中曾出现过的任一个**子匹配(在其中用过圆括号)**。这相当于没有设置全局标志的 `exec` 方法。如果设置了全局标志，元素0到n中包含所有匹配

#### Object.prototype.toLocaleString

返回值和`Object.prototype.toString`相同，用来留一个出口返回针对地域的某些特定的值.

## Array对象

### 创建

```js
var arr = [];

var arr = new Array()

var arr = new Array(3);
arr.length // 3

arr[0] // undefined
arr[1] // undefined
arr[2] // undefined

0 in arr // false
1 in arr // false
2 in arr // false
```

注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回`undefined`，但实际上该位置没有任何值。虽然可以取到`length`属性，但是取不到键名。

### 方法

#### 改变原数组

pop

`pop`方法用于删除数组的最后一个元素，并返回该元素

```js
[].pop()//undefined
```

push

`push`方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度

shift

`shift`方法用于删除数组的第一个元素，并返回该元素

unshift

`unshift`方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度

reverse

`reverse`方法用于颠倒数组中元素的顺序，返回改变后的数组

splice

`splice`方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素

```js
arr.splice(index, count_to_remove, addElement1, addElement2, ...)
```

sort

`sort`方法对数组成员进行排序，默认是按照字典顺序排序.

```js
[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28 },
//   { name: "张三", age: 30 }
// ]
```

#### 不改变原数组

join

`join`方法以参数作为分隔符，将所有数组成员组成一个字符串返回。如果不提供参数，默认用逗号分隔。

```js
[undefined,null].join('#')//#
```

如果数组成员是`undefined`，`null`，或空位会被转换成空字符串

concat

`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组.

slice

`slice`方法用于提取原数组的一部分，返回一个新数组.

```js
arr.slice(start_index,end_index);//左闭右开
```

也可以用来将类数组转换成数组

```js
Array.prototype.slice.call(arrayLike);
```

map

`map`方法对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。

```js
arr.map(function(item,index,arr){
  //当前成员,当前位置,数组本身
},arr)//花括号后的arr表示回调函数的this指向
//只有item是必须存在的
```

`map`方法不跳过`undefined`和`null`，但是会跳过空位，碰到空位不执行任何函数，直接跳过.

forEach

`forEach`方法与`map`方法很相似，也是遍历数组的所有成员，执行某种操作，但是`forEach`方法一般不返回值，只用来操作数据。如果需要有返回值，一般使用`map`方法。

```js
arr.forEach(function(item,index,arr){
  //当前成员,当前位置,数组本身
},arr)//花括号后的arr表示回调函数的this指向
//只有item是必须存在的
```

filter

`filter`方法的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回

```js
arr.filter(function(item,index,arr){
  //当前成员,当前位置,数组本身
},arr)//花括号后的arr表示回调函数的this指向
//只有item是必须存在的
```

some

`some`方法是只要有一个数组成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则`false`。

```js
arr.some(function(item,index,arr){
  //当前成员,当前位置,数组本身
},arr)//花括号后的arr表示回调函数的this指向
//只有item是必须存在的
```

every

`every`方法则是所有数组成员的返回值都是`true`，才返回`true`，否则`false`。

```js
arr.some(function(item,index,arr){
  //当前成员,当前位置,数组本身
},arr)//花括号后的arr表示回调函数的this指向
//只有item是必须存在的
```

reduce && reduceRight

`reduce`方法和`reduceRight`方法依次处理数组的每个成员，最终累计为一个值。

它们的差别是，`reduce`是从左到右处理（从第一个成员到最后一个成员），`reduceRight`则是从右到左（从最后一个成员到第一个成员），其他完全一样。

这两个方法的第一个参数都是一个函数。该函数接受以下四个参数。

```
累积变量，默认为数组的第一个成员
当前变量，默认为数组的第二个成员
当前位置（从0开始）
原数组
```

这四个参数之中，只有前两个是必须的，后两个则是可选的。

indexOf && lastIndexOf

`indexOf`方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

`lastIndexOf`方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

`indexOf`方法还可以接受第二个参数，表示搜索的开始位置。

如果数组中包含`NaN`，这两个方法不适用，即无法确定数组成员是否包含`NaN`

这是因为这两个方法内部，使用严格相等运算符`===`进行比较，而`NaN`是唯一一个不等于自身的值

## 包装对象

所谓「包装对象」，就是分别与数值、字符串、布尔值相对应的`Number`、`String`、`Boolean`三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

```js
var r = new Number(123);
typeof r //object
```

如果不作为构造函数调用（即调用不加`new`），是将其它类型转换为`number`,`string`,`boolean`

### 原始类型的自动转换

原始类型的值，可以自动当作对象调用，即调用各种对象的方法和参数。这时，JavaScript引擎会自动将原始类型的值转为包装对象，**在使用后立刻销毁**。

因为立即销毁，所以这个临时对象是只读的，无法进行修改，所以无法添加新属性。

```js
var str = 'abc';
str.length // 3

// 等同于
var strObj = new String(str)
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
strObj.length // 3
```

`[[PrimitiveValue]]`保存字符串的原始值。这个`[[PrimitiveValue]]`内部属性，外部是无法调用，仅供`ValueOf`或`toString`这样的方法内部调用。

### Boolean对象

`false`对应的包装对象的实例,布尔运算结果是`true`

```js
if (new Boolean(false)) {
  console.log('true');
} // true

if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出
```

上面代码的第一个例子之所以得到`true`，是因为`false`对应的包装对象实例是一个**对象**，进行逻辑运算时，被自动转化成布尔值`true`（因为所有对象对应的布尔值都是`true`）。而实例的`valueOf`方法，则返回实例对应的原始值，本例为`false`。

## Number

### 属性

```js
Number.POSITIVE_INFINITY：正的无限，指向Infinity。
Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
Number.NaN：表示非数值，指向 NaN。
Number.MAX_VALUE：表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。
Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。
```

### 方法

#### toString

接受参数可以转为相应进制的字符串

```js
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

#### toFixed

`toFixed`方法的参数为指定的小数位数，有效范围为0到20，超出这个范围将抛出`RangeError`错误。

#### toExponential

`toExponential`方法的参数表示小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个`RangeError`。

#### toPrecision

`toExponential`方法的参数表示小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个`RangeError`。


## String

### String.fromCharCode

该方法的参数是一系列`Unicode`码点，返回对应的字符串。

该方法不支持`Unicode`码点大于`0xFFFF`的字符，即传入的参数不能大于`0xFFFF`。

### charAt

可以用下标代替，如果参数为负数，或大于等于字符串的长度，`charAt`返回空字符串。

### charCodeAt

`charCodeAt`方法返回给定位置字符的`Unicode`码点（十进制表示），相当于`String.fromCharCode()`的逆操作

:exclamation: 注意

如果没有任何参数，`charCodeAt`返回首字符的`Unicode`码点。

`charCodeAt`方法返回的`Unicode`码点不大于`65536（0xFFFF）`，也就是说，只返回两个字节的字符的码点。如果遇到`Unicode`码点大于`65536`的字符，必需连续使用两次`charCodeAt`，不仅读入`charCodeAt(i)`，还要读入`charCodeAt(i+1)`，将两个16字节放在一起，才能得到准确的字符。

如果参数为负数，或大于等于字符串的长度，`charCodeAt`返回`NaN`。

### indexOf()，lastIndexOf()

这两个方法用于确定一个字符串在另一个字符串中的位置，都返回一个整数，表示匹配开始的位置。如果返回`-1`，就表示不匹配。两者的区别在于，`indexOf`从字符串头部开始匹配，`lastIndexOf`从尾部开始匹配。

### concat

`concat`方法用于连接两个字符串，返回一个新字符串，不改变原字符串。

### slice

`slice`方法用于从原字符串取出子字符串并返回，不改变原字符串。

它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。左闭右开

如果参数是负值，表示从结尾开始倒数计算的位置，即该**负值加上字符串长度**。

如果第一个参数大于第二个参数，slice方法返回一个空字符串。

### substring

`substring`方法用于从原字符串取出子字符串并返回，不改变原字符串

`substring`方法的第一个参数表示子字符串的开始位置，第二个位置表示结束位置。

如果第二个参数大于第一个参数，`substring`方法会自动更换两个参数的位置。

如果参数是负数，`substring`方法会自动将负数转为0。

不建议使用，优先使用`slice`

### substr

`substr`方法用于从原字符串取出子字符串并返回，不改变原字符串。

`substr`方法的第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。

如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。

### trim

`trim`方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。

该方法去除的不仅是空格，还包括制表符`\t、\v`、换行符`\n`和回车符`\r`。

### toLowerCase()，toUpperCase()

`toLowerCase`方法用于将一个字符串全部转为小写，`toUpperCase`则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

### localeCompare()

`localeCompare`方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

### match

`match`方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回`null`。

返回数组还有`index`属性和`input`属性，分别表示匹配字符串开始的位置和原始字符串。

### search

`search`方法的用法等同于`match`，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

### replace

`replace`方法用于替换匹配的子字符串，一般情况下只替换第一个匹配

### split

`split`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

## Math

### 属性

```js
Math.E：常数e。
Math.LN2：2的自然对数。
Math.LN10：10的自然对数。
Math.LOG2E：以2为底的e的对数。
Math.LOG10E：以10为底的e的对数。
Math.PI：常数Pi。
Math.SQRT1_2：0.5的平方根。
Math.SQRT2：2的平方根。
```

### 方法

```js
Math.abs()：绝对值
Math.ceil()：向上取整
Math.floor()：向下取整
Math.max()：最大值
Math.min()：最小值
Math.pow()：指数运算
Math.sqrt()：平方根
Math.log()：自然对数
Math.exp()：e的指数
Math.round()：四舍五入
Math.random()：随机数 
```

#### Math.random

返回任意长度的字符

```js
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i=0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // "NdQKOr"
```

### 三角函数的方法

```js
Math.sin()：返回参数的正弦
Math.cos()：返回参数的余弦
Math.tan()：返回参数的正切
Math.asin()：返回参数的反正弦（弧度值）
Math.acos()：返回参数的反余弦（弧度值）
Math.atan()：返回参数的反正切（弧度值）
```

## Date

### new Date()

`Date`对象接受从`1970年1月1日00:00:00 UTC`开始计算的毫秒数作为参数。这意味着如果将`Unix`时间戳（单位为秒）作为参数，必须将`Unix`时间戳乘以`1000`。

`Date`对象还接受一个日期字符串作为参数，返回所对应的时间。

日期字符串的完整格式是`month day, year hours:minutes:seconds`，比如`December 25, 1995 13:30:00`。如果省略了小时、分钟或秒数，这些值会被设为0。

注意，在ES5之中，如果日期采用连词线`-`格式分隔，且具有前导0，JavaScript会认为这是一个`ISO`格式的日期字符串，导致返回的时间是以`UTC`时区计算的。

```js
new Date('2014-01-01')
// Wed Jan 01 2014 08:00:00 GMT+0800 (CST)

new Date('2014-1-1')
// Wed Jan 01 2014 00:00:00 GMT+0800 (CST)
```

上面代码中，日期字符串有没有前导0，返回的结果是不一样的。如果没有前导0，JavaScript引擎假设用户处于本地时区，所以本例返回0点0分。如果有前导0（即如果你以`ISO`格式表示日期），就假设用户处于格林尼治国际标准时的时区，所以返回8点0分。但是，ES6改变了这种做法，规定凡是没有指定时区的日期字符串，一律认定用户处于本地时区。

总之，对于`YYYY-MM-DD`形式的字符串，JavaScript引擎可能会将其当作`ISO`格式来解析，采用格林尼治时区作为计时标准；而对于其他格式的日期字符串，一律视为非ISO格式，采用本地时区作为计时标准。

```js
new Date('2014-12-11')
// Thu Dec 11 2014 08:00:00 GMT+0800 (CST)

new Date('2014/12/11')
// Thu Dec 11 2014 00:00:00 GMT+0800 (CST)
```

上面代码中，第一个日期字符串是ISO格式，第二个不是，导致生成的时间不一样。

`Date`对象还可以接受多个整数作为参数，依次表示年、月、日、小时、分钟、秒和毫秒。如果采用这种格式，**最少需要提供两个参数（年和月）**，其他参数都是可选的，默认等于0。因为如果只使用「年」这一个参数，`Date`对象会将其解释为毫秒数。

### 日期的运算

类型转换时，`Date`对象的实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期对象进行减法运算，返回的就是它们间隔的毫秒数；进行加法运算，返回的就是连接后的两个字符串。

### Date对象的静态方法                                                                            
#### Date.now

`Date.now`方法返回当前距离1970年1月1日 00:00:00 UTC的毫秒数（Unix时间戳乘以1000）。

```js
Date.now() // 1364026285194
```
如果需要比毫秒更精确的时间，可以使用`window.performance.now()`。它提供页面加载到命令运行时的已经过去的时间，可以精确到千分之一毫秒。

```js
window.performance.now() // 21311140.415
```

#### Date.parse

`Date.parse`方法用来解析日期字符串，返回距离1970年1月1日 00:00:00的毫秒数

如果解析失败，返回`NaN`。

#### Date.UTC

默认情况下，`Date`对象返回的都是当前时区的时间。`Date.UTC`方法可以返回`UTC`时间（世界标准时间）。该方法接受年、月、日等变量作为参数，返回当前距离1970年1月1日 00:00:00 UTC的毫秒数。

### Date实例对象

#### to类方法

```js
Date.prototype.toString : 返回一个完整的日期字符串
Date.prototype.toUTCString : 返回对应的UTC时间，也就是比北京时间晚8个小时。
Date.prototype.toISOString : 方法返回对应时间的ISO8601写法
Date.prototype.toJSON : 符合JSON格式的ISO格式的日期字符串，与toISOString方法的返回结果完全相同。
Date.prototype.toDateString : 方法返回日期字符串。
Date.prototype.toTimeString : 方法返回时间字符串。
Date.prototype.toLocaleDateString : 方法返回一个字符串，代表日期的当地写法。
Date.prototype.toLocaleTimeString : 方法返回一个字符串，代表时间的当地写法。
```

#### get类方法

```js
getTime()：返回距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
getDate()：返回实例对象对应每个月的几号（从1开始）。
getDay()：返回星期几，星期日为0，星期一为1，以此类推。
getYear()：返回距离1900的年数。
getFullYear()：返回四位的年份。
getMonth()：返回月份（0表示1月，11表示12月）。
getHours()：返回小时（0-23）。
getMilliseconds()：返回毫秒（0-999）。
getMinutes()：返回分钟（0-59）。
getSeconds()：返回秒（0-59）。
getTimezoneOffset()：返回当前时间与UTC的时区差异，以分钟表示，返回结果考虑到了夏令时因素。
```

返回对应的UTC时间

```js
getUTCDate()
getUTCFullYear()
getUTCMonth()
getUTCDay()
getUTCHours()
getUTCMinutes()
getUTCSeconds()
getUTCMilliseconds()
```

#### set类

```js
setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
setYear(year): 设置距离1900年的年数。
setFullYear(year [, month, date])：设置四位年份。
setHours(hour [, min, sec, ms])：设置小时（0-23）。
setMilliseconds()：设置毫秒（0-999）。
setMinutes(min [, sec, ms])：设置分钟（0-59）。
setMonth(month [, date])：设置月份（0-11）。
setSeconds(sec [, ms])：设置秒（0-59）。
setTime(milliseconds)：设置毫秒时间戳。
```

对应的UTC方法

```js
setUTCDate()
setUTCFullYear()
setUTCHours()
setUTCMilliseconds()
setUTCMinutes()
setUTCMonth()
setUTCSeconds()
```

### valueOf

`valueOf`方法返回实例对象距离1970年1月1日00:00:00 UTC对应的毫秒数，该方法等同于`getTime`方法。

## RegExp对象

正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用作按照“给定模式”匹配文本的工具。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为 Email 地址。JavaScript 的正则表达式体系是参照 Perl 5 建立的。

## JSON对象

严格规定

复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`,`Infinity`, `-Infinity`和`undefined`）。

字符串必须使用双引号表示，不能使用单引号。

对象的键名必须放在双引号里面。

数组或对象最后一个成员的后面，不能加逗号。

### JSON.stringify

`JSON.stringify`方法用于将一个值转为字符串。该字符串符合`JSON`格式，并且可以被`JSON.parse`方法还原。

```js
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

如果数组的成员是`undefined`、函数或 XML 对象，则这些值被转成`null`

```js
JSON.stringify(/foo/) // "{}"
```

正则对象会被转成空对象。

`JSON.stringify`方法会忽略对象的不可遍历属性。

`JSON.stringify`方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性

```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

这个类似「白名单」的数组，只对对象的属性有效，对数组无效。

第二个参数还可以是一个函数，用来更改JSON.stringify的默认行为。

```js
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

`JSON.stringify`还可以接受第三个参数，用于增加返回的JSON字符串的可读性。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。

### toJSON

如果对象有自定义的`toJSON`方法，那么`JSON.stringify`会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

```js
var user = {
  firstName: '三',
  lastName: '张',
  fullName: '张三',	

  toJSON: function () {
    var data = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    return data;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张"}"
```

可以给正则定义``toJSON``方法，就可以用来转换正则了

```js
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

### JSON.parse

`JSON.parse`方法用于将JSON字符串转化成对象。

如果传入的字符串不是有效的JSON格式，`JSON.parse`方法将报错。

## console对象

### 浏览器实现

打开开发者工具

```
Elements：查看网页的HTML源码和CSS代码。
Resources：查看网页加载的各种资源文件（比如代码文件、字体文件、css文件等），以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
Network：查看网页的 HTTP 通信情况。
Sources：查看网页加载的所有源码。
Timeline：查看各种网页行为随时间变化的情况。
Performance：查看网页的性能情况，比如 CPU 和内存消耗。
Console：用来运行 JavaScript 命令。
```

### console.log()，console.debug()，console.info()

`console.info()`和`console.debug()`都是`console.log`方法的别名，用法完全一样。只不过`console.info`方法会在输出信息的前面，加上一个蓝色图标。

自定义`console`方法

```js
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

### console.warn(),console.error()

`warn`方法和`error`方法也是在控制台输出信息，它们与`log`方法的不同之处在于，`warn`方法输出信息时，在最前面加一个黄色三角，表示警告；`error`方法输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈。其他方面都一样。

### console.table()

对于某些复合类型的数据，`console.table`方法可以将其转为表格显示。

### console.count()

`count`方法用于计数，输出它被调用了多少次。

该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。

```js
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet('bob')
// bob: 1
// "hi bob"

greet('alice')
// alice: 1
// "hi alice"

greet('bob')
// bob: 2
// "hi bob"
```

### console.dir()，console.dirxml()

`dir`方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。

`dirxml`方法主要用于以目录树的形式，显示 DOM 节点。

### console.assert()

`assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。

```js
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}
```

### console.time()，console.timeEnd()

```js
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
```

### console.profile()，console.profileEnd()

`console.profile`方法用来新建一个性能测试器（profile），它的参数是性能测试器的名字。

`console.profileEnd`方法用来结束正在运行的性能测试器。

```js
console.profile('p')
// Profile 'p' started.

console.profileEnd()
// Profile 'p' finished.
```

打开浏览器的开发者工具，在`profile`面板中，可以看到这个性能调试器的运行结果。

### console.group()，console.groupend()，console.groupCollapsed()

`console.group`和`console.groupend`这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

`console.groupCollapsed`方法与`console.group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

### console.trace()，console.clear()

`console.trace`方法显示当前执行的代码在堆栈中的调用路径。

`console.clear`方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的`Preserve log`选项，网页脚本调用`console.log`将不起作用，但手动在控制台执行该方法依然有效

### 命令行API

具体详细内容 http://javascript.ruanyifeng.com/stdlib/console.html

## 属性描述对象

### Object.defineProperty()，Object.defineProperties()

`Object.defineProperty`方法和后面的`Object.defineProperties`方法，都有性能损耗，会拖慢执行速度，不宜大量使用。

这时需要注意的是，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`设为`true`，或者同时定义`value`属性，会报错。

```js
var o = {};

Object.defineProperty(o, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value,
```

上面代码同时定义了`get`属性和`value`属性，结果就报错。
