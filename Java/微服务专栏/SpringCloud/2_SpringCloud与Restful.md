---
title: SpringCloud与Restful
tags:
 - SpringCloud
categories: 
 - SpringCloud
---



### 搭建SpringCloud项目开发环境

SpringCloud是建立在SpringBoot基础上的，所以开发者必须掌握SpringBoot开发框架。由于SpringCloud是基于Restful架构的RPC开发实现，所以微架构设计中往往在客户端利用RestTemplate来实现远程Restful业务调用。为了保证系统安全，也可以使用SpringSecurity进行安全访问控制。

SpringCloud技术与SpringBoot技术一样，都提供了统一的pom.xml配置项，配置好相应的版本之后就可以在各个Maven子模块中进行依赖支持库的简单引用。

![Image00280](2_SpringCloud与Restful.assets/Image00280.jpg)

SpringCloud技术与传统开发不一样的地方在于，其版本号并未采用数字，而是使用了一系列英国的地名作为标注。

![Image00281](2_SpringCloud与Restful.assets/Image00281.jpg)



创建一个新的Springboot项目，引入依赖。

~~~xml
<spring-boot-dependencies.version>2.0.5.RELEASE</spring-boot-dependencies.version>
<spring-cloud-dependencies.version>Finchley.SR2</spring-cloud-dependencies.version>
...
<dependency>				<!-- 定义SpringBoot依赖管理 -->
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>${spring-boot-dependencies.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>				<!-- 进行SpringCloud依赖包的导入处理 -->
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>${spring-cloud-dependencies.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
~~~



### Restful基础实现

不管使用何种技术实现的RPC项目开发，采用的均为服务端与客户端结构。为了保证服务端定义与客户端访问的标准性，可以单独创建一个远程接口的描述项目。







### Restful接口描述

利用SpringCloud开发技术可以方便地实现Restful技术标准。从另外一个方面来说，这些接口如果要给其他消费端程序使用，就需要有良好的接口说明信息，可以明确地将服务接口以及参数的作用告诉使用者，此时就可以利用Swagger技术实现。

修改pom.xml配置文件，引入Swagger相关依赖库。

建立Swagger配置类，定义接口描述基础信息。

修改DeptRest程序类，使用Swagger进行接口描述。

本程序为Restful控制器中追加了接口的注解描述，当程序启动后可以通过swagger-ui.html地址进行访问，页面运行后的效果如图



### SpringSecurity安全访问