
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQWNBLENBQUM7SUFiRyxtREFBbUQ7SUFDckMsYUFBSSxHQUFsQixVQUFtQixLQUFVO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFFYSxrQkFBUyxHQUFZLElBQUksQ0FBQztJQUUxQixvQkFBVyxHQUFZLElBQUksQ0FBQztJQUU1QixzQkFBYSxHQUFZLElBQUksQ0FBQztJQUVoRCxlQUFDO0NBZEQsQUFjQyxJQUFBO2tCQWRvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJNZ3Ige1xyXG4gICAgLy/ov5nph4zmmK/liJ3lp4vljJbkuInkuKrniLboioLngrnogIzlt7Ig77yM5a6e5ZyoTWFpbuS4reiwg+eUqOeahO+8jOS5i+WQjuWPr+S7peeUqOS6jiBVSU1nciBvcGVuVUkg55qE5Y+C5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQocGFyYW06IGFueSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUxheWVyID0gcGFyYW0uZ2FtZUxheWVyO1xyXG4gICAgICAgIHRoaXMuYmFubmVyTGF5ZXIgPSBwYXJhbS5iYW5uZXJMYXllcjtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvTGF5ZXIgPSBwYXJhbS5nYW1lSW5mb0xheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2FtZUxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGJhbm5lckxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdhbWVJbmZvTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxufVxyXG4iXX0=