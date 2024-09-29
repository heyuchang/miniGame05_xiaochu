import JiuWuSDK from "../../SDK/JiuWuSDK";
import Global from "../Global";
import Tools from "../Tools";

class CachesMgr {


    constructor() {
        let string = Object.keys(this)
        for (let i = 0; i < string.length; i++) {
            if (string[i][0] != "_") {
                continue
            }
            this.getData(string[i])
        }
    }

    private _userId: number = 0;
    private _checkpoint: number = 0;  //关卡
    private _gold: number = 0; //金币
    private _diamond: number = 0; //钻石
    private _stamina: number = 20;

    private _user_code: string = "";
    private _openId: string = "";

    private _lastTimeLogin: number = 0;
    private _hit: any[] = [] //提示字符串
    private _userInfo: any = null;
    private _newUser: boolean = false;

    private _nowCheckPoint: number = -1;

    private _isNeedHint: boolean = true;
    private _isAuth: boolean = false;   // 玩家是否授权
    private _setting: CustomData = {
        signTime: 0,
        hammerNum: 0,
        spriteNum: 0,
        lastSignNum: 0,
        signNum: -1,
        hintNum: 5,
        setting: {
            music: 1,
            audio: 1,
            vibrate: 1,
        }
    }

    private _earlyExportTripPart: string [] = []
    private _earlyExport: string [] = []
    private _exportTime: number = 0


    get earlyExportTripPart(): string[] {
        return this._earlyExportTripPart;
    }

    set earlyExportTripPart(value: string[]) {
        this.saveData("_earlyExportTripPart", value)
        this._earlyExportTripPart = value;
    }

    get earlyExport(): string[] {
        return this._earlyExport;
    }

    set earlyExport(value: string[]) {
        this.saveData("_earlyExport", value)
        this._earlyExport = value;
    }

    get exportTime(): number {
        return this._exportTime;
    }

    set exportTime(value: number) {
        this.saveData("_exportTime", value)
        this._exportTime = value;
    }

    get isNeedHint(): boolean {
        return this._isNeedHint;
    }

    set isNeedHint(value: boolean) {
        this._isNeedHint = value;
        this.saveData("_isNeedHint", value, false);
    }

    get isAuth(): boolean {
        return this._isAuth;
    }

    set isAuth(value: boolean) {
        this.saveData("_isAuth", value, false);
        this._isAuth = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this.saveData("_userId", value, false);
        this._userId = value;
    }

    get setting(): CustomData {
        return this._setting;
    }

    set setting(value: CustomData) {
        this.saveData("_setting", value)
        this._setting = value;
    }

    get userInfo(): any {
        return this._userInfo;
    }

    set userInfo(value: any) {
        this.saveData("_userInfo", value, false)
        this._userInfo = value;
    }

    get newUser(): boolean {
        return this._newUser;
    }

    set newUser(value: boolean) {
        this.saveData("_newUser", value, false)
        this._newUser = value;
    }

    get hit(): any[] {
        return this._hit;
    }

    set hit(value: any[]) {
        this.saveData("_hit", value, false)
        this._hit = value;
    }

    get lastTimeLogin(): number {
        return this._lastTimeLogin;
    }

    set lastTimeLogin(value: number) {
        this.saveData("_lastTimeLogin", value, false)
        this._lastTimeLogin = value;
    }

    get stamina(): number {
        return this._stamina;
    }

    set stamina(value: number) {
        if (value > Global.config.gameInfo.maxStamina) {
            this._stamina = Global.config.gameInfo.maxStamina;
        } else {
            this._stamina = value;
        }
        this.saveData("_stamina", this._stamina);
    }

    get checkpoint(): number {
        return this._checkpoint;
    }

    set checkpoint(value: number) {
        this.saveData("_checkpoint", value);
        this._checkpoint = value;
    }

    get gold(): number {
        return this._gold;
    }

    set gold(value: number) {
        this.saveData("_gold", value)
        this._gold = value;
    }

    get diamond(): number {
        return this._diamond;
    }

    set diamond(value: number) {
        this.saveData("_diamond", value)
        this._diamond = value;
    }

    get user_code(): string {
        return this._user_code;
    }

    set user_code(value: string) {
        this.saveData("_user_codes", value, false)
        this._user_code = value;
    }

    get openId(): string {
        return this._openId;
    }

    set openId(value: string) {
        this.saveData("_openId", value, false)
        this._openId = value;
    }

    //都用json 存储吧 ，不然太麻烦了
    private saveData(key: string, value: any, isSend: boolean = true) {

        if (value instanceof Map) {
            localStorage.setItem(key, this._mapToJson(value))
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    private getData(key: string): boolean {
        let result = true
        let dataText = localStorage.getItem(key)
        if (dataText == null || dataText == "" || dataText == undefined) {
            result = false
            this.saveData(key, this[key], false) //没有的话，先给他存进去
            return
        }
        if (this[key] instanceof Map) {
            this[key] = this._jsonToMap(dataText)
        } else {
            this[key] = JSON.parse(dataText)
        }
        return result
    }

    private _strMapToObj(strMap) {
        let obj = Object.create(null);
        strMap.forEach((v, k) => {
            obj[k] = v;
        })
        return obj;
    }

    /**
     *map转换为json
     */
    private _mapToJson(map) {
        return JSON.stringify(this._strMapToObj(map));
    }

    private _objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    /**
     *json转换为map
     */
    private _jsonToMap(jsonStr) {
        return this._objToStrMap(JSON.parse(jsonStr));
    }

    /**
     * @private 同步信息到服务端
     */
    public updateData() {
        let data = {
            checkpoint: this._checkpoint,
            diamond: this._diamond,
            gold: this._gold,
            setting: JSON.stringify(this._setting),
            stamina: this.stamina,
            userId: this.userId
        }
    }
}

export default new CachesMgr()

interface Setting {
    music: number,  // 音乐音量大小 0 -1
    audio: number,  // 音效音量大小
    vibrate: number // 是否震动
}

interface CustomData {
    signTime: number  //上次签到时间
    hammerNum: number //剩余锤子个数
    spriteNum: number //剩余恶魔次数
    lastSignNum: number //上次签到时间
    signNum: number   //当前签到次数
    hintNum: number  //免费提示数据
    setting: Setting
}
