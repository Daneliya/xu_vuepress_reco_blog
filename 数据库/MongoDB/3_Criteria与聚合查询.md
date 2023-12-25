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



## 参考资料

https://blog.csdn.net/Java_Rookie_Xiao/article/details/125602833