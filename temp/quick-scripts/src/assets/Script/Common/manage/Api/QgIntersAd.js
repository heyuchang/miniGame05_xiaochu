"use strict";
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