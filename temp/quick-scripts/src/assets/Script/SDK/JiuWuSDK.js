"use strict";
cc._RF.push(module, '836feHm5g1MJIqJTju0KlY0', 'JiuWuSDK');
// Script/SDK/JiuWuSDK.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../Common/Tools");
var Global_1 = require("../Common/Global");
var QgApi_1 = require("../Common/manage/Api/QgApi");
var LogMgr_1 = require("../Common/LogMgr");
var CacheMgr_1 = require("../Common/manage/CacheMgr");
var JiuWuSDK = /** @class */ (function () {
    function JiuWuSDK() {
    }
    JiuWuSDK.inSet_API_Config = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.login().then(function () {
                _this.register().then(function (data) {
                    Global_1.default.allData = data;
                    var gmsUser = Global_1.default.allData.data.data.gmsUser;
                    CacheMgr_1.default.userId = gmsUser.userId;
                    CacheMgr_1.default.openId = gmsUser.openId;
                    CacheMgr_1.default.isAuth = gmsUser.isAuth;
                    // @ts-ignore
                    Global_1.default.config = JSON.parse(Global_1.default.allData.data.data.versionMode);
                    QgApi_1.default.createAdv();
                    LogMgr_1.default.log('一切就绪......');
                    _this.initSDK = true;
                    resolve(true);
                }, function () {
                    LogMgr_1.default.error('就绪失败......');
                });
            });
        });
    };
    /**
     * 后台 注册或者登录
     */
    JiuWuSDK.register = function () {
        var _this = this;
        try {
            return new Promise(function (resolve, reject) {
                console.log('准备发送请求......');
                var param = Object(null);
                console.log('发送请求中......A');
                param.url = Tools_1.default.getHost() + '/api/login/loginsum';
                console.log('发送请求中......B');
                param.data = {
                    code: _this.qgToken,
                    gameId: _this.gameInfo.gameId,
                    sceneVal: undefined,
                    exportId: undefined,
                    version: _this.gameInfo.gameVersion,
                };
                console.log('发送请求中......C');
                param.method = 'POST';
                param.header = _this.headers();
                param.header['content-type'] = 'application/json';
                param.success = function (res) {
                    if (res.data.code === 200) {
                        console.log('后台登录注册成功：', res);
                        resolve(res);
                    }
                    else {
                        console.error('登录错误：', res);
                        reject(res);
                    }
                };
                param.fail = function (err) {
                    console.error('发送请求失败：', err);
                };
                console.log('发送请求中......D');
                QgApi_1.default.sponsorHttps(param);
            });
        }
        catch (e) {
            console.error('后台登录错误:', e);
        }
    };
    /**
     * 登录vivo
     */
    JiuWuSDK.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                QgApi_1.default.login().then(function (token) {
                    if (token != false) {
                        _this.qgToken = token;
                        resolve(true);
                    }
                }, function () {
                    console.error('登录失败');
                });
            }
            catch (e) {
                console.log(' login error', e);
            }
        });
    };
    JiuWuSDK.headers = function () {
        return {
            'x-client': this.gameInfo.client,
            'x-token': this.gameInfo.token
        };
    };
    JiuWuSDK.qgToken = null;
    JiuWuSDK.initSDK = false;
    JiuWuSDK.url = {
        test: "https://api.jiuwugame.cn",
        host: "https://api.jiuwugame.cn",
    };
    JiuWuSDK.gameInfo = {
        gameId: 125,
        gameVersion: "20211026",
        client: '95e7b3d7beceea9a7b85a3235892e728',
        token: '$2a$10$gjXXqXHT85QpdRZSsS8QZuu6AnI5hJL/ZzyJ8yzMCit2ii7RhGd.W',
    };
    JiuWuSDK.launchData = {
        scene: '',
        query: null,
        shareTicket: '',
        referrerInfo: {
            appId: '',
            extraData: null
        }
    };
    return JiuWuSDK;
}());
exports.default = JiuWuSDK;

cc._RF.pop();