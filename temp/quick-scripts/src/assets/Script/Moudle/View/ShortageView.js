"use strict";
cc._RF.push(module, '9bbd6c1Jv5Ik5gzQRE3I2bs', 'ShortageView');
// Script/Moudle/View/ShortageView.ts

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
var Global_1 = require("../../Common/Global");
var LoadMgr_1 = require("../../Common/manage/LoadMgr");
var GameLogMgr_1 = require("../../Common/manage/GameLogMgr");
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var Tools_1 = require("../../Common/Tools");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShortageView = /** @class */ (function (_super) {
    __extends(ShortageView, _super);
    function ShortageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //node
        _this._image = null;
        _this._button = null;
        _this._skipButton = null;
        _this._addNum = null;
        _this.callBack = null; // 玩家领取成功对应的道具 回调
        _this.price = 0; //当前逻辑所需要的消耗数量
        return _this;
    }
    ShortageView_1 = ShortageView;
    ShortageView.getUrl = function () {
        return {
            bundle: "shortageView",
            name: "shortageView"
        };
    };
    ShortageView.prototype.initUI = function () {
        this._image = this.getNode("image");
        this._button = this.getNode("button");
        this._skipButton = this.getNode("skip");
        this._addNum = this.getNode("add_num");
    };
    /**
     * @param param  {
     *     type  :   string   不足类型  例如   gold : 金币  st
     *     callBack : Function  //回调
     *     price :   number   本次展示观看视频成功之后，回调执行条件价格
     * }
     */
    ShortageView.prototype.show = function (param) {
        var _this = this;
        try {
            var type_1 = "";
            if (param) {
                this.callBack = param.callBack;
                this.price = param.price;
                type_1 = param.type;
            }
            this._image.active = false;
            this._skipButton.active = false;
            this._button.active = false;
            this.replaceSprite(this._image, type_1);
            this.replaceSprite(this._skipButton, type_1);
            this.replaceSprite(this._button, type_1);
            var addNum_1 = Global_1.default.config.addInfo[type_1];
            this._addNum.getComponent(cc.Label).string = "+" + addNum_1;
            this.onTouch(this._button, function () {
                Tools_1.default.handleVideo().then(function (res) {
                    if (res) {
                        if (type_1 == "gold") {
                            CacheMgr_1.default.gold = CacheMgr_1.default.gold + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.gold >= _this.price) {
                                CacheMgr_1.default.gold = CacheMgr_1.default.gold - _this.price;
                                _this.callBack();
                            }
                        }
                        else if (type_1 == "diamond") {
                            CacheMgr_1.default.diamond = CacheMgr_1.default.diamond + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.diamond >= _this.price) {
                                CacheMgr_1.default.diamond = CacheMgr_1.default.diamond - _this.price;
                                _this.callBack();
                            }
                        }
                        else if (type_1 == "stamina") {
                            CacheMgr_1.default.stamina = CacheMgr_1.default.stamina + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.stamina >= _this.price) {
                                CacheMgr_1.default.stamina = CacheMgr_1.default.stamina - _this.price;
                                _this.callBack();
                            }
                        }
                    }
                });
            });
            this.onTouch(this._skipButton, function () {
                PanelMgr_1.default.INS.closePanel(ShortageView_1);
            });
            this.node.active = true;
        }
        catch (e) {
            GameLogMgr_1.default.error('home show error ');
        }
    };
    //替换图片
    ShortageView.prototype.replaceSprite = function (node, type) {
        if (!node || !type) {
            return;
        }
        var sprite = node.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }
        LoadMgr_1.default.loadSprite(sprite, "view/shortage/" + type + "/" + node.name).then();
    };
    ShortageView.prototype.hide = function () {
    };
    var ShortageView_1;
    ShortageView = ShortageView_1 = __decorate([
        ccclass
    ], ShortageView);
    return ShortageView;
}(LayerPanel_1.default));
exports.default = ShortageView;

cc._RF.pop();