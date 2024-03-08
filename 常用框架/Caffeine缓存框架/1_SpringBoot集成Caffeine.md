

# springboot炖cache-caffeine

### 1. 先睹为快



### 2. 实现原理

#### 2.1 新建项目



#### 2.2 创建maven目录结构，以及pom.xml文件



#### 2.3 pom.xml文件中加入依赖

```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.5.RELEASE</version>
    <relativePath/>
</parent>
```



#### 2.4 pom.xml文件中加入springboot-starter依赖

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-cache</artifactId>
    </dependency>

    <dependency>
        <groupId>com.github.ben-manes.caffeine</groupId>
        <artifactId>caffeine</artifactId>
        <version>2.6.0</version>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```



#### 2.5 pom.xml文件中加入maven-springboot打包插件

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```



#### 2.6 开发启动类

```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```



#### 2.7 开发用户实体类

```
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {

    private Integer id;
    private String uname;
    private String pwd;
    private Integer age;

}
```



#### 2.8 开发用户服务层

主要基于Spring缓存注解@Cacheable、@CacheEvict、@CachePut的方式使用

@Cacheable ：改注解修饰的方法，若不存在缓存，则执行方法并将结果写入缓存；若存在缓存，则不执行方法，直接返回缓存结果。
@CachePut ：执行方法，更新缓存；该注解下的方法始终会被执行。
@CacheEvict ：删除缓存
@Caching 将多个缓存组合在一个方法上（该注解可以允许一个方法同时设置多个注解）
@CacheConfig 在类级别设置一些缓存相关的共同配置（与其它缓存配合使用）

```
import com.oven.vo.User;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @CacheEvict(value = "FIVE", key = "#id")
    public void delete(Integer id) {
        System.out.println("删除key为[" + id + "]的缓存");
    }

    @Cacheable(value = "FIVE", key = "#id", sync = true)
    public User getById(Integer id) {
        System.out.println("操作数据库，进行通过ID查询，ID: " + id);
        return new User(id, "admin", "123", 18);
    }

}
```



#### 2.9 开发用户控制层

```
import com.oven.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping("/getById")
    public Object getById(Integer id) {
        return userService.getById(id);
    }

    @RequestMapping("/delete")
    public Object delete(Integer id) {
        userService.delete(id);
        return "删除成功！";
    }

}
```



#### 2.10 开发缓存枚举类

```
public enum CacheType {

    TEN(10),

    FIVE(5);

    private final int expires;

    CacheType(int expires) {
        this.expires = expires;
    }

    public int getExpires() {
        return expires;
    }

}
```



#### 2.11 开发caffeine缓存配置类

```
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
public class CaffeineConfig {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        List<CaffeineCache> caffeineCaches = new ArrayList<>();
        for (CacheType cacheType : CacheType.values()) {
            caffeineCaches.add(new CaffeineCache(cacheType.name(),
                    Caffeine.newBuilder()
                            .expireAfterWrite(cacheType.getExpires(), TimeUnit.SECONDS)
                            .build()));
        }
        cacheManager.setCaches(caffeineCaches);
        return cacheManager;
    }

}
```



#### 2.12 编译打包运行

### 3. 应用场景



## 参考资料

https://blog.csdn.net/zhxdick/article/details/105733209

https://www.cnblogs.com/MorningBell/p/16659254.html

[(64条消息) Caffeine （史上最全）_40岁资深老架构师尼恩的博客-CSDN博客](https://blog.csdn.net/crazymakercircle/article/details/113751575)

https://blog.csdn.net/CSDN_WYL2016/article/details/128258565

https://blog.csdn.net/Listening_Wind/article/details/110085228

多级缓存优化

[(64条消息) 项目理解（七）多级缓存优化性能_多级缓存事务性_lzw2019sun的博客-CSDN博客](https://blog.csdn.net/liuzewei2015/article/details/99706438)

[数据量很大，分页查询很慢，怎么优化？ - 简书 (jianshu.com)](https://www.jianshu.com/p/864d0bd80115)