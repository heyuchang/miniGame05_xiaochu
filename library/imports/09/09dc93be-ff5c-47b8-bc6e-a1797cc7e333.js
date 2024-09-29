"use strict";
cc._RF.push(module, '09dc9O+/1xHuLxuoXl8x+Mz', 'Global');
// Script/Common/Global.ts

"use strict";
/**
 * 全局变量
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.isVivo = false;
    Global.fromAppId = '';
    Global.config = {
        homeConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        gameConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        endConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        advertisingConfig: {
            rewardedVideoAdId: [
                "180d657c8ca14c4ea2089385ab85cc4c"
            ],
            interstitialAdId: [
                "e1a55af9ad0240d58063373c019eac8b"
            ],
            bannerAdId: [
                "e3c3b01217a843fe8c695ec0ad053ed8"
            ],
            nativeAdId: [
                "d8bfb3dc126748388d86311af35c4d00"
            ]
        },
        gameInfo: {
            animation: 0.5,
            maxStamina: 10,
            autoAddStaminaTime: 1,
            autoAddStaminaNum: 1
        },
        addInfo: {
            gold: 100,
            diamond: 2,
            stamina: 2
        },
        bannerRefreshTime: 10,
        isLog: 1,
    };
    return Global;
}());
exports.default = Global;

cc._RF.pop();