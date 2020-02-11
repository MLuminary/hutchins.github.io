---
description: >-
  发布—订阅模式又叫观察者模式「Observer Pattern」，它定义对象间的一种一对多的依赖关系，当一个对象的状
  态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型 来替代传统的发布—订阅模式。
---

# 订阅-发布模式

## 模式动机

小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼处告诉小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。 但到底是什么时候，目前还没有人能够知道。「异步操作」

于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼 MM 决定辞职，因为厌倦了每天回答 1000 个相同内容的电话。

当然现实中没有这么笨的销售公司，实际上故事是这样的:小明离开之前，把电话号码留在 了售楼处。售楼 MM 答应他，新楼盘一推出就马上发信息通知小明「订阅」。小红、小强和小龙也是一 样，他们的电话号码都被记在售楼处的花名册上，新楼盘推出的时候，售楼 MM 会翻开花名册， 遍历上面的电话号码，依次发送一条短信来通知他们「发布」

## 实现

```javascript
const salesOffices = {} // 定义售楼处

salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(fn) {
  // 增加订阅者
  this.clientList.push(fn) // 订阅的消息添加进缓存列表
}

salesOffices.trigger = function() {
  // 发布消息
  for (let i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments) // (2) //
  }
}
```

售楼处现在有了 `listen` 「订阅」和 `trigger` 「发布」的功能

```javascript
// 小明订阅楼盘消息
salesOffices.listen(function(squareMeter, price) {
  console.info('小明')
  console.info('squareMeter ' + squareMeter)
  console.info('price ' + price)
})
// 88 平米的房子 200w
salesOffices.trigger(88, 2000000)
// 200 平米的房子 400w
salesOffices.trigger(200, 4000000)
```

目前 88 平米房子的消息和 200 平米的房子都推送给了小明，但是假如小明根本就不想知道 200 平米的消息呢。所以我们有必要增加一个标识 `key`, 让订阅者只订阅自己感兴趣的消息。

```javascript
const salesOffices = {} // 定义售楼处
salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) {
    this.clientList[key] = []
  }
  // 增加订阅者
  this.clientList[key].push(fn) // 订阅的消息添加进缓存列表
}

salesOffices.trigger = function() {
  // 取到 key 值
  const key = Array.prototype.shift.call(arguments)
  // 拿到订阅 key 的函数
  const fns = this.clientList[key]
  if (!fns || fns.length === 0) {
    // 如果没有订阅该 key 值的函数，则直接返回
    return false
  }
  // 发布消息
  for (let i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments) // (2) //
  }
}

salesOffices.listen('88', function(price) {
  console.info('price ' + price)
})
// 打印 price 2000000
salesOffices.trigger('88', 2000000)
// 不会打印
salesOffices.trigger('200', 4000000)
```

### 取消订阅

```javascript
salesOffices.remove(key, fn) {
  const fns = this.clientList[key]
  if(!fns) {
    return false
  }

  if(!fn) {
    // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
    fns && (fns.length = 0)
  } else {
    for(let l = 0, _fn; (_fn = fns[l++]);) {
      if(_fn === fn) {
        fns.splice(l, 1)
      }
    }
  }
}
```

## 小结

发布—订阅模式可以取代对象之间硬编码的通知机制，一个对象不再显式地调用另外一个对象的某个接口。发布—订阅模式让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，但这不影响它们之间相互通信。当有新的订阅者出现时，发布者的代码不需要任何修改;同样发布者需要改变时，也不会影响到之前的订阅者。只要之前约定的事件名没有变化，就可以自由地改变它们。

