---
title: Linux常用命令
autoGroup-1: Linux
autoSort: 1
tags:
 - Linux
categories: 
 - Linux

---


### 命令操作之文件与目录

- **is**：查看文件和目录列表
- **ls -a**：查看文件和目录列表（包含隐藏文件）
- **ll**：显示出文件的权限、属主、大小等详细信息，是 `ls -l` 的简写，[具体介绍](https://www.xk857.com/linux/centos/文件列表的详细信息)
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


### **linux查看文件位置**

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

命令行输入export可以查看PATH变量

~~~
export
~~~



~~~
which java
~~~

说明：查看java可执行文件的地址

备注：

which 查看可执行文件的位置。

whereis 查看文件的位置。 

find  实际搜寻硬盘查询文件名称。



### 查看内存使用情况

- ps -ef|grep java (查看所有java运行的进程)
- df -h (查看磁盘使用情况)
- free -m|g （m和g表示单位，二选一）查看内存使用情况
- top (实时显示系统中各个进程的资源占用状况)
- top -d 1 -p pid (pid 进程id) 查看单个进程占用资源状况



### 查看端口被哪个进程被占用的六个方法

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





### 防火墙相关

https://www.python100.com/html/691DUEI971RX.html

#### firewall-cmd命令

~~~sh
firewall-cmd --list-all

# 查看开启的端口
firewall-cmd --zone=public --list-ports

# 添加/删除端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --remove-port=80/tcp --permanent

# 重新载入防火墙
firewall-cmd --reload

# FirewallD is not running 未开启
systemctl status firewalld
systemctl start firewalld

# unit is masked 防火墙默认是锁定的，需要取消服务的锁定
systemctl unmask firewalld

# 开启防火墙范围
vim /etc/firewalld/zones/public.xml
port="9001-9050"
~~~

### 查看Linux系统版本


1. 使用`cat`命令查看`/etc/issue`文件。这种方法适用于所有Linux发行版，但在双核CPU中，`cpuinfo`中会看到两个CPU，可能会让人误以为是两个单核的CPU，实际上应该通过`Physical Processor ID`来区分单核和双核。
2. 使用`uname`命令查看系统信息。例如，`uname -a`命令可以查看系统的内核名/版本、网络主机名、操作系统等信息。
3. 查看配置文件`/etc/issue`或`/etc/*release`文件。这些文件中会写有操作系统和版本号等信息。例如，对于Redhat/Centos系统，可以查看`/etc/redhat_release`文件；对于Debian系统，可以查看`/etc/os-release`文件。
4. 此外，还可以通过查看内存文件`/proc/version`来查看操作系统版本号、内核版本号、网络主机名等信息。