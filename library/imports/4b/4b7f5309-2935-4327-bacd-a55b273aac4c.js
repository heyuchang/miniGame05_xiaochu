"use strict";
cc._RF.push(module, '4b7f5MJKTVDJ7rNpVsnOqxM', 'StorageMgr');
// Script/Common/manage/StorageMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本地数据处理
 */
var GameLogMgr_1 = require("./GameLogMgr");
var StorageMgr = /** @class */ (function () {
    function StorageMgr() {
    }
    /**
     * 读取本地数据
     * @param key
     */
    StorageMgr.read = function (key) {
        if (key != null) {
            var result = cc.sys.localStorage.getItem(key);
            if (result) {
                result = JSON.parse(result);
            }
            GameLogMgr_1.default.log('storage read', key, result);
            return result;
        }
    };
    /**
     * 写入本地数据
     * @param key
     * @param value
     */
    StorageMgr.save = function (key, value) {
        try {
            GameLogMgr_1.default.log('storage save', key, value);
            if (key != null) {
                return cc.sys.localStorage.setItem(key, JSON.stringify(value));
            }
        }
        catch (error) {
            GameLogMgr_1.default.error(error);
        }
    };
    /**
     * 清空本地数据
     */
    StorageMgr.clear = function () {
        return cc.sys.localStorage.clear();
    };
    /**
     * 删除本地数据
     * @param key
     */
    StorageMgr.rm = function (key) {
        if (key != null) {
            return cc.sys.localStorage.removeItem(key);
        }
    };
    return StorageMgr;
}());
exports.default = StorageMgr;

cc._RF.pop();