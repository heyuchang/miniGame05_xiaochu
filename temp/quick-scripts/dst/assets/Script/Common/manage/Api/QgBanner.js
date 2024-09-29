
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c28cdkb3kBCIrhAgkSRKQn3', 'QgBanner');
// Script/Common/manage/Api/QgBanner.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../../../Scene/Game");
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgBanner = /** @class */ (function () {
    function QgBanner() {
    }
    /**
     * 创建banner
     */
    QgBanner.createBanner = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建Banner');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.bannerAdId);
            if (!unitId) {
                LogMgr_1.default.error('BannerId获取失败:' + unitId);
                reject(false);
                return;
            }
            var banner_exm = Game_1.default.Ins.banner;
            var size = Tools_1.default.getRealSize(banner_exm);
            var refreshTime = 30;
            if (Global_1.default.config.bannerRefreshTime >= 30) {
                refreshTime = Global_1.default.config.bannerRefreshTime;
            }
            var bannerParam = {
                adUnitId: unitId,
                style: {
                    left: size.left,
                    top: size.top,
                },
                adIntervals: refreshTime,
            };
            // @ts-ignore
            _this.bannerAd = qg.createBannerAd(bannerParam);
            _this.bannerAd.onLoad(function (res) {
                _this.isLoad = true;
                LogMgr_1.default.log('Banner广告加载完成-onload触发', JSON.stringify(res));
                resolve(true);
            });
            _this.bannerAd.onClose(function () {
                LogMgr_1.default.log('Banner关闭......');
            });
            _this.bannerAd.onError(function (err) {
                LogMgr_1.default.error('Banner错误:err:', err);
                reject(false);
            });
        });
    };
    /**
     *展示Banner
     */
    QgBanner.showBanner = function () {
        var _this = this;
        if (!this.isLoad) {
            this.createBanner().then();
            LogMgr_1.default.error('Banner未创建或未加载，无法显示');
            return;
        }
        if (this.isShow) {
            LogMgr_1.default.error('Banner已显示，无法重复显示');
            return;
        }
        this.bannerAd.show().then(function () {
            _this.isShow = true;
        }).catch(function (err) {
            LogMgr_1.default.error('Banner显示错误:', err);
        });
    };
    /**
     * 隐藏Banner
     */
    QgBanner.hideBanner = function () {
        if (!this.isLoad) {
            LogMgr_1.default.error('Banner未创建或未加载，无法隐藏');
            return;
        }
        if (!this.isShow) {
            LogMgr_1.default.error('Banner未显示，无需隐藏');
            return;
        }
        this.bannerAd.hide();
        this.isShow = false;
    };
    /**
     * 销毁Banner实例
     */
    QgBanner.destroyBanner = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.bannerAd) {
                LogMgr_1.default.error('Banner未创建>>>无法destroy()');
                resolve(false);
                return;
            }
            _this.bannerAd.destroy();
            _this.isLoad = false;
            _this.isShow = false;
            resolve(true);
        });
    };
    /**
     * 刷新Banner
     */
    QgBanner.cutBanner = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.destroyBanner().then(function (res) {
                if (res) {
                    _this.createBanner().then(function () {
                        _this.showBanner();
                    });
                }
                resolve(true);
            });
        });
    };
    QgBanner.isLoad = false; //加载状态
    QgBanner.isShow = false; //显示状态
    return QgBanner;
}());
exports.default = QgBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0Jhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2QyxxQ0FBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBNklBLENBQUM7SUFySUc7O09BRUc7SUFDVyxxQkFBWSxHQUExQjtRQUFBLGlCQW9EQztRQW5ERyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFL0IsSUFBSSxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxNQUFNLEdBQUcsZUFBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxVQUFVLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7WUFDaEMsSUFBSSxJQUFJLEdBQUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUU7WUFFdEIsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZDLFdBQVcsR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBRTthQUNsRDtZQUVELElBQUksV0FBVyxHQUFHO2dCQUNkLFFBQVEs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QUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDVyxrQkFBUyxHQUF2QjtRQUFBLGlCQVdDO1FBVkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQzFCLElBQUksR0FBRyxFQUFFO29CQUNMLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBeklhLGVBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQyxNQUFNO0lBSS9CLGVBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQyxNQUFNO0lBdUlqRCxlQUFDO0NBN0lELEFBNklDLElBQUE7a0JBN0lvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWUgZnJvbSBcIi4uLy4uLy4uL1NjZW5lL0dhbWVcIjtcclxuaW1wb3J0IFRvb2xzIGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0Jhbm5lciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0xvYWQ6IGJvb2xlYW4gPSBmYWxzZTsgLy/liqDovb3nirbmgIFcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiYW5uZXJBZDogYW55OyAvL2Jhbm5lcuWvueixoVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTaG93OiBib29sZWFuID0gZmFsc2U7IC8v5pi+56S654q25oCBXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7piYW5uZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCflvZPliY3pnZ52aXZv5bmz5Y+w77yM5peg5rOV5Yib5bu6QmFubmVyJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bml0SWQgPSBUb29scy5nZXRSYW5kb21CeUFycmF5KEdsb2JhbC5jb25maWcuYWR2ZXJ0aXNpbmdDb25maWcuYmFubmVyQWRJZCk7XHJcbiAgICAgICAgICAgIGlmICghdW5pdElkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcklk6I635Y+W5aSx6LSlOicgKyB1bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmFubmVyX2V4bSA9IEdhbWUuSW5zLmJhbm5lclxyXG4gICAgICAgICAgICBsZXQgc2l6ZSA9IFRvb2xzLmdldFJlYWxTaXplKGJhbm5lcl9leG0pXHJcbiAgICAgICAgICAgIGxldCByZWZyZXNoVGltZSA9IDMwIDtcclxuXHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmJhbm5lclJlZnJlc2hUaW1lID49IDMwKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoVGltZSA9IEdsb2JhbC5jb25maWcuYmFubmVyUmVmcmVzaFRpbWUgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmFubmVyUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdW5pdElkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzaXplLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaXplLnRvcCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhZEludGVydmFsczogcmVmcmVzaFRpbWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQgPSBxZy5jcmVhdGVCYW5uZXJBZChiYW5uZXJQYXJhbSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCdCYW5uZXLlub/lkYrliqDovb3lrozmiJAtb25sb2Fk6Kem5Y+RJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkNsb3NlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCdCYW5uZXLlhbPpl60uLi4uLi4nKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcignQmFubmVy6ZSZ6K+vOmVycjonLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq5bGV56S6QmFubmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0Jhbm5lcigpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9hZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJhbm5lcigpLnRoZW4oKTtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmnKrliJvlu7rmiJbmnKrliqDovb3vvIzml6Dms5XmmL7npLonKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvdykge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuW3suaYvuekuu+8jOaXoOazlemHjeWkjeaYvuekuicpIDtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmmL7npLrplJnor686JywgZXJyKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj0Jhbm5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpZGVCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9hZCkge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuacquWIm+W7uuaIluacquWKoOi9ve+8jOaXoOazlemakOiXjycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvdykge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuacquaYvuekuu+8jOaXoOmcgOmakOiXjycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgUJhbm5lcuWunuS+i1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlc3Ryb3lCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmnKrliJvlu7o+Pj7ml6Dms5VkZXN0cm95KCknKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrBCYW5uZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXRCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJhbm5lcigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFubmVyKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn0iXX0=