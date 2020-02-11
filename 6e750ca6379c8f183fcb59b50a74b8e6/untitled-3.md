---
description: >-
  适配器模式「Adapter
  Pattern」：将一个接口转换成客户希望的另一个接口，适配器模式使接口不兼容的那些类可以一起工作，其别名为包装器「Wrapper」
---

# 适配器模式

## 模式动机

假设我们现有的项目需要对接新的仓库，但是仓库中很多接口不适用于我们的项目，在这种情况下，我们不可能去修改库中的源代码，这个时候我们就需要将库中的接口套上一层适配器，就如同 vga 线转 hdmi 的转换器一样。

## 实现

假设谷歌地图与百度地图的渲染如下

```javascript
const googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  }
}
const baiduMap = {
  display: function() {
    console.log('开始渲染百度地图')
  }
}
```

但是我们的渲染函数 `renderMap` 默认调用地图的 `show` 方法，所以如果 `renderMap` 直接调用 `baiduMap` 那肯定会报错，所以我们可以写一个百度地图的适配器

```javascript
var baiduMapAdapter = {
  show: function() {
    baiduMap.display()
  }
}
// 这样就可以正确的渲染了
renderMap(googleMap)
renderMap(baiduMapAdapter)
```

## 小结

适配器模式将目标类和适配者类解耦，增加了类的透明性和复用性，同时系统的灵活性和扩展性都非常好，更换适配器或者增加新的适配器都非常方便，符合「开闭原则」。

