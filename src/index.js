const request = require('request');

const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=de2dd1f6-e382-44a0-a0e9-d28a8a823b37';

const names = {
    'laoge': '老哥',
    'wenwen': '文文',
    'kaikai': '凯凯',
    'ouyang': '欧少',
    'ke': '珂',
    'angle': 'Angle',
    'taylor': 'Taylor',
    'jerry': 'Jerry',
    'long': '阿龙'
};

const titles = [
    '你真的太帅了！',
    '你好棒棒呀！',
    '你太棒啦！',
    '你真帅!',
    '你好骚啊！',
    '今天真好看',
];

const phones = {
    'laoge': '17721571606',
    'wenwen': '15575858986',
    'kaikai': '13782727312',
    'ouyang': '18351037909',
    'ke': '13003321248',
    'angle': '17683150621',
    'taylor': '18278220218',
    'jerry': '17621623906'
};

const goodWords = [
    '你端坐在那里，不怒而威，明德惟馨，乃世人典范。',
    '你端坐在那里，我自惭形秽，如俗世尘埃不值一提。',
    '你端坐在那里，我坚信世界将臣服在你的脚下。',
    '你端坐在那里，不输康熙，乾隆帝王之气。',
    '你端坐在那里，我才知道我有多么浅薄，我曾忘情于两汉的歌赋，我曾惊讶于唐宋诗词，也曾流连于宋元的曲牌。如今而你才是人世间真正的圣人。',
    '句句看来皆是血，千（百，十，万）行代码不寻常。',
    '玲珑精巧，实是代码中极品',
    '一行代码思万千，把重复累赘齐抛却，制成简洁代码惊凡间',
    '叹代码，美中不足今朝方悟；知因果，反复推敲实在艰辛',
    '一目望去，欣然不已；三番细阅，仙人造诣。',
    '叹代码，美中不足今朝方悟；知因果，反复推敲实在艰辛',
    '此代码初制成，惊天动地，电闪雷鸣，世人鬼魂无不惊慌，以为天神下界，引得晴天霹雳。',
    '代码难，代码难，难于上青天。自古简洁人间罕，玲珑精巧更为难。此生得见实在幸，休将珍奇做笑谈。',
    '千寻万觅虽辛苦，海浪滔天；游遍文海终得金，破水之妙。',
];

const send = (id) => {
    const body = {
        "msgtype": "text",
        "text": {
            "content" :`${names[id] || '兄弟'} ${titles[Math.floor(Math.random() * titles.length)]}` + "\n" +`${goodWords[Math.floor(Math.random() * goodWords.length)]}`,
            "mentioned_mobile_list": [`${phones[id] || '@all'}`]
        }
    };
    request({
        method: 'POST',
        json: true,
        url,
        headers: {},
        body
    }, (err, response, body) => {
        if (err) {
            console.log(err);
        } else {
            console.log('舔狗成功');
        }
    });
};
const ids = Object.keys(names);
const index = Math.floor(Math.random() * ids.length);
send(ids[index]);

