"use strict";
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