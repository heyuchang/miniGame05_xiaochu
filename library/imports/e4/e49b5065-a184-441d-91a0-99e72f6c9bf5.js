"use strict";
cc._RF.push(module, 'e49b5BloYREHZGgmecvbJv1', 'TimerMgr');
// Script/Common/manage/TimerMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheMgr_1 = require("./CacheMgr");
var Tools_1 = require("../Tools");
var Emit_1 = require("./Emit/Emit");
var EmitData_1 = require("./Emit/EmitData");
/**
 *  总定时器 ， 用来 判断签到 或者恢复体力  每分钟判断
 */
var TimerMgr = /** @class */ (function () {
    function TimerMgr() {
        var _this = this;
        //每秒进行判断
        window.setInterval(function () {
            _this.update();
        }, 1000);
    }
    TimerMgr.prototype.update = function () {
        //每秒执行
        var nowTime = new Date();
        var dataNum = Tools_1.default.date_getTimeNum(nowTime);
        if (dataNum != CacheMgr_1.default.exportTime) {
            //新的一天 ，重置导出。。
            CacheMgr_1.default.earlyExportTripPart = [];
            CacheMgr_1.default.earlyExport = [];
            Emit_1.default.instance().emit(EmitData_1.EventCode.GAME_BOX_UPDATE);
            CacheMgr_1.default.exportTime = dataNum;
        }
    };
    return TimerMgr;
}());
exports.default = new TimerMgr();

cc._RF.pop();