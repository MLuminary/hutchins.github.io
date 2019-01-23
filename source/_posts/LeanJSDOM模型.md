---
title: LeanJs「 ES5 」-- DOM 模型
date: 2018-01-27 21:24:07
tags: 
    - LeanJs
    - ES5
category: Note    
---
![Js](LeanJSDOM模型/js.png)

<!--more-->

## DOM模型概述

文档对象模型(Document Object Model)

### 节点

DOM 的最小组成单位叫做节点，节点的类型有 7 种

- `Document` : 整个文档数的顶层节点
- `DocumentType` : `doctype`标签
- `Element` : 网页的各种HTML标签
- `Attribute` : 网页元素的属性
- `Text` : 标签之间或标签包含的文本
- `Comment` : 注释
- `DocumentFragment` : 文档的片段

这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

### 特征相关属性

所有节点对象都是浏览器内置 `Node` 对象的实例，继承了 `Node` 属性和方法。

可以用 `console.dir(Node)` 查看方法

#### Node.nodeName Node.nodeType

| 类型 | nodeName |	nodeType |
|----|------|------|
|ELEMENT_NODE|	大写的HTML元素名|	1|
|ATTRIBUTE_NODE| 等同于Attr.name|	2|
|TEXT_NODE	|#text	|3|
|COMMENT_NODE	|#comment|	8|
|DOCUMENT_NODE|	#document|	9|
|DOCUMENT_FRAGMENT_NODE|	#document-fragment|	11|
|DOCUMENT_TYPE_NODE	| 等同于DocumentType.name |10|

#### Node.nodeValue

返回一个字符串，表示当前节点本身的文本值，该属性可读写

因为只有Text节点、Comment节点，XML文档的CDATA节点有文本值，因此只有这三类节点的 `nodeValue` 可以返回结果，其它类型的节点一律返回 `null` ，也无法设置 `nodeValue` 属性

#### Node.textContent

`Node.textContent` 属性返回当前节点和他所有后代节点的文本内容

```html
<div id="test">this<span>is</span>some text</div>
```

```js
document.getElementById('test').textContent
//this is some text
```

该属性是可读写的，不过在这里要注意一点，他里面的内容会代替掉该元素其中的任何元素，而且是以文本的形式展示

```js
document.getElementById('test').textContent = '<p>just a test</p>'
```

这里的`<p></p>`并不会自动识别成 `p` 标签，而是以文本的形式展现在页面上

如果要读取整个文档的内容

```js
document.documentElement.textContent
```

#### Node.baseURI

返回一个字符串，表示当前网页的绝对路径，如果无法获取，则返回 `null`

不同节点都可以调用这个属性，一般返回的值是相同的

该属性的值一般由当前网址的URL决定，但是可以用HTML的 `<base>` 标签改变该属性的值

```js
<base href="http://www.example.com/page.html">
```

设置 `<base>` 以后，`baseURI` 属性就返回 `<base>` 标签设置的值


#### Node.firstChild Node.lastChild

`firstChild` 属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回 `null`

```html
<p id="para-01">
  <span>First span</span>
</p>

<script type="text/javascript">
  console.log(
    document.getElementById('para-01').firstChild.nodeName
  ) // "#text"
</script>
```

上面代码中，p元素与span元素之间有空白字符，这导致firstChild返回的是文本节点。

### 节点对象的方法

#### Node.appendChild()

`Node.appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点

#### Node.hasChildNodes()

`Node.hasChildNodes` 方法返回一个布尔值，表示当前节点是否有子节点。

#### Node.cloneNode()

`Node.cloneNode` 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是 `false` ，即不克隆子节点。

此克隆方法不会克隆绑定事件，并且如果被克隆的对象有 `id` 值的话，需要修改掉其中的一个

#### Node.insertBefore()

`insertBefore` 方法用于将某个节点插入当前节点内部的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点内部的一个子节点，新的节点将插在这个子节点的前面。该方法返回被插入的新节点。

#### Node.removeChild()

`Node.removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。它返回被移除的子节点。

#### Node.replaceChild()

