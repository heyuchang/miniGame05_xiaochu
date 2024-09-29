"use strict";
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