"use strict";
cc._RF.push(module, '91564A1TFxPHpZ2/kzicOPw', 'LayerMgr');
// Script/Common/manage/Layer/LayerMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayerMgr = /** @class */ (function () {
    function LayerMgr() {
    }
    //这里是初始化三个父节点而已 ，实在Main中调用的，之后可以用于 UIMgr openUI 的参数
    LayerMgr.init = function (param) {
        this.gameLayer = param.gameLayer;
        this.bannerLayer = param.bannerLayer;
        this.gameInfoLayer = param.gameInfoLayer;
    };
    LayerMgr.gameLayer = null;
    LayerMgr.bannerLayer = null;
    LayerMgr.gameInfoLayer = null;
    return LayerMgr;
}());
exports.default = LayerMgr;

cc._RF.pop();