---
title: oracle实验笔记一
date: 2017-11-28 20:19:09
tags: oracle
category: "数据库"
---
## Oracle函数和表达式

### replace&translate

两种函数都用来替换字符串，但是结果略有不同

用法:函数名('对其进行操作的字符串','目标字符串','替换字符串')

#### replace

```sql
SELECT replace('我是中国人,我爱中国', '中国', 'China')
FROM DUAL;
```
结果: 我是China人,我爱China

#### translate

```sql
SELECT translate('我是中国人,我爱中国', '中国', 'China')
FROM DUAL;
```
结果: 我是Ch人,我爱Ch.
<!--more-->
``translate``严格的来说是对字符的替换，目标字符串中的字符会替换成替换字符串中的相对应的字符。如果替换字符串过长，则会忽略掉超过的字符；如果目标字符过长，则会将目标字符串替换成替换字符串。

```sql
SELECT translate('我是中国人,我爱中国', '中国人', 'C')
FROM DUAL;
```
结果：我是C,我爱C。

#### 举个栗子
在银行转帐时经常看见账户人只显示姓名的最后一个字，其余的用星号代替.

```sql
SELECT name,
replace(name,substr(name,0,length(name)-1),rpad('*',length(name)-1,'*')) xml
FROM s;
```

### trunc



```SQL
/**************日期********************/
1.select trunc(sysdate) from dual --2013-01-06 今天的日期为2013-01-06  
2.select trunc(sysdate, 'mm') from dual --2013-01-01 返回当月第一天.  
3.select trunc(sysdate,'yy') from dual --2013-01-01 返回当年第一天  
4.select trunc(sysdate,'dd') from dual --2013-01-06 返回当前年月日  
5.select trunc(sysdate,'yyyy') from dual --2013-01-01 返回当年第一天  
6.select trunc(sysdate,'d') from dual --2013-01-06 (星期天)返回当前星期的第一天  
7.select trunc(sysdate, 'hh') from dual --2013-01-06 17:00:00 当前时间为17:35   
8.select trunc(sysdate, 'mi') from dual --2013-01-06 17:35:00 TRUNC()函数没有秒的精确  
/***************数字********************/  
TRUNC（number,num_digits）   
Number 需要截尾取整的数字。 
Num_digits 用于指定取整精度的数字。Num_digits 的默认值为 0。
TRUNC()函数截取时不进行四舍五入
*/
9.select trunc(123.458) from dual --123
10.select trunc(123.458,0) from dual --123
11.select trunc(123.458,1) from dual --123.4
12.select trunc(123.458,-1) from dual --120
13.select trunc(123.458,-4) from dual --0
14.select trunc(123.458,4) from dual --123.458
15.select trunc(123) from dual --123
16.select trunc(123,1) from dual --123
17.select trunc(123,-1) from dual --120
```
[原文链接](https://www.cnblogs.com/suding1188/archive/2013/01/06/2848067.html)

### decode

含义解释：
decode(条件,值1,返回值1,值2,返回值2,...值n,返回值n,缺省值)

该函数的含义如下：
IF 条件=值1 THEN
　　　　RETURN(翻译值1)
ELSIF 条件=值2 THEN
　　　　RETURN(翻译值2)
　　　　......
ELSIF 条件=值n THEN
　　　　RETURN(翻译值n)
ELSE
　　　　RETURN(缺省值)
END IF

```sql
SELECT sum(decode(to_char(regdate,'YYYY'),'2013',1,0)) "2013",
       sum(decode(to_char(regdate,'YYYY'),'2014',1,0)) "2014",
       sum(decode(to_char(regdate,'YYYY'),'2015',1,0)) "2015"
from reg
#where to_char(regdate,'YYYY') in ('2013','2014','2015');
```

上面示例统计了注册日期分别在2013、2014、2015间的人数。

### 举例
|姓名|科目|成绩|
|--|--|--|
|student1|语文|80|
|student1|数学|70|
|student1|英语|60|
|student2|语文|90|
|student2|数学|80|
|student2|英语|100|

```oracle
select 姓名 "姓名",
     decode(科目,'语文',成绩) "语文",
     decode(科目,'数学',成绩) "数学",
     decode(科目,'英语',成绩) "英语"
from test_decode;
```

结果如下

|姓名|语文|数学|英语|
|---|---|---|---|
|student1|80|  |  |           
|student1|  |70|  |      
|student1|  |  |60|            
|student2|90|  |  |            
|student2|  |80|  |                          
|student2|  |  |100|                        

和预想中的还是有很大差距的，因为decode他是按照test_decode中的数据一行行解析，test_decode第一行科目只有语文，那有语文的返回成绩，其他没有的就会返回空。而我们只想让其返回一个数值，在这我们可以利用到MAX函数，可以取其中最大值。最大值只有一个，则就会返回有成绩的那个值

```sql
select 姓名,
      MAX(decode(科目,'语文',成绩)) "语文",
      MAX(decode(科目,'数学',成绩)) "数学",
      MAX(decode(科目,'英语',成绩)) "英语"
from test_decode group by 姓名;
```

结果

|姓名|语文|数学|英语|
|---|----|----|----|
|student1|80|70|60|
|student2|90|80|100|


### MERGE（合并）

#### 语法

```sql
MERGE INTO 要合并的表名a
USING 要合并的表名b(在后面可以取别名)
ON(条件)
WHEN MATCHED THEN#如果条件满足
#UPDATE SET/....进行操作
WHEN NOT MACHED THEN#如果条件不满足
#INSERT VALUES/....进行操作
```

### CASE WHEN THEN END

```sql
#简单Case函数
CASE sex
WHEN '1' THEN '男'
WHEN '2' THEN '女'
ELSE '其他' END
```

###rank() dense_rank() row_number()

[链接](https://jingyan.baidu.com/article/597035521ff2ec8fc107404b.html)

```sql
#over中是名次排列的规则
select rank() over(order by sc.score desc) 名次,
sno,score from sc
where cno = 'C13' order by score desc;
```

### round()
``round(num,2)``对num保留两位小数




