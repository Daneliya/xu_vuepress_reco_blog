---
title: JVM调优工具
sticky: 1
tags:
 - JVM
categories: 
 - JVM
---




## 调优工具总结

### JDK自带监控工具

1. **jconsole**：Java Monitoring and Management Console是从java5开始，在JDK中自带的java监控和管理控制台，用于对JVM中内存，线程和类等的监控。
2. **jvisualvm**：jdk自带全能工具，JDK9后成为独立项目，可以分析内存快照、线程快照；监控内存变化、GC变化等，个人用的比较多。



### 第三方工具

1. **MAT（Memory Analyzer Tool）**：一个基于Eclipse的内存分析工具，是一个快速、功能丰富的Java heap分析工具，它可以帮助我们查找内存泄漏和减少内存消耗。
2. **GChisto**：一款专业分析gc日志的工具。
3. **IBM（IBM Thread and Monitor Dump Analyzer for Java）**
4. **Arthas**：阿里开源的线上监控诊断产品，通过全局视角实时查看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，包括查看方法调用的出入参、异常，监测方法执行耗时，类加载信息等。



### 在线工具

1. **gceasy.io**：需要传入JVM相关的数据，可以通过jstat命令生成导出文件，上传文件分析。

   ~~~
   jps
   jstack 16064 > yootk_stack.log
   ~~~

   

### IDEA插件

1. JDK VisualGC

   ~~~
   # 自定义VM选项
   --add-exports=jdk.internal.jvmstat/sun.jvmstat.monitor=ALL-UNNAMED
   --add-exports=jdk.internal.jvmstat/sun.jvmstat.monitor.event=ALL-UNNAMED
   --add-exports=jdk.internal.jvmstat/sun.jvmstat.perfdata.monitor=ALL-UNNAMED
   ~~~

   

## 调优命令

Sun JDK监控和故障处理命令：

1. jps：JVM Process Status Tool，显示指定系统内所有的HotSpot虚拟机进程。
2. jstat：JVM statistics Monitoring是用于监视虚拟机运行时状态信息的命令，它可以显示出虚拟机进程中的类装载、内存、垃圾收集、JIT编译等运行数据。
3. jmap：JVM Memory Map命令用于生成heap dump文件。
4. jhat：JVM Heap Analysis Tool命令是与jmap搭配使用，用来分析jmap生成的dump，jhat内置了一个微型的HTTP/HTML服务器，生成dump的分析结果后，可以在浏览器中查看。
5. jstack：用于生成java虚拟机当前时刻的线程快照。
6. jinfo：JVM Configuration info 这个命令作用是实时查看和调整虚拟机运行参数。



## JVM性能调优参数

1. 设定堆内存大小。

   -Xmx：堆内存最大限制

2. 设定新生代大小。 新生代不宜太小，否则会有大量对象涌入老年代。
   -XX:NewSize：新生代大小
   -XX:NewRatio 新生代和老生代占比
   -XX:SurvivorRatio：伊甸园空间和幸存者空间的占比

3. 设定垃圾回收器。

   年轻代用 -XX:+UseParNewGC

   年老代用-XX:+UseConcMarkSweepGC









## 推荐资料

https://www.bilibili.com/video/BV1oE411t7pZ