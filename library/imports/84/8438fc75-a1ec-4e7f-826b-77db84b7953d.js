"use strict";
cc._RF.push(module, '8438fx1oexOf4Jrd9uEt5U9', 'Game');
// Script/Scene/Game.ts

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
var PanelMgr_1 = require("../Common/manage/PanelMgr");
var Emit_1 = require("../Common/manage/Emit/Emit");
var EmitData_1 = require("../Common/manage/Emit/EmitData");
var HomeView_1 = require("../Moudle/View/HomeView");
var Global_1 = require("../Common/Global");
var AudioMgr_1 = require("../Common/manage/AudioMgr");
var QgApi_1 = require("../Common/manage/Api/QgApi");
var ShowConfig_1 = require("../Common/ShowConfig");
// cc.macro.CLEANUP_IMAGE_CACHE = false;
// cc.dynamicAtlasManager.enabled = true;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.banner = null;
        return _this;
    }
    Game_1 = Game;
    Game.prototype.onLoad = function () {
        AudioMgr_1.default.backMusic();
        Game_1.Ins = this;
        if (!PanelMgr_1.default.INS) {
            Emit_1.default.instance().on(EmitData_1.EventCode.PanelMgrInitOK, this.do_after_panelMgr_initOK, this);
        }
        else {
            this.do_after_panelMgr_initOK();
        }
    };
    //PanelMgr 初始化完成之后执行的方法
    Game.prototype.do_after_panelMgr_initOK = function () {
        this.banner = this.node.getChildByName('bannerLayer').children[0];
        if (Global_1.default.isVivo) {
            QgApi_1.default.createBanner();
            ShowConfig_1.default.initEmit();
        }
        PanelMgr_1.default.INS.openPanel({
            layer: PanelMgr_1.Layer.gameLayer,
            panel: HomeView_1.default,
        });
    };
    var Game_1;
    //Game实例
    Game.Ins = null;
    Game = Game_1 = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();