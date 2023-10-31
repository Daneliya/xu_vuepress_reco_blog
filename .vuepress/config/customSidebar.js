module.exports = {
    // "/docs/theme-reco/": ["", "theme", "plugin", "api", "Mysql主从复制", "系统优化之限流"],
    // "/docs/": ["", "theme", "plugin", "api", "Mysql主从复制", "系统优化之限流"],
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
    '/Java/Linux/': [
        {
            title: 'Docker',   // 必要的
            // path: '/Java/Linux/Docker/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                'Docker/'
            ]
        },
        {
            title: 'Linux模块',   // 必要的
            // path: '/Java/Linux/Linux/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                'Linux/Linux常用命令',
                'Linux/',
            ]
        }
    ]
    // "/Java/": [
    //     {
    //         "title": 'Group 1',   // 必要的
    //         "path": '/Java/JVM相关/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //         "collapsable": true, // 可选的, 默认值是 true,
    //         "sidebarDepth": 2,    // 可选的, 默认值是 1
    //         "children": [
    //             'JVM相关',
    //             'Java 类加载机制'
    //         ]
    //     },
    //     {
    //         "title": 'Group 2',
    //         "path": '/Java/函数式编程/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //         "collapsable": false, // 可选的, 默认值是 true,
    //         "sidebarDepth": 2,    // 可选的, 默认值是 1
    //         "children": [
    //             'JVM相关',
    //             'Java 类加载机制'
    //         ]
    //     }
    // ],
    // "/Java/设计模式/": [
    //     "/Java/设计模式/设计模式", "/Java/设计模式/行为型/16_strategy"
    // ]
}
