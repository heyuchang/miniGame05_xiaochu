"use strict";
cc._RF.push(module, 'cdd4dv45ZdCF7WRpcG9r/94', 'QgApi');
// Script/Common/manage/Api/QgApi.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flyio_1 = require("flyio");
var QgRewardedAd_1 = require("./QgRewardedAd");
var QgIntersAd_1 = require("./QgIntersAd");
var QgBanner_1 = require("./QgBanner");
var Global_1 = require("../../Global");
var QgNative_1 = require("./QgNative");
var LogMgr_1 = require("../../LogMgr");
var QgApi = /** @class */ (function () {
    function QgApi() {
    }
    QgApi.createAdv = function () {
        if (!Global_1.default.isVivo)
            return;
        this.createVideo();
        this.createInters();
        this.createNative();
    };
    QgApi.createBanner = function () {
        if (!Global_1.default.isVivo)
            return;
        this.createBannerAd();
    };
    QgApi.createVideo = function () {
        var _this = this;
        QgRewardedAd_1.default.createRewardedVideo().then(function () {
            QgRewardedAd_1.default.loadRewardedVideo().then();
        }).catch(function () {
            setTimeout(function () {
                if (!QgRewardedAd_1.default.isLoad_Rewarded) {
                    _this.createVideo();
                }
            }, 5000);
        });
    };
    QgApi.createInters = function () {
        var _this = this;
        QgIntersAd_1.default.createInters().then().catch(function () {
            setTimeout(function () {
                if (!QgIntersAd_1.default.isLoad_Inters) {
                    _this.createInters();
                }
            }, 5000);
        });
    };
    QgApi.createNative = function () {
        var _this = this;
        QgNative_1.default.createNative().then(function () {
            QgNative_1.default.loadNative().then();
        }).catch(function () {
            setTimeout(function () {
                if (!QgNative_1.default.isLoad_Native) {
                    _this.createNative();
                }
            }, 5000);
        });
    };
    QgApi.createBannerAd = function () {
        var _this = this;
        QgBanner_1.default.createBanner().then(function () {
            if (Global_1.default.config.gameConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
        }).catch(function () {
            setTimeout(function () {
                if (!QgBanner_1.default.isLoad) {
                    _this.createBannerAd();
                }
            }, 5000);
        });
    };
    /**
     * 发起HTTPS网络请求
     */
    QgApi.sponsorHttps = function (options) {
        if (!options.hasOwnProperty("url")) {
            console.warn("request param  url is  null");
            return;
        }
        var url = options.url;
        var data = null;
        var param = {};
        if (!options.hasOwnProperty("method")) {
            param.method = "GET";
        }
        else {
            param.method = options.method;
        }
        if (options.hasOwnProperty("data")) {
            data = options.data;
        }
        if (options.hasOwnProperty("timeOut")) {
            param.timeout = options.timeout;
        }
        if (options.hasOwnProperty("header")) {
            param.headers = options.header;
        }
        param.pareseJson = true;
        flyio_1.default.request(url, data, param).then(function (data) {
            if (options.hasOwnProperty("success")) {
                options.success(data);
            }
        }).catch(function (e) {
            if (options.hasOwnProperty("fail")) {
                options.fail(data);
            }
        });
    };
    /**
     * 登录
     */
    QgApi.login = function () {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            if (qg.getSystemInfoSync().platformVersionCode >= 1063) {
                // @ts-ignore
                window.qg.login().then(function (res) {
                    if (res.data.token) {
                        console.log('登录成功!!', res.data.token);
                        resolve(res.data.token);
                    }
                }, function (err) {
                    resolve(false);
                    console.error('登录失败' + JSON.stringify(err));
                });
            }
            else {
                resolve(false);
                console.error('版本号过低，无法登录');
            }
        });
    };
    /**
     * 分享
     */
    QgApi.share = function () {
        // @ts-ignore
        qg.share();
    };
    /**
     * 判断是否已创建桌面图标
     */
    QgApi.judgeShortIcon = function () {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            qg.hasShortcutInstalled({
                success: function (res) {
                    if (res) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                },
                fail: function (err) {
                    LogMgr_1.default.log(err);
                    reject(false);
                }
            });
        });
    };
    /**
     * 添加桌面图标
     */
    QgApi.addShortcutIcon = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.judgeShortIcon().then(function (res) {
                if (res) {
                    // @ts-ignore
                    qg.installShortcut({
                        message: '创建桌面游戏图标，快捷进入游戏！',
                        success: function () {
                            LogMgr_1.default.log('创建成功');
                            resolve(true);
                        },
                        fail: function () {
                            LogMgr_1.default.error('创建失败');
                            resolve(false);
                        }
                    });
                }
                else {
                    resolve(false);
                    return;
                }
            }).catch(function () {
                resolve(false);
                return;
            });
        });
    };
    return QgApi;
}());
exports.default = QgApi;

cc._RF.pop();