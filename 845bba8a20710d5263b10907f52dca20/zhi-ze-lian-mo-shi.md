---
description: >-
  责任链模式「Chain of Responsibility
  Pattern」为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。
---

# 职责链模式

## 模式动机

避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条**链**，并且沿着这条**链**传递请求，直到有对象处理它为止。客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。

## 实现

一款产品的上线一般要经历调研、设计、开发、测试后才能上线，我们先来将这四个过程实现，当每一个阶段完成后，我们返回一个 `'next'` 

```javascript
const Research = function() {
  // 需求尚未明确
  if(_) {
    // 调研需求
  } else {
    // 暂且用 next 代表下一步的意思
    return 'next'
  }
}

const Design = function() {
  // 如果没有设计完成
  if(_) {
    // 设计产品
  } else {
    return 'next'
  }
}

const Coding = function() {
  // 如果没有编码完成
  if(_) {
    // 继续开发
  } else {
    return 'next'
  }
}

const Test = function() {
  // 如果没有测试完成
  if(_) {
    // 继续测试
  } else {
    return 'next'
  }
}
```

然后我们再实现一个 `after` 函数，这样我们就可以链式调用之前的四个过程

```javascript
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    // 拿到调用 after 的返回结果
    const ret = self.apply(this, arguments)
    if (ret === 'next') {
      return fn.apply(this, arguments)
    }
    return ret
  }
}
​
var order = Research.after(Design).after(Coding).after(Test)
```

## 小结

用 AOP 来实现职责链既简单又巧妙，可以改变链内的成员或者调动它们的次序，并且允许动态地新增或者删除责任，而且增加新的请求处理类很方便。但是过长的职责链使性能会受到一定的影响，也会增加一些调试的困难。

