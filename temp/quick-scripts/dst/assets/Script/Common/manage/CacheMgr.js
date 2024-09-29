
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/CacheMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQ2FjaGVNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvQ0FBK0I7QUFHL0I7SUFHSTtRQVVRLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBRSxJQUFJO1FBQzlCLFVBQUssR0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ3ZCLGFBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQzFCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXJCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLFNBQUksR0FBVSxFQUFFLENBQUEsQ0FBQyxPQUFPO1FBQ3hCLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTVCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLFlBQU8sR0FBWSxLQUFLLENBQUMsQ0FBRyxTQUFTO1FBQ3JDLGFBQVEsR0FBZTtZQUMzQixRQUFRLEVBQUUsQ0FBQztZQUNYLFNBQVMsRUFBRSxDQUFDO1lBQ1osU0FBUyxFQUFFLENBQUM7WUFDWixXQUFXLEVBQUUsQ0FBQztZQUNkLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDWCxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQTtRQUVPLHlCQUFvQixHQUFjLEVBQUUsQ0FBQTtRQUNwQyxpQkFBWSxHQUFjLEVBQUUsQ0FBQTtRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQTtRQTNDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxD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WUFDdEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUN0QixDQUFBO0lBQ0wsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FwUkEsQUFvUkMsSUFBQTtBQUVELGtCQUFlLElBQUksU0FBUyxFQUFFLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSml1V3VTREsgZnJvbSBcIi4uLy4uL1NESy9KaXVXdVNES1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9HbG9iYWxcIjtcclxuaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9Ub29sc1wiO1xyXG5cclxuY2xhc3MgQ2FjaGVzTWdyIHtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IHN0cmluZyA9IE9iamVjdC5rZXlzKHRoaXMpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHN0cmluZ1tpXVswXSAhPSBcIl9cIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEoc3RyaW5nW2ldKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91c2VySWQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jaGVja3BvaW50OiBudW1iZXIgPSAwOyAgLy/lhbPljaFcclxuICAgIHByaXZhdGUgX2dvbGQ6IG51bWJlciA9IDA7IC8v6YeR5biBXHJcbiAgICBwcml2YXRlIF9kaWFtb25kOiBudW1iZXIgPSAwOyAvL+mSu+efs1xyXG4gICAgcHJpdmF0ZSBfc3RhbWluYTogbnVtYmVyID0gMjA7XHJcblxyXG4gICAgcHJpdmF0ZSBfdXNlcl9jb2RlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfb3BlbklkOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHByaXZhdGUgX2xhc3RUaW1lTG9naW46IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9oaXQ6IGFueVtdID0gW10gLy/mj5DnpLrlrZfnrKbkuLJcclxuICAgIHByaXZhdGUgX3VzZXJJbmZvOiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbmV3VXNlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX25vd0NoZWNrUG9pbnQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIHByaXZhdGUgX2lzTmVlZEhpbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfaXNBdXRoOiBib29sZWFuID0gZmFsc2U7ICAgLy8g546p5a625piv5ZCm5o6I5p2DXHJcbiAgICBwcml2YXRlIF9zZXR0aW5nOiBDdXN0b21EYXRhID0ge1xyXG4gICAgICAgIHNpZ25UaW1lOiAwLFxyXG4gICAgICAgIGhhbW1lck51bTogMCxcclxuICAgICAgICBzcHJpdGVOdW06IDAsXHJcbiAgICAgICAgbGFzdFNpZ25OdW06IDAsXHJcbiAgICAgICAgc2lnbk51bTogLTEsXHJcbiAgICAgICAgaGludE51bTogNSxcclxuICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgIG11c2ljOiAxLFxyXG4gICAgICAgICAgICBhdWRpbzogMSxcclxuICAgICAgICAgICAgdmlicmF0ZTogMSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZWFybHlFeHBvcnRUcmlwUGFydDogc3RyaW5nIFtdID0gW11cclxuICAgIHByaXZhdGUgX2Vhcmx5RXhwb3J0OiBzdHJpbmcgW10gPSBbXVxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0VGltZTogbnVtYmVyID0gMFxyXG5cclxuXHJcbiAgICBnZXQgZWFybHlFeHBvcnRUcmlwUGFydCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vhcmx5RXhwb3J0VHJpcFBhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGVhcmx5RXhwb3J0VHJpcFBhcnQodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9lYXJseUV4cG9ydFRyaXBQYXJ0XCIsIHZhbHVlKVxyXG4gICAgICAgIHRoaXMuX2Vhcmx5RXhwb3J0VHJpcFBhcnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZWFybHlFeHBvcnQoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lYXJseUV4cG9ydDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZWFybHlFeHBvcnQodmFsdWU6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9lYXJseUV4cG9ydFwiLCB2YWx1ZSlcclxuICAgICAgICB0aGlzLl9lYXJseUV4cG9ydCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBleHBvcnRUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cG9ydFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGV4cG9ydFRpbWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfZXhwb3J0VGltZVwiLCB2YWx1ZSlcclxuICAgICAgICB0aGlzLl9leHBvcnRUaW1lID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzTmVlZEhpbnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTmVlZEhpbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlzTmVlZEhpbnQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc05lZWRIaW50ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9pc05lZWRIaW50XCIsIHZhbHVlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzQXV0aCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNBdXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpc0F1dGgodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKFwiX2lzQXV0aFwiLCB2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX2lzQXV0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1c2VySWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlcklkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB1c2VySWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfdXNlcklkXCIsIHZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fdXNlcklkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNldHRpbmcoKTogQ3VzdG9tRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldHRpbmcodmFsdWU6IEN1c3RvbURhdGEpIHtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKFwiX3NldHRpbmdcIiwgdmFsdWUpXHJcbiAgICAgICAgdGhpcy5fc2V0dGluZyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1c2VySW5mbygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mbztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdXNlckluZm8odmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfdXNlckluZm9cIiwgdmFsdWUsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX3VzZXJJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5ld1VzZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25ld1VzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG5ld1VzZXIodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKFwiX25ld1VzZXJcIiwgdmFsdWUsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX25ld1VzZXIgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGl0KCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGl0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBoaXQodmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9oaXRcIiwgdmFsdWUsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX2hpdCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYXN0VGltZUxvZ2luKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RUaW1lTG9naW47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGxhc3RUaW1lTG9naW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfbGFzdFRpbWVMb2dpblwiLCB2YWx1ZSwgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5fbGFzdFRpbWVMb2dpbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdGFtaW5hKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YW1pbmE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHN0YW1pbmEodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IEdsb2JhbC5jb25maWcuZ2FtZUluZm8ubWF4U3RhbWluYSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFtaW5hID0gR2xvYmFsLmNvbmZpZy5nYW1lSW5mby5tYXhTdGFtaW5hO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YW1pbmEgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9zdGFtaW5hXCIsIHRoaXMuX3N0YW1pbmEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjaGVja3BvaW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNoZWNrcG9pbnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfY2hlY2twb2ludFwiLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2twb2ludCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnb2xkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdvbGQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfZ29sZFwiLCB2YWx1ZSlcclxuICAgICAgICB0aGlzLl9nb2xkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpYW1vbmQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhbW9uZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGlhbW9uZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YShcIl9kaWFtb25kXCIsIHZhbHVlKVxyXG4gICAgICAgIHRoaXMuX2RpYW1vbmQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXNlcl9jb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJfY29kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdXNlcl9jb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKFwiX3VzZXJfY29kZXNcIiwgdmFsdWUsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX3VzZXJfY29kZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvcGVuSWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbklkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBvcGVuSWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEoXCJfb3BlbklkXCIsIHZhbHVlLCBmYWxzZSlcclxuICAgICAgICB0aGlzLl9vcGVuSWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mDveeUqGpzb24g5a2Y5YKo5ZCnIO+8jOS4jeeEtuWkqum6u+eDpuS6hlxyXG4gICAgcHJpdmF0ZSBzYXZlRGF0YShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgaXNTZW5kOiBib29sZWFuID0gdHJ1ZSkge1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB0aGlzLl9tYXBUb0pzb24odmFsdWUpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERhdGEoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZVxyXG4gICAgICAgIGxldCBkYXRhVGV4dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSlcclxuICAgICAgICBpZiAoZGF0YVRleHQgPT0gbnVsbCB8fCBkYXRhVGV4dCA9PSBcIlwiIHx8IGRhdGFUZXh0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNhdmVEYXRhKGtleSwgdGhpc1trZXldLCBmYWxzZSkgLy/msqHmnInnmoTor53vvIzlhYjnu5nku5blrZjov5vljrtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzW2tleV0gaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5fanNvblRvTWFwKGRhdGFUZXh0KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IEpTT04ucGFyc2UoZGF0YVRleHQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdHJNYXBUb09iaihzdHJNYXApIHtcclxuICAgICAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICBzdHJNYXAuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBvYmpba10gPSB2O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqbWFw6L2s5o2i5Li6anNvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9tYXBUb0pzb24obWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3N0ck1hcFRvT2JqKG1hcCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29ialRvU3RyTWFwKG9iaikge1xyXG4gICAgICAgIGxldCBzdHJNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhvYmopKSB7XHJcbiAgICAgICAgICAgIHN0ck1hcC5zZXQoaywgb2JqW2tdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ck1hcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqanNvbui9rOaNouS4um1hcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9qc29uVG9NYXAoanNvblN0cikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmpUb1N0ck1hcChKU09OLnBhcnNlKGpzb25TdHIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlIOWQjOatpeS/oeaBr+WIsOacjeWKoeerr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgY2hlY2twb2ludDogdGhpcy5fY2hlY2twb2ludCxcclxuICAgICAgICAgICAgZGlhbW9uZDogdGhpcy5fZGlhbW9uZCxcclxuICAgICAgICAgICAgZ29sZDogdGhpcy5fZ29sZCxcclxuICAgICAgICAgICAgc2V0dGluZzogSlNPTi5zdHJpbmdpZnkodGhpcy5fc2V0dGluZyksXHJcbiAgICAgICAgICAgIHN0YW1pbmE6IHRoaXMuc3RhbWluYSxcclxuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IENhY2hlc01ncigpXHJcblxyXG5pbnRlcmZhY2UgU2V0dGluZyB7XHJcbiAgICBtdXNpYzogbnVtYmVyLCAgLy8g6Z+z5LmQ6Z+z6YeP5aSn5bCPIDAgLTFcclxuICAgIGF1ZGlvOiBudW1iZXIsICAvLyDpn7PmlYjpn7Pph4/lpKflsI9cclxuICAgIHZpYnJhdGU6IG51bWJlciAvLyDmmK/lkKbpnIfliqhcclxufVxyXG5cclxuaW50ZXJmYWNlIEN1c3RvbURhdGEge1xyXG4gICAgc2lnblRpbWU6IG51bWJlciAgLy/kuIrmrKHnrb7liLDml7bpl7RcclxuICAgIGhhbW1lck51bTogbnVtYmVyIC8v5Ymp5L2Z6ZSk5a2Q5Liq5pWwXHJcbiAgICBzcHJpdGVOdW06IG51bWJlciAvL+WJqeS9meaBtumtlOasoeaVsFxyXG4gICAgbGFzdFNpZ25OdW06IG51bWJlciAvL+S4iuasoeetvuWIsOaXtumXtFxyXG4gICAgc2lnbk51bTogbnVtYmVyICAgLy/lvZPliY3nrb7liLDmrKHmlbBcclxuICAgIGhpbnROdW06IG51bWJlciAgLy/lhY3otLnmj5DnpLrmlbDmja5cclxuICAgIHNldHRpbmc6IFNldHRpbmdcclxufVxyXG4iXX0=