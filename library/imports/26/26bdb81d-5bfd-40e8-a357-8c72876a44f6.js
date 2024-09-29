"use strict";
cc._RF.push(module, '26bdbgdW/1A6KNXjHKHakT2', 'CacheMgr');
// Script/Common/manage/CacheMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../Global");
var CachesMgr = /** @class */ (function () {
    function CachesMgr() {
        this._userId = 0;
        this._checkpoint = 0; //关卡
        this._gold = 0; //金币
        this._diamond = 0; //钻石
        this._stamina = 20;
        this._user_code = "";
        this._openId = "";
        this._lastTimeLogin = 0;
        this._hit = []; //提示字符串
        this._userInfo = null;
        this._newUser = false;
        this._nowCheckPoint = -1;
        this._isNeedHint = true;
        this._isAuth = false; // 玩家是否授权
        this._setting = {
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
        };
        this._earlyExportTripPart = [];
        this._earlyExport = [];
        this._exportTime = 0;
        var string = Object.keys(this);
        for (var i = 0; i < string.length; i++) {
            if (string[i][0] != "_") {
                continue;
            }
            this.getData(string[i]);
        }
    }
    Object.defineProperty(CachesMgr.prototype, "earlyExportTripPart", {
        get: function () {
            return this._earlyExportTripPart;
        },
        set: function (value) {
            this.saveData("_earlyExportTripPart", value);
            this._earlyExportTripPart = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "earlyExport", {
        get: function () {
            return this._earlyExport;
        },
        set: function (value) {
            this.saveData("_earlyExport", value);
            this._earlyExport = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "exportTime", {
        get: function () {
            return this._exportTime;
        },
        set: function (value) {
            this.saveData("_exportTime", value);
            this._exportTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "isNeedHint", {
        get: function () {
            return this._isNeedHint;
        },
        set: function (value) {
            this._isNeedHint = value;
            this.saveData("_isNeedHint", value, false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "isAuth", {
        get: function () {
            return this._isAuth;
        },
        set: function (value) {
            this.saveData("_isAuth", value, false);
            this._isAuth = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            this.saveData("_userId", value, false);
            this._userId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "setting", {
        get: function () {
            return this._setting;
        },
        set: function (value) {
            this.saveData("_setting", value);
            this._setting = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "userInfo", {
        get: function () {
            return this._userInfo;
        },
        set: function (value) {
            this.saveData("_userInfo", value, false);
            this._userInfo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "newUser", {
        get: function () {
            return this._newUser;
        },
        set: function (value) {
            this.saveData("_newUser", value, false);
            this._newUser = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "hit", {
        get: function () {
            return this._hit;
        },
        set: function (value) {
            this.saveData("_hit", value, false);
            this._hit = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "lastTimeLogin", {
        get: function () {
            return this._lastTimeLogin;
        },
        set: function (value) {
            this.saveData("_lastTimeLogin", value, false);
            this._lastTimeLogin = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "stamina", {
        get: function () {
            return this._stamina;
        },
        set: function (value) {
            if (value > Global_1.default.config.gameInfo.maxStamina) {
                this._stamina = Global_1.default.config.gameInfo.maxStamina;
            }
            else {
                this._stamina = value;
            }
            this.saveData("_stamina", this._stamina);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "checkpoint", {
        get: function () {
            return this._checkpoint;
        },
        set: function (value) {
            this.saveData("_checkpoint", value);
            this._checkpoint = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        set: function (value) {
            this.saveData("_gold", value);
            this._gold = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "diamond", {
        get: function () {
            return this._diamond;
        },
        set: function (value) {
            this.saveData("_diamond", value);
            this._diamond = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "user_code", {
        get: function () {
            return this._user_code;
        },
        set: function (value) {
            this.saveData("_user_codes", value, false);
            this._user_code = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CachesMgr.prototype, "openId", {
        get: function () {
            return this._openId;
        },
        set: function (value) {
            this.saveData("_openId", value, false);
            this._openId = value;
        },
        enumerable: false,
        configurable: true
    });
    //都用json 存储吧 ，不然太麻烦了
    CachesMgr.prototype.saveData = function (key, value, isSend) {
        if (isSend === void 0) { isSend = true; }
        if (value instanceof Map) {
            localStorage.setItem(key, this._mapToJson(value));
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
    CachesMgr.prototype.getData = function (key) {
        var result = true;
        var dataText = localStorage.getItem(key);
        if (dataText == null || dataText == "" || dataText == undefined) {
            result = false;
            this.saveData(key, this[key], false); //没有的话，先给他存进去
            return;
        }
        if (this[key] instanceof Map) {
            this[key] = this._jsonToMap(dataText);
        }
        else {
            this[key] = JSON.parse(dataText);
        }
        return result;
    };
    CachesMgr.prototype._strMapToObj = function (strMap) {
        var obj = Object.create(null);
        strMap.forEach(function (v, k) {
            obj[k] = v;
        });
        return obj;
    };
    /**
     *map转换为json
     */
    CachesMgr.prototype._mapToJson = function (map) {
        return JSON.stringify(this._strMapToObj(map));
    };
    CachesMgr.prototype._objToStrMap = function (obj) {
        var strMap = new Map();
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var k = _a[_i];
            strMap.set(k, obj[k]);
        }
        return strMap;
    };
    /**
     *json转换为map
     */
    CachesMgr.prototype._jsonToMap = function (jsonStr) {
        return this._objToStrMap(JSON.parse(jsonStr));
    };
    /**
     * @private 同步信息到服务端
     */
    CachesMgr.prototype.updateData = function () {
        var data = {
            checkpoint: this._checkpoint,
            diamond: this._diamond,
            gold: this._gold,
            setting: JSON.stringify(this._setting),
            stamina: this.stamina,
            userId: this.userId
        };
    };
    return CachesMgr;
}());
exports.default = new CachesMgr();

cc._RF.pop();