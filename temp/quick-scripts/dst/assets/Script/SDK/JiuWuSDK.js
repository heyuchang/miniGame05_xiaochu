
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SDK/JiuWuSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTREtcXEppdVd1U0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUN0QyxvREFBK0M7QUFFL0MsMkNBQXNDO0FBQ3RDLHNEQUFpRDtBQUVqRDtJQUFBO0lBMkhBLENBQUM7SUEvRmlCLHlCQUFnQixHQUE5QjtRQUFBLGlCQXdCQztRQXZCRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtvQkFDdEIsZ0JBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUV0QixJQUFJLE9BQU8sR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0Msa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsYUFBYTtvQkFDYixnQkFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRWpFLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBRTtvQkFFbkIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7b0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsRUFBRTtvQkFDQyxnQkFBTSxD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Q0FBQyxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFYSxnQkFBTyxHQUFyQjtRQUNJLE9BQU87WUFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7U0FDakMsQ0FBQTtJQUNMLENBQUM7SUF2SGEsZ0JBQU8sR0FBUSxJQUFJLENBQUM7SUFFcEIsZ0JBQU8sR0FBWSxLQUFLLENBQUM7SUFFekIsWUFBRyxHQUFHO1FBQ2hCLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsSUFBSSxFQUFFLDBCQUEwQjtLQUNuQyxDQUFBO0lBRWEsaUJBQVEsR0FBYTtRQUMvQixNQUFNLEVBQUUsR0FBRztRQUNYLFdBQVcsRUFBRSxVQUFVO1FBQ3ZCLE1BQU0sRUFBRSxrQ0FBa0M7UUFDMUMsS0FBSyxFQUFFLDhEQUE4RDtLQUN4RSxDQUFBO0lBRWEsbUJBQVUsR0FBZTtRQUNuQyxLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO1FBQ1gsV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCO0tBQ0osQ0FBQTtJQWlHTCxlQUFDO0NBM0hELEFBMkhDLElBQUE7a0JBM0hvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9Db21tb24vVG9vbHNcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgUWdBcGkgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQXBpXCI7XHJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuLi9TY2VuZS9Mb2FkaW5nXCI7XHJcbmltcG9ydCBMb2dNZ3IgZnJvbSBcIi4uL0NvbW1vbi9Mb2dNZ3JcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKaXVXdVNESyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBxZ1Rva2VuOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdFNESzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdXJsID0ge1xyXG4gICAgICAgIHRlc3Q6IFwiaHR0cHM6Ly9hcGkuaml1d3VnYW1lLmNuXCIsXHJcbiAgICAgICAgaG9zdDogXCJodHRwczovL2FwaS5qaXV3dWdhbWUuY25cIixcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdhbWVJbmZvOiBHYW1lSW5mbyA9IHtcclxuICAgICAgICBnYW1lSWQ6IDEyNSxcclxuICAgICAgICBnYW1lVmVyc2lvbjogXCIyMDIxMTAyNlwiLFxyXG4gICAgICAgIGNsaWVudDogJzk1ZTdiM2Q3YmVjZWVhOWE3Yjg1YTMyMzU4OTJlNzI4JyxcclxuICAgICAgICB0b2tlbjogJyQyYSQxMCRnalhYcVhIVDg1UXBkUlpTc1M4UVp1dTZBbkk1aEpML1p6eUo4eXpNQ2l0MmlpN1JoR2QuVycsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsYXVuY2hEYXRhOiBsYXVuY2hEYXRhID0ge1xyXG4gICAgICAgIHNjZW5lOiAnJyxcclxuICAgICAgICBxdWVyeTogbnVsbCxcclxuICAgICAgICBzaGFyZVRpY2tldDogJycsXHJcbiAgICAgICAgcmVmZXJyZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIGFwcElkOiAnJyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5TZXRfQVBJX0NvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5hbGxEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdtc1VzZXIgPSBHbG9iYWwuYWxsRGF0YS5kYXRhLmRhdGEuZ21zVXNlcjtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci51c2VySWQgPSBnbXNVc2VyLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5vcGVuSWQgPSBnbXNVc2VyLm9wZW5JZDtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5pc0F1dGggPSBnbXNVc2VyLmlzQXV0aDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLmNvbmZpZyA9IEpTT04ucGFyc2UoR2xvYmFsLmFsbERhdGEuZGF0YS5kYXRhLnZlcnNpb25Nb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUWdBcGkuY3JlYXRlQWR2KCkgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCfkuIDliIflsLHnu6ouLi4uLi4nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFNESyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+Wwsee7quWksei0pS4uLi4uLicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCO5Y+wIOazqOWGjOaIluiAheeZu+W9lVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YeG5aSH5Y+R6YCB6K+35rGCLi4uLi4uJylcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbTogcmVnaXNNZXNzYWdlID0gT2JqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axguS4rS4uLi4uLkEnKVxyXG4gICAgICAgICAgICAgICAgcGFyYW0udXJsID0gVG9vbHMuZ2V0SG9zdCgpICsgJy9hcGkvbG9naW4vbG9naW5zdW0nO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axguS4rS4uLi4uLkInKVxyXG4gICAgICAgICAgICAgICAgcGFyYW0uZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnFnVG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUlkOiB0aGlzLmdhbWVJbmZvLmdhbWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZVZhbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydElkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5nYW1lSW5mby5nYW1lVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5HpgIHor7fmsYLkuK0uLi4uLi5DJylcclxuICAgICAgICAgICAgICAgIHBhcmFtLm1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICAgICAgICAgIHBhcmFtLmhlYWRlciA9IHRoaXMuaGVhZGVycygpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uaGVhZGVyWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICAgICAgICAgIHBhcmFtLnN1Y2Nlc3MgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5ZCO5Y+w55m75b2V5rOo5YaM5oiQ5Yqf77yaJywgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75b2V6ZSZ6K+v77yaJywgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmZhaWwgPSAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y+R6YCB6K+35rGC5aSx6LSl77yaJywgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5HpgIHor7fmsYLkuK0uLi4uLi5EJylcclxuICAgICAgICAgICAgICAgIFFnQXBpLnNwb25zb3JIdHRwcyhwYXJhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5ZCO5Y+w55m75b2V6ZSZ6K+vOicsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeZu+W9lXZpdm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2dpbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUWdBcGkubG9naW4oKS50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbiAhPSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnFnVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75b2V5aSx6LSlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbG9naW4gZXJyb3InLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBoZWFkZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd4LWNsaWVudCc6IHRoaXMuZ2FtZUluZm8uY2xpZW50LFxyXG4gICAgICAgICAgICAneC10b2tlbic6IHRoaXMuZ2FtZUluZm8udG9rZW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIEdhbWVJbmZvIHtcclxuICAgIGdhbWVJZDogbnVtYmVyLFxyXG4gICAgZ2FtZVZlcnNpb246IHN0cmluZyxcclxuICAgIGNsaWVudDogc3RyaW5nLFxyXG4gICAgdG9rZW46IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgbGF1bmNoRGF0YSB7XHJcbiAgICBzY2VuZTogc3RyaW5nLFxyXG4gICAgcXVlcnk6IGFueSxcclxuICAgIHNoYXJlVGlja2V0OiBzdHJpbmcsXHJcbiAgICByZWZlcnJlckluZm86IHJlZmVycmVySW5mb1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlZmVycmVySW5mbyB7XHJcbiAgICBhcHBJZDogc3RyaW5nLFxyXG4gICAgZXh0cmFEYXRhOiBhbnlcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByZWdpc01lc3NhZ2Uge1xyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBkYXRhOiBvYmplY3QsXHJcbiAgICBtZXRob2Q6IHN0cmluZyxcclxuICAgIHN1Y2Nlc3M6IGFueSxcclxuICAgIGZhaWw6IGFueSxcclxuICAgIGhlYWRlcjogYW55XHJcbn1cclxuXHJcbiJdfQ==