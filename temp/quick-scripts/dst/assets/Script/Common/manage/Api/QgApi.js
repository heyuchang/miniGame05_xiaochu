
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgApi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUF3QjtBQUN4QiwrQ0FBMEM7QUFDMUMsMkNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyx1Q0FBa0M7QUFDbEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBOExBLENBQUM7SUEzTGlCLGVBQVMsR0FBdkI7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNO1lBQUMsT0FBUTtRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFFO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBRTtJQUN6QixDQUFDO0lBRWEsa0JBQVksR0FBMUI7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNO1lBQUMsT0FBUTtRQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUU7SUFDM0IsQ0FBQztJQUVjLGlCQUFXLEdBQTFCO1FBQUEsaUJBVUM7UUFURyxzQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3BDLHNCQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLHNCQUFZLENBQUMsZUFBZSxFQUFFO29CQUMvQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7aUJBQ3ZCO1lBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ1gsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRWMsa0JBQVksR0FBM0I7UUFBQSxpQkFRQztRQVBHLG9CQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25DLFVBQVUsQ0FBQztnQkFDUCxJQUFJ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O0FBQUQsQ0E5TEEsQUE4TEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmbHkgZnJvbSBcImZseWlvXCI7XHJcbmltcG9ydCBRZ1Jld2FyZGVkQWQgZnJvbSBcIi4vUWdSZXdhcmRlZEFkXCI7XHJcbmltcG9ydCBRZ0ludGVyc0FkIGZyb20gXCIuL1FnSW50ZXJzQWRcIjtcclxuaW1wb3J0IFFnQmFubmVyIGZyb20gXCIuL1FnQmFubmVyXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0dsb2JhbFwiO1xyXG5pbXBvcnQgUWdOYXRpdmUgZnJvbSBcIi4vUWdOYXRpdmVcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0FwaSB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWR2ICgpIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pcmV0dXJuIDtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZGVvKCkgO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJzKCkgO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlKCkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQmFubmVyICgpIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pcmV0dXJuIDtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJhbm5lckFkKCkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVZpZGVvKCkge1xyXG4gICAgICAgIFFnUmV3YXJkZWRBZC5jcmVhdGVSZXdhcmRlZFZpZGVvKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBRZ1Jld2FyZGVkQWQubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKClcclxuICAgICAgICB9KS5jYXRjaCgoKT0+e1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIVFnUmV3YXJkZWRBZC5pc0xvYWRfUmV3YXJkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZGVvKCkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LDUwMDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVJbnRlcnMoKSB7XHJcbiAgICAgICAgUWdJbnRlcnNBZC5jcmVhdGVJbnRlcnMoKS50aGVuKCkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFRZ0ludGVyc0FkLmlzTG9hZF9JbnRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVycygpIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSw1MDAwKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlTmF0aXZlKCkge1xyXG4gICAgICAgIFFnTmF0aXZlLmNyZWF0ZU5hdGl2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgUWdOYXRpdmUubG9hZE5hdGl2ZSgpLnRoZW4oKSA7XHJcbiAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFRZ05hdGl2ZS5pc0xvYWRfTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmUoKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUJhbm5lckFkKCkge1xyXG4gICAgICAgIFFnQmFubmVyLmNyZWF0ZUJhbm5lcigpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuZ2FtZUNvbmZpZy5iYW5uZXJTaG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLnNob3dCYW5uZXIoKSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoKT0+e1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIVFnQmFubmVyLmlzTG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFubmVyQWQoKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6LW3SFRUUFPnvZHnu5zor7fmsYJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzcG9uc29ySHR0cHMob3B0aW9ucykge1xyXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInVybFwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJyZXF1ZXN0IHBhcmFtICB1cmwgaXMgIG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cmwgPSBvcHRpb25zLnVybFxyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSBudWxsXHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcIm1ldGhvZFwiKSkge1xyXG4gICAgICAgICAgICBwYXJhbS5tZXRob2QgPSBcIkdFVFwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW0ubWV0aG9kID0gb3B0aW9ucy5tZXRob2RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSkge1xyXG4gICAgICAgICAgICBkYXRhID0gb3B0aW9ucy5kYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInRpbWVPdXRcIikpIHtcclxuICAgICAgICAgICAgcGFyYW0udGltZW91dCA9IG9wdGlvbnMudGltZW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJoZWFkZXJcIikpIHtcclxuICAgICAgICAgICAgcGFyYW0uaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtLnBhcmVzZUpzb24gPSB0cnVlXHJcblxyXG4gICAgICAgIGZseS5yZXF1ZXN0KHVybCwgZGF0YSwgcGFyYW0pLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwic3VjY2Vzc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKGRhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJmYWlsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZhaWwoZGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55m75b2VXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9naW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAocWcuZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlID49IDEwNjMpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5xZy5sb2dpbigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5oiQ5YqfISEnLCByZXMuZGF0YS50b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eZu+W9leWksei0pScgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eJiOacrOWPt+i/h+S9ju+8jOaXoOazleeZu+W9lScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5LqrXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhcmUoKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHFnLnNoYXJlKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuW3suWIm+W7uuahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlU2hvcnRJY29uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiAocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwgOiAoZXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ01nci5sb2coZXJyKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZFNob3J0Y3V0SWNvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmp1ZGdlU2hvcnRJY29uKCkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBxZy5pbnN0YWxsU2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogJ+WIm+W7uuahjOmdoua4uOaIj+Wbvuagh++8jOW/q+aNt+i/m+WFpea4uOaIj++8gScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5Yib5bu65oiQ5YqfJykgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfliJvlu7rlpLHotKUnKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==