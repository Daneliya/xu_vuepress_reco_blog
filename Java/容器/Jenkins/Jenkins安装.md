---
title: Jenkins安装
tags:
 - Jenkins
categories: 
 - Jenkins
---





> 维基介绍：https://wiki.jenkins-ci.org/
>
> 官网安装文档：https://www.jenkins.io/doc/book/installing/

## 说明

在安装Jenkins之前，服务器上需要安装有jdk和jre。

安装完成后用浏览器访问 `http://服务器IP:8080` 。

8080为Jenkins默认端口，初次访问可以配置管理员账号密码及端口信息，也可以通过配置修改。

安装完成后将进程拉起可以使用：`service jenkins start/stop/restart`。

## Ubuntu下安装Jenkins步骤

~~~bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
# 更新
sudo apt-get update
sudo apt-get install jenkins
~~~

## 配置修改









## 错误

1、无法获得锁 /var/lib/dpkg/lock-frontend。

~~~markdown
问题描述
    执行 sudo apt-get install jenkins 报错
    E: 无法获得锁 /var/lib/dpkg/lock-frontend。锁正由进程 48252（unattended-upgr）持有
    N: 请注意，直接移除锁文件不一定是合适的解决方案，且可能损坏您的系统。
    E: 无法获取 dpkg 前端锁 (/var/lib/dpkg/lock-frontend)，是否有其他进程正占用它？

原因分析
    在前一步sudo apt-get update时出现错误导致没有正确关闭连接，或没有执行完毕就手动关闭了terminal终端。

解决方法：
    在终端输入下面代码强制解锁：
    sudo rm /var/lib/dpkg/lock-frontend
    sudo rm /var/lib/dpkg/lock
~~~

2、Starting jenkins (via systemctl):  Job for jenkins.service failed.

~~~markdown
问题描述
    使用 service jenkins start/stop/restart出现如下提示：
    Starting jenkins (via systemctl):  Job for jenkins.service failed. 
    See 'systemctl status jenkins.service' and 'journalctl -xn' for details.[FAILED]

    官网提示是因为没有安装java所导致。
    官网地址：
    https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions
    Note: if you get the following error message, ensure that Java has been installed:
    Starting jenkins (via systemctl):  Job for jenkins.service failed. 
    See 'systemctl status jenkins.service' and 'journalctl -xn' for details.
~~~

