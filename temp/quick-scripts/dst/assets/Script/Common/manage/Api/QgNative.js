
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgNative.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a17f9wr1ThJ+I6MpRy1bdby', 'QgNative');
// Script/Common/manage/Api/QgNative.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgNative = /** @class */ (function () {
    function QgNative() {
    }
    /**
     * 创建原生广告
     */
    QgNative.createNative = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建原生广告');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.nativeAdId);
            if (!unitId) {
                LogMgr_1.default.error('原生ID获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.nativeAd = qg.createNativeAd({ posId: unitId });
            _this.nativeAd.onLoad(function (res) {
                if (res && res.adList) {
                    LogMgr_1.default.log('原生广告拉取成功>>>>>>', res.adList);
                    _this.nativeMessage = res.adList[0];
                    _this.nativeResolve(res.adList[0]);
                    _this.isLoad_Native = true;
                }
                _this.nativeResolve = null;
            });
            resolve(true);
        });
    };
    /**
     * 加载原生广告
     */
    QgNative.loadNative = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.nativeResolve = resolve;
            if (!_this.nativeAd) {
                LogMgr_1.default.error('原生广告未创建，无法加载......');
                _this.createNative().then(function () { }).catch();
                _this.nativeResolve(false);
                _this.nativeResolve = null;
                return;
            }
            if (_this.nativeMessage != null) {
                _this.nativeResolve(_this.nativeMessage);
                _this.nativeResolve = null;
            }
            _this.nativeAd.load().then(function () {
            }).catch(function () {
                _this.nativeResolve(false);
            });
        });
    };
    /**
     * 上报原生广告曝光
     */
    QgNative.repAdShow = function (adId) {
        if (!this.nativeAd)
            return;
        LogMgr_1.default.log('上报用户曝光>>>>>>');
        this.nativeAd.reportAdShow({
            adId: adId
        });
    };
    /**
     * 上报原生广告点击
     */
    QgNative.repAdClick = function (adId) {
        if (!this.nativeAd)
            return;
        LogMgr_1.default.log('上报用户点击>>>>>>');
        this.nativeAd.reportAdClick({
            adId: adId
        });
    };
    /**
     * 重新拉去广告信息
     */
    QgNative.anewLoad = function () {
        this.nativeMessage = null;
        this.isLoad_Native = false;
        this.loadNative().then();
    };
    QgNative.isLoad_Native = false;
    QgNative.nativeResolve = null;
    QgNative.nativeMessage = null;
    return QgNative;
}());
exports.default = QgNative;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ05hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyx1Q0FBa0M7QUFDbEMsdUNBQWtDO0FBRWxDO0lBQUE7SUFzR0EsQ0FBQztJQTlGRzs7T0FFRztJQUNXLHFCQUFZLEdBQTFCO1FBQUEsaUJBK0JDO1FBOUJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUUvQixJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRTtnQkFDZixPQUFNO2FBQ1Q7WUFFRCxJQUFJLE1BQU0sR0FBRyxlQUFLLENBQUMsZ0JBQWdCLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRTtnQkFDZixPQUFNO2FBQ1Q7WUFFRCxhQUFhO1lBQ2IsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFHLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFcEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO2dCQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNuQixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUU7b0JBQ3pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBRTtvQkFDcEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUU7b0JBQ25DLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFFO2lCQUM5QjtnQkFDRCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBRTtZQUMvQixDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNXLG1CQUFVLEdBQXhCO1FBQUEsaUJBc0JDO1FBckJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2dCQUNsQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUU7Z0JBQzFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUU7Z0JBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFFO2dCQUMzQixPQUFNO2FBQ1Q7WUFFRCxJQUFJLEtBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO2dCQUM1QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBRTtnQkFDeEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUU7YUFDOUI7WUFFRCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUUxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ0wsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBRTtZQUMvQixDQUFDLENBQUMsQ0FBRTtRQUNSLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ1csa0JBQVMsR0FBdkIsVUFBeUIsSUFBSTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFRO1FBQzVCLGdCQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFFO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ1csbUJBQVUsR0FBeEIsVUFBMEIsSUFBSTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFRO1FBQzVCLGdCQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ1csaUJBQVEsR0FBdEI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBRTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBRTtRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUU7SUFDOUIsQ0FBQztJQWpHYSxzQkFBYSxHQUFZLEtBQUssQ0FBQztJQUM5QixzQkFBYSxHQUFHLElBQUksQ0FBRTtJQUN2QixzQkFBYSxHQUFTLElBQUksQ0FBRTtJQWlHOUMsZUFBQztDQXRHRCxBQXNHQyxJQUFBO2tCQXRHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb29scyBmcm9tIFwiLi4vLi4vVG9vbHNcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vR2xvYmFsXCI7XHJcbmltcG9ydCBMb2dNZ3IgZnJvbSBcIi4uLy4uL0xvZ01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUWdOYXRpdmUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5hdGl2ZUFkOiBhbnk7IC8v5Y6f55Sf5bm/5ZGK5a+56LGhXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzTG9hZF9OYXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc3RhdGljIG5hdGl2ZVJlc29sdmUgPSBudWxsIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbmF0aXZlTWVzc2FnZSA6IGFueSA9IG51bGwgO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuWOn+eUn+W5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU5hdGl2ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCflvZPliY3pnZ52aXZv5bmz5Y+w77yM5peg5rOV5Yib5bu65Y6f55Sf5bm/5ZGKJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5pdElkID0gVG9vbHMuZ2V0UmFuZG9tQnlBcnJheShHbG9iYWwuY29uZmlnLmFkdmVydGlzaW5nQ29uZmlnLm5hdGl2ZUFkSWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVuaXRJZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfljp/nlJ9JROiOt+WPluWksei0pe+8micgKyB1bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe3Bvc0lkIDogdW5pdElkfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9uTG9hZCgocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5Y6f55Sf5bm/5ZGK5ouJ5Y+W5oiQ5YqfPj4+Pj4+JyxyZXMuYWRMaXN0KSA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVNZXNzYWdlID0gcmVzLmFkTGlzdFswXSA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVSZXNvbHZlKHJlcy5hZExpc3RbMF0pIDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZF9OYXRpdmUgPSB0cnVlIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZSA9IG51bGwgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55Sf5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZE5hdGl2ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUgPSByZXNvbHZlIDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+WOn+eUn+W5v+WRiuacquWIm+W7uu+8jOaXoOazleWKoOi9vS4uLi4uLicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZSgpLnRoZW4oKCk9Pnt9KS5jYXRjaCgpIDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVSZXNvbHZlID0gbnVsbCA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlTWVzc2FnZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUodGhpcy5uYXRpdmVNZXNzYWdlKSA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUgPSBudWxsIDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5sb2FkKCkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICB9KSA7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWOn+eUn+W5v+WRiuabneWFiVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcEFkU2hvdyAoYWRJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5uYXRpdmVBZCkgcmV0dXJuIDtcclxuICAgICAgICBMb2dNZ3IubG9nKCfkuIrmiqXnlKjmiLfmm53lhYk+Pj4+Pj4nKVxyXG4gICAgICAgIHRoaXMubmF0aXZlQWQucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgYWRJZDogYWRJZFxyXG4gICAgICAgIH0pIDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWOn+eUn+W5v+WRiueCueWHu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcEFkQ2xpY2sgKGFkSWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubmF0aXZlQWQpIHJldHVybiA7XHJcbiAgICAgICAgTG9nTWdyLmxvZygn5LiK5oql55So5oi354K55Ye7Pj4+Pj4+JylcclxuICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiBhZElkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOaLieWOu+W5v+WRiuS/oeaBr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFuZXdMb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZU1lc3NhZ2UgPSBudWxsIDtcclxuICAgICAgICB0aGlzLmlzTG9hZF9OYXRpdmUgPSBmYWxzZSA7XHJcbiAgICAgICAgdGhpcy5sb2FkTmF0aXZlKCkudGhlbigpIDtcclxuICAgIH1cclxuXHJcbn0iXX0=