import Game from "../../../Scene/Game";
import Tools from "../../Tools";
import Global from "../../Global";
import LogMgr from "../../LogMgr";

export default class QgBanner {

    public static isLoad: boolean = false; //加载状态

    private static bannerAd: any; //banner对象

    public static isShow: boolean = false; //显示状态

    /**
     * 创建banner
     */
    public static createBanner() {
        return new Promise((resolve, reject) => {

            if (!Global.isVivo) {
                LogMgr.error('当前非vivo平台，无法创建Banner');
                reject(false);
                return
            }

            let unitId = Tools.getRandomByArray(Global.config.advertisingConfig.bannerAdId);
            if (!unitId) {
                LogMgr.error('BannerId获取失败:' + unitId);
                reject(false);
                return
            }

            let banner_exm = Game.Ins.banner
            let size = Tools.getRealSize(banner_exm)
            let refreshTime = 30 ;

            if (Global.config.bannerRefreshTime >= 30) {
                refreshTime = Global.config.bannerRefreshTime ;
            }

            let bannerParam = {
                adUnitId: unitId,
                style: {
                    left: size.left,
                    top: size.top,
                },
                adIntervals: refreshTime,
            };

            // @ts-ignore
            this.bannerAd = qg.createBannerAd(bannerParam);

            this.bannerAd.onLoad((res) => {
                this.isLoad = true;
                LogMgr.log('Banner广告加载完成-onload触发', JSON.stringify(res));
                resolve(true);
            })

            this.bannerAd.onClose(()=>{
                LogMgr.log('Banner关闭......')
            })

            this.bannerAd.onError((err) => {
                LogMgr.error('Banner错误:err:', err);
                reject(false);
            })

        })
    }

    /**
     *展示Banner
     */
    public static showBanner() {

        if (!this.isLoad) {
            this.createBanner().then();
            LogMgr.error('Banner未创建或未加载，无法显示')
            return
        }

        if (this.isShow) {
            LogMgr.error('Banner已显示，无法重复显示') ;
            return
        }

        this.bannerAd.show().then(() => {
            this.isShow = true;
        }).catch((err) => {
            LogMgr.error('Banner显示错误:', err);
        })

    }

    /**
     * 隐藏Banner
     */
    public static hideBanner() {
        if (!this.isLoad) {
            LogMgr.error('Banner未创建或未加载，无法隐藏')
            return
        }

        if (!this.isShow) {
            LogMgr.error('Banner未显示，无需隐藏')
            return
        }

        this.bannerAd.hide();
        this.isShow = false;
    }

    /**
     * 销毁Banner实例
     */
    public static destroyBanner() {
        return new Promise((resolve) => {
            if (!this.bannerAd) {
                LogMgr.error('Banner未创建>>>无法destroy()');
                resolve(false);
                return
            }

            this.bannerAd.destroy();
            this.isLoad = false;
            this.isShow = false;
            resolve(true);
        })
    }

    /**
     * 刷新Banner
     */
    public static cutBanner() {
        return new Promise((resolve) => {
            this.destroyBanner().then((res) => {
                if (res) {
                    this.createBanner().then(()=>{
                        this.showBanner();
                    });
                }
                resolve(true);
            })
        })
    }

}