---
title: MongoDB安装
tags:
 - MongoDB
categories: 
 - MongoDB
---




## Windows安装

### 1. 下载安装包

> https://www.mongodb.com/try/download/community

选择zip的格式进行下载

![image-20231221232216135](1_MongoDB安装.assets/image-20231221232216135.png)

附加：mongodb的命名格式: x.y.z

```
- y为奇数表示当前版本为开发版,如:1.5.2、4.1.13
- y为偶数表示当前版本为稳定版,如:1.6.3、4.0.10
- z为修正版本号,越大越好
```



### 2. 解压

下载完成后得到压缩包，解压；其中的bin目录就存放着mongodb相关的命令



### 3. 安装服务

首先要在安装目录里创建两个目录：

- 数据目录：data
- 日志目录：logs

然后以管理员模式，切换到安装目录下的bin目录运行以下格式命令来指定mongdb的数据及日志目录（文件的路径中不能包含中文）

```shell
mongod --install --dbpath 数据目录 --logpath 日志目录\日志名称 
```

具体的代码示例如下所示：

~~~shell
mongod --install --dbpath D:\Software\mongodb-4.4.26\data --logpath D:\Software\mongodb-4.4.26\logs\mongodb.log
~~~

没有任何报错和提示，则代表MongoDB服务创建成功

我们可以进行验证，win+r输入`services.msc`

看到MongoDB服务即成功

补充一下：如果想要删除MongoDB服务的话

```shell
SC DELETE MongoDB
```

### 4. 启动服务

输入以下命令启动服务

```shell
net start mongodb
```

输入`http://localhost:27017/`如果看到以下内容,代表启动成功

~~~
It looks like you are trying to access MongoDB over HTTP on the native driver port.
~~~



### 5. shell连接登录&退出

输入以下命令进行登录与退出

~~~shell
#登录
mongo
mongo --host=localhost --port=27017

#退出
exit	
~~~

补充语法命令：

~~~shell
mongod --install --dbpath 数据目录 --logpath 日志目录\日志名称	#创建服务
mongod --remove	    #卸载服务		
net start mongodb	#启动服务
net stop mongodb	#关闭服务
mongod #是处理MongoDB系统的主要进程。它处理数据请求，管理数据存储，和执行后台管理操作。当我们运行mongod命令意味着正在启动MongoDB进程,并且在后台运行。
~~~

