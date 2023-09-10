const customSidebar = require("./customSidebar");
// enhanceApp.js 文件内容
// import '../styles/font_20csbaofexh/iconfont.css'
// import '../styles/font_cs5v8kb16mu/iconfont.css'
require( '../styles/font_20csbaofexh/iconfont.css');
require( '../styles/font_cs5v8kb16mu/iconfont.css');

module.exports = [
    {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
    },
    {
        "text": "Java",
        "icon": "iconfont icon-cafei",
        "sidebar": customSidebar,
        "items": [
            {
                "text": "JVM相关",
                "icon": "iconfont icon-iconfontmoshi",
                "link": "/Java/JVM相关/Java 类加载机制"
            },
            {
                "text": "函数式编程",
                "link": "/Java/JVM相关/Java 类加载机制"
            },
            {
                "text": "并发编程",
                "link": "/Java/JVM相关/Java 类加载机制"
            }
        ]
    },
    {
        "text": "随笔文档",
        "icon": "reco-message",
        "link": "/docs/",
        "items": [
            {
                "text": "日常笔记🚀",
                "link": "/docs/日常笔记/IDEA+Linux远程开发"
            },
            {
                "text": "开发文档🚀",
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
        "icon": "reco-date"
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