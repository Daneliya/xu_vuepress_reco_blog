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
            // 本地文件示例
            // {
            //   name: '장가갈 수 있을까',
            //   artist: '咖啡少年',
            //   url: '/bgm/1.mp3',
            //   cover: '/bgm/1.jpg'
            // },
            // 网络文件示例
            {
                name: '강남역 4번 출구',
                artist: 'Plastic / Fallin` Dild',
                url: 'https://assets.smallsunnyfox.com/music/2.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
            },
            {
                name: '用胳膊当枕头',
                artist: '최낙타',
                url: 'https://assets.smallsunnyfox.com/music/3.mp3',
                cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
            }
        ]
    }
}