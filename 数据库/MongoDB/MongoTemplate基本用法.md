---
title: MongoTemplate基本用法
tags:
  - MongoDB
categories:
  - MongoDB
---



SpringBoot集成MongoDB使用MongoTemplate

### 引入pxm.xml依赖

~~~xml
<!--SpringBoot整合MongoDB-->
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
<!--MongoDB相关依赖-->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>3.9.1</version>
</dependency>
~~~

### 配置文件

~~~properties
# MongoDB数据库
spring.data.mongodb.uri=mongodb://127.0.0.1:27017/testMongoDB

# 设置了密码的MongoDB配置方式
# MongoDB服务器连接地址
#spring.data.mongodb.host=127.0.0.1
# MongoDB服务器连接端口
#spring.data.mongodb.port=27017
# MongoDB的验证数据库
#spring.data.mongodb.authentication-database=admin
# MongoDB数据库用户
#spring.data.mongodb.username=root
# MongoDB数据库密码
#spring.data.mongodb.password=123456
# 带连接的数据库
#spring.data.mongodb.database=testMongoDB
~~~



### MongoTemplate的基本方法

使用@Autowired注入MongoTemplate。

~~~java
@Autowired
private MongoTemplate mongoTemplate;
~~~

#### 检索数据

~~~java
//  查询name=zs
Query query = Query.query(Criteria.where("name").is("zs"));
mongoTemplate.find(query,User.class);
mongoTemplate.find(query,User.class,"mongodb_user");

//  查询所有
mongoTemplate.findAll(User.class);
mongoTemplate.findAll(User.class,"mongodb_user");

//  分页查询	page页码，pageSize每页展示几个
Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Order.desc("date")));
Query query = new Query().with(pageable);
return this.mongoTemplate.find(query, User.class,"mongodb_user");

//  查询多个
Query query= Query.query(Criteria.where("id").in("id1","id2","id3")).with(Sort.by(Sort.Order.desc("date")));
List<Publish> list= this.mongoTemplate.find(query, User.class);

//  查询数量
Criteria criteria = Criteria.where("userId").is("12345")
                .and("name").is(new ObjectId("张三"))
                .and("address").is("上海");
Query query = Query.query(criteria);
long count = this.mongoTemplate.count(query, User.class);
~~~

#### 插入数据

~~~java
List<User> list = new ArrayList<>();
User user= new User();//
user.setName("admin");
user.setAddress("测试");
list.add(user);

//  保存对象到mongodb
mongoTemplate.save(user);
mongoTemplate.insert(user);
//  根据集合名称保存对象到mongodb
mongoTemplate.save(user,"mongodb_user");
mongoTemplate.insert(user,"mongodb_user");
//  根据集合名称保存list到mongodb
mongoTemplate.save(list,"mongodb_user");
mongoTemplate.insert(list,"mongodb_user");
mongoTemplate.insert(list,User.class);
~~~

#### 更新数据

~~~java
User user = new User();
user.setId("5d1312aeb1829c279c6c256b");
user.setName("admin");
user.setAddress("测试");

Query query = Query.query(Criteria.where("_id").is("5d1312aeb1829c279c6c256b"));
Update update = Update.update("name","zs");
//  更新一条数据
mongoTemplate.updateFirst(query,update, User.class);
mongoTemplate.updateFirst(query,update, "mongodb_user");
mongoTemplate.updateFirst(query,update, User.class,"mongodb_user");
//  更新多条数据
mongoTemplate.updateMulti(query,update, User.class);
mongoTemplate.updateMulti(query,update,"mongodb_user");
mongoTemplate.updateMulti(query,update, User.class,"mongodb_user");
//  更新数据，如果数据不存在就新增
mongoTemplate.upsert(query,update, User.class);
mongoTemplate.upsert(query,update,"mongodb_user");
mongoTemplate.upsert(query,update, User.class,"mongodb_user");
~~~



#### 删除数据

~~~java
List<MongoDbJavaTest> list = new ArrayList<>();
User user= new User();
user.setId("5d1312aeb1829c279c6c256b");
list.add(user);

Query query = Query.query(Criteria.where("_id").in("5d1312aeb1829c279c6c256b","5d13133ab1829c29d02ce29c"));
//  根据条件删除
mongoTemplate.remove(query);
mongoTemplate.remove(user);
mongoTemplate.remove(User.class);
//  根据条件删除（可删除多条）
mongoTemplate.remove(query,User.class,"mongodb_user");
~~~





参考资料

https://blog.csdn.net/Ciel_Y/article/details/121626495

https://blog.csdn.net/Java_Rookie_Xiao/article/details/125602833