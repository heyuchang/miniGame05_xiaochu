import Global from "./Global";
import LogMgr from "./LogMgr";
import Tools from "./Tools";
import Emit from "./manage/Emit/Emit";
import EmitData from "./manage/Emit/EmitData";
import QgBanner from "./manage/Api/QgBanner";

export default class ShowConfig {

    private static str: string = '';

    private static showResolve: any = null;

    public static initEmit() {
        Emit.instance().on(EmitData.IN_NATIVE_NEXT, this.inNativeNext, this);
    }


    public static show(str: string) {
        return new Promise((resolve) => {
            this.showResolve = resolve;
            if (!Global.isVivo) {
                this.showResolve(false);
                this.showResolve = null;
                return;
            }

            if (!str || !Global.config[str]) {
                LogMgr.error('参数为空或者config中不存在该配置:str:' + str);
                this.showResolve(false);
                this.showResolve = null;
                return
            }
            LogMgr.log('检测配置信息');

            this.str = str;


            if (Global.config[this.str].nativeConfig.type == 2) {
                QgBanner.hideBanner();
            }

            console.log('AAA>>>>>>')
            this.playVideo().then(() => {
                console.log('BBB>>>>>>')
                return this.openNative();
            }).then((res) => {
                if (!res) {
                    this.inNativeNext();
                }
            })
        })

    }

    private static playVideo() {
        return new Promise((resolve) => {
            if (Global.config[this.str].startVideo == 0) {
                Global.config[this.str].startVideo = 1;
                resolve(true);
                return
            }

            if (Tools.checkPer(Global.config[this.str].videoPer)) {
                Tools.handleVideo().then(() => {
                    resolve(true);
                })
            } else {
                resolve(true);
            }
        })
    }

    private static openNative() {
        return new Promise((resolve) => {
            console.log('CCC>>>>>>');
            if (Global.config[this.str].startNative == 0) {
                Global.config[this.str].startNative = 1;
                resolve(false);
                return
            }

            if (Tools.checkPer(Global.config[this.str].nativePer)) {
                Tools.showNative(Global.config[this.str].nativeConfig.type, Global.config[this.str].nativeConfig.labelType, Global.config[this.str].nativeConfig.time).then((res) => {
                    resolve(res);
                });
            } else {
                resolve(false);
            }
        })
    }

    private static openIntersAd() {
        return new Promise((resolve) => {
            console.log('DDD>>>>>>')
            if (Global.config[this.str].startIntersAd == 0) {
                Global.config[this.str].startIntersAd = 1;
                resolve(false);
                return
            }

            if (Tools.checkPer(Global.config[this.str].intersAdPer)) {
                Tools.handlerInters().then((res) => {
                    resolve(res);
                })
            } else {
                resolve(false);
            }
        })
    }


    private static inNativeNext() {
        this.openIntersAd().then((res) => {
            console.log('EEE>>>>>>')
            this.showResolve(true);
            this.showResolve = null;
        })
    }

}