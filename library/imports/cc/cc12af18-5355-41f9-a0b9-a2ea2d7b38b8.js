"use strict";
cc._RF.push(module, 'cc12a8YU1VB+aC5ouotezi4', 'EmitBase');
// Script/Common/manage/Emit/EmitBase.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
//事件派发
var GameLogMgr_1 = require("../GameLogMgr");
var EmitBase = /** @class */ (function (_super) {
    __extends(EmitBase, _super);
    function EmitBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param type
     * @param handler
     * @param target
     * @param useCapture
     */
    EmitBase.prototype.on = function (type, handler, target, useCapture) {
        if ((!type && type != 0) || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.on.call(this, type, handler, target, useCapture);
        }
        else {
            return _super.prototype.on.call(this, type.toString(), handler, target, useCapture);
        }
    };
    /**
     * @param type
     * @param handler
     * @param target
     */
    EmitBase.prototype.once = function (type, handler, target) {
        if (!type || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.once.call(this, type, handler, target);
        }
        else {
            return _super.prototype.once.call(this, type.toString(), handler, target);
        }
    };
    /**
     *
     * @param type
     * @param handler
     * @param target
     */
    EmitBase.prototype.off = function (type, handler, target) {
        if (!type || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.off.call(this, type, handler, target);
        }
        else {
            return _super.prototype.off.call(this, type.toString(), handler, target);
        }
    };
    /**
     *
     * @param target
     */
    EmitBase.prototype.targetOff = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("事件对象===>  target =", target);
            return;
        }
        return _super.prototype.targetOff.call(this, target);
    };
    /**
     * 派发事件
     * @param type  事件类型
     * @param arg1
     * @param arg2
     * @param arg3
     * @param arg4
     * @param arg5
     */
    EmitBase.prototype.emit = function (type, arg1, arg2, arg3, arg4, arg5) {
        if (typeof type == "string") {
            return _super.prototype.emit.call(this, type, arg1, arg2, arg3, arg4, arg5);
        }
        else {
            return _super.prototype.emit.call(this, type.toString(), arg1, arg2, arg3, arg4, arg5);
        }
    };
    return EmitBase;
}(cc.EventTarget));
exports.default = EmitBase;

cc._RF.pop();