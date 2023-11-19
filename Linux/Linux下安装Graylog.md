---
title: Linux下安装Graylog
autoGroup-1: Linux
autoSort: 5
tags:
 - Linux
categories: 
 - Linux
---


https://www.cnblogs.com/luckyleaf/p/11157905.html

https://blog.csdn.net/qq_37837722/article/details/90482512

https://blog.csdn.net/liukuan73/article/details/52525431



https://www.yingtwo.com/article/7990658.html

https://www.cnblogs.com/majiang/p/14380803.html

https://www.jianshu.com/p/0af261b76d0c



graylog_deflector索引作用

~~~
要配置Graylog以使用graylog_deflector索引并根据策略将数据转发到其他索引中，您需要进行以下步骤：

1. 登录到Graylog的Web界面。
2. 导航到"System"（系统）菜单，然后选择"Indices"（索引）选项。
3. 在索引列表中，找到名为graylog_deflector的索引。如果不存在，请点击"Create index set"（创建索引集）按钮创建一个新的索引集，并将其命名为graylog_deflector。
4. 在graylog_deflector索引的配置页面上，您可以设置以下参数：
- Rotation Strategy（轮询策略）：选择用于切换索引的策略，例如按时间、按大小或其他规则。
- Index Prefix（索引前缀）：指定其他索引的名称前缀。例如，如果您希望创建名为graylog_2022-01-01、graylog_2022-01-02等的索引，可以将前缀设置为graylog_。
- Index Template（索引模板）：选择要应用于新创建的索引的模板。模板定义了索引的设置和映射规则。
- Index Set Configuration（索引集配置）：根据需要配置其他高级设置，例如分片数、副本数等。
5. 完成配置后，点击"Save"（保存）按钮以保存graylog_deflector索引的配置。

一旦graylog_deflector索引配置完成，Graylog将根据您设置的策略自动将数据转发到其他索引中。根据策略的不同，Graylog可能会创建新的索引并将数据写入其中，或者将数据写入已存在的索引中。

请注意，配置graylog_deflector索引和数据转发策略可能需要根据您的具体需求进行调整。建议参考Graylog的官方文档或寻求更详细的配置指南以获得更准确的配置信息。
~~~



Elasticsearch 健康状态为 yellow 问题的解决

[单节点 Elasticsearch 健康状态为 yellow 问题的解决_elasticsearch yellow-CSDN博客](https://blog.csdn.net/ale2012/article/details/106992995)

[Elasticsearch(ES)生产集群健康状况为黄色(yellow)的官方详细解释、原因分析和解决方案(实测可用)_es容器 健康状态yellow-CSDN博客](https://blog.csdn.net/myhes/article/details/106076544)





单机安装

https://blog.csdn.net/qixiaolinlin/article/details/129966703

https://blog.csdn.net/liukuan73/article/details/52525431

https://huaweicloud.csdn.net/637f7accdacf622b8df85933.html

https://www.cnblogs.com/runliuv/p/15475747.html

[在生产环境中使用Graylog日志系统所踩过的坑-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/738051)

-bash: pwgen: command not found

https://blog.csdn.net/weixin_37391237/article/details/121389868

查看graylog报错日志：如果提示报错，请查看 **/var/log/graylog-server**/ 下的日志文件，或 journalctl -xe -u graylog



修改用户名密码

https://www.codeleading.com/article/43856151066

graylog查询语法

https://blog.csdn.net/weixin_43066697/article/details/126303133