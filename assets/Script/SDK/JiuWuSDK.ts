import Tools from "../Common/Tools";
import Global from "../Common/Global";
import QgApi from "../Common/manage/Api/QgApi";
import Loading from "../Scene/Loading";
import LogMgr from "../Common/LogMgr";
import CacheMgr from "../Common/manage/CacheMgr";

export default class JiuWuSDK {

    public static qgToken: any = null;

    public static initSDK: boolean = false;

    public static url = {
        test: "https://api.jiuwugame.cn",
        host: "https://api.jiuwugame.cn",
    }

    public static gameInfo: GameInfo = {
        gameId: 125,
        gameVersion: "20211026",
        client: '95e7b3d7beceea9a7b85a3235892e728',
        token: '$2a$10$gjXXqXHT85QpdRZSsS8QZuu6AnI5hJL/ZzyJ8yzMCit2ii7RhGd.W',
    }

    public static launchData: launchData = {
        scene: '',
        query: null,
        shareTicket: '',
        referrerInfo: {
            appId: '',
            extraData: null
        }
    }

    public static inSet_API_Config() {
        return new Promise((resolve, reject) => {
            this.login().then(() => {
                this.register().then((data) => {
                    Global.allData = data;

                    let gmsUser = Global.allData.data.data.gmsUser;
                    CacheMgr.userId = gmsUser.userId;
                    CacheMgr.openId = gmsUser.openId;
                    CacheMgr.isAuth = gmsUser.isAuth;
                    // @ts-ignore
                    Global.config = JSON.parse(Global.allData.data.data.versionMode);

                    QgApi.createAdv() ;

                    LogMgr.log('一切就绪......')
                    this.initSDK = true;
                    resolve(true);
                }, () => {
                    LogMgr.error('就绪失败......')
                })
            })

        })
    }

    /**
     * 后台 注册或者登录
     */
    public static register() {
        try {
            return new Promise((resolve, reject) => {
                console.log('准备发送请求......')
                let param: regisMessage = Object(null);
                console.log('发送请求中......A')
                param.url = Tools.getHost() + '/api/login/loginsum';
                console.log('发送请求中......B')
                param.data = {
                    code: this.qgToken,
                    gameId: this.gameInfo.gameId,
                    sceneVal: undefined,
                    exportId: undefined,
                    version: this.gameInfo.gameVersion,
                }
                console.log('发送请求中......C')
                param.method = 'POST';
                param.header = this.headers();
                param.header['content-type'] = 'application/json';
                param.success = (res) => {
                    if (res.data.code === 200) {
                        console.log('后台登录注册成功：', res)
                        resolve(res);
                    } else {
                        console.error('登录错误：', res);
                        reject(res);
                    }
                };
                param.fail = (err) => {
                    console.error('发送请求失败：', err);
                }
                console.log('发送请求中......D')
                QgApi.sponsorHttps(param);
            });
        } catch (e) {
            console.error('后台登录错误:', e);
        }
    }

    /**
     * 登录vivo
     */
    public static login() {
        return new Promise((resolve, reject) => {
            try {
                QgApi.login().then((token) => {
                    if (token != false) {
                        this.qgToken = token;
                        resolve(true);
                    }
                }, () => {
                    console.error('登录失败')
                })
            } catch (e) {
                console.log(' login error', e);
            }
        })
    }

    public static headers() {
        return {
            'x-client': this.gameInfo.client,
            'x-token': this.gameInfo.token
        }
    }

}


interface GameInfo {
    gameId: number,
    gameVersion: string,
    client: string,
    token: string
}

interface launchData {
    scene: string,
    query: any,
    shareTicket: string,
    referrerInfo: referrerInfo
}

export interface referrerInfo {
    appId: string,
    extraData: any
}

export interface regisMessage {
    url: string,
    data: object,
    method: string,
    success: any,
    fail: any,
    header: any
}

