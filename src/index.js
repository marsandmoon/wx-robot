const _ = require('lodash');
const async = require('async');
const settings = require('./settings').settings;
const request = require('request');
const Consts = require('./constant');

class Message {

    constructor(name, group) {
        this.name = name;
        this.person = Consts.friends[name];
        this.group = group;
    }

    /**
     * 生成消息
     * @private
     */
    _getMessage(callback) {
        async.auto({
            weather: (callback) => {
                this._getWeatherInfo(callback);
            },
            weibo: (callback) => {
                this._getWeiboHot(callback);
            },
            hitokoto: (callback) => {
                this._getHitokoto(callback);
            }
        }, (err, results) => {
            const {weather, weibo, hitokoto} = results;
            const person = this.person;
            const content =
`今日天气：
    ${weather.weather} 最高气温${weather.highest} 风力${weather.windspeed}
微博热搜：
    ${weibo.hotword}
送你一句话：
    ${hitokoto.hitokoto} --${hitokoto.from}
${person.nickname}, 今天${person.gender === 'male' ? '真帅！' : '真漂亮！'}
狗子们快来夸夸吧
                `;
            return callback(null, {
                "msgtype": "text",
                "text": {
                    "content": content,
                    "mentioned_mobile_list": [`${person.phone || '@all'}`]
                }
            });
        });
    }

    /**
     * 获取Hitokoto句子
     * @private
     */
    _getHitokoto(callback) {
        request({
            method: 'GET',
            json: true,
            url: settings.hitokoto
        }, (err, response, body) => {
            return callback(err, body);
        });
    }

    /**
     * 今日头条信息
     * @private
     */
    _getToutiao() {

    }

    /**
     * 获取天气信息
     * @private
     */
    _getWeatherInfo(callback) {
        request({
            method: 'GET',
            json: true,
            url: encodeURI(settings.tianxing.tianqi + `?key=${settings.tianxing.key}&city=无锡`),
        }, (err, response, body) => {
            return callback(err, _.get(body, 'newslist.0'));
        })
    }

    /**
     * 微博热搜
     * @private
     */
    _getWeiboHot(callback) {
        request({
            method: 'GET',
            json: true,
            url: settings.tianxing.weibo + `?key=${settings.tianxing.key}`
        }, (err, response, body) => {
            return callback(err, _.get(body, 'newslist.0'));
        })
    }

    /**
     * 发送消息
     * @public
     */
    sendMessage() {
        this._getMessage((err, msg) => {
            request({
                method: 'POST',
                json: true,
                url: settings.wx.url + `?key=${settings.wx[this.group.key]}`,
                body: msg
            }, (err, response, body) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('舔狗成功');
                }
            });
        })
    }
}

const group1 = Consts.groups.group1;
const group2 = Consts.groups.group2;

const msg1 = new Message(group1.items[_.floor(Math.random() * _.size(group1.items))], group1);
msg1.sendMessage();

const msg2 = new Message(group2.items[_.floor(Math.random() * _.size(group2.items))], group2);
msg2.sendMessage();
