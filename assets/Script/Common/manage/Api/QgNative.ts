import Tools from "../../Tools";
import Global from "../../Global";
import LogMgr from "../../LogMgr";

export default class QgNative {

    private static nativeAd: any; //原生广告对象
    public static isLoad_Native: boolean = false;
    private static nativeResolve = null ;
    public static nativeMessage : any = null ;


    /**
     * 创建原生广告
     */
    public static createNative () {
        return new Promise((resolve, reject) => {

            if (!Global.isVivo) {
                LogMgr.error('当前非vivo平台，无法创建原生广告');
                reject(false) ;
                return
            }

            let unitId = Tools.getRandomByArray(Global.config.advertisingConfig.nativeAdId);
            if (!unitId) {
                LogMgr.error('原生ID获取失败：' + unitId);
                reject(false) ;
                return
            }

            // @ts-ignore
            this.nativeAd = qg.createNativeAd({posId : unitId});

            this.nativeAd.onLoad((res)=>{
                if (res && res.adList) {
                    LogMgr.log('原生广告拉取成功>>>>>>',res.adList) ;
                    this.nativeMessage = res.adList[0] ;
                    this.nativeResolve(res.adList[0]) ;
                    this.isLoad_Native = true ;
                }
                this.nativeResolve = null ;
            })

            resolve(true);
        })
    }

    /**
     * 加载原生广告
     */
    public static loadNative () {
        return new Promise((resolve)=>{
            this.nativeResolve = resolve ;
            if (!this.nativeAd) {
                LogMgr.error('原生广告未创建，无法加载......')
                this.createNative().then(()=>{}).catch() ;
                this.nativeResolve(false) ;
                this.nativeResolve = null ;
                return
            }

            if (this.nativeMessage != null) {
                this.nativeResolve(this.nativeMessage) ;
                this.nativeResolve = null ;
            }

            this.nativeAd.load().then(()=>{

            }).catch(()=>{
                this.nativeResolve(false) ;
            }) ;
        })
    }

    /**
     * 上报原生广告曝光
     */
    public static repAdShow (adId) {
        if (!this.nativeAd) return ;
        LogMgr.log('上报用户曝光>>>>>>')
        this.nativeAd.reportAdShow({
            adId: adId
        }) ;
    }

    /**
     * 上报原生广告点击
     */
    public static repAdClick (adId) {
        if (!this.nativeAd) return ;
        LogMgr.log('上报用户点击>>>>>>')
        this.nativeAd.reportAdClick({
            adId: adId
        })
    }

    /**
     * 重新拉去广告信息
     */
    public static anewLoad () {
        this.nativeMessage = null ;
        this.isLoad_Native = false ;
        this.loadNative().then() ;
    }

}