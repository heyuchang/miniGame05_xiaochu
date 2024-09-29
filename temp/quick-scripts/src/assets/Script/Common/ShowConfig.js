"use strict";
cc._RF.push(module, 'a4d84ygktZD2pfhA2/12s8I', 'ShowConfig');
// Script/Common/ShowConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LogMgr_1 = require("./LogMgr");
var Tools_1 = require("./Tools");
var Emit_1 = require("./manage/Emit/Emit");
var EmitData_1 = require("./manage/Emit/EmitData");
var QgBanner_1 = require("./manage/Api/QgBanner");
var ShowConfig = /** @class */ (function () {
    function ShowConfig() {
    }
    ShowConfig.initEmit = function () {
        Emit_1.default.instance().on(EmitData_1.default.IN_NATIVE_NEXT, this.inNativeNext, this);
    };
    ShowConfig.show = function (str) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.showResolve = resolve;
            if (!Global_1.default.isVivo) {
                _this.showResolve(false);
                _this.showResolve = null;
                return;
            }
            if (!str || !Global_1.default.config[str]) {
                LogMgr_1.default.error('参数为空或者config中不存在该配置:str:' + str);
                _this.showResolve(false);
                _this.showResolve = null;
                return;
            }
            LogMgr_1.default.log('检测配置信息');
            _this.str = str;
            if (Global_1.default.config[_this.str].nativeConfig.type == 2) {
                QgBanner_1.default.hideBanner();
            }
            console.log('AAA>>>>>>');
            _this.playVideo().then(function () {
                console.log('BBB>>>>>>');
                return _this.openNative();
            }).then(function (res) {
                if (!res) {
                    _this.inNativeNext();
                }
            });
        });
    };
    ShowConfig.playVideo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Global_1.default.config[_this.str].startVideo == 0) {
                Global_1.default.config[_this.str].startVideo = 1;
                resolve(true);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].videoPer)) {
                Tools_1.default.handleVideo().then(function () {
                    resolve(true);
                });
            }
            else {
                resolve(true);
            }
        });
    };
    ShowConfig.openNative = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('CCC>>>>>>');
            if (Global_1.default.config[_this.str].startNative == 0) {
                Global_1.default.config[_this.str].startNative = 1;
                resolve(false);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].nativePer)) {
                Tools_1.default.showNative(Global_1.default.config[_this.str].nativeConfig.type, Global_1.default.config[_this.str].nativeConfig.labelType, Global_1.default.config[_this.str].nativeConfig.time).then(function (res) {
                    resolve(res);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    ShowConfig.openIntersAd = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('DDD>>>>>>');
            if (Global_1.default.config[_this.str].startIntersAd == 0) {
                Global_1.default.config[_this.str].startIntersAd = 1;
                resolve(false);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].intersAdPer)) {
                Tools_1.default.handlerInters().then(function (res) {
                    resolve(res);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    ShowConfig.inNativeNext = function () {
        var _this = this;
        this.openIntersAd().then(function (res) {
            console.log('EEE>>>>>>');
            _this.showResolve(true);
            _this.showResolve = null;
        });
    };
    ShowConfig.str = '';
    ShowConfig.showResolve = null;
    return ShowConfig;
}());
exports.default = ShowConfig;

cc._RF.pop();