---
title: LeanJs「 ES6 」-- 正则的扩展
date: 2018-01-31 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJS正则的扩展/js.png)

<!--more-->

## RegExp 构造函数

ES5 中的 `RegExp` 构造函数只有两种情况

```js
//第一种
var regex = new RegExp('xyz', 'i');

//第二种
var regex = new RegExp(/xyz/i);

//等价于
var  regex = /xyz/i
```

但是 ES5 中不允许下面这种情况

```js
var regex = new RegExp(/xyz/,'i')
```

ES6 改变了这种情况，如果第一个参数为正则对象时，可以使用第二个参数为指定修饰符。但是返回的正则表达式会忽略掉原有的正则的修饰符

```js
var regex = new RegExp(/xyz/ig,'i')

等价于
var regex = /xyz/i
```

## u 修饰符

ES6 添加 `u` 修饰符来正确处理四个字节的 UTF-16 的编码，加上 `u` 字符就是识别其为一个字符

```js
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

一旦加上 `u` 修饰符，就会修改下面这些正则表达式的行为

### 点字符

点 `.` 字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于 `0xFFFF` 的 Unicode 字符，点字符不能识别，必须加上 `u` 修饰符。

```js
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```
上面代码表示，如果不添加 `u` 修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

### Unicode 字符表示法

ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上 `u` 修饰符，才能识别当中的大括号，否则会被解读为量词。

```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```

上面代码表示，如果不加 `u` 修饰符，正则表达式无法识别 `\u{61}` 这种表示法，只会认为这匹配 `61` 个连续的 `u`。

### 量词

使用 `u` 修饰符后，所有量词都会正确识别码点大于 `0xFFFF` 的 Unicode 字符。

```js
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
```

### 预定义模式

`u` 修饰符也影响到预定义模式，能否正确识别码点大于 `0xFFFF` 的 Unicode 字符。

```js
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
```

上面代码的 `\S` 是预定义模式，匹配所有不是空格的字符。只有加了 `u` 修饰符，它才能正确匹配码点大于 `0xFFFF` 的 Unicode 字符。

### i 修饰符

有些 Unicode 字符的编码不同，但是字型很相近，比如，`\u004B` 与 `\u212A` 都是大写的 `K`。

```js
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
```
 
上面代码中，不加 `u` 修饰符，就无法识别非规范的 `K` 字符。

## y 修饰符

「粘连」（sticky）修饰符。

`y` 修饰符的作用与 `g` 修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g` 修饰符只要剩余位置中存在匹配就可，而 `y` 修饰符确保匹配必须从剩余的第一个位置开始，这也就是「粘连」的涵义。

```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```

因为剩下的字符串中 `a` 不是开头，所以返回 `null`

`y` 修饰符同样遵守 `lastIndex` 属性，但是要求必须在 `lastIndex` 指定的位置发现匹配。

```js
const REGEX = /a/y;

// 指定从2号位置开始匹配
REGEX.lastIndex = 2;

// 不是粘连，匹配失败
REGEX.exec('xaya') // null

// 指定从3号位置开始匹配
REGEX.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match = REGEX.exec('xaxa');
match.index // 3
REGEX.lastIndex // 4
```

实际上，`y` 修饰符号隐含了头部匹配的标志 `^`。

```js
/b/y.exec('aba')
// null
```

单单一个 `y` 修饰符对 `match` 方法，只能返回第一个匹配，必须与 `g` 修饰符联用，才能返回所有匹配。

```js
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
```

## sticky 属性

与 `y` 修饰符相匹配，ES6 的正则对象多了 `sticky` 属性，表示是否设置了 `y` 修饰符。

```js
var r = /hello\d/y;
r.sticky // true
```

## flags 属性

ES6 为正则表达式新增了 `flags` 属性，会返回正则表达式的修饰符。

```js
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```

## s 修饰符 dotAll 模式

