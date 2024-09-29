"use strict";
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