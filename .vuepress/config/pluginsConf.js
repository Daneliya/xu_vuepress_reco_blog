module.exports = {
    // 自动生成侧边栏
    "vuepress-plugin-auto-sidebar": {
        nav: true,
        sidebarDepth: 5,
        collapse: {
            open: true
        }
    },
    // "vuepress-theme-sidebar": {
    //     sidebarType: true
    // }
    // 音乐播放器
    "@vuepress-reco/vuepress-plugin-bgm-player": {
        audios: [
            // 本地文件
            {
                name: '和宇宙温柔的关联',
                artist: '房东的猫',
                url: '/bgm/和宇宙温柔的关联 - 房东的猫.m4a',
                cover: '/logo2.png'
            },
            // 网络文件
            {
                name: '所念皆星河',
                artist: '房东的猫',
                url: 'https://c6.y.qq.com/base/fcgi-bin/u?__=ss8n0Ojvcz2B',
                cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
            },
            {
                name: '用胳膊当枕头',
                artist: '최낙타',
                url: 'https://assets.smallsunnyfox.com/music/3.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
            }
        ]
    },
    // PWA刷新内弹窗插件
    // npm install -D @vuepress/plugin-pwa
    "@vuepress/pwa": {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
    },
    // 复制弹窗插件
    // npm install -D vuepress-plugin-nuggets-style-copy
    // "vuepress-plugin-nuggets-style-copy": {
    //     copyText: "复制代码",
    //     tip: {
    //         content: "复制成功!"
    //     }
    // }
}