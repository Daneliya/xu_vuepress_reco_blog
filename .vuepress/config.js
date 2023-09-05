module.exports = {
    "title": "徐晓龙的博客",
    "description": "描述",
    "dest": "public",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/logo2.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    "theme": "reco",
    "colorMode": 'dark', // dark, light
    // 自动设置分类
    "autoSetBlogCategories": true,
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    "autoAddCategoryToNavbar": true,
    // 自动设置分类
    "autoSetSeries": true,
    "subSidebar": 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    "themeConfig": {
        "nav": [
            {
                "text": "主页",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "时间线",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                "text": "随笔文档",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "随笔文档",
                        "link": "/docs/theme-reco/"
                    }
                ]
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
        ],
        // 左侧边栏
        "sidebar": {
            "/docs/theme-reco/": [
                "",
                "theme",
                "plugin",
                "api"
            ]
        },
        "type": "blog",
        // 博客配置
        "blogConfig": {
            "category": {
                "location": 2, // 在导航栏菜单中所占的位置，默认2
                "text": "分类" // 在导航栏菜单中所占的位置，默认2
            },
            "tag": {
                "location": 3,
                "text": "标签"
            }
        },
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
        "logo": "/logo2.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "author": "徐晓龙",
        "authorAvatar": "/logo2.png",
        "record": "xxxx",
        "startYear": "2017"
    },
    "markdown": {
        "lineNumbers": true
    },
    "locales": {
        '/': {
            "lang": "zh-CN"
        }
    }
}