---
description: >-
  代理模式「Proxy
  Pattern」：当客户不方便访问一个对象或不满足需要的时候，提供一个替身对象来控制对这个对象的访问，所以客户实际上访问的是替身对象，替身对象对请求做出一些处理之后，再把请求转交给本体对象
---

# 代理模式

## 模式动机

在某些情况下，**一个客户不想或者不能直接引用一个对象**，此时可以通过一个称之为「代理」的第三者来实现间接引用。代理对象可以在客户端和目标对象之间起到中介作用，并且可以通过代理对象过滤掉客户不能看到的内容或者**增强提供的服务**

## 虚拟代理

> 把一些开销很大的对象，延迟到真正需要它的时候才去创建

例如图片的预加载技术，如果直接给 `img` 设置 `src` 属性，有时会因为图片太大或者网络不佳造成很长时间的空白，常见的做法是先用一张 loading 图占位，待真正的图片加载好之后再做替换。

首先创建一个普通的图像类，暴露一个 `setSrc` 接口用来设置 `img` 标签的 `src` 属性

```javascript
const myImage = (function() {
  const imgNode = document.createElement("img")
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()
```

引入代理对象 `proxyImg` ，在图片被真正加载好之前，页面中用本地图片来占位

```javascript
const proxyImage = (function() {
  // 创建一个 img 用来下载图片到缓存中
  const img = new Image()
  // 图片加载完成调用此方法
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      // 立即用本地图片代替
      myImage.setSrc("local_pic_url")
      img.src = src // img 开始加载
    }
  }
})()

proxyImage.setSrc( 'real_pic_url' )
```

我们通过 `proxyImg` 间接的访问 `myImage` ，并在访问 `myImage` 过程中加入了额外的操作，比如在真正的图片加载好之前，将 `myImage` 的 `src` 先设置为本地的图片，待图片加载好之后再做替换。

## 缓存代理

> 缓存代理可以为一个开销很大的运算提供暂时的存储，在下次运算时，如果传递进来的参数跟之前完全一致，则可以直接返回之前的运算结果

这里以一个简单的乘积计算作为例子，我们假装他非常耗时

```javascript
const mult = function() {
  let a = 1
  for (let i = 1; i < arguments.length; i++) {
    a *= arguments[i]
  }
  return a
}
```

下面我们加入缓存代理，输入相同参数时不需要再次计算

```javascript
const proxyMult = (function() {
  const cache = {}
  return function() {
    const args = Array.prototype.join.call(arguments, ",")
    if (args in cache) {
      return cache[args]
    }
    return (cache[args] = mult.apply(this, arguments))
  }
})()

proxyMult( 1, 2, 3, 4 ); // 输出:24
proxyMult( 1, 2, 3, 4 ); // 输出:24 此时并不需要再次计算
```

### 用高阶函数动态创建代理

如上所示，如果我们要再写一个加法操作的代理时，是还需要再为其编写一个 `proxyAdd` 方法的，这样显然是不符合我们的开闭原则的。

假设现有如下的加法和乘法的耗时操作

```javascript
// 乘法
const mult = function() {
  let a = 1
  for (let i = 1; i < arguments.length; i++) {
    a *= arguments[i]
  }
  return a
}

// 加法
const add = function() {
  let a = 1
  for (let i = 1; i < arguments.length; i++) {
    a += arguments[i]
  }
  return a
}
```

创建缓存代理的工厂

```javascript
const createProxyFactory = function(fn) {
  const cache = [] // 用于缓存参数及结果
  return function() {
    // 当然这里对参数传递的顺序也需要相同，此处只是举个例子
    const argString = Array.prototype.join.call(arguments, '')
    // 如果参数之前传输过
    if(argString in cache) {
      return cache[argString]
    }
    return cache[argString] = fn.apply(this, arguments)
  }
}

const proxyPlus = createProxyFactory( add )
proxyPlus(1,2,3,4) // 10
```

## 小结

代理模式包括许多小分类，在 JavaScript 开发中最常用的是「虚拟代理」和「缓存代理」。虽然代理模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 

{% hint style="info" %}
**当真正发现不方便直接访问某个对象的时候，再编写代理也不迟**
{% endhint %}



