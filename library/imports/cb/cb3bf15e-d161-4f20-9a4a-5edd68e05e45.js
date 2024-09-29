"use strict";
cc._RF.push(module, 'cb3bfFe0WFPIJpKXt1o4F5F', 'HomeView');
// Script/Moudle/View/HomeView.ts

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
var GameInfoView_1 = require("./GameInfoView");
var GameView_1 = require("./GameView");
var shop_1 = require("./logic/game/shop");
var sign_1 = require("./logic/game/sign");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var ShowConfig_1 = require("../../Common/ShowConfig");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var Global_1 = require("../../Common/Global");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var QgApi_1 = require("../../Common/manage/Api/QgApi");
var ccclass = cc._decorator.ccclass;
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._exportData = null;
        //node
        _this._button = null;
        _this._setting = null;
        _this._shopBtn = null;
        _this._shortBtn = null;
        return _this;
        //todo logic 方法
    }
    HomeView_1 = HomeView;
    HomeView.getUrl = function () {
        return {
            bundle: "homeView",
            name: "homeView"
        };
    };
    HomeView.prototype.initUI = function () {
        var _this = this;
        //todo 逻辑
        PanelMgr_1.default.INS.openPanel({
            panel: GameInfoView_1.default,
            layer: PanelMgr_1.Layer.gameInfoLayer,
        });
        this._button = this.getNode("next");
        this.onTouch(this._button, function () {
            PanelMgr_1.default.INS.openPanel({
                panel: GameView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                call: function () {
                    PanelMgr_1.default.INS.closePanel(HomeView_1);
                    PanelMgr_1.default.INS.closePanel(shop_1.default);
                    PanelMgr_1.default.INS.closePanel(sign_1.default);
                }
            });
        });
        this._setting = this.getNode("setting");
        this._shopBtn = this.getNode("bottomUI/shopIcon");
        this.onTouch(this._shopBtn, function () {
            PanelMgr_1.default.INS.openPanel({
                panel: shop_1.default,
                layer: PanelMgr_1.Layer.gameLayer
            });
        });
        this._shortBtn = this.getNode('shortBtn');
        QgApi_1.default.judgeShortIcon().then(function (res) {
            _this._shortBtn.active = res;
        });
        this.onTouch(this._shortBtn, function () {
            QgApi_1.default.addShortcutIcon().then(function (res) {
                if (res) {
                    _this._shortBtn.active = false;
                }
            });
        });
    };
    HomeView.prototype.show = function (param) {
        ShowConfig_1.default.show('homeConfig').then(function (res) {
            if (Global_1.default.config.homeConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
            else {
                QgBanner_1.default.hideBanner();
            }
        });
    };
    HomeView.prototype.hide = function () {
        if (Global_1.default.config.homeConfig.nativeConfig.type == 2) {
            Emit_1.default.instance().emit(EmitData_1.default.CLOSE_NATIVE);
        }
    };
    var HomeView_1;
    HomeView = HomeView_1 = __decorate([
        ccclass
    ], HomeView);
    return HomeView;
}(LayerPanel_1.default));
exports.default = HomeView;

cc._RF.pop();