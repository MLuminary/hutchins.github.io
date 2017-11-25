---
title: prop和attr的一些理解
date: 2017-11-24 20:02:28
tags: js
category: javascript
---


>前几天做一个迷你京东小项目的时候涉及到一个全选的小功能，一开始用的是``attr``，但是效果完全不是自己想要的，当商品按钮点击过一次后，``attr``就无法对其状态进行更改，最后谷歌了一番发现需要用``prop``来代替。虽然效果问题解决了，但是自己还是想弄懂``prop``和``attr``的区别.

我的问题和网上大多数人的问题不相同，具体描述看示例代码之后。

## 版本使用不同

遇到问题我一般先会去查相关的官方文档，可在jq的api中文文档中没有发现有价值的东西，只是发现适用的版本和概念有所轻微的不同。
``attr``：设置或返回被选元素的属性值.版本：1.0``prop``:获取在匹配的元素集中的第一个元素的属性值。版本：1.6+
<!--more-->
从概念中发现操作的对象和使用也好像基本相同，然后带着疑惑去进行了一番实验并去查阅了一些相关资料

示例代码

```HTML
<table>
        <thead>
            <tr><input type="checkbox" class="checkAll">全选</tr>
        </thead>
        <tbody>
            <tr><input class="item" type="checkbox">单选</tr>
            <tr><input class="item" type="checkbox">单选</tr>
            <tr><input class="item" type="checkbox">单选</tr>
            <tr><input class="item" type="checkbox">单选</tr>
            <tr><input class="item" type="checkbox">单选</tr>
            <tr><input class="item" type="checkbox">单选</tr>
        </tbody>
    </table>
```

```js
$('.checkAll').click(function(){
    $('.item').attr('checked',this.checked);
})
```

### 问题描述

当全选按钮选中时单选按钮全部选中，当全选按钮不选中时单选按钮全部不选中，只点全选按钮时，反复几次都没问题，但是要是点击了其中一个单选按钮，那这个单选按钮就不会在像其它单选按钮一样跟随全选按钮的状态的改变而改变。



## attr和prop的本质

``attr``是``attribute``的缩写,``prop``是``property``的缩写，都有属性的意思，只不过``attr``是操作html文档节点属性，``prop``是操作js对象属性.``attr``在js中使用的是``setAttribute``和``getAttribute``而``prop``直接使用原生js的``element[value]``和``element[value]=key``。

## attr和prop的区别

``attr``设置的属性值只能是**字符串类型**,如果不是字符串类型，也会调用其``toString()``方法，将其转换成字符串类型。

``prop``设置的属性值可以包括数组和对象在内的任意类型


### 有关布尔值的属性

1.6之后,``attr``返回的也是**字符串类型**,选中或禁用直接返回``checked``,``selected``,``disabled``。否则返回``undefined``。解决我问题的关键就是后面一句话

>jQuery认为：attribute的checked、selected、disabled就是表示该属性初始状态的值，property的checked、selected、disabled才表示该属性实时状态的值(值为true或false)。

当涉及到boolean值时，比如checkbox这样的，有true和false这样的布尔值的元素属性，attributes在页面加载的时候就被设置，并且一直保持初始值，而properties则存储着元素属性的当前值。

所以当我没有点击单选按钮的时候，它就是没被用户点击过的浏览器刚加载出来的初始状态，此时可以通过``attr``去设置并操控，当有用户点击的时候，当前按钮就不是初始状态，``attr``自然也就无法操控。

