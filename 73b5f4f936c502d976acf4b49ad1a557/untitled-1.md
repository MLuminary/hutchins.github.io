---
description: >-
  装饰者模式也称为包装模式「Wrapper
  Pattern」：给对象动态的增加职责的方式称为装饰者模式，装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。跟继承相比，装饰者是一种更轻便灵活的做法，这是一种「即用即付」的方式，比如天冷了就多穿一件外套
---

# 装饰者模式

## 模式动机

在传统的面向对象语言中，给对象添加功能常常使用继承的方式，但是继承的方式并不灵活， 还会带来许多问题：一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；另一方面，继承这种功能复用方式通常被称为「白箱复用」，「白箱」是相对可见性而言的， 在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

## 实现

假设有一个登录 `button`, 点击 `button` 会弹出登录浮层，与此同时要进行数据上报，来统计有多少用户点击了这个登录 `button`

```javascript
const showLogin = function() {
  log()
  console.info('打开登录浮层')
}
const log = function() {
  console.info('上报数据')
}
button.onclick = showLogin
```

我们看到在 `showLogin` 函数里，既要负责打开登录浮层，又要负责数据上报，这是两个层面的功能，在此处却被耦合在一个函数里。而且我们当不需要统计的时候还必须在 `showLogin` 里找到 `log()` 并删除掉，假如多出都进行统计，这样是很麻烦的事情。

### AOP 装饰函数

首先提供 `after` 与 `before` 两个方法，可以在不改变函数本身的情况下动态给此函数添加新功能

```javascript
Function.prototype.before = function(beforefn) {
  const __self = this // 保存原函数的引用
  return function() {
    beforefn.apply(this, arguments) // 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments) // 执行原函数并返回原函数的执行结果
  }
}

Function.prototype.after = function(afterfn) {
  const __self = this
  return function() {
    let ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
```

分离业务代码和数据统计代码，无论在什么语言中，都是 AOP 的经典应用之一。在项目开发的结尾阶段难免要加上很多统计数据的代码，这些过程可能让我们被迫改动早已封装好的函数，当有了装饰函数，上面的代码就可以写成如下这般

```javascript
const showLogin = function() {
  console.info('打开登录浮层')
}
const log = function() {
  console.info('上报数据')
}

button.click = showLogin.after(log)
```

可以看到我们无需改动 `showLogin` 就可以在点击 `button` 时既打开登录浮层又计数。

## 小结

### 优点

可以提供比继承更多的**灵活性**，可以通过一种**动态的**方式来扩展一个对象的功能，并通过使用不同的具体装饰类以及这些装饰类的排列组合，可以创造出很多不同行为的组合，而且具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类。

### 缺点

使用装饰模式进行系统设计时将产生**很多小对象**，而且装饰模式比继承更加易于出错，**排错也很困难**，对于多次装饰的对象，调试时寻找错误可能需要**逐级排查**，较为烦琐。

