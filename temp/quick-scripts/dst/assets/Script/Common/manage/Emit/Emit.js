
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/Emit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d5e4GincFNvokwnifcxxO2', 'Emit');
// Script/Common/manage/Emit/Emit.ts

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
/**
 * 事件管理器
 */
var EmitBase_1 = require("./EmitBase");
var Emit = /** @class */ (function (_super) {
    __extends(Emit, _super);
    function Emit() {
        var _this = _super.call(this) || this;
        if (Emit._instance) {
            return _this;
        }
        Emit._instance = _this;
        return _this;
    }
    Emit.instance = function () {
        return this._instance;
    };
    Emit._instance = new EmitBase_1.default();
    return Emit;
}(EmitBase_1.default));
exports.default = Emit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHVDQUFrQztBQUVsQztJQUFrQyx3QkFBUTtJQVF0QztRQUFBLFlBQ0ksaUJBQU8sU0FLVjtRQUpHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7U0FFbkI7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQzs7SUFDMUIsQ0FBQztJQVZhLGFBQVEsR0FBdEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUpnQixjQUFTLEdBQWEsSUFBSSxrQkFBUSxFQUFFLENBQUM7SUFjMUQsV0FBQztDQWhCRCxBQWdCQyxDQWhCaUMsa0JBQVEsR0FnQnpDO2tCQWhCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDkuovku7bnrqHnkIblmahcclxuICovXHJcbmltcG9ydCBFbWl0QmFzZSBmcm9tIFwiLi9FbWl0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdCBleHRlbmRzIEVtaXRCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogRW1pdEJhc2UgPSBuZXcgRW1pdEJhc2UoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlKCk6IEVtaXRCYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoRW1pdC5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBFbWl0Ll9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==