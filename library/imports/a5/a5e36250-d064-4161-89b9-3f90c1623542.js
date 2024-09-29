"use strict";
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