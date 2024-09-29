import Tools from "../../Tools";
import Global from "../../Global";
import LogMgr from "../../LogMgr";

export default class QgRewardedAd {

    private static rewardedAd: any; //视频对象
    public static isLoad_Rewarded: boolean = false;
    private static rewardedVideoResolve = null; //视频状态返回 1 : 播放完成， 2 : 播放错误, 3 : 播放中途关闭

    public static createRewardedVideo() {
        return new Promise((resolve, reject) => {

            if (!Global.isVivo) {
                LogMgr.error('当前非vivo平台，无法创建视频') ;
                reject(false);
                return
            }

            let unitId = Tools.getRandomByArray(Global.config.advertisingConfig.rewardedVideoAdId);
            if (!unitId) {
                LogMgr.error('视频ID获取失败：' + unitId)
                reject(false);
                return
            }

            // @ts-ignore
            this.rewardedAd = window.qg.createRewardedVideoAd({posId: unitId});

            this.rewardedAd.onError(err => {
                LogMgr.error("激励视频广告错误", err);
                this.rewardedVideoResolve(2);
                this.rewardedVideoResolve = null;
            });

            this.rewardedAd.onClose((isEnded) => { //开启关闭监听
                if (isEnded.isEnded) {
                    this.rewardedVideoResolve(1); //播放完成
                } else {
                    this.rewardedVideoResolve(3); //中途关闭
                }
                this.isLoad_Rewarded = false;
                this.rewardedVideoResolve = null;
                this.loadRewardedVideo().then() ;
            })

            this.rewardedAd.onLoad((res)=> {
                this.isLoad_Rewarded = true;
                LogMgr.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            })

            resolve(true);
        })
    }

    /**
     * 加载视频
     */
    public static loadRewardedVideo() {
        return new Promise((resolve, reject) => {
            if (!this.rewardedAd) {
                LogMgr.error('视频未创建>>>无法load()')
                this.createRewardedVideo().then()
                reject(false)
                return
            }
            this.rewardedAd.load().then(() => {
                resolve(true);
            }, (error) => {
                LogMgr.error('视频加载失败：' + error);
                reject(false) ;
            });
        })
    }

    /**
     * show视频
     */
    public static showRewardedVideo() {
        return new Promise((resolve) => {
            this.rewardedVideoResolve = resolve;
            if (!this.isLoad_Rewarded) {
                this.rewardedVideoResolve(2);
                this.loadRewardedVideo().then() ;
                LogMgr.error('视频加载中......');
                return
            }
            this.rewardedAd.show().then(() => {

            }).catch((err) => {
                LogMgr.error('激励视频广告展示失败', JSON.stringify(err));
            })
        })
    }
}