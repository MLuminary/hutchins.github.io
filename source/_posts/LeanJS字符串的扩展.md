---
title: LeanJs「 ES6 」-- 字符串的扩展
date: 2018-01-30 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---
![Js](LeanJS字符串的扩展/js.png)

<!--more-->

## 字符的 Unicode 表示法

JavaScript 采用 `\uxxxx` 表示一个字符， `xxxx` 表示字符的 Unicode 码点，但是这种方法只能表示 `\u0000`~`\uffff`之间的字符。一旦超出这个范围，就必须用两个字节表示

上面代码表示，如果直接在 `\u` 后面跟上超过 `0xFFFF` 的数值（比如 `\u20BB7`），JavaScript 会理解成 `\u20BB+7`。由于 `\u20BB` 是一个不可打印字符，所以只会显示一个空格，后面跟着一个 `7`。

ES6 中对此做出改进，只要将大码点放入大括号，就可正确解读

```js
"\u{20BB7}"
// "𠮷"

"\uD842\uDFB7"
// "𠮷"

"\uD842\uDFB7" === "\u{20BB7}"//true
```

## codePointAt()

JavaScript 内部，字符已 UTF-16 的格式存储，每个字符固定为 `2` 个字节，但是 Unicode 码点大于 `0xFFFF` 会以四个字节存储，JavaScript 会认为为两个字符

```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

对于这种需要四个字节存储的字符，`charAt` 方法无法读取，`charCodeAt` 方法只能分别返回前两个字节和后两个字节的值，ES6 提供了 `codePointAt` 可以正确处理四个字节储存的字符

```js
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```

对于 `𠮷` ，JavaScript 还会认为其长度为 2，`codePointAt(0)` 正确返回了它的十进制码，`codePointAt(1)` 返回了 `𠮷` 的后两个字节的十进制码，`a` 的处理与 `charCodeAt` 相同，但是 `codePointAt` 的参数确是不对的。解决这个问题的一个办法使用 `for..of`

```js
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

`codePointAt` 也是检查一个字符是否是双字节存储还是四字节存储的一个好方法

```js
function is32Bit(s){
  return s.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
```

## String.fromCodePoint()

ES5 `String.fromCharCode` 不能返回 32 位 UTF-16 字符（ Unicode 大于 `0xFFFF` ）

使用 `String.fromCodePoint()` 可以，如果其中有多个参数，会把所有参数合并成一个字符串

注意，`fromCodePoint` 方法定义在 `String` 对象上，而 `codePointAt` 方法定义在字符串的实例对象上。

## 字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of` 循环遍历。`for...of` 也会正确识别 32 位的 UTF-16 字符

## at()

目前，有一个提案，提出字符串实例的 `at` 方法，可以识别 Unicode 编号大于 `0xFFFF` 的字符，返回正确的字符。

```js
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```

## normalize()

ES6 提供字符串实例的 `normalize()` 方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

## includes(), startsWith(), endsWith()

传统上，JavaScript 只有 `indexOf` 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- `includes()` ：返回布尔值，表示是否找到了参数字符串。
- `startsWith()` ：返回布尔值，表示参数字符串是否在原字符串的头部。
- `endsWith()` ：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

这三个方法都支持第二个参数，即开始搜索的位置。`endsWith` 的行为与其他两个方法有所不同。它针对前 `n` 个字符，而其他两个方法针对从第 `n` 个位置直到字符串结束。

## repeat() 

`repeat` 方法返回一个新字符串，表示将原字符串重复 `n` 次，碰到小数会取整，碰到字符串会尝试转换成数字，`NaN` 视为 `0`

```js
'x'.repeat(3) // "xxx"

'na'.repeat(0) // ""
```

## padStart()，padEnd()

`padStart()` 用于头部补全，`padEnd()` 用于尾部补全

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

上面代码中，`padStart` 和 `padEnd` 一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

如果原字符的长度大于或者等于指定的字符串长度，则返回原字符串

```js
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

```js
'abc'.padStart(10, '0123456789')
// '0123456abc'
```

如果省略第二个参数，默认使用空格补全长度。

```js
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

`padStart` 的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

## 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

如果想在模板字符串用反引号，需要用反斜杠转义

```js
`yo \` `
```

模板字符串中的格式空格都会保留，去除空格可以用 `trim()`

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```

模板字符串中嵌入变量需要写在 `${}` 中，但是不能放入未声明的变量

```js
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```

模板字符串甚至还能嵌套。

```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

## 标签模板

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为「标签模板」功能（tagged template）。

```js
alert`123`
// 等同于
alert(123)
```

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```js
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

上面代码中，模板字符串前面有一个标识名 `tag` ，它是一个函数。整个表达式的返回值，就是 `tag` 函数处理模板字符串后的返回值。

函数 `tag` 依次会接收到多个参数。

```js
function tag(stringArr, value1, value2...){
  // ...
}
```

`tag` 函数的第一个参数为一个数组，该数组的成员是那些没有变量替换的部分，后面的值为变量

下面一个更复杂的值

```js
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }

  return result;
}

msg // "The total is 30 (31.5 with tax)"
```

`passthru` 只接受一个参数，就是那个接受未被变量替换的数组，在本例中也就是 `["The total is ", " (", " with tax)"]`，而 `arguments` 就为该函数的所有参数。

## String.raw()

ES6 还为原生的 String 对象，提供了一个 `raw` 方法。

`String.raw` 方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

```js
String.raw`Hi\n${2+3}!`;
// 返回 "Hi\\n5!"
```

如果原字符串的斜杠已经转义，那么 `String.raw` 会进行再次转义。

```js
String.raw`Hi\\n`
// 返回 "Hi\\\\n"
```

`String.raw` 方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw` 方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有 `raw` 属性的对象，且 `raw` 属性的值应该是一个数组。

```js
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```

作为函数，`String.raw` 的代码实现基本如下。

```js
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```



