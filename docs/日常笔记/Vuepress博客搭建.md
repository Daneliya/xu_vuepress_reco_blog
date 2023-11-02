> 官方文档：[https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)


# Vuepress搭建
## 准备开发环境

1. git（版本管理）
2. nodejs（核心，推荐14.x，新版本启动时需要增加一些配置选项）
3. yarn（npm包管理的替代）
4. vscode/WebStorm（编译器）

## 徽章

## 自定义样式
> [http://www.taodudu.cc/news/show-3334923.html?action=onClick](http://www.taodudu.cc/news/show-3334923.html?action=onClick)
> [https://bbs.csdn.net/topics/607761494](https://bbs.csdn.net/topics/607761494)
> [https://blog.csdn.net/qq_41327483/article/details/119103300](https://blog.csdn.net/qq_41327483/article/details/119103300)
> [https://juejin.cn/post/7242181894116573245#heading-6](https://juejin.cn/post/7242181894116573245#heading-6)
> [https://blog.csdn.net/weixin_42029738/article/details/125833297](https://blog.csdn.net/weixin_42029738/article/details/125833297)

新建 `.vuepress/styles/palette.styl` 文件增加样式
```css
// 侧边栏样式
// 左侧侧边栏标题
.sidebar > .sidebar-links > li > a.sidebar-link {
  font-size: 1.5em !important;
  margin-left: -1em;
}

// 右侧文章标题导航栏
a.sidebar-link {
  font-size: 10px !important;
  line-height: 0.5 !important;
}

// 左侧边栏标题字体大小样式
.sidebar-heading span {
  font-size: 1.2em;
  font-weight: bold;
}

.sidebar-heading.open span {
  font-weight: bold;
}

// 左侧边栏展开文章的字体大小
a.sidebar-link.active {
  color: #070808 !important;
  font-size: 14px !important;
  background: #c3d4b742 !important;
}

.sidebar-sub-headers a.sidebar-link {
  margin: 0 1rem 0 1rem !important;
}

// 分组的透明度修改，未生效
.sidebar-group.is-sub-group > .sidebar-heading:not(.clickable) {
  opacity: 0.5;
}

// 去除左上角标题，作者，标签等
.page .page-title {
  display: none;
}
```


## 让Google搜索到GitHub上的个人博客
[https://blog.csdn.net/weixin_44058333/article/details/100165245](https://blog.csdn.net/weixin_44058333/article/details/100165245)

## 插件
### markdown-it-disable-url-encode（中文识别）

1. 安装
```shell
npm i markdown-it-disable-url-encode
```

2. 引入
```shell
module.exports = {
  // .....
  markdown: {
    // ......
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  }
};
```

### vuepress-plugin-auto-sidebar（自动生成侧边栏 vuepress）
> 项目地址：[https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar)
>
> 项目文档：https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/


1. 安装
```shell
// VuePress v1
npm i vuepress-plugin-auto-sidebar -D

// VuePress v2
# vuepress v2 alpha(vuepress v2 仍处于测试阶段)
npm i vuepress-plugin-auto-sidebar@alpha -D
```

2. 使用
```shell
// VuePress v1
// 在 .vuepress/config.js 中配置插件
// edit .vuepress/config.js file
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ]
}


// VuePress v2：
// VuePress v2 不再支持插件修改 sidebar，所以你需要自行引入生成的 sidebar.js 文件。
// VuePress v2 no longer supports plugins to modify sidebar, so you need to import the generated sidebar.js file yourself.

const sidebarConf = require('./sidebar')

module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ],
  themeConfig: {
    sidebar: sidebarConf
  }
}
```

3. 生成
```shell
# 插件扩展了 vuepress cli 来帮助快速生成简单的导航栏，package.json 中增加启动项
# vuepress v2 不支持
vuepress nav docs
```

### 代码实现自动生成侧边栏
> 参考（vuepress-theme-reco）：[https://blog.csdn.net/weixin_44113868/article/details/118343085](https://blog.csdn.net/weixin_44113868/article/details/118343085)
> 参考：[https://blog.csdn.net/weixin_42068913/article/details/116207129](https://blog.csdn.net/weixin_42068913/article/details/116207129)

```shell
/**
 * 自动生成侧边栏文件
 * 技术：node文件模块的相关pai函数的使用
 * 使用：在config.js中引用该文件，然后配置项 sidebar: createSideBar()
 */
const fs = require('fs') // 文件模块
const file_catalogue = {} // 最终返回的路由
 
module.exports = {
	/**
	 * 自动生成侧边栏
	 * @param {String} path 路径，特指存放文章的根目录
	 * @param {Array} white_path 路由白名单 表示不参与构建路由的文件名称
	 */
	createSideBar(path = '', white_path = []) {
		this.getFileCatalogue('/' + path, white_path)
 
		return this.reverse(file_catalogue)
	},
 
	/**
	 * 查询某一文件夹目录下的所有文件
	 * @param {string} path 文件根目录
	 * @param {Array} white_path 路由白名单 表示不参与构建路由的文件名称
	 */
	getFileCatalogue(path= '', white_path = []) {
		// 1. 过滤掉白名单的文件
		const catagolue_list = fs.readdirSync('./docs' + path).filter(file => !white_path.includes(file))
		if (!catagolue_list.length) {
			return
		}
 
		// 2.找到的文件包含.md字符，判定为单一文件
		file_catalogue[path + '/'] = [
			{
				title: path.split('/')[path.split('/').length - 1],
				children: catagolue_list.filter(v => v.includes('.md')).map(file => { return file === 'README.md' || white_path.includes(file) ? '' : file.substring(0, file.length - 3) })
			}
		]
 
		// 3.找到的文件存在不包含.md文件，即存在文件夹，继续查找
		catagolue_list
			.filter(v => !v.includes('.md'))
			.forEach(new_path => this.getFileCatalogue(path + '/' + new_path, white_path))
	},
 
	/**
	 * 反序
	 * 原因：查找侧边栏是从上到下匹配，但是生成的配置是从外到内，即更详细的目录结构其实是放在最下边，所以要反序
	 */
	reverse(info) {
		let new_info = {}
		const info_keys = Object.keys(info).reverse()
 
		info_keys.forEach(key => {
			new_info[key] = info[key]
		})
		return new_info
	}
}
 
// 上面的代码我是放在util文件夹的autoCreateSideBar.js里面，所以我们需要进行引用
// config.js
const sideBar = require('./util/autoCreateSideBar')
module.exports = {
	// ...code
	themeConfig: {
		// ...code
		
		sidebar: sideBar.createSideBar('technology', ['img']) // 配置两个参数，一个是文章的根目录，第二是白名单（选择性配置）
	}
}
```
### vuepress-theme-sidebar（自动生成导航栏 vuepress2.x）
> 项目地址：[https://github.com/dingshaohua-cn/vuepress-theme-sidebar](https://github.com/dingshaohua-cn/vuepress-theme-sidebar)


### plugin-register-components（.vue文件识别）
> 参考：[https://www.cnblogs.com/wangdashi/p/16308107.html](https://www.cnblogs.com/wangdashi/p/16308107.html)


### vuepress-plugin-bgm-player（音乐播放器 vuepress-reco）
> [https://github.com/vuepress-reco/vuepress-plugin-bgm-player](https://github.com/vuepress-reco/vuepress-plugin-bgm-player)

## 问题
1、项目打包报错：Note: The code generator has deoptimised the styling of D:\.. as it exceeds the max of 500KB
> 参考：[https://blog.csdn.net/zora_55/article/details/128797544](https://blog.csdn.net/zora_55/article/details/128797544)

在项目的根目录下创建.banelrc文件，内容为
```bash
{
   "compact": false,
   "presets": ["env", "stage-0"],
   "plugins": ["transform-runtime"]
}
```

2、Error: error:0308010C:digital envelope routines::unsupported
> 参考：[https://blog.csdn.net/zjjxxh/article/details/127173968](https://blog.csdn.net/zjjxxh/article/details/127173968)

命令增加：set NODE_OPTIONS=--openssl-legacy-provider
或
降低nodejs版本

3、vite打包报错：块的大小超过限制，Some chunks are larger than 500kb after minification

# Vuepress-reco 1.0 主题
> 官方文档：[http://v1.vuepress-reco.recoluan.com/views/1.x/](http://v1.vuepress-reco.recoluan.com/views/1.x/)


[http://zpj80231.gitee.io/znote/other/project.html](http://zpj80231.gitee.io/znote/other/project.html)
[https://www.bookbook.cc/](https://www.bookbook.cc/)
# Vuepress-reco 2.0 主题
> 官方文档：[https://vuepress-theme-reco.recoluan.com/](https://vuepress-theme-reco.recoluan.com/)



# vdoing 主题
> 主题地址：[https://github.com/xugaoyi/vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)
> 示例博客：[https://m.sofineday.com](https://m.sofineday.com)


# 示例博客
[https://zpj80231.gitee.io/znote/](https://zpj80231.gitee.io/znote/)
[https://www.bookbook.cc/](https://www.bookbook.cc/)
[https://www.xk857.com/](https://www.xk857.com/)
[https://www.pdai.tech/](https://www.pdai.tech/)


# 参考资料
[1]. [https://www.bilibili.com/video/BV1vb411m7NY](https://www.bilibili.com/video/BV1vb411m7NY)
[https://blog.csdn.net/qq_19978927/article/details/108039032](https://blog.csdn.net/qq_19978927/article/details/108039032)
[https://blog.csdn.net/weixin_45732455/article/details/129940312](https://blog.csdn.net/weixin_45732455/article/details/129940312)