`Node.replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

#### Node.contains()

`Node.contains` 方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。

#### Node.compareDocumentPosition()

`compareDocumentPosition` 方法的用法，与 `contains` 方法完全一致，返回一个7个比特位的二进制值，表示参数节点与当前节点的关系。

#### Node.isEqualNode()

`isEqualNode` 方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

#### Node.normalize()

`normailize` 方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。


### 节点的集合对象

#### NodeList 对象

`NodeList` 实例对象是一个类似数组的对象，它的成员是节点对象。节点数的变化会改变对应的 `NodeList` ，因为是类数组，它不能直接调用数组的一些方法。

#### HTMLCollection 对象

`HTMLCollection` 实例对象与 `NodeList` 实例对象类似，也是节点的集合，返回一个类似数组的对象。 `document.links` 、 `docuement.forms` 、 `document.images` 等属性，返回的都是 `HTMLCollection` 实例对象。

`HTMLCollection` 与 `NodeList` 的区别有以下几点。

1. `HTMLCollection` 实例对象的成员只能是 `Element` 节点，`NodeList` 实例对象的成员可以包含其他节点。

2.` HTMLCollection` 实例对象都是动态集合，节点的变化会实时反映在集合中。`NodeList` 实例对象可以是静态集合。

3. `HTMLCollection` 实例对象可以用 `id` 属性或 `name` 属性引用节点元素， `NodeList` 只能使用数字索引引用。

### ParentNode 接口，ChildNode 接口

不同的节点除了继承 `Node` 接口以外，还会继承其他接口。`ParentNode` 接口用于获取当前节点的 `Element` 子节点， `ChildNode` 接口用于处理当前节点的子节点（包含但不限于 `Element` 子节点）。

#### ParentNode接口

`ParentNode` 接口用于获取 `Element` 子节点。`Element` 节点、`Document` 节点和 `DocumentFragment` 节点，部署了 `ParentNode` 接口。凡是这三类节点，都具有以下四个属性，用于获取Element子节点。

children

`children` 属性返回一个动态的 `HTMLCollection` 集合，由当前节点的所有 `Element` 子节点组成。


firstElementChild

`firstElementChild` 属性返回当前节点的第一个 `Element` 子节点，如果不存在任何  `Element`子节点，则返回 `null` 。

lastElementChild

`lastElementChild` 属性返回当前节点的最后一个 `Element` 子节点，如果不存在任何 `Element` 子节点，则返回 `null`。

childElementCount

`childElementCount` 属性返回当前节点的所有 `Element` 子节点的数目。

#### ChildNode 接口

`ChildNode` 接口用于处理子节点（包含但不限于 `Element` 子节点）。`Element` 节点、`DocumentType` 节点和 `CharacterData` 接口，部署了 `ChildNode` 接口。凡是这三类节点（接口），都可以使用下面四个方法。

remove()

`remove` 方法用于移除当前节点。

```js
el.remove()
```

上面方法在DOM中移除了 `el` 节点。注意，调用这个方法的节点，是被移除的节点本身，而不是它的父节点。

before()

`before` 方法用于在当前节点的前面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

after()

`after` 方法用于在当前节点的后面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

replaceWith()

`replaceWith` 方法使用参数指定的节点，替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。

## Document 节点

### 内部属性节点

#### document.doctype

`document` 对象的第一个子节点，包含了文档类型，通常 `document.firstChild` 返回这个节点

#### document.documentElement

`document` 对象的第二个子节点，对于HTML网页，返回 `<html>` 节点 

#### document.defaultView 

在浏览器中返回 `document` 对象所在的 `window` 对象，否则返回 `null`

#### document.body,document.head

document.head属性返回当前文档的 `<head>` 节点，`document.body` 属性返回当前文档的 `<body>`。

#### document.activeElement

`document.activeElement` 属性返回当前文档中获得焦点的那个元素。用户通常可以使用Tab键移动焦点，使用空格键激活焦点。比如，如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接。

### 节点集合属性

#### document.links，document.forms，document.images，document.embeds

`document.links` 属性返回当前文档所有设定了 `href` 属性的 `a` 及 `area` 元素。

`document.forms` 属性返回页面中所有表单元素 `form`。

`document.images` 属性返回页面所有图片元素（即 `img` 标签）。

`document.embeds` 属性返回网页中所有嵌入对象，即 `embed` 标签。

以上四个属性返回的都是 `HTMLCollection` 对象实例

#### document.scripts，document.styleSheets

`document.scripts` 属性返回当前文档的所有脚本（即 `script` 标签）。

`document.scripts`返回的也是 `HTMLCollection` 实例。

`document.styleSheets` 属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有 `cssRules` 属性，返回该样式表的所有CSS规则，这样这可以操作具体的CSS规则了。

### 文档信息属性

#### document.documentURI，document.URL

`document.documentURI` 属性和 `document.URL` 属性都返回一个字符串，表示当前文档的网址。不同之处是 `documentURI` 属性可用于所有文档（包括 XML 文档），`URL` 属性只能用于 `HTML` 文档。

#### document.domain

`document.domain` 属性返回当前文档的域名。比如，某张网页的网址是 http://www.example.com/hello.html ，`domain` 属性就等于 `www.example.com`。如果无法获取域名，该属性返回 `null`。

#### document.lastModified

`document.lastModified` 属性返回当前文档最后修改的时间戳，格式为字符串。

注意，`lastModified` 属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用 `Date.parse` 方法转成时间戳格式，才能进行比较。

#### document.location

属性

```js
// 当前网址为 http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol // "http:"
document.location.host // "www.example.com:4097"
document.location.hostname // "www.example.com"
document.location.port // "4097"
document.location.pathname // "/path/a.html"
document.location.search // "?x=111"
document.location.hash // "#part1"
document.location.user // "user"
document.location.password // "passwd"
```

方法

```js
// 跳转到另一个网址
document.location.assign('http://www.google.com')
// 优先从服务器重新加载
document.location.reload(true)
// 优先从本地缓存重新加载（默认值）
document.location.reload(false)
// 跳转到新网址，并将取代掉history对象中的当前记录
document.location.replace('http://www.google.com');
// 将location对象转为字符串，等价于document.location.href
document.location.toString()
```

#### document.referrer，document.title，document.characterSet

`document.referrer` 属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。

`document.referrer` 的值，总是与HTTP头信息的 `Referer` 保持一致，但是它的拼写有两个 `r` 。

`document.title` 属性返回当前文档的标题，该属性是可写的。

#### document.readyState

`document.readyState` 属性返回当前文档的状态，共有三种可能的值。

- `loading`：加载HTML代码阶段（尚未完成解析）
- `interactive`：加载外部资源阶段时
- `complete`：加载完成时

#### document.designMode

`document.designMode` 属性控制当前文档是否可编辑，通常用在制作所见即所得编辑器。打开 `iframe` 元素包含的文档的 `designMode` 属性，就能将其变为一个所见即所得的编辑器。

#### document.implementation

`document.implementation` 属性返回一个对象，用来甄别当前环境部署了哪些DOM相关接口。`implementation` 属性的 `hasFeature` 方法，可以判断当前环境是否部署了特定版本的特定接口。

#### document.compatMode

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。

#### document.cookie

操作浏览器的Cookie

### 读写相关的方法

#### document.write()，document.writeln()

如果页面已经解析完成（`DOMContentLoaded`事件发生之后），再调用`write`方法，它会先调用`open`方法，擦除当前文档所有内容，然后再写入。

```js
document.addEventListener('DOMContentLoaded', function (event) {
  document.write('<p>Hello World!</p>');
});

// 等同于

document.addEventListener('DOMContentLoaded', function (event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});
```

`document.writeln` 方法与 `write` 方法完全一致，除了会在输出内容的尾部添加换行符。

### 查找节点的方法

#### document.querySelector()，document.querySelectorAll()

`document.querySelector` 方法接受一个CSS选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 `null`。

`document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。

支持复杂的CSS选择器，但是不支持伪元素的选择器

#### document.getElementsByTagName()

`document.getElementsByTagName` 方法返回所有指定HTML标签的元素，返回值是一个类似数组的 `HTMLCollection` 对象，可以实时反映HTML文档的变化。如果没有任何匹配的元素，就返回一个空集。

#### document.getElementsByClassName()

`document.getElementsByClassName` 方法返回一个类似数组的对象（HTMLCollection实例对象），包括了所有 `class` 名字符合指定条件的元素，元素的变化实时反映在返回结果中。

#### document.getElementsByName()

`document.getElementsByName` 方法用于选择拥有 `name` 属性的HTML元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和`<object>`等），返回一个类似数组的的对象（`NodeList`对象的实例），因为`name`属性相同的元素可能不止一个。

#### getElementById()

`getElementById` 方法返回匹配指定 `id` 属性的元素节点。如果没有发现匹配的节点，则返回 `null`。

#### document.elementFromPoint()

`document.elementFromPoint` 方法返回位于页面指定位置最上层的 `Element` 子节点。

```js
var element = document.elementFromPoint(50, 50);
```

上面代码选中在 `(50, 50)` 这个坐标位置的最上层的那个HTML元素。


`elementFromPoint` 方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的HTML元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回 `null`。

### 生成节点的方法

#### document.createElement()

`document.createElement` 方法用来生成网页元素节点。

#### document.createTextNode()

`document.createTextNode` 方法用来生成文本节点，参数为所要生成的文本节点的内容。

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```js
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

上面代码中，`createTextNode` 方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

`createTextNode` 方法不转义双引号

#### document.createAttribute()

`document.createAttribute` 方法生成一个新的属性对象节点，并返回它。

参数是这个属性的名称

#### document.createDocumentFragment()

`createDocumentFragment` 方法生成一个DocumentFragment对象。

`DocumentFragment `对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为**`DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现**。

### 事件相关的方法

#### document.createEvent()

`document.createEvent` 方法生成一个事件对象，该对象可以被 `element.dispatchEvent` 方法使用，触发指定事件。

#### document.addEventListener()，document.removeEventListener()，document.dispatchEvent()

```js
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

### 其他方法

#### document.hasFocus()

`document.hasFocus` 方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

#### document.createNodeIterator()，document.createTreeWalker()

`document.createNodeIterator` 方法返回一个DOM的子节点遍历器。

`document.createTreeWalker` 方法返回一个DOM的子树遍历器。它与`createNodeIterator` 方法的区别在于，后者只遍历子节点，而它遍历整个子树。

#### document.adoptNode()

`document.adoptNode` 方法将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

#### document.importNode()

`document.importNode` 方法从外部文档拷贝指定节点，插入当前文档。

## Element 节点

### 特征相关的属性

#### Element.attributes

`Element.attributes` 属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点

#### Element.id，Element.tagName

`Element.id` 属性返回指定元素的 `id` 属性，该属性可读写

`Element.tagName` 属性返回指定元素的大写标签名，与 `nodeName` 属性的值相等。

#### Element.innerHTML

`Element.innerHTML `属性返回该元素包含的 HTML 代码。该属性可读写，常用来设置某个节点的内容。

**注意**

如果文本节点中包含&、小于号和大于号，`innerHTML` 属性会将它们转为实体形式 `&amp;` 、 `&lt;` 、 `&gt;`。

如果文本中含有 `<script>` 标签，虽然可以生成 `script` 节点，但是插入的代码不会执行，但是 `innerHTML` 还是有安全风险

```js
var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;
```

上面代码中 `alert` 还是会执行的，因此为了安全考虑，如果插入的是文本，最好用 `textContent` 属性代替 `innerHTML`

#### Element.outerHTML

`Element.outerHTML` 属性返回一个字符串，内容为指定元素节点的所有 HTML 代码，包括它自身和包含的所有子元素。

`outerHTML` 属性是可读写的，对它进行赋值，等于替换掉当前元素。

```js
// HTML代码如下
// <div id="container"><div id="d">Hello</div></div>

container = document.getElementById('container');
d = document.getElementById("d");
container.firstChild.nodeName // "DIV"
d.nodeName // "DIV"

d.outerHTML = '<p>Hello</p>';
container.firstChild.nodeName // "P"
d.nodeName // "DIV"
```

上面代码中，`outerHTML` 属性重新赋值以后，内层的 `div` 元素就不存在了，被 `p` 元素替换了。但是，变量 `d` 依然指向原来的 `div` 元素，这表示被替换的 `DIV` 元素还存在于内存中。

#### Element.className , Element.classList

```html
<div class="one two three" id="myDiv"></div>
```

上面代码的 `className` 属性和 `classList` 属性如下

```js
document.getElementById('myDiv').className
//'one two three'

document.getElementById('myDiv').classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
```

classList 对象有下列几种方法

- `add()` : 增加一个class
- `remove()` : 移除一个class
- `contains()` : 检查当前元素是否包含某个class
- `toggle()` : 将某个class移入或移出元素（如果存在就移除，不存在就添加）
- `item()` : 返回指定索引位置的class
- `toString()` : 将class的列表转为字符串

### 盒装模型相关属性

#### Element.clientHeight,Element.clientWidth

返回元素节点可见部分的高度，不包括溢出(overflow)的大小

这两个属性的值等元素的css高度（宽度）加上css的padding减去滚动条（如果存在滚动条），单位为像素。

#### Element.clientLeft,Element.clientTop

`Element.clientLeft` 属性等于元素节点左边框的宽度，`Element.clientTop` 属性等于元素节点顶部边框的宽度，单位为像素

如果元素设置了 `display:inline` 它的 `clientLeft` 属性一律为 `0`

#### Element.scrollLeft,Element.scrollTop

`Element.scrollLeft`属性表示网页元素的水平滚动条向右侧滚动的像素，`Element.scrollTop`属性表示网页元素的垂直滚动条向下滚动的像素数量，对于没有滚动条的网页元素，这两个属性总是等于0

如果要查看整张网页的水平的垂直的滚动距离，要从`document.documentElement` 元素上读取

#### Element.scrollWidth,Element.scrollHeight

`Element.scrollHeight` 属性返回某个网页元素的总高度，`Element.scrollWidth` 属性返回总宽度，可以理解成元素在垂直和水平两个方向上可以滚动的距离。它们都包括由于溢出容器而无法显示在网页上的那部分高度或宽度。这两个属性是只读属性。

如果内容正好适合它的容器，没有溢出，那么 `Element.scrollHeight` 和 `Element.clientHeight` 是相等的，如果存在溢出，那么 `scrollHeight` 属性大于`clientHeight` 属性，宽度也是同样。

当存在溢出的时候，滚动条滚动到内容底部时，下列表达式为  `true` 

```js
element.scrollHeight - element.scrollTop === element.clientHeight 
```

#### Element.offsetHeight , Element.offsetWidth

`Element.offsetHeight` 属性返回元素的垂直高度，`Element.offsetWidth` 属性返回水平宽度。`offsetHeight` 可以理解成元素左下角距离左上角的位移，`offsetWidth` 是元素右上角距离左上角的位移。它们的单位为像素，都是只读。

这两个属性值包括 `Padding` 和 `Border` 、以及滚动条。这也意味着，如果不存在内容溢出，`Element.offsetHeight` 只比 `Element.clientHeight` 多了边框的高度。

#### Element.offsetLeft，Element.offsetTop

`Element.offsetLeft` 返回当前元素左上角相对于 `Element.offsetParent` 节点的水平位移，`Element.offsetTop` 返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。


### 相关节点的属性

#### Element.children，Element.childElementCount

`Element.children` 属性返回一个 `HTMLCollection` 对象，包括当前元素节点的所有子元素

这个属性与 `Node.childNodes` 属性的区别是，它只包括HTML元素类型的子节点，不包括其他类型的子节点。

`Element.childElementCount` 属性返回当前元素节点包含的子HTML元素节点的个数，与`Element.children.length` 的值相同。注意，该属性只计算HTML元素类型的子节点。

#### Element.firstElementChild，Element.lastElementChild

`Element.firstElementChild` 属性返回第一个HTML元素类型的子节点，`Element.lastElementChild` 返回最后一个HTML元素类型的子节点

#### Element.nextElementSibling，Element.previousElementSibling

`Element.nextElementSibling` 属性返回当前HTML元素节点的后一个同级HTML元素节点

`Element.previousElementSibling` 属性返回当前HTML元素节点的前一个同级HTML元素节点


#### Element.offsetParent

`Element.offsetParent` 属性返回当前 HTML 元素的最靠近的、并且 CSS 的 `position` 属性不等于 `static` 的上层元素

如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。

### 属性相关的方法

- `Element.getAttribute()`：读取指定属性
- `Element.setAttribute()`：设置指定属性
- `Element.hasAttribute()`：返回一个布尔值，表示当前元素节点是否有指定的属性
- `Element.removeAttribute()`：移除指定属性

### 查找相关方法

- `Element.querySelector()`
- `Element.querySelectorAll()`
- `Element.getElementsByTagName()`
- `Element.getElementsByClassName()`

### 事件相关的方法

- `Element.addEventListener()` ：添加事件的回调函数
- `Element.removeEventListener()` ：移除事件监听函数
- `Element.dispatchEvent()` ：触发事件

### 其他方法

#### Element.scrollIntoView()

`Element.scrollIntoView` 方法滚动当前元素，进入浏览器的可见区域，类似于设置`window.location.hash` 的效果。

#### Element.getBoundingClientRect()

`Element.getBoundingClientRect` 方法返回一个对象，该对象提供当前元素节点的大小、位置等信息，基本上就是CSS盒状模型提供的所有信息。

#### Element.getClientRects()

`Element.getClientRects` 方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。每个矩形都有 `bottom` 、 `height` 、 `left` 、 `right` 、 `top` 和 `width` 六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

#### Element.insertAdjacentHTML()

`Element.insertAdjacentHTML` 方法解析HTML字符串，然后将生成的节点插入DOM树的指定位置。

#### Element.remove()

`Element.remove` 方法用于将当前元素节点从DOM树删除。

#### Element.focus()

`Element.focus` 方法用于将当前页面的焦点，转移到指定元素上。

## 属性的操作

### Element.attributes 属性

返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上，其他类型的节点对象，虽然也有 `attribute` 属性，但是返回的都是 `null`

属性节点对象有 `name` 和 `value` 属性，对应该属性的属性名和属性值。等同于 `nodeName` 属性和 `nodeValue` 属性

### 元素节点对象的属性

```js
img.src
a.href
```

这种写法虽然可以读写 HTML 属性，但是无法删除属性， `delete` 运算符在这里不会生效

HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转为 JavaScript 属性名时，一律采用小写，如果属性名包括多个单词，采用驼峰拼写法

有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名

- `for` 属性改为 `htmlFor`
- `class` 属性改为 `className`


### 属性操作的标准方法

#### getAttribute()

返回当前元素节点的指定属性，只返回字符串，HTML 标签对象的属性会返回各种类型的值。

#### setAttribute()

`Element.setAttribute` 方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。


#### hasAttribute()

`Element.hasAttribute` 方法返回一个布尔值，表示当前元素节点是否包含指定属性。

#### removeAttribute()

`Element.removeAttribute` 方法用于从当前元素节点移除属性。

### dataset 属性

```html
<div id="mydiv" data-foo="bar">
```

```js
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```

可以通过 `dateset.foo` 读写 `data-foo` 属性

删除一个 `data-*` 属性，可以直接用 `delete` 命令

**注意**

`data-` 后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`）。而且，属性名不应该使用 `A` 到 `Z` 的大写字母，比如不能有 `data-helloWorld` 这样的属性名，而要写成 `data-hello-world`。

