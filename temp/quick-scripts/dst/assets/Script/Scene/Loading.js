
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Scene/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTY2VuZVxcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsNENBQXVDO0FBQ3ZDLHNEQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsbURBQThDO0FBQzlDLDJDQUFzQztBQUN0QywwREFBcUQ7QUFDckQsMkRBQXNEO0FBRWhELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBaUZDO1FBOUVHLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUViLFdBQUssR0FBRyxJQUFJLENBQUM7O0lBeUV6QixDQUFDO0lBdkVhLHdCQUFNLEdBQWhCO1FBQUEsaUJBcUNDO1FBcENHLGFBQWE7UUFDYixJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDWCxnQkFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDbkIsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzNCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLENBQUM7YUFDeEMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHVixFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVoQyxJQUFJLEdBQUcsR0FBRyxlQUFLLENBQUMsZUFBZSxDQUFDO1lBQzVCLENBQUMsRUFBRSxDQUFBO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNYLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztxQkFDZCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDO3FCQUN4QyxJQUFJLENBQUM7b0JBQ0YsSUFBSSxnQkFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDZixJQUFJLGtCQUFRLENBQUMsT0FBTyxFQUFFOzRCQUNsQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ3BCOzZCQUFNOzRCQUNILGNBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsa0JBQVEsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsQ0FBQzt5QkFDdEU7cUJBQ0o7eUJBQU07d0JBQ0gsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2pDO2dCQUNMLENBQUMsQ0FBQztxQkFDRCxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQkFBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUdELDJCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBRUQsYUFBYTtRQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2IsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLGtCQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNqQixrQkFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQy9CO1lBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUViLGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtRQUVGLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDN0IsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQTdFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0c7SUFOSixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBaUYzQjtJQUFELGNBQUM7Q0FqRkQsQUFpRkMsQ0FqRm9DLEVBQUUsQ0FBQyxTQUFTLEdBaUZoRDtrQkFqRm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgSml1V3VTREsgZnJvbSBcIi4uL1NESy9KaXVXdVNES1wiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQ2FjaGVNZ3JcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgRW1pdCBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXRcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vQ29tbW9uL0xvZ01nclwiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBFbWl0RGF0YSBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcm91bmQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbWFzazogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB0d2VlbiA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKHdpbmRvdy5xZykge1xyXG4gICAgICAgICAgICBHbG9iYWwuaXNWaXZvID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXNrLndpZHRoID0gMFxyXG4gICAgICAgIC8v5YGH55qE6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy50d2VlbiA9IGNjLnR3ZWVuKHRoaXMubWFzaylcclxuICAgICAgICAgICAgLnRvKDMsIHt3aWR0aDogMzAwfSwge2Vhc2luZzogXCJxdWFkT3V0XCJ9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcblxyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJHYW1lXCIpXHJcblxyXG4gICAgICAgIGxldCBudW0gPSBUb29scy5tb2RlbF9pbml0TW9kZWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgaWYgKGkgPT09IG51bSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm1hc2spXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDIsIHt3aWR0aDogNTAwfSwge2Vhc2luZzogJ3F1YWRPdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSml1V3VTREsuaW5pdFNESykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5vbihFbWl0RGF0YS5MT0FEX0dBTUVfU0NFTkUsIHRoaXMubG9hZFNjZW5lLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbWVNb3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTY2VuZSgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWUnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc29tZU1vdG9yKCkge1xyXG4gICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB3aW5kb3cucWcub25TaG93KCgpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmxvZygnQmFubmVy5Yi35pawPj4+Pj4+b25TaG93JywgUWdCYW5uZXIuaXNTaG93KTtcclxuICAgICAgICAgICAgaWYgKFFnQmFubmVyLmlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgUWdCYW5uZXIuY3V0QmFubmVyKCkudGhlbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHdpbmRvdy5xZy5vbkhpZGUoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgQ2FjaGVNZ3IudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBKaXVXdVNESy5pblNldF9BUElfQ29uZmlnKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5lbWl0KEVtaXREYXRhLkxPQURfR0FNRV9TQ0VORSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn1cclxuIl19