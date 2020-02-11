---
description: 享元模式「Flyweight Pattern」：是一种用于性能优化的模式。享元模式的核心是运用「共享技术」来有效支持大量细粒度的对象。
---

# 享元模式

## 模式动机

面向对象技术可以很好地解决一些灵活性或可扩展性问题，但在很多情况下需要在系统中增加类和对象的个数。**当对象数量太多时，将导致运行代价过高，带来性能下降等问题**，享元模式正是为解决这一类问题而诞生的

## 实现

假设有个内衣工厂，目前的产品有 50 种男式内衣和 50 种女士内衣，为了推销产品，工厂决 定生产一些塑料模特来穿上他们的内衣拍成广告照片。 正常情况下需要 50 个男模特和 50 个女模特，然后让他们每人分别穿上一件内衣来拍照。不使用享元模式的情况下，在程序里也许会这样写:

```javascript
const Model = function(sex, underwear) {
  this.sex = sex
  this.underwear = underwear
}

Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}

for (var i = 1; i <= 50; i++) {
  const maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}

for (var j = 1; j <= 50; j++) {
  const femaleModel = new Model('female', 'underwear' + j)
  femaleModel.takePhoto()
}
```

如上，100 种内衣生成了 100 个模特，将来如果有 1000 种内衣，就必须要 1000 个模特。但其实虽然有 100 种内衣，但很显然并不需要 50 个男模特和 50 个女模特。其实男模特和女模特各有一个就足够了，他们可以分别穿上不同的内衣来拍照。

代码如下：

```javascript
const Model = function(sex) {
  this.sex = sex
}

Model.prototype.takePhoto = function() {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}

const maleModel = new Model('male'),
  femaleModel = new Model('female')
  
for (let i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}

for (let j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j
  femaleModel.takePhoto()
}
```

可以看到，改进之后的代码，只需要两个对象便完成了相同的功能

### 内部状态与外部状态

享元模式要求将对象的属性划分为内部状态与外部状态「状态在这里通常指属性」。享元模式的目标是尽量减少共享对象的数量，区分内外部状态通常有以下几个准则

* 内部状态存储于对象内部。
* 内部状态可以被一些对象共享。
* 内部状态独立于具体的场景，通常不会改变。
* 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

这样一来，我们便可以把所有内部状态相同的对象都指定为同一个对象，而外部状态可以从对象身上剥离出来，并储存在外部

在上面的例子中，**性别是内部状态，内衣是外部状态，通过区分这两种状态，大大减少了系统中的对象数量**。通常来讲，**内部状态有多少种组合，系统中便最多存在多少个对象**，因为性别通常只有男女两种，所以该内衣厂商最多只需要 2 个对象

### 享元模式适用性

享元模式是一种很好的性能优化，但带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时可以使用享元模式

* 一个程序中使用了大量的相似对象
* 由于使用了大量对象，造成很大的内存开销
* 对象的大多数状态都可以变为外部状态
* 剥离出对象的外部状态后，可以用相对较少的共享对象取代大量对象

**享元模式的关键是区别内部状态和外部状态，并剥离外部状态保存在其他地方，在合适的时刻再把外部状态组装进共享对象**

## 小结

享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因不一样。在一个存在大量相似对象的系统中，享元模式可以很好的解决大量对象带来的性能问题。



