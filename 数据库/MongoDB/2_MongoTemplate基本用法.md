---
title: MongoTemplate基本用法
tags:
  - MongoDB
categories:
  - MongoDB
---



SpringBoot集成MongoDB使用MongoTemplate

## 引入pxm.xml依赖

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

## 配置文件

properties文件

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

yml文件

~~~yaml
spring:
  data:
    mongodb:
      host: 127.0.0.1
      port: 27017
      database: mongodb_database
#      username: admin
#      password: 123456
#      min-connections-per-host: 10
#      max-connections-per-host: 100
#      threads-allowed-to-block-for-connection-multiplier: 5
#      server-selection-timeout: 30000
#      max-wait-time: 120000
#      max-connection-idel-time: 0
#      max-connection-life-time: 0
#      connect-timeout: 10000
#      socket-timeout: 0
#      socket-keep-alive: false
#      ssl-enabled: false
#      ssl-invalid-host-name-allowed: false
#      always-use-m-beans: false
#      heartbeat-socket-timeout: 20000
#      heartbeat-connect-timeout: 20000
#      min-heartbeat-frequency: 500
#      heartbeat-frequency: 10000
#      local-threshold: 15
~~~



## 实体准备

要有mongodb的Document对应的实体类，标注@Document(collection="")注解。

（collection=""，即为mongodb库中的文档名字，不添加这个注解后面的数据库名，无法对数据进行操作）

~~~java
@Document(collection = "sys_user")
public class SysUser {

    @Id
    private String id;

    private String userName;

    private String phoneNumber;

    private String address;

    private String idNumber;
    
    private Date birthday;
    
    private Integer money;
}
~~~

## 初始化测试数据

使用javafaker初始化测试数据

~~~xml
<!--javafaker数据生成-->
<dependency>
    <groupId>com.github.javafaker</groupId>
    <artifactId>javafaker</artifactId>
    <version>0.17.2</version>
</dependency>
~~~

实体增加构造方法

~~~java
public SysUser(String userName) {
    this.userName = userName;
}

public SysUser(String userName, String phoneNumber, String address, String idNumber, Date birthday, Integer money) {
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.idNumber = idNumber;
    this.birthday = birthday;
    this.money = money;
}
~~~

初始化方法

~~~java
/**
 * 初始化数据
 */
@Test
public void init() {
    // 清空数据表
    Query query = new Query();
    mongoTemplate.remove(query, SysUser.class);
    // 构造测试数据
    List<SysUser> sysUserList = Stream.generate(() -> new SysUser(
        FAKER.name().fullName(),
        FAKER.phoneNumber().cellPhone(),
        FAKER.address().city() + FAKER.address().streetAddress(),
        FAKER.idNumber().validSvSeSsn(),
        FAKER.date().birthday(),
        RandomUtil.randomInt(100, 1000000)))
        .limit(10000)
        .collect(Collectors.toList());
    mongoTemplate.insert(sysUserList, SysUser.class);
}
~~~



## MongoTemplate的基本方法

使用@Autowired注入MongoTemplate。

~~~java
@Autowired
private MongoTemplate mongoTemplate;
~~~

### 插入数据

~~~java
List<SysUser> list = new ArrayList<>();
SysUser user = new SysUser();
user.setUserName("admin");
user.setAddress("地址");
list.add(user);

// 保存对象到mongodb
mongoTemplate.save(user);
mongoTemplate.insert(user);

// 根据集合名称保存对象到mongodb
mongoTemplate.save(user, "sys_user");
mongoTemplate.insert(user, "sys_user");

// 根据集合名称保存list到mongodb
mongoTemplate.save(list, "sys_user");
mongoTemplate.insert(list, "sys_user");
mongoTemplate.insert(list, SysUser.class);
~~~

**insert**: 若新增数据的主键已经存在，则会抛 `org.springframework.dao.DuplicateKeyException` 异常提示主键重复，不保存当前数据。

**save**: 若新增数据的主键已经存在，则会对当前已经存在的数据进行修改操作。 



### 检索数据

~~~java
// 查询 userName=xxl，结果为集合列表
Query query = Query.query(Criteria.where("userName").is("xxl"));
mongoTemplate.find(query, SysUser.class);
mongoTemplate.find(query, SysUser.class, "sys_user");、

// 查询所有，结果为集合列表
mongoTemplate.findAll(SysUser.class);
mongoTemplate.findAll(SysUser.class, "sys_user");

// 分页查询（page页码，pageSize每页展示几个）
int page = 1;
int pageSize = 10;
Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Order.desc("date")));
Query query = new Query().with(pageable);
mongoTemplate.find(query, SysUser.class);
mongoTemplate.find(query, SysUser.class, "sys_user");

// 查询多个
Query query = Query.query(Criteria.where("id").in("id1", "id2", "id3")).with(Sort.by(Sort.Order.desc("date")));
mongoTemplate.find(query, SysUser.class);

// 查询数量
Criteria criteria = Criteria.where("userId").is("12345")
    .and("name").is(new ObjectId("张三"))
    .and("address").is("上海");
Query query = Query.query(criteria);
long count = mongoTemplate.count(query, SysUser.class);
~~~



### 更新数据

~~~java
Query query = Query.query(Criteria.where("_id").is("658712b96a3c742d4070f6ca"));
Update update = Update.update("userName", "xxl");

// 更新一条数据
mongoTemplate.updateFirst(query, update, SysUser.class);
mongoTemplate.updateFirst(query, update, "sys_user");
mongoTemplate.updateFirst(query, update, SysUser.class, "sys_user");

// 更新多条数据
mongoTemplate.updateMulti(query, update, SysUser.class);
mongoTemplate.updateMulti(query, update, "sys_user");
mongoTemplate.updateMulti(query, update, SysUser.class, "sys_user");

// 更新数据，如果数据不存在就新增
mongoTemplate.upsert(query, update, SysUser.class);
mongoTemplate.upsert(query, update, "sys_user");
mongoTemplate.upsert(query, update, SysUser.class, "sys_user");

// 更新条件不变，更新字段改成了一个我们集合中不存在的，用set方法如果更新的key不存在则创建一个新的key
update = Update.update("userName", "xxl").set("nickName", "xxl");
mongoTemplate.upsert(query, update, SysUser.class);

// update的inc方法用于做累加操作，将money在之前的基础上加上100
update = Update.update("userName", "xxl").inc("money", 100);
mongoTemplate.updateMulti(query, update, SysUser.class);

// update的rename方法用于修改key的名称
update = Update.update("userName", "xxl").rename("nickName", "nickNameNew");
mongoTemplate.updateMulti(query, update, SysUser.class);

// update的unset方法用于删除key
update = Update.update("userName", "xxl").unset("nickNameNew");
mongoTemplate.updateMulti(query, update, SysUser.class);

// update的pull方法用于删除tags数组中的java
List<String> tags = new ArrayList<>();
tags.add("java");
tags.add("python");
update = Update.update("userName", "xxl").set("tags", tags);
mongoTemplate.upsert(query, update, SysUser.class);
update = Update.update("userName", "xxl").pull("tags", "java");
mongoTemplate.updateMulti(query, update, SysUser.class);
~~~



### 删除数据

~~~java
// 根据条件删除（可删除多条）
Query query = Query.query(Criteria.where("id").in("65846bbd6a3c7445686c974a", "65846bbd6a3c7445686c974b"));
mongoTemplate.remove(query, SysUser.class); // 指定对象
mongoTemplate.remove(query, "sys_user"); // 直接指定MongoDB集合名称
mongoTemplate.remove(query, SysUser.class, "sys_user");
SysUser user = new SysUser();
user.setId("65846bbd6a3c7445686c974a");
mongoTemplate.remove(user);

// 删除集合，可传实体类，也可以传名称
mongoTemplate.dropCollection(SysUser.class);
mongoTemplate.dropCollection("sys_user");

// 删除数据库；在开发中，开发所使用的数据库是在配置文件中配置的；使用这个方法即可直接删除配置对应的数据库
mongoTemplate.getDb().drop();

// 查询出符合条件的第一个结果，并将符合条件的数据删除,只会删除第一条
query = Query.query(Criteria.where("userName").is("xxl"));
SysUser article = mongoTemplate.findAndRemove(query, SysUser.class);
// 查询出符合条件的所有结果，并将符合条件的所有数据删除
query = Query.query(Criteria.where("userName").is("xxl"));
List<SysUser> articles = mongoTemplate.findAllAndRemove(query, SysUser.class);
~~~

注意：

mongoTemplate.remove();传入不同类型参数，对于 实体类中有无 `_id`属性的要求不一样。

比如 mongoTemplate.remove(object, collection)方法，如果对应object实体类中没有`_id`属性就会

报错：org.springframework.data.mapping.model.MappingException: No id property found for object

 of type。但是 mongoTemplate.remove(query, entityClass, collectionName)就运行正常；

mongoTemplate.findAllAndRemove();对应的实体类的就需要有`_id`属性；

mongoTemplate.findAndRemove();对应的实体类的不是必须有`_id`属性。

原因在MongoTemplate代码中有的方法调用其中的extractIdPropertyAndValue(Object object)，有的

没有。因此，为了方便，建议在实体类添加_id属性。



### 集合查询

~~~

~~~



### 复杂查询

分页

分组





参考资料

https://blog.csdn.net/Ciel_Y/article/details/121626495

https://blog.csdn.net/Java_Rookie_Xiao/article/details/125602833