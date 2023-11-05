// 顶部导航栏js
module.exports = [
    {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
    },
    {
        "text": "Java",
        "icon": "iconfont icon-cafei",
        "items": [
            {
                "text": "java开发技巧",
                "icon": "iconfont icon-LBhouduanfuwuzu",
                "link": "/Java/java开发技巧/其他/语法糖"
            },
            {
                "text": "JVM性能调优",
                "icon": "iconfont icon-duozhongzhifu",
                "link": "/Java/JVM性能调优/JVM"
            },
            {
                "text": "并发编程",
                "icon": "iconfont icon-bingfashuliang",
                "link": "/Java/并发编程/JUC"
            },
            {
                "text": "Linux",
                "icon": "iconfont icon-centos",
                "link": "/Java/Linux/Linux常用命令"
            },
            {
                "text": "设计模式",
                "icon": "iconfont icon-iconfontmoshi",
                "link": "/Java/设计模式/1基本概念/设计模式",
            },
            {
                "text": "微服务专栏",
                "icon": "iconfont icon-mseweifuwuyinqing",
                "link": "/Java/微服务专栏/流控组件Sentinel/微服务保护"
            },
            {
                "text": "架构设计",
                "icon": "iconfont icon-jiagou",
                "link": "/Java/架构设计/分布式/分布式事务/分布式事务Seata"
            },
            {
                "text": "数据结构",
                "icon": "iconfont icon-shujujiegou",
                "link": "/Java/数据结构/排序算法"
            }
        ]
    },
    {
        "text": "数据库",
        "icon": "iconfont icon-shujuku",
        "link": "/数据库/Mysql索引"
    },
    {
        "text": "Redis专栏",
        "icon": "iconfont icon-redis",
        "link": "/Redis/Redis解决限流问题"
    },
    {
        "text": "常用框架",
        "icon": "iconfont icon-zuzhijiagou",
        "items": [
            {
                "text": "Spring",
                "icon": "iconfont icon-iconfontmoshi",
                "link": "/常用框架/Spring/1"
            },
            {
                "text": "MybatisPlus",
                "icon": "iconfont icon-iconfontmoshi",
                "link": "/常用框架/MybatisPlus/1"
            }
        ]
    },
    {
        "text": "随笔文档",
        "icon": "iconfont icon-biji",
        "link": "/docs/",
        "items": [
            {
                "text": "🚀日常笔记",
                "link": "/docs/日常笔记/IDEA+Linux远程开发"
            },
            {
                "text": "🚀开发文档",
                "link": "/docs/开发文档/Mysql主从复制"
            }
        ]
    },
    {
        "text": "项目",
        "icon": "reco-date",
        "sidebarDepth": 5,
        "items": [
            {
                "text": '我的项目🎈',
                "items": [
                    {"text": 'springboot_chowder', "link": 'https://github.com/Daneliya/springboot_chowder'},
                    {"text": '博客项目', "link": 'https://github.com/Daneliya/Daneliya.github.io'}, ///openSource/blog/
                    {"text": '聚合搜索平台', "link": 'https://github.com/Daneliya/aggregated-search-platform'},
                    {"text": 'API 接口开放平台', "link": 'https://github.com/Daneliya/xuapi'}
                ]
            }, {
                "text": '学习项目🎈',
                "items": [
                    {
                        "text": '学成在线',
                        "link": "/project/project",
                        "ariaLabel": 'Language Menu',
                        "items": [
                            "project",
                        ]
                    }
                ]
            }
        ]
    },
    {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "iconfont icon-shijianzhou"
    },
    {
        "text": "关于",
        "icon": "reco-message",
        "items": [
            {
                "text": "GitHub",
                "link": "https://github.com/Daneliya",
                "icon": "reco-github"
            },
            {
                "text": "Gitee",
                "link": "https://gitee.com/xu_xiaolong",
                "icon": "reco-mayun"
            }
        ]
    }
]