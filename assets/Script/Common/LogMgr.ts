import Global from "./Global";

export default class LogMgr {

    public static log(...args: any[]): void {
        if (Global.config.isLog == 1) {
            console.log.apply(cc.log, args);
        }
    }

    public static warn(...args: any[]): void {
        if (Global.config.isLog == 1) {
            console.warn.apply(cc.warn, args);
        }
    }

    public static error(...args: any[]): void {
        if (Global.config.isLog == 1) {
            console.error.apply(cc.error, args);
        }
    }

}