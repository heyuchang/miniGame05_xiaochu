import Tools from "../../Tools";
import Global from "../../Global";
import LogMgr from "../../LogMgr";

export default class QgIntersAd {

    private static initInterstitialAd: any; //插屏对象
    public static isLoad_Inters: boolean = false;

    /**
     * 创建插屏
     */
    public static createInters() {
        return new Promise((resolve, reject) => {

            if (!Global.isVivo) {
                LogMgr.error('当前非vivo平台，无法创建插屏');
                reject(false) ;
                return
            }

            let unitId = Tools.getRandomByArray(Global.config.advertisingConfig.interstitialAdId);
            if (!unitId) {
                LogMgr.error('插屏Id获取失败：' + unitId)
                reject(false) ;
                return
            }

            // @ts-ignore
            this.initInterstitialAd = window.qg.createInterstitialAd({adUnitId: unitId});

            this.initInterstitialAd.onError((err) => { //监听插屏错误
                LogMgr.error('插屏错误onError:', err);
            })

            this.initInterstitialAd.onLoad((res) => {
                this.isLoad_Inters = true;
                LogMgr.log('插屏广告加载完成-onload触发', JSON.stringify(res));
            })

            this.initInterstitialAd.onClose(() =>{
                this.isLoad_Inters = false;
                LogMgr.log('插屏关闭>>>>>>') ;
                this.createInters().then() ;
            })

            resolve(true)
        })
    }

    /**
     * 展示插屏
     */
    public static showInters() {
        if (!this.isLoad_Inters || !this.initInterstitialAd) {
            LogMgr.error('插屏加载中......',this.isLoad_Inters,'rewardedAd:',this.initInterstitialAd);
            this.createInters().then().catch() ;
            return
        }

        this.initInterstitialAd.show().then(() => {

        }).catch((err) => {
            LogMgr.error('插屏广告展示失败', JSON.stringify(err));
        })
    }
}