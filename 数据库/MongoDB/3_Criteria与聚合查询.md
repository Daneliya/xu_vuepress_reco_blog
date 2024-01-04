---
title: Criteria与聚合查询
date: '2023-12-23'
tags:
  - MongoDB
categories:
  - MongoDB
---



## 使用Criteria构造查询条件

请求实体

~~~java
@Data
public class SysUserRequest {

    private String userName;

    private String phoneNumber;

    private String beginTime;

    private String endTime;

    private Double lowestMoney;

    private Double highestMoney;

    private String TagScope;

    private String[] tags;

    private Integer pageNum = 1;

    private Integer pageSize = 10;

}
~~~

构造查询条件

~~~java
SysUserRequest sysUserRequest = new SysUserRequest();
sysUserRequest.setUserName("xxl");
sysUserRequest.setPhoneNumber("15500000000");
// 创建条件对象
Criteria criteria = new Criteria();
// 1. 全等于 (手机号全字匹配)
if (StringUtils.isNotBlank(sysUserRequest.getPhoneNumber())) {
    criteria.and("phone_number").is(sysUserRequest.getPhoneNumber());
}
// 2. 模糊查询 (名称模糊搜索)
if (StringUtils.isNotBlank(sysUserRequest.getUserName())) {
    criteria.and("name").regex(Pattern.compile("^.*" + sysUserRequest.getUserName() + ".*$", Pattern.CASE_INSENSITIVE));
}
// 3. 单个条件查询多个字段
if (StringUtils.isNotEmpty(sysUserRequest.getUserName())) {
    criteria.orOperator(
        Criteria.where("user_name").is(sysUserRequest.getUserName()),
        Criteria.where("nick_name").in(sysUserRequest.getUserName())
    );
}
// 4. 日期范围
if (StringUtils.isNotEmpty(sysUserRequest.getBeginTime()) && StringUtils.isNotEmpty(sysUserRequest.getEndTime())) {
    criteria.andOperator(Criteria.where("birthday").gte(sysUserRequest.getBeginTime()), Criteria.where("birthday").lte(sysUserRequest.getEndTime()));
}
// 5. 数值范围 (存款总金额)
if (sysUserRequest.getLowestMoney() != null && sysUserRequest.getHighestMoney() != null) {
    criteria.and("money").gte(sysUserRequest.getLowestMoney()).lte(sysUserRequest.getHighestMoney());
}
if (sysUserRequest.getTags() != null && !CollectionUtils.isEmpty(Arrays.asList(sysUserRequest.getTags()))) {
    if ("any".equals(sysUserRequest.getTagScope())) {
        // 6. 数组字段满足任一
        criteria.and("tags").in(sysUserRequest.getTags());
    } else if ("all".equals(sysUserRequest.getTagScope())) {
        //  7. 数组字段满足全部 (客户标签)
        criteria.and("tags").all(sysUserRequest.getTags());
    }
}

Query query = new Query();
query.addCriteria(criteria);
// 8. 查询返回指定字段 (自定义列表)
query.fields().include("user_name");
// 10. 分页
query.with(PageRequest.of(sysUserRequest.getPageNum() - 1, sysUserRequest.getPageSize(),
                          // 11. 排序
                          Sort.by(Sort.Order.desc("earliest_add_time"))));
// 分页（方式二，使用skip+limit）
query.with(Sort.by(Sort.Order.desc("birthday")))
    .skip((long) (sysUserRequest.getPageNum() - 1) * sysUserRequest.getPageSize())
    .limit(sysUserRequest.getPageSize());
// 执行查询
List<SysUser> list = mongoTemplate.find(query, SysUser.class);
// 12. 总记录数
long total = mongoTemplate.count(query, SysUser.class);
~~~

补充Criteria方法说明

| Criteria      | Mongodb | 说明                                                   |
| ------------- | ------- | ------------------------------------------------------ |
| and()         | $and    | 并且                                                   |
| andOperator() | $and    | 并且                                                   |
| orOperator()  | $or     | 或者                                                   |
| is()          | $is     | 等于                                                   |
| in()          | $in     | 是否被包含在数组或者list内                             |
| nin()         | $nin    | 不包含                                                 |
| gt()          | $gt     | 大于                                                   |
| gte()         | $gte    | 大于等于                                               |
| lt()          | $lt     | 小于                                                   |
| lte()         | $lte    | 小于等于                                               |
| regex()       | $regex  | 正则表达式用于模式匹配，基本上是用于文档中的发现字符串 |
| set()         | $set    | 给字段赋值，字段不存在，增加字段并赋值                 |

## Aggregation函数

> Aggregation官方SQL语法：[Aggregation Pipeline Stages — MongoDB Manual](https://www.mongodb.com/docs/v4.4/reference/operator/aggregation-pipeline/)

### 常用函数

1. Aggregation.group() : 聚合函数，将某个字段或者某个数组作为分组统计的依据,在group的基础上又扩展出以下函数：
   - sum() : 求和
   - max() : 获取最大值
   - min() : 获取最小值
   - avg() : 获取平均值
   - count() : 统计条目数
   - first () : 获取group by 后的某个字段的首个值
   - last() : 获取 group by 后的某个字段的最后一个值
   - push() : 在结果文档中插入值到一个数组中
   - addToSet() : 在结果文档中插入值到一个数组中，但不创建副本(作为集合)。
2. Aggregation.match() : 过滤函数，主要存储过滤数据的条件，输出符合条件的记录，相当于where条件。
   - is()：==相等
3. Aggregation.project(): 修改数据结构函数,将前面管道中的获取的字段进行重名,增加，修改字段等操作。
4. Aggregation.unwind()：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。当preserveNullAndEmptyArrays为true时，将包括字段为null，空，或者缺失的数据;
5. Aggregation.sort(): 排序函数，将上级管道的内容按照某个字段进行排序并且输出。值为1升、-1降。sort一般放在group后,也就是说得到结果后再排序，如果先排序再分组没什么意义;
6. Aggregation.limit(): 限制输出函数，将聚合返回的内容限定在某个条目之内。通常作为页面大小
7. Aggregation.skip(): 跳过指定数量的条目再开始返回数据的函数，**通常和sort()，limit()配合，实现数据翻页查询等操作**。
8. Aggregation.lookup(): 连表查询，将被关联集合添加到执行操作的集合中。

### 示例代码

~~~java
int page = 1;
int size = 10;
Date startTime = DateUtil.parse("1900-01-01 00:00:00");
Date endTime = new Date();
String userName = "xxl";

Aggregation aggregation = Aggregation.newAggregation(
    Aggregation.match(Criteria.where("birthday").gte(startTime).lte(endTime)),
    Aggregation.match(Criteria.where("userName").is(userName)),
    Aggregation.group("idNumber").count().as("sum")
    .first("userName").as("userName")
    .first("phoneNumber").as("phoneNumber")
    .first("birthday").as("birthday"),
    Aggregation.sort(Sort.by("sum").descending()),
    Aggregation.skip(page > 1 ? (page - 1) * size : 0),
    Aggregation.limit(size)
);

List<SysUser> results = mongoTemplate.aggregate(aggregation, "sys_user", SysUser.class).getMappedResults();
System.out.println(results);
~~~

### 示例SQL

~~~sql
db.getCollection("sys_user").aggregate([
    {
        $match: {
            birthday: {
                $gte: ISODate('1900-01-01 00:00:00.014'),
                $lte: ISODate('2023-10-23 15:30:00.014')
            },
            userName: 'xxl'
        }
    },
    {
        $group: {
            _id: "$idNumber",
            sum: { $sum: 1 },
            userName: { $first: "$userName" },
            phoneNumber: { $first: "$phoneNumber" },
            birthday: { $first: "$birthday" }
        }
    },
    {
        $sort: { sum: -1 }
    },
		{
        $skip: 0
    },
    {
        $limit: 10
    }
])
~~~





## 参考资料

https://blog.csdn.net/Java_Rookie_Xiao/article/details/125602833

[org.springframework.data.mongodb.core.aggregation.Aggregation Java Exaples (programcreek.com)](https://www.programcreek.com/java-api-examples/index.php?api=org.springframework.data.mongodb.core.aggregation.Aggregation)

[mongodb聚合在Java中的使用（包含mongo多表关联查询） - B1nbin - 博客园 (cnblogs.com)](https://www.cnblogs.com/wangzhebin/p/16494929.html)