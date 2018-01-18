---
title: slice、substr和substring的区别
date: 2018-01-18 20:31:01
tags: js
category: javascript
---

本博文写的是此三种方法的应用场景为字符串的情况

## slice

`slice`方法用于从原字符串取出子字符串并返回，不改变原字符串。

它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。左闭右开

```js
'javascript'.slice(1,4);//"ava"
```

如果参数是负值，表示从结尾开始倒数计算的位置，即该**负值加上字符串长度**。

```js
'javascript'.slice(1,-2);//"avascri"
```

如果第一个参数大于第二个参数，slice方法返回一个空字符串。

```js
'javascript'.slice(2,1);//''
```

<!--more-->

## substr

`substr`方法用于从原字符串取出子字符串并返回，不改变原字符串。

`substr`方法的第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。

```js
'javascript'.substr(1,2);//'av'
```

如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。

```js
'javascript'.substr(-4,2)//'ri'
'javascript'.substr(0,-4)//''
```


## substring

`substring`方法用于从原字符串取出子字符串并返回，不改变原字符串

`substring`方法的第一个参数表示子字符串的开始位置，第二个位置表示结束位置。

```js
'javascript'.substring(1,4);//"ava"
```

如果第二个参数大于第一个参数，`substring`方法会自动更换两个参数的位置。

```js
'javascript'.substring(2,1);//"a"
```

如果参数是负数，`substring`方法会自动将负数转为0。

```js
'javascript'.substring(-1);//"javascript"
'javascript'.substring(6,-1);//"javasc"
```

-1转换为0，没有输入结束参数，所以会将原字符串都返回出来；后面这个负数转为0，然后再调换方向就是开始为0，结束为6.

不建议使用，优先使用`slice`

