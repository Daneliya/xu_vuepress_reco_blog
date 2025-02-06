---
title: SpringBoot整合数据源
tags:
 - SpringBoot
categories: 
 - SpringBoot
---



在实际项目开发中任何项目都很难脱离数据库而单独存在，所以为了提高数据库的操作性能，开发者往往会借助于数据库连接池来进行处理，同时在项目中利用DataSource进行数据源的连接。常用的有C3P0和Druid两类数据库连接池。

## SpringBoot整合C3P0数据库连接池

C3P0是一个开源的JDBC连接池，它实现了数据源和JNDI绑定，支持JDBC3规范和JDBC2的标准扩展，同时在Hibernate、Spring项目开发中被广泛应用。

修改父pom.xml配置文件，追加C3P0依赖支持管理。

修改pom.xml配置文件，引入C3P0的相关依赖支持库。

修改application.yml配置文件，追加C3P0数据库连接池配置信息。

建立C3P0数据源连接池配置类，此时设置的Bean名称为dataSource。

编写测试类，测试当前DataSource配置是否正确。



如果有以下报错：

~~~sh
java.sql.SQLException: SSL connection required for plugin 'sha256_password'. Check if "useSSL" is set to "true".
~~~

在数据库连接后面追加`?useSSL=false`

~~~sh
java.sql.SQLException: The server time zone value 'ÖÐ¹ú±ê×¼Ê±¼ä' is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.
~~~

在数据库连接后面追加`?serverTimezone=UTC`

## SpringBoot整合Druid数据库连接池

Druid是阿里巴巴推出的一款数据库连接池组件（可以理解为C3P0的下一代产品），也是一个用于大数据实时查询和分析的高容错、高性能开源分布式系统，可高效处理大规模的数据并实现快速查询和分析。

修改父pom.xml文件，引入Druid的相关依赖库。

修改pom.xml配置文件，追加Druid依赖配置。

修改application.yml配置文件，追加Druid的连接配置。

此时，项目中就可以采用Druid数据库连接池来进行数据库操作了。

> **提示：进行连接测试前需要导入相应ORM框架的依赖支持包。**
>
> 在本程序中，如果要进行DataSource连接测试，则需要导入ORM依赖关联包。例如，可以在本程序中导入MyBatis的ORM开发包。
>
> ~~~
> 
> ~~~
>
> 导入以上开发包之后，可以正常测试。如果未导入，则程序测试时会出现Unsatisfied DependencyException异常信息。