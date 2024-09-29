
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/StorageMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcU3RvcmFnZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsMkNBQW1DO0FBRW5DO0lBQUE7SUFpREEsQ0FBQztJQWhERzs7O09BR0c7SUFDVyxlQUFJLEdBQWxCLFVBQW1CLEdBQVc7UUFDMUIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksTUFBTSxFQUFFO2dCQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9CO1lBQ0Qsb0JBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6QyxPQUFPLE1BQU0sQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csZUFBSSxHQUFsQixVQUFtQixHQUFXLEVBQUUsS0FBVTtRQUN0QyxJQUFJO1lBQ0Esb0JBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNsRTtTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixvQkFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNXLGdCQUFLLEdBQW5CO1FBQ0ksT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csYUFBRSxHQUFoQixVQUFpQixHQUFXO1FBQ3hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FqREEsQUFpREMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmnKzlnLDmlbDmja7lpITnkIZcclxuICovXHJcbmltcG9ydCBHYW1lTG9nIGZyb20gXCIuL0dhbWVMb2dNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2VNZ3Ige1xyXG4gICAgLyoqXHJcbiAgICAgKiDor7vlj5bmnKzlnLDmlbDmja5cclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKCdzdG9yYWdlIHJlYWQnLCBrZXksIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YaZ5YWl5pys5Zyw5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgR2FtZUxvZy5sb2coJ3N0b3JhZ2Ugc2F2ZScsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m65pys5Zyw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOacrOWcsOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJtKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=