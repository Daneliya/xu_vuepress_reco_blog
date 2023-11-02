---
title: 热门镜像-Docker安装各类中间件
autoGroup-2: Docker热门镜像
autoSort: 9
tags:
 - Linux
 - Docker
categories: 
 - Linux
 - Docker
---





### Nginx

快速测试本地打包好的静态文件。

```bash
docker run --rm \
  -p 8080:80 \
  -v /dir/dist/:/usr/share/nginx/html \
  nginx
```

### MySQL

指定密码。

```bash
docker run --rm \
  -p 33006:3306 \
  -e MYSQL_ROOT_PASSWORD=mypasswd \
  mysql
```

### Mongo

```bash
docker run -d \
  -p 27017:27017 \
  --name some-mongo \
  mongo --auth
```

### Redis

指定密码。

```bash
docker run -d \
  -p 6379:6379 \
  --name some-redis \
  redis --requirepass "redispwd"
```