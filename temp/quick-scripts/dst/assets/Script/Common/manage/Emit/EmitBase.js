
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/EmitBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDRDQUFvQztBQUdwQztJQUFzQyw0QkFBYztJQUFwRDs7SUF1RkEsQ0FBQztJQXRGRzs7Ozs7O09BTUc7SUFDSSxxQkFBRSxHQUFULFVBQThCLElBQXFCLEVBQUUsT0FBVSxFQUFFLE1BQVcsRUFBRSxVQUFvQjtRQUM5RixJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pDLG9CQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakUsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsT0FBTyxpQkFBTSxFQUFFLFlBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7U0FDckQ7YUFBTTtZQUNILE9BQU8saUJBQU0sRUFBRSxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQ2hFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx1QkFBSSxHQUFYLFVBQVksSUFBcUIsRUFBRSxPQUE2RSxFQUFFLE1BQVk7UUFDMUgsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3pCLE9BQU8saUJBQU0sSUFBSSxZQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILE9BQU8saUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkQ7SUFFTCxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSSxzQkFBRyxHQUFWLFVBQVcsSUFBcUIsRUFBRSxPQUFpQixFQUFFLE1BQVc7UUFDNUQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3pCLE9BQU8saUJBQU0sR0FBRyxZQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILE9BQU8saUJBQU0sR0FBRyxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQVMsR0FBaEIsVUFBaUIsTUFBVztRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1Qsb0JBQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNWO1FBQ0QsT0FBTyxpQkFBTSxTQUFTLFlBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksdUJBQUksR0FBWCxVQUFZLElBQXFCLEVBQUUsSUFBVSxFQUFFLElBQVUsRUFBRSxJQUFVLEVBQUUsSUFBVSxFQUFFLElBQVU7UUFDekYsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUN4RDthQUFNO1lBQ0gsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNuRTtJQUNMLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0F2RkEsQUF1RkMsQ0F2RnFDLEVBQUUsQ0FBQyxXQUFXLEdBdUZuRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5LqL5Lu25rS+5Y+RXHJcbmltcG9ydCBHYW1lTG9nIGZyb20gXCIuLi9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBpc051bWJlciA9IGNjLmpzLmlzTnVtYmVyO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdEJhc2UgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICogQHBhcmFtIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB0YXJnZXRcclxuICAgICAqIEBwYXJhbSB1c2VDYXB0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZyB8IG51bWJlciwgaGFuZGxlcjogVCwgdGFyZ2V0OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVCB7XHJcbiAgICAgICAgaWYgKCghdHlwZSAmJiB0eXBlICE9IDApIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuS6i+S7tuWvueixoXznsbvlnovkuLrnqbo9PT0+IHR5cGUgPSBcIiwgdHlwZSwgXCJ0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbih0eXBlLCBoYW5kbGVyLCB0YXJnZXQsIHVzZUNhcHR1cmUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uKHR5cGUudG9TdHJpbmcoKSwgaGFuZGxlciwgdGFyZ2V0LCB1c2VDYXB0dXJlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGhhbmRsZXI6IChhcmcxPzogYW55LCBhcmcyPzogYW55LCBhcmczPzogYW55LCBhcmc0PzogYW55LCBhcmc1PzogYW55KSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXR5cGUgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKFwi5LqL5Lu25a+56LGhfOexu+Wei+S4uuepuj09PT4gdHlwZSA9IFwiLCB0eXBlLCBcInRhcmdldCA9XCIsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbmNlKHR5cGUsIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uY2UodHlwZS50b1N0cmluZygpLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZyB8IG51bWJlciwgaGFuZGxlcjogRnVuY3Rpb24sIHRhcmdldDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0eXBlIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuS6i+S7tuWvueixoXznsbvlnovkuLrnqbo9PT0+IHR5cGUgPSBcIiwgdHlwZSwgXCJ0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIub2ZmKHR5cGUsIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9mZih0eXBlLnRvU3RyaW5nKCksIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0YXJnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldE9mZih0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoXCLkuovku7blr7nosaE9PT0+ICB0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdXBlci50YXJnZXRPZmYodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUgIOS6i+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtIGFyZzFcclxuICAgICAqIEBwYXJhbSBhcmcyXHJcbiAgICAgKiBAcGFyYW0gYXJnM1xyXG4gICAgICogQHBhcmFtIGFyZzRcclxuICAgICAqIEBwYXJhbSBhcmc1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0KHR5cGU6IHN0cmluZyB8IG51bWJlciwgYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5lbWl0KHR5cGUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmVtaXQodHlwZS50b1N0cmluZygpLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=