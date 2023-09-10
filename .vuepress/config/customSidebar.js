module.exports = {
    "/Java/": [
        {
            "title": 'Group 1',   // 必要的
            "path": '/Java/JVM相关/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            "collapsable": true, // 可选的, 默认值是 true,
            "sidebarDepth": 2,    // 可选的, 默认值是 1
            "children": [
                'JVM相关',
                'Java 类加载机制'
            ]
        },
        {
            "title": 'Group 2',
            "path": '/Java/函数式编程/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            "collapsable": false, // 可选的, 默认值是 true,
            "sidebarDepth": 2,    // 可选的, 默认值是 1
            "children": [
                'JVM相关',
                'Java 类加载机制'
            ]
        }
    ]
}
