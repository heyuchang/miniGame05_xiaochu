
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXEdsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7O0FBRUg7SUFBQTtJQWdGQSxDQUFDO0lBL0VpQixhQUFNLEdBQUcsS0FBSyxDQUFDO0lBTWYsZ0JBQVMsR0FBVyxFQUFFLENBQUM7SUFFdkIsYUFBTSxHQUFHO1FBQ25CLFVBQVUsRUFBRTtZQUNSLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELFVBQVUsRUFBRTtZQUNSLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELGlCQUFpQixFQUFFO1lBQ2YsaUJBQWlCLEVBQUU7Z0JBQ2Ysa0NBQWtDO2FBQ3JDO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2Qsa0NBQWtDO2FBQ3JDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLGtDQUFrQzthQUNyQztZQUNELFVBQVUsRUFBRTtnQkFDUixrQ0FBa0M7YUFDckM7U0FDSjtRQUNELFFBQVEsRUFBRTtZQUNOLFNBQVMsRUFBRSxHQUFHO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxrQkFBa0IsRUFBRSxDQUFDO1lBQ3JCLGlCQUFpQixFQUFFLENBQUM7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsR0FBRztZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELGlCQUFpQixFQUFFLEVBQUU7UUFDckIsS0FBSyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBQ04sYUFBQztDQWhGRCxBQWdGQyxJQUFBO2tCQWhGb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlhajlsYDlj5jph49cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iYWwge1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1Zpdm8gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFsbERhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbmZpZ0RhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcHBJZDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb25maWcgPSB7XHJcbiAgICAgICAgaG9tZUNvbmZpZzoge1xyXG4gICAgICAgICAgICBzdGFydFZpZGVvOiAxLFxyXG4gICAgICAgICAgICB2aWRlb1BlcjogMTAwLFxyXG4gICAgICAgICAgICBzdGFydE5hdGl2ZTogMSxcclxuICAgICAgICAgICAgbmF0aXZlUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIG5hdGl2ZUNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpbWU6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnRJbnRlcnNBZDogMSxcclxuICAgICAgICAgICAgaW50ZXJzQWRQZXI6IDEwMCxcclxuICAgICAgICAgICAgYmFubmVyU2hvdzogMSwgLy/mmK/lkKbmmL7npLpCYW5uZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhbWVDb25maWc6IHtcclxuICAgICAgICAgICAgc3RhcnRWaWRlbzogMSxcclxuICAgICAgICAgICAgdmlkZW9QZXI6IDEwMCxcclxuICAgICAgICAgICAgc3RhcnROYXRpdmU6IDEsXHJcbiAgICAgICAgICAgIG5hdGl2ZVBlcjogMTAwLFxyXG4gICAgICAgICAgICBuYXRpdmVDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBsYWJlbFR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJzQWQ6IDEsXHJcbiAgICAgICAgICAgIGludGVyc0FkUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIGJhbm5lclNob3c6IDEsIC8v5piv5ZCm5pi+56S6QmFubmVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmRDb25maWc6IHtcclxuICAgICAgICAgICAgc3RhcnRWaWRlbzogMSxcclxuICAgICAgICAgICAgdmlkZW9QZXI6IDEwMCxcclxuICAgICAgICAgICAgc3RhcnROYXRpdmU6IDEsXHJcbiAgICAgICAgICAgIG5hdGl2ZVBlcjogMTAwLFxyXG4gICAgICAgICAgICBuYXRpdmVDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBsYWJlbFR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJzQWQ6IDEsXHJcbiAgICAgICAgICAgIGludGVyc0FkUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIGJhbm5lclNob3c6IDEsIC8v5piv5ZCm5pi+56S6QmFubmVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZHZlcnRpc2luZ0NvbmZpZzoge1xyXG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWRJZDogW1xyXG4gICAgICAgICAgICAgICAgXCIxODBkNjU3YzhjYTE0YzRlYTIwODkzODVhYjg1Y2M0Y1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkSWQ6IFtcclxuICAgICAgICAgICAgICAgIFwiZTFhNTVhZjlhZDAyNDBkNTgwNjMzNzNjMDE5ZWFjOGJcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBiYW5uZXJBZElkOiBbXHJcbiAgICAgICAgICAgICAgICBcImUzYzNiMDEyMTdhODQzZmU4YzY5NWVjMGFkMDUzZWQ4XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbmF0aXZlQWRJZDogW1xyXG4gICAgICAgICAgICAgICAgXCJkOGJmYjNkYzEyNjc0ODM4OGQ4NjMxMWFmMzVjNGQwMFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogMC41LFxyXG4gICAgICAgICAgICBtYXhTdGFtaW5hOiAxMCxcclxuICAgICAgICAgICAgYXV0b0FkZFN0YW1pbmFUaW1lOiAxLFxyXG4gICAgICAgICAgICBhdXRvQWRkU3RhbWluYU51bTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkSW5mbzoge1xyXG4gICAgICAgICAgICBnb2xkOiAxMDAsXHJcbiAgICAgICAgICAgIGRpYW1vbmQ6IDIsXHJcbiAgICAgICAgICAgIHN0YW1pbmE6IDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhbm5lclJlZnJlc2hUaW1lOiAxMCwgLy9iYW5uZXLliLfmlrDml7bpl7Qg77yI5Y2V5L2N77ya56eSL3PvvIzigJzmnIDlsI8gMzDigJ3vvIlcclxuICAgICAgICBpc0xvZzogMSwgLy9sb2cgIDAgOiDkuI1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlr7zlh7rmlbDmja5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0RGF0YSB7XHJcbiAgICBhcHBJZDogc3RyaW5nIC8vIGFwcElEXHJcbiAgICBpZDogbnVtYmVyIC8vIOWQjuWPsOWvvOWHuklEXHJcbiAgICBhZEltZzogc3RyaW5nIC8vIOW5v+WRiuWbvlVSTFxyXG4gICAgZXhwb3J0U3JjOiBzdHJpbmcgLy8g5a+85Ye66Lev5YqyXHJcbiAgICBnYW1lT3JpZ2luSWQ6IG51bWJlciAvLyDljp/muLjmiI9JRFxyXG4gICAgZ2FtZVRhcmdldElkOiBudW1iZXJcclxuICAgIGdhbWVUYXJnZXROYW1lOiBzdHJpbmcgLy8g5YiG5Lqr5ri45oiP5ZCN56ewXHJcbiAgICBpY29uSW1nOiBzdHJpbmdcclxuICAgIGlzTGlrZTogbnVtYmVyXHJcbiAgICBpc09mZmxpbmU6IG51bWJlclxyXG4gICAgaXNQb3B1bGFyOiBudW1iZXJcclxuICAgIHNvcnQ6IG51bWJlclxyXG4gICAgaXNUcmlwYXJ0OiBudW1iZXJcclxuICAgIHBhZ2VUeXBlOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVSUNvbmZpZyB7XHJcbiAgICBiYW5uZXJfcHJvYmFiaWxpdHk6IG51bWJlciwgICAgLy9iYW5uZXIg5pi+56S65qaC546HXHJcbiAgICBnYW1lQm94X3Byb2JhYmlsaXR5OiBudW1iZXIsICAvL2dhbWVCb3gg5pi+56S65qaC546HXHJcbiAgICBjaGVzdF9wcm9iYWJpbGl0eTogbnVtYmVyLCAgIC8v6K+v6Kem5a6d566xXHJcbiAgICBpbnNlcnRfcHJvYmFiaWxpdHk6IG51bWJlciwgIC8v5o+S5bGPXHJcbiAgICB2aWRlb19wcm9iYWJpbGl0eTogbnVtYmVyLCAgIC8vIOW8uuaLieinhumikVxyXG4gICAgZXhwb3J0X3Nob3c6IG51bWJlcltdLCAgICAgIC8v5pi+56S65pe25YCZ55qE5a+85Ye6XHJcbn1cclxuIl19