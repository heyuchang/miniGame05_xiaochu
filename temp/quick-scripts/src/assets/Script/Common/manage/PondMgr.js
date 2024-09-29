"use strict";
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