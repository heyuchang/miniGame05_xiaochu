
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/HomeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEhvbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUF5RTtBQUN6RSwrQ0FBMEM7QUFDMUMsdUNBQWtDO0FBQ2xDLDBDQUFxQztBQUNyQywwQ0FBcUM7QUFFckMseURBQTZEO0FBQzdELHNEQUFpRDtBQUNqRCw2REFBd0Q7QUFDeEQsOENBQXlDO0FBQ3pDLHNEQUFpRDtBQUNqRCw4REFBeUQ7QUFDekQsdURBQWtEO0FBRTNDLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBRWhDO0lBQXNDLDRCQUFVO0lBQWhEO1FBQUEscUVBK0VDO1FBeEVXLGlCQUFXLEdBQVEsSUFBSSxDQUFDO1FBRWhDLE1BQU07UUFDRSxhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFZLElBQUksQ0FBRTtRQUMxQixlQUFTLEdBQWEsSUFBSSxDQUFFOztRQWlFcEMsZUFBZTtJQUNuQixDQUFDO2lCQS9Fb0IsUUFBUTtJQUNYLGVBQU0sR0FBcEI7UUFDSSxPQUFPO1lBQ0gsTUFBTSxFQUFFLFVBQVU7WUFDbEIsSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FBQTtJQUNMLENBQUM7SUFRTSx5QkFBTSxHQUFiO1FBQUEsaUJBMkNDO1FBMUNHLFNBQVM7UUFDVCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxFQUFFLHNCQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBSyxDQUFDLGFBQWE7U0FDN0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLEtBQUssRUFBRyxrQkFBUTtnQkFDaEIsS0FBSyxFQUFHLGdCQUFLLENBQUMsU0FBUztnQkFDdkIsSUFBSSxFQUFHO29CQUNILGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFRLENBQUMsQ0FBRTtvQkFDbkMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxDQUFFO29CQUMvQixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLENBQUU7Z0JBQ25DLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDeEIsa0JBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2dCQUNuQixLQUFLLEVBQUcsY0FBSTtnQkFDWixLQUFLLEVBQUcsZ0JBQUssQ0FBQyxTQUFTO2FBQzFCLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFFO1FBRTNDLGVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFhO1lBQ3RDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN6QixlQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDN0IsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2lCQUNsQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLEtBQVU7UUFDbEIsb0JBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUNuQyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUMxQyxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1QkFBSSxHQUFYO1FBRUksSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDakQsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFFO1NBQ2hEO0lBQ0wsQ0FBQzs7SUExRWdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErRTVCO0lBQUQsZUFBQztDQS9FRCxBQStFQyxDQS9FcUMsb0JBQVUsR0ErRS9DO2tCQS9Fb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXllclBhbmVsLCB7VXJsSW5mb30gZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJQYW5lbFwiO1xyXG5pbXBvcnQgR2FtZUluZm9WaWV3IGZyb20gXCIuL0dhbWVJbmZvVmlld1wiO1xyXG5pbXBvcnQgR2FtZVZpZXcgZnJvbSBcIi4vR2FtZVZpZXdcIjtcclxuaW1wb3J0IFNob3AgZnJvbSBcIi4vbG9naWMvZ2FtZS9zaG9wXCI7XHJcbmltcG9ydCBTaWduIGZyb20gXCIuL2xvZ2ljL2dhbWUvc2lnblwiO1xyXG5cclxuaW1wb3J0IFBhbmVsTWdyLCB7TGF5ZXJ9IGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL1BhbmVsTWdyXCI7XHJcbmltcG9ydCBTaG93Q29uZmlnIGZyb20gXCIuLi8uLi9Db21tb24vU2hvd0NvbmZpZ1wiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0NvbW1vbi9HbG9iYWxcIjtcclxuaW1wb3J0IEVtaXQgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0XCI7XHJcbmltcG9ydCBFbWl0RGF0YSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcbmltcG9ydCBRZ0FwaSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9BcGkvUWdBcGlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVWaWV3IGV4dGVuZHMgTGF5ZXJQYW5lbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVybCgpOiBVcmxJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBidW5kbGU6IFwiaG9tZVZpZXdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJob21lVmlld1wiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0RGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvL25vZGVcclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zZXR0aW5nOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Nob3BCdG46IGNjLk5vZGUgPSBudWxsIDtcclxuICAgIHByaXZhdGUgX3Nob3J0QnRuIDogY2MuTm9kZSA9IG51bGwgO1xyXG4gICAgcHVibGljIGluaXRVSSgpIHtcclxuICAgICAgICAvL3RvZG8g6YC76L6RXHJcbiAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgIHBhbmVsOiBHYW1lSW5mb1ZpZXcsXHJcbiAgICAgICAgICAgIGxheWVyOiBMYXllci5nYW1lSW5mb0xheWVyLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuZ2V0Tm9kZShcIm5leHRcIik7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX2J1dHRvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsIDogR2FtZVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXllciA6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIGNhbGwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEhvbWVWaWV3KSA7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLmNsb3NlUGFuZWwoU2hvcCkgO1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKFNpZ24pIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2V0dGluZyA9IHRoaXMuZ2V0Tm9kZShcInNldHRpbmdcIilcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvcEJ0biA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL3Nob3BJY29uXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX3Nob3BCdG4sICgpID0+IHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbCA6IFNob3AsXHJcbiAgICAgICAgICAgICAgICBsYXllciA6IExheWVyLmdhbWVMYXllclxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3J0QnRuID0gdGhpcy5nZXROb2RlKCdzaG9ydEJ0bicpIDtcclxuXHJcbiAgICAgICAgUWdBcGkuanVkZ2VTaG9ydEljb24oKS50aGVuKChyZXMgOiBib29sZWFuKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydEJ0bi5hY3RpdmUgPSByZXM7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX3Nob3J0QnRuLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFFnQXBpLmFkZFNob3J0Y3V0SWNvbigpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydEJ0bi5hY3RpdmUgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbTogYW55KSB7XHJcbiAgICAgICAgU2hvd0NvbmZpZy5zaG93KCdob21lQ29uZmlnJykudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmhvbWVDb25maWcuYmFubmVyU2hvdyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBRZ0Jhbm5lci5zaG93QmFubmVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBRZ0Jhbm5lci5oaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuaG9tZUNvbmZpZy5uYXRpdmVDb25maWcudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5lbWl0KEVtaXREYXRhLkNMT1NFX05BVElWRSkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vdG9kbyBsb2dpYyDmlrnms5VcclxufVxyXG4iXX0=