---
title: SpringBoot整合ORM开发框架
tags:
 - SpringBoot
categories: 
 - SpringBoot
---



## SpringBoot整合Mybatis开发框架

MyBatis是一款常用并且配置极为简单的ORM开发框架。其与Spring结合后，可以利用Spring的特征实现DAO接口的自动配置。在SpringBoot中，又对MyBatis框架的整合进行了进一步简化。想实现这种配置，需要在项目中引入mybatis-spring-boot- starter依赖支持库。

提示：需要数据库连接池支持。（开发中一般使用Druid作为数据库连接池）

~~~sql
DROP
DATABASE IF EXISTS xxl_springboot_action ;
CREATE
DATABASE xxl_springboot_action CHARACTER SET UTF8 ;
USE
xxl_springboot_action ;
CREATE TABLE dept
(
    deptno BIGINT AUTO_INCREMENT,
    dname  VARCHAR(50),
    CONSTRAINT pk_deptno PRIMARY KEY (deptno)
);
INSERT INTO dept(dname)
VALUES ('开发部');
INSERT INTO dept(dname)
VALUES ('财务部');
INSERT INTO dept(dname)
VALUES ('市场部');
INSERT INTO dept(dname)
VALUES ('后勤部');
INSERT INTO dept(dname)
VALUES ('公关部');
~~~

### 1、创建VO实体类

~~~java
@SuppressWarnings("serial")
public class Dept implements Serializable {
    private Long deptno;
    private String dname;

    // setter、getter略
    public Long getDeptno() {
        return deptno;
    }

    public void setDeptno(Long deptno) {
        this.deptno = deptno;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    @Override
    public String toString() {
        return "Dept [deptno=" + deptno + ", dname=" + dname + "]";
    }
}
~~~

### 2、添加mybatis配置文件

在src/main/resources目录中创建mybatis/mybatis.cfg.xml配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>        <!-- 进行Mybatis的相应的环境的属性定义 -->
    <settings>        <!-- 在本项目之中开启二级缓存 -->
        <setting name="cacheEnabled" value="true"/>
    </settings>
</configuration>
~~~

### 3、修改application.yml配置文件

修改application.yml配置文件，追加MyBatis配置

~~~yaml
mybatis:
  config-location: classpath:mybatis/mybatis.cfg.xml    # mybatis配置文件所在路径
  type-aliases-package: com.xxl.springboot.vo             # 定义所有操作类的别名所在包
~~~

### 4、创建数据层接口

建立IDeptDAO接口，该接口将由Spring自动实现。

~~~java
@Mapper
public interface IDeptDAO {

    /**
     * 查询全部部门信息
     *
     * @return
     */
    @Select("SELECT deptno,dname FROM dept")
    public List<Dept> findAll();

}
~~~

### 5、定义业务层接口

定义IDeptService业务层接口。

~~~javascript
public interface IDeptService {
    public List<Dept> list() ;
}
~~~

定义DeptServiceImpl业务层实现子类。

~~~java
@Service
public class DeptServiceImpl implements IDeptService {

    @Autowired
    private IDeptDAO deptDAO;

    @Override
    public List<Dept> list() {
        return this.deptDAO.findAll();
    }

}
~~~

### 6、测试

编写测试类，测试IDeptService业务方法。

~~~java
@SpringBootTest(classes = SpringBootIntegrationMybatisApplication.class)        // 定义要测试的SpringBoot类
@RunWith(SpringJUnit4ClassRunner.class)                            // 使用Junit进行测试
@WebAppConfiguration                                            // 进行Web应用配置
public class TestDeptService {

    @Autowired
    private IDeptService deptService;                            // 注入业务接口对象

    @Test
    public void testList() {
        List<Dept> allDepts = this.deptService.list();
        for (Dept dept : allDepts) {
            System.out.println("部门编号：" + dept.getDeptno() + "、部门名称：" + dept.getDname());
        }
    }
}
~~~

打印结果

~~~
部门编号：1、部门名称：开发部
部门编号：2、部门名称：财务部
部门编号：3、部门名称：市场部
部门编号：4、部门名称：后勤部
部门编号：5、部门名称：公关部
~~~



> 完整代码参考：[springboot-action/springboot-integration/springboot-integration-mybatis-parent at main · Daneliya/springboot-action (github.com)](https://github.com/Daneliya/springboot-action/tree/main/springboot-integration/springboot-integration-mybatis-parent)



## SpringBoot整合JPA开发框架