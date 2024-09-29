import fly from "flyio";
import QgRewardedAd from "./QgRewardedAd";
import QgIntersAd from "./QgIntersAd";
import QgBanner from "./QgBanner";
import Global from "../../Global";
import QgNative from "./QgNative";
import LogMgr from "../../LogMgr";

export default class QgApi {


    public static createAdv () {
        if (!Global.isVivo)return ;
        this.createVideo() ;
        this.createInters() ;
        this.createNative() ;
    }

    public static createBanner () {
        if (!Global.isVivo)return ;
        this.createBannerAd() ;
    }

    private static createVideo() {
        QgRewardedAd.createRewardedVideo().then(()=>{
            QgRewardedAd.loadRewardedVideo().then()
        }).catch(()=>{
            setTimeout(()=>{
                if (!QgRewardedAd.isLoad_Rewarded) {
                    this.createVideo() ;
                }
            },5000)
        })
    }

    private static createInters() {
        QgIntersAd.createInters().then().catch(()=>{
            setTimeout(()=>{
                if (!QgIntersAd.isLoad_Inters) {
                    this.createInters() ;
                }
            },5000)
        })
    }

    private static createNative() {
        QgNative.createNative().then(()=>{
            QgNative.loadNative().then() ;
        }).catch(()=>{
            setTimeout(()=>{
                if (!QgNative.isLoad_Native) {
                    this.createNative() ;
                }
            },5000)
        })
    }

    private static createBannerAd() {
        QgBanner.createBanner().then(()=>{
            if (Global.config.gameConfig.bannerShow == 1) {
                QgBanner.showBanner() ;
            }
        }).catch(()=>{
            setTimeout(()=>{
                if (!QgBanner.isLoad) {
                    this.createBannerAd() ;
                }
            },5000)
        })
    }

    /**
     * 发起HTTPS网络请求
     */
    public static sponsorHttps(options) {
        if (!options.hasOwnProperty("url")) {
            console.warn("request param  url is  null")
            return
        }
        let url = options.url
        let data: any = null
        let param: any = {}
        if (!options.hasOwnProperty("method")) {
            param.method = "GET"
        } else {
            param.method = options.method
        }

        if (options.hasOwnProperty("data")) {
            data = options.data
        }

        if (options.hasOwnProperty("timeOut")) {
            param.timeout = options.timeout
        }

        if (options.hasOwnProperty("header")) {
            param.headers = options.header
        }
        param.pareseJson = true

        fly.request(url, data, param).then(data => {
            if (options.hasOwnProperty("success")) {
                options.success(data)
            }
        }).catch(e => {
            if (options.hasOwnProperty("fail")) {
                options.fail(data)
            }
        })

    }

    /**
     * 登录
     */
    public static login() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (qg.getSystemInfoSync().platformVersionCode >= 1063) {
                // @ts-ignore
                window.qg.login().then((res) => {
                    if (res.data.token) {
                        console.log('登录成功!!', res.data.token)
                        resolve(res.data.token);
                    }
                }, (err) => {
                    resolve(false);
                    console.error('登录失败' + JSON.stringify(err));
                })
            } else {
                resolve(false);
                console.error('版本号过低，无法登录')
            }
        })
    }

    /**
     * 分享
     */
    public static share() {
        // @ts-ignore
        qg.share()
    }

    /**
     * 判断是否已创建桌面图标
     */
    public static judgeShortIcon () {
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            qg.hasShortcutInstalled({
                success : (res)=>{
                    if (res) {
                        resolve(false) ;
                    }else {
                        resolve(true) ;
                    }
                },
                fail : (err)=>{
                    LogMgr.log(err) ;
                    reject(false) ;
                }
            })
        })
    }

    /**
     * 添加桌面图标
     */
    public static addShortcutIcon () {
        return new Promise((resolve)=>{
            this.judgeShortIcon().then((res)=>{
                if (res) {
                    // @ts-ignore
                    qg.installShortcut({
                        message : '创建桌面游戏图标，快捷进入游戏！',
                        success : ()=>{
                            LogMgr.log('创建成功') ;
                            resolve(true) ;
                        },
                        fail : ()=>{
                            LogMgr.error('创建失败') ;
                            resolve(false) ;
                        }
                    })
                }else {
                    resolve(false) ;
                    return
                }
            }).catch(()=>{
                resolve(false) ;
                return
            })
        })
    }


}