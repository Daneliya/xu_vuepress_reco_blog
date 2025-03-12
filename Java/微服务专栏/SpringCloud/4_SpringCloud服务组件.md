---
title: SpringCloud服务组件
tags:
 - SpringCloud
categories: 
 - SpringCloud
---



SpringCloud微架构开发中存在着众多的微服务，这些微服务之间也会存在互相的调用关联，为了防止某一个微服务不可用时关联微服务出现问题，需要引入Hystrix熔断处理机制。同时，微服务的调用形式在消费端应该以远程接口的形式出现，为此SpringCloud家族提供了Feign转换技术。为了保证微服务的安全访问，还提供了类似网关的Zuul组件支持。

## 一、Ribbon负载均衡组件

所有的微服务都需要注册到Eureka服务中，因此可以通过Eureka对所有微服务进行管理。消费端应该通过Eureka来进行微服务接口调用，这种调用可以利用Ribbon技术来实现。

### Ribbon基本使用

Ribbon是一个与Eureka结合的组件，其主要作用是进行Eureka中的服务调用。要使用Ribbon，需要在项目中配置spring-cloud-starter-ribbon依赖库。同时对于所有注册到Eureka中的微服务也要求有微服务的名称，在消费端将通过微服务的名称进行微服务调用。

修改pom.xml配置文件，引入Ribbon依赖库。









有微服务进行管理。消费端应该通过Eureka来进行

修改RestfulConfig配置类，追加Ribbon注解。

修改application.yml配置文件，追加Eureka访问地址。

在控制器类中通过微服务名称调用微服务，此时不再需要知道微服务的具体主机信息。

修改程序启动类，追加Eureka客户端注解。

此时，消费端就可以实现Eureka中注册微服务的调用，并且在消费端通过名称实现微服务调用。

### Ribbon负载均衡

微服务搭建的业务中心可以通过多台业务功能相同的微服务构建微服务集群，所有的微服务为了可以动态维护，都需要将其注册到Eureka之中，这样消费端就可以利用Ribbon与Eureka的服务主机列表实现微服务轮询调用，以实现负载均衡。需要注意的是，Ribbon提供的是一种客户端的负载均衡配置。

## 二、Feign远程接口映射



## 三、Hystrix熔断机制

在实际项目中，由于业务功能的不断扩充，会出现大量的微服务互相调用的情况。

![Image00394](4_SpringCloud服务组件.assets/Image00394.jpg)

如图所示，微服务1要想完成功能，需要调用微服务2、微服务3、微服务4，一旦这个时候微服务4出现问题（其他微服务没有问题），则微服务1、2、3就有可能出现错误。这样的问题在微服务开发中称为雪崩效应。

为了防止这种雪崩效应的出现，在SpringCloud中引入了Hystrix熔断机制。在大部分开发状态下，开发者可以直接使用Hystrix的默认配置。如果有需要，开发者也可以使用如下几类常用配置项。

:one:微服务执行相关配置项。

-  hystrix.command.default.execution.isolation.strategy（默认为thread）：隔离策略，可选用thread或semaphore。
- hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds（默认为1000ms）：命令执行超时时间。
- hystrix.command.default.execution.timeout.enabled（默认为true）：执行是否启用超时配置。
- hystrix.command.default.execution.isolation.thread.interruptOnTimeout（默认为true）：发生超时时是否中断。
- hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests（默认为10）：最大并发请求数，该参数在使用ExecutionIsolationStrategy.SEMAPHORE策略时才有效。如果达到最大并发请求数，请求会被拒绝。理论上选择semaphore size和选择thread size一致，但选用semaphore时每次执行的单元要比较小且执行速度较快（ms量级），否则应该选用thread。semaphore一般占整个容器（Tomcat或Jetty）线程池的一小部分。

2️⃣失败回退（fallback）相关配置项。

- hystrix.command.default.fallback.isolation.semaphore.maxConcurrentRequests（默认为10）：如果并发数达到该设置值，请求会被拒绝，抛出异常，并且失败回退，不会被调用。
- hystrix.command.default.fallback.enabled（默认为true）：当执行失败或者请求被拒绝时，是否会调用fallback方法。

3️⃣熔断处理相关的配置项。

- hystrix.command.default.circuitBreaker.enabled（默认为true）：跟踪circuit的健康性，如果出现问题，则请求熔断。
- hystrix.command.default.circuitBreaker.sleepWindowInMilliseconds（默认为5000）：触发熔断时间。
- hystrix.command.default.circuitBreaker.errorThresholdPercentage（默认为50）：错误比率阀值，如果错误率≥该值，circuit会被打开，并短路所有请求触发失败回退。
- hystrix.command.default.circuitBreaker.forceOpen（默认为false）：强制打开熔断器。如果打开这个开关，将拒绝所有用户请求。
- hystrix.command.default.circuitBreaker.forceClosed（默认为false）：强制关闭熔断器。

4️⃣线程池（ThreadPool）相关配置项。

- hystrix.threadpool.default.coreSize（默认为10）：并发执行的最大线程数。
- hystrix.threadpool.default.maxQueueSize（默认为−1）：BlockingQueue的最大队列数。值为−1时，使用同步队列（SynchronousQueue）；值为正数时，使用LinkedBlcokingQueue。

### 3.1、Hystrix基本使用

Hystrix的主要功能是对出现问题的微服务调用采用熔断处理，可以直接在微服务提供方上进行配置。

修改pom.xml配置文件，追加Hystrix依赖配置。

修改程序启动主类，增加熔断注解配置。

此时的程序配置了熔断机制，这样即使有更多层级的微服务调用，也不会因为某一个微服务出现问题而导致所有的微服务均不可用。

### 失败回退

失败回退（fallback）也被称为服务降级，指的是当某个服务不可用时默认执行的处理操作。Hystrix中的失败回退是在客户端实现的一种处理机制。

如果要定义失败回退处理，建议通过FallbackFactory接口来进行实现。

修改IDeptService接口定义，追加fallbackFactory处理。

在进行Feign接口转换中，使用fallback设置当微服务不可用时的返回处理执行类。这样调用失败后，会返回DeptServiceFallback子类中所实现的方法内容。

> **提示：也可以单独定义为一个接口定义Fallback处理类。**
>
> 在进行Fallback类定义时，用户还可以直接创建IDeptService的失败回退子类（DeptServiceFallback），而后在通过@FeignClient注解中的fallback属性（fallback=DeptServiceFallback.class）进行配置。
>
> 这种子类配置有可能造成业务接口对象的注入混淆，所以不建议使用。

修改程序启动主类，追加扫描包配置，需要将配置的Fallback处理类进行配置。

这样当微服务关闭之后，由于服务提供方不再可用，所以此时会自动调用DeptServiceFallback类中的相应方法进行处理，返回的都是固定的“失败”信息，如图9-8所示。

### HystrixDashboard

Hystrix提供了监控功能，这个功能就是Hystrix Dashboard，可以利用它来进行某一个微服务的监控操作。

修改pom.xml配置文件，追加依赖库。

微服务如果需要被监控，则要引入actuator依赖库。

在需要进行监控的控制器方法上追加@HystrixCommand注解。

本程序在控制器中的add()、get()、list()3个方法上使用了@HystrixCommand注解，这样只有这3个方法的状态可以被监控到。

> **提示：@HystrixCommand也可以配置失败回退处理。**
>
> 对于失败回退，也可以直接在控制层进行定义，此时只需要在控制层的相应方法上使用@HystrixCommand注解中的fallbackMethod属性定义。
>
> **范例：** 在控制层上定义失败回退。
>
> 此时，当list()方法执行有问题时，会自动调用listFallback()方法进行失败处理。

修改微服务启动类，追加Hystrix支持。

修改application.yml配置文件，修改运行端口。

定义程序启动主类。

修改hosts配置文件，追加主机信息。

程序配置完成后分别启用所需要的Eureka微服务（mldncloud-eureka-7001）、部门微服务（mldncloud-dept-service-8001）、HystrixDashboard微服务（mldncloud-hystrix-dashboard）、消费端微服务（mldncloud-consumer-feign）。服务启动后通过Dashboard访问地址http://dashboard.com:9001/hystrix，并且输入监控地址http://mldnjava:hello@dept-8001.com:8001/hystrix.stream，界面如图9-9所示。当通过消费端访问微服务之后，会针对微服务的状态进行跟踪，如图9-10所示。





### Turbine聚合监控

HystrixDashboard只能够针对某一个微服务进行监控，如果项目中有许多个微服务，且需要对所有微服务统一监控的时候，就可以使用Turbine来实现聚合监控。

修改pom.xml配置文件，引入Turbine依赖库。

修改application.yml，进行Turbine聚合配置。

如果要对所有的微服务进行监控，则在定义微服务时需要配置认证信息。由于这种认证信息只能够在访问微服务的路径中进行配置，所以需要修改安全配置类，取消对监控路径的安全限制。

在本配置中，忽略了Web安全访问（WebSecurity）下/hystrix.stream、/turbine.stream两个路径的认证，所以对这两个路径不再进行安全认证处理。

定义程序启动类，使用Turbine注解。

本程序在启动主类上使用@EnableTurbine注解，这样就可以启动Turebine聚合监控了。

修改hosts主机配置，增加新的主机名称。

启动所有相关的微服务，随后通过HystrixDashboard启动监控程序，如图9-11所示，输入Turbine的监控路径（http://turbine.com:9101/turbine.stream）并且利用消费端访问相应的微服务信息，就可以得到如图9-12所示的监控结果。

## 四、Zuul路由网关