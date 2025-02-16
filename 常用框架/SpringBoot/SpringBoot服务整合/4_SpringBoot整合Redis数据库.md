---
title: SpringBoot整合Redis数据库
tags:
 - SpringBoot
categories: 
 - SpringBoot
---



## SpringBoot整合Redis数据库

Redis是当下最流行的用于实现缓存机制的NoSQL数据库，其主要通过key-value存储，支持高并发访问。在实际工作中，Redis结合SpringData技术后可以方便地实现序列化对象的存储。SpringBoot很好地支持了Redis，可以在项目中使用SpringData进行Redis数据操作。

### SpringBoot整合RedisTemplate操作Redis

RedisTemplate是SpringData提供的Redis操作模板，该操作模板主要以Jedis驱动程序为实现基础，进行数据操作封装，所以可以直接调用Redis中的各种数据处理命令进行数据库操作。

修改项目中的pom.xml配置文件，追加Redis的依赖引用。

修改application.yml配置文件，引入Redis相关配置项。

在application.yml配置文件中定义完Redis的相关配置后，就可以通过程序来利用RedisTemplate模板进行数据处理了。下面直接编写一个测试类进行测试。

本程序在测试类中直接注入了RedisTemplate模板对象，并且利用模板对象中提供的方法实现了key-value数据的保存与获取。

### Redis对象序列化操作

在实际项目开发中，使用RedisTemplate操作Redis数据库不仅可以方便地进行命令的操作，还可以结合对象序列化操作，实现对象的保存。

定义对象的序列化配置类，以实现RedisSerializer接口。

要让建立的对象序列化管理类生效，还需要建立一个RedisTemplate的配置类。

建立一个待序列化的VO类对象。

建立测试类，实现对象信息保存。

此时的程序可以使用String作为key类型，Object作为value类型，直接利用RedisTemplate可以将对象序列化保存在Redis数据库中，也可以利用指定的key通过Redis获取对应信息。

### 配置多个RedisTemplate

SpringBoot通过配置application.yml，只能够注入一个RedisTemplate对象。从事过实际开发的读者应该清楚，在实际的使用中有可能会在项目中连接多个Redis数据源，这时将无法依靠SpringBoot的自动配置实现，只能够由用户自己来创建RedisTemplate对象。

为了规范配置，需要在application.yml中进行两个Redis数据库连接的配置。

修改pom.xml配置文件。

编写自定义的Redis配置类。

编写测试类，使用两个RedisTemplate进行数据操作。

本程序利用RedisConfig程序类注入了两个RedisTemplate对象，因此该程序具备了两个Redis数据库的操作能力。