---
description: >-
  工厂模式「Factory
  Pattern」：属于创建者模式，将模块中对象的创建和对象的使用进行分离，外界对于这些对象只需要知道它们的接口，而不需要知道其中具体的实现细节，以此来使整个系统的设计更加符合单一职责的原则。
---

# 工厂模式

## 模式动机

拿 KFC 来举例，你只需要去 KFC 告诉工作人员汉堡的名字即可拿到对应的汉堡，**不需要每个来 KFC 的人都自己做汉堡**，而且**你也不关心汉堡是如何做的**，**KFC 员工也不会关心你如何使用汉堡**，这就实现了创建于使用的解耦。

{% hint style="info" %}
工厂模式的存在就是为了**解耦，将对象的创建和使用分离。**

**降低代码重复度**，对象的创建过于复杂时放到工厂模式中只需要书写一次即可
{% endhint %}

## 简单工厂模式

简单工厂模式「Simple Factory Pattern」：又称为静态工厂方法 「Static Factory Method」模式，它属于类创建型模式。在简单工厂模式中，可以**根据参数的不同返回不同类的实例**。简单工厂模式**专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类**。

```javascript
// 汉堡工厂
const Hamburger = function(name) {
  function ChickenBurger() {
    this.name = '鸡腿堡'
    this.price = 12
  }

  function BeefBurger() {
    this.name = '牛肉汉堡'
    this.price = 15
  }
  
  function VeggieBurger() {
    this.name = '蔬菜汉堡'
    this.price = 10
  }

  switch (name) {
    case '鸡腿堡':
      return new ChickenBurger()
    case '牛肉汉堡':
      return new BeefBurger()
    case '蔬菜汉堡':
      return new VeggieBurger()
    default:
      throw new Error('对不起，本店没有你想要的汉堡')
  }
}

const chickenBuger = new Hamburger('鸡腿堡')

```

ES6 实现方法

```javascript
class Hamburger {
// 因为各个汉堡的结构基本相同，此处可以抽象出来
  constructor(info) {
    this.name = info.name
    this.price = info.price
  }
  // 不会被实例继承，可以由 Hamburger 直接调用
  static getHamburger(name) {
    switch (name) {
      case '鸡腿堡':
        return new Hamburger({name: '鸡腿堡', price: 12})
      case '牛肉汉堡':
        return new Hamburger({name: '牛肉汉堡', price: 15})
      case '蔬菜汉堡':
        return new Hamburger({name: '蔬菜汉堡', price: 10})
      default:
        throw new Error('对不起，本店没有你想要的汉堡')
    }
  }
}

const chickenBuger = Hamburger.getHamburger('鸡腿堡')
```

但是简单工厂也存在一些问题，当需要创建的对象过多或者创建对象的逻辑变得复杂的时候，工厂函数就会显得十分庞大臃肿，其复杂度将会直线提高。

## 工厂方法模式

工厂方法模式**将实际创建对象的工作推迟到了子类中**，**工厂父类负责定义创建产品对象的公共接口**。（ 但此处并没有推迟到了子类，只是放在了原型中 ）

```javascript
const Hamburger = function(name) {
  // this 是当前对象，则说明是用 new 创建的, 否则 this 应该是全局对象
  if(this instanceof Hamburger) {
    return new this[name]() // 这边将 this[name]() 就相当于 CHickenBuger() 返回对应的实例
  } else {
    // 如果不是用 new 创建的，就返回给他用 new 创建的 Hamburger 实例
    return new Hamburger(name)
  }
}

Hamburger.prototype = {
  ChickenBuger: function() {
    this.name = '鸡腿堡'
    this.price = 12
  },
  BeefBuger: function() {
    this.name = '牛肉汉堡'
    this.price = 15
  },
  VeggieBurger: function() {
    this.name = '蔬菜汉堡'
    this.price = 10
  }
}

const chickenBuger = Hamburger('ChickenBuger')
```

## 抽象工厂模式

> 「抽象」就是将复杂事物的一个或多个共有特征抽取出来的思维过程。

可以看到，简单工厂与工厂方法模式都是**直接返回创建的实例**，但抽象工厂模式并不会直接返回创建的实例，而是用于对产品类簇的创建。也就是将各个工厂方法模式又抽象出来，找出了其中的共同特征。

![&#x62BD;&#x8C61;&#x5DE5;&#x5382;&#x793A;&#x4F8B;](.gitbook/assets/ping-mu-kuai-zhao-20190620-11.17.22.png)

#### 创建实体类

```javascript
// 汉堡类产品
class ChickenBuger {
  constructor() {
    this.name = '鸡腿堡'
    this.price = 12
  }
}

class BeefBuger {
  constructor() {
    this.name = '牛肉堡'
    this.price = 15
  }
}

// 饮料类产品

class Cola {
  constructor() {
    this.name = '可乐'
    this.price = 5
  }
}

class Sprite {
  constructor() {
    this.name = '雪碧'
    this.price = 5
  }
}
```

#### 创建工厂类

`ChickenBuger` 与 `BeefBuger` 同属于 `Hamburger` 类，`Cola` 与 `Sprite` 同属于 `Drink` 类。

```javascript
class Hamburger {
  getInstance(name) {
    switch(name) {
      case 'ChickenBuger':
        return new ChickenBuger()
      case 'BeefBuger':
        return new BeefBuger()
    }
  }
}

class Drink {
  getInstance(name) {
    switch(name) {
      case 'Cola':
        return new Cola()
      case 'Sprite':
        return new Sprite()
    }
  }
}

```

#### 创建抽象工厂

```javascript
class KFC {
  constructor(type) {
    switch(type) {
      case 'Hamburger':
        return new Hamburger()
      case 'Drink':
        return new Drink()
    }
  }
}

const HamburgerFAC = new KFC('Hamburger')
const chickenBuger = HamburgerFAC.getInstance('ChickenBuger')
```

## 小结

工厂方法模式的主要优点是增加新的产品类时无须修改现有系统，并封装了产品对象的创建细节，系统具有良好的灵活性和可扩展性；其缺点在于增加新产品的同时需要增加新的工厂，导致系统类的个数成对增加，在一定程度上增加了系统的复杂性。

