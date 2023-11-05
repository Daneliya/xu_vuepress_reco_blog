// 侧边栏目录js
const path = require('./path.js');

module.exports = {
    '/Java/java开发技巧/': [
        {
            title: '函数式编程',   // 必要的
            //path: '/Java/java开发技巧/函数式编程/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/java开发技巧/函数式编程/')
        },
        {
            title: 'IDEA使用技巧',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/java开发技巧/IDEA/')
        },
        {
            title: '其他',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/java开发技巧/其他/')
        },
    ],
    '/Java/JVM性能调优/': [
        {
            title: 'JVM性能调优',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/JVM性能调优/')
        }
    ],
    '/Java/Linux/': [
        {
            title: 'Linux',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/Linux/')
        }
    ],
    '/Java/中间件/': [
        {
            title: '中间件',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/中间件/')
        }
    ],
    '/Java/容器/': [
        {
            title: '容器',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/容器/')
        }
    ],
    '/Java/并发编程/': [
        {
            title: '并发编程',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/并发编程/')
        }
    ],
    '/Java/微服务专栏/': [
        {
            title: '微服务专栏',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/微服务专栏/')
        }
    ],
    '/Java/架构设计/': [
        {
            title: '分布式',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: [
                {
                    title: '分布式事务',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 3,    // 可选的, 默认值是 1
                    children: path.findMdFiles('/Java/架构设计/分布式/分布式事务/')
                },
                {
                    title: '分布式搜索',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 3,    // 可选的, 默认值是 1
                    children: path.findMdFiles('/Java/架构设计/分布式/分布式搜索/')
                },
                {
                    title: '分布式消息队列',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 3,    // 可选的, 默认值是 1
                    children: path.findMdFiles('/Java/架构设计/分布式/分布式消息队列/')
                },
                {
                    title: '分布式监控',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 3,    // 可选的, 默认值是 1
                    children: path.findMdFiles('/Java/架构设计/分布式/分布式监控/')
                },
                {
                    title: '分布式缓存',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 3,    // 可选的, 默认值是 1
                    children: path.findMdFiles('/Java/架构设计/分布式/分布式缓存/')
                }
            ]
        },
        {
            title: '高可用',   // 必要的
            // path: '/Java/架构/高可用/降级熔断/README',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/架构设计/高可用/')
        }
    ],
    '/Java/设计模式/': [
        {
            title: '设计模式',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/设计模式/')
        }
    ],
    '/Java/数据结构/': [
        {
            title: '数据结构',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Java/数据结构/')
        }
    ],
    '/数据库/': [
        {
            title: '数据库',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/数据库/')
        }
    ],
    '/Redis/': [
        {
            title: 'Redis',   // 必要的
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 3,    // 可选的, 默认值是 1
            children: path.findMdFiles('/Redis/')
        }
    ]
}