转成 `dataset` 的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，`dataset` 的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，`dataset.helloWorld` 会转成 `data-hello-world`。

## Text 节点和 DocumentFragment 节点

### Text 节点的概念 

`Text` 节点代表 `Element` 节点和 `Attribute` 节点的文本内容。如果一个节点只包含一段文本，那么它就有一个 `Text` 子节点，代表该节点的文本内容。由于空格也是一个字符，所以哪怕有一个空格，也会形成 `Text` 节点

### Text 节点的属性

#### data

`data` 属性等同于 `nodeValue` 属性，用来设置或读取 `Text` 节点的内容。

#### wholeText

`wholeText` 属性将当前 `Text` 节点与毗邻的 `Text` 节点，作为一个整体返回


```html
<p id="para">A <em>B</em> C</p>
```

```js
var el = document.getElementById("para");
el.firstChild.wholeText // "A "
el.firstChild.data // "A "
```

但是，一旦移除em节点，`wholeText` 属性与 `data` 属性就会有差异，因为这时其实P节点下面包含了两个毗邻的 `Text` 节点。

```js
el.removeChild(para.childNodes[1]);
el.firstChild.wholeText // "A C"
el.firstChild.data // "A "
```


### Text 节点的方法

`appendData` 方法用于在 `Text` 节点尾部追加字符串。

`deleteData` 方法用于删除 `Text` 节点内部的子字符串，第一个参数为子字符串位置，第二个参数为子字符串长度。

`insertData` 方法用于在 `Text` 节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。

`replaceData` 方法用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。

`subStringData` 方法用于获取子字符串，第一个参数为子字符串在 `Text` 节点中的开始位置，第二个参数为子字符串长度。

`remove` 方法用于移除当前Text节点。

`splitText` 方法将 `Text` 节点一分为二，变成两个毗邻的 `Text` 节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。

`normalize` 方法可以将毗邻的两个 `Text` 节点合并。

### DocumentFragment 节点

`DocumentFragment` 节点对象没有自己的属性和方法，全部继承自 `Node` 节点和`ParentNode` 接口。也就是说，`DocumentFragment` 节点比 `Node` 节点多出以下四个属性。

`children`：返回一个动态的 `HTMLCollection` 集合对象，包括当前 `DocumentFragment` 对象的所有子元素节点。
`firstElementChild`：返回当前`DocumentFragment`对象的第一个子元素节点，如果没有则返回`null`。
`lastElementChild`：返回当前`DocumentFragment`对象的最后一个子元素节点，如果没有则返回`null`。
`childElementCount`：返回当前`DocumentFragment`对象的所有子元素数量。

## 事件模型

### EventTarget 接口

DOM的事件操作（监听和触发），都定义在 `EventTarget` 接口。`Element` 节点、 `document` 节点和 `window` 对象，都部署了这个接口

- addEventListener 绑定事件的监听函数
- removeEventListener 移除事件的监听函数
- dispatchEvent 触发事件

### addEventListener

接受三个参数

- `type`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，表示监听函数是否在捕获阶段（capture）触发（参见后文《事件的传播》部分），默认为`false`（监听函数只在冒泡阶段被触发）。老式浏览器规定该参数必写，较新版本的浏览器允许该参数可选。为了保持兼容，建议总是写上该参数。

### removeEventListener()

`removeEventListener` 方法用来移除 `addEventListener` 方法添加的事件监听函数。

### dispatchEvent()

`dispatchEvent` 方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了 `Event.preventDefault()` ，则返回值为`false`，否则为 `true` 。

### 监听函数

事件发生时，程序所要执行的函数

#### HTML 标签的 on- 属性

使用这种发放时 `on-` 属性的值是将会执行的代码，而不是一个函数

```html
<!-- 正确 -->
<body onload="doSomething()">

<!-- 错误 -->
<body onload="doSomething">
```

#### Element 节点的事件属性

```js
div.onclick = function(event){
  //...
}
```

只会在冒泡阶段触发

#### addEventListener方法

第一种“HTML标签的on-属性”，违反了HTML与JavaScript代码相分离的原则；第二种“Element节点的事件属性”的缺点是，同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次。因此，这两种方法都不推荐使用，除非是为了程序的兼容问题，因为所有浏览器都支持这两种方法。

addEventListener是推荐的指定监听函数的方法。它有如下优点：

可以针对同一个事件，添加多个监听函数。

能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发回监听函数。

除了DOM节点，还可以部署在`window`、`XMLHttpRequest`等对象上面，等于统一了整个JavaScript的监听函数接口。

#### this 对象的指向

以下写法的 `this` 对象都指向 Element 节点

```js
element.onclick = print
element.addEventListener('click',print,false)
element.onclick = function(){console.log(this.id)}

<element onclick="console.log(this.id)">
```

以下写法的 `this` 对象，都指向全局对象

```js
element.onclick = function(){print()}
element.setAttribute('onclick','print()')

<element onclick="print()">
```

### 事件的传播

#### 传播的三个阶段

第一阶段 

从 window 对象传导到目标节点，称为「捕获」阶段

第二阶段

在目标节点触发，称为「目标」阶段

第三阶段

从目标节点传导回 window 对象，成为「冒泡」阶段

```html
<div>
  <p>Click Me</p>
</div>
``` 

- 捕获阶段：事件从`<div>`向`<p>`传播时，触发`<div>`的`click`事件；
- 目标阶段：事件从`<div>`到达`<p>`时，触发`<p>`的click事件；
- 目标阶段：事件离开`<p>`时，触发`<p>`的`click`事件；
- 冒泡阶段：事件从`<p>`传回`<div>`时，再次触发`<div>`的`click`事件

用户点击时，浏览器总是假定 `click` 事件的目标节点就是点击位置的嵌套最深的那个节点。所以 `<p>` 节点的捕获阶段和冒泡阶段会是 `target` 阶段

事件传播的最上层对象是 `window` 接着依次是 `document` `body` 如果 `<body>` 元素中有一个 `<div>` 元素,点击该元素，在捕获阶段为 `window`、`document`、`html`、`body`、`div` ， 在冒泡阶段依次为 `div`、`body`、`html`、`document`、`window`。

#### 事件的代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

如果希望事件到某个节点为止不再传播，可以使用事件对象的 `stopPropagation` 方法。
但是 `stopPropagation` 方法只会阻止当前监听函数的传播，不会阻止节点上的其它同样事件的监听函数，如果想要不再触发那些监听函数，可以使用 `stopImmediatePropagation` 

### Event 对象

事件发生以后，会生成一个事件对象，作为参数传给监听函数。浏览器原生提供了一个 `Event` 对象，所有的事件都是这个对象的实例，或者说继承了 `Event.prototype` 对象

```js
event = new Event(typeArg,eventInit)
```

`Event`构造函数接受两个参数。第一个参数是字符串，表示事件的名称；第二个参数是一个对象，表示事件对象的配置。该参数可以有以下两个属性。

- `bubbles`：布尔值，可选，默认为`false`，表示事件对象是否冒泡。
- `cancelable`：布尔值，可选，默认为`false`，表示事件是否可以被取消。

#### event 属性

`bubbles` 属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，只能在新建事件时改变。除非显式声明，Event构造函数生成的事件，默认是不冒泡的。

`eventPhase` 属性返回一个整数值，表示事件目前所处的阶段。

- 0，事件目前没有发生。
- 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。该过程是从`Window`对象到`Document`节点，再到`HTMLHtmlElement`节点，直到目标节点的父节点为止。
- 2，事件到达目标节点，即`target`属性指向的那个节点。
- 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。该过程是从父节点一直到`Window`对象。只有`bubbles`属性为`true`时，这个阶段才可能发生。

`cancelable` 属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，只能在新建事件时改变。除非显式声明，`Event`构造函数生成的事件，默认是不可以取消的

`defaultPrevented` 属性返回一个布尔值，表示该事件是否调用过 `preventDefault` 方法。。


#### event.currentTarget，event.target

`currentTarget` 属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点，`target` 属性返回事件正发生的节点

```js
function hide(e){
  console.log(this === e.target);  // 有可能不是true
  e.target.style.visibility = "hidden";
}

// HTML代码为
// <p id="para">Hello <em>World</em></p>
para.addEventListener('click', hide, false);
```

点击 World 会隐藏 `<em>` 节点，`event.currentTarget` 为 `<p>` ，`event.target` 为 `<em>` 节点

在 IE6-IE8 中，该属性的名字不是 `target` ，而是 `srcElement`。

#### event.type，event.detail，event.timeStamp，event.isTrusted


`type` 属性返回一个字符串，表示事件类型，大小写敏感。

`detail` 属性返回一个数值，表示事件的某种信息。具体含义与事件类型有关，对于鼠标事件，表示鼠标按键在某个位置按下的次数，比如对于`dblclick`事件，`detail`属性的值总是`2`。

`timeStamp` 属性返回一个毫秒时间戳，表示事件发生的时间。

`isTrusted` 属性返回一个布尔值，表示该事件是否为真实用户触发。

#### event.preventDefault()

`preventDefault` 方法取消浏览器对当前事件的默认行为，比如点击链接后，浏览器跳转到指定页面，或者按一下空格键，页面向下滚动一段距离。该方法生效的前提是，事件对象的`cancelable`属性为`true`，如果为`false`，则调用该方法没有任何效果。

#### event.stopPropagation()

`stopPropagation` 方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上新定义的事件监听函数。

#### event.stopImmediatePropagation()

`stopImmediatePropagation` 方法阻止同一个事件的其他监听函数被调用。

## 事件种类

### 鼠标事件

#### onclick ,dblclick

鼠标单击定义为用户在同一个位置完成一次 `mousedown` 和 `mouseup` 动作。 他们的触发顺序是 `mousedown` 首先触发， `mouseup` 接着触发 `click` 最后触发

`dblclick` 事件当用户在 `element`、`document`、`window` 对象上，双击鼠标时触发。该事件会在 `mousedown`、`mouseup`、`click`之后触发。

#### mouseup mousedown mousemove

`mouseup` 事件在释放按下的鼠标键时触发。

`mousedown` 事件在按下鼠标键时触发。

`mousemove` 事件当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会**连续触发**。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次代码。

#### mouseover，mouseenter

`mouseover`事件和`mouseenter`事件，都是鼠标**进入一个节点时触发**。

两者的区别是，`mouseenter`事件只触发一次，而只要鼠标在节点内部移动，`mouseover` 事件会在**子节点上触发多次**。

#### mouseout，mouseleave 

`mouseout` 事件和 `mouseleave` 事件，都是鼠标离开一个节点时触发。

两者的区别是，`mouseout` 事件会冒泡，`mouseleave` 事件不会。子节点的 `mouseout` 事件会冒泡到父节点，进而触发父节点的 `mouseout` 事件。`mouseleave` 事件就没有这种效果，所以离开子节点时，不会触发父节点的监听函数。

#### contextmenu 事件

`contextmenu` 事件在一个节点上点击鼠标右键时触发，或者按下「上下文菜单」键时触发。

### MouseEvent 对象

#### altKey，ctrlKey，metaKey，shiftKey

以下属性返回一个布尔值，表示鼠标事件发生时，是否同时按下某个键。

- `altKey` 属性 ：Alt 键
- `ctrlKey` 属性 ：Ctrl 键
- `metaKey` 属性 ：Meta 键（Mac键盘是一个四瓣的小花，Windows键盘是Windows键）
- `shiftKey` 属性 ：Shift 键

#### button，buttons

`button` 属性返回一个数值，表示按下了鼠标哪个键。

- -1：没有按下键。
- 0：按下主键（通常是左键）。
- 1：按下辅助键（通常是中键或者滚轮键）。
- 2：按下次键（通常是右键）。

`buttons` 属性返回一个3个比特位的值，表示**同时按下了哪些键**。它用来处理同时按下多个鼠标键的情况。

- 1：二进制为001，表示按下左键。
- 2：二进制为010，表示按下右键。
- 4：二进制为100，表示按下中键或滚轮键。

同时按下多个键的时候，每个按下的键对应的比特位都会有值。比如，同时按下左键和右键，会返回3（二进制为011）。

#### clientX，clientY

`clientX`，`clientY` 属性返回鼠标位置相对于浏览器窗口左上角的水平垂直坐标，单位为像素，与页面是否横向滚动无关。

#### movementX，movementY

`movementX` 属性返回一个水平位移，单位为像素，表示当前位置与上一个 `mousemove` 事件之间的水平距离。在数值上，等于 `currentEvent.movementX` = `currentEvent.screenX` - `previousEvent.screenX`。

#### screenX，screenY

`screenX`，`screenY` 属性返回鼠标位置相对于屏幕左上角的水平坐标，单位为像素。

### Wheel 事件

`Wheel` 事件是与鼠标滚轮相关的事件，目前只有一个 `Wheel` 事件。用户滚动滚轮，触发此事件

该事件继承了 MouseEvent ，UIEvent ，Event 属性 ，还有几个自己的属性

- deltaX : 返回一个数值，表示一个滚轮的水平滚动量
- deltxY : 返回一个数值，表示一个滚轮的垂直滚动量
- deltxZ : 返回一个数值，表示一个滚轮的Z轴滚动量
- deltaMode : 返回一个数值，表示一个单位。0为像素，1表示行，2表示页

### 键盘事件

- keydown : 按下键盘时触发的事件
- keypress : 只要按下的键并非 Ctrl ， Alt ，Shift 和 Meta ，就接着触发 keypress 事件
- keyup : 松开键盘时触发该事件

如果用户一直按键不松开，就会连续触发键盘事件，触发的事件如下

- keydown
- keypress
- keydown
- keypress
- 「重复以上过程」
- keyup

keyBoard 事件还有几个可配置字段

- key : 默认为空字符串，返回按下的键的字符串
- ctrlKey : 是否按下 ctrl 键
- shiftKey : 是否按下 shift 键
- altKey : 是否按下 alt 键
- metaKey : 是否按下 meta 键
- charCode : 返回一个数值，表示keypress按键的Unicode值，该属性已从标准中移除

### 进度事件

- abort : 当进度事件被中止时触发。如果发生错误，导致事件中止，不会触发该事件
- error : 由于错误导致资源无法加载时触发
- load : 进度成功结束时触发
- loadstart : 进度开始时触发
- loadend : 进度停止时触发，发生顺序在 `error` 事件、 `abort` 事件、`load` 事件后面
- progress : 当操作处于进度之中，由传输的数据块不断触发
- timeout : 进度超过限时触发


有时候，图片加载会在脚本运行之前就完成，尤其是脚本放置在网页底部的时候，因此有可能使得 `load` 和 `error` 事件的监听函数根本不会执行，`error` 事件的监听函数最好放在 `img` 元素的 HTML 属性中，这样才能保证发生错误时百分之百执行。`error` 事件也不会冒泡

`progress` 事件也有几个属性

- lenthComputable : 返回一个布尔值，表示当前进度是否具有可计算的长度，如果为 `false` ，就表示当前进度无法测量
- total : 返回一个数值，表示当前进度的总长度，如果是通过 HTTP 下载某个资源，表示内容本身的长度，不含 HTTP 头部的长度。如果 `lengthComputable` 属性为 `false` ，则 `total` 属性就无法去的正确的值
- loaded : 返回一个数值，表示当前进度已经完成的数量。该属性除以 `total` 属性就可以得到目前进度的百分比

### 拖拉事件

拖拉指的是，用户在某个对象上按下鼠标键不放，拖动它到另一个位置，然后释放鼠标键，将该对象放在那里

图片和链接不加本身就可以拖动，`Element` 节点需要设置 `draggable` 属性为 `true` ，但是这样鼠标就无法选中该字节内部的文字和子节了

#### 事件种类

当 `Element` 节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件

在拖拉节点上触发的事件

- drag事件 ： 拖拉过程中，在被拖拉的节点上持续触发
- dragstart事件 ：拖拉开始时触发，该事件的 `target` 属性是被拖拉的节点
- dragend事件 ： 在拖拉结束时触发

在目标节点上触发的事件

- dragenter事件 ： 拖拉进入当前节点时触发
- dragover事件 ：拖拉到当前节点上方时持续触发
- dragleave事件 ：拖拉离开当前范围节点时触发
- drop事件 ：被拖拉的节点释放，目标节点触发

**注意**

- 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发
- 将文件从操作系统拖拉进浏览器，不会触发 `dragstart` 和 `dragend` 事件
- `dragenter` 和 `dragover` 事件默认设置为当前节点不允许drop，如果想要在目标节点上 `drop` 拖拉的数据，首先必须阻止这两个事件的默认行为，或者取消这两个事件

```html
<div ondragover="event.preventDefault()"></div>
```

#### DataTransfer 对象概述

所有的拖拉事件都有一个 dataTransfer 属性，用来保存需要传递的数据。这个属性的值是一个 DataTransfer 对象

拖拉的数据保存两方面的数据，数据的种类和数据的数值，种类是一个MIME字符串，数据的值是一个字符串

拖拉开始时提供数据类型和数据值，`dragenter` 和 `dragover` 事件检查数据，以确定是否准许放下。

#### DataTransfer 对象的属性

**dropEffect**

设置放下被拖拉节点时的效果

- copy 复制被拖拉的节点
- move 移动被拖拉的节点
- link 创建指向被拖拉的节点的链接
- none 无法放下被拖拉的节点

一般在 `dragenter` 和 `dragover` 事件的监听函数中设置，对于 `dragstart`、`drag`、`dragleave` 这三个事件，该属性不起作用。进入目标节点后，用户可通过Shift键和Control键，改变初始值

箭头会根据 `dropEffect` 属性改变形状

**effectAllowed**

`effectAllowed` 属性设置本次拖拉中允许的效果

- copy 复制被拖拉的节点
- move 移动被拖拉的节点
- link 创建指向被拖拉节点的链接
- copyLink 允许copy或link
- copyMove 允许copy或move
- linkMove 允许link或move
- all 允许所有效果
- none 无法放下被拖拉的节点
- uninitialized 默认值，等同于all

只要 `dropEffect` 属性和 `effectAllowed` 属性之中，有一个为none，就无法在目标节点完成  `drop` 操作

**files**

`files` 属性是一个 FileList 对象，如果本次拖拉不涉及文件，则属性为空的 FileList 对象

通过 `files` 属性读取拖拉文件的信息，如果想要读取文件的内容，要使用 FileReader 对象

**types**

`types` 属性是一个数组，保存每一次拖拉的数据格式，比如拖拉文件，则格式信息为File

#### DataTransfer 对象的方法

**setData()**

`setData` 方法用来设置事件所带有的指定类型的数据。它接受两个参数，第一个是数据类型，第二个是具体数据。如果指定的类型在现有数据中不存在，则该类型将写入 `types` 属性；如果已经存在，在该类型的现有数据将被替换。

如果拖拉文本框或者拖拉选中的文本，会默认将文本数据添加到 `dataTransfer` 属性，不用手动指定。

```html
<div draggable="true" ondragstart="
  event.dataTransfer.setData('text/plain', 'bbb')">
  aaa
</div>
```

上面代码中，拖拉数据实际上是 bbb ，而不是 aaa

由于 `text/plain` 是最普遍支持的格式，为了保证兼容性，建议最后总是将数据保存一份纯文本的格式。

```js
var dt = event.dataTransfer;

// 添加链接
dt.setData("text/uri-list", "http://www.example.com");
dt.setData("text/plain", "http://www.example.com");
// 添加HTML代码
dt.setData("text/html", "Hello there, <strong>stranger</strong>");
dt.setData("text/plain", "Hello there, <strong>stranger</strong>");
// 添加图像的URL
dt.setData("text/uri-list", imageurl);
dt.setData("text/plain", imageurl);
```

**getData()**

`getData` 方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用 `setData` 方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有 `drop` 事件触发后，才能取出数据。如果取出另一个域名存放的数据，将会报错。

**clearData()**

`clearData` 方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则原数据不受影响。

**setDragImage()**

拖动过程中（ `dragstart` 事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置 。`setDragImage` 方法可以用来自定义这张图片，它接受三个参数，第一个是`img` 图片元素或者 `canvas` 元素，如果省略或为 `null` 则使用被拖动的节点的外观，第二个和第三个参数为鼠标相对于该图片左上角的横坐标和右坐标。

```js
div.addEventListener('dragstart',function(e){
  var img = document.createElement("img");
  img.src="http://path/to/img";
  e.dataTransfer.setDragImage(img,0,0);
},false)
```

### 触摸事件

Touch 对象表示触摸点，多个触摸点由 TouchList 对象表示，TouchEvent 对象代表由触摸引发的事件。

很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。这是为了让那些只定义鼠标事件、没有定义触摸事件的代码，在触摸屏的情况下仍然能用。如果想避免这种情况，可以用 `preventDefault` 方法阻止发出鼠标事件。

#### Touch 对象

Touch 对象代表一个触摸点

**identifier**

`identifier` 属性表示 `Touch` 实例的独一无二的识别符。它在整个触摸过程中保持不变。

**screenX，screenY，clientX，clientY，pageX，pageY**

`screenX` 属性和 `screenY` 属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。

`clientX` 属性和 `clientY` 属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。

`pageX` 属性和 `pageY` 属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。

**radiusX，radiusY，rotationAngle**

`radiusX` 属性和 `radiusY` 属性，分别返回触摸点周围受到影响的椭圆范围的X轴和Y轴，单位为像素。

`rotationAngle` 属性表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间。

上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。

**force**

`force `属性返回一个0到1之间的数值，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力。

**target**

`target` 属性返回一个Element节点，代表触摸发生的那个节点。

#### TouchList 对象

`TouchList` 对象是一个类似数组的对象，成员是与某个触摸事件相关的所有触摸点。

`TouchList` 实例的 `identifiedTouch` 方法和 `item` 方法，分别使用id属性和索引值（从0开始）作为参数，取出指定的 `Touch` 对象。

#### TouchEvent 对象

**键盘相关属性**

- altKey 是否按下alt键
- ctrlKey 是否按下ctrl键
- metaKey 是否按下meta键
- shiftKey 是否按下shift键

**changedTouches**

`changedTouches` 属性返回一个 `TouchList` 对象，包含了由当前触摸事件引发的所有 `Touch` 对象（即相关的触摸点）。

**targetTouches**

`targetTouches` 属性返回一个 `TouchList` 对象，包含了触摸的目标Element节点内部，所有仍然处于活动状态的触摸点。

**touches**

`touches` 属性返回一个 `TouchList` 对象，包含了所有仍然处于活动状态的触摸点。

#### 触摸事件的种类

- touchstart：用户接触触摸屏时触发，它的target属性返回发生触摸的Element节点。
- touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件的target属性是一致的，它的changedTouches属性返回一个TouchList对象，包含所有不再触摸的触摸点（Touch对象）。
- touchmove：用户移动触摸点时触发，它的target属性与touchstart事件的target属性一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
- touchcancel：触摸点取消时触发，比如在触摸区域跳出一个情态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏区域）、用户放置更多的触摸点（自动取消早先的触摸点）。

### 表单事件

#### Input事件，select事件，change事件

`input` 事件当 `<input>`、`<textarea>` 的值发生变化时触发。此外，打开`contenteditable` 属性的元素，只要值发生变化，也会触发 `input` 事件。

`input` 事件的一个特点，就是会连续触发，比如用户每次按下一次按键，就会触发一次`input` 事件。


`select` 事件当在 `<input>`、`<textarea>` 中选中文本时触发。

`Change` 事件当 `<input>`、`<select>`、`<textarea>` 的值发生变化时触发。它与`input` 事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，而且`input` 事件必然会引发 `change` 事件。具体来说，分成以下几种情况。

- 激活单选框（radio）或复选框（checkbox）时触发。
- 户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
- 当文本框或 `textarea` 元素的值发生改变，并且丧失焦点时触发。

#### reset事件，submit事件

`reset` 事件当表单重置（所有表单成员变回默认值）时触发。

`submit` 事件当表单数据向服务器提交时触发。注意，`submit` 事件的发生对象是 `form` 元素，**而不是 `button` 元素（即使它的类型是 `submit` ），因为提交的是表单，而不是按钮。**

### 文档事件

#### beforeunload 事件

`beforeunload` 事件在窗口将要关闭，或者网页（即 `document` 对象）将要卸载时触发。它可以用来防止用户不小心关闭网页。

根据标准，只要在该事件的回调函数中，调用了 `event.preventDefault()` ，或者 `event.returnValue` 属性的值是一个非空的值，就会自动跳出一个确认框，让用户确认是否关闭网页。如果用户点击“取消”按钮，网页就不会关闭。 `event.returnValue` 属性的值，会显示在确认对话框之中。

许多手机浏览器默认忽视这个事件，而桌面浏览器也可以这样设置，所以这个事件有可能根本不生效。所以，**不能依赖它来阻止用户关闭窗口**。

#### unload 事件

unload事件在窗口关闭或者document对象将要卸载时触发，发生在window、body、frameset等对象上面。它的触发顺序排在beforeunload、pagehide事件后面。unload事件只在页面没有被浏览器缓存时才会触发，换言之，如果通过按下“前进/后退”导致页面卸载，并不会触发unload事件。

当unload事件发生时，document对象处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI互动（window.open、alert、confirm方法等）全部无效。这时即使抛出错误，也不能停止文档的卸载。

如果在window对象上定义了该事件，网页就不会被浏览器缓存。

#### load事件，error事件

`load` 事件在页面加载成功时触发，`error` 事件在页面加载失败时触发。注意，页面从浏览器缓存加载，并不会触发 `load` 事件。

#### pageshow事件，pagehide事件

默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。

pageshow事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

pagehide事件与pageshow事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与unload事件的区别在于，如果在window对象上定义unload事件的监听函数之后，页面不会保存在缓存中，而使用pagehide事件，页面会保存在缓存中。

#### DOMContentLoaded事件

当HTML文档下载并解析完成以后，就会在document对象上触发DOMContentLoaded事件。这时，仅仅完成了HTML文档的解析（整张页面的DOM生成），所有外部资源（样式表、脚本、iframe等等）可能还没有下载结束。也就是说，这个事件比load事件，发生时间早得多。

#### readystatechange事件

readystatechange事件发生在Document对象和XMLHttpRequest对象，当它们的readyState属性发生变化时触发。

#### scroll事件

scroll事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。

#### resize事件

resize事件在改变浏览器窗口大小时触发，发生在window、body、frameset对象上面。

#### 焦点事件

- focus事件：Element节点获得焦点后触发，该事件不会冒泡。
- blur事件：Element节点失去焦点后触发，该事件不会冒泡。
- focusin事件：Element节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。Firefox不支持该事件。
- focusout事件：Element节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。Firefox不支持该事件。

## CSS 操作

### style 属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的 `getAttribute` 方法、 `setAttribute` 方法和 `removeAttribute` 方法，直接读写或删除网页元素的 `style` 属性。

```js
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
```

### Style 对象

```js
var divStyle = document.querySelector('div').style;
```

这个 `style` 对象可以直接操作，但是名字需要改写，比如 `background-color` 写成 `backgroundColor`。如果CSS属性是JavaScript保留字，那规则名之前需要加上字符串`css` ，比如 `float` 写成 `cssFloat` 

#### cssText 属性

元素节点对象的 `style` 对象，有一个 `cssText` 属性，可以读写或删除整个样式。

```js
var divStyle = document.querySelector('div').style;

divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';
```

`cssText` 的属性值不用改写 CSS 属性名

#### CSS 模块的侦测

CSS的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对CSS模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做「CSS模块的侦测」。

#### setProperty()，getPropertyValue()，removeProperty()

- `setProperty(propertyName,value)` ：设置某个CSS属性。
- `getPropertyValue(propertyName)` ：读取某个CSS属性。
- `removeProperty(propertyName)` ：删除某个CSS属性。 

#### window.getComputedStyle()

`window.getComputedStyle` 方法，就用来返回这个规则。它接受一个DOM节点对象作为参数，返回一个包含该节点最终样式信息的对象。所谓“最终样式信息”，指的是各种CSS规则叠加后的结果。

`getComputedStyle` 方法还可以接受第二个参数，表示指定节点的伪元素（比如`:before`、`:after`、`:first-line`、`:first-letter` 等）

**注意**

- 返回的CSS值都是绝对单位，比如，长度都是像素单位（返回值包括px后缀），颜色是 `rgb(#, #, #)` 或 `rgba(#, #, #, #)` 格式。
- CSS规则的简写形式无效，比如，想读取 `margin` 属性的值，不能直接读，只能读 `marginLeft`、`marginTop` 等属性。
- 如果一个元素不是绝对定位， `top` 和 `left` 属性总是返回 `auto` 。
- 该方法返回的样式对象的 `cssText` 属性无效，返回 `undefined` 。
- 该方法返回的样式对象是只读的，如果想设置样式，应该使用元素节点的 `style` 属性。

### CSS 伪元素

CSS伪元素是通过CSS向DOM添加的元素，主要方法是通过 `:before` 和 `:after` 选择器生成伪元素，然后用 `content` 属性指定伪元素的内容。

### StyleSheet对象

#### 获取样式表

`document.styleSheets` 返回当前页面所有 `StyleSheet` 对象。是一个类数组对象

#### 属性

**media**

`media` 属性表示这个样式表是用于屏幕（screen），还是用于打印（print），或两者都适用（all）。该属性只读，默认值是 `screen`。

**disabled**

`disabled` 属性用于打开或关闭一张样式表。`disabled` 属性只能在 JavaScript 脚本中设置，不能在 HTML 语句中设置。

**href**

`href` 属性是只读属性，返回 `StyleSheet` 对象连接的样式表地址。对于内嵌的 `<style>` 节点，该属性等于 `null` 。

**title**

`title` 属性返回 `StyleSheet` 对象的 `title` 值。

**type属性**

`type` 属性返回 `StyleSheet` 对象的 `type` 值，通常是 `text/css`。

**parentStyleSheet**

CSS的 `@import` 命令允许在样式表中加载其他样式表。`parentStyleSheet` 属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回 `null`。

**ownerNode**

`ownerNode` 属性返回 `StyleSheet` 对象所在的DOM节点，通常是 `<link>` 或 `<style>`。对于那些由其他样式表引用的样式表，该属性为 `null`。

```js
// HTML代码为
// <link rel="StyleSheet" href="example.css" type="text/css" />

document.styleSheets[0].ownerNode // [object HTMLLinkElement]
```

**cssRules**

`cssRules` 属性指向一个类似数组的对象，里面每一个成员就是当前样式表的一条CSS规则。使用该规则的 `cssText` 属性，可以得到CSS规则对应的字符串。

#### insertRule()，deleteRule()

`insertRule` 方法用于在当前样式表的 `cssRules` 对象插入CSS规则，`deleteRule` 方法用于删除 `cssRules` 对象的CSS规则。

`insertRule` 方法的第一个参数是表示CSS规则的字符串，第二个参数是该规则在`cssRules` 象的插入位置，是一个数值。`deleteRule` 方法的参数是该条规则在`cssRules` 对象中的位置。

#### 添加样式表

添加内部样式表 `<style>` 节点

```js
var style = document.createElement('style');
style.setAttribute('media','screen');
style.setAttribute('media','@media only screen and (max-width : 1024px)');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);
```

添加外部样式表，在文档中添加 `<link>` 节点

```js
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```

### CSS 规则

一条CSS规则包括两个部分：CSS选择器和样式声明。下面就是一条典型的CSS规则。

```css
.myClass {
  background-color: yellow;
}
```

### window.matchMedia()

`window.matchMedia` 方法用来检查CSS的 `mediaQuery` 语句

```js
var result = window.matchMedia('(min-width: 600px)');
result.media // (min-width: 600px)
result.matches // true
```

`media` 返回所查询的 `mediaQuery` 语句字符串，`matches` 返回一个布尔值，表示当前环境是否匹配查询语句

```js
var result = window.matchMedia('(max-width: 700px)');

if (result.matches) {
  console.log('页面宽度小于等于700px');
} else {
  console.log('页面宽度大于700px');
}
```

#### 监听事件

`window.matchMedia` 方法返回的 `MediaQueryList` 对象有两个方法，用来监听事件：`addListener` 方法和 `removeListener` 方法。如果 `mediaQuery` 查询结果发生变化，就调用指定的回调函数。

```js
var mql = window.matchMedia("(max-width: 700px)");

mql.addListener(mqCallback);

//...
```

### CSS事件

#### transitionEnd 事件

css的过渡效果「transition」结束后，触发 `transitionEnd` 事件

```js
el.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  console.log('Transition end');
}
```

`transitionEnd` 的事件对象具有以下属性。

- `propertyName` ：发生 `transition` 效果的CSS属性名。
- `elapsedTime` ：`transition` 效果持续的秒数，不含 `transition-delay` 的时间。
- `pseudoElement` ：如果 `transition` 效果发生在伪元素，会返回该伪元素的名称，以「::」开头。如果不发生在伪元素上，则返回一个空字符串。

#### animationstart事件，animationend事件，animationiteration事件

- animationstart : 动画开始时触发
- animationend : 动画结束时触发
- animationiteration : 开始新一轮动画循环时触发。如果animationiteration-count属性等于1，该事件不触发，即只播放一轮的CSS动画，不触发animationiteration事件


## Mutation Observer API

### 概述

用来监视 DOM 变动，异步触发而且不是马上触发，而是要等到当前所有 DOM 操作都结束才触发

- 它等待所有脚本任务完成后，才会运行，即采用异步方式。
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动。
- 它既可以观察发生在 DOM 的所有类型变动，也可以观察某一类变动。

### MutationObserver 构造函数

回调函数接受两个参数，第一个是变动数组，第二个是观察实例

```js
var observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
```

### 实例方法

#### observe()

- 第一个参数是所要观察的 DOM 节点
- 第二个参数是一个配置对象，用来指定所要观察的特定变动

配置对象有以下几种

- childList：子节点的变动。
- attributes：属性的变动。
- characterData：节点内容或节点文本的变动。
- subtree：所有后代节点的变动。
- attributeOldValue：类型为布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
- characterDataOldValue：类型为布尔值，表示观察characterData变动时，是否需要记录变动前的值。
- attributeFilter：类型为数组，表示需要观察的特定属性（比如['class','src']）。

#### disconnect(),takeRecords()

`disconnect` 方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。

`takeRecords` 方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。

### MutationRecord 对象

`MutationRecord` 对象包含了DOM的相关信息，有如下属性：

- type：观察的变动类型（attribute、characterData或者childList）。
- target：发生变动的DOM节点。
- addedNodes：新增的DOM节点。
- removedNodes：删除的DOM节点。
- previousSibling：前一个同级节点，如果没有则返回null。
- nextSibling：下一个同级节点，如果没有则返回null。
- attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
- oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。


