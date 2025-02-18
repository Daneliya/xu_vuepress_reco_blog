---
title: SpringBoot整合安全框架
tags:
 - SpringBoot
categories: 
 - SpringBoot
---



## SpringBoot整合安全框架

Shiro是Apache推出的新一代认证与授权管理开发框架，可以方便地与第三方的认证机构进行整合。下面将直接采用自定义缓存类来实现多个Redis数据库信息的保存。

![Image00233](5_SpringBoot整合安全框架.assets/Image00233.jpg)



### SpringBoot整合Shiro开发框架

SpringBoot与Shiro的整合处理，本质上和Spring与Shiro的整合区别不大，但开发者需要注意以下3点：

1. SpringBoot可以自动导入一系列的开发包，但是这些开发包里面不包含对Shiro的支持，所以还需要配置shiro的开发依赖库。
2. SpringBoot不提倡使用spring-shiro.xml文件进行配置，需要将配置文件转为Bean的形式（需要考虑缓存的调度时间问题）。
3. Shiro在进行一些Session管理以及缓存配置时要用到shiro-quartz依赖包，该依赖包使用的是QuartZ-1.X版本，而现在能找到的都是QuartZ-2.x版本。因此，如果不使用SpringBoot，那么这样的使用差别不大；如果使用了SpringBoot集成，就会产生后台的异常信息。

修改pom.xml配置文件，追加Shiro的相关依赖包。

定义版本属性

~~~
	<druid.version>1.1.1</druid.version>
	<shiro.version>1.3.2</shiro.version>
	<thymeleaf-extras-shiro.version>1.2.1</thymeleaf-extras-shiro.version>
~~~

定义配置依赖管理

~~~
<dependency>
				<groupId>com.github.theborakompanioni</groupId>
				<artifactId>thymeleaf-extras-shiro</artifactId>
				<version>${thymeleaf-extras-shiro.version}</version>
			</dependency>
			<dependency>
				<groupId>org.apache.shiro</groupId>
				<artifactId>shiro-spring</artifactId>
				<version>${shiro.version}</version>
			</dependency>
			<dependency>
				<groupId>org.apache.shiro</groupId>
				<artifactId>shiro-core</artifactId>
				<version>${shiro.version}</version>
			</dependency>
			<dependency>
				<groupId>org.apache.shiro</groupId>
				<artifactId>shiro-ehcache</artifactId>
				<version>${shiro.version}</version>
			</dependency>
			<dependency>
				<groupId>org.apache.shiro</groupId>
				<artifactId>shiro-web</artifactId>
				<version>${shiro.version}</version>
			</dependency>
			<dependency>
				<groupId>org.quartz-scheduler</groupId>
				<artifactId>quartz</artifactId>
				<version>${quartz.version}</version>
			</dependency>
~~~

修改pom.xml配置文件，追加依赖库配置。

~~~
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-spring</artifactId>
		</dependency>
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-core</artifactId>
		</dependency>
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-ehcache</artifactId>
		</dependency> 
		<dependency>
			<groupId>org.quartz-scheduler</groupId>
			<artifactId>quartz</artifactId>
		</dependency>
~~~

建立ShiroConfig的配置程序类，将所有Shiro的配置项都写在此配置类中。

~~~java
@Configuration
public class ShiroConfig {
	public static final String LOGOUT_URL = "/logout.action" ;			// 退出路径
	public static final String LOGIN_URL = "/loginPage" ;				// 登录路径
	public static final String UNAUTHORIZED_URL = "/unauth" ;			// 未授权错误页
	public static final String SUCCESS_URL = "/pages/back/welcome" ;	// 登录成功页
	
	@Resource(name = "redisConnectionFactory")
	private RedisConnectionFactory redisConnectionFactoryAuthentication;
	@Resource(name = "redisConnectionFactoryAuthorization")
	private RedisConnectionFactory redisConnectionFactoryAuthorization;
	@Resource(name = "redisConnectionFactoryActiveSessionCache")
	private RedisConnectionFactory redisConnectionFactoryActiveSessionCache; 
	
	
	@Bean
	public MemberRealm getRealm() {										// 定义Realm
		MemberRealm realm = new MemberRealm();
		realm.setCredentialsMatcher(new DefaultCredentialsMatcher());	// 配置缓存
		realm.setAuthenticationCachingEnabled(true);
		realm.setAuthenticationCacheName("authenticationCache");
		realm.setAuthorizationCachingEnabled(true);
		realm.setAuthorizationCacheName("authorizationCache");
		return realm;
	}
	@Bean(name = "lifecycleBeanPostProcessor")
	public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {	// Shiro实现控制器处理
		return new LifecycleBeanPostProcessor();
	}
	@Bean
	@DependsOn("lifecycleBeanPostProcessor")
	public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
		DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
		daap.setProxyTargetClass(true);
		return daap;
	}
	@Bean
	public CacheManager getCacheManager(
			@Qualifier("redisConnectionFactory")
			RedisConnectionFactory redisConnectionFactoryAuthentication ,
			@Qualifier("redisConnectionFactoryAuthorization")
			RedisConnectionFactory redisConnectionFactoryAuthorization ,
			@Qualifier("redisConnectionFactoryActiveSessionCache")
			RedisConnectionFactory redisConnectionFactoryActiveSessionCache
			) {															// 缓存配置
		RedisCacheManager cacheManager = new RedisCacheManager();		// 缓存集合
		Map<String,RedisConnectionFactory> map = new HashMap<>() ;
		map.put("authenticationCache", redisConnectionFactoryAuthentication) ;
		map.put("authorizationCache", redisConnectionFactoryAuthorization) ;
		map.put("activeSessionCache", redisConnectionFactoryActiveSessionCache) ;
		cacheManager.setConnectionFactoryMap(map);
		return cacheManager;
	}
	@Bean
	public SessionIdGenerator getSessionIdGenerator() { 				// SessionID生成
		return new JavaUuidSessionIdGenerator();
	}
	@Bean
	public SessionDAO getSessionDAO(SessionIdGenerator sessionIdGenerator) {
		EnterpriseCacheSessionDAO sessionDAO = new EnterpriseCacheSessionDAO();
		sessionDAO.setActiveSessionsCacheName("activeSessionCache");
		sessionDAO.setSessionIdGenerator(sessionIdGenerator);
		return sessionDAO;
	}
	@Bean
	public RememberMeManager getRememberManager() {						// 记住我
		CookieRememberMeManager rememberMeManager = new CookieRememberMeManager();
		SimpleCookie cookie = new SimpleCookie("MLDNJAVA-RememberMe");
		cookie.setHttpOnly(true); 
		cookie.setMaxAge(3600);
		rememberMeManager.setCookie(cookie);
		return rememberMeManager;
	}
	@Bean
	public DefaultQuartzSessionValidationScheduler getQuartzSessionValidationScheduler(
			DefaultWebSessionManager sessionManager) {
		DefaultQuartzSessionValidationScheduler sessionValidationScheduler = new DefaultQuartzSessionValidationScheduler();
		sessionValidationScheduler.setSessionValidationInterval(100000);
		sessionValidationScheduler.setSessionManager(sessionManager);
		return sessionValidationScheduler;
	}
	
	@Bean
	public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(
			DefaultWebSecurityManager securityManager) {
		AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
		aasa.setSecurityManager(securityManager);
		return aasa; 
	}

	@Bean
	public ShiroDialect shiroDialect() { 							// 追加配置，启动Thymeleaf模版支持
		return new ShiroDialect();
	}
	@Bean
	public DefaultWebSessionManager getSessionManager(SessionDAO sessionDAO) { // Session管理
		DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
		sessionManager.setDeleteInvalidSessions(true);
		sessionManager.setSessionValidationSchedulerEnabled(true);
		sessionManager.setSessionDAO(sessionDAO);
		SimpleCookie sessionIdCookie = new SimpleCookie("mldn-session-id");
		sessionIdCookie.setHttpOnly(true);
		sessionIdCookie.setMaxAge(-1);
		sessionManager.setSessionIdCookie(sessionIdCookie);
		sessionManager.setSessionIdCookieEnabled(true);
		return sessionManager;
	}
	@Bean
	public DefaultWebSecurityManager getSecurityManager(Realm memberRealm, CacheManager cacheManager,
			SessionManager sessionManager, RememberMeManager rememberMeManager) {// 缓存管理
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		securityManager.setRealm(memberRealm);
		securityManager.setCacheManager(cacheManager);
		securityManager.setSessionManager(sessionManager);
		securityManager.setRememberMeManager(rememberMeManager);
		return securityManager;
	}
	public FormAuthenticationFilter getLoginFilter() { 		// 在ShiroFilterFactoryBean中使用
		FormAuthenticationFilter filter = new FormAuthenticationFilter();
		filter.setUsernameParam("mid");
		filter.setPasswordParam("password");
		filter.setRememberMeParam("rememberMe");
		filter.setLoginUrl(LOGIN_URL);						// 登录提交页面
		filter.setFailureKeyAttribute("error");
		return filter;
	}
	public LogoutFilter getLogoutFilter() { 				// 在ShiroFilterFactoryBean中使用
		LogoutFilter logoutFilter = new LogoutFilter();
		logoutFilter.setRedirectUrl("/");					// 首页路径，登录注销后回到的页面
		return logoutFilter;
	}
	@Bean
	public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager);	// 设置 SecurityManager
		shiroFilterFactoryBean.setLoginUrl(LOGIN_URL);		// 设置登录页路径
		shiroFilterFactoryBean.setSuccessUrl(SUCCESS_URL);	// 设置跳转成功页
		shiroFilterFactoryBean.setUnauthorizedUrl(UNAUTHORIZED_URL);	// 授权错误页
		Map<String, Filter> filters = new HashMap<String, Filter>();
		filters.put("authc", this.getLoginFilter());
		filters.put("logout", this.getLogoutFilter());
		shiroFilterFactoryBean.setFilters(filters);
		Map<String, String> filterChainDefinitionMap = new HashMap<String, String>();
		filterChainDefinitionMap.put("/logout.page", "logout");
		filterChainDefinitionMap.put("/loginPage", "authc");	// 定义内置登录处理
		filterChainDefinitionMap.put("/pages/**", "authc");
		filterChainDefinitionMap.put("/*", "anon");
		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
		return shiroFilterFactoryBean;
	}
}
~~~

在本配置程序之中，最为重要的一个配置方法就是getQuartzSessionValidationScheduler()，这也是SpringBoot整合Shiro中最为重要的一点。之所以重新配置，主要原因是SpringBoot整合Shiro时的定时调度组件版本落后，所以才需要由用户自定义一个SessionValidationScheduler接口子类。

在使用Shiro的过程中，除了需要对控制层与业务层的拦截过滤之外，对于页面也需要有所支持，而SpringBoot本身不提倡使用JSP页面，所以就需要引入一个支持Shiro处理的Thymeleaf命名空间。

~~~
<html xmlns:th="http://www.thymeleaf.org" xmlns:shiro="http://www.pollix.at/thymeleaf/shiro">
~~~



配置完命名空间之后，Shiro就可以使用\<shiro:hasRole/>、\<shiro:principal/>这样的标签来进行Shiro操作。







### SpringBoot基于Shiro整合OAuth统一认证

在实际项目开发过程中，随着项目功能不断推出，会出现越来越多的子系统。这样就需要使用统一的登录认证处理。在一个良好的系统设计中一般都会存在有一个单点登录，而OAuth正是现在最流行的单点登录协议。

![Image00240](5_SpringBoot整合安全框架.assets/Image00240.jpg)







