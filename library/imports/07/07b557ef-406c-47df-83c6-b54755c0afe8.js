"use strict";
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