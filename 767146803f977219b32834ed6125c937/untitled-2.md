---
description: >-
  状态模式「State
  Pattern」：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变
---

# 状态模式

## 模式动机

在很多情况下，一个对象的行为取决于一个或多个动态变化的**属性**，这样的属性叫做状态，这样的对象叫做有状态的「stateful」对象，这样的对象状态是从事先定义好的一系列值中取出的。当一个这样的对象与外部事件产生互动时，其内部状态就会改变，从而使得系统的行为也随之发生变化。

## 实现

上传文件时，文件会有「未上传」，「正在上传」，「暂停」，「上传成功」,「上传失败」五种状态，对于这五种状态，我们点击上传按钮时对应的表现形式是不同的

```javascript
// 定义好五种状态点击时的表现形式
const FMS = {
  unUpload: {
    onClick: function() {
      console.info('开始上传')
      this.state = FMS.uploading
    }
  },
  uploading: {
    onClick: function() {
      console.info('暂停上传')
      this.state = FMS.pause
    }
  },
  pause: {
    onClick: function() {
      console.info('继续上传')
      this.state = FMS.uploading
    }
  },
  done: {
    onClick: function() {
      console.info('已上传成功，点击无效')
    }
  },
  failed: {
    onClick: function() {
      console.info('重新上传')
      this.state.uploading
    }
  }
}

function File() {
  this.state = FMS.pause // 初始状态为未上传
}

const file = new File()
// 将 file 的 this 传进去，改状态时需要
button.onclick = function() {
  file.state.onClick.call(file)
}
```

此时如果你说文件还需要进行删除操作，那只需要在 FMS 中添加 del 的行为，并再用一个删除按钮点击时调用即可

```javascript
//...
done: {
  onClick:...
  del:function() {
    console.info('删除成功')
  }
}
delButton.onclick = function() {
  file.state.del.call(file)
}
```

## 小结

### 优点

状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换。状态切换的逻辑也都被分到了状态类中，省去了很多的条件分支，请求动作与状态类中的封装行为非常清晰而且互不影响

### 缺点

缺点就是会在系统中定义许多状态类，而且由于逻辑分散在状态类中，我们无法一个地方就看出整个状态机的逻辑。

