---
title: php连接MySQL数据库
date: 2017-07-30 12:35:55
tags: 
  - php
  - 数据库
category: "php"
---

## PHP连接MySQL数据库的准备

PHP为连接MySQL数据库提供了多套扩展函数库，使用其中的任何一套库，都必须保证如下两点

1. 函数库的定义文件在php根目录的的ext目录下

2. 在php的主配置文件(php.ini)中声明启用该函数库

    会有``extension=php_mysql.dll``和``extension=php_mysqli.dll``的字样

## 使用PHP连接数据库

我目前所知道的有两种函数库,mysql.dll和mysqli.dll.

### mysql.dll

#### 语法

```php
mysql_connect(servername,username,password);
```
<!--more-->

| 参数 | 描述 |
|----  |----- |
|servername|可选，服务器名或ip地址，默认为"localhost:3306"，最好手动              写为"127.0.0.1:3306"
|username|可选，登录的用户名，默认值是拥有服务器进程的用户的名称
|password|可选，登录密码,默认为""

#### 举个栗子

```php
$conn = mysql_connect("127.0.0.1:3306","root","root");//连接数据库
mysql_select_db("myDatabase");//选择一个数据库

$sql = "set names utf8";
mysql_query($sql,$conn);//先设置编码，避免出现中文乱码

$sql = "select * from myDatabase";//写一个sql语句
$result = mysql_query($sql,$conn);//执行sql语句

//处理结果
$row = mysql_fetch_array($result);//只能获取一行数据
while($row = mysql_fetch_array($result)){//可以获取全部行数据
  var_dump($row);//输出查看
};

//提前关闭连接(可选)
mysql_close($conn);
```

### mysqli.dll

PHP MySQLI = PHP MySQL Improved 

#### 语法
```php
$conn = mysqli_connect(servername,username,password,database,port,socket);
```

|参数|描述|
|-- |-- |
| servername | 可选,服务器名或ip地址,推荐用"127.0.0.1"|
| username | 可选,登录的用户名 |
| password | 可选,登录的密码 |
| database | 可选,要进入的数据库名称 |
| port | 可选,端口号,默认为3306 |
| socket | 可选。规定 socket 或要使用的已命名 pipe。 |

#### 举个栗子
```php
// 链接数据库
$conn = mysqli_connect("127.0.0.1","root","root","myDatabase",3306);//连接数据库

$sql = "set names utf8";
//注意,这里的参数相比于mysql_query()互换了参数位置
mysqli_query($conn,$sql);//设置编码，避免中文乱码

$sql = "INSERT/DELETE/UPDATE/SELECT...";//此处sql语句中不需要添加分号
$result = mysqli_query($conn,$sql);

//处理结果
mysqli_affected_rows($conn);//获取影响的行数
mysqli_fetch_array($result);//获取一行
mysqli_fetch_all($result);//以索引数组的形式返回所有行
mysqli_fetch_all($result,MYSQLI_ASSOC);//以关联数组的形式获取所有行

//提前关闭连接
mysqli_close($conn);
```