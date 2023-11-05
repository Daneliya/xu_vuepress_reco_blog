---
title: IDEA使用技巧
tags:
  - IDEA
categories:
  - IDEA
---



## HTTP请求

使用示例

~~~
### 常量定义请在.env进行设置

### 测试-包材及工艺知识-添加
POST {{host}}/v1/craft-knowledge
Authorization: Bearer {{token}}
Content-Type: application/json

{
    "name" : "可做工艺名称",
    "introduce" : "介绍",
    "merit" : "优点"
}
~~~

HTTP Client请求测试工具的使用 https://blog.csdn.net/huantai3334/article/details/115905570

https://blog.csdn.net/weixin_44000238/article/details/109501241

## javadoc生成

1. Tools >> Generate JavaDoc
2. Generate JavaDoc scope：根据需要选择自己要生成的部分。可以加选几个文件，也可以选择范围。
3. Output directory：输出的位置 。
4. 可见性级别：根据实体中的字段调整到 private。
5. @deprecated 默认就好（按首字母排序or字段顺序与实体类保持一致）。
6. 设置语言Locale：zh_CN。
7. 命令行参数（设置字符集）Other command line arguuments：-encoding UTF-8 -charset UTF-8。

https://blog.csdn.net/jx520/article/details/127058046


