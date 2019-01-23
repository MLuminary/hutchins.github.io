---
title: LeanJs「 ES5 」-- 浏览器环境
date: 2018-01-27 21:24:07
tags: 
    - LeanJs
    - ES5
category: Note    
---
![Js](LeanJS浏览器环境/js.png)

<!--more-->

## 概述

### JavaScript 代码嵌入网页的方法

#### script标签:代码嵌入网页

`type` 指定脚本类型

- `text/javascript` 是默认值
- `application/javascript` 对于新式浏览器，建议这个值
- 也可以不写 `type`
- 写一个浏览器不认识的，就不会执行

#### script标签：加载外部脚本

```html
<script src="example.js"></script>
```

加载外部的脚步和直接添加代码块不能混用

```html
<script src="example.js">
  console.log('hello world');
</script>
```

`console.log` 会被忽略

为了防止攻击者篡改外部脚本，`script` 标签允许设置一个 `integrity` 属性，写入该外部脚本的Hash签名，用来验证脚本的一致性

```html
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```


#### 事件属性

```html
<div onclick="alert('Hello')"></div>
```

#### URL协议

URL支持 `javascript:` 协议，调用这个URL时，就会执行JavaScript代码。

```html
<a href="javascript:alert('Hello')"></a>
```

### script标签

#### 工作原理

正常的网页加载流程是这样的

1. 浏览器一边下载HTML网页，一边开始解析
2. 解析过程中，发现 `<script>` 标签
3. 暂停解析，网页渲染的控制权转交给JavaScript引擎
4. 如果 `<script>` 标签引用了外部脚本，就下载该脚本，否则就直接进行
5. 执行完毕，控制权交还给渲染引擎，恢复往下解析HTML网页

#### defer 属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是加入 `defer` 属性

```html
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

`defer` 的运行流程如下

1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有 `defer` 属性的 `script` 标签
3. 浏览器继续往下解析 HTML 网页，同时并行下载 `script` 标签中的外部脚本
4. 浏览器完成解析HTML网页，此时再执行下载的脚本

使用 `defer` 加载的外部脚本不应该使用 `document.write` 方法

#### async

解决「阻塞效应」的一个方法是加入 `async`

`async` 属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染

`async` 的运行流程如下

1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有 `async` 属性的 `script` 标签
3. 浏览器继续往下解析 HTML 网页，同时并行下载 `script` 标签中的外部文件
4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本
5. 脚本执行完毕，浏览器恢复解析 HTML 网页

`async` 无法保证脚本的执行顺序，一般来说，如果脚本没有依赖关系，用 `async` 属性，脚本之间有依赖关系，用 `defer` 属性，同时使用 `async` 和 `defer` 属性，后者不起作用，浏览器行为由 `async` 属性决定

#### 脚本的动态加载

```js
var script = document.createElement('script');
script.src = 'a.js';
document.head.appendChild(script);
```

#### 加载使用的协议

如果不指定协议，浏览器默认采用 HTTP 协议下载

如果要采用 HTTPS 下载，必须写明

```html
<script src="https://example.js"></script>
```

### 浏览器的组成

浏览器的核心是两部分：渲染引擎和 JavaScript 解释器

#### 渲染引擎

- Firefox : Gecko
- Safari : WebKit
- Chrome : Blink
- IE : Trident
- Edge : EdgeHTML

渲染引擎处理网页，通常分为四个阶段

1. 解析代码 ：HTML 代码解析为 DOM，CSS 代码解析为 CSSSOM 「CSS Object Model」
2. 对象合成 ：将 DOM 和 CSSOM 合成一棵渲染树 「render tree」
3. 布局 ：计算出渲染树的布局 「layout」
4. 绘制 ：将渲染树绘制到屏幕

往往第一步还没完成，第二部和第三部已经开始了。

#### 重流和重绘

渲染树转换为网页布局，称为「布局流」（flow）；布局显示到页面的这个过程，称为「绘制」（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。

重流一定会触发重绘，重绘不一定需要重流。

以下是一些优化技巧

- 读取 DOM 或者写入 DOM ，尽量写在一起，不要混杂
- 缓存 DOM 信息
- 不要一项一项地改变样式，而是使用CSS class一次性改变样式
- 使用document fragment操作DOM
- 动画时使用absolute定位或fixed定位，这样可以减少对其他元素的影响
- 只在必要时才显示元素
- 使用 `window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流
- 使用虚拟DOM（virtual DOM）库

#### JavaScript 引擎

早期的浏览器内部处理 JavaScript

1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

现在都采用了即时编译，运行到哪一行代码翻译哪一行，把编译结果缓存。V8省略了翻译字节码的步骤，直接翻译为机器码

## window 对象

### 概述

在浏览器中，`window` 对象（注意，w为小写）指当前的浏览器窗口。它也是所有对象的顶层对象。

### window 属性

#### window.window，window.name

`window` 对象的 `window` 属性指向自身。

`window.name` 属性用于设置当前浏览器窗口的名字。该属性只能保存字符串，且当浏览器窗口关闭后，所保存的值就会消失。因此局限性比较大，但是与 `<iframe>` 窗口通信时，非常有用。

#### window.location

`window.location` 返回一个 `location` 对象，用于获取窗口当前的URL信息。它等同于 `document.location` 对象

#### window.closed，window.opener

`window.closed` 属性返回一个布尔值，表示窗口是否关闭。

`window.opener` 属性返回打开当前窗口的父窗口。如果当前窗口没有父窗口，则返回 `null`。

#### window.frames ，window.length

`window.frames` 属性返回一个类似数组的对象，成员为页面内所有框架窗口

`window.length` 属性返回当前网页包含的框架总数

#### window.screenX ，window.screenY

`window.screenX` 和 `window.screenY` 属性，返回浏览器窗口左上角相对于当前屏幕左上角（`(0, 0)`）的水平距离和垂直距离，单位为像素。

#### window.outerHeight，window.outerWidth

`window.outerHeight` 和 `window.outerWidth` 属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框，单位为像素。

#### window.pageXOffset，window.pageYOffset

`window.pageXOffset` 属性返回页面的水平滚动距离，`window.pageYOffset` 属性返回页面的垂直滚动距离，单位都为像素。

### navigator 对象

#### navigator.userAgent

`navigator.userAgent` 属性返回浏览器的User-Agent字符串，标示浏览器的厂商和版本信息。

用过 `userAgent` 属性识别浏览器不是一个好方法，但是 `userAgent` 可以大致准确地识别手机浏览器

```js
var ua = navigator.userAgent.toLowerCase();

if(/mobi/i.test(ua)){
  //手机浏览器
}else{
  //非手机浏览器
}
```

#### navigator.plugins

`navigator.plugins` 属性返回一个类似数组的对象，成员是浏览器安装的插件，比如Flash、ActiveX等。

#### navigator.platform

`navigator.platform` 属性返回用户的操作系统信息。

#### navigator.onLine

`navigator.onLine` 属性返回一个布尔值，表示用户当前在线还是离线。

#### navigator.geolocation

`navigator.geolocation` 返回一个Geolocation对象，包含用户地理位置的信息。

#### navigator.javaEnabled()，navigator.cookieEnabled

`javaEnabled` 方法返回一个布尔值，表示浏览器是否能运行Java Applet小程序

`cookieEnabled` 属性返回一个布尔值，表示浏览器是否能储存Cookie。

### window.screen 对象

`window.screen` 对象包含了显示设备的信息。

### window对象的方法

#### window.moveTo()，window.moveBy()

`window.moveTo` 方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

`window.moveBy` 方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

#### window.scrollTo()，window.scrollBy()

`window.scrollTo` 方法用于将网页的指定位置，滚动到浏览器左上角。它的参数是相对于整张网页的横坐标和纵坐标。它有一个别名 `window.scroll` 。

`window.scrollBy` 方法用于将网页移动指定距离，单位为像素。它接受两个参数：向右滚动的像素，向下滚动的像素。

#### window.open(), window.close()

`window.open` 方法用于新建另一个浏览器窗口，并且返回该窗口对象。

`window.close` 方法用于关闭当前窗口，一般用来关闭window.open方法新建的窗口。

#### window.print()

`print` 方法会跳出打印对话框，同用户点击菜单里面的“打印”命令效果相同。

#### window.getComputedStyle()

`getComputedStyle` 方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象

#### window.matchMedia()

`window.matchMedia` 方法用来检查CSS的mediaQuery语句

#### window.focus()

`focus` 方法会激活指定当前窗口，使其获得焦点。

#### window.getSelection()

`window.getSelection` 方法返回一个 `Selection` 对象，表示用户现在选中的文本。

### 多窗口操作

#### 窗口的引用

- top : 顶层窗口，即最上层的那个窗口
- parent : 父窗口
- self : 当前窗口，即自身

#### iframe 标签

对于 `iframe` 嵌入的窗口，`document.getElementById` 方法可以拿到该窗口的DOM节点，然后使用 `contentWindow` 属性获得 `iframe` 节点包含的 `window` 对象，或者使用 `contentDocument` 属性获得包含的 `document` 对象。

#### frames 属性

`window` 对象的 `frames` 属性返回一个类似数组的对象，成员是所有子窗口的 `window` 对象

需要注意的是，`window.frames` 每个成员的值，是框架内的窗口（即框架的 `window` 对象），而不是 `iframe` 标签在父窗口的DOM节点。如果要获取每个框架内部的DOM树，需要使用 `window.frames[0].document` 的写法。

另外，如果 `iframe` 元素设置了 `name` 或 `id` 属性，那么属性值会自动成为全局变量，并且可以通过 `window.frames` 属性引用，返回子窗口的 `window` 对象。

### 事件

#### load 事件和onload 属性

`load` 事件发生在文档在浏览器窗口加载完毕时。`window.onload` 属性可以指定这个事件的回调函数。

#### error 事件和 onerror 属性

浏览器脚本发生错误时，会触发 `window` 对象的 `error` 事件。我们可以通过 `window.onerror` 属性对该事件指定回调函数。

由于历史原因，`window `的 `error` 事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

- 出错信息
- 出错脚本的网址
- 行号
- 列号
- 错误对象

老浏览器只支持前三个参数

### URL的编码/解码方法

#### encodeURI

`encodeURI` 方法的参数是一个字符串，代表整个URL。它会将元字符和语义字符之外的字符，都进行转义。

#### encodeURIComponent

`encodeURIComponent` 只转除了语义字符之外的字符，**元字符也会被转义**。因此，它的参数通常是URL的路径或参数值，而不是整个URL。

#### decodeURI

`decodeURI` 用于还原转义后的URL。它是 `encodeURI` 方法的逆运算。

#### decodeURIComponent

`decodeURIComponent` 用于还原转义后的URL片段。它是 `encodeURIComponent` 方法的逆运算。

#### alert()，prompt()，confirm()

`alert` 方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。

`prompt` 方法弹出的对话框，在提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。

`confirm` 方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户的意见。

## history 对象

### 概述

浏览器窗口有一个 `history` 对象，用来保存浏览历史

`history` 对象提供了一系列方法，允许在浏览器历史之间移动

- `back` : 移动到上一个访问页面，等同于浏览器的后退键
- `forward` : 移动到下一个访问页面，等同于浏览器的前进键
- `go` : 接受一个整数作为参数，移动到该整数指定的页面，`go(0)` 相当于刷新页面

### history.pushState()

接受三个参数

- `state` ：一个与指定网址相关的状态对象，`popstate` 事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填 `null` 。
- `title` ：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填 `null`。
- `url` ：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

```js
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```

添加上面这个新记录后，浏览器地址栏立刻显示 `example.com/2.html`，但并不会跳转到`2.html`，甚至也不会检查 `2.html` 是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问 `google.com` )，然后点击了倒退按钮，页面的 `URL` 将显示 `2.html`；你再点击一次倒退按钮，URL 将显示 `1.html`。

总之，`pushState`方法不会触发页面刷新，只是导致`history`对象发生变化，地址栏会有反应。

如果 `pushState的url` 参数，设置了一个新的锚点值（即hash），并不会触发 `hashchange` 事件。如果设置了一个跨域网址，则会报错。

### history.replaceState()

`history.replaceState` 方法的参数与 `pushState` 方法一模一样，区别是它修改浏览历史中当前记录。

### history.state属性

`history.state` 属性返回当前页面的 `state` 对象。

### popstate 事件

每当同一个文档的浏览历史（即 `history` 对象）出现变化时，就会触发 `popstate` 事件。

需要注意的是，仅仅调用 `pushState` 方法或 `replaceState` 方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用 `back`、`forward`、`go` 方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

可以用 `onpushState` 接受回调函数，它接受一个 `event` 的回调参数，通过 `pushState` 和 `replaceState` 方法传递的第一个参数。也可以通过 `history.state` 对象获取。

注意，页面第一次加载的时候不会触发 `popstate` 事件

### URLSearchParams API

URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分

- `has()` ：返回一个布尔值，表示是否具有某个参数
- `get()` ：返回指定参数的第一个值
- `getAll()` ：返回一个数组，成员是指定参数的所有值
- `set()` ：设置指定参数
- `delete()` ：删除指定参数
- `append()` ：在查询字符串之中，追加一个键值对
- `toString()` ：返回整个查询字符串

