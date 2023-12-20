---
title: MongoDB简介
tags:
 - MongoDB
categories: 
 - MongoDB
---



## MongoDB简介

MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的，它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。

MongoDB最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。



## Windows安装

#### 1、下载安装包

> https://www.mongodb.com/try/download/community

选择zip的格式进行下载

附加：mongodb的命名格式: x.y.z

```
- y为奇数表示当前版本为开发版,如:1.5.2、4.1.13
- y为偶数表示当前版本为稳定版,如:1.6.3、4.0.10
- z为修正版本号,越大越好
```

#### 2、解压

下载完成后得到压缩包，解压；其中的bin目录就存放着mongodb相关的命令

#### 3. 安装服务

首先要在安装目录里创建两个目录：

- 数据目录：data
- 日志目录：logs

然后以管理员模式，切换到安装目录下的bin目录运行以下格式命令来指定mongdb的数据及日志目录

```shell
mongod --install --dbpath 数据目录 --logpath 日志目录\日志名称 
```

具体的代码为如下所示：

~~~shell
mongod --install --dbpath D:\Software\mongodb-4.4.26\data --logpath D:\Software\mongodb-4.4.26\logs\mongodb.log
~~~



#### 4. 启动服务

输入以下命令启动服务

```shell
net start mongodb
```

输入`http://localhost:27017/`如果看到以下内容,代表启动成功

~~~
It looks like you are trying to access MongoDB over HTTP on the native driver port.
~~~









参考资料

https://blog.csdn.net/efew212efe/article/details/124524863