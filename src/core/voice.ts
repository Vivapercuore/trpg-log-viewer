async function getvoice(opt , callback) {
    opt= Object.assign({
        tex: "您没有输入需要合成的语音",
        //	必填	合成的文本，使用UTF-8编码。小于2048个中文字或者英文数字。（文本在百度服务器内转换为GBK后，长度必须小于4096字节）
        tok: "24.d3723eb9c8641a2f2dae521759e188d9.2592000.1627576914.282335-16978729",
        //必填	开放平台获取到的开发者access_token（见上面的“鉴权认证机制”段落）
        cuid: "viva",
        //必填	用户唯一标识，用来计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内
        ctp: 1,
        //必填	客户端类型选择，web端填写固定值1
        lan: "zh",
        //必填	固定值zh。语言选择,目前只有中英文混合模式，填写固定值zh
        spd: 5,
        //选填	语速，取值0-15，默认为5中语速
        pit: 5,
        //选填	音调，取值0-15，默认为5中语调
        vol: 5,
        //选填	音量，取值0-15，默认为5中音量
        per: 0 //选填	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
    },opt)
    //获取token
    //https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=aS6zAi5wxC6a02mdnrOGN8Yj&client_secret=CiayLt0sSdTy2SYpL494r9yLEEtqp1eh
    
    return await get({
        url: 'https://tsn.baidu.com/text2audio',
        data: opt
    });
}

async function get(opt) {   //用于get请求
    var params = [];
    for (var key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    var url = opt.url + '?' + postData;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); //get请求，请求地址，是否异步

    xhr.responseType =  "blob";

    xhr.send();


    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            if (this.status == 200) {
                var data = this.response;
                var blob = new Blob();
                blob = this.response;
                resolve(blob, data);
            }else{
                reject(this.response)
            }
        };
    })

}

export default getvoice;

//返回音频元数据