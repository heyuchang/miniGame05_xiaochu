"use strict";
cc._RF.push(module, '05e78fNvJNI3af2BGa5v0Hg', 'LogMgr');
// Script/Common/LogMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LogMgr = /** @class */ (function () {
    function LogMgr() {
    }
    LogMgr.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.log.apply(cc.log, args);
        }
    };
    LogMgr.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.warn.apply(cc.warn, args);
        }
    };
    LogMgr.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.error.apply(cc.error, args);
        }
    };
    return LogMgr;
}());
exports.default = LogMgr;

cc._RF.pop();