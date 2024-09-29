import CacheMgr from "./CacheMgr";
import Tools from "../Tools";
import Emit from "./Emit/Emit";
import {EventCode} from "./Emit/EmitData";

/**
 *  总定时器 ， 用来 判断签到 或者恢复体力  每分钟判断
 */
class TimerMgr {
    constructor() {
        //每秒进行判断
        window.setInterval(() => {
            this.update()
        }, 1000)
    }

    update() {
        //每秒执行
        let nowTime = new Date();
        let dataNum = Tools.date_getTimeNum(nowTime)
        if (dataNum != CacheMgr.exportTime) {
            //新的一天 ，重置导出。。
            CacheMgr.earlyExportTripPart = []
            CacheMgr.earlyExport = []
            Emit.instance().emit(EventCode.GAME_BOX_UPDATE)
            CacheMgr.exportTime = dataNum
        }
    }
}

export default new TimerMgr();
