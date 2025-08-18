---
title: AI模型与输入输出
tags:
  - Python
categories:
  - Python
---

## 一、玩转Open AI聊天模型

### 1、模型（Model）：AI应用的核心

模型是AI应用的核心，负责提供语言的理解和生成能力。LangChain的设计允许开发者集成多种不同的大语言模型（LLM），提供了极大的灵活性。

LangChain主要将模型分为两大类：

1. **LLM (Language Model - 语言模型)**
   - **功能**：本质上是**文本补全**模型。它接收一段文本，预测并生成接下来最可能的文本。
   - **接口**：通常接收一个**字符串**作为输入，并返回一个**字符串**作为输出。
2. **ChatModel (聊天模型)**
   - **功能**：是在对话数据上进行过专门**调优**的模型，更擅长处理多轮对话和理解对话历史。
   - **接口**：接收一个**消息列表**（Message List）作为输入，并返回一个**消息**（Message）作为输出。
   - **优势**：当前，ChatModel 通常是比基础 LLM 更先进和更实用的选择，因为它在对话任务上表现更好，能显著提升用户体验。

> **注意**：我们熟悉的 GPT-3.5-turbo、GPT-4 等都属于 **ChatModel**。

### 2、使用LangChain调用OpenAI聊天模型

以OpenAI的聊天模型为例，通过LangChain获取模型回复。

#### 第一步：安装依赖

首先，需要安装LangChain与OpenAI集成的专用库。

```
pip install langchain-openai
```

#### 第二步：导入并创建模型实例

1. **导入模块**： 从 `langchain_openai` 库中导入 `ChatOpenAI` 类。

   ```
   from langchain_openai import ChatOpenAI
   ```

2. **创建实例**： 创建一个 `ChatOpenAI` 的实例。

   ```
   # 假设你的OpenAI API密钥已设置在环境变量中
   llm = ChatOpenAI(model="gpt-3.5-turbo")  # 指定模型，如 gpt-3.5-turbo, gpt-4
   ```

#### 第三步：配置模型参数

在创建实例时，可以配置多种参数来控制模型的行为：

- 常用参数（可直接作为构造函数参数）：

  - `temperature`：控制输出的随机性。值越高，输出越随机、有创意；值越低，输出越确定、保守。
  - `max_tokens`：限制模型生成的最大token数量。

- 其他参数（可通过model_kwargs字典传入）：

  - 例如 `frequency_penalty`（频率惩罚）、`presence_penalty`（存在惩罚）等不那么常用的参数。

  ```
  llm = ChatOpenAI(
      model="gpt-3.5-turbo",
      temperature=0.7,
      max_tokens=100,
      model_kwargs={"frequency_penalty": 0.5}  # 其他参数
  )
  ```

> **提示**：如果未将API密钥存入环境变量，可以在创建实例时通过 `api_key` 参数直接传入。

### 3、构建消息列表（Message List）

由于 `ChatModel` 接收消息列表作为输入，我们需要了解消息的结构。

#### 消息类型

消息列表中的消息主要有三种类型：

1. **`SystemMessage`**：系统消息。用于向AI提供指令、设定角色或行为准则。例如：“你是一个乐于助人的助手。”
2. **`HumanMessage`**：人类消息。代表用户输入的对话内容。
3. **`AIMessage`**：AI消息。代表AI之前的回复，用于构建对话历史。

#### 创建和组合消息

1. **导入消息类**：

   ```
   from langchain_core.messages import SystemMessage, HumanMessage
   ```

2. **创建消息实例**：

   ```
   system_message = SystemMessage(content="你是一个翻译专家，擅长将英文翻译成中文。")
   human_message = HumanMessage(content="Hello, how are you?")
   ```

3. **组合成消息列表**：

   ```
   messages = [system_message, human_message]
   ```

### 4、调用模型并获取回复

最后，调用模型的 `invoke` 方法（或 `__call__` 方法）来获取回复。

```
# 调用模型
response = llm.invoke(messages)  # 或者 llm(messages)

# 打印回复
# response 是一个 AIMessage 对象
print(response.content)  # 输出: 你好，你怎么样？
```

### 5、LangChain支持的其他模型

LangChain的 `langchain-community` 库支持集成来自不同服务商的多种聊天模型。官方文档中列出了丰富的选择，例如：

- **百度**：千帆平台提供的 `ERNIE-Bot` 系列模型。
- **腾讯**：`混元` (HunYuan) 模型。
- **阿里**：`通义千问` (Qwen) 系列模型。

开发者可以申请相应服务的API密钥，并通过类似的方式集成这些国产大模型，实现模型的灵活切换。

## 二、让模型的输入超级灵活



## 三、高效往提示里塞示范



## 四、从模型输出里提取列表



## 五、从模型输出里提取JSON



## 六、串起提示模板-模型-输出解析器

