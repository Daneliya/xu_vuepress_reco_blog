---
title: ELK篇之SpringBoot集成ELK
tags:
 - 分布式日志收集
 - Logstash
categories: 
 - 分布式日志收集
 - Logstash
---



## 项目中集成Logstash

`pom.xml`增加`logback` 整合 `logstash` 的依赖

~~~xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.3</version>
</dependency>
~~~

 `application.yaml` 文件中添加`logstash`配置

~~~yml
server:
  port: 8081

log:
  # logstash 地址和端口，注意修改
  logstash-host: 192.168.64.128:5044
~~~

`logback-spring.xm`l增加`logback`组件

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="60 seconds" debug="false">
    <!-- 日志存放路径 -->
    <property name="log.path" value="logs/test-log"/>
    <!-- 日志输出格式 -->
    <property name="log.pattern" value="%d{HH:mm:ss.SSS} [%thread] %-5level %logger{20} - [%method,%line] - %msg%n"/>
    <!-- 读取SpringBoot配置文件获取logstash的地址和端口 -->
    <springProperty scope="context" name="logstash-host" source="log.logstash-host"/>

    <!-- 控制台输出 -->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>

    <!-- 系统日志输出 -->
    <appender name="file_info" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/info.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/info.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 7天 -->
            <maxHistory>7</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 过滤的级别 -->
            <level>INFO</level>
            <!-- 匹配时的操作：接收（记录） -->
            <onMatch>ACCEPT</onMatch>
            <!-- 不匹配时的操作：拒绝（不记录） -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <appender name="file_error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/error.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 60天 -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 过滤的级别 -->
            <level>ERROR</level>
            <!-- 匹配时的操作：接收（记录） -->
            <onMatch>ACCEPT</onMatch>
            <!-- 不匹配时的操作：拒绝（不记录） -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 将日志文件输出到Logstash -->
    <appender name="logstash" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <!-- 获取logstash地址作为输出的目的地 -->
        <destination>${logstash-host}</destination>
        <encoder chatset="UTF-8" class="net.logstash.logback.encoder.LogstashEncoder"/>
    </appender>

    <!-- 系统模块日志级别控制  -->
    <logger name="com.greateme" level="info"/>
    <!-- Spring日志级别控制  -->
    <logger name="org.springframework" level="warn"/>

    <root level="info">
        <appender-ref ref="console"/>
    </root>

    <!--系统操作日志-->
    <root level="info">
        <appender-ref ref="file_info"/>
        <appender-ref ref="file_error"/>
        <appender-ref ref="logstash"/>
    </root>
</configuration>
~~~

业务代码增加日志输出进行测试

~~~java
@Slf4j
@RequestMapping("/api")
@RestController
public class ElkController {

    /**
     * 测试输出log的访问方法
     */
    @GetMapping("/testLog")
    public String testLog() {
        log.info("{日志},{}", "测试输出一个日志");
        log.error("{日志},{}", "测试输出一个错误日志");
        return "success";
    }

}
~~~



## 参考资料

[1]. https://blog.csdn.net/m0_51510236/article/details/130413227

[2]. https://www.zhihu.com/tardis/zm/art/347378314

[3]. https://blog.csdn.net/captain_zkk/article/details/124799087

[4]. [自建elk+filebeat+grafana日志收集平台_51CTO博客_elk filebeat](https://blog.51cto.com/u_12970189/2391070)

[5]. [Elasticsearch：如何在 Elastic Agents 中配置 Beats 来采集定制日志_elastic_agen_Elastic](https://blog.csdn.net/UbuntuTouch/article/details/128213642)


