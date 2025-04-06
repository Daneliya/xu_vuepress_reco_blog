---
title: Linux常用命令
autoGroup-1: Linux
autoSort: 1
tags:
 - Linux
categories: 
 - Linux
---



### 命令大全

[https://www.runoob.com/linux/linux-command-manual.html](https://www.runoob.com/linux/linux-command-manual.html)



### 命令操作之文件与目录

- **is**：查看文件和目录列表
- **ls -a**：查看文件和目录列表（包含隐藏文件）
- **ll**：显示出文件的权限、属主、大小等详细信息，是 `ls -l` 的简写。
- **pwd**：看当前所在目录的绝对路径
- **cd**：切换目录，`cd ..`代表切换到上一级，`./user`代表切换到当前目录下的user目录
- **touch**：创建文件
- **mkdir**：创建目录
- **rm**：删除文件
- **rm -f**：强制删除文件
- **rm -rf**：递归删除，例如`rn -rf data/`递归删除data/目录下的所有文件
- **mv**：移动文件或目录，例如`mv test.txt /usr/local`将 text.txt 移动到 /usr/local 路径下
- **解压**：`tar -zxvf 文件地址+名称`
- **解压zip格式**：`unzip 文件地址+名称`
- **重命名**：`mv 旧文件地址加名称 新文件地址加名称`

### 命令操作之文件位置

实际工作中文件多了，可能就会忘掉它的位置，这个时候就可以使用一些出文件所在目录的地址，提升了文件查找的效率。

- which 查看可执行文件的位置。

- whereis 查看文件的位置。 

- find  实际搜寻硬盘查询文件名称。



1、whereis

whereis命令是定位可执行文件、源代码文件、帮助文件在文件系统中的位置。

这些文件的属性应属于原始代码，二进制文件，或是帮助文件。

whereis 程序还具有搜索源代码、指定备用搜索路径和搜索不寻常项的能力。

如果省略参数，则返回所有信息。

```
whereis bash
bash: /bin/bash /etc/bash.bashrc /usr/share/man/man1/bash.1.gz
```

说明： 以上输出信息从左至右分别为查询的程序名、bash路径、bash的man 手册页路径。

2、find

Linux下find命令在目录结构中搜索文件，并执行指定的操作。

Linux下find命令提供了相当多的查找条件，功能很强大。由于find具有强大的功能，所以它的选项也很多。

```
sudo find . -name ``"*.log"
```

说明：在当前目录查找 以.log结尾的文件。 "."代表当前目录 

```
sudo find / -name ``"*.log"
```

说明：在根目录查找 以.log结尾的文件。 "/"代表当前目录 

3、which

which命令的作用是，在PATH变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。

也就是说，使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。 

命令行输入`export`可以查看PATH变量

~~~
which java
~~~

说明：查看java可执行文件的地址



### 命令操作之进程和磁盘管理

- **查看进程**：`ps -ef|grep java` （查看所有java运行的进程）
- **结束进程**：`kill -9 pid`
- **查看磁盘使用情况**：`df -h`
- **查看目录占用磁盘空间大小**：`du -m | sort -nr`
- **查看内存使用情况**：`free -m|g`（m和g表示单位，二选一）
- **实时显示系统中各个进程的资源占用状况**：top
- **查看单个进程占用资源状况**：`top -d 1 -p pid`（pid 进程id）



### 命令操作之查看占用端口的进程

- lsof命令：lsof(list open files)命令可以列出当前系统中打开的所有文件，包括网络端口。可以使用lsof命令查看某个端口被哪个进程占用。具体的命令为：**sudo lsof -i :端口号**，其中端口号为需要查询的端口号。

  例如查询mysql的路径：

  ```sh
  # 查看所有端口
  netstat -nlp
  # 查看进程
  top
  # 根据端口查看进程
  lsof -i tcp:3306
  # 拿到pid后，由于linux在启动一个进程时，会在/proc下创建一个以PID命名的文件夹，该进程的信息存在该文件夹下。在该文件夹下有一个名为exe的文件，该文件指向了具体的命令文件，所以可以通过ls -l或者ll命令根据ps或top查到的PID查找命令的绝对路径
  cd /proc/15330
  ll
  # 打印的exe就是mysql的绝对路径 exe -> /usr/libexec/mysqld
  ```

- netstat命令：使用netstat命令：netstat命令可以显示网络连接、路由表和网络接口信息等。可以使用netstat命令查看某个端口被哪个进程占用。具体的命令为：**sudo netstat -tlnp | grep 端口号**，其中端口号为需要查询的端口号。

- ss命令：ss命令可以列出当前系统中打开的套接字(socket)信息，包括网络端口。可以使用ss命令查看某个端口被哪个进程占用。具体的命令为：**sudo ss -tlnp | grep 端口号**，其中端口号为需要查询的端口号。

- fuser命令：fuser命令可以查看某个文件或目录被哪个进程占用。对于网络端口，也可以使用fuser命令进行查询，具体的命令为：**sudo fuser 端口号/tcp**，其中端口号为需要查询的端口号。

- ps命令：ps命令可以列出当前系统中正在运行的进程信息。可以使用ps命令结合grep命令来查找某个进程，然后再查看该进程打开的网络端口。具体的命令为：**sudo ps -ef | grep 进程名**，其中进程名为需要查询的进程名。**ps -aux | grep 8090**，-aux 显示所有状态。

- proc文件系统：使用/proc文件系统：在Linux系统中，每个进程都有一个对应的目录，存储了该进程的相关信息。可以使用/proc文件系统来查看某个端口被哪个进程占用。具体的命令为：**sudo ls -l /proc/$(sudo lsof -t -i:端口号) | grep exe**，其中端口号为需要查询的端口号。



> 补充
>
> windows查看进程：https://blog.csdn.net/mrxutada/article/details/119203981



### 防火墙相关

firewalld与iptables命令：https://zhuanlan.zhihu.com/p/452927048

firewalld服务重载、重启、停止

~~~sh
# 重新加载防火墙配置
firewall-cmd --reload
# 查看状态
systemctl status firewalld.service
# unit is masked 防火墙默认是锁定的，需要取消服务的锁定
systemctl unmask firewalld
# 重启防火墙(redhat系列)
systemctl restart firewalld.service
# 临时关闭防火墙
systemctl stop firewalld.service
# 开机启用防火墙
systemctl enable firewalld.service
# 开机禁止防火墙
systemctl disable firewalld.service
# 查看firewalld的运行状态
firewall-cmd --state
~~~

firewalld开放端口（public）

~~~sh
# 公共区域设置开放21端口永久生效并写入配置文件（参数：--permanent）
# 参数：--permanent，设置即立刻生效并且写入配置文件
firewall-cmd --zone=public --add-port=21/tcp --permanent
# 开启防火墙范围
vim /etc/firewalld/zones/public.xml
port="9001-9050"
# 查询防火墙端口21是否开放
firewall-cmd --zone=public --query-port=21/tcp
# 移除开放的端口21
firewall-cmd --zone=public --remove-port=21/tcp --permanent
~~~

firewalld区域规则修改

~~~sh
# 查询防火墙规则列表
firewall-cmd --zone=public --list-all
# 查看开启的端口
firewall-cmd --zone=public --list-ports
# 新增一条区域规则httpd服务
firewall-cmd --permanent --zone=internal --add-service=http
# 验证规则
firewall-cmd  --zone=internal --list-all
~~~

ubuntu中查看防火墙的状态

~~~sh
# 在 Ubuntu 中查看防火墙的状态，可以使用 ufw 命令。ufw 是 Uncomplicated Firewall 的缩写，是 Ubuntu 默认的防火墙管理工具。
# 如果您想要查看防火墙的状态，可以使用以下命令：
sudo ufw status
# 该命令将显示防火墙的状态，如果防火墙已经开启，则会显示如下信息：
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
它会显示出所有被允许的端口，及其来源。如果您没有配置防火墙或者所有端口都已经被开放，则状态可能如下所示：
Status: inactive
# 如果防火墙被激活，并且您需要开放某些端口，请参考以下示例，使用 ufw 命令打开和关闭端口：
sudo ufw allow 80/tcp  # 开放TCP 80端口
sudo ufw deny 113     # 拒绝UDP 113端口
sudo ufw delete allow 53/tcp  # 删除TCP 53端口
# 如果您想要关闭防火墙，请使用以下命令：
sudo ufw disable
# 需要注意的是，对防火墙的任何更改都需要使用 sudo 权限进行设置。
~~~



### 查看Linux系统版本


1. 使用`cat`命令查看`/etc/issue`文件。这种方法适用于所有Linux发行版，但在双核CPU中，`cpuinfo`中会看到两个CPU，可能会让人误以为是两个单核的CPU，实际上应该通过`Physical Processor ID`来区分单核和双核。
2. 使用`uname`命令查看系统信息。例如，`uname -a`命令可以查看系统的内核名/版本、网络主机名、操作系统等信息。
3. 查看配置文件`/etc/issue`或`/etc/*release`文件。这些文件中会写有操作系统和版本号等信息。例如，对于Redhat/Centos系统，可以查看`/etc/redhat_release`文件；对于Debian系统，可以查看`/etc/os-release`文件。
4. 此外，还可以通过查看内存文件`/proc/version`来查看操作系统版本号、内核版本号、网络主机名等信息。



### 使用curl命令在Linux服务器调用接口

一般情况我们测试对方ip端口，都是用**telnet**命令来测试通不通

示例：telnet 127.0.0.1 8080

当服务器不支持 telnet 命令，又无法安装时，我们就可以使用 curl 命令

> curl -X POST -H "Content-Type: application/json" -d 'json请求体的内容' "需要调用的url"

curl命令是一个非常强大的命令行工具，它可以发送各种类型的HTTP请求，并且支持各种协议和认证方式。下面是curl命令的一些常用选项

- -X指定请求方法，如GET、POST、PUT等；
- -H指定请求头，如Content-Type、uthorization等；
- -d指定请求体，如JSON、XML等；
- -u指定认证信息，如用户名、密码等；
- -o指定输出文件名，用于保存响应结果。

GET请求

~~~sh
curl -X GET http://localhost:8080/api
~~~

POST请求

~~~sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://localhost:8080/api
~~~

发送文件方式

~~~sh
// myxmlfile.txt为磁盘上面的xml文件，后面为请求路径
curl -X POST -H 'content-type: application/xml'  -d @/home/disk/file/myxmlfile.txt http://192.168.1.1:8080/api/uploadfile
~~~



### 未知的名称或服务及java.net.UnknownHostException异常

java.net.UnknownHostException异常

https://blog.csdn.net/FMC_WBL/article/details/135737199

未知的名称或服务 DNS 配置问题

https://www.cnblogs.com/sunny3158/p/16778076.html

https://blog.csdn.net/m0_72838865/article/details/126784090

Failed to restart network.service: Unit network.service not found.

https://blog.csdn.net/qq_33468857/article/details/125135211





### 查看所有java应用的内存占用情况

~~~sh
top -b -n 1 | grep java| awk '{print "PID:"$1",mem:"$6",CPU percent:"$9"%","mem percent:"$10"%"}'
~~~

结果

~~~sh
root@qydy:~# top -b -n 1 | grep java| awk '{print "PID:"$1",mem:"$6",CPU percent:"$9"%","mem percent:"$10"%"}'

PID:21509,mem:868988,CPU percent:12.5% mem percent:1.3%
PID:327578,mem:1.9g,CPU percent:6.2% mem percent:3.1%
PID:1581117,mem:4.9g,CPU percent:6.2% mem percent:7.8%
PID:1856910,mem:873336,CPU percent:6.2% mem percent:1.3%
PID:1041,mem:720216,CPU percent:0.0% mem percent:1.1%
PID:9466,mem:1.3g,CPU percent:0.0% mem percent:2.1%
PID:39646,mem:1.6g,CPU percent:0.0% mem percent:2.5%
PID:42408,mem:1.2g,CPU percent:0.0% mem percent:1.9%
PID:108419,mem:1.5g,CPU percent:0.0% mem percent:2.4%
PID:326532,mem:1.2g,CPU percent:0.0% mem percent:2.0%
PID:339477,mem:1.6g,CPU percent:0.0% mem percent:2.6%
PID:342861,mem:1.2g,CPU percent:0.0% mem percent:1.9%
PID:343467,mem:1.5g,CPU percent:0.0% mem percent:2.4%
PID:687881,mem:1.8g,CPU percent:0.0% mem percent:2.8%
PID:719273,mem:1.4g,CPU percent:0.0% mem percent:2.3%
PID:761835,mem:1.8g,CPU percent:0.0% mem percent:2.8%
PID:800379,mem:2.3g,CPU percent:0.0% mem percent:3.7%
~~~



### yum配置

[CentOS7配置阿里yum源 超详细！！！-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/1366034)

[CentOS7配置阿里云镜像源（超详细过程）_centos7 一键配置 配置阿里源脚本-CSDN博客](https://blog.csdn.net/KingveyLee/article/details/114984534)