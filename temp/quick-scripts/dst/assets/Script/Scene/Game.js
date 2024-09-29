
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Scene/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTY2VuZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBZ0U7QUFDaEUsbURBQThDO0FBQzlDLDJEQUF5RDtBQUN6RCxvREFBK0M7QUFDL0MsMkNBQXNDO0FBQ3RDLHNEQUFpRDtBQUNqRCxvREFBK0M7QUFDL0MsbURBQThDO0FBRTlDLHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFnQ0M7UUEvQkcsWUFBTSxHQUFZLElBQUksQ0FBQTs7SUErQjFCLENBQUM7YUFoQ29CLElBQUk7SUFNckIscUJBQU0sR0FBTjtRQUNJLGtCQUFRLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDcEIsTUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUU7UUFFakIsSUFBSSxDQUFDLGtCQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2YsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxvQkFBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDcEY7YUFBTTtZQUNILElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELHVCQUF1QjtJQUN2Qix1Q0FBd0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLGdCQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsZUFBSyxDQUFDLFlBQVksRUFBRSxDQUFFO1lBQ3RCLG9CQUFVLENBQUMsUUFBUSxFQUFFLENBQUU7U0FDMUI7UUFFRCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxFQUFFLGdCQUFLLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsa0JBQVE7U0FDbEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7SUEzQkQsUUFBUTtJQUNNLFFBQUcsR0FBUyxJQUFJLENBQUM7SUFKZCxJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBZ0N4QjtJQUFELFdBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ2lDLEVBQUUsQ0FBQyxTQUFTLEdBZ0M3QztrQkFoQ29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFuZWxNZ3IsIHtMYXllciwgVmlld30gZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvUGFuZWxNZ3JcIjtcclxuaW1wb3J0IEVtaXQgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0XCI7XHJcbmltcG9ydCB7RXZlbnRDb2RlfSBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcbmltcG9ydCBIb21lVmlldyBmcm9tIFwiLi4vTW91ZGxlL1ZpZXcvSG9tZVZpZXdcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgQXVkaW9NZ3IgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXVkaW9NZ3JcIjtcclxuaW1wb3J0IFFnQXBpIGZyb20gXCIuLi9Db21tb24vbWFuYWdlL0FwaS9RZ0FwaVwiO1xyXG5pbXBvcnQgU2hvd0NvbmZpZyBmcm9tIFwiLi4vQ29tbW9uL1Nob3dDb25maWdcIjtcclxuXHJcbi8vIGNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUgPSBmYWxzZTtcclxuLy8gY2MuZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIGJhbm5lcjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICAvL0dhbWXlrp7kvotcclxuICAgIHB1YmxpYyBzdGF0aWMgSW5zOiBHYW1lID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKClcclxuICAgICAgICBHYW1lLklucyA9IHRoaXMgO1xyXG5cclxuICAgICAgICBpZiAoIVBhbmVsTWdyLklOUykge1xyXG4gICAgICAgICAgICBFbWl0Lmluc3RhbmNlKCkub24oRXZlbnRDb2RlLlBhbmVsTWdySW5pdE9LLCB0aGlzLmRvX2FmdGVyX3BhbmVsTWdyX2luaXRPSywgdGhpcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRvX2FmdGVyX3BhbmVsTWdyX2luaXRPSygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vUGFuZWxNZ3Ig5Yid5aeL5YyW5a6M5oiQ5LmL5ZCO5omn6KGM55qE5pa55rOVXHJcbiAgICBkb19hZnRlcl9wYW5lbE1ncl9pbml0T0soKSB7XHJcbiAgICAgICAgdGhpcy5iYW5uZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jhbm5lckxheWVyJykuY2hpbGRyZW5bMF07XHJcblxyXG4gICAgICAgIGlmIChHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgIFFnQXBpLmNyZWF0ZUJhbm5lcigpIDtcclxuICAgICAgICAgICAgU2hvd0NvbmZpZy5pbml0RW1pdCgpIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICBsYXllcjogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICBwYW5lbDogSG9tZVZpZXcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuIl19