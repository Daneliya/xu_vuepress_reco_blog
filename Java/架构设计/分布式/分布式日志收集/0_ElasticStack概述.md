---
title: ElasticStack概述
tags:
 - 分布式日志收集
 - Elasticsearch
categories: 
 - 分布式日志收集
 - Elasticsearch
---



> 官网：https://www.elastic.co/cn



## **Elastic Stack 技术栈**

包含了数据的整合 => 提取 => 存储 => 使用，一整套！

各组件介绍：

- beats 套件：从各种不同类型的文件 / 应用中采集数据。比如：a,b,c,d,e,aa,bb,cc
- Logstash：从多个采集器或数据源来抽取 / 转换数据，向 es 输送。比如：a,bb,cc
- elasticsearch：存储、查询数据
- kibana：可视化 es 的数据



## **Elasticsearch 概念**

> Elasticsearch详细文档可参考分布式搜索中Elasticsearch学习笔记

你就把它当成 MySQL 一样的数据库去学习和理解。

入门学习：

- Index 索引 => MySQL 里的表（table）
- 建表、增删改查（查询需要花费的学习时间最多）
- 用客户端去调用 ElasticSearch（3 种）
- 语法：SQL、代码的方法（4 种语法）

ES 相比于 MySQL，能够自动帮我们做分词，能够非常高效、灵活地查询内容。