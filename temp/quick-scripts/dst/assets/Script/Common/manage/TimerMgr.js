
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/TimerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcVGltZXJNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsa0NBQTZCO0FBQzdCLG9DQUErQjtBQUMvQiw0Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUNJO1FBQUEsaUJBS0M7UUFKRyxRQUFRO1FBQ1IsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNmLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNJLE1BQU07UUFDTixJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksT0FBTyxHQUFHLGVBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDNUMsSUFBSSxPQUFPLElBQUksa0JBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDaEMsY0FBYztZQUNkLGtCQUFRLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFBO1lBQ2pDLGtCQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtZQUN6QixjQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDL0Msa0JBQVEsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFBO1NBQ2hDO0lBQ0wsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi9DYWNoZU1nclwiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uL1Rvb2xzXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQge0V2ZW50Q29kZX0gZnJvbSBcIi4vRW1pdC9FbWl0RGF0YVwiO1xyXG5cclxuLyoqXHJcbiAqICDmgLvlrprml7blmagg77yMIOeUqOadpSDliKTmlq3nrb7liLAg5oiW6ICF5oGi5aSN5L2T5YqbICDmr4/liIbpkp/liKTmlq1cclxuICovXHJcbmNsYXNzIFRpbWVyTWdyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5q+P56eS6L+b6KGM5Yik5patXHJcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8v5q+P56eS5omn6KGMXHJcbiAgICAgICAgbGV0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRhTnVtID0gVG9vbHMuZGF0ZV9nZXRUaW1lTnVtKG5vd1RpbWUpXHJcbiAgICAgICAgaWYgKGRhdGFOdW0gIT0gQ2FjaGVNZ3IuZXhwb3J0VGltZSkge1xyXG4gICAgICAgICAgICAvL+aWsOeahOS4gOWkqSDvvIzph43nva7lr7zlh7rjgILjgIJcclxuICAgICAgICAgICAgQ2FjaGVNZ3IuZWFybHlFeHBvcnRUcmlwUGFydCA9IFtdXHJcbiAgICAgICAgICAgIENhY2hlTWdyLmVhcmx5RXhwb3J0ID0gW11cclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRXZlbnRDb2RlLkdBTUVfQk9YX1VQREFURSlcclxuICAgICAgICAgICAgQ2FjaGVNZ3IuZXhwb3J0VGltZSA9IGRhdGFOdW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBUaW1lck1ncigpO1xyXG4iXX0=