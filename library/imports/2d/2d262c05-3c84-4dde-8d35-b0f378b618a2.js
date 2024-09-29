"use strict";
cc._RF.push(module, '2d262wFPIRN3o01sPN4thii', 'shop');
// Script/Moudle/View/logic/game/shop.ts

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
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hammer_btn = null;
        _this.sprite_btn = null;
        _this.stamina_btn = null;
        _this.close_btn = null;
        return _this;
    }
    Shop_1 = Shop;
    Shop.getUrl = function () {
        return {
            bundle: "game",
            name: "shop"
        };
    };
    Shop.prototype.initUI = function () {
        this.hammer_btn = this.getNode("content/hammer/btn");
        this.onTouch(this.hammer_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_hammer, function () {
                CacheMgr_1.default.setting.hammerNum++;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            });
        });
        this.change_price(this.hammer_btn, config_1.default.price_hammer);
        this.sprite_btn = this.getNode("content/sprite/btn");
        this.onTouch(this.sprite_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_sprite, function () {
                CacheMgr_1.default.setting.spriteNum++;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            });
        });
        this.change_price(this.sprite_btn, config_1.default.price_sprite);
        this.stamina_btn = this.getNode("content/stamina/btn");
        this.onTouch(this.stamina_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_stamina, function () {
                CacheMgr_1.default.stamina = CacheMgr_1.default.stamina + 1;
            });
        });
        this.change_price(this.stamina_btn, config_1.default.price_stamina);
        this.close_btn = this.getNode("btn");
        this.onTouch(this.close_btn, function () {
            PanelMgr_1.default.INS.closePanel(Shop_1);
        });
    };
    Shop.prototype.change_price = function (node, num) {
        var label = node.getChildByName("num").getComponent(cc.Label);
        label.string = num.toString();
    };
    Shop.prototype.show = function (param) {
    };
    Shop.prototype.hide = function () {
    };
    var Shop_1;
    Shop = Shop_1 = __decorate([
        ccclass
    ], Shop);
    return Shop;
}(LayerPanel_1.default));
exports.default = Shop;

cc._RF.pop();