---
title: ControlNet控制网
date: '2024-02-21'
tags:
   - Stable Diffusion
categories:
   - Stable Diffusion
---



> ControlNet扩展地址：[https://github.com/Mikubill/sd-webui-controlnet](https://github.com/Mikubill/sd-webui-controlnet)

## ControlNet原理解析

以特定信息进行引导，实现一些我们通过文生图、图生图不好精确控制的特征。



精确控制的意义？

- 如果只能靠“抽卡”产出需要的内容，生成是高度不可控的。

- 面对具体需求，只有“可控”才能成为“生产力”。





基本结构：预处理器 -> 模型

- 预处理器可以从图片里提取特征信息。

- 训练过的ControlNet模型读取这些信息，并引导Stable Diffusion 生成过程。




## ControlNet基本应用

### 安装方式

**1.1版本模型地址：**

（下载地址）[https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main](https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main)

（模型介绍）[https://github.com/lllyasviel/ControlNet-v1-1-nightly](https://github.com/lllyasviel/ControlNet-v1-1-nightly)

**1.14版本后更新的新模型（包括社区模型）与XL模型的地址：**

（下载地址）[https://huggingface.co/lllyasviel/sd_control_collection/tree/main](https://huggingface.co/lllyasviel/sd_control_collection/tree/main)



模型下载后，一般放置于

stable-diffusion-webui（根目录）\extensions\sd-webui-controlnet\models

or

stable-diffusion-webui（根目录）\models\ControlNet



**预处理器下载地址（缺东西在里面找）：**

（下载地址）[https://huggingface.co/lllyasviel/Annotators/tree/main](https://huggingface.co/lllyasviel/Annotators/tree/main)



预处理器下载后，一般放置于

 stable-diffusion-webui（根目录）\\extensions\\sd-webui-controlnet\\annotator\\downloads



### 基本使用方式



拖入信息图，选择对应的预处理器和模型组合，一定要点击启用。

对图像进行预处理：点击预处理器旁边的"爆炸"按钮，可以预览预处理结果；预处理的信息图可以保存下来复用，上传信息图时，将预处理设置为“无”（有些情况可能无法准确理解原图，不如使用原图完美）。



参数详解：

- 控制权重（Control Weight）：主要影响控制“力度”。
- 引导时机（Starting Control Step）：生成过程中ControlNet“生效”的时间（从0~1）。
- 控制模式（Control Mode）：更倾向于提示词还是ControlNet。
- 改变控制力度的方式
  - 加大力度：提高权重，降低开始引导步数并提高结束引导步数，选用“ControlNet更重要”模式。
  - 降低力度：减小权重，提高开始引导步数并降低结束引导步数，选用“提示词更重要”模式。



图生图中，不需要另外上传图片，会自动加载图生图原图作为信息图。


![image-20240302143915977](3_ControlNet控制网.assets/image-20240302143915977.png)

对比

| 原图                                                         | 提取的骨骼图                                                 | 改变姿态后                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![img](3_ControlNet控制网.assets/eaa760cfe5648f041c3cb49c2d06379c89d314368570e36fd3222a137d3a6c88.png) | ![image-20240302144200525](3_ControlNet控制网.assets/image-20240302144200525.png) | ![image-20240302144223170](3_ControlNet控制网.assets/image-20240302144223170.png) |







## ControlNet模型

ControlNet总模型数量有14个，预处理器有23个。（截止2024-03-02）



五大ControlNet模型

1. Openpose：控制姿势、手部、面部细节。
2. Depth：控制空间组成（深度）。
3. Canny：控制线条轮廓。
4. SoftEdge：控制线条轮廓，但更加柔和、放松。
5. Scribble：涂鸦引导画面生成。



### Openpose：控制姿势、手部、面部细节

几种不同的Openpose预处理

1. Hand：手部骨骼
2. Face （Only）：面部特征点
3. Full：全部加在一起



### Depth：控制空间组成（深度）

深度图：黑色远，白色近。

几种不同的Depth预处理

1. Leres精度高。
2. midas软为泛用。
3. 精度越高的预处理，花费时间一般越久。

推荐使用leress++处理器。



### Canny：控制线条轮廓

预处理时，阔值控制线条的多少，不宜太过密集。
应用：线稿上色。
Tips：白底黑线线稿应使用Invert，反色成黑底白线才可正确识别。



### SoftEdge（原HED）：控制线条轮廓，但更加柔和、放松

几种不同的SoftEdge预处理，没有太大差别。

与Canny对比，SoftEdge对轮廓线条的还原更加"生动"，不会太过于刻板。

Tips：适当“放松”ControlNet的控制力度，有助于AI发挥更多自己的创造力。


### Scribble：涂鸦引导画面生成

可以从图片提取，也可以自己绘制。

应用：灵魂画手。



### 其他

实现创新性局部重绘inPaint模型

放大工作流中用于增加细节的Tile模型

用于固定特征的Reference Only



## 多重ControlNet应用

在设置中，开启多个ControlNet Unit即可使用多重ControlNet。

示例：用Depth+Openpose，让人物手部准确呈现在脸前。



组合逻辑关键：要互补！

1. 正确示范：Canny+Depth，利用线条补足深度里的细节。

2. 错误示范：Canny+SoftEdge,同样是控制边缘，开两个和开一个差不了多少。



## 参考资料

[30分钟零基础掌握ControlNet！绝对是你看过最好懂的控制网原理分析 | 基本操作、插件安装与5大模型应用 · Stable Diffusion教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Ds4y1e7ZB/)