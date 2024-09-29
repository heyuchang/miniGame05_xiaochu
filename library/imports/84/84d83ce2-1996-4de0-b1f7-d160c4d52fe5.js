"use strict";
cc._RF.push(module, '84d83ziGZZN4LH30WDE1S/l', 'GameLogMgr');
// Script/Common/manage/GameLogMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../Global");
var GameLogMgr = /** @class */ (function () {
    function GameLogMgr() {
    }
    GameLogMgr.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.log.apply(cc.log, args);
        }
    };
    GameLogMgr.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.warn.apply(cc.warn, args);
        }
    };
    GameLogMgr.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.error.apply(cc.error, args);
        }
    };
    return GameLogMgr;
}());
exports.default = GameLogMgr;

cc._RF.pop();