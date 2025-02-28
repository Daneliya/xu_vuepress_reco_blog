---
title: Python数据分析—整理数据
tags:
  - Python
categories:
  - Python
---

在数据清洗干净后，很多时候，我们可以直接开始可视化或分析了，但也有些时候，我们还需要一些额外步骤。

比如：当我们从多个数据源获取相关数据，或者数据集本身包括了多个表格，那就可能涉及一些数据连接或合并等操作。

## 一、对DataFrame进行拼接

其中，最简单的操作，就是把两个DataFrame，纵向或横向连接到一起。

### (一)、对DataFrame进行纵向拼接

1. 可以用Pandas的concat函数，给concat函数传入一个列表，列表里面放上想要拼接的DataFrame，会返回一个前面两个DataFrame纵相拼接后的新DataFrame
2. 索引

**concat函数，默认保留DataFrame索引，包括位置索引。**

**但位置索引没有啥意义，且拼接后索引会乱掉**

**可以指定可选参数ignore_index=True，这样拼接时就会对原本DataFrame索引进行忽略，返回的新结果里，索引就是从0开始排序的位置索引**

```python
import pandas as pd
df1 = pd.DataFrame({
    '商品名': ['iPhone 12', 'MacBook Air', 'iPad', 'Apple Watch Series 6'],
    '单价（元）': [6799, 8499, 3199, 2699],
    '颜色': ['蓝色', '金色', '灰色', '粉色'],
    '库存数量': [100, 50, 150, 80]
})


df2 = pd.DataFrame({
    '商品名': ['AirPods Pro', 'HomePod mini', 'Apple TV 4K', 'Beats Flex'],
    '单价（元）': [1599, 749, 1499, 399],
    '颜色': ['白色', '空间灰色', '黑色', '黄色'],
    '库存数量': [120, 80, 60, 200]
})
```



```python
df1
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** |
| ----- | :------------------- | :------------- | :------- | :----------- |
| **0** | iPhone 12            | 6799           | 蓝色     | 100          |
| **1** | MacBook Air          | 8499           | 金色     | 50           |
| **2** | iPad                 | 3199           | 灰色     | 150          |
| **3** | Apple Watch Series 6 | 2699           | 粉色     | 80           |


```python
df2
```

|       | **商品名**   | **单价（元）** | **颜色** | **库存数量** |
| ----- | :----------- | :------------- | :------- | :----------- |
| **0** | AirPods Pro  | 1599           | 白色     | 120          |
| **1** | HomePod mini | 749            | 空间灰色 | 80           |
| **2** | Apple TV 4K  | 1499           | 黑色     | 60           |
| **3** | Beats Flex   | 399            | 黄色     | 200          |


```python
pd.concat([df1, df2])
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** |
| ----- | :------------------- | :------------- | :------- | :----------- |
| **0** | iPhone 12            | 6799           | 蓝色     | 100          |
| **1** | MacBook Air          | 8499           | 金色     | 50           |
| **2** | iPad                 | 3199           | 灰色     | 150          |
| **3** | Apple Watch Series 6 | 2699           | 粉色     | 80           |
| **0** | AirPods Pro          | 1599           | 白色     | 120          |
| **1** | HomePod mini         | 749            | 空间灰色 | 80           |
| **2** | Apple TV 4K          | 1499           | 黑色     | 60           |
| **3** | Beats Flex           | 399            | 黄色     | 200          |


```python
pd.concat([df1, df2], ignore_index=True)
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** |
| ----- | :------------------- | :------------- | :------- | :----------- |
| **0** | iPhone 12            | 6799           | 蓝色     | 100          |
| **1** | MacBook Air          | 8499           | 金色     | 50           |
| **2** | iPad                 | 3199           | 灰色     | 150          |
| **3** | Apple Watch Series 6 | 2699           | 粉色     | 80           |
| **4** | AirPods Pro          | 1599           | 白色     | 120          |
| **5** | HomePod mini         | 749            | 空间灰色 | 80           |
| **6** | Apple TV 4K          | 1499           | 黑色     | 60           |
| **7** | Beats Flex           | 399            | 黄色     | 200          |


1. 列名

**当参与拼接的两个DataFrame，存在列名不同时，并不会产生报错，此时DataFrame的所有列都会被进行保留，匹配不上的地方，就会自动用NaN值进行填充**

```python
df3 = pd.DataFrame({
    '商品名': ['iPhone 12', 'MacBook Air', 'iPad', 'Apple Watch Series 6'],
    '单价（元）': [6799, 8499, 3199, 2699],
    '颜色': ['蓝色', '金色', '灰色', '粉色'],
    '库存数量': [100, 50, 150, 80]
})


df4 = pd.DataFrame({
    '商品名': ['AirPods Pro', 'HomePod mini', 'Apple TV 4K', 'Beats Flex'],
    '单价': [1599, 749, 1499, 399],
    '颜色': ['白色', '空间灰色', '黑色', '黄色'],
    '库存数量': [120, 80, 60, 200]
})
```



```python
df3
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** |
| ----- | :------------------- | :------------- | :------- | :----------- |
| **0** | iPhone 12            | 6799           | 蓝色     | 100          |
| **1** | MacBook Air          | 8499           | 金色     | 50           |
| **2** | iPad                 | 3199           | 灰色     | 150          |
| **3** | Apple Watch Series 6 | 2699           | 粉色     | 80           |


```python
df4
```

|       | **商品名**   | **单价** | **颜色** | **库存数量** |
| ----- | :----------- | :------- | :------- | :----------- |
| **0** | AirPods Pro  | 1599     | 白色     | 120          |
| **1** | HomePod mini | 749      | 空间灰色 | 80           |
| **2** | Apple TV 4K  | 1499     | 黑色     | 60           |
| **3** | Beats Flex   | 399      | 黄色     | 200          |


```python
pd.concat([df3, df4], ignore_index=True)
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** | **单价** |
| ----- | :------------------- | :------------- | :------- | :----------- | :------- |
| **0** | iPhone 12            | 6799.0         | 蓝色     | 100          | NaN      |
| **1** | MacBook Air          | 8499.0         | 金色     | 50           | NaN      |
| **2** | iPad                 | 3199.0         | 灰色     | 150          | NaN      |
| **3** | Apple Watch Series 6 | 2699.0         | 粉色     | 80           | NaN      |
| **4** | AirPods Pro          | NaN            | 白色     | 120          | 1599.0   |
| **5** | HomePod mini         | NaN            | 空间灰色 | 80           | 749.0    |
| **6** | Apple TV 4K          | NaN            | 黑色     | 60           | 1499.0   |
| **7** | Beats Flex           | NaN            | 黄色     | 200          | 399.0    |


### (二)、对DataFrame进行横向拼接

仍然可以用concat函数，额外传入可选参数axis=1。因为此时是沿着列名横向操作，因此拼接的时候就是横向进行拼接。

```python
df5 = pd.DataFrame({
    '商品名': ['iPhone 12', 'MacBook Air', 'iPad', 'Apple Watch Series 6'],
    '单价（元）': [6799, 8499, 3199, 2699]
})


df6 = pd.DataFrame({
    '颜色': ['蓝色', '金色', '灰色', '粉色'],
    '库存数量': [100, 50, 150, 80]
})
```



```python
df5
```

|       | **商品名**           | **单价（元）** |
| ----- | :------------------- | :------------- |
| **0** | iPhone 12            | 6799           |
| **1** | MacBook Air          | 8499           |
| **2** | iPad                 | 3199           |
| **3** | Apple Watch Series 6 | 2699           |




```python
df6
```

|       | **颜色** | **库存数量** |
| ----- | :------- | :----------- |
| **0** | 蓝色     | 100          |
| **1** | 金色     | 50           |
| **2** | 灰色     | 150          |
| **3** | 粉色     | 80           |




```python
pd.concat([df5, df6], axis=1)
```

|       | **商品名**           | **单价（元）** | **颜色** | **库存数量** |
| ----- | :------------------- | :------------- | :------- | :----------- |
| **0** | iPhone 12            | 6799           | 蓝色     | 100          |
| **1** | MacBook Air          | 8499           | 金色     | 50           |
| **2** | iPad                 | 3199           | 灰色     | 150          |
| **3** | Apple Watch Series 6 | 2699           | 粉色     | 80           |


## 二、对DataFrame进行合并

### （一）、根据某列的值合并DataFrame

拼接相当于把两坨数据，简单粗暴地拼到一起；而合并是基于某些列的匹配连接。

#### 1、一般情况

```python
pd.merge(df1, df2, on='列名')
```

用Pandas的merge函数，传入要合并的DataFrame作为参数，可选参数on，来指定我们根据哪列的值匹配来进行合并

**给on传入的列名，要同时出现在要合并的两个DataFrame里面**

```python
customer_df = pd.DataFrame({
    '客户ID': [1, 2, 3, 4],
    '姓名': ['Amy', 'Bill', 'Cathy', 'Dave'],
    '邮箱': ['amy@xxx.com', 'bill@xxx.com', 'cat@xxx.com', 'dave@xxx.com']
})

order_df = pd.DataFrame({
    '订单ID': [1, 2, 3, 4, 5],
    '客户ID': [1, 1, 2, 4, 4],
    '销售额': [100, 50, 75, 90, 120]
})
```



```python
customer_df
```

|       | **客户ID** | **姓名** | **邮箱**     |
| ----- | :--------- | :------- | :----------- |
| **0** | 1          | Amy      | amy@xxx.com  |
| **1** | 2          | Bill     | bill@xxx.com |
| **2** | 3          | Cathy    | cat@xxx.com  |
| **3** | 4          | Dave     | dave@xxx.com |




```python
order_df
```

|       | **订单ID** | **客户ID** | **销售额** |
| ----- | :--------- | :--------- | :--------- |
| **0** | 1          | 1          | 100        |
| **1** | 2          | 1          | 50         |
| **2** | 3          | 2          | 75         |
| **3** | 4          | 4          | 90         |
| **4** | 5          | 4          | 120        |




```python
pd.merge(customer_df, order_df, on='客户ID')
```

|       | **客户ID** | **姓名** | **邮箱**     | **订单ID** | **销售额** |
| ----- | :--------- | :------- | :----------- | :--------- | :--------- |
| **0** | 1          | Amy      | amy@xxx.com  | 1          | 100        |
| **1** | 1          | Amy      | amy@xxx.com  | 2          | 50         |
| **2** | 2          | Bill     | bill@xxx.com | 3          | 75         |
| **3** | 4          | Dave     | dave@xxx.com | 4          | 90         |
| **4** | 4          | Dave     | dave@xxx.com | 5          | 120        |


如上例子，我们只有把顾客信息和订单信息分开在两个表里面，相同信息才不会多次重复出现。

假设我们只有一个表，里面又有订单数据又有客户信息的话。如果客户1下单了50次，那她的姓名和邮箱，就会在这个表里面重复50次；特别是，如果当客户1更改邮箱，那所有出现了她邮箱信息的行，都得去进行更新；但是如果我们把订单数据和客户信息放在两个表中，我们就只需要更新客户信息表中的一行。

由上可知，把不同的信息分开在不同表中，实际上是一个最佳实践。

**因此，在数据分析中，经常需要对DataFrame进行合并。**

#### 2、根据多列的值匹配来进行合并

`on=['列名1', '列名2'...]`

在合并的时候根据多列的值，要求它们得同时匹配

```python
order_df2 = pd.DataFrame({
    '订单ID': ['A001', 'A002', 'A003', 'A004'],
    '订单日期': ['2000-01-01', '2000-01-02', '2000-01-02', '2000-01-03'],
    '客户ID': ['C001', 'C002', 'C001', 'C003'],
    '销售额': [100, 200, 150, 300]
})

customer_df2 = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003'],
    '姓名': ['张三', '李四', '王五'],
    '手机号': ['13512345678', '13612345678', '13712345678'],
    '订单日期': ['2000-01-01', '2000-01-02', '2000-01-03']
})
```



```python
order_df2
```

|       | **订单ID** | **订单日期** | **客户ID** | **销售额** |
| ----- | :--------- | :----------- | :--------- | :--------- |
| **0** | A001       | 2000-01-01   | C001       | 100        |
| **1** | A002       | 2000-01-02   | C002       | 200        |
| **2** | A003       | 2000-01-02   | C001       | 150        |
| **3** | A004       | 2000-01-03   | C003       | 300        |




```python
customer_df2
```

|       | **客户ID** | **姓名** | **手机号**  | **订单日期** |
| ----- | :--------- | :------- | :---------- | :----------- |
| **0** | C001       | 张三     | 13512345678 | 2000-01-01   |
| **1** | C002       | 李四     | 13612345678 | 2000-01-02   |
| **2** | C003       | 王五     | 13712345678 | 2000-01-03   |






```python
pd.merge(order_df2, customer_df2, on=['客户ID', '订单日期'])
```

|       | **订单ID** | **订单日期** | **客户ID** | **销售额** | **姓名** | **手机号**  |
| ----- | :--------- | :----------- | :--------- | :--------- | :------- | :---------- |
| **0** | A001       | 2000-01-01   | C001       | 100        | 张三     | 13512345678 |
| **1** | A002       | 2000-01-02   | C002       | 200        | 李四     | 13612345678 |
| **2** | A004       | 2000-01-03   | C003       | 300        | 王五     | 13712345678 |


#### 3、当某个变量，虽然在两个DataFrame里面出现，但是列名并不统一

1. 对任一DataFrame列名，进行重命名
2. 把可选参数`on`,替换成`left_on`和`right_on`，给`left_on`传入的是左边DataFrame用于合并的列名，给`right_on`传入的是右边DataFrame用于合并的列名

**合并后，原来的两个DataFrame的列都会保留，用于匹配的列的值一致**

```python
order_df3 = pd.DataFrame({
    '订单ID': ['A001', 'A002', 'A003', 'A004'],
    '订单日期': ['2000-01-01', '2000-01-02', '2000-01-02', '2000-01-03'],
    '客户编号': ['C001', 'C002', 'C001', 'C003'],
    '销售额': [100, 200, 150, 300]
})

customer_df3 = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003'],
    '姓名': ['张三', '李四', '王五'],
    '手机号': ['13512345678', '13612345678', '13712345678'],
    '交易日期': ['2000-01-01', '2000-01-02', '2000-01-03']
})
```



```python
order_df3
```

|       | **订单ID** | **订单日期** | **客户编号** | **销售额** |
| ----- | :--------- | :----------- | :----------- | :--------- |
| **0** | A001       | 2000-01-01   | C001         | 100        |
| **1** | A002       | 2000-01-02   | C002         | 200        |
| **2** | A003       | 2000-01-02   | C001         | 150        |
| **3** | A004       | 2000-01-03   | C003         | 300        |




```python
customer_df3
```

|       | **客户ID** | **姓名** | **手机号**  | **交易日期** |
| ----- | :--------- | :------- | :---------- | :----------- |
| **0** | C001       | 张三     | 13512345678 | 2000-01-01   |
| **1** | C002       | 李四     | 13612345678 | 2000-01-02   |
| **2** | C003       | 王五     | 13712345678 | 2000-01-03   |




```python
pd.merge(order_df3, customer_df3, left_on=['客户编号', '订单日期'], right_on=['客户ID', '交易日期'])
```

|       | **订单ID** | **订单日期** | **客户编号** | **销售额** | **客户ID** | **姓名** | **手机号**  | **交易日期** |
| ----- | :--------- | :----------- | :----------- | :--------- | :--------- | :------- | :---------- | :----------- |
| **0** | A001       | 2000-01-01   | C001         | 100        | C001       | 张三     | 13512345678 | 2000-01-01   |
| **1** | A002       | 2000-01-02   | C002         | 200        | C002       | 李四     | 13612345678 | 2000-01-02   |
| **2** | A004       | 2000-01-03   | C003         | 300        | C003       | 王五     | 13712345678 | 2000-01-03   |


#### 4、除了用于匹配的列，两张表还有其它的重名列

不会报错

合并后，为了区分某个重名的列到底来自哪个表，merge函数会自动为列名的结尾加上后缀，'_x'表示来自第一个表，'_y'表示来自第二个表

1. 自定义后缀

传入可选参数`suffixes=['第一个表的重名列的后缀', '第二个表的重名列的后缀']`

```python
df7 = pd.DataFrame({'日期': ['2000-01-01', '2000-01-02', '2000-01-03'],
                    '店铺': ['A', 'B', 'C'],
                    '销售额': [100, 200, 300]})
df8 = pd.DataFrame({'日期': ['2000-01-02', '2000-01-03', '2000-01-04'],
                    '店铺': ['B', 'C', 'D'],
                    '销售额': [400, 500, 600]})
```



```python
df7
```

|       | **日期**   | **店铺** | **销售额** |
| ----- | :--------- | :------- | :--------- |
| **0** | 2000-01-01 | A        | 100        |
| **1** | 2000-01-02 | B        | 200        |
| **2** | 2000-01-03 | C        | 300        |




```python
df8
```

|       | **日期**   | **店铺** | **销售额** |
| ----- | :--------- | :------- | :--------- |
| **0** | 2000-01-02 | B        | 400        |
| **1** | 2000-01-03 | C        | 500        |
| **2** | 2000-01-04 | D        | 600        |




```python
pd.merge(df7, df8, on=['日期', '店铺'])
```

|       | **日期**   | **店铺** | **销售额_x** | **销售额_y** |
| ----- | :--------- | :------- | :----------- | :----------- |
| **0** | 2000-01-02 | B        | 200          | 400          |
| **1** | 2000-01-03 | C        | 300          | 500          |




```python
pd.merge(df7, df8, on=['日期', '店铺'], suffixes=['_df7', '_df8'])
```

|       | **日期**   | **店铺** | **销售额_df7** | **销售额_df8** |
| ----- | :--------- | :------- | :------------- | :------------- |
| **0** | 2000-01-02 | B        | 200            | 400            |
| **1** | 2000-01-03 | C        | 300            | 500            |


#### 5、合并类型

1）合并类型包括：inner、outer、left、right

inner表示合并结果里，只保留左右表都有匹配的值；

outer表示合并结果里，保留左右表的所有值，如果有匹配不上的，用NaN值填充，因此最终结果里所有行都出现了；

left表示合并结果里，会保留左边表的所有值，然后右边表根据左边的值去匹配，如果有匹配不上的用NaN值填充，因此最终结果里左边表的行都会在；

right表示合并结果里，会保留右边表的所有值，然后左边表根据右边的值去匹配，如果有匹配不上的用NaN值填充，因此最终结果里右边表的行都会在。

2）可以给merge函数传入可选参数`how='合并类型'`，用来指定合并类型，默认合并类型是inner

```python
customers_data = {
    '客户ID': [1, 2, 3, 4, 5],
    '姓名': ['Tom', 'Bob', 'Mary', 'Alice', 'John'],
    '年龄': [20, 35, 27, 19, 42]
}
customer_df4 = pd.DataFrame(customers_data)

orders_data = {
    '订单ID': [1001, 1002, 1003, 1004, 1005, 1006],
    '订单日期': ['2000-03-12', '2000-03-13', '2000-03-13', '2000-03-15', '2000-03-18', '2000-03-21'],
    '客户ID': [1, 1, 2, 6, 5, 3],
    '产品': ['A', 'B', 'C', 'D', 'E', 'F'],
    '数量': [2, 3, 1, 4, 5, 2]
}
order_df4 = pd.DataFrame(orders_data)
```



```python
customer_df4
```

|       | **客户ID** | **姓名** | **年龄** |
| ----- | :--------- | :------- | :------- |
| **0** | 1          | Tom      | 20       |
| **1** | 2          | Bob      | 35       |
| **2** | 3          | Mary     | 27       |
| **3** | 4          | Alice    | 19       |
| **4** | 5          | John     | 42       |




```python
order_df4
```

|       | **订单ID** | **订单日期** | **客户ID** | **产品** | **数量** |
| ----- | :--------- | :----------- | :--------- | :------- | :------- |
| **0** | 1001       | 2000-03-12   | 1          | A        | 2        |
| **1** | 1002       | 2000-03-13   | 1          | B        | 3        |
| **2** | 1003       | 2000-03-13   | 2          | C        | 1        |
| **3** | 1004       | 2000-03-15   | 6          | D        | 4        |
| **4** | 1005       | 2000-03-18   | 5          | E        | 5        |
| **5** | 1006       | 2000-03-21   | 3          | F        | 2        |




```python
pd.merge(customer_df4, order_df4, on='客户ID', how='inner')
```

|       | **客户ID** | **姓名** | **年龄** | **订单ID** | **订单日期** | **产品** | **数量** |
| ----- | :--------- | :------- | :------- | :--------- | :----------- | :------- | :------- |
| **0** | 1          | Tom      | 20       | 1001       | 2000-03-12   | A        | 2        |
| **1** | 1          | Tom      | 20       | 1002       | 2000-03-13   | B        | 3        |
| **2** | 2          | Bob      | 35       | 1003       | 2000-03-13   | C        | 1        |
| **3** | 3          | Mary     | 27       | 1006       | 2000-03-21   | F        | 2        |
| **4** | 5          | John     | 42       | 1005       | 2000-03-18   | E        | 5        |




```python
pd.merge(customer_df4, order_df4, on='客户ID', how='outer')
```

|       | **客户ID** | **姓名** | **年龄** | **订单ID** | **订单日期** | **产品** | **数量** |
| ----- | :--------- | :------- | :------- | :--------- | :----------- | :------- | :------- |
| **0** | 1          | Tom      | 20.0     | 1001.0     | 2000-03-12   | A        | 2.0      |
| **1** | 1          | Tom      | 20.0     | 1002.0     | 2000-03-13   | B        | 3.0      |
| **2** | 2          | Bob      | 35.0     | 1003.0     | 2000-03-13   | C        | 1.0      |
| **3** | 3          | Mary     | 27.0     | 1006.0     | 2000-03-21   | F        | 2.0      |
| **4** | 4          | Alice    | 19.0     | NaN        | NaN          | NaN      | NaN      |
| **5** | 5          | John     | 42.0     | 1005.0     | 2000-03-18   | E        | 5.0      |
| **6** | 6          | NaN      | NaN      | 1004.0     | 2000-03-15   | D        | 4.0      |




```python
pd.merge(customer_df4, order_df4, on='客户ID', how='left')
```

|       | **客户ID** | **姓名** | **年龄** | **订单ID** | **订单日期** | **产品** | **数量** |
| ----- | :--------- | :------- | :------- | :--------- | :----------- | :------- | :------- |
| **0** | 1          | Tom      | 20       | 1001.0     | 2000-03-12   | A        | 2.0      |
| **1** | 1          | Tom      | 20       | 1002.0     | 2000-03-13   | B        | 3.0      |
| **2** | 2          | Bob      | 35       | 1003.0     | 2000-03-13   | C        | 1.0      |
| **3** | 3          | Mary     | 27       | 1006.0     | 2000-03-21   | F        | 2.0      |
| **4** | 4          | Alice    | 19       | NaN        | NaN          | NaN      | NaN      |
| **5** | 5          | John     | 42       | 1005.0     | 2000-03-18   | E        | 5.0      |




```python
pd.merge(customer_df4, order_df4, on='客户ID', how='right')
```

|       | **客户ID** | **姓名** | **年龄** | **订单ID** | **订单日期** | **产品** | **数量** |
| ----- | :--------- | :------- | :------- | :--------- | :----------- | :------- | :------- |
| **0** | 1          | Tom      | 20.0     | 1001       | 2000-03-12   | A        | 2        |
| **1** | 1          | Tom      | 20.0     | 1002       | 2000-03-13   | B        | 3        |
| **2** | 2          | Bob      | 35.0     | 1003       | 2000-03-13   | C        | 1        |
| **3** | 6          | NaN      | NaN      | 1004       | 2000-03-15   | D        | 4        |
| **4** | 5          | John     | 42.0     | 1005       | 2000-03-18   | E        | 5        |
| **5** | 3          | Mary     | 27.0     | 1006       | 2000-03-21   | F        | 2        |


### （二）、根据索引合并DataFrame

join方法

join方法是根据索引去合并DataFrame，会保留两个DataFrame的所有的列

**假如有重名列，会报错，需要传入可选参数**`**lsuffix='左边DataFrame重名列的后缀'**`**和**`**rsuffix='右边DataFrame重名列的后缀'**`

**join是方法，不是函数，所以我们是要用某个DataFrame去调用**

**join方法也可以传入可选参数**`**how**`**，来指定去进行哪个类型的合并**

```python
customer_df4
```

|       | **客户ID** | **姓名** | **年龄** |
| ----- | :--------- | :------- | :------- |
| **0** | 1          | Tom      | 20       |
| **1** | 2          | Bob      | 35       |
| **2** | 3          | Mary     | 27       |
| **3** | 4          | Alice    | 19       |
| **4** | 5          | John     | 42       |




```python
order_df4
```

|       | **订单ID** | **订单日期** | **客户ID** | **产品** | **数量** |
| ----- | :--------- | :----------- | :--------- | :------- | :------- |
| **0** | 1001       | 2000-03-12   | 1          | A        | 2        |
| **1** | 1002       | 2000-03-13   | 1          | B        | 3        |
| **2** | 1003       | 2000-03-13   | 2          | C        | 1        |
| **3** | 1004       | 2000-03-15   | 6          | D        | 4        |
| **4** | 1005       | 2000-03-18   | 5          | E        | 5        |
| **5** | 1006       | 2000-03-21   | 3          | F        | 2        |




```python
customer_df4.join(order_df4, lsuffix='_customer', rsuffix='_order')
```

|       | **客户ID_customer** | **姓名** | **年龄** | **订单ID** | **订单日期** | **客户ID_order** | **产品** | **数量** |
| ----- | :------------------ | :------- | :------- | :--------- | :----------- | :--------------- | :------- | :------- |
| **0** | 1                   | Tom      | 20       | 1001       | 2000-03-12   | 1                | A        | 2        |
| **1** | 2                   | Bob      | 35       | 1002       | 2000-03-13   | 1                | B        | 3        |
| **2** | 3                   | Mary     | 27       | 1003       | 2000-03-13   | 2                | C        | 1        |
| **3** | 4                   | Alice    | 19       | 1004       | 2000-03-15   | 6                | D        | 4        |
| **4** | 5                   | John     | 42       | 1005       | 2000-03-18   | 5                | E        | 5        |


随着数据表的数量增加，和分析数据的复杂度的增加，可能会越来越多的用merge做合并数据的操作。

   


## 三、分组聚合

### （一）、聚合函数

定义好的聚合函数包括：

1. count()，得到元素的数量
2. first()，得到第一个元素
3. last()，得到最后一个元素
4. mean()，得到所有元素平均值
5. median()，得到所有元素中位数
6. min()，得到所有元素最小值
7. max()，得到所有元素最大值
8. std()，得到所有元素的标准差
9. var()，得到所有元素的方差
10. prod()，得到所有元素的积
11. sum()，得到所有元素的和

### （一）、对DataFrame进行分组聚合运算

#### 1、根据单个变量进行分组聚合运算

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    '分店编号': ['001', '002', '001', '002', '001', '002', '001', '002'],
    '时间段': ['2022Q1', '2022Q1', '2022Q1', '2022Q1', '2022Q2', '2022Q2', '2022Q2', '2022Q2'],
    '商品类别': ['生鲜食品', '生鲜食品', '休闲食品', '休闲食品', '生鲜食品', '生鲜食品', '休闲食品', '休闲食品'],
    '销售额': [1500, 2000, 3000, 2500, 1800, 2200, 3200, 2700],
    '销售数量': [105,  84, 171, 162,  67, 150,  99,  57]
})
df
```

|       | **分店编号** | **时间段** | **商品类别** | **销售额** | **销售数量** |
| ----- | :----------- | :--------- | :----------- | :--------- | :----------- |
| **0** | 001          | 2022Q1     | 生鲜食品     | 1500       | 105          |
| **1** | 002          | 2022Q1     | 生鲜食品     | 2000       | 84           |
| **2** | 001          | 2022Q1     | 休闲食品     | 3000       | 171          |
| **3** | 002          | 2022Q1     | 休闲食品     | 2500       | 162          |
| **4** | 001          | 2022Q2     | 生鲜食品     | 1800       | 67           |
| **5** | 002          | 2022Q2     | 生鲜食品     | 2200       | 150          |
| **6** | 001          | 2022Q2     | 休闲食品     | 3200       | 99           |
| **7** | 002          | 2022Q2     | 休闲食品     | 2700       | 57           |




DataFrame的groupby方法

1. 根据变量进行分组，得到一个叫做DataFrameGroupBy的实例

`df.groupby('变量')`

2. 底层逻辑

groupby方法，会自动把变量值相同的行分组组合到一起，并返回一个叫做DataFrameGroupBy的实例。

分组组合，可以看成把变量值相同的许多数据组合进，以组为单位的单元格中，这时一个单元格里面有多个数据，并不是有效的表格数据，无法返回DataFrame。

因此，最后需要通过聚合函数，生成有效表格数据。

3. 提取变量，对DataFrameGroupBy的实例，提取出要进行聚合运算的单列或多列

1)单列

`df.groupby('变量')['要进行聚合运算的单列']`

2)多列

在方括号里传入一个列表

`df.groupby('变量')[['变量1', '变量2']]`

4. 进行聚合运算

`df.groupby('变量')['要进行聚合运算的单列'].聚合函数()`

5. 结果

返回的结果的索引，是我们给groupby传入的变量名

返回的结果，是Series还是DataFrame，取决于聚合运算前提取出的变量是单个还是多个

```python
df.groupby('分店编号') 

<pandas.core.groupby.generic.DataFrameGroupBy object at 0x000001F57F84C390> 

df.groupby('分店编号')['销售额'] 

<pandas.core.groupby.generic.SeriesGroupBy object at 0x000001F57905BAD0> 

df.groupby('分店编号')[['销售额', '销售数量']]

<pandas.core.groupby.generic.DataFrameGroupBy object at 0x000001F51882FC10>

df.groupby('分店编号')['销售额'].mean()

分店编号
001    2375.0
002    2350.0
Name: 销售额, dtype: float64
```



```python
df.groupby('分店编号')[['销售额', '销售数量']].mean()
```

|              | **销售额** | **销售数量** |
| ------------ | ---------- | ------------ |
| **分店编号** |            |              |
| **001**      | 2375.0     | 110.50       |
| **002**      | 2350.0     | 113.25       |


#### 2、根据多个变量进行分组聚合运算

给groupby方法传入一个列表，里面放上多个变量

```python
df.groupby(['分店编号', '时间段'])[['销售额', '销售数量']].mean()
```

|              |            | **销售额** | **销售数量** |
| ------------ | ---------- | ---------- | ------------ |
| **分店编号** | **时间段** |            |              |
| **001**      | **2022Q1** | 2250.0     | 138.0        |
|              | **2022Q2** | 2500.0     | 83.0         |
| **002**      | **2022Q1** | 2250.0     | 123.0        |
|              | **2022Q2** | 2450.0     | 103.5        |


#### 3、自定义聚合函数

自定义聚合函数的要求是，它能把Series里一堆数字汇总成一个数字

```python
def max_plus_10(nums):
    return nums.max() + 10
```

可以用apply方法，参数传入自定义聚合函数的函数名，详见Dataframe章节

```python
df.groupby(['分店编号', '时间段'])[['销售额', '销售数量']].apply(max_plus_10)
```

|              |            | **销售额** | **销售数量** |
| ------------ | ---------- | ---------- | ------------ |
| **分店编号** | **时间段** |            |              |
| **001**      | **2022Q1** | 3010       | 181          |
|              | **2022Q2** | 3210       | 109          |
| **002**      | **2022Q1** | 2510       | 172          |
|              | **2022Q2** | 2710       | 160          |


### （三）、透视表

Pandas的`pivot_table`函数

1. 功能

基于原始数据对表进行重塑，让表变得更加直观，方便我们阅读和理解

2. 语法

`pd.pivot_table(DataFrame, index=['列名1', '列名2'], columns='列名3', values='列名4', aggfunc='函数名')`

把包含数据的DataFrame和想设定的索引、列、值以及聚合函数的函数名，都作为参数，传入pivot_table函数

需要两层索引，可以给`index`传入一个列表

**由于重塑得到的表格，每个单元格，相当于包含经索引和列分组后的数据，大多数情况下不是一个数据，所以需要聚合函数**

**不指定**`**aggfunc**`**时，默认是NumPy的**`**mean**`**函数**

```python
df
```

|       | **分店编号** | **时间段** | **商品类别** | **销售额** | **销售数量** |
| ----- | :----------- | :--------- | :----------- | :--------- | :----------- |
| **0** | 001          | 2022Q1     | 生鲜食品     | 1500       | 105          |
| **1** | 002          | 2022Q1     | 生鲜食品     | 2000       | 84           |
| **2** | 001          | 2022Q1     | 休闲食品     | 3000       | 171          |
| **3** | 002          | 2022Q1     | 休闲食品     | 2500       | 162          |
| **4** | 001          | 2022Q2     | 生鲜食品     | 1800       | 67           |
| **5** | 002          | 2022Q2     | 生鲜食品     | 2200       | 150          |
| **6** | 001          | 2022Q2     | 休闲食品     | 3200       | 99           |
| **7** | 002          | 2022Q2     | 休闲食品     | 2700       | 57           |


把df的分店编号和时间段作为索引，商品类别作为列，计算销售额的总和

```python
pd.pivot_table(df, index=['分店编号', '时间段'], columns='商品类别', values='销售额', aggfunc=np.sum)
```

|              | **商品类别** | **休闲食品** | **生鲜食品** |
| ------------ | :----------- | ------------ | ------------ |
| **分店编号** | **时间段**   |              |              |
| **001**      | **2022Q1**   | 3000         | 1500         |
|              | **2022Q2**   | 3200         | 1800         |
| **002**      | **2022Q1**   | 2500         | 2000         |
|              | **2022Q2**   | 2700         | 2200         |


**由于Series底层实现就是NumPy的数组，所以针对数组的函数也可以用在Pandas的Series上**

```python
pd.pivot_table(df, index=['分店编号', '时间段'], columns='商品类别', values='销售额', aggfunc=sum)
```

|              | **商品类别** | **休闲食品** | **生鲜食品** |
| ------------ | :----------- | ------------ | ------------ |
| **分店编号** | **时间段**   |              |              |
| **001**      | **2022Q1**   | 3000         | 1500         |
|              | **2022Q2**   | 3200         | 1800         |
| **002**      | **2022Q1**   | 2500         | 2000         |
|              | **2022Q2**   | 2700         | 2200         |


**因为sum是Python内置函数，所以也不一定调用NumPy数据库**

```python
# 把df的分店编号和时间段作为索引，商品类别作为列，计算销售额的平均值
# 由于这里重塑的表格每个单元格只包含原来DataFrame的一个单元格的数据，所以求和和求平均的结果一致
pd.pivot_table(df, index=['分店编号', '时间段'], columns='商品类别', values='销售额')
```

|              | **商品类别** | **休闲食品** | **生鲜食品** |
| ------------ | :----------- | ------------ | ------------ |
| **分店编号** | **时间段**   |              |              |
| **001**      | **2022Q1**   | 3000         | 1500         |
|              | **2022Q2**   | 3200         | 1800         |
| **002**      | **2022Q1**   | 2500         | 2000         |
|              | **2022Q2**   | 2700         | 2200         |




```python
# 把df的商品类别作为索引，分店编号作为列，计算销售额的平均值
pd.pivot_table(df, index='商品类别', columns='分店编号', values='销售额')
```

| **分店编号** | **001** | **002** |
| :----------- | ------- | ------- |
| **商品类别** |         |         |
| **休闲食品** | 3100    | 2600    |
| **生鲜食品** | 1650    | 2100    |




```python
# 把df的商品类别作为索引，分店编号作为列，计算销售额的总和
pd.pivot_table(df, index='商品类别', columns='分店编号', values='销售额', aggfunc=np.sum)
```

| **分店编号** | **001** | **002** |
| :----------- | ------- | ------- |
| **商品类别** |         |         |
| **休闲食品** | 6200    | 5200    |
| **生鲜食品** | 3300    | 4200    |


### （四）、groupby方法和pivot_table函数异同

1. **groupby方法和pivot_table函数的相同之处：**

**都可以进行分组聚合运算**

2. **groupby方法和pivot_table函数的不同之处：**

**pivot_table函数可以把变量作为索引分组，也可以把变量作为列进行分组；**

**groupby方法把数据分组后，用于分组的变量只能作为索引**

**当主要目的是分组聚合运算时，groupby方法会更加常用，因为根据什么分组，提取什么变量，做什么聚合操作，这个逻辑更加直接**

分组聚合操作是数据分析中的重要方法。

针对某个数据集，假如想把地区作为切入点，看地区之间是否有差异，就可以对数据用地区变量进行分组，进行聚合分析。



## 四、数据分箱

```python
import pandas as pd
df1 = pd.read_csv("residents_data.csv")
df1
```

|        | **性别** | **居住地** | **年龄** | **工资** |
| ------ | :------- | :--------- | :------- | :------- |
| **0**  | 男       | 北京       | 38       | 18053    |
| **1**  | 女       | 上海       | 42       | 9382     |
| **2**  | 男       | 广州       | 23       | 6376     |
| **3**  | 女       | 深圳       | 36       | 10746    |
| **4**  | 男       | 杭州       | 20       | 5284     |
| **5**  | 女       | 南京       | 34       | 9828     |
| **6**  | 男       | 成都       | 33       | 9366     |
| **7**  | 男       | 重庆       | 47       | 22820    |
| **8**  | 男       | 武汉       | 36       | 16927    |
| **9**  | 女       | 西安       | 42       | 11591    |
| **10** | 男       | 南昌       | 42       | 11316    |
| **11** | 男       | 合肥       | 27       | 7426     |
| **12** | 男       | 长沙       | 23       | 4705     |
| **13** | 男       | 福州       | 41       | 24117    |
| **14** | 女       | 厦门       | 50       | 69153    |
| **15** | 女       | 济南       | 32       | 5559     |
| **16** | 男       | 郑州       | 56       | 6391     |
| **17** | 男       | 长春       | 60       | 11020    |
| **18** | 男       | 哈尔滨     | 59       | 68189    |
| **19** | 女       | 南宁       | 32       | 15661    |


### （一）、进行数据分箱

**分箱，就是把数据按特定的规则进行分组，实现数据的离散化，增强数据稳定性。**

针对某个数据集，如果想把年龄作为切入点，对数据用年龄变量进行分组，进行聚合分析；会发现因为年龄存在很多可能性，出现非常多组。

```python
 df1.groupby('年龄')['工资'].mean()
```

```python
年龄
20     5284.0
23     5540.5
27     7426.0
32    10610.0
33     9366.0
34     9828.0
36    13836.5
38    18053.0
41    24117.0
42    10763.0
47    22820.0
50    69153.0
56     6391.0
59    68189.0
60    11020.0
Name: 工资, dtype: float64
```

#### 1、Pandas的cut函数

这时可以调用Pandas的cut函数

1）功能

可以帮我们对Series，根据数字范围进行划分，之后用划分后的标签进行分组

2）步骤

+ 新建一个列表，用它来表示数字的分组边界，也即分箱的规则
+ 新建一个列表，用来表示各个范围所对应的标签，
+ 根据分箱规则对变量进行分箱，并使用分组标签
+ 把将分箱结果作为新的一列添加到原数据集中，然后可以开始进行分组聚合运算

3）语法

函数中，传入要进行分箱的Series，和创建好的分箱规则，可选参数labels='分组标签列表'

**标签和区间按顺序一一对应，因此分箱规则的列表需要比标签的列表多一个元素。**

4）结果

返回一个新的Series，数据类型是category，其中的种类就是根据传入的分箱规则划分的结果，展示了原始Series里面各个数字分别是属于什么范围的。

假如不传入可选参数labels，结果中Series的值，会以区间形式呈现，圆括号和方括号分别表示开区间和闭区间；假如传入可选参数labels，结果中Series的值，就变成了我们前面指定的标签

#### 2、示例

```python
# 1. 定义年龄分组列表
# 2. 并根据以上分组对df1的年龄列进行分箱
age_bins = [0, 10, 20, 30, 40, 50, 60, 120]
pd.cut(df1.年龄, age_bins)
```

```python
0     (30, 40]
1     (40, 50]
2     (20, 30]
3     (30, 40]
4     (10, 20]
5     (30, 40]
6     (30, 40]
7     (40, 50]
8     (30, 40]
9     (40, 50]
10    (40, 50]
11    (20, 30]
12    (20, 30]
13    (40, 50]
14    (40, 50]
15    (30, 40]
16    (50, 60]
17    (50, 60]
18    (50, 60]
19    (30, 40]
Name: 年龄, dtype: category
Categories (7, interval[int64, right]): [(0, 10] < (10, 20] < (20, 30] < (30, 40] < (40, 50] < (50, 60] < (60, 120]]
```

```python
# 1. 定义年龄分组列表
# 2. 定义分组标签列表
# 3. 根据分组对df1的年龄列进行分箱，并使用以上分组标签
age_bins = [0, 10, 20, 30, 40, 50, 60, 120]
age_labels = ['儿童', '青少年', '青年', '壮年', '中年', '中老年', '老年']
pd.cut(df1.年龄, age_bins, labels=age_labels)
```

```python
0      壮年
1      中年
2      青年
3      壮年
4     青少年
5      壮年
6      壮年
7      中年
8      壮年
9      中年
10     中年
11     青年
12     青年
13     中年
14     中年
15     壮年
16    中老年
17    中老年
18    中老年
19     壮年
Name: 年龄, dtype: category
Categories (7, object): ['儿童' < '青少年' < '青年' < '壮年' < '中年' < '中老年' < '老年']
```



```python
# 4.为df1新建"年龄组"列，值为以上分组标签
df1['年龄组'] = pd.cut(df1.年龄, age_bins, labels=age_labels)
df1
```

|        | **性别** | **居住地** | **年龄** | **工资** | **年龄组** |
| ------ | :------- | :--------- | :------- | :------- | :--------- |
| **0**  | 男       | 北京       | 38       | 18053    | 壮年       |
| **1**  | 女       | 上海       | 42       | 9382     | 中年       |
| **2**  | 男       | 广州       | 23       | 6376     | 青年       |
| **3**  | 女       | 深圳       | 36       | 10746    | 壮年       |
| **4**  | 男       | 杭州       | 20       | 5284     | 青少年     |
| **5**  | 女       | 南京       | 34       | 9828     | 壮年       |
| **6**  | 男       | 成都       | 33       | 9366     | 壮年       |
| **7**  | 男       | 重庆       | 47       | 22820    | 中年       |
| **8**  | 男       | 武汉       | 36       | 16927    | 壮年       |
| **9**  | 女       | 西安       | 42       | 11591    | 中年       |
| **10** | 男       | 南昌       | 42       | 11316    | 中年       |
| **11** | 男       | 合肥       | 27       | 7426     | 青年       |
| **12** | 男       | 长沙       | 23       | 4705     | 青年       |
| **13** | 男       | 福州       | 41       | 24117    | 中年       |
| **14** | 女       | 厦门       | 50       | 69153    | 中年       |
| **15** | 女       | 济南       | 32       | 5559     | 壮年       |
| **16** | 男       | 郑州       | 56       | 6391     | 中老年     |
| **17** | 男       | 长春       | 60       | 11020    | 中老年     |
| **18** | 男       | 哈尔滨     | 59       | 68189    | 中老年     |
| **19** | 女       | 南宁       | 32       | 15661    | 壮年       |




```python
# 5. 对df1根据年龄组进行分组，计算各个年龄组的平均工资
df1.groupby('年龄组')['工资'].mean()
```

```python
年龄组
儿童              NaN
青少年     5284.000000
青年      6169.000000
壮年     12305.714286
中年     24729.833333
中老年    28533.333333
老年              NaN
Name: 工资, dtype: float64
```

### （二）、层次化索引

在用groupby方法分组的时候，利用了一个以上的变量，会发现得到的DataFrame会出现层次化索引

```python
df2 = pd.DataFrame({
    '分店编号': ['001', '002', '001', '002', '001', '002', '001', '002'],
    '时间段': ['2022Q1', '2022Q1', '2022Q1', '2022Q1', '2022Q2', '2022Q2', '2022Q2', '2022Q2'],
    '商品类别': ['生鲜食品', '生鲜食品', '休闲食品', '休闲食品', '生鲜食品', '生鲜食品', '休闲食品', '休闲食品'],
    '销售额': [1500, 2000, 3000, 2500, 1800, 2200, 3200, 2700],
    '销售数量': [105,  84, 171, 162,  67, 150,  99,  57]
})
grouped_df2 = df2.groupby(['分店编号', '时间段'])[['销售额', '销售数量']].mean()
grouped_df2
```

|              |            | **销售额** | **销售数量** |
| ------------ | ---------- | ---------- | ------------ |
| **分店编号** | **时间段** |            |              |
| **001**      | **2022Q1** | 2250.0     | 138.0        |
|              | **2022Q2** | 2500.0     | 83.0         |
| **002**      | **2022Q1** | 2250.0     | 123.0        |
|              | **2022Q2** | 2450.0     | 103.5        |




#### 1、针对层次化索引的DataFrame，提取数据行

依然可以用方括号里面放上索引，去提取数据行

1）用外层索引，会一次性提取出多行

```python
grouped_df2.loc['001']
```

|            | **销售额** | **销售数量** |
| ---------- | ---------- | ------------ |
| **时间段** |            |              |
| **2022Q1** | 2250.0     | 138.0        |
| **2022Q2** | 2500.0     | 83.0         |




2）要提取一行，可以在外层索引后，继续用内层索引继续去提取

```python
 grouped_df2.loc['001'].loc['2022Q1']
```

```python
销售额     2250.0
销售数量     138.0
Name: 2022Q1, dtype: float64
```

**不能直接用内层索引去提取数据行**

#### 2、重置索引

DataFrame的`reset_index`方法

索引会变成某列数据，详见清理数据章节

### （三）、根据条件筛选数据

```python
df1
```

|        | **性别** | **居住地** | **年龄** | **工资** | **年龄组** |
| ------ | :------- | :--------- | :------- | :------- | :--------- |
| **0**  | 男       | 北京       | 38       | 18053    | 壮年       |
| **1**  | 女       | 上海       | 42       | 9382     | 中年       |
| **2**  | 男       | 广州       | 23       | 6376     | 青年       |
| **3**  | 女       | 深圳       | 36       | 10746    | 壮年       |
| **4**  | 男       | 杭州       | 20       | 5284     | 青少年     |
| **5**  | 女       | 南京       | 34       | 9828     | 壮年       |
| **6**  | 男       | 成都       | 33       | 9366     | 壮年       |
| **7**  | 男       | 重庆       | 47       | 22820    | 中年       |
| **8**  | 男       | 武汉       | 36       | 16927    | 壮年       |
| **9**  | 女       | 西安       | 42       | 11591    | 中年       |
| **10** | 男       | 南昌       | 42       | 11316    | 中年       |
| **11** | 男       | 合肥       | 27       | 7426     | 青年       |
| **12** | 男       | 长沙       | 23       | 4705     | 青年       |
| **13** | 男       | 福州       | 41       | 24117    | 中年       |
| **14** | 女       | 厦门       | 50       | 69153    | 中年       |
| **15** | 女       | 济南       | 32       | 5559     | 壮年       |
| **16** | 男       | 郑州       | 56       | 6391     | 中老年     |
| **17** | 男       | 长春       | 60       | 11020    | 中老年     |
| **18** | 男       | 哈尔滨     | 59       | 68189    | 中老年     |
| **19** | 女       | 南宁       | 32       | 15661    | 壮年       |


#### 1、把Series作为DataFrame的索引

把条件是否符合对应的布尔值的Series，作为DataFrame的索引，来筛选出所有布尔值为True的行

```python
df1[(df1['性别'] == '男') & (df1['年龄'] <= 20)]
```

|       | **性别** | **居住地** | **年龄** | **工资** | **年龄组** |
| ----- | :------- | :--------- | :------- | :------- | :--------- |
| **4** | 男       | 杭州       | 20       | 5284     | 青少年     |




#### 2、DataFrame的query方法

1）优点

写法更加简洁直观

2）语法

给query方法传入一个字符串，字符串内容是想要筛选的条件，不同条件之间用括号包围，中间放上逻辑符号

**条件中的列名，不需要带DataFrame的名字，也不需要引号包围，直接用列名表示**

**条件里的普通字符串，需要带引号，并需要与query方法传入字符串外面，用不一样的引号；或者引号前面加上**`**\**`**，进行一个转义，让代码知道这是字符串里面的单引号**

```python
df1.query('(性别 == "男") & (年龄 <= 20)')
```

|       | **性别** | **居住地** | **年龄** | **工资** | **年龄组** |
| ----- | :------- | :--------- | :------- | :------- | :--------- |
| **4** | 男       | 杭州       | 20       | 5284     | 青少年     |