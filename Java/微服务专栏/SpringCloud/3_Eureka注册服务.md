---
title: Eureka注册服务
tags:
 - SpringCloud
categories: 
 - SpringCloud
---

## 一、Eureka简介

RestTemplate在进行微服务访问的时候，需要明确地通过微服务的地址进行调用。这样直接利用地址的调用，一旦出现服务端主机地址变更，则消费端就需要进行大量的修改。同时，微服务的主要目的是提高业务处理能力，因此往往会若干个相同业务的微服务一同参与运算。为了解决这样的问题，在微服务的使用中需要采用Eureka注册中心对所有微服务进行管理。所有的微服务在启动后需要全部向Eureka中进行服务注册，而后客户端直接利用Eureka进行服务信息的获得，以实现微服务调用。

![Image00323](3_Eureka注册服务.assets/Image00323.jpg)

## 二、定义Eureka服务端

在SpringCloud中大量使用了Netflix的开源项目，而其中Eureka就属于Netflix提供的发现服务组件，该应用程序需要由开发者自行定义。

### 1、引入依赖

创建新的子模块springcloud-eureka

修改pom.xml配置文件，除了引入SpringBoot相关依赖库之外，还需要引入Eureka相关依赖库。

~~~xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka-server</artifactId>
</dependency>
~~~

### 2、修改配置文件

修改application.yml配置文件，进行Eureka服务器配置。

~~~yaml
eureka: 
  instance:                   # eureak实例定义
    hostname: eureka-7001.com # 定义Eureka实例所在的主机名称
~~~

### 3、修改启动类

定义程序启动主类，添加Eureka相关注解。

~~~java
@SpringBootApplication
@EnableEurekaServer                    // 启用Eureka服务
public class SpringbootEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootEurekaApplication.class, args);
    }
}
~~~

### 4、修改主机配置

修改hosts配置文件，追加主机配置。

在Windows系统中，Hosts文件的位置是：`C:\Windows\System32\drivers\etc\hosts`

修改hosts后需要刷新DNS缓存使之生效，在cmd命令行中执行命令：`ipconfig/flushdns`

~~~conf
127.0.0.1 eureka-7001.com
~~~

此时配置的主机名称eureka-7001.com与application.yml中配置的Eureka运行主机名称相同。

### 5、访问

启动Eureka服务端，随后输入访问地址http://eureka-7001.com:7001/，可以看见管理界面。

![image-20250227211209675](3_Eureka注册服务.assets/image-20250227211209675.png)

### 异常1

**提示：关于程序运行中的TransportException异常。**

虽然现在已经配置完了Eureka注册中心，但在运行中却会发现控制台上会输出如下错误信息：

~~~
com.netflix.discovery.shared.transport.TransportException: Cannot execute request on any known server
~~~

之所以会有这些错误信息，主要是因为Eureka在默认配置下自己也是一个微服务，并且该微服务应该向Eureka中注册，但却无法找到主机所导致的。要想解决这个问题，需要修改application.yml配置文件，追加配置项。

修改application.yml配置文件，追加如下配置。

~~~yaml
server:
  port: 7001
eureka:
  client:
    # EurekaServer的地址，现在是自己的地址，如果是集群，需要加上其它Server的地址
    service-url:
      defaultZone: http://127.0.0.1:${server.port}/eureka
    # 不把自己注册到eureka服务列表
    register-with-eureka: false
    # 拉取eureka服务信息
    fetch-registry: false # false表示自己就是注册中心，不需要从注册中心获取注册列表信息
  instance: # eureak实例定义
    hostname: eureka-7001.com # 定义Eureka实例所在的主机名称
~~~

此时的程序配置了微服务要注册的Eureka服务地址，但是服务信息注册没有意义，所以配置了register-with-eureka与fetch-registry选项，不再在Eureka注册中心中显示该微服务信息。



### 异常2

~~~
java.lang.TypeNotPresentException: Type javax.xml.bind.JAXBContext not present
~~~

原因：JAXBContext不存在，网上查找的原因说是因为JAXB-API是java ee的一部分，java9引入了模块化的概念，在jdk11中在jdk11中没有在默认的类路径中，使得JAXB默认没有加载。

解决

~~~xml
<!-- jaxb模块引用 - start -->
<dependency>
   <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
</dependency>
<dependency>
    <groupId>com.sun.xml.bind</groupId>
    <artifactId>jaxb-impl</artifactId>
    <version>2.3.0</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.0</version>
</dependency>
<dependency>
    <groupId>javax.activation</groupId>
    <artifactId>activation</artifactId>
    <version>1.1.1</version>
</dependency>
<!-- jaxb模块引用 - end -->
~~~

也可以使用java9模块命令方式引入jaxb-api：

```bash
--add-modles java.xml.bind
```

## 向Eureka中注册微服务

Eureka注册中心搭建成功后，所有的微服务都应该向Eureka中进行注册，此时应该进行微服务程序的配置，在微服务中引入Eureka客户端依赖，并且配置Eureka地址。

修改pom.xml配置文件，引入相关依赖库。

修改application.yml配置文件，追加Eureka客户端配置。

如果要向Eureka中进行微服务注册，还需要为当前微服务定义名称。

修改StartDeptServiceApplication8001程序启动类。

这里定义了@EnableEurekaClient注解信息，微服务启动之后，该服务会自动注册到Eureka服务器之中。分别启动Eureka注册中心微服务与部门微服务之后，就可以通过Eureka注册中心观察到所注册的微服务信息，如图8-3所示。

## Eureka服务信息

## Eureka发现管理

## Eureka安全配置

## Eureka-HA机制

## Eureka服务发布