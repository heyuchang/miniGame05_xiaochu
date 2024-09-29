
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgRewardedAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '358caMktlFHz7wtU4673p9v', 'QgRewardedAd');
// Script/Common/manage/Api/QgRewardedAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgRewardedAd = /** @class */ (function () {
    function QgRewardedAd() {
    }
    QgRewardedAd.createRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建视频');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.rewardedVideoAdId);
            if (!unitId) {
                LogMgr_1.default.error('视频ID获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.rewardedAd = window.qg.createRewardedVideoAd({ posId: unitId });
            _this.rewardedAd.onError(function (err) {
                LogMgr_1.default.error("激励视频广告错误", err);
                _this.rewardedVideoResolve(2);
                _this.rewardedVideoResolve = null;
            });
            _this.rewardedAd.onClose(function (isEnded) {
                if (isEnded.isEnded) {
                    _this.rewardedVideoResolve(1); //播放完成
                }
                else {
                    _this.rewardedVideoResolve(3); //中途关闭
                }
                _this.isLoad_Rewarded = false;
                _this.rewardedVideoResolve = null;
                _this.loadRewardedVideo().then();
            });
            _this.rewardedAd.onLoad(function (res) {
                _this.isLoad_Rewarded = true;
                LogMgr_1.default.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            });
            resolve(true);
        });
    };
    /**
     * 加载视频
     */
    QgRewardedAd.loadRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.rewardedAd) {
                LogMgr_1.default.error('视频未创建>>>无法load()');
                _this.createRewardedVideo().then();
                reject(false);
                return;
            }
            _this.rewardedAd.load().then(function () {
                resolve(true);
            }, function (error) {
                LogMgr_1.default.error('视频加载失败：' + error);
                reject(false);
            });
        });
    };
    /**
     * show视频
     */
    QgRewardedAd.showRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rewardedVideoResolve = resolve;
            if (!_this.isLoad_Rewarded) {
                _this.rewardedVideoResolve(2);
                _this.loadRewardedVideo().then();
                LogMgr_1.default.error('视频加载中......');
                return;
            }
            _this.rewardedAd.show().then(function () {
            }).catch(function (err) {
                LogMgr_1.default.error('激励视频广告展示失败', JSON.stringify(err));
            });
        });
    };
    QgRewardedAd.isLoad_Rewarded = false;
    QgRewardedAd.rewardedVideoResolve = null; //视频状态返回 1 : 播放完成， 2 : 播放错误, 3 : 播放中途关闭
    return QgRewardedAd;
}());
exports.default = QgRewardedAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ1Jld2FyZGVkQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBMEZBLENBQUM7SUFwRmlCLGdDQUFtQixHQUFqQztRQUFBLGlCQTJDQztRQTFDRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFL0IsSUFBSSxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFFO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxNQUFNLEdBQUcsZUFBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxPQUFNO2FBQ1Q7WUFFRCxhQUFhO1lBQ2IsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFbkUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUN2QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNyQyxDQUFD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IGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ1Jld2FyZGVkQWQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJld2FyZGVkQWQ6IGFueTsgLy/op4bpopHlr7nosaFcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNMb2FkX1Jld2FyZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXdhcmRlZFZpZGVvUmVzb2x2ZSA9IG51bGw7IC8v6KeG6aKR54q25oCB6L+U5ZueIDEgOiDmkq3mlL7lrozmiJDvvIwgMiA6IOaSreaUvumUmeivrywgMyA6IOaSreaUvuS4remAlOWFs+mXrVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUmV3YXJkZWRWaWRlbygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+W9k+WJjemdnnZpdm/lubPlj7DvvIzml6Dms5XliJvlu7rop4bpopEnKSA7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bml0SWQgPSBUb29scy5nZXRSYW5kb21CeUFycmF5KEdsb2JhbC5jb25maWcuYWR2ZXJ0aXNpbmdDb25maWcucmV3YXJkZWRWaWRlb0FkSWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVuaXRJZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfop4bpopFJROiOt+WPluWksei0pe+8micgKyB1bml0SWQpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkID0gd2luZG93LnFnLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7cG9zSWQ6IHVuaXRJZH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcihcIua/gOWKseinhumikeW5v+WRiumUmeivr1wiLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkZWRWaWRlb1Jlc29sdmUgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5vbkNsb3NlKChpc0VuZGVkKSA9PiB7IC8v5byA5ZCv5YWz6Zet55uR5ZCsXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbmRlZC5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgxKTsgLy/mkq3mlL7lrozmiJBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgzKTsgLy/kuK3pgJTlhbPpl61cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX1Jld2FyZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW9SZXNvbHZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKCkgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkLm9uTG9hZCgocmVzKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX1Jld2FyZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIExvZ01nci5sb2coJ+a/gOWKseinhumikeW5v+WRiuWKoOi9veWujOaIkC1vbmxvYWTop6blj5EnLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veinhumikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRSZXdhcmRlZFZpZGVvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXdhcmRlZEFkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+inhumikeacquWIm+W7uj4+PuaXoOazlWxvYWQoKScpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJld2FyZGVkVmlkZW8oKS50aGVuKClcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign6KeG6aKR5Yqg6L295aSx6LSl77yaJyArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSkgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2hvd+inhumikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dSZXdhcmRlZFZpZGVvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW9SZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9hZF9SZXdhcmRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKCkgO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfop4bpopHliqDovb3kuK0uLi4uLi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+a/gOWKseinhumikeW5v+WRiuWxleekuuWksei0pScsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=