const testMessage = `11:55:04 <梵蒂> 梵蒂开始新日志记录√
11:55:04 <梵蒂> 请适时用.log off暂停或.log end完成记录
11:55:05 <樱岛麻衣> 麻衣开始新日志记录√
11:55:05 <樱岛麻衣> 请适时用.log off暂停或.log end完成记录
11:55:10 <418 I am a teapot> 测试数据
11:55:15 <418 I am a teapot> 你们说两句话
11:55:29 <竹子> 1
11:55:37 <韩某人> 就是不受效果影响啊
11:55:52 <韩某人> 我不受效果影响了，你的效果是什么我都不吃了
11:55:53 <戏言> 自由是挺自由。在规定时限内把事情做完就行了。至于在哪工作，怎么工作，没人管我`

const messagePraser = function(messageChars){
    messages = [];
    messages.push (...messageChars.splice("\n"))
    return messages
}

console.log( messagePraser(testMessage) )

export { messagePraser };