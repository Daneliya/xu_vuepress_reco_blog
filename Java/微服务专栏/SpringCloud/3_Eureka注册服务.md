---
title: Eureka注册服务
tags:
 - SpringCloud
categories: 
 - SpringCloud
---

### Eureka简介

RestTemplate在进行微服务访问的时候，需要明确地通过微服务的地址进行调用。这样直接利用地址的调用，一旦出现服务端主机地址变更，则消费端就需要进行大量的修改。同时，微服务的主要目的是提高业务处理能力，因此往往会若干个相同业务的微服务一同参与运算。为了解决这样的问题，在微服务的使用中需要采用Eureka注册中心对所有微服务进行管理。所有的微服务在启动后需要全部向Eureka中进行服务注册，而后客户端直接利用Eureka进行服务信息的获得，以实现微服务调用。

### 定义Eureka服务端

在SpringCloud中大量使用了Netflix的开源项目，而其中Eureka就属于Netflix提供的发现服务组件，该应用程序需要由开发者自行定义。

创建新的子模块springcloud-eureka

修改pom.xml配置文件，除了引入SpringBoot相关依赖库之外，还需要引入Eureka相关依赖库。

~~~
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka-server</artifactId>
		</dependency>
~~~

修改application.yml配置文件，进行Eureka服务器配置。

~~~
eureka: 
  instance:                   # eureak实例定义
    hostname: eureka-7001.com # 定义Eureka实例所在的主机名称
~~~

定义程序启动主类，添加Eureka相关注解。

修改hosts配置文件，追加主机配置。

此时配置的主机名称eureka-7001.com与application.yml中配置的Eureka运行主机名称相同。

启动Eureka服务端，随后输入访问地址http://eureka-7001.com:7001/，可以看见如图8-2所示的管理界面。

**提示：关于程序运行中的TransportException异常。**

虽然现在已经配置完了Eureka注册中心，但在运行中却会发现控制台上会输出如下错误信息：

~~~

~~~

之所以会有这些错误信息，主要是因为Eureka在默认配置下自己也是一个微服务，并且该微服务应该向Eureka中注册，但却无法找到主机所导致的。要想解决这个问题，需要修改application.yml配置文件，追加配置项。

修改application.yml配置文件，追加如下配置。

~~~

~~~

此时的程序配置了微服务要注册的Eureka服务地址，但是服务信息注册没有意义，所以配置了register-with-eureka与fetch-registry选项，不再在Eureka注册中心中显示该微服务信息。

### 向Eureka中注册微服务