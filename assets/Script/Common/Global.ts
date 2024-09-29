/**
 * 全局变量
 */

export default class Global {
    public static isVivo = false;

    public static allData: any;

    public static configData: any;

    public static fromAppId: string = '';

    public static config = {
        homeConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1, //是否显示Banner
        },
        gameConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1, //是否显示Banner
        },
        endConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1, //是否显示Banner
        },
        advertisingConfig: {
            rewardedVideoAdId: [
                "180d657c8ca14c4ea2089385ab85cc4c"
            ],
            interstitialAdId: [
                "e1a55af9ad0240d58063373c019eac8b"
            ],
            bannerAdId: [
                "e3c3b01217a843fe8c695ec0ad053ed8"
            ],
            nativeAdId: [
                "d8bfb3dc126748388d86311af35c4d00"
            ]
        },
        gameInfo: {
            animation: 0.5,
            maxStamina: 10,
            autoAddStaminaTime: 1,
            autoAddStaminaNum: 1
        },
        addInfo: {
            gold: 100,
            diamond: 2,
            stamina: 2
        },
        bannerRefreshTime: 10, //banner刷新时间 （单位：秒/s，“最小 30”）
        isLog: 1, //log  0 : 不
    };
}

/**
 * 导出数据
 */
export interface ExportData {
    appId: string // appID
    id: number // 后台导出ID
    adImg: string // 广告图URL
    exportSrc: string // 导出路劲
    gameOriginId: number // 原游戏ID
    gameTargetId: number
    gameTargetName: string // 分享游戏名称
    iconImg: string
    isLike: number
    isOffline: number
    isPopular: number
    sort: number
    isTripart: number
    pageType: number
}

export interface UIConfig {
    banner_probability: number,    //banner 显示概率
    gameBox_probability: number,  //gameBox 显示概率
    chest_probability: number,   //误触宝箱
    insert_probability: number,  //插屏
    video_probability: number,   // 强拉视频
    export_show: number[],      //显示时候的导出
}
