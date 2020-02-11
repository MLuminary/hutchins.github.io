---
description: >-
  命令模式「Command Pattern」：是一种数据驱动的设计模式，它属于行为型模式。 请求以命令的形式包裹在对象中，并传给调用对象。 
  调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。
---

# 命令模式

## 模式动机

命令模式中的命令指的是一个执行某些特定事情的指令，命令模式常见的场景是: 有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道请求的操作是什么。此时希望一种松耦合的方式来设计程序，使得请求发送者和请求接受者能消除彼此之间的耦合关系。

## 实现

我们拿电视遥控器与电视来举例，电视是请求的接受者，遥控器是请求的发送者，遥控器上有一些按钮，不同的按钮对应电视机的不同操作。在这个例子中，每个按钮实际上就是每个命令。

```javascript
const TV = {
  // 
}
// 将命令抽象出来
const Command = {
  turnOff: () => {
    console.info('关闭电视')
  },
  turnOn: () => {
    console.info('打开电视')
  },
  volumeIncrease: () => {
    console.info('音量增加')
  }
}
​
const bindCommand = (obj, command) => {
  command.call(obj)
}
​
const CemoteControl = {
  key1: bindCommand(Command.turnOff),
  key2: bindCommand(Command.trunOn),
  key3: bindCommand(Command.volumeIncrease)
}
```

## 小结

命令模式的本质是对命令进行封装，将发出命令的责任和执行命令的责任分割开

每个命令都是一个操作：请求的一方发出请求，要求执行一个操作；接受的一方收到请求，并执行操作，命令模式使请求本身成为一个「对象」，这个对象和其他对象一样可以被存储和传递

但是 JavaScript 作为将函数作为一等对象的语言，命令模式也早已融入到了 JavaScript 语言中。因此实现起来自己感觉略显鸡肋，并没有感觉很实用….