正则表达式中，点 `.` 是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用 `u` 修饰符解决；另一个是 「行终止符」（line terminator character）。

```js
/foo.bar/.test('foo\nbar')
// false

/foo.bar/s.test('foo\nbar')
// true
```

添加 `s` 修饰符 ，`.` 就可以代表任意一个单字字符，也被成为 `dotAll` 模式，意为 「点代表所有」。还有一个 `dotAll` 属性，来判别正则表达式是否在 `dotAll` 模式中

## 后行断言

JavaScript 语言的正则表达式，只支持「先行断言」（lookahead）和 「先行否定断言」（negative lookahead），不支持「后行断言」（lookbehind）和 「后行否定断言」（negative lookbehind）。ES2018 引入 「后行断言」，V8 引擎 4.9 版（Chrome 62）已经支持。

「先行断言」为 `x` 只有在 `y` 前面才匹配，必须写成 `/x(?=y)/`，「先行否定断言」指的是，`x` 只有不在 `y` 前面才匹配，必须写成 `/x(?!y)/`

```js
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```

上面分别匹配在 `%` 前的数字和不在 `%` 前的数字，`(?=%)` 不计入返回部分

「后行断言」和「前行断言」正好相反，`x` 只有在 `y` 后面才匹配，必须写成 `/(?<=y)x/` 。比如，只匹配美元符号之后的数字，要写成 `/(?<=\$)\d+/` 。「后行否定断言」则与「先行否定断言」相反，`x` 只有不在 `y` 后面才匹配，必须写成 `/(?<!y)x/`。比如，只匹配不在美元符号后面的数字，要写成 `/(?<!\$)\d+/`。

同样也是不返回`()`中的部分。所以**「前行断言」返回前面部分，判断后面部分，「后行断言」返回后面部分，判断前面部分**

## Unicode 属性类

ES2018 引入了一种新的类的写法 `\p{...}` 和 `\P{...}`，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

```js
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true
```

上面代码中，`\p{Script=Greek}` 指定匹配一个希腊文字母，所以匹配 `π` 成功。

Unicode 属性类要指定属性名和属性值。

```js
\p{UnicodePropertyName=UnicodePropertyValue}
```

对于某些属性，可以只写属性名，或者只写属性值。

```js
\p{UnicodePropertyName}
\p{UnicodePropertyValue}
```

`\P{…}` 是 `\p{…}` 的反向匹配，即匹配不满足条件的字符。

因为匹配的是 Unicode 字符，所以需要带上 `u` 字符

## 具名组匹配

### 基本用法

正则表达式用圆括号来实现组的匹配

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

但是每一组匹配的含义不容易看出来，而且也只能用数字序号引用，要是组的顺序变了，就无法正确取到想取的值

ES2018 引入了「具名组匹配」（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

假如没有匹配到数据，那将返回 `undefined`

### 解构赋值和替换

有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。

```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar
```

这里因为 ` /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar')` 返回 `groups: {one: "foo", two: "bar"}`，因此其实左面的写法是固定的

字符串替换时，使用 `$<组名>` 引用具名组。

```js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
```

上面代码中，`replace` 方法的第二个参数是一个字符串，而不是正则表达式。

### 引用

如果要在正则表达式内部引用某个「具名组匹配」，可以使用 `\k<组名>` 的写法。

```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

数字引用 `\1` 依然有效。

```js
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

这两种引用语法还可以同时使用。

```
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

## String.prototype.matchAll

如果一个正则表达式在字符串里面有多个匹配，现在一般使用 `g` 修饰符或 `y` 修饰符，在循环里面逐一取出。

```js
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
```

上面代码中，`while` 循环取出每一轮的正则匹配，一共三轮。

目前有一个提案，增加了 `String.prototype.matchAll` 方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。

```js
const string = 'test1test2test3';

// g 修饰符加不加都可以
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
```

上面代码中，由于 `string.matchAll(regex)` 返回的是遍历器，所以可以用 `for...of`  循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。