```js
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic') // true
```

- `keys()` ：遍历所有参数名
- `values()` ：遍历所有参数值
- `entries()` ：遍历所有参数的键值对

DOM的 `a` 元素节点的 `searchParams` 属性，就是一个 `URLSearchParams` 实例。

```js
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```

`URLSearchParams `还可以与 `URL` 接口结合使用。

```js
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

## Cookie

### 概述

Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

Cookie 保存以下几方面的信息

- Cookie 的名字
- Cookie 的值
- 到期时间
- 所属域名
- 生效的路径

浏览器可以设置不接受 Cookie，也可以设置不向服务器发送 Cookie

`window.navigation.cookieEnabled` 属性返回一个布尔值，表示浏览器是否打开 Cookie 功能

`document.cookie` 返回所有 Cookie，`document.cookie` 一次只能写入一个 Cookie

### Cookie 的属性

服务器向浏览器发送 Cookie 的时候，除了 Cookie 本身的内容，还有一些可选的属性也是可以写入的，它们都必须以分号开头。

（1）value 属性

`value` 属性是必需的，它是一个键值对，用于指定Cookie的值。

（2）expires 属性

`expires` 属性用于指定 Cookie 过期时间。它的格式采用 `Date.toUTCString()` 的格式。

如果不设置该属性，或者设为`null`，Cookie只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。

浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。

（3）domain属性

`domain` 属性指定 Cookie 所在的域名，比如 `example.com` 或 `.example.com` （这种写法将对所有子域名生效）、`subdomain.example.com` 。

如果未指定，默认为设定该Cookie的域名。所指定的域名必须是当前发送Cookie的域名的一部分，比如当前访问的域名是 `example.com` ，就不能将其设为 `google.com` 。只有访问的域名匹配 `domain` 属性，Cookie 才会发送到服务器。

（4）path 属性

`path` 属性用来指定路径，必须是绝对路径（比如/、/mydir），如果未指定，默认为请求该 Cookie 的网页路径。

只有path属性匹配向服务器发送的路径，Cookie 才会发送。这里的匹配不是绝对匹配，而是从根路径开始，只要 `path` 属性匹配发送路径的一部分，就可以发送。比如，path属性等于 `/blog`，则发送路径是 `/blog` 或者 `/blog/roll` ，Cookie都会发送。path属性生效的前提是domain属性匹配。

（5）secure 属性

secure属性用来指定Cookie只能在加密协议HTTPS下发送到服务器。

该属性只是一个开关，不需要指定值。如果通信是HTTPS协议，该开关自动打开。

（6）max-age

`max-age` 属性用来指定Cookie有效期，比如 `60 * 60 * 24 * 365`（即一年31536e3秒）。

（7）HttpOnly

`HttpOnly` 属性用于设置该Cookie不能被JavaScript读取，详见下文的说明。

以上属性可以同时设置一个或多个，也没有次序的要求。如果服务器想改变一个早先设置的Cookie，必须同时满足四个条件：Cookie的 `key`、`domain`、`path` 和 `secure` 都匹配。也就是说，如果原始的Cookie是用如下的 `Set-Cookie` 设置的。

### Cookie 的限制

浏览器对 Cookie 数量的限制，规定不一样。目前，Firefox 是每个域名最多设置50个 Cookie，而 Safari 和 Chrome 没有域名数量的限制。

所有 Cookie 的累加长度限制为4KB。超过这个长度的 Cookie，将被忽略，不会被设置。

由于 Cookie 可能存在数量限制，有时为了规避限制，可以将 Cookie 设置成下面的形式。

```
name=a=b&c=d&e=f&g=h
```

上面代码实际上是设置了一个 Cookie，但是这个 Cookie 内部使用&符号，设置了多部分的内容。因此，读取这个 Cookie 的时候，就要自行解析，得到多个键值对。这样就规避了 Cookie 的数量限制。

### 同源政策

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。

### Http-Only Cookie

设置 Cookie 的时候，如果服务器加上了 `HttpOnly` 属性，则这个 Cookie 无法被 JavaScript 读取（即 `document.cookie` 不会返回这个Cookie的值），只用于向服务器发送

## Web Storage 「 浏览器端数据储存机制 」

### 概述

`sessionStorage` 保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；`localStorage` 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样。

### 操作方法

#### 存入/读取数据

```js
sessionStorage.setItem("key","value")
localStorage.setItem("key","value")
```

```js
var valueSession = sessionStorage.getItem("key")
var valueLocal = localStorage.getItem("key")
```

#### 清除数据

`removeItem('key')` 方法用于清除对应键名的值

`clear` 方法用于清除所有保存的数据

#### 遍历操作

```js
for(var i = 0;i < localStorage.length ;i++){
  console.log(localSotrage.key(i));
}
```

### storage 事件

当储存的数据发生变化的时候，会触发 storage 事件

```js
window.addEventListener("storage",callback);
```

回调函数接受一个 event 对象作为参数，这个 event 对象的 `key` 属性，保存发生变化的键名

除了 `key` 属性外， event 属性还有三个

- `oldValue` ：更新前的值。如果该键为新增加，则这个属性为 `null`。
- `newValue` ：更新后的值。如果该键被删除，则这个属性为 `null`。
- `url` ：原始触发 `storage` 事件的那个网页的网址。

值得特别注意的是，**该事件不在导致数据变化的当前页面触发**。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变 `sessionStorage` 或 `localStorage` 的数据时，其他所有页面的 `storage` 事件会被触发，而原始页面并不触发 `storage` 事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有IE浏览器除外，它会在所有页面触发 `storage` 事件。

## 同源政策

### 概述

#### 含义

1995 年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策

最初，它的函数是指，A网页设置的Cookie，B网页不能打开，除非这两个网页「同源」

- 协议形同
- 域名相同
- 端口相同

#### 目的

为了保证用户的安全，A 网站的 Cookie 没有同源政策就可以 被其它浏览的网站窃取。

#### 限制范围

- Cookie、LocalStorage 和 IndexedDB 无法读取。
- DOM 无法获得。
- AJAX 请求无效（可以发送，但浏览器会拒绝接受响应）。

### Cookie

当两个网页的一级域名相同，只是二级域名不同时，浏览器允许通过设置 `document.domain` 共享 Cookie

举例来说，A网页是 `http://w1.example.com/a.html` ，B网页是 `http://w2.example.com/b.html` ，那么只要设置相同的 `document.domain` ，两个网页就可以共享Cookie。

### iframe

关于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题

#### 片段识别符

片段标识符指的是 URL 的 `#` 号后面的部分。如果只是改变片段标识符，页面不会重新刷新

父窗口可以把信息，写入子窗口的片段标识符

```js
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```

子窗口通过 `hashchange` 事件得到通知

```js
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}r
```

同样的，子窗口也可以改变父窗口的片段标识符。

```js
parent.location.href= target + '#' + hash;
```

#### window.postMessage

接受两个参数，第一个参数是发送的数据，第二个参数是接受消息的窗口的源，即"协议+域名+端口"

```js
window.postMessage("hellp","http://example.com:80");
```

接受信息

```js
window.addEventListener("message",function(e){
  e.data//数据
})
```

`message` 事件的对象 `event` 提供三个属性

- `event.source` 发送消息的窗口
- `event.origin` 消息发向的网址
- `event.data` 消息内容

### AJAX

同源政策规定，AJAX请求只能发给同源的网址，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

#### JSONP

基本思想是，网页通过添加一个 `<script>` 元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定的回调函数里传回来

首先网页动态插入 `<script>` 元素，由它向跨源网址发出请求

```js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

```js
foo({
  "ip": "8.8.8.8"
});
```

#### WebSocket

WebSocket是一种通信协议，使用 `ws://`（非加密）和 `wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是 `Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了 `Origin` 这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

#### CORS

CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源AJAX请求的根本解决方法。相比 `JSONP` 只能发 `GET` 请求，CORS允许任何类型的请求。

## CORS 通信

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

### 两种请求

简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求

请求方法是以下三种之一

- HEAD
- GET
- POST

HTTP 的头信息不超出以下几种字段

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type: 只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain


### 简单请求

#### 基本流程

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段。

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

如果 `Origin` 指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含 `Access-Control-Allow-Origin` 字段，就知道出错了，从而抛出一个错误，被 `XMLHttpRequest` 的 `onerror` 回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是 `200` 。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

#### withCredentials 属性

上面说到，CORS请求默认不包含Cookie信息（以及HTTP认证信息等）。如果需要包含Cookie信息，一方面要服务器同意，指定 `Access-Control-Allow-Credentials` 字段。

```
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在AJAX请求中打开 `withCredentials` 属性。

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```


