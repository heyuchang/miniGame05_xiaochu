
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDRDQUFvQztBQUU3QixJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUdoQztJQUFpRCw4QkFBTztJQUF4RDtRQUFBLHFFQThCQztRQXhCRyxrREFBa0Q7UUFDM0MsWUFBTSxHQUFnQixFQUFFLENBQUE7O0lBdUJuQyxDQUFDO0lBN0JpQixpQkFBTSxHQUFwQjtRQUNJLG9CQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQXVCTSxnQ0FBVyxHQUFsQjtJQUVBLENBQUM7SUE3QnlCLFVBQVU7UUFEdkMsT0FBTztPQUNzQixVQUFVLENBOEJ2QztJQUFELGlCQUFDO0NBOUJELEFBOEJDLENBOUJnRCxpQkFBTyxHQThCdkQ7a0JBOUI2QixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyVUkgZnJvbSBcIi4vTGF5ZXJVSVwiO1xyXG5pbXBvcnQgR2FtZUxvZyBmcm9tIFwiLi4vR2FtZUxvZ01nclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3N9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIExheWVyUGFuZWwgZXh0ZW5kcyBMYXllclVJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIEdhbWVMb2cuZXJyb3IoXCLpnIDopoHph43lhplnZXRVUkxcIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvL+WKqOaAgeWKoOi9veeahOi1hOa6kCAgLOWwhumcgOimgea4hemZpOeahOWKqOaAgei1hOa6kOaUvuWcqGFzc2V05Lit77yM5Zyo6K+l6Z2i5p2/6ZSA5q+B55qE5pe25YCZ77yM5Lya6Ieq5Yqo6YeK5pS+6L+Z5Lqb6LWE5rqQXHJcbiAgICBwdWJsaWMgYXNzZXRzOiBjYy5Bc3NldCBbXSA9IFtdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogIOmdouadv+WIneWni+WMliznrKzkuIDmrKHnlJ/miJDnmoTml7blgJnosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGluaXRVSSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIOmdouadv+aYvuekuiDmr4/mrKHmmL7npLrpg73osIPnlKgg5Y+v5Lul6L+b6KGM55u45YWz5Yid5aeL5YyW77yIVUnjgIHkuovku7bvvInkvJrlnKhvbmxvYWTvvIxzdGFydOS5i+WJjeiwg+eUqFxyXG4gICAgICogQHBhcmFtIHBhcmFtIOmdouadv+aYvuekuuWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2hvdyhwYXJhbTogYW55KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmdouadv+makOiXjyAg5q+P5qyh5Zug5q2k6YO96LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBoaWRlKCk7XHJcblxyXG4gICAgcHVibGljIG9uRGVzdHJveURvKCkge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXJsSW5mbyB7XHJcbiAgICBidW5kbGU6IHN0cmluZyxcclxuICAgIG5hbWU6IHN0cmluZyxcclxufVxyXG4iXX0=