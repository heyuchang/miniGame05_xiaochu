"use strict";
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