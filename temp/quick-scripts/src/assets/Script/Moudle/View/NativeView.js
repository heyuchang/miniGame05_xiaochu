"use strict";
cc._RF.push(module, '1918avBtcdAv7HTwHdhUQ91', 'NativeView');
// Script/Moudle/View/NativeView.ts

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
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var QgNative_1 = require("../../Common/manage/Api/QgNative");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TOUCH_START = cc.Node.EventType.TOUCH_START;
var NativeView = /** @class */ (function (_super) {
    __extends(NativeView, _super);
    function NativeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_inters = null;
        _this.native_implant = null;
        _this.nativeMessage = null;
        _this.currSprite = null;
        _this.adId = null;
        _this.labelType = null;
        _this.labelArr = ['点击查看', '点击跳过'];
        _this.type = null;
        return _this;
        // update (dt) {}
    }
    NativeView_1 = NativeView;
    NativeView.getUrl = function () {
        return {
            bundle: "nativeView",
            name: "nativeView"
        };
    };
    NativeView.prototype.initUI = function () {
        this.initTouch();
    };
    NativeView.prototype.show = function (param) {
        var _this = this;
        this.node.getChildByName('inputEvent').active = false;
        this.node.getChildByName('inputEvent_implant').active = false;
        this.native_inters.active = false;
        this.native_implant.active = false;
        this.labelType = param.labelType;
        this.type = param.type;
        this.scheduleOnce(function () {
            if (QgNative_1.default.nativeMessage != null) {
                _this.nativeMessage = QgNative_1.default.nativeMessage;
                _this.open_type(param.type);
            }
            else {
                QgNative_1.default.loadNative().then(function (res) {
                    if (res && res != false) {
                        _this.nativeMessage = res;
                        _this.open_type(param.type);
                    }
                    else {
                    }
                });
            }
        }, param.time);
        if (this.type == 2) {
            Emit_1.default.instance().on(EmitData_1.default.CLOSE_NATIVE, this.closeNative, this);
        }
    };
    NativeView.prototype.openNative = function (node) {
        var _this = this;
        node.getChildByName('title').getComponent(cc.Label).string = this.nativeMessage.desc;
        var imgUrl = null;
        if (this.nativeMessage.imgUrlList && this.nativeMessage.imgUrlList.length > 0) {
            imgUrl = this.nativeMessage.imgUrlList[0];
        }
        if (imgUrl != null) {
            cc.assetManager.loadRemote(imgUrl, { ext: '.png' }, function (err, asset) {
                if (err) {
                    console.error('原生广告图片加载错误>>>>>>', err);
                    return;
                }
                _this.currSprite = asset;
                node.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(_this.currSprite);
            });
        }
        this.adId = this.nativeMessage.adId;
        QgNative_1.default.repAdShow(this.nativeMessage.adId);
    };
    NativeView.prototype.open_type = function (type) {
        var _this = this;
        if (!this.nativeMessage) {
            return;
        }
        if (type == 1) {
            this.node.getChildByName('inputEvent').active = true;
            this.native_inters.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1];
            this.native_inters.getChildByName('close').active = false;
            this.native_inters.active = true;
            this.scheduleOnce(function () {
                _this.native_inters.getChildByName('close').active = true;
            }, 2);
            this.openNative(this.native_inters);
        }
        if (type == 2) {
            QgBanner_1.default.hideBanner();
            this.node.getChildByName('inputEvent_implant').active = true;
            this.native_implant.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1];
            this.native_implant.getChildByName('close').active = false;
            this.native_implant.active = true;
            this.scheduleOnce(function () {
                _this.native_implant.getChildByName('close').active = true;
            }, 2);
            this.openNative(this.native_implant);
        }
    };
    NativeView.prototype.initTouch = function () {
        var _this = this;
        this.native_inters.getChildByName('image').on(TOUCH_START, function () {
            QgNative_1.default.repAdClick(_this.adId);
        });
        this.native_implant.getChildByName('image').on(TOUCH_START, function () {
            QgNative_1.default.repAdClick(_this.adId);
        });
        this.native_inters.getChildByName('nativeBtn').on(TOUCH_START, function () {
            _this.handlerNativeBtn();
        });
        this.native_implant.getChildByName('nativeBtn').on(TOUCH_START, function () {
            _this.handlerNativeBtn();
        });
        this.native_inters.getChildByName('close').on(TOUCH_START, function () {
            _this.closeNative();
        });
        this.native_implant.getChildByName('close').on(TOUCH_START, function () {
            _this.closeNative();
        });
    };
    NativeView.prototype.handlerNativeBtn = function () {
        if (this.labelType == 1) {
            QgNative_1.default.repAdClick(this.adId);
        }
        else {
            this.closeNative();
        }
    };
    NativeView.prototype.hide = function () {
        QgNative_1.default.anewLoad();
        Emit_1.default.instance().emit(EmitData_1.default.IN_NATIVE_NEXT);
        if (this.type == 2) {
            QgBanner_1.default.showBanner();
            Emit_1.default.instance().off(EmitData_1.default.CLOSE_NATIVE, this.closeNative, this);
        }
    };
    NativeView.prototype.closeNative = function () {
        PanelMgr_1.default.INS.closePanel(NativeView_1, false);
    };
    var NativeView_1;
    __decorate([
        property(cc.Node)
    ], NativeView.prototype, "native_inters", void 0);
    __decorate([
        property(cc.Node)
    ], NativeView.prototype, "native_implant", void 0);
    NativeView = NativeView_1 = __decorate([
        ccclass
    ], NativeView);
    return NativeView;
}(LayerPanel_1.default));
exports.default = NativeView;

cc._RF.pop();