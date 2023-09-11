---
title: Linux安装MongoDB
tags:
 - Linux
categories: 
 - Linux
---


# Linux安装MongoDB







## 脚本安装

准备mongo安装包后执行脚本

```shell
! /bin/bash
set -e
mongo_dir=mongodb-linux-x86_64-rhel70-4.2.24.tgz
mongo_path=/home/disk2/tools/mongo

#安装Mongo
echo -e "安装mongo-------------"
if [ -e $mongo_name ];then
    if [ -d $mongo_path ];then
        echo "已存在mongo目录${mongo_path},选择执行后续操作： 1、跳过安装包解压 2、退出安装"
        read mongo_option
        if [ $mongo_option -eq 1 ];then
            echo "跳过mongo的解压安装"
        elif [ $mongo_option -eq 2 ];then
            exit            
        else
            echo "所选操作未能识别，退出安装。"
            exit
        fi
    else
        echo "解压安装包-----"
        tar -zxvf $mongo_name $1> /dev/null
        echo "开始安装-----"
        mkdir -p $mongo_path
        mv $mongo_dir/* $mongo_path
        mkdir -p $mongo_path/db
        mkdir -p $mongo_path/logs
        touch $mongo_path/logs/mongodb.log
        touch $mongo_path/bin/mongodb.conf
        echo "开始导入配置----"
cat > $mongo_path/bin/mongodb.conf << EOF
bind_ip=0.0.0.0
port=27017
logappend=true
logpath=$mongo_path/logs/mongodb.log
dbpath=$mongo_path/db
fork=true
#auth=true
EOF
    fi

if [ -e /usr/lib/systemd/system/mongodb.service ];then
    rm -f /usr/lib/systemd/system/mongodb.service
else
cat > /usr/lib/systemd/system/mongodb.service << EOF
[Unit]
Description=mongodb
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
ExecStart=$mongo_path/bin/mongod --config $mongo_path/bin/mongodb.conf
ExecReload=/bin/kill -s HUP \$MAINPID
ExecStop=$mongo_path/bin/mongod --shutdown --config $mongo_path/bin/mongodb.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

chmod 754 /usr/lib/systemd/system/mongodb.service

echo "mongo加入开机自启"
systemctl daemon-reload
systemctl enable mongodb
echo "启动mongodb-------"
systemctl start mongodb
fi

echo "添加mongo用户"
$mongo_path/bin/mongo 127.0.0.1:27017/admin mongo_init.js

authline=$(grep -n "auth" ${mongo_path}/bin/mongodb.conf |cut -f1 -d":")
sed -i "${authline}c auth=true" ${mongo_path}/bin/mongodb.conf

echo "重启mongo"
systemctl restart mongodb
echo "mongo安装完成------"
else
    echo "未检测到mongo安装包，请把安装到放到安装脚本目录下"
fi
```