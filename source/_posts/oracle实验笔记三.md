---
title: oracle实验笔记三
date: 2017-11-28 20:19:25
tags: oracle
category: "数据库"
---

## 索引

### 主键的插入

```sql
alter table table_name add primary key（key_name）
```

### 创建索引

```sql
create index index_name on table_name(table_col_name);
#位图索引
create bitmap index index_name on table_name(table_col_name);
#索引组合
create index index_name on table_name(table_col_name1,table_col_name2);
#降序排列索引
create index index_name on table_name(table_col_name DESC);
```
<!--more-->
### 查看索引

```sql
select * from user_indexes;
```

### 删除索引

```sql
drop index index_name;
```

## 同义词

### 创建同义词

```sql
create synonym synonym_name for obj_name;
#创建公共同义词
create public synonym synonym_name for obj_name;
```

### 查询同义词

```sql
select * from all_synonyms;
```

### 删除同义词

```sql
drop synonym synonym_name;
```

## 序列

### 创建序列

```sql
#创建序列，该序列起始值50，步长为10,不缓冲,序列名为“obj3_6”。
CREATE SEQUENCE OBJ3_6 INCREMENT BY 10 START WITH 50 NOCACHE;
#创建序列,该序列最大值无限制,最小值为1,步长为1,序列名为“obj3_7”。
CREATE SEQUENCE OBJ3_7 INCREMENT BY 1 MINVALUE 1;
#创建序列,该序列起始值为1000,步长为2,最大值为10000,不可循环,序列名为  “obj3_8”
CREATE SEQUENCE OBJ3_8 INCREMENT BY 2 START WITH 1000 MAXVALUE 10000 NOCYCLE;  
```

### 查询序列

```sql
select * from USER_SEQUENCES;
```

### 序列的引用

```sql
insert into table_name values('sequence_name.nextval','val1','val2'.....);
```

### 序列的修改

```sql
#修改序列  “obj3_6”  ，将该序列最大值设为“82000”，最小值设为“100”，步长设为“5”.
alter sequence sequence_name increment by 5 maxvalue 82000 minvalue 100;
```



