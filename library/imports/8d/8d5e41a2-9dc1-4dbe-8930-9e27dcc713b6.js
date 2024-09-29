"use strict";
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