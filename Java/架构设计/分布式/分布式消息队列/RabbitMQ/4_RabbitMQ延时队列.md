---
title: RabbitMQ延时队列
tags:
 - 消息队列
 - RabbitMQ
categories: 
 - 消息队列
 - RabbitMQ
---











一、什么是延时队列









三、RabbitMQ中的TTL









https://cloud.tencent.com/developer/article/1659393

https://blog.csdn.net/Mou_O/article/details/106093749

https://www.cnblogs.com/chengxy-nds/p/13217828.html

深入浅出RabbitMQ：顺序消费、死信队列和延时队列：https://cloud.tencent.com/developer/article/2355643：







## 报错

Caused by: com.rabbitmq.client.ShutdownSignalException: connection error; protocol method: #method<connection.close>(reply-code=530, reply-text=NOT_ALLOWED - vhost my-rabbit not found, class-id=10, method-id=40)

https://blog.csdn.net/m0_46114643/article/details/122543014





确认消息报错：Channel shutdown: channel error; protocol method

```
@RabbitListener(queues = DELAYED_QUEUE_NAME)
public void receiveD(Message message, Channel channel) throws IOException {
    String msg = new String(message.getBody());
    log.info("当前时间：{},延时队列收到消息：{}", new Date().toString(), msg);
    channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
}
```

https://blog.csdn.net/hantanxin/article/details/103871321

修改配置为手动签收

~~~
    listener:
      simple:
        concurrency: 1
        max-concurrency: 1
        acknowledge-mode: manual
        prefetch: 1 
~~~

