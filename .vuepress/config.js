const customNav = require("./config/customNav.js");
const customSidebar = require("./config/customSidebar.js");
const pluginsConf = require("./config/pluginsConf.js");
const nav = require("./nav.js");
const sidebarConfig = require("./vuepress-sidebar-atuo/sidebarConfig");

module.exports = {
    "title": "xuxiaolong",
    "description": "描述",
    "dest": "public",
    "port": 8081,
    "head": [
        ["link", {"rel": "icon", "href": "/logo2.png"}],
        ["meta", {"name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no"}],
        // 评论功能
        ['script', {type: 'text/javascript', src: 'http://libs.baidu.com/jquery/2.1.4/jquery.min.js'}],
        ['script', {type: 'text/javascript', src: '/js/visitor.js'}],
    ],
    "theme": "reco",
    // "colorMode": 'dark', // dark, light
    // 自动设置分类
    "autoSetBlogCategories": true,
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    "autoAddCategoryToNavbar": true,
    // 自动设置分类
    "autoSetSeries": true,
    "themeConfig": {
        "mode": 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        "modePicker": true, // 默认 true，false 不显示模式调节按钮，true 则显示
        "sidebarDepth": 4,
        "nav": customNav, // 顶部导航栏配置
        // 左侧边栏
        "sidebar": {
            // "/docs/theme-reco/": ["", "theme", "plugin", "api", "Mysql主从复制", "系统优化之限流"],
            "/docs/": ["", "theme", "plugin", "api", "Mysql主从复制", "系统优化之限流"],
            // "/Java/Linux/": ["/Java/Linux/Docker/Docker","/Java/Linux/Linux常用命令"],
            // '/Java/Linux/': [
            //     {
            //         title: 'Linux1',   // 必要的
            //         //path: '/Java/Linux/Docker',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            //         collapsable: true, // 可选的, 默认值是 true,
            //         // sidebarDepth: 1,    // 可选的, 默认值是 1
            //         children: [
            //             'Docker/Docker'
            //         ]
            //     },
            //     {
            //         title: 'Linux2',   // 必要的
            //         //path: '/Java/Linux/Linux常用命令',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            //         collapsable: true, // 可选的, 默认值是 true,
            //         // sidebarDepth: 1,    // 可选的, 默认值是 1
            //         children: [
            //             'Linux/Linux常用命令'
            //         ]
            //     },
            //     {
            //         title: 'Linux 2',
            //         children: ['/Java/Linux/Linux常用命令'],
            //         initialOpenGroupIndex: -1 // 可选的, 默认值是 0
            //     }
            // ]
            '/Java/Linux/Linux/Linux常用命令/': [
                {
                    title: 'Linux1',   // 必要的
                    path: '/Java/Linux/Docker/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Docker'
                    ]
                },
                {
                    title: 'Linux2',   // 必要的
                    path: '/Java/Linux/Linux/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Linux常用命令'
                    ]
                }
            ]
        },
        "subSidebar": 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        "type": "blog",
        // 博客配置
        "blogConfig": {
            // "category": {
            //     "location": 4, // 在导航栏菜单中所占的位置，默认2
            //     "text": "分类",
            //     "sidebarDepth": 3,
            // },
            "tag": {
                "location": 5,
                "text": "标签"
            }
        },
        // 友情链接
        "friendLink": [
            {
                "title": "午后南杂",
                "desc": "Enjoy when you can, and endure when you must.",
                "email": "1156743527@qq.com",
                "link": "https://www.recoluan.com"
            },
            {
                "title": "vuepress-theme-reco",
                "desc": "A simple and beautiful vuepress Blog & Doc theme.",
                "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                "link": "https://vuepress-theme-reco.recoluan.com"
            }
        ],
        // 评论
        "valineConfig": {     // valine 评论功能配置信息
            "appId": 'HlARuWu3vp0UYAlfgNwdYjQq-gzGzoHsz',// your appId
            "appKey": 'HQERIZMwBIBMlbSEJ2g8gLJK', // your appKey
            "placeholder": '尽情留下你想说的话吧~',           // 评论框占位符
            "avatar": 'wavatar',           // 评论用户的头像类型
            "highlight": true,         // 代码高亮
            "recordIP": true,         // 记录评论者的IP
            "visitor": true // 阅读量统计
        },
        "logo": "/logo2.png", //导航栏左侧logo
        "search": true, //顶部搜索栏，true表示开启搜索
        "searchMaxSuggestions": 10, //输入所要搜索的内容之后，搜索提示的最大数量
        "lastUpdated": "最近修改于", //最后更新的时间，显示在博客或文档底部
        "author": "xuxiaolong", //网站搭建者名称
        "authorAvatar": "/logo2.png",  //网站搭建者avatar，会显示在首页
        "record": "xuxiaolong", // 记录，可以记录网站访问量，这里暂时先写description
        "startYear": "2019" //底部网站运行开始时间
    },
    "markdown": {
        "lineNumbers": true,
        // 引入中文解析
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"));
        }
    },
    "locales": {
        '/': {
            "lang": "zh-CN"
        }
    },
    // 插件配置 (这里将插件分离出去，详见./config/pluginsConf)
    "plugins": pluginsConf
}