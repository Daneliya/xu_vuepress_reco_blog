---
title: Python数据分析—数据收集
tags:
  - Python
categories:
  - Python
---



**数据分析流程:获取数据、读取数据、评估数据、清洗数据、整理数据、分析数据、可视化数据**

## 一、获取私密数据
获取私密数据没有通用方法，方法取决于具体情况。

## 二、获取公开数据
### (一)、下载
公开数据集

网络上有一些提供公开数据集的网站，可以在后续掌握分析技巧后，探索和下载感兴趣的数据集。

飞桨（百度旗下深度学习平台）数据集：[https://aistudio.baidu.com/aistudio/datasetoverview](https://aistudio.baidu.com/aistudio/datasetoverview)

天池（阿里云旗下开发者竞赛平台）：[https://tianchi.aliyun.com/dataset/](https://tianchi.aliyun.com/dataset/)

和鲸社区（数据科学开源社区）数据集：[https://www.heywhale.com/home/dataset](https://www.heywhale.com/home/dataset)

### (二)、爬虫
获取数据的过程

1. 获取网页内容

通过发送请求，获取网页源代码。

2. 解析网页内容

解析源代码内容，提取出想要的内容。这些数据就可以作为后续分析的原料了...

爬虫的红线

1. 不要爬取公民隐私数据
2. 不要爬取受著作权保护的内容
3. 不要爬取国家事务、国防建设、尖端科学技术领域的计算机系统等

### (三)、API
1. 概念

API, 全称是**Application Programming Interface**，表示应用程序编程接口。

API定义了两个程序之间的服务合约，即双方是如何使用请求和响应来进行通讯的。

2. 爬虫和API获取数据的区别

当我们爬虫时，发送请求后，获取的是网页源码，但网页源码本身是用来给浏览器渲染的，而不是直接的信息。要从中寻找特定数据，还要解析网页源码。

如果网站直接提供给我们API，我们就能按照对方规定好的服务合约，根据规则发送请求，然后直接获得想要的数据，不需要经过解析源码这一步骤。

因此，当一个网站提供了公开API时，通过API而不是爬虫去获取数据，肯定是更高效的方法。

   
 

