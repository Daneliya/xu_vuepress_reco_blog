---
title: IDEA+Linux远程开发
subSidebar: 'auto'
tags:
 - 日常笔记
categories: 
 - 日常笔记
---


远程环境：Ubuntu（Docker+JDK+maven）
本地：IDEA

## 安装虚拟机
### VMware下载安装
VMware下载：[https://www.vmware.com/cn/products/workstation-player.html](https://www.vmware.com/cn/products/workstation-player.html)
下载，更改安装位置进行安装。
启动，选择免费试用，免费版足够满足大部分开发需求。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691860320563-f1e0918e-6909-47a4-964e-629c0e1f1ebc.png#averageHue=%23e5e3e8&clientId=u97a05a92-2a04-4&from=paste&height=280&id=u951dadeb&originHeight=350&originWidth=362&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=65676&status=done&style=none&taskId=u1bcaffa7-831b-47b0-abc2-630275c01b5&title=&width=289.6)

### 镜像下载
centos（已停止维护）：[https://www.centos.org/download/](https://www.centos.org/download/)
或
ubuntu：[https://releases.ubuntu.com/](https://releases.ubuntu.com/)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691860773477-fd88dd8a-3ff7-4063-a68e-050199f4d262.png#averageHue=%23ee7e42&clientId=u97a05a92-2a04-4&from=paste&height=622&id=ue5cd1ccd&originHeight=778&originWidth=1514&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=492031&status=done&style=none&taskId=u5b203e7b-c4ec-4826-8def-ae798725b56&title=&width=1211.2)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691860801584-14a68549-fa7f-4fc1-a5d9-320d6699afe2.png#averageHue=%23fcfbfb&clientId=u97a05a92-2a04-4&from=paste&height=630&id=ub990ebe9&originHeight=788&originWidth=1433&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=92564&status=done&style=none&taskId=u79df756e-82a7-4927-9cbc-e207152f8f3&title=&width=1146.4)

### 安装镜像
打开VMware，新建虚拟机，选择镜像文件。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691860852968-b2b246c2-4fe4-428d-9b04-506831d86845.png#averageHue=%23dddee5&clientId=u97a05a92-2a04-4&from=paste&height=384&id=u9e7e3791&originHeight=480&originWidth=519&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=103387&status=done&style=none&taskId=u931b8975-c9c7-4666-a0ac-3e9ba1bcaa6&title=&width=415.2)
指定虚拟机目录，建议直接在vmware安装目录下新建个目录安装。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691861067998-215d0f5b-70c8-420d-a089-8b5f6e4ebe35.png#averageHue=%23dbdee6&clientId=u97a05a92-2a04-4&from=paste&height=374&id=u0f0ca4de&originHeight=468&originWidth=512&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=53208&status=done&style=none&taskId=ua26e68f8-f333-42a0-b952-98ca61de548&title=&width=409.6)
设置给虚拟机分配的硬盘空间大小。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691860952209-735fa30e-8ffb-4e1c-86fb-abbd3ebf6074.png#averageHue=%23dadde4&clientId=u97a05a92-2a04-4&from=paste&height=371&id=u73ecb9e0&originHeight=464&originWidth=500&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=105025&status=done&style=none&taskId=u4bfe7f87-9f30-4491-b036-519bae55d63&title=&width=400)
根据实际自定义硬件，点击完成。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691861137095-3f9f41d4-aa83-4550-b0b9-813bf251e210.png#averageHue=%23cedae3&clientId=u97a05a92-2a04-4&from=paste&height=381&id=u6a729394&originHeight=476&originWidth=507&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=99343&status=done&style=none&taskId=u57ab4d5e-c6a0-4cc3-84eb-61d852d28af&title=&width=405.6)
等待安装完成。☕

更改分辨率：按下win键，输入 **resolution** ，设置为 200%。
更改系统语言：按下win键，输入 **language**，安装语言支持，安装字体，在字体列表拖到第一位，**apply system wide **全局应用，重启生效。
中文输入法：按下win键，输入 **language**，区域和语言，添加输入源，选择汉语，删掉英语，安装后shift切换中英文。
更改时区：按下win键，输入 **time**，选择上海。

软件安装
1、ubuntu应用商店。
2、终端命令行（快捷键 Ctrl+Alt+T，ubuntu默认安装有apt软件包管理器）。

docker安装
```shell
// docker安装 可以加-y不再询问
sudo apt install docker.io
// ctrl+R 清屏
// 查看docker版本
docker -v
// 执行远程镜像
sudo docker run hello-world
```

## 远程开发准备
远程开发，在本地Win上操作Linux服务器开发
方式一：远程部署
方式二：纯远程开发
### 保证网络连通
```shell
// 查看ip，第一次使用根据提示进行安装
ifconfig
// 安装网络查看工具
sudo apt install net-tools
```
查看ip
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691917114934-fdd177b7-9efe-4324-ad51-953d1d761c98.png#averageHue=%23310a27&clientId=uc3e27208-ab0b-4&from=paste&height=651&id=uadf6ef76&originHeight=814&originWidth=1166&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=273539&status=done&style=none&taskId=u222efd1a-0612-4004-9b63-ddb7a69d6c3&title=&width=932.8)
win上测试是否连通
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691917157425-c0e24005-efd7-45d3-ba8f-7e9ecf16faf8.png#averageHue=%232a2927&clientId=uc3e27208-ab0b-4&from=paste&height=346&id=uacb9c6f9&originHeight=432&originWidth=680&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=55029&status=done&style=none&taskId=u91960775-bc79-4ebd-8e13-b86e43e67e2&title=&width=544)
### 安装ssh支持
```shell
// 安装ssh支持
sudo apt-get install openssh-server
// 查看ssh服务是否开启
ps -ef | grep ssh
```
### 安装java环境
```shell
// 更新软件包信息
sudo apt update
// 安装jdk
sudo apt install openjdk-11-jdk
// 查看java版本是否安装成功
java -version

// 安装依赖管理工具maven
sudo apt install maven
// 查看maven版本是否安装成功
mvn -v

```

## 远程部署
在本地电脑写代码开发，通过文件同步等方式把代码同步到远程Linux服务器。
启动项目时，用本地电脑连接远程Linux服务器，通过远程执行命令的方式来编译代码，运行代码。
远程开发6个阶段：编写代码、文件同步、代码运行、编译构建、部署调试。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691917992929-a8e08bf3-930f-468a-9e54-0c1d022fa552.png#averageHue=%23fefefe&clientId=uc3e27208-ab0b-4&from=paste&height=267&id=u85bf35c5&originHeight=493&originWidth=523&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=38702&status=done&style=none&taskId=ud0bb73d4-7d08-4f31-b6c8-66a5e1899cd&title=&width=283.3999938964844)

### IDEA配置
建立一个简单地springboot测试项目
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691918664130-8cd74a27-dc4f-4d5e-9ae3-df7b0419bcea.png#averageHue=%232d2f33&clientId=uc3e27208-ab0b-4&from=paste&height=862&id=ub6f5707a&originHeight=1078&originWidth=1672&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=136816&status=done&style=none&taskId=ua3f4dce9-2ba5-4288-b67f-bd389e768b9&title=&width=1337.6)
配置文件同步
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691918777674-130682b6-4cea-47a3-835a-742f6cd7bfca.png#averageHue=%2332373b&clientId=uc3e27208-ab0b-4&from=paste&height=504&id=ua43c525b&originHeight=743&originWidth=847&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=76986&status=done&style=none&taskId=ud548a81a-e758-45f5-8a27-b47f1c072e1&title=&width=575)
添加sftp配置，配置ssh地址
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691918933483-d19c7a72-4068-4167-8432-fccc9740af7f.png#averageHue=%23333435&clientId=uc3e27208-ab0b-4&from=paste&height=484&id=u63e53ac6&originHeight=833&originWidth=991&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=39963&status=done&style=none&taskId=u38e6ca79-65c9-44c4-bdee-c5d7dbf39b1&title=&width=576)
配置文件映射
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919408831-b12e2174-8db5-4e8f-bc08-92d59a0c36b5.png#averageHue=%23323435&clientId=uc3e27208-ab0b-4&from=paste&height=492&id=u848b99d7&originHeight=834&originWidth=988&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=34471&status=done&style=none&taskId=u59347f9c-99b9-4362-be10-e373489bfe3&title=&width=583)
项目上右键部署
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919555165-bde74335-b613-4be1-820f-a6fae6d2ff27.png#averageHue=%23314256&clientId=uc3e27208-ab0b-4&from=paste&height=98&id=u9f667157&originHeight=139&originWidth=827&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=15799&status=done&style=none&taskId=u653c341a-7944-475e-9681-4490ea6bd5a&title=&width=586)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919511901-1a5bcdbb-ed87-4fe5-a1cc-e5a0f5f4aefb.png#averageHue=%233e4346&clientId=uc3e27208-ab0b-4&from=paste&height=345&id=u55fd19f0&originHeight=836&originWidth=1428&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=92790&status=done&style=none&taskId=ue1e67522-7d73-45dd-bfed-a87128bd79b&title=&width=589)
在Linux上进入映射目录查看是否同步成功。
如果嫌每次手动同步麻烦，可以开启自动同步
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919660052-0cca427d-0437-4394-88f0-01ef59c24039.png#averageHue=%2333373b&clientId=uc3e27208-ab0b-4&from=paste&height=500&id=u275cd4f0&originHeight=730&originWidth=855&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=75899&status=done&style=none&taskId=ub9086ed6-799d-4c64-9804-5a6dc2ab7b9&title=&width=586)
选项options中可以配置不弹框提示删除
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919748197-442d9003-4762-4608-9ef6-9adde69a50b5.png#averageHue=%23333637&clientId=uc3e27208-ab0b-4&from=paste&height=518&id=u0319ff7b&originHeight=798&originWidth=664&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=67297&status=done&style=none&taskId=u244c0435-0c47-440e-9910-aefdb395f38&title=&width=431.20001220703125)
### 远程运行
进入IDEA终端，连接远程服务器
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691919989011-46637ff7-fb7a-48e3-984c-e1af6cd73de8.png#averageHue=%232c2b2b&clientId=uc3e27208-ab0b-4&from=paste&height=310&id=u163122c4&originHeight=388&originWidth=1469&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=21331&status=done&style=none&taskId=u0670f6ef-d95f-44c4-94d6-7db9b3c5c4a&title=&width=1175.2)

```shell
// 进入代码目录
cd code
// 使用maven运行
mvn spring-boot:run
```
等待依赖下载启动☕，访问接口地址测试 [http://192.168.64.128:8080/helloUbuntu](http://192.168.64.128:8080/helloUbuntu)
### 远程部署

```shell
// 打包
mvn package
// 运行
java -jar /home/xxl/code/target/xxl-ubuntu-springboot-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

```

### 远程调试
IDEA增加远程JVM调试配置
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691930295922-e6d57130-c7a8-48ff-9756-70b531bf3d32.png#averageHue=%23333537&clientId=uc3e27208-ab0b-4&from=paste&height=678&id=uc94f5ede&originHeight=847&originWidth=1294&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=71569&status=done&style=none&taskId=u99574c0b-ddf8-434e-866f-1da4e96cd5c&title=&width=1035.2)
项目启动时增加命令行参数
```shell

java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar /home/xxl/code/target/xxl-ubuntu-springboot-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```
IDEA启动debug，断点即可调试。

## 纯远程开发
本地只提供开发界面，代码等都在服务器上。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691931142977-045347c4-23d5-426f-b9a2-faa95bb178ea.png#averageHue=%23fdfcfc&clientId=uc3e27208-ab0b-4&from=paste&height=359&id=uefce0af8&originHeight=449&originWidth=346&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=35489&status=done&style=none&taskId=ud731a9e2-69ca-4250-ae6b-f772784f17f&title=&width=276.8)
IDEA进入入口页面，新建ssh连接
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691930711779-7c5c5351-0bd8-4e94-b771-61be8f8ade00.png#averageHue=%23323436&clientId=uc3e27208-ab0b-4&from=paste&height=638&id=u48740acc&originHeight=798&originWidth=969&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=32420&status=done&style=none&taskId=u59b56a6c-28d9-4873-b8fb-d48a78a5b6e&title=&width=775.2)
此方式对服务器内存有一定要求。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691930777429-f01b47e2-817e-4882-bc36-5603456e62b4.png#averageHue=%23333435&clientId=uc3e27208-ab0b-4&from=paste&height=632&id=uffc1daa6&originHeight=790&originWidth=968&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=36774&status=done&style=none&taskId=uc45bf12e-e0eb-4117-a6c8-8d97059f066&title=&width=774.4)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691931088343-750abfa5-431c-4a7e-9ca9-a87659982b61.png#averageHue=%23333536&clientId=uc3e27208-ab0b-4&from=paste&height=633&id=ud7650ac4&originHeight=791&originWidth=975&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=35897&status=done&style=none&taskId=u954a82bb-eda1-4e7f-9aa4-4e97f9040b3&title=&width=780)
打开项目后启动。
启动时可能会报执行错误，需要在setting-compiler-vm option中增加参数
-Djdk.lang.Process.launchMechanism=vfork
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691933758307-871e5b7c-ca95-4c02-a0ad-b590b56f077d.png#averageHue=%232f3137&clientId=uc3e27208-ab0b-4&from=paste&height=520&id=ub32d321e&originHeight=650&originWidth=1723&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=399064&status=done&style=none&taskId=ufe184001-48e9-4a77-a292-80c1cd6d6f5&title=&width=1378.4)
设置转发端口，即可直接访问本地地址。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/20357988/1691933943938-dae28e4a-d17d-4db3-b6c3-aa6fb196f5e4.png#averageHue=%2324292e&clientId=uc3e27208-ab0b-4&from=paste&height=468&id=udb06c766&originHeight=585&originWidth=1028&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=543056&status=done&style=none&taskId=u9182e8ae-51a1-4408-b614-430f030391a&title=&width=822.4)

