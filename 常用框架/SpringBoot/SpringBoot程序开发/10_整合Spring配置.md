---
title: 整合Spring配置
tags:
 - SpringBoot
categories: 
 - SpringBoot
---



在进行Spring项目配置的时候，可以通过*.xml文件配置，也可以通过Bean（@Configuration注解）配置。SpringBoot延续了Spring这一特点，在SpringBoot项目中依然可以使用配置文件定义。

## 一、xml文件配置方式

建立一个MessageUtil的工具类，在MessageUtil类中定义一个getInfo()方法，该方法的主要功能是返回一个提示信息。

~~~

~~~

在src/main/resources目录中创建spring的子目录，并且建立spring-util.xml配置文件。

~~~

~~~

在程序类中注入MessageUtil类对象，并且调用方法返回信息。

~~~

~~~

修改程序启动主类，定义要导入的Spring配置文件。

~~~

~~~

本程序在定义启动主类时，利用@ImportResource注解导入了所需要的Spring配置文件，而后会自动将配置文件中定义bean对象注入到MessageController类的属性中。



## 二、Bean配置方式

SpringBoot强调的就是“零配置”，虽然其本身支持配置文件定义，但很明显xml的配置形式不是最好的。如果确定要引入其他配置，强烈建议使用Bean的配置形式来完成。

~~~

~~~

DefaultConfig定义在程序主类所在的子包之中，这样就可以在SpringBoot程序启动时自动扫描配置并进行加载。对于程序的主类，也就没有必要使用@ImportResource注解读取配置文件了。

> **提问：实际开发中使用配置文件还是使用Bean类配置？**
>
> 在编写SpringBoot项目的过程之中，是采用*.xml配置更好，还是利用Bean类配置会更好？
>
> **回答：崇尚“零配置”的SpringBoot项目建议使用Bean配置。**
>
> 在SpringBoot项目中进行配置的时候，实际上有3种支持，按照优先选择顺序为：application.yml、Bean配置和*.xml配置文件。大部分的配置都可以在application.yml（相当于传统项目中的profile配置作用）里面完成，但很多情况下会利用Bean类来进行扩展配置（本书主要使用此形式来作为扩展配置）。之所以提供*.xml配置文件的支持，主要目的是帮助开发者用已有代码快速整合SpringBoot开发框架。