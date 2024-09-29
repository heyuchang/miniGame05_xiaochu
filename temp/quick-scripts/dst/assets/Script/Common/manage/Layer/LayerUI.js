
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07b55fvQGxH34PGtUdVwK/o', 'LayerUI');
// Script/Common/manage/Layer/LayerUI.ts

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
var AudioMgr_1 = require("../AudioMgr");
var GameLogMgr_1 = require("../GameLogMgr");
/**
 * 这个是 封装了一些方法  ，例如 注册点击事件 销毁事件 等等
 */
var ccclass = cc._decorator.ccclass;
var LayerUI = /** @class */ (function (_super) {
    __extends(LayerUI, _super);
    function LayerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._touchList = {};
        _this._touchEndList = {};
        _this._enableList = {};
        return _this;
    }
    /**
     * 是否交互 需在target注册onTouch之后
     * @param target
     * @param v
     * @param isGray
     */
    LayerUI.prototype.setInteractable = function (target, v, isGray) {
        if (isGray === void 0) { isGray = true; }
        if (!target)
            return;
        var button = target.getComponent(cc.Button);
        if (button) {
            button.enableAutoGrayEffect = isGray;
            button.interactable = v;
        }
        this._enableList[target.name] = { enabled: v, isGray: isGray };
    };
    /**
     *  注册点击事件
     * @param target    点击对象
     * @param handler   触发事件
     * @param sound     播放声音名称
     * @param scale     缩放值
     * @param stopEvent
     */
    LayerUI.prototype.onTouch = function (target, handler, sound, scale, stopEvent) {
        var _this = this;
        if (sound === void 0) { sound = "click"; }
        if (scale === void 0) { scale = 0.9; }
        if (stopEvent === void 0) { stopEvent = true; }
        if (!target || !handler) {
            GameLogMgr_1.default.error("target || handler为空-->", target, handler);
            return;
        }
        var targetName = target.name;
        if (this._touchList[targetName] && this._touchList[targetName].target == target) {
            GameLogMgr_1.default.warn("重复设置-->", targetName);
            return;
        }
        //添加一个button 动画
        var button = target.getComponent(cc.Button);
        if (scale != 1) {
            if (!button) {
                button = target.addComponent(cc.Button);
                button.transition = cc.Button.Transition.SCALE;
                button.zoomScale = scale;
            }
        }
        var enabled = true;
        var isGray = true;
        if (this._enableList[target.name]) {
            enabled = this._enableList[target.name].enabled;
            isGray = this._enableList[target.name].isGray;
        }
        this.setInteractable(target, enabled, isGray);
        var callObj = this;
        var touchHandler = function (event) {
            var _a = (_this._enableList[target.name] || {}).enabled, enabled = _a === void 0 ? true : _a;
            if (!enabled) {
                return;
            }
            if (stopEvent) {
                event.stopPropagation();
            }
            if (sound && sound != "") {
                // if (sound === "check") {
                // sound = "piano/a" + Math.floor(Math.random() * (5 - 1) + 1);
                // }
                AudioMgr_1.default.play(sound).then();
            }
            handler.call(callObj, event);
        };
        target.on(cc.Node.EventType.TOUCH_START, touchHandler);
        this._touchList[targetName] = { target: target, handler: touchHandler, callObj: callObj };
    };
    LayerUI.prototype.onTouchEnd = function (target, handler) {
        if (!target || !handler) {
            GameLogMgr_1.default.error("target || handle为空 ondTouchEnd -->", target, handler);
            return;
        }
        var targetName = target.name;
        if (this._touchEndList[targetName] && this._touchEndList[targetName].target == target) {
            GameLogMgr_1.default.warn("重复设置 --> onTouchEnd ", targetName);
        }
        var callObj = this;
        var touchHandler = function (event) {
            handler.call(callObj, event);
        };
        target.on(cc.Node.EventType.TOUCH_END, touchHandler);
        target.on(cc.Node.EventType.TOUCH_CANCEL, touchHandler);
        this._touchEndList[targetName] = { target: target, handler: touchHandler, callObj: callObj };
    };
    LayerUI.prototype.offTouchEnd = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("target 为空 ");
            return;
        }
        var targetName = target.name;
        if (this._touchEndList[targetName]) {
            var handler = this._touchEndList[targetName].handler;
            target.off(cc.Node.EventType.TOUCH_END, handler);
            target.off(cc.Node.EventType.TOUCH_CANCEL, handler);
            delete this._touchEndList[targetName];
        }
    };
    /**
     * 移除对象点击事件
     * @param target
     */
    LayerUI.prototype.offTouch = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("target 为空");
            return;
        }
        var targetName = target.name;
        if (this._touchList[targetName]) {
            var touchHandler = this._touchList[targetName].handler;
            target.off(cc.Node.EventType.TOUCH_START, touchHandler);
            delete this._touchList[targetName];
        }
        delete this._enableList[targetName];
    };
    LayerUI.prototype.clear = function () {
        for (var key in this._touchList) {
            this.offTouch(this._touchList[key].target);
        }
    };
    LayerUI.prototype.onDestroy = function () {
        this.clear();
    };
    /**
     *
     * @param path 路径或者名字
     */
    LayerUI.prototype.getNode = function (path) {
        var node = null;
        if (path == "" || !path)
            return null;
        if (path.indexOf("/") != -1) {
            node = cc.find(path, this.node);
        }
        else {
            node = this.node.getChildByName(path);
        }
        if (!node) {
            GameLogMgr_1.default.warn("未找到该节点  path=", path);
        }
        return node;
    };
    LayerUI = __decorate([
        ccclass
    ], LayerUI);
    return LayerUI;
}(cc.Component));
exports.default = LayerUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQW1DO0FBQ25DLDRDQUFvQztBQUVwQzs7R0FFRztBQUNJLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBeUtDO1FBdktXLGdCQUFVLEdBQW9ELEVBQUUsQ0FBQztRQUNqRSxtQkFBYSxHQUFvRCxFQUFFLENBQUE7UUFFbkUsaUJBQVcsR0FBNkQsRUFBRSxDQUFDOztJQW9LdkYsQ0FBQztJQWpLRzs7Ozs7T0FLRztJQUNPLGlDQUFlLEdBQXpCLFVBQTBCLE1BQWUsRUFBRSxDQUFVLEVBQUUsTUFBc0I7UUFBdEIsdUJBQUEsRUFBQSxhQUFzQjtRQUN6RSxJQUFJLENBQUMsTUFBTTtZQUNQLE9BQU87UUFDWCxJQUFJLE1BQU0sR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7WUFDckMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLHlCQUFPLEdBQWpCLFVBQWtCLE1BQWUsRUFBRSxPQUFpQixFQUFFLEtBQXVCLEVBQUUsS0FBVyxFQUFFLFNBQWdCO1FBQTVHLGlCQW1EQztRQW5EcUQsc0JBQUEsRUFBQSxlQUF1QjtRQUFFLHNCQUFBLEVBQUEsV0FBVztRQUFFLDBCQUFBLEVB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QUdHO0lBQ08seUJBQU8sR0FBakIsVUFBa0IsSUFBWTtRQUMxQixJQUFJLElBQUksR0FBWSxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNuQixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLG9CQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF2S2dCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F5SzNCO0lBQUQsY0FBQztDQXpLRCxBQXlLQyxDQXpLb0MsRUFBRSxDQUFDLFNBQVMsR0F5S2hEO2tCQXpLb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdWRpb01nciBmcm9tIFwiLi4vQXVkaW9NZ3JcIjtcclxuaW1wb3J0IEdhbWVMb2cgZnJvbSBcIi4uL0dhbWVMb2dNZ3JcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nkuKrmmK8g5bCB6KOF5LqG5LiA5Lqb5pa55rOVICDvvIzkvovlpoIg5rOo5YaM54K55Ye75LqL5Lu2IOmUgOavgeS6i+S7tiDnrYnnrYlcclxuICovXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllclVJIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF90b3VjaExpc3Q6IHsgW2tleTogc3RyaW5nXTogeyB0YXJnZXQsIGhhbmRsZXIsIGNhbGxPYmogfSB9ID0ge307XHJcbiAgICBwcml2YXRlIF90b3VjaEVuZExpc3Q6IHsgW2tleTogc3RyaW5nXTogeyB0YXJnZXQsIGhhbmRsZXIsIGNhbGxPYmogfSB9ID0ge31cclxuXHJcbiAgICBwcml2YXRlIF9lbmFibGVMaXN0OiB7IFtrZXk6IHN0cmluZ106IHsgZW5hYmxlZDogYm9vbGVhbiwgaXNHcmF5OiBib29sZWFuIH0gfSA9IHt9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS6pOS6kiDpnIDlnKh0YXJnZXTms6jlhoxvblRvdWNo5LmL5ZCOXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICogQHBhcmFtIGlzR3JheVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0SW50ZXJhY3RhYmxlKHRhcmdldDogY2MuTm9kZSwgdjogYm9vbGVhbiwgaXNHcmF5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gdGFyZ2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgYnV0dG9uLmVuYWJsZUF1dG9HcmF5RWZmZWN0ID0gaXNHcmF5O1xyXG4gICAgICAgICAgICBidXR0b24uaW50ZXJhY3RhYmxlID0gdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlTGlzdFt0YXJnZXQubmFtZV0gPSB7ZW5hYmxlZDogdiwgaXNHcmF5fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDms6jlhozngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgICAg54K55Ye75a+56LGhXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlciAgIOinpuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHNvdW5kICAgICDmkq3mlL7lo7Dpn7PlkI3np7BcclxuICAgICAqIEBwYXJhbSBzY2FsZSAgICAg57yp5pS+5YC8XHJcbiAgICAgKiBAcGFyYW0gc3RvcEV2ZW50XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblRvdWNoKHRhcmdldDogY2MuTm9kZSwgaGFuZGxlcjogRnVuY3Rpb24sIHNvdW5kOiBzdHJpbmcgPSBcImNsaWNrXCIsIHNjYWxlID0gMC45LCBzdG9wRXZlbnQgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcInRhcmdldCB8fCBoYW5kbGVy5Li656m6LS0+XCIsIHRhcmdldCwgaGFuZGxlcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXROYW1lOiBzdHJpbmcgPSB0YXJnZXQubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdICYmIHRoaXMuX3RvdWNoTGlzdFt0YXJnZXROYW1lXS50YXJnZXQgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cud2FybihcIumHjeWkjeiuvue9ri0tPlwiLCB0YXJnZXROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mt7vliqDkuIDkuKpidXR0b24g5Yqo55S7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICBpZiAoc2NhbGUgIT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGFyZ2V0LmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnRyYW5zaXRpb24gPSBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi56b29tU2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBlbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaXNHcmF5ID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fZW5hYmxlTGlzdFt0YXJnZXQubmFtZV0pIHtcclxuICAgICAgICAgICAgZW5hYmxlZCA9IHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0Lm5hbWVdLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGlzR3JheSA9IHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0Lm5hbWVdLmlzR3JheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SW50ZXJhY3RhYmxlKHRhcmdldCwgZW5hYmxlZCwgaXNHcmF5KTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGxPYmogPSB0aGlzO1xyXG4gICAgICAgIGxldCB0b3VjaEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtlbmFibGVkID0gdHJ1ZX0gPSB0aGlzLl9lbmFibGVMaXN0W3RhcmdldC5uYW1lXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0b3BFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdW5kICYmIHNvdW5kICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChzb3VuZCA9PT0gXCJjaGVja1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzb3VuZCA9IFwicGlhbm8vYVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDUgLSAxKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShzb3VuZCkudGhlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjYWxsT2JqLCBldmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRvdWNoSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdID0ge3RhcmdldDogdGFyZ2V0LCBoYW5kbGVyOiB0b3VjaEhhbmRsZXIsIGNhbGxPYmo6IGNhbGxPYmp9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblRvdWNoRW5kKHRhcmdldDogY2MuTm9kZSwgaGFuZGxlcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRhcmdldCB8fCAhaGFuZGxlcikge1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKFwidGFyZ2V0IHx8IGhhbmRsZeS4uuepuiBvbmRUb3VjaEVuZCAtLT5cIiwgdGFyZ2V0LCBoYW5kbGVyKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldE5hbWU6IHN0cmluZyA9IHRhcmdldC5uYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXSAmJiB0aGlzLl90b3VjaEVuZExpc3RbdGFyZ2V0TmFtZV0udGFyZ2V0ID09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLph43lpI3orr7nva4gLS0+IG9uVG91Y2hFbmQgXCIsIHRhcmdldE5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FsbE9iaiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRvdWNoSGFuZGxlciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwoY2FsbE9iaiwgZXZlbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGFyZ2V0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdG91Y2hIYW5kbGVyKTtcclxuICAgICAgICB0YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0b3VjaEhhbmRsZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl90b3VjaEVuZExpc3RbdGFyZ2V0TmFtZV0gPSB7dGFyZ2V0OiB0YXJnZXQsIGhhbmRsZXI6IHRvdWNoSGFuZGxlciwgY2FsbE9iajogY2FsbE9ian07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9mZlRvdWNoRW5kKHRhcmdldDogY2MuTm9kZSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoXCJ0YXJnZXQg5Li656m6IFwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldE5hbWU6IHN0cmluZyA9IHRhcmdldC5uYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXSkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXS5oYW5kbGVyXHJcbiAgICAgICAgICAgIHRhcmdldC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBoYW5kbGVyKVxyXG4gICAgICAgICAgICB0YXJnZXQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgaGFuZGxlcilcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOWvueixoeeCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb2ZmVG91Y2godGFyZ2V0OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcInRhcmdldCDkuLrnqbpcIik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFyZ2V0TmFtZTogc3RyaW5nID0gdGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdFt0YXJnZXROYW1lXSkge1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hIYW5kbGVyID0gdGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdLmhhbmRsZXI7XHJcbiAgICAgICAgICAgIHRhcmdldC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRvdWNoSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl90b3VjaExpc3RbdGFyZ2V0TmFtZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0TmFtZV1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGNsZWFyKCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl90b3VjaExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZUb3VjaCh0aGlzLl90b3VjaExpc3Rba2V5XS50YXJnZXQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCDot6/lvoTmiJbogIXlkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE5vZGUocGF0aDogc3RyaW5nKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmIChwYXRoID09IFwiXCIgfHwgIXBhdGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIvXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5maW5kKHBhdGgsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShwYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLmnKrmib7liLDor6XoioLngrkgIHBhdGg9XCIsIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19