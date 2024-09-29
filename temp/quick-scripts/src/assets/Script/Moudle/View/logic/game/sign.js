"use strict";
cc._RF.push(module, '8ea41O1751C4Yy7ck2U7iOS', 'sign');
// Script/Moudle/View/logic/game/sign.ts

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
var LayerPanel_1 = require("../../../../Common/manage/Layer/LayerPanel");
var Tools_1 = require("../../../../Common/Tools");
var config_1 = require("../common/config");
var CacheMgr_1 = require("../../../../Common/manage/CacheMgr");
var PanelMgr_1 = require("../../../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Sign = /** @class */ (function (_super) {
    __extends(Sign, _super);
    function Sign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type_spriteFrame = [];
        _this.items = [];
        _this.get = null;
        _this.double_get = null;
        _this.close = null;
        return _this;
    }
    Sign_1 = Sign;
    Sign.getUrl = function () {
        return {
            bundle: "game",
            name: "sign"
        };
    };
    Sign.prototype.initUI = function () {
        this.get = this.getNode("get");
        this.onTouch(this.get, this.handle_get);
        this.double_get = this.getNode("double");
        this.onTouch(this.double_get, this.handle_double_get);
        this.close = this.getNode("btn");
        this.onTouch(this.close, function () {
            PanelMgr_1.default.INS.closePanel(Sign_1);
        });
        var content = this.node.children[0];
        for (var i = 0; i < content.childrenCount; i++) {
            this.items.push(content.children[i]);
            if (i == 6) {
                // this.changeItem7(content.children[i], gameConfig.singData7)
            }
            else {
                this.changeItem(content.children[i], config_1.default.signData[i]);
            }
            if (i == 6) {
                this.changeSignStatus7(content.children[i]);
            }
            else {
                this.changeSignStatus(i, content.children[i]);
            }
        }
        if (CacheMgr_1.default.setting.signNum >= 6 || CacheMgr_1.default.setting.lastSignNum == Tools_1.default.date_getTimeNum(new Date)) {
            this.hideBtn();
        }
    };
    Sign.prototype.changeItem = function (node, data) {
        // let one = node.children[0]
        node.children[1].getComponent(cc.Sprite).spriteFrame = this.type_spriteFrame[data.type];
        node.children[2].getComponent(cc.Label).string = data.title;
    };
    Sign.prototype.changeSignStatus = function (i, node) {
        if (i == -1) {
            node.getChildByName("mask").active = true;
            node.getChildByName("签到").active = true;
            return;
        }
        if (CacheMgr_1.default.setting.signNum >= i) {
            node.getChildByName("mask").active = true;
            node.getChildByName("签到").active = true;
        }
        else {
            node.getChildByName("mask").active = false;
            node.getChildByName("签到").active = false;
        }
    };
    Sign.prototype.changeSignStatus7 = function (node, isFalse) {
        if (isFalse === void 0) { isFalse = false; }
        if (isFalse) {
            node.getChildByName("签到").active = true;
            node.getChildByName("mask").active = true;
        }
        if (CacheMgr_1.default.setting.signNum >= 6) {
            node.getChildByName("签到").active = true;
            node.getChildByName("mask").active = true;
        }
        else {
            node.getChildByName("签到").active = false;
            node.getChildByName("mask").active = false;
        }
    };
    Sign.prototype.handle_get = function () {
        if (CacheMgr_1.default.setting.signNum == 5) {
            config_1.default.singData7.func(1);
            CacheMgr_1.default.setting.signNum++;
            this.changeSignStatus7(this.items[6], true);
        }
        else {
            var data = config_1.default.signData[CacheMgr_1.default.setting.signNum + 1];
            CacheMgr_1.default.setting.signNum++;
            this.changeSignStatus(-1, this.items[CacheMgr_1.default.setting.signNum]);
            data.func(data.num);
        }
        CacheMgr_1.default.setting.lastSignNum = Tools_1.default.date_getTimeNum(new Date());
        CacheMgr_1.default.setting = CacheMgr_1.default.setting;
        this.hideBtn();
    };
    Sign.prototype.handle_double_get = function () {
        var _this = this;
        Tools_1.default.handleVideo().then(function (res) {
            if (res) {
                if (CacheMgr_1.default.setting.signNum == 5) {
                    config_1.default.singData7.func(2);
                    CacheMgr_1.default.setting.signNum++;
                    _this.changeSignStatus7(_this.items[6], true);
                }
                else {
                    var data = config_1.default.signData[CacheMgr_1.default.setting.signNum + 1];
                    CacheMgr_1.default.setting.signNum++;
                    _this.changeSignStatus(-1, _this.items[CacheMgr_1.default.setting.signNum]);
                    data.func(data.num * 2);
                }
                CacheMgr_1.default.setting.lastSignNum = Tools_1.default.date_getTimeNum(new Date());
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                _this.hideBtn();
            }
        });
    };
    Sign.prototype.hideBtn = function () {
        this.get.active = false;
        this.double_get.active = false;
    };
    Sign.prototype.show = function (param) {
    };
    Sign.prototype.hide = function () {
    };
    var Sign_1;
    __decorate([
        property([cc.SpriteFrame])
    ], Sign.prototype, "type_spriteFrame", void 0);
    Sign = Sign_1 = __decorate([
        ccclass
    ], Sign);
    return Sign;
}(LayerPanel_1.default));
exports.default = Sign;

cc._RF.pop();