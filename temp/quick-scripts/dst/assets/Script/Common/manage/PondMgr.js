
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/PondMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '59aae5+cptD1bbCVBOsqtwq', 'PondMgr');
// Script/Common/manage/PondMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./GameLogMgr");
var LoadMgr_1 = require("./LoadMgr");
var PondMgr = /** @class */ (function () {
    function PondMgr() {
    }
    /**
     * 新增对象池
     * @param url 名称
     * @param prefab 预制体
     * @param cnt 个数
     */
    PondMgr.addToCaches = function (url, prefab, cnt) {
        if (cnt === void 0) { cnt = 1; }
        if (url && prefab) { //判断url 和预制体 是否为空
            if (this.caches[url]) {
                return false;
            }
            this.caches[url] = prefab;
            this.createToPool(url, cnt);
            return true;
        }
    };
    PondMgr.createToPool = function (url, cnt) {
        if (cnt === void 0) { cnt = 1; }
        //判断 url是否为空，或者 内存中已经存在
        if (!url || !this.caches[url]) {
            return;
        }
        //如果 gamePool 中没有存在 的话 ， 那么就创建一个 cc.Node
        if (this.gamePool[url] == null) {
            this.gamePool[url] = new cc.NodePool();
        }
        cnt -= this.gamePool[url].size();
        for (var i = 0; i < cnt; i++) {
            var item = cc.instantiate(this.caches[url]);
            this.gamePool[url].put(item);
        }
    };
    /**
     * 放回对象池
     */
    PondMgr.putNodeToPool = function (url, item) {
        if (item == null || url == "" || url == null) {
            GameLogMgr_1.default.warn('putNodeToPool fail', url, item);
            return;
        }
        //该对象池不存在，重新创建
        if (this.gamePool[url] == null) {
            this.gamePool[url] = new cc.NodePool();
        }
        //清空父节点
        item.parent = null;
        this.gamePool[url].put(item);
    };
    /**
     * 从对象池中获取一个节点
     */
    PondMgr.getNodeFromPool = function (url) {
        var item = null;
        //如果对象池为空，则需要重新创建一下
        if (this.gamePool[url] == null) {
            this.gamePool[url] = new cc.NodePool();
        }
        if (this.gamePool[url].size() > 0) {
            item = this.gamePool[url].get(); // 对象池 中如果已经存在这个节点了，直接去除就行
        }
        else if (this.caches[url]) {
            //没有存在这个节点的话 ，需要根据 caches 创建
            item = cc.instantiate(this.caches[url]);
        }
        return item;
    };
    /**
     * 异步获取节点
     * @param url  节点路径
     * @param callFun   获取到之后的回调函数
     */
    PondMgr.getAsyncNodeToPool = function (url, callFun) {
        var _this = this;
        if (!url) {
            GameLogMgr_1.default.warn("getAsyncNodeToPool", "url为空");
            return;
        }
        var item = this.getNodeFromPool(url); // 先获取节点
        if (item) { //节点存在，调用回调
            if (callFun) {
                callFun(item);
            }
        }
        else {
            //节点不存在，只能去加载咯 ，芜湖
            LoadMgr_1.default.loadPrefab(url).then(function (prefab) {
                _this.addToCaches(url, prefab);
                item = _this.getNodeFromPool(url);
                if (callFun) {
                    callFun(item);
                }
            });
        }
    };
    PondMgr.caches = {};
    PondMgr.gamePool = {}; //对象池？
    return PondMgr;
}());
exports.default = PondMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcUG9uZE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFtQztBQUNuQyxxQ0FBZ0M7QUFFaEM7SUFBQTtJQXVHQSxDQUFDO0lBakdHOzs7OztPQUtHO0lBQ1csbUJBQVcsR0FBekIsVUFBMEIsR0FBVyxFQUFFLE1BQVcsRUFBRSxHQUFlO1FBQWYsb0JBQUEsRUFBQSxPQUFlO1FBQy9ELElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFJLGlCQUFpQjtZQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVjLG9CQUFZLEdBQTNCLFVBQTRCLEdBQVcsRUFBRSxHQUFlO1FBQWYsb0JBQUEsRUFBQSxPQUFlO1FBQ3BELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPO1NBQ1Y7UUFFRCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFDO1FBRUQsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxH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LGNBQU0sR0FBMkIsRUFBRSxDQUFDO0lBRXBDLGdCQUFRLEdBQW1DLEVBQUUsQ0FBQyxDQUFHLE1BQU07SUFtRzFFLGNBQUM7Q0F2R0QsQUF1R0MsSUFBQTtrQkF2R29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZUxvZyBmcm9tIFwiLi9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBMb2FkTWdyIGZyb20gXCIuL0xvYWRNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbmRNZ3Ige1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNhY2hlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdhbWVQb29sOiB7IFtrZXk6IHN0cmluZ106IGNjLk5vZGVQb29sIH0gPSB7fTsgICAvL+WvueixoeaxoO+8n1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paw5aKe5a+56LGh5rGgXHJcbiAgICAgKiBAcGFyYW0gdXJsIOWQjeensFxyXG4gICAgICogQHBhcmFtIHByZWZhYiDpooTliLbkvZNcclxuICAgICAqIEBwYXJhbSBjbnQg5Liq5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkVG9DYWNoZXModXJsOiBzdHJpbmcsIHByZWZhYjogYW55LCBjbnQ6IG51bWJlciA9IDEpIHtcclxuICAgICAgICBpZiAodXJsICYmIHByZWZhYikgeyAgIC8v5Yik5patdXJsIOWSjOmihOWItuS9kyDmmK/lkKbkuLrnqbpcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVzW3VybF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVzW3VybF0gPSBwcmVmYWI7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVG9Qb29sKHVybCwgY250KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVRvUG9vbCh1cmw6IHN0cmluZywgY250OiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgLy/liKTmlq0gdXJs5piv5ZCm5Li656m677yM5oiW6ICFIOWGheWtmOS4reW3sue7j+WtmOWcqFxyXG4gICAgICAgIGlmICghdXJsIHx8ICF0aGlzLmNhY2hlc1t1cmxdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aaC5p6cIGdhbWVQb29sIOS4reayoeacieWtmOWcqCDnmoTor50g77yMIOmCo+S5iOWwseWIm+W7uuS4gOS4qiBjYy5Ob2RlXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZVBvb2xbdXJsXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVBvb2xbdXJsXSA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY250IC09IHRoaXMuZ2FtZVBvb2xbdXJsXS5zaXplKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FjaGVzW3VybF0pO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVQb29sW3VybF0ucHV0KGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvuWbnuWvueixoeaxoFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHB1dE5vZGVUb1Bvb2wodXJsOiBzdHJpbmcsIGl0ZW06IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsIHx8IHVybCA9PSBcIlwiIHx8IHVybCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cud2FybigncHV0Tm9kZVRvUG9vbCBmYWlsJywgdXJsLCBpdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/or6Xlr7nosaHmsaDkuI3lrZjlnKjvvIzph43mlrDliJvlu7pcclxuICAgICAgICBpZiAodGhpcy5nYW1lUG9vbFt1cmxdID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lUG9vbFt1cmxdID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5riF56m654i26IqC54K5XHJcbiAgICAgICAgaXRlbS5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2FtZVBvb2xbdXJsXS5wdXQoaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47lr7nosaHmsaDkuK3ojrflj5bkuIDkuKroioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXROb2RlRnJvbVBvb2wodXJsOiBzdHJpbmcpOiBjYy5Ob2RlIHtcclxuICAgICAgICBsZXQgaXRlbSA9IG51bGw7XHJcbiAgICAgICAgLy/lpoLmnpzlr7nosaHmsaDkuLrnqbrvvIzliJnpnIDopoHph43mlrDliJvlu7rkuIDkuItcclxuICAgICAgICBpZiAodGhpcy5nYW1lUG9vbFt1cmxdID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lUG9vbFt1cmxdID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVQb29sW3VybF0uc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5nYW1lUG9vbFt1cmxdLmdldCgpOyAvLyDlr7nosaHmsaAg5Lit5aaC5p6c5bey57uP5a2Y5Zyo6L+Z5Liq6IqC54K55LqG77yM55u05o6l5Y676Zmk5bCx6KGMXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhY2hlc1t1cmxdKSB7XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ5a2Y5Zyo6L+Z5Liq6IqC54K555qE6K+dIO+8jOmcgOimgeagueaNriBjYWNoZXMg5Yib5bu6XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhY2hlc1t1cmxdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvILmraXojrflj5boioLngrlcclxuICAgICAqIEBwYXJhbSB1cmwgIOiKgueCuei3r+W+hFxyXG4gICAgICogQHBhcmFtIGNhbGxGdW4gICDojrflj5bliLDkuYvlkI7nmoTlm57osIPlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRBc3luY05vZGVUb1Bvb2wodXJsOiBzdHJpbmcsIGNhbGxGdW46IGFueSkge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cud2FybihcImdldEFzeW5jTm9kZVRvUG9vbFwiLCBcInVybOS4uuepulwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0Tm9kZUZyb21Qb29sKHVybCk7ICAvLyDlhYjojrflj5boioLngrlcclxuICAgICAgICBpZiAoaXRlbSkgeyAgLy/oioLngrnlrZjlnKjvvIzosIPnlKjlm57osINcclxuICAgICAgICAgICAgaWYgKGNhbGxGdW4pIHtcclxuICAgICAgICAgICAgICAgIGNhbGxGdW4oaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+iKgueCueS4jeWtmOWcqO+8jOWPquiDveWOu+WKoOi9veWSryDvvIzoipzmuZZcclxuICAgICAgICAgICAgTG9hZE1nci5sb2FkUHJlZmFiKHVybCkudGhlbigocHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9DYWNoZXModXJsLCBwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuZ2V0Tm9kZUZyb21Qb29sKHVybCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbEZ1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxGdW4oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==