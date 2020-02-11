---
description: >-
  组合模式「Composite
  Pattern」：将对象组合成树形结构，以表示「部分-整体」的层次结构。除了用来表示树形结构之外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。
---

# 组合模式

## 模式动机

对于树形结构，当容器对象（如文件夹）的某一个方法被调用时，将遍历整个树形结构，寻找也包含这个方法的成员对象（可以是容器对象，也可以是叶子对象，如子文件夹和文件）并调用执行。但由于容器对象和叶子对象在功能上的区别，在使用这些对象的客户端代码中必须有区别地对待容器对象和叶子对象，**而实际上大多数情况下客户端希望一致地处理它们，因为对于这些对象的区别对待将会使得程序非常复杂**。 组合模式描述了如何将容器对象和叶子对象进行递归组合，使得**用户在使用时无须对它们进行区分，可以一致地对待容器对象和叶子对象，这就是组合模式的模式动机**。

## 实现

文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以包含其他文件夹。当我们用杀毒软件扫描该文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式使得我们只需要操作最外面层的文件夹进行扫描

```javascript
// 文件夹
const Folder = function(name) {
  this.name = name
  this.files = []
}
​
Folder.prototype.add = function(file) {
  this.files.push(file)
}
​
Folder.prototype.add = function() {
  console.info('开始扫描文件夹:' + this.name)
  for(let i = 0, file; files = this.files; file = files[i++] ) {
    file.scan()
  }
}
​
// 文件
const File = function(name) {
  this.name = name
}
​
File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件')
}
​
File.prototype.scan = function() {
  console.info('开始扫描文件:' + this.name)
}
```

接下来创建一些文件夹和文件

```javascript
const folder = new Folder('学习资料')
const folder1 = new Folder('JavaScript')
const folder2 = new Folder('jQuery')
const file1 = new File('JavaScript 设计模式与开发实践')
const file2 = new File('精通 jQuery')
const file3 = new File('重构与模式')
​
folder1.add(file1)
folder2.add(file2)
​
folder.add(folder1)
folder.add(folder2)
folder.add(file3)
```

运用组合模式之后，扫描整个文件夹的操作也是轻而易举的，我们只需要操作树的最顶端对象

```javascript
folder.scan()
// 结果如下
开始扫描文件夹:学习资料
开始扫描文件夹:JavaScript
开始扫描文件:JavaScript 设计模式与开发实践
开始扫描文件夹:jQuery
开始扫描文件:精通 jQuery
开始扫描文件:重构与模式
```

### 引用父对象

有时候我们需要在子节点上保持对父节点的引用，比如在组合模式中使用职责链时，有可能需要让请求从子节点往父节点上冒泡传递。还有当我们删除某个文件的时候，实际上是从这个文件所在的上层文件夹中删除该文件的。

改写 Folder 类，增加 `this.parent` 属性

```javascript
const Folder = function(name) {
  this.name = name
  this.parent = null
  this.files = []
}
​
Folder.prototype.add = function(file) {
  this.parent = this
  this.files.push(file)
}
​
Folder.prototype.scan = function() {
  console.info('开始扫描文件夹:' + this.name)
  for (let i = 0; i < this.files.length; i++) {
    this.files[i].scan()
  }
}
​
Folder.prototype.remove = function() {
  if (!this.parent) {
    //根节点或者树外的游离节点
    return
  }
  for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    const file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}
```

当删除文件夹时，如果没有 `this.parent` 就说明它为一棵树的根节点，此时删除它其实是在硬盘上将其删除，再次我们先不做任何操作。如果 `this.parent` 不为 `null` ，则说明该文件夹有父节点存在，此时遍历父节点中保存的子节点列表，删除对应子节点。File 类的实现基本一致。

## 小结

我们可以把相同的操作应用在组合对象和单个对象上。在大多数情况下，我们都可以忽略掉组合对象和单个对象之间的差别，从而用一致的方式来处理它们。

{% hint style="info" %}
**1.组合模式不是父子关系**

组合对象包含一组叶对象，但 Leaf 并不是 Composite 的子类。组合对象把请求委托给它所包含的所有叶对象，它们能够合作的关键是拥有相同的接口。

**2.对叶对象操作的一致性**

组合模式除了要求组合对象和叶对象拥有相同的接口之外，还有一个必要条件，就是对一组叶对象的操作必须具有一致性

**3.双向映射关系**

发放过节费的通知步骤是从公司到各个部门，再到各个小组，最后到每个员工的邮箱里。这本身是一个组合模式的好例子，但要考虑的一种情况是，也许某些员工属于多个组织架构。比如某位架构师既隶属于开发组，又隶属于架构组，对象之间的关系并不是严格意义上的层次结构，在这种情况下，是不适合使用组合模式的，该架构师很可能会收到两份过节费。
{% endhint %}

然而，组合模式并不是完美的，它可能会产生一个这样的系统:系统中的每个对象看起来都与其他对象差不多。它们的区别只有在运行的时候会才会显现出来，这会使代码难以理解。此外， 如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起

