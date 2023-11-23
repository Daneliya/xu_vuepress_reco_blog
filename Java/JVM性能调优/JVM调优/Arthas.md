---
title: 应用诊断利器Arthas
tags:
 - JVM
categories: 
 - JVM
---



官方文档：https://arthas.gitee.io/



### 使用

下载启动脚本文件 `as.sh` 到当前目录

```bash
curl -L https://arthas.aliyun.com/install.sh | sh
```

直接在 shell 下面执行`./as.sh`，就会进入交互界面



### 实战

https://www.cnblogs.com/itxiaoshen/p/15854197.html

https://www.cnblogs.com/yaoyu1983/p/17373522.html

https://blog.csdn.net/weixin_40816738/article/details/123308455

https://wenku.baidu.com/view/9b750a2fff4ffe4733687e21af45b307e871f91e.html?fr=sogou&_wkts_=1694659165451

https://zhuanlan.zhihu.com/p/322094284

### 问题

1、The telnet port 3658 is used by process 28221 instead of target process 96492, you will connect to an unexpected process

~~~bash
[ERROR] The telnet port 3658 is used by process 28221 instead of target process 96492, you will connect to an unexpected process.
[ERROR] 1. Try to restart arthas-boot, select process 28221, shutdown it first with running the ‘stop’ command.
[ERROR] 2. Or try to stop the existing arthas instance: java -jar arthas-client.jar 127.0.0.1 3658 -c “stop”
[ERROR] 3. Or try to use different telnet port, for example: java -jar arthas-boot.jar --telnet-port 9998 --http-port -1
~~~

上次连接的进程，未正常退出。重新选择上次的连接，执行stop。

如果连接超时，查询端口进程，强制杀掉。

~~~shell
netstat -tln
netstat -tln | grep 端口
# 查看端口被哪个进程占用
lsof -i :端口
# 杀掉进程
kill -9 进程id
~~~



2、arthas报“Can not find java process”

解决方式一：未使用root权限，sudo执行命令

解决方式二：找不到jps命令，默认安装的openjdk是不支持jps的，所以需要卸载Open JDK，
安装Oracle JDK：https://www.cnblogs.com/andy020/p/17511279.html
or
安装关联包：https://blog.51cto.com/u_13890915/4653202

参考：

https://www.cnblogs.com/lyn8100/p/17377845.html

https://zhuanlan.zhihu.com/p/519213445

https://www.bilibili.com/video/BV19k4y1k7o9/

https://zhuanlan.zhihu.com/p/584170583

https://www.cnblogs.com/jaigejiayou/p/15735690.html