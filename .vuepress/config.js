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
        ["meta", {"name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no"}]
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
        "nav": customNav,
        // 左侧边栏
        // "sidebar": {
        //     "/docs/theme-reco/": [
        //         "",
        //         "theme",
        //         "plugin",
        //         "api"
        //     ]
        // },
        "sidebar": customSidebar,
        // "sidebar": nav,
        // "sidebar": 'auto',
        // "sidebar": sidebarConfig,
        "subSidebar": 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        "type": "blog",
        // 博客配置
        "blogConfig": {
            "category": {
                "location": 4, // 在导航栏菜单中所占的位置，默认2
                "text": "分类",
                "sidebarDepth": 3,
            },
            "tag": {
                "location": 5,
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
        "lastUpdated": "最近修改于",
        "author": "xuxiaolong",
        "authorAvatar": "/logo2.png",
        "record": "xuxiaolong",
        "startYear": "2016"
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
    "plugins": pluginsConf
}