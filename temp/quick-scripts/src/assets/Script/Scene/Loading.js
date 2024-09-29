"use strict";
cc._RF.push(module, 'ec6e2rgMvFB4oPzJeQ8YAZt', 'Loading');
// Script/Scene/Loading.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../Common/Tools");
var JiuWuSDK_1 = require("../SDK/JiuWuSDK");
var CacheMgr_1 = require("../Common/manage/CacheMgr");
var Global_1 = require("../Common/Global");
var Emit_1 = require("../Common/manage/Emit/Emit");
var LogMgr_1 = require("../Common/LogMgr");
var QgBanner_1 = require("../Common/manage/Api/QgBanner");
var EmitData_1 = require("../Common/manage/Emit/EmitData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.round = null;
        _this.mask = null;
        _this.tween = null;
        return _this;
    }
    Loading.prototype.onLoad = function () {
        var _this = this;
        // @ts-ignore
        if (window.qg) {
            Global_1.default.isVivo = true;
        }
        this.mask.width = 0;
        //假的进度条
        this.tween = cc.tween(this.mask)
            .to(3, { width: 300 }, { easing: "quadOut" })
            .start();
        var i = 0;
        cc.director.preloadScene("Game");
        var num = Tools_1.default.model_initModel(function () {
            i++;
            if (i === num) {
                _this.tween.stop();
                cc.tween(_this.mask)
                    .to(2, { width: 500 }, { easing: 'quadOut' })
                    .call(function () {
                    if (Global_1.default.isVivo) {
                        if (JiuWuSDK_1.default.initSDK) {
                            _this.loadScene();
                        }
                        else {
                            Emit_1.default.instance().on(EmitData_1.default.LOAD_GAME_SCENE, _this.loadScene, _this);
                        }
                    }
                    else {
                        cc.director.loadScene('Game');
                    }
                })
                    .start();
            }
        });
        this.someMotor();
    };
    Loading.prototype.loadScene = function () {
        cc.director.loadScene('Game');
    };
    Loading.prototype.someMotor = function () {
        if (!Global_1.default.isVivo) {
            return;
        }
        // @ts-ignore
        window.qg.onShow(function () {
            LogMgr_1.default.log('Banner刷新>>>>>>onShow', QgBanner_1.default.isShow);
            if (QgBanner_1.default.isShow) {
                QgBanner_1.default.cutBanner().then();
            }
            cc.audioEngine.resumeMusic();
        });
        // @ts-ignore
        window.qg.onHide(function () {
            CacheMgr_1.default.updateData();
            cc.audioEngine.pauseMusic();
        });
        JiuWuSDK_1.default.inSet_API_Config().then(function () {
            Emit_1.default.instance().emit(EmitData_1.default.LOAD_GAME_SCENE);
        });
    };
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "round", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "mask", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

cc._RF.pop();