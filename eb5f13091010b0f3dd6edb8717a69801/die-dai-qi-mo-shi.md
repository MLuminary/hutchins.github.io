---
description: >-
  迭代器模式「Iterator
  Pattern」：是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素
---

# 迭代器模式

## 模式动机

一个聚合对象，如一个列表或者一个集合，**应该提供一种方法来让别人可以访问它的元素，而又不需要暴露它的内部结构**。 针对不同的需要，可能还要以不同的方式遍历整个聚合对象，但是我们并不希望在聚合对象的抽象层接口中充斥着各种不同遍历的操作。

**怎样遍历一个聚合对象，又不需要了解聚合对象的内部结构，还能够提供多种不同的遍历方式，这就是迭代器模式所要解决的问题**

## 实现

### 内部迭代器

```javascript
const each = function(arg, callback) {
  for (let i = 0; i < arg.length; i++) {
    callback(i, arg[i])
  }
}

each([1, 2, 3], (index, value) => {
  console.info(index, value) 
})

/*打印结果
  0 1
  1 2
  2 3*/
```

### 外部迭代器

```javascript
const Iterator = function(obj) {
  let currentIndex = 0

  const next = function() {
    currentIndex++
  }

  const done = function() {
    return currentIndex >= obj.length
  }

  const getCurrentItem = function() {
    return obj[currentIndex]
  }

  return {
    next,
    done,
    getCurrentItem
  }
}
```

内部迭代器已经在内部定义好了迭代规则，只需要一次调用即可。外部迭代器的虽然增加一点调用的复杂度，但是我们可以手工控制迭代的过程和顺序。

## 小结

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前的绝大部分语言都内置了迭代器





