

> [VitePress](https://vitepress.dev/zh/)

## VitePress 是什么？

VitePress 是一个[静态站点生成器](https://en.wikipedia.org/wiki/Static_site_generator) (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## VitePress 与VuePres区别



## 快速开始

### 环境准备

~~~
nodejs version >= 18

npm add -D vitepress@next
~~~

### 安装向导

VitePress 附带一个命令行设置向导，构建一个基本项目。安装后，通过运行以下命令启动向导：

~~~
npx vitepress init
~~~

回答几个简单的问题：

~~~
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Where should VitePress look for your markdown files?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.
~~~

### 文件结构

~~~
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
~~~

`docs` 目录作为 VitePress 站点的项目**根目录**。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。

默认情况下，VitePress 将其开发服务器缓存存储在 `.vitepress/cache` 中，并将生产构建输出存储在 `.vitepress/dist` 中。如果使用 Git，应该将它们添加到 `.gitignore` 文件中。

## config配置

### 首页布局

首页进入博客会加载docs/index.md，VitePress默认主题提供了一个主页布局。

~~~markdown
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "My Awesome Project"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
~~~

`link`说明：

1、如果要跳转项目内的文章，则直接在`link`中写入文件路径，根目录为`docs`文件夹

2、如果要跳转外部链接，则直接在`link`中写入外部链接

### 顶部按钮的跳转栏

顶部按钮在`.viewpress/config.mts`文件中配置，在`config.mts`文件中`nav`则是顶部按钮的配置，例如点击`Examples`跳转，点击配置跳配置文档，此时就可以直接修改顶部按钮的`link`配置，通过路径直接指向对应的文件即可。

~~~js
themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        {text: 'Home', link: '/'},
        {text: 'Examples', link: '/markdown-examples'},
    ],
    sidebar: [
        {
            text: 'Examples',
            items: [
                {text: 'Markdown Examples', link: '/markdown-examples'},
                {text: 'Runtime API Examples', link: '/api-examples'}
            ]
        }
    ],
    socialLinks: [
        {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
    ]
}
~~~

通常一个大型的文档，顶部的按钮会非常多，如果全部写在`config.mts`文件中，随着积累该文件会变得非常臃肿，可以把该文件`nav`配置抽离出一个单独的文件，然后引入到`config.mts`中。

在`.viewpress`中新建`nav.mts`文件，将`nav`的配置写在`nav.mts`文件中，然后导出。

```

```

### 侧边文章的跳转

在`vitepress`中，侧边文章对应的是`.viewpress/config.mts`文件中的`sidebar`字段

`sidebar`中，每一个对象，对应一个`side`，`sidebar`中可以有多个对象，你可以将`sidebar`中的对象想想成一本书，每个对象对应一本书，text对应书名，items是一个数组，对应书内的章节，章节的link就对应的文章路径。

~~~

~~~



## Markdown配置

> [Markdown 扩展 | VitePress](https://vitepress.dev/zh/guide/markdown)

### 行号

在VitePress的配置文件中，可以通过设置`lineNumbers: true`来全局启用代码块的行号显示

~~~js
import { defineConfig } from 'vitepress'

export default defineConfig({
	markdown: {
		lineNumbers: true
	}
})
~~~

### 图片懒加载

通过在配置文件中将 `lazyLoading` 设置为 `true`，可以为通过 markdown 添加的每张图片启用懒加载。

~~~js
import { defineConfig } from 'vitepress'

export default defineConfig({
	markdown: {
    	image: {
      		// 默认禁用；设置为 true 可为所有图片启用懒加载。
      		lazyLoading: true
    	}
	}
})
~~~









[(3 封私信 / 80 条消息) 十分钟教会你如何使用VitePress搭建及部署个人博客站点 - 知乎](https://zhuanlan.zhihu.com/p/551291839)

[像编写文档一样轻松构建你的官网！-VitePress保姆级教程_vitepress模板-CSDN博客](https://blog.csdn.net/qq_44793507/article/details/142521250)

侧边栏

[VitePress Sidebar | 功能强大的自动侧边栏生成器](https://vitepress-sidebar.cdget.com/zhHans/)

[🌟 Vitepress 侧边栏自动生成，让你更专注写作Vitepress 有个痛点，无法根据目录自动生成侧边栏。每次新 - 掘金](https://juejin.cn/post/7227358177489961018)