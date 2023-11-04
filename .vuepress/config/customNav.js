// 顶部导航栏js
const customSidebar = require("./customSidebar");
// enhanceApp.js 文件内容
// import '../styles/font_20csbaofexh/iconfont.css'
// import '../styles/font_cs5v8kb16mu/iconfont.css'
// require('../styles/font_20csbaofexh/iconfont');
// require('../styles/font_cs5v8kb16mu/iconfont');
// import('../styles/font_20csbaofexh/iconfont.css')
// import('../styles/font_cs5v8kb16mu/iconfont.css')
// <style>
//     export default{
//         mounted(){
//             import('../styles/font_cs5v8kb16mu/iconfont.css').then(icon=>{})
//         }
//     }
// </style>

module.exports = [
    {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
    },
    {
        "text": "Java",
        "icon": "iconfont icon-cafei",
        // "sidebar": customSidebar,
        "items": [
            {
                "text": "🚀java开发技巧",
                "icon": "iconfont icon-iconfontmoshi",
                "href": "/logo2.png",
                "link": "/Java/java开发技巧/其他/语法糖"
            },
            {
                "text": "🚀JVM相关",
                "link": "/Java/JVM相关/JVM"
            },
            {
                "text": "🚀并发编程",
                "link": "/Java/并发编程/JUC"
            },
            {
                "text": "🚀Linux",
                "link": "/Java/Linux/Linux常用命令"
            },
            {
                "text": "🚀设计模式",
                "link": "/Java/设计模式/设计模式",
                "children": ["/Java/设计模式/行为型/16_strategy"]
            },
            {
                "text": "🚀微服务专栏",
                "link": "/Java/微服务专栏/流控组件Sentinel/微服务保护"
            },
            {
                "text": "🚀架构",
                "link": "/Java/架构/分布式/分布式缓存/缓存"
            },
            {
                "text": "🚀数据结构",
                "link": "/Java/架构/分布式/分布式缓存/缓存"
            }
        ]
    },
    {
        "text": "数据库",
        "icon": "microchip",
        "link": "/Java/数据库/Mysql索引"
    },
    {
        "text": "Redis专栏",
        // "icon": "reco-message",
        "icon": "fa-solid fa-microchip",
        "link": "/Redis/Redis解决限流问题"
    },
    // {
    //     "text": "常用框架",
    //     "icon": "reco-message",
    //     "items": [
    //         {
    //             "text": "🚀java开发技巧",
    //             "icon": "iconfont icon-iconfontmoshi",
    //             "href": "/logo2.png",
    //             "link": "/Java/java开发技巧/语法糖"
    //         }
    //     ]
    // },
    {
        "text": "随笔文档",
        "icon": "reco-message",
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