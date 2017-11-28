---
title: oracle实验笔记二
date: 2017-11-28 20:19:20
tags: oracle
category: "数据库"
---
## PL/SQL程序基础

---

### 进程

```sql
#创建进程
create or replace procedure procedure_name as
#查看已经创建的存储过程或函数。
select object_name,authid from user_procedures
#查看存储过程ex4_2的源代码
select line,text from user_source where name="ex4_2"
```



<!--more-->
### pl/sql

带有分支和循环，面向过程

### %type && %rowtype

#### %type

为了使一个变量的数据类型与另一个已经定义了的变量（尤其是表的某一列）的数据类型相一致，Oracle提供了%TYPE定义方式。当被参照的那个变量的数据类型改变了之后，这个新定义的变量的数据类型会自动跟随其改变，容易保持一致，也不用修改PL/SQL程序了。当不能确切地知道被参照的那个变量的数据类型时，就只能采用这种方法定义变量的数据类型。

```sql
vno emp.empno%type;
vname emp.ename%type;
BEGIN
#查到数据存到beigin前定义的结构中
SELECT empno,ename INTO vno,vname FROM emp;
#输出 ||感觉就是连接符
dbms_output.put_line('EmpNo:'||vno||',Name:'||vname);
END;
.
```

#### %rowtype

如果一个表有较多的列，使用%ROWTYPE来定义一个表示表中一行记录的变量，比分别使用%TYPE来定义表示表中各个列的变量要简洁得多，并且不容易遗漏、出错。这样会增加程序的可维护性。
   为了使一个变量的数据类型与一个表中记录的各个列的数据类型相对应、一致，Oracle提供%ROWTYPE定义方式。当表的某些列的数据类型改变了之后，这个新定义的变量的数据类型会自动跟随其改变，容易保持一致，也不用修改PL/SQL程序了。当不能确切地知道被参照的那个表的结构及其数据类型时，就只能采用这种方法定义变量的数据类型。
   一行记录可以保存从一个表或游标中查询到的整个数据行的各列数据。一行记录的各个列与表中一行的各个列有相同的名称和数据类型。

```sql
row_emp emp%rowtype;
BEGIN
#将所有数据都存在row_emp这个容器中，类似对象。
SELECT * INTO row_emp FROM emp;
dbms_output_put(row_emp.empno||','||row_emp.enma||'');
END;
.
```


#### if&&case

```sql
#if
IF条件
THEN ..
ELSE ..
END IF;
#CASE
CASE
WHEN 条件 END；
WHEN 条件 END；
ELSE ;
END CASE;
```
#### 赋值

```sql
#赋值操作用：=
i integer := 1;
n integer := 999;
```

#### 参数

```sql
#接受vDEPTNO参数
create or replace
procedure obj4_2(vDEPTNO integer) as
  vDNAME VARCHAR2(14 BYTE);
  vLOC VARCHAR2(13 BYTE);
begin
  select dname,loc
    into vDNAME,vLOC
    from dept
    where DEPTNO = vDEPTNO;
  dbms_output.put_line(vDNAME||','||vLOC);
end;	
#通过以下语句即可创建匿名块,然后通过dbms输出板块查看
execute obj4_2(10);
```


