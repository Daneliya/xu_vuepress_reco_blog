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





#### 【step2】实现组件

根据上面这个流程，我们实现如下组件：

【UserTransferComponent】：用户转账组件，负责执行转账操作。

【UserTransferBillComponent】：用户转账账单组件，记录转账账单。

【UserTransferSuccessComponent】：转账成功组件，设置转账成功标志。

这三个组件的关键是要继承LiteFlow的NodeComponent类，并实现process()方法，如下所示：







#### 【step3】编排组件

接着，我们要新建一个流程配置文件，并在里面描述我们想要的流程。

我们先新建一个flow.el.xml文件，并在application.yml中配置











参考资料

苏三说技术-聊聊LiteFlow

