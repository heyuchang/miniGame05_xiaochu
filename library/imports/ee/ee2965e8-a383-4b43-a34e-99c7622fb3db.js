"use strict";
cc._RF.push(module, 'ee296Xoo4NLQ6NOmcdiL7Pb', 'LayerPanel');
// Script/Common/manage/Layer/LayerPanel.ts

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
var LayerUI_1 = require("./LayerUI");
var GameLogMgr_1 = require("../GameLogMgr");
var ccclass = cc._decorator.ccclass;
var LayerPanel = /** @class */ (function (_super) {
    __extends(LayerPanel, _super);
    function LayerPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //动态加载的资源  ,将需要清除的动态资源放在asset中，在该面板销毁的时候，会自动释放这些资源
        _this.assets = [];
        return _this;
    }
    LayerPanel.getUrl = function () {
        GameLogMgr_1.default.error("需要重写getURL");
        return null;
    };
    LayerPanel.prototype.onDestroyDo = function () {
    };
    LayerPanel = __decorate([
        ccclass
    ], LayerPanel);
    return LayerPanel;
}(LayerUI_1.default));
exports.default = LayerPanel;

cc._RF.pop();