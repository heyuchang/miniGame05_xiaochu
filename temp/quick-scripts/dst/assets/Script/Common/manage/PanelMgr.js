
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/PanelMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5e36JQ0GRBYYm5P5DBYjVC', 'PanelMgr');
// Script/Common/manage/PanelMgr.ts

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
exports.View = exports.Layer = void 0;
var CacheMgr_1 = require("./CacheMgr");
var LoadMgr_1 = require("./LoadMgr");
var Emit_1 = require("./Emit/Emit");
var EmitData_1 = require("./Emit/EmitData");
var LayerPanel_1 = require("./Layer/LayerPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelMgr = /** @class */ (function (_super) {
    __extends(PanelMgr, _super);
    function PanelMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layers = [];
        //当前正在Loading 的面板
        _this.LoadingList = new Map();
        //当前打开的面板数组
        _this.openList = new Map();
        //当前关闭但是未摧毁的面板，存储在这里，下次打开该面板的时候，就会使用这里的面板
        _this.hideList = new Map();
        return _this;
    }
    PanelMgr_1 = PanelMgr;
    PanelMgr.prototype.onLoad = function () {
        PanelMgr_1.INS = this;
        console.log('PanelMgr初始化完成');
        Emit_1.default.instance().emit(EmitData_1.EventCode.PanelMgrInitOK);
    };
    /**
     * @param param{
     *     layer : 在哪一个容器打开页面
     *     panel: 打开面板
     *     call : 打开成功回调 可选
     *     param: 传递给下一个面板的参数
     * }
     */
    PanelMgr.prototype.openPanel = function (param) {
        var _this = this;
        var layer = this.layers[param.layer];
        console.log('param:', param, this.layers);
        if (!layer) {
            return;
        }
        //加载分包
        var urlInfo = param.panel.getUrl();
        if (this.LoadingList.has(urlInfo.name)) {
            return;
        }
        if (this.openList.has(param.panel.getUrl().name)) {
            return;
        }
        this.LoadingList.set(urlInfo.name, 1); //添加一个加载标识， 防止重复添加
        //todo  mask
        var openPanelWay = function () {
            var way = function () {
                var panel = null;
                //判断有没有旧的panel可用，有的话就不重新实例化了
                if (_this.hideList.has(urlInfo.name)) {
                    panel = _this.hideList.get(urlInfo.name);
                    panel.parent = layer;
                    panel.active = false;
                    // this.scheduleOnce(() => {
                    _this.openList.set(urlInfo.name, panel);
                    _this.showPanel(panel, param.param);
                    _this.LoadingList.delete(urlInfo.name);
                    if (_this.LoadingList.size == 0) {
                        //todo mask
                    }
                    if (param.call) {
                        param.call();
                    }
                    // }, 0)
                }
                else {
                    LoadMgr_1.default.loadPrefab(urlInfo.name, LoadMgr_1.default.getBundle(urlInfo.bundle)).then(function (prefab) {
                        panel = cc.instantiate(prefab);
                        panel.parent = layer;
                        panel.active = false;
                        _this.openList.set(urlInfo.name, panel);
                        panel.getComponent(LayerPanel_1.default).initUI();
                        _this.showPanel(panel, param.param);
                        _this.LoadingList.delete(urlInfo.name);
                        if (_this.LoadingList.size == 0) {
                            //todo mask
                        }
                        if (param.call) {
                            param.call();
                        }
                    });
                }
            };
            if (LoadMgr_1.default.judgeBundleLoad(urlInfo.name)) {
                way();
            }
            else {
                LoadMgr_1.default.loadBundle_Single(urlInfo.bundle).then(function () {
                    way();
                });
            }
        };
        //没有配置立即准备打开目标panel
        openPanelWay();
    };
    PanelMgr.prototype.showPanel = function (panel, param) {
        var script = panel.getComponent(LayerPanel_1.default);
        script.show(param);
        panel.active = true;
    };
    /**
     *
     * @param panel 需要关闭的面板
     * @param destroy 是否需要彻底销毁这个面板
     */
    PanelMgr.prototype.closePanel = function (panel, destroy) {
        if (destroy === void 0) { destroy = true; }
        var node = this.openList.get(panel.getUrl().name);
        if (!node) {
            return;
        }
        node.getComponent(LayerPanel_1.default).hide(); //这里可以做清除代码
        node.getComponent(LayerPanel_1.default).unscheduleAllCallbacks(); //取消所有定时器
        if (panel.getUrl().name == "endView") { //如果是endView的化 ，需要同步数据
            CacheMgr_1.default.updateData();
        }
        node.parent = null;
        this.openList.delete(panel.getUrl().name);
        if (destroy) {
            node.getComponent(LayerPanel_1.default).onDestroyDo(); //这里可以做清除代码
            node.destroy();
        }
        else {
            this.hideList.set(panel.getUrl().name, node);
        }
    };
    PanelMgr.prototype.getPanel = function (panel) {
        return this.openList.get(panel.getUrl().name);
    };
    var PanelMgr_1;
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "只要将Game中的场景layer按照顺序赋值即可， 如果存在修改，需要到PannerMgr.ts中修改枚举变量 Layer,也是需要按照绑定顺序"
        })
    ], PanelMgr.prototype, "layers", void 0);
    PanelMgr = PanelMgr_1 = __decorate([
        ccclass
    ], PanelMgr);
    return PanelMgr;
}(cc.Component));
exports.default = PanelMgr;
var Layer;
(function (Layer) {
    Layer[Layer["gameLayer"] = 0] = "gameLayer";
    Layer[Layer["gameInfoLayer"] = 1] = "gameInfoLayer";
    Layer[Layer["otherLayer"] = 2] = "otherLayer";
    Layer[Layer["nativeLayer"] = 3] = "nativeLayer";
})(Layer = exports.Layer || (exports.Layer = {}));
var View;
(function (View) {
    View[View["endView"] = 0] = "endView";
    View[View["gameView"] = 1] = "gameView";
    View[View["homeView"] = 2] = "homeView";
})(View = exports.View || (exports.View = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcUGFuZWxNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUNsQyxxQ0FBZ0M7QUFDaEMsb0NBQStCO0FBQy9CLDRDQUEwQztBQUMxQyxpREFBNEM7QUFFdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwSUM7UUFsSVUsWUFBTSxHQUFjLEVBQUUsQ0FBQTtRQUU3QixpQkFBaUI7UUFDVCxpQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtRQUNwRSxXQUFXO1FBQ0gsY0FBUSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQTtRQUNuRSx5Q0FBeUM7UUFDakMsY0FBUSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQTs7SUEySHZFLENBQUM7aUJBMUlvQixRQUFRO0lBaUJ6Qix5QkFBTSxHQUFOO1FBQ0ksVUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM1QixjQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCw0QkFBUyxHQUFULFVBQVUsS0FBZ0I7UUFBMUIsaUJBb0VDO1FBbkVHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU07U0FDVDtRQUVELE1BQU07UUFDTixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBRWxDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUMsa0JBQWtCO1FBQ3hELFlBQVk7UUFDWixJQUFJLFlBQVksR0FBRztZQUNmLElBQUksR0FBRyxHQUFHO2dCQUNOLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQTtnQkFDekIsNEJBQTRCO2dCQUM1QixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDdkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7b0JBQ3BCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO29CQUNwQiw0QkFBNEI7b0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ3RDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDbEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNyQyxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTt3QkFDNUIsV0FBVztxQkFDZDtvQkFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7d0JBQ1osS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO3FCQUNmO29CQUNELFFBQVE7aUJBQ1g7cUJBQU07b0JBQ0gsaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFpQjt3QkFDdkYsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQzlCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO3dCQUNwQixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTt3QkFDcEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFDdEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7d0JBQ3ZDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDbEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNyQyxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTs0QkFDNUIsV0FBVzt5QkFDZDt3QkFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7NEJBQ1osS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO3lCQUNmO29CQUNMLENBQUMsQ0FBQyxDQUFBO2lCQUNMO1lBQ0wsQ0FBQyxDQUFBO1lBRUQsSUFBSSxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZDLEdBQUcsRUFBRSxDQUFBO2FBQ1I7aUJBQU07Z0JBQ0gsaUJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMzQyxHQUFHLEVBQUUsQ0FBQTtnQkFDVCxDQUFDLENBQUMsQ0FBQTthQUNMO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsbUJBQW1CO1FBQ25CLFlBQVksRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFTyw0QkFBUyxHQUFqQixVQUFrQixLQUFjLEVBQUUsS0FBVTtRQUN4QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsNkJBQVUsR0FBVixVQUFXLEtBQXdCLEVBQUUsT0FBYztRQUFkLHdCQUFBLEVBQUEsY0FBYztRQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU07U0FDVDtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsV0FBVztRQUVoRCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBLENBQUMsU0FBUztRQUNoRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFLEVBQUUsc0JBQXNCO1lBQzFELGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLFdBQVc7WUFDdkQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2pCO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQy9DO0lBQ0wsQ0FBQztJQUVELDJCQUFRLEdBQVIsVUFBUyxLQUF3QjtRQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqRCxDQUFDOztJQWpJRDtRQU5DLFFBQVEsQ0FDTDtZQUNJLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDZixPQUFPLEVBQUUsMEVBQTBFO1NBQ3RGLENBQ0o7NENBQzRCO0lBUlosUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBJNUI7SUFBRCxlQUFDO0NBMUlELEFBMElDLENBMUlxQyxFQUFFLENBQUMsU0FBUyxHQTBJakQ7a0JBMUlvQixRQUFRO0FBNEk3QixJQUFZLEtBS1g7QUFMRCxXQUFZLEtBQUs7SUFDYiwyQ0FBUyxDQUFBO0lBQ1QsbURBQWEsQ0FBQTtJQUNiLDZDQUFVLENBQUE7SUFDViwrQ0FBVyxDQUFBO0FBQ2YsQ0FBQyxFQUxXLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQUtoQjtBQUVELElBQVksSUFJWDtBQUpELFdBQVksSUFBSTtJQUNaLHFDQUFPLENBQUE7SUFDUCx1Q0FBUSxDQUFBO0lBQ1IsdUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFKVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFJZiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi9DYWNoZU1nclwiO1xyXG5pbXBvcnQgTG9hZE1nciBmcm9tIFwiLi9Mb2FkTWdyXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQge0V2ZW50Q29kZX0gZnJvbSBcIi4vRW1pdC9FbWl0RGF0YVwiO1xyXG5pbXBvcnQgTGF5ZXJQYW5lbCBmcm9tIFwiLi9MYXllci9MYXllclBhbmVsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxNZ3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlM6IFBhbmVsTWdyXHJcbiAgICBAcHJvcGVydHkoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5Y+q6KaB5bCGR2FtZeS4reeahOWcuuaZr2xheWVy5oyJ54Wn6aG65bqP6LWL5YC85Y2z5Y+v77yMIOWmguaenOWtmOWcqOS/ruaUue+8jOmcgOimgeWIsFBhbm5lck1nci50c+S4reS/ruaUueaemuS4vuWPmOmHjyBMYXllcizkuZ/mmK/pnIDopoHmjInnhafnu5Hlrprpobrluo9cIlxyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIHB1YmxpYyBsYXllcnM6IGNjLk5vZGVbXSA9IFtdXHJcblxyXG4gICAgLy/lvZPliY3mraPlnKhMb2FkaW5nIOeahOmdouadv1xyXG4gICAgcHJpdmF0ZSBMb2FkaW5nTGlzdDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KClcclxuICAgIC8v5b2T5YmN5omT5byA55qE6Z2i5p2/5pWw57uEXHJcbiAgICBwcml2YXRlIG9wZW5MaXN0OiBNYXA8c3RyaW5nLCBjYy5Ob2RlPiA9IG5ldyBNYXA8c3RyaW5nLCBjYy5Ob2RlPigpXHJcbiAgICAvL+W9k+WJjeWFs+mXreS9huaYr+acquaRp+avgeeahOmdouadv++8jOWtmOWCqOWcqOi/memHjO+8jOS4i+asoeaJk+W8gOivpemdouadv+eahOaXtuWAme+8jOWwseS8muS9v+eUqOi/memHjOeahOmdouadv1xyXG4gICAgcHJpdmF0ZSBoaWRlTGlzdDogTWFwPHN0cmluZywgY2MuTm9kZT4gPSBuZXcgTWFwPHN0cmluZywgY2MuTm9kZT4oKVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBQYW5lbE1nci5JTlMgPSB0aGlzXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BhbmVsTWdy5Yid5aeL5YyW5a6M5oiQJylcclxuICAgICAgICBFbWl0Lmluc3RhbmNlKCkuZW1pdChFdmVudENvZGUuUGFuZWxNZ3JJbml0T0spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW17XHJcbiAgICAgKiAgICAgbGF5ZXIgOiDlnKjlk6rkuIDkuKrlrrnlmajmiZPlvIDpobXpnaJcclxuICAgICAqICAgICBwYW5lbDog5omT5byA6Z2i5p2/XHJcbiAgICAgKiAgICAgY2FsbCA6IOaJk+W8gOaIkOWKn+WbnuiwgyDlj6/pgIlcclxuICAgICAqICAgICBwYXJhbTog5Lyg6YCS57uZ5LiL5LiA5Liq6Z2i5p2/55qE5Y+C5pWwXHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIG9wZW5QYW5lbChwYXJhbTogb3BlblBhcmFtKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5sYXllcnNbcGFyYW0ubGF5ZXJdXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbTonLHBhcmFtLHRoaXMubGF5ZXJzKVxyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WKoOi9veWIhuWMhVxyXG4gICAgICAgIGxldCB1cmxJbmZvID0gcGFyYW0ucGFuZWwuZ2V0VXJsKClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTG9hZGluZ0xpc3QuaGFzKHVybEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3Blbkxpc3QuaGFzKHBhcmFtLnBhbmVsLmdldFVybCgpLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Mb2FkaW5nTGlzdC5zZXQodXJsSW5mby5uYW1lLCAxKSAvL+a3u+WKoOS4gOS4quWKoOi9veagh+ivhu+8jCDpmLLmraLph43lpI3mt7vliqBcclxuICAgICAgICAvL3RvZG8gIG1hc2tcclxuICAgICAgICBsZXQgb3BlblBhbmVsV2F5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2F5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mnInmsqHmnInml6fnmoRwYW5lbOWPr+eUqO+8jOacieeahOivneWwseS4jemHjeaWsOWunuS+i+WMluS6hlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZUxpc3QuaGFzKHVybEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbCA9IHRoaXMuaGlkZUxpc3QuZ2V0KHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5wYXJlbnQgPSBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc2V0KHVybEluZm8ubmFtZSwgcGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwocGFuZWwsIHBhcmFtLnBhcmFtKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ0xpc3QuZGVsZXRlKHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Mb2FkaW5nTGlzdC5zaXplID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvIG1hc2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0sIDApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvYWRNZ3IubG9hZFByZWZhYih1cmxJbmZvLm5hbWUsIExvYWRNZ3IuZ2V0QnVuZGxlKHVybEluZm8uYnVuZGxlKSkudGhlbigocHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLnBhcmVudCA9IGxheWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc2V0KHVybEluZm8ubmFtZSwgcGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChMYXllclBhbmVsKS5pbml0VUkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbChwYW5lbCwgcGFyYW0ucGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ0xpc3QuZGVsZXRlKHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTG9hZGluZ0xpc3Quc2l6ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG8gbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChMb2FkTWdyLmp1ZGdlQnVuZGxlTG9hZCh1cmxJbmZvLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB3YXkoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9hZE1nci5sb2FkQnVuZGxlX1NpbmdsZSh1cmxJbmZvLmJ1bmRsZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/msqHmnInphY3nva7nq4vljbPlh4blpIfmiZPlvIDnm67moIdwYW5lbFxyXG4gICAgICAgIG9wZW5QYW5lbFdheSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UGFuZWwocGFuZWw6IGNjLk5vZGUsIHBhcmFtOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2NyaXB0ID0gcGFuZWwuZ2V0Q29tcG9uZW50KExheWVyUGFuZWwpXHJcbiAgICAgICAgc2NyaXB0LnNob3cocGFyYW0pXHJcbiAgICAgICAgcGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYW5lbCDpnIDopoHlhbPpl63nmoTpnaLmnb9cclxuICAgICAqIEBwYXJhbSBkZXN0cm95IOaYr+WQpumcgOimgeW9u+W6lemUgOavgei/meS4qumdouadv1xyXG4gICAgICovXHJcbiAgICBjbG9zZVBhbmVsKHBhbmVsOiB0eXBlb2YgTGF5ZXJQYW5lbCwgZGVzdHJveSA9IHRydWUpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMub3Blbkxpc3QuZ2V0KHBhbmVsLmdldFVybCgpLm5hbWUpXHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTGF5ZXJQYW5lbCkuaGlkZSgpIC8v6L+Z6YeM5Y+v5Lul5YGa5riF6Zmk5Luj56CBXHJcblxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExheWVyUGFuZWwpLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKSAvL+WPlua2iOaJgOacieWumuaXtuWZqFxyXG4gICAgICAgIGlmIChwYW5lbC5nZXRVcmwoKS5uYW1lID09IFwiZW5kVmlld1wiKSB7IC8v5aaC5p6c5pivZW5kVmlld+eahOWMliDvvIzpnIDopoHlkIzmraXmlbDmja5cclxuICAgICAgICAgICAgQ2FjaGVNZ3IudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBudWxsXHJcbiAgICAgICAgdGhpcy5vcGVuTGlzdC5kZWxldGUocGFuZWwuZ2V0VXJsKCkubmFtZSlcclxuICAgICAgICBpZiAoZGVzdHJveSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChMYXllclBhbmVsKS5vbkRlc3Ryb3lEbygpIC8v6L+Z6YeM5Y+v5Lul5YGa5riF6Zmk5Luj56CBXHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlTGlzdC5zZXQocGFuZWwuZ2V0VXJsKCkubmFtZSwgbm9kZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFuZWwocGFuZWw6IHR5cGVvZiBMYXllclBhbmVsKTogY2MuTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbkxpc3QuZ2V0KHBhbmVsLmdldFVybCgpLm5hbWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExheWVyIHtcclxuICAgIGdhbWVMYXllcixcclxuICAgIGdhbWVJbmZvTGF5ZXIsXHJcbiAgICBvdGhlckxheWVyLFxyXG4gICAgbmF0aXZlTGF5ZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpZXcge1xyXG4gICAgZW5kVmlldyxcclxuICAgIGdhbWVWaWV3LFxyXG4gICAgaG9tZVZpZXcsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb3BlblBhcmFtIHtcclxuICAgIGxheWVyOiBMYXllcixcclxuICAgIHBhbmVsOiB0eXBlb2YgTGF5ZXJQYW5lbCxcclxuICAgIGNhbGw/OiBGdW5jdGlvbixcclxuICAgIHBhcmFtPzogYW55XHJcbn1cclxuXHJcbiJdfQ==