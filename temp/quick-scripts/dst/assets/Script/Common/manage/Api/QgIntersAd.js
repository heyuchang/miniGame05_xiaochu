
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgIntersAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b70eaGfrLZBlJ9Qn43+9fKr', 'QgIntersAd');
// Script/Common/manage/Api/QgIntersAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgIntersAd = /** @class */ (function () {
    function QgIntersAd() {
    }
    /**
     * 创建插屏
     */
    QgIntersAd.createInters = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建插屏');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.interstitialAdId);
            if (!unitId) {
                LogMgr_1.default.error('插屏Id获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.initInterstitialAd = window.qg.createInterstitialAd({ adUnitId: unitId });
            _this.initInterstitialAd.onError(function (err) {
                LogMgr_1.default.error('插屏错误onError:', err);
            });
            _this.initInterstitialAd.onLoad(function (res) {
                _this.isLoad_Inters = true;
                LogMgr_1.default.log('插屏广告加载完成-onload触发', JSON.stringify(res));
            });
            _this.initInterstitialAd.onClose(function () {
                _this.isLoad_Inters = false;
                LogMgr_1.default.log('插屏关闭>>>>>>');
                _this.createInters().then();
            });
            resolve(true);
        });
    };
    /**
     * 展示插屏
     */
    QgIntersAd.showInters = function () {
        if (!this.isLoad_Inters || !this.initInterstitialAd) {
            LogMgr_1.default.error('插屏加载中......', this.isLoad_Inters, 'rewardedAd:', this.initInterstitialAd);
            this.createInters().then().catch();
            return;
        }
        this.initInterstitialAd.show().then(function () {
        }).catch(function (err) {
            LogMgr_1.default.error('插屏广告展示失败', JSON.stringify(err));
        });
    };
    QgIntersAd.isLoad_Inters = false;
    return QgIntersAd;
}());
exports.default = QgIntersAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0ludGVyc0FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLHVDQUFrQztBQUNsQyx1Q0FBa0M7QUFFbEM7SUFBQTtJQThEQSxDQUFDO0lBekRHOztPQUVHO0lBQ1csdUJBQVksR0FBMUI7UUFBQSxpQkFvQ0M7UUFuQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRS9CLElBQUksQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFO2dCQUNmLE9BQU07YUFDVDtZQUVELElBQUksTUFBTSxHQUFHLGVBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFBO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUU7Z0JBQ2YsT0FBTTthQUNUO1lBRUQsYUFBYTtZQUNiLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFN0UsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ2hDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQTtZQUVGLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO2dCQUMvQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFBO1lBRUYsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLGdCQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFFO2dCQUMxQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUU7WUFDaEMsQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDVyxxQkFBVSxHQUF4QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2pELGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUU7WUFDcEMsT0FBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztRQUVwQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUExRGEsd0JBQWEsR0FBWSxLQUFLLENBQUM7SUEyRGpELGlCQUFDO0NBOURELEFBOERDLElBQUE7a0JBOURvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0ludGVyc0FkIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbml0SW50ZXJzdGl0aWFsQWQ6IGFueTsgLy/mj5LlsY/lr7nosaFcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNMb2FkX0ludGVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65o+S5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlSW50ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pIHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign5b2T5YmN6Z2edml2b+W5s+WPsO+8jOaXoOazleWIm+W7uuaPkuWxjycpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHVuaXRJZCA9IFRvb2xzLmdldFJhbmRvbUJ5QXJyYXkoR2xvYmFsLmNvbmZpZy5hZHZlcnRpc2luZ0NvbmZpZy5pbnRlcnN0aXRpYWxBZElkKTtcclxuICAgICAgICAgICAgaWYgKCF1bml0SWQpIHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign5o+S5bGPSWTojrflj5blpLHotKXvvJonICsgdW5pdElkKVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLmluaXRJbnRlcnN0aXRpYWxBZCA9IHdpbmRvdy5xZy5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7YWRVbml0SWQ6IHVuaXRJZH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyKSA9PiB7IC8v55uR5ZCs5o+S5bGP6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+aPkuWxj+mUmeivr29uRXJyb3I6JywgZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEludGVyc3RpdGlhbEFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZF9JbnRlcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5o+S5bGP5bm/5ZGK5Yqg6L295a6M5oiQLW9ubG9hZOinpuWPkScsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQub25DbG9zZSgoKSA9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX0ludGVycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5o+S5bGP5YWz6ZetPj4+Pj4+JykgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnMoKS50aGVuKCkgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLrmj5LlsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaG93SW50ZXJzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRfSW50ZXJzIHx8ICF0aGlzLmluaXRJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+aPkuWxj+WKoOi9veS4rS4uLi4uLicsdGhpcy5pc0xvYWRfSW50ZXJzLCdyZXdhcmRlZEFkOicsdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVycygpLnRoZW4oKS5jYXRjaCgpIDtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRJbnRlcnN0aXRpYWxBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfmj5LlsY/lub/lkYrlsZXnpLrlpLHotKUnLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19