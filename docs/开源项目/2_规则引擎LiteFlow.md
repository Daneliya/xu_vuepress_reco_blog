---
title: 规则引擎LiteFlow
tags:
 - 开源项目
categories: 
 - 开源项目
---



## 一、LiteFlow简介

> https://gitee.com/dromara/liteFlow
>
> https://liteflow.cc/

搭建系统要先搭建框架，而搭建框架最重要的事情之一就是要设计好流程引擎。流程引擎可以带来诸如**【避免冗余】【最小修改】【方便追踪】【利于分工】【可读性好】【灵活多变】**等好处，这些好处是伴随着整个系统生命周期的。

市面上这样的引擎其实还挺多的，知名的包括**Activiti、Flowable、camunda** 等。这些流程引擎功能强大，还提供了可视化的能力，很多大厂也在使用。**LiteFlow** 是相比他们来说更轻量级一些的流程引擎，很容易上手，取之即用。

官方对LiteFlow的介绍：

> *LiteFlow是一个轻量且强大的国产规则引擎框架，可用于复杂的组件化业务的编排领域，独有的DSL规则驱动整个复杂业务，并可实现平滑刷新热部署，支持多种脚本语言规则的嵌入。帮助系统变得更加丝滑且灵活。*
>
> *LiteFlow于2020年正式开源，2021年获得开源中国年度最受欢迎开源软件殊荣。于2022年获得Gitee最有价值开源项目(GVP)荣誉。是一个正处在高速发展中的开源项目。*
>
> *LiteFlow是一个由社区驱动的项目，拥有一个2500多人的使用者社区*

虽然相比Acitiviti、Flowable来说，LiteFlow的知名度要低得多，功能也没有这些知名成熟引擎那么强大，但LiteFlow还是有诸多优点，能够满足你绝大部分的场景。这些优点包括：

**【使用便捷】**：引几个jar包、实现几个接口、写一个流程编排文件，就能run。

**【编排丰富】**：支持串行、并行、选择、循环、异常处理、嵌套等各种编排方式。

**【支持脚本】**：支持各种主流脚本语言。

**【配置源丰富】**：支持将流程定义放到ZK、DB、Etcd、Nacos等。相当于可以实现动态配置更改。

## 二、快速开始

### 依赖

增加liteflow-spring-boot-starter依赖包，提供自动装配功能

~~~
<dependency>
    <groupId>com.yomahub</groupId>
    <artifactId>liteflow-spring-boot-starter</artifactId>
    <version>2.12.0</version>
</dependency>
~~~

### 配置



## 三、实战

### 简单的串行流程

以一个简单的用户转账接口为例：

提供一个用户转账接口，用户可以给收款方转账，转账成功后生成一个转账账单。

#### 【step1】确定流程

一个转账行为的步骤如下：

![image-20240511221120610](2_规则引擎LiteFlow.assets/image-20240511221120610.png)



#### 【step2】实现组件

根据上面这个流程，实现如下组件：

【UserTransferComponent】：用户转账组件，负责执行转账操作。

【UserTransferBillComponent】：用户转账账单组件，记录转账账单。

【UserTransferSuccessComponent】：转账成功组件，设置转账成功标志。

这三个组件的关键是要继承LiteFlow的NodeComponent类，并实现process()方法，如下所示：







#### 【step3】编排组件

接着，我们要新建一个流程配置文件，并在里面描述我们想要的流程。

我们先新建一个flow.el.xml文件，并在application.yml中配置

application.yml

```yaml
liteflow:
  rule-source: config/*.el
```

接着，就是最重要的一步，在flow.el.xml中编写流程，如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<flow>
    <chain name="userTransferChainSimple">
        THEN(userTransfer, userTransferBill, userTransferSuccess);
    </chain>
</flow>
```

文件中包含这些内容：

【1】需要对这个chain取一个name，这个name在后面调用流程时需要用到。

【2】THEN中我们可以看到，我们编排了上面编写的三个组件，并且有顺序关系。

#### 【step4】实现一个controller调用接口

~~~java
/**
 * 转账流程调用接口
 *
 * @author xxl
 * @date 2024/5/11 22:14
 */
@RestController
public class UserTransferController {

    //LiteFlow核心bean，用来触发流程
    @Resource
    private FlowExecutor flowExecutor;

    @GetMapping(path = "/userTransferChainSimple")
    public String userTransferChainSimple(@RequestParam String payerId, @RequestParam String payeeId, @RequestParam int money) {
        //1. 构建请求上下文对象，用来传递参数进流程组件
        RequestContext requestContext = new RequestContext();
        requestContext.setPayerId(payerId);
        requestContext.setPayeeId(payeeId);
        requestContext.setMoney(money);

        //2. 调用流程引擎，传入请求上下文和结果上下文，结果上下文用于组件在其中设置各种结果
        ResponseContext responseContext = new ResponseContext();
        flowExecutor.execute2Resp("userTransferChainSimple", null, requestContext, responseContext);

        //3. 构造返回对象
        return buildResult(responseContext);
    }
}
~~~

其中需要注意的是：启动流程时需要构建上下文对象并传入流程引擎。这个上下文对象完全可以自己定义，上图示例仅是我的习惯（分开了请求上下文和结果上下文）。

#### 【step5】run！









参考资料

苏三说技术-聊聊LiteFlow

