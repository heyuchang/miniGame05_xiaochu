
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5633cJ6yBFCb2RIub9WDst', 'Test');
// Script/Common/Test.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./manage/GameLogMgr");
var TestMgr = /** @class */ (function () {
    function TestMgr() {
    }
    TestMgr.start = function (flag) {
        if (this.timeData.has(flag)) {
            GameLogMgr_1.default.warn("TestMgr 重复 flag ", flag);
            return;
        }
        this.timeData.set(flag, new Date().getTime());
    };
    TestMgr.end = function (flag) {
        if (!this.timeData.has(flag)) {
            GameLogMgr_1.default.warn("flag不存在， 无法计算时差", flag);
            return;
        }
        GameLogMgr_1.default.log(flag, new Date().getTime() - this.timeData.get(flag));
        this.timeData.delete(flag);
    };
    TestMgr.timeData = new Map();
    return TestMgr;
}());
exports.default = TestMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFFN0M7SUFBQTtJQW9CQSxDQUFDO0lBakJpQixhQUFLLEdBQW5CLFVBQW9CLElBQVk7UUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixvQkFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN6QyxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFYSxXQUFHLEdBQWpCLFVBQWtCLElBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLG9CQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hDLE9BQU07U0FDVDtRQUNELG9CQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQWpCYyxnQkFBUSxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtJQW1CNUUsY0FBQztDQXBCRCxBQW9CQyxJQUFBO2tCQXBCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTG9nTWdyIGZyb20gXCIuL21hbmFnZS9HYW1lTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHRpbWVEYXRhOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhcnQoZmxhZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZURhdGEuaGFzKGZsYWcpKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2dNZ3Iud2FybihcIlRlc3RNZ3Ig6YeN5aSNIGZsYWcgXCIsIGZsYWcpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVEYXRhLnNldChmbGFnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuZChmbGFnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGltZURhdGEuaGFzKGZsYWcpKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2dNZ3Iud2FybihcImZsYWfkuI3lrZjlnKjvvIwg5peg5rOV6K6h566X5pe25beuXCIsIGZsYWcpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTG9nTWdyLmxvZyhmbGFnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMudGltZURhdGEuZ2V0KGZsYWcpKVxyXG4gICAgICAgIHRoaXMudGltZURhdGEuZGVsZXRlKGZsYWcpXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==