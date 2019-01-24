---
title: LeanJs「 ES6 」-- 数值的扩展
date: 2018-02-01 21:24:07
tags: 
    - LeanJs
    - ES6
category: Note    
---

![Js](LeanJS数值的扩展/js.png)

<!--more-->

## 二进制和八进制表示法

ES6 提供了二进制和八进制的新的写法，分别用前缀 `0b`（或 `0B`）和 `0o`（或 `0O`）

```js
0b111110111 === 503 // true
0o767 === 503 // true
```

用 `Number` 方法将其转化为十进制

```js
Number('0b111')  // 7
Number('0o10')  // 8
```

## Number.isFinite(), Number.isNaN()

`Number.isFinite()` 用来检查一个数值是否为有限的（finite），即不是 `Infinity`。

`Number.isNaN()` 用来检查一个值是否为 `NaN`。

这两个方法碰到非数值直接返回 `false` ，全局的 `isFinite()` 和 `isNaN()` 方法会先用 `Number` 转换参数。

## Number.parseInt(), Number.parseFloat()

ES6 将全局方法 `parseInt()` 和 `parseFloat()`，移植到 `Number` 对象上面，行为完全保持不变。

## Number.isInteger()

`Number.isInteger()` 用来判断一个数值是否为整数。

```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false
```

JavaScript 内部整数和浮点数采用同样的储存方法，所以 25 和 25.0 被视为同一个值

```js
Number.isInteger(25.0)// true
```

如果不是数值，直接返回 `false` 

此外，数值太大太小都会造成结果的误判，因此如果对精度要求较高，不推荐使用此方法

## Number.EPSILON

ES6 在 `Number` 对象上面，新增一个极小的常量 `Number.EPSILON`。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。

因为在 JavaScript 中，浮点数的计算是有误差的，而 `Number.EPSILON` 表示的是 JavaScript 的最小精度，因此只要运算的误差小于这个常量，我们就认为它就不存在误差了。

```js
function withinErrorMargin(left,right){
  return Math.abs(left-right) < Number.EPSILON;
}
```

## 安全整数和 Number.isSafeInteger() 

JavaScript 能够准确表示在 `-2^53` ~ `2^53` 之间的整数，超过这个范围，就无法正确表示

ES6 引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 这两个常量，用来表示这个范围的上下限。

```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1//true
```

`Number.isSafeInteger()` 则是用来判断一个整数是否落在这个范围之内。

## Math 对象的扩展

ES6 在 `Math` 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 `Math` 对象上调用。

### Math.trunc()

去除一个数的小数部分，返回整数，如果参数不是整数，会调用 `Number` 方法将其转换为整数，对于无法转换为整数的值返回 `NaN`

```js
Math.trunc(4.1) // 4
Math.trunc(-4.9) // -4
Math.trunc(true) //1
Math.trunc(null) // 0
```

### Math.sign()

`Math.sign` 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

- 参数为正数，返回 `+1`；
- 参数为负数，返回 `-1`；
- 参数为 0，返回 `0`；
- 参数为-0，返回 `-0`;
- 其他值，返回 `NaN` 。

### Math.cbrt() 

`Math.cbrt` 方法用于计算一个数的立方根。对于非数值，会先将其转换为数值。

### Math.clz32()

`Math.clz32` 方法返回一个数的 32 位无符号整数形式有多少个前导 `0`。

```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```

上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是 `0b1`，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是 `0b1111101000`，一共有 10 位，所以 32 位之中有 22 个前导 0。

### Math.imul()

`Math.imul` 方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。

```js
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

如果只考虑最后 32 位，大多数情况下，`Math.imul(a, b)` 与 `a * b` 的结果是相同的，即该方法等同于 `(a * b)|0` 的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，**对于那些很大的数的乘法，低位数值往往都是不精确的，`Math.imul` 方法可以返回正确的低位数值**。

### Math.fround()

`Math.fround` 方法返回一个数的 32 位单精度浮点数形式。

`Math.fround` 方法的主要作用，是将 64 位双精度浮点数转为 32 位单精度浮点数。如果小数的精度超过 24 个二进制位，返回值就会不同于原值，否则返回值不变（即与 64 位双精度值一致）。

对于 `NaN` 和 `Infinity`，此方法返回原值。对于其它类型的非数值，`Math.fround` 方法会先将其转为数值，再返回单精度浮点数。

### Math.hypot()

`Math.hypot` 方法返回所有参数的平方和的平方根。

```js
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

上面代码中，3 的平方加上 4 的平方，等于 5 的平方。

如果参数不是数值，`Math.hypot` 方法会将其转为数值。只要有一个参数无法转为数值，就会返回 `NaN`。

### Math.expm1()

`Math.expm1(x)` 返回 `e^x - 1`，即 `Math.exp(x) - 1`。

### Math.log1p()

`Math.log1p(x)` 方法返回 `1 + x` 的自然对数，即 `Math.log(1 + x)` 。如果 `x` 小于 -1，返回 `NaN`。

### Math.log10()

`Math.log10(x)` 返回以 10 为底的 `x` 的对数。如果 `x` 小于 0，则返回 `NaN`。

### Math.log2()

`Math.log2(x)` 返回以 2 为底的 `x` 的对数。如果 `x` 小于 0，则返回 `NaN`。

### 双曲函数的方法

- `Math.sinh(x)` 返回 `x` 的双曲正弦（hyperbolic sine）
- `Math.cosh(x)` 返回 `x` 的双曲余弦（hyperbolic cosine）
- `Math.tanh(x)` 返回 `x` 的双曲正切（hyperbolic tangent）
- `Math.asinh(x)` 返回 `x` 的反双曲正弦（inverse hyperbolic sine）
- `Math.acosh(x)` 返回 `x` 的反双曲余弦（inverse hyperbolic cosine）
- `Math.atanh(x)` 返回 `x` 的反双曲正切（inverse hyperbolic tangent）

### 指数运算符

ES2016 新增了一个指数运算符 `**`。

```js
2 ** 2 // 4
2 ** 3 // 8
```