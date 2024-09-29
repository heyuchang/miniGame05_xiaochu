
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Tools.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b484dylvbFEM6rEcIH7Ekzp', 'Tools');
// Script/Common/Tools.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LoadMgr_1 = require("./manage/LoadMgr");
var CacheMgr_1 = require("./manage/CacheMgr");
var GameLogMgr_1 = require("./manage/GameLogMgr");
var JiuWuSDK_1 = require("../SDK/JiuWuSDK");
var Game_1 = require("../Scene/Game");
var PanelMgr_1 = require("./manage/PanelMgr");
var ShortageView_1 = require("../Moudle/View/ShortageView");
var isNumber = cc.js.isNumber;
var QgNative_1 = require("./manage/Api/QgNative");
var LogMgr_1 = require("./LogMgr");
var NativeView_1 = require("../Moudle/View/NativeView");
var QgRewardedAd_1 = require("./manage/Api/QgRewardedAd");
var QgIntersAd_1 = require("./manage/Api/QgIntersAd");
var AudioMgr_1 = require("./manage/AudioMgr");
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.subStr = function (str, n) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "...";
            }
        }
        return str;
    };
    /**
     * 短震动
     * light  轻震动
     * medium 中震动
     * heavy  重震动
     */
    Tools.vibrateShort = function (type, number) {
        if (type === void 0) { type = 'heavy'; }
        if (number === void 0) { number = 10; }
        // @ts-ignore
        if (!window.qg) {
            return;
        }
        for (var index = 0; index < number; index++) {
            // @ts-ignore
            qg.vibrateShort();
        }
    };
    /**
     * 短震动
     */
    Tools.vibrateLong = function () {
        // @ts-ignore
        if (!window.qg) {
            return;
        }
        // @ts-ignore
        qg.vibrateLong();
    };
    //判断一个值是否在一个数组中
    Tools.JudgeValueInArr = function (value, arr) {
        var flag = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    /**
     * 对象深拷贝
     * @param obj
     */
    Tools.deepClone = function (obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        }
        catch (e) {
            return obj;
        }
    };
    /**
     * 获取整数随机值
     * @param maxValue
     * @return [0, max)
     */
    Tools.getRandomMax = function (maxValue) {
        return Math.floor(Math.random() * maxValue);
    };
    /**
     * 获取数组随机值
     * @param array
     */
    Tools.getRandomByArray = function (array) {
        try {
            return array[this.getRandomMax(array.length)];
        }
        catch (e) {
            GameLogMgr_1.default.error('获取数组随机值异常', e);
        }
        return {};
    };
    /**
     * 获取整数随机值
     * @param minValue
     * @param maxValue
     * @return [min, max)
     */
    Tools.getRandom = function (minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    };
    /**
     * 获取随机值
     * @param minValue
     * @param maxValue
     * @return (min, max]
     */
    Tools.getRealRandom = function (minValue, maxValue) {
        return Math.random() * (maxValue - minValue) + minValue;
    };
    Tools.sort = function (arr, begin, end) {
        if (begin === void 0) { begin = 0; }
        if (end === void 0) { end = arr.length; }
        if (end <= begin)
            return arr;
        var i = begin;
        var j = end;
        var key = arr[begin].sort;
        while (true) {
            while (true) {
                if (i == j)
                    break;
                if (arr[j].sort < key) {
                    var temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                    break;
                }
                j--;
            }
            while (true) {
                if (i == j)
                    break;
                if (arr[i].sort > key) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    break;
                }
                i++;
            }
            if (i == j)
                break;
        }
        if (end - j > 1) {
            arr = Tools.sort(arr, j + 1, end);
        }
        if (i - begin > 1) {
            arr = Tools.sort(arr, begin, i);
        }
        return arr;
    };
    /**
     * 快速排序导出信息:
     * @param arr 需要进行快速排序的数组
     * @returns {*[]|*}
     */
    Tools.quickExportSort = function (arr) {
        arr.sort(function () {
            return 0.5 - Math.random();
        });
        if (CacheMgr_1.default.earlyExportTripPart.length > 0) {
            var arr2 = [];
            for (var i = arr.length - 1; i >= 0; i--) {
                if (this.judgeValueInArr(arr[i].appId, CacheMgr_1.default.earlyExportTripPart)) {
                    arr2.push(Tools.deepClone(arr[i]));
                    arr.splice(i, 1);
                }
            }
            for (var i = 0; i < arr2.length; i++) {
                arr.push(arr2[i]);
            }
        }
        return arr;
    };
    /**
     * 改变节点位置的 y 为 banner 位置的 y (骗点用)
     * @param node
     */
    Tools.changeNodePosition = function (node) {
        var banner = Game_1.default.Ins.banner;
        node.y = banner.y + banner.height / 2;
    };
    /**
     * 调整按钮位置到 banner上方
     * @param button
     */
    Tools.setExportPos = function (button) {
        var banner = Game_1.default.Ins.banner;
        this.changeNodePosition(button);
        button.y = button.y + banner.height / 2 + button.height / 2;
    };
    /**
     * 骗点结束移动 按钮
     * @param time
     * @param button
     */
    Tools.setExportPos_Animation = function (time, button) {
        var banner = Game_1.default.Ins.banner;
        this.changeNodePosition(button);
        cc.tween(button)
            .to(time, { y: button.y + banner.height / 2 + button.height / 2 }, { easing: "smooth" })
            .start();
    };
    /**
     * 判断百分比
     * @param per
     */
    Tools.checkPer = function (per) {
        if (!per) {
            return false;
        }
        return Tools.getRandomMax(100) <= per;
    };
    /**
     * 游戏链接后台，资源加载, 初始化 gameBox
     */
    Tools.model_initModel = function (f) {
        var functions = [
            function () {
                var names = ["sub", "homeView", "gameView"];
                LoadMgr_1.default.loadBundle(names).then(function () {
                    f();
                });
            },
            function () {
                f();
            },
        ];
        for (var i = 0; i < functions.length; i++) {
            functions[i]();
        }
        return functions.length;
    };
    /**
     *  播放视频， resolve 返回 true 为获得奖励， false 为未获得奖励
     */
    Tools.handleVideo = function () {
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                resolve(true);
                return;
            }
            AudioMgr_1.default.backMusic(false);
            QgRewardedAd_1.default.showRewardedVideo().then(function (res) {
                var boolean = res == 1;
                AudioMgr_1.default.backMusic();
                resolve(boolean);
            });
        });
    };
    /**
     * 打开或关闭 碰撞系统功能
     * @param isOpen 碰撞系统
     * @param draw debug 绘制
     * @param bounding 包围盒
     */
    Tools.getCollision = function (isOpen, draw, bounding) {
        if (isOpen === void 0) { isOpen = true; }
        if (draw === void 0) { draw = false; }
        if (bounding === void 0) { bounding = false; }
        var Manager = cc.director.getCollisionManager();
        Manager.enabled = isOpen;
        Manager.enabledDebugDraw = draw;
        Manager.enabledDrawBoundingBox = bounding;
    };
    /**
     * 打开或关闭 物理系统
     * @param isOpen
     * @param draw
     */
    Tools.getPhysics = function (isOpen, draw) {
        if (isOpen === void 0) { isOpen = true; }
        if (draw === void 0) { draw = false; }
        var Manager = cc.director.getPhysicsManager();
        Manager.enabled = true;
        if (draw) {
            cc.director.getPhysicsManager().debugDrawFlags =
                cc.PhysicsManager.DrawBits.e_aabbBit
                    |
                        cc.PhysicsManager.DrawBits.e_jointBit
                    |
                        cc.PhysicsManager.DrawBits.e_shapeBit;
        }
    };
    /**
     *  注册一组 touch 事件
     * @param node
     * @param start
     * @param move
     * @param end
     * @param cancel
     * @param target
     * @param bool
     */
    Tools.onTouchAll = function (node, start, move, end, cancel, target, bool) {
        if (bool === void 0) { bool = true; }
        if (node) {
            if (bool) {
                node.on(cc.Node.EventType.TOUCH_START, start, target);
                node.on(cc.Node.EventType.TOUCH_MOVE, move, target);
                node.on(cc.Node.EventType.TOUCH_END, end, target);
                node.on(cc.Node.EventType.TOUCH_CANCEL, cancel, target);
            }
            else {
                node.off(cc.Node.EventType.TOUCH_START, start, target);
                node.off(cc.Node.EventType.TOUCH_MOVE, move, target);
                node.off(cc.Node.EventType.TOUCH_END, end, target);
                node.off(cc.Node.EventType.TOUCH_CANCEL, cancel, target);
            }
        }
    };
    /**
     * 获取节点所在父节点的下标
     *  @param node
     */
    Tools.getChildrenIndex = function (node) {
        var parent = node.parent;
        for (var i = 0; i < parent.children.length; i++) {
            var value = parent.children[i];
            if (node === value) {
                return i;
            }
        }
    };
    /**
     * 该位置是否在节点中
     * @param point 位置
     * @param node 节点
     */
    Tools.getPointInNode = function (point, node) {
        return node.getBoundingBoxToWorld().contains(point);
    };
    /**
     * 获取比较奇怪的时间字符串 （特定的一天) 20210203
     */
    Tools.date_getTimeNum = function (date) {
        return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    };
    /**
     * 获取两个时间的时间差
     * @param start1   比较靠后的时间
     * @param start2   比较靠前的时间
     * @param type     获取的时间差类型  0 day  1 hour 2 minuter 3 second
     */
    Tools.date_getTimeDifference = function (start1, start2, type) {
        if (isNumber(start1)) {
            start1 = new Date(start1);
        }
        if (isNumber(start2)) {
            start2 = new Date(start2);
        }
        if (start1 instanceof Date && start2 instanceof Date) {
            var distance = start1.getTime() - start2.getTime(); //时间差秒
            switch (type) {
                case 0:
                    return {
                        distance: Math.floor(distance / (24 * 60 * 60 * 1000)),
                        distance_real: distance,
                    };
                case 1:
                    return {
                        distance: Math.floor(distance / (60 * 60 * 1000)),
                        distance_real: distance,
                    };
                case 2:
                    return {
                        distance: Math.floor(distance / (60 * 1000)),
                        distance_real: distance,
                    };
                case 3:
                    return {
                        distance: Math.floor(distance / (1000)),
                        distance_real: distance,
                    };
            }
        }
    };
    /**
     * 获取当前主机地址
     */
    Tools.getHost = function () {
        return JiuWuSDK_1.default.url.host;
    };
    /**
     * 根据一个矩形 ，创建一个节点
     */
    Tools.getNodeForRect = function (rect) {
        var node = new cc.Node();
        node.width = rect.width;
        node.height = rect.height;
        node.setPosition(cc.v3(rect.center));
        return node;
    };
    /**
     * 获取一个节点四个点的位置 (未经旋转 这种操作）
     * @param node
     */
    //获取一个节点四个点的位置 (未经旋转 这种操作）
    Tools.getNodeFourPoint = function (node) {
        var anchor = node.getAnchorPoint();
        return {
            left_down: cc.v2(node.position.x - anchor.x * node.width, node.position.y - anchor.y * node.height),
            left_top: cc.v2(node.position.x - anchor.x * node.width, node.position.y + (1 - anchor.y) * node.height),
            right_down: cc.v2(node.position.x + (1 - anchor.x) * node.width, node.position.y - anchor.y * node.height),
            right_top: cc.v2(node.position.x + (1 - anchor.x) * node.width, node.position.y + (1 - anchor.y) * node.height)
        };
    };
    //判断一个值是否在一个数组中
    Tools.judgeValueInArr = function (value, arr) {
        var flag = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //判断两个数组是否相交
    Tools.judgeArraySame = function (arr1, arr2) {
        var flag = false;
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] == arr2[j]) {
                    flag = true;
                    return flag;
                }
            }
        }
        return flag;
    };
    //banner根据节点适配
    Tools.getRealSize = function (node, resize_width, resize_height) {
        if (resize_width === void 0) { resize_width = null; }
        if (resize_height === void 0) { resize_height = null; }
        //获取屏幕设计尺寸
        var canvas = node.parent;
        var size = canvas.getContentSize();
        var data = Tools.getNodeFourPoint(canvas);
        var pc = data.left_top.sub(cc.v2(Tools.getNodeFourPoint(node).left_top));
        var screen = cc.view.getFrameSize();
        var scaleX = screen.width / size.width;
        var scaleY = screen.height / size.height;
        if (resize_width && resize_height) {
            node.width = resize_width / scaleX;
            node.height = resize_height / scaleY;
        }
        // console.log("scaleX", scaleX, "scaleY", scaleY)
        return {
            width: node.width * scaleX,
            height: node.height * scaleY,
            left: -pc.x * scaleX,
            top: pc.y * scaleY,
        };
    };
    /**
     * 修改体力 ， 如果体力不足 ，修改失败的话 ，会自动弹出体力不足框
     * @param num 需要改动的体力
     * @param callBack
     */
    Tools.changeStamina = function (num, callBack) {
        if (CacheMgr_1.default.stamina + num < 0) {
            PanelMgr_1.default.INS.openPanel({
                panel: ShortageView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    type: "stamina",
                    callBack: callBack,
                    price: Math.abs(num),
                }
            });
            return false;
        }
        else {
            if (callBack) {
                callBack();
            }
        }
        CacheMgr_1.default.stamina = CacheMgr_1.default.stamina + num;
        return true;
    };
    /**
     * 修改金币 ， 如果金币不足 ，修改失败的话 ，会自动弹出金币不足框
     * @param num
     * @param callBack   成功回调 （包括领取金币成功）
     */
    Tools.changeGold = function (num, callBack) {
        if (CacheMgr_1.default.gold + num < 0) {
            PanelMgr_1.default.INS.openPanel({
                panel: ShortageView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    type: "gold",
                    callBack: callBack,
                    price: Math.abs(num),
                }
            });
            return false;
        }
        else {
            if (callBack) {
                callBack();
            }
        }
        CacheMgr_1.default.gold = CacheMgr_1.default.gold + num;
        return true;
    };
    /**
     * 判断体力 ， 如果体力不足 ，修改失败的话 ，会自动弹出体力不足框
     * @param num 需要改动的体力
     * @param callBack
     */
    Tools.judgeStamina = function (num, callBack) {
        if (CacheMgr_1.default.stamina + num < 0) {
            PanelMgr_1.default.INS.openPanel({
                panel: ShortageView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    type: "stamina",
                    callBack: callBack,
                    price: 0,
                }
            });
            return false;
        }
        else {
            if (callBack) {
                callBack();
            }
        }
        return true;
    };
    /**
     * 判断金币 ， 如果金币不足 ，修改失败的话 ，会自动弹出金币不足框
     * @param num
     * @param callBack   成功回调 （包括领取金币成功）
     */
    Tools.judgeGold = function (num, callBack) {
        if (CacheMgr_1.default.gold + num < 0) {
            PanelMgr_1.default.INS.openPanel({
                panel: ShortageView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    type: "gold",
                    callBack: callBack,
                    price: num,
                }
            });
            return false;
        }
        else {
            if (callBack) {
                callBack();
            }
        }
        return true;
    };
    /**
     * 已知圆心，半径，角度，求圆上的点坐标 (坐标需要自己转)
     * @param center
     * @param r
     * @param angle
     */
    Tools.getCirclePoint = function (center, r, angle) {
        return cc.v3(center.x + r * Math.cos(angle * 3.14 / 180), center.y + r * Math.sin(angle * 3.14 / 180));
    };
    Tools.handlerInters = function () {
        return new Promise(function (resolve) {
            if (!Global_1.default.isVivo) {
                resolve(true);
                return;
            }
            QgIntersAd_1.default.showInters();
            resolve(true);
        });
    };
    /**
     * 判断原生广告显示
     */
    Tools.showNative = function (type, labelType, time) {
        return new Promise(function (resolve) {
            if (QgNative_1.default.nativeMessage == null) {
                QgNative_1.default.loadNative().then(function (res) {
                    if (res == false) {
                        LogMgr_1.default.error("原生广告拉取失败......");
                        resolve(false);
                        return;
                    }
                });
            }
            PanelMgr_1.default.INS.openPanel({
                panel: NativeView_1.default,
                layer: PanelMgr_1.Layer.nativeLayer,
                param: {
                    type: type,
                    labelType: labelType,
                    time: time
                }
            });
            resolve(true);
        });
    };
    return Tools;
}());
exports.default = Tools;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXFRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTRDO0FBQzVDLDRDQUF1QztBQUN2Qyw4Q0FBeUM7QUFDekMsa0RBQTZDO0FBQzdDLDRDQUF1QztBQUN2QyxzQ0FBaUM7QUFDakMsOENBQWtEO0FBQ2xELDREQUF1RDtBQUN2RCxJQUFPLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNqQyxrREFBNkM7QUFDN0MsbUNBQThCO0FBQzlCLHdEQUFtRDtBQUNuRCwwREFBcUQ7QUFDckQsc0RBQWlEO0FBQ2pELDhDQUF5QztBQUV6QztJQUFBO0lBdW5CQSxDQUFDO0lBcm5CaUIsWUFBTSxHQUFwQixVQUFxQixHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDL0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDbkM7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csa0JBQVksR0FBMUIsVUFBMkIsSUFBc0IsRUFBRSxNQUFtQjtRQUEzQyxxQkFBQSxFQUFBLGNBQXNCO1FBQUUsdUJBQUEsRUFBQSxXQUFtQjtRQUNsRSxhQUFhO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDWixPQUFNO1NBQ1Q7UUFDRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3pDLGFBQWE7WUFDYixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDVyxpQkFBVyxHQUF6QjtRQUNJLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNaLE9BQU07U0FDVDtRQUNELGFBQWE7UUFDYixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGVBQWU7SUFDRCxxQkFBZSxHQUE3QixVQUE4QixLQUFVLEVBQUUsR0FBZTtRQUNyRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUE7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNYLE1BQUs7YUFDUjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csZUFBUyxHQUF2QixVQUF3QixHQUFHO1FBQ3ZCLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEdBQUcsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUdEOzs7O09BSUc7SUFDVyxrQkFBWSxHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDVyxzQkFBZ0IsR0FBOUIsVUFBK0IsS0FBVTtRQUNyQyxJQUFJO1lBQ0EsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1Isb0JBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxlQUFTLEdBQXZCLFVBQXdCLFFBQWdCLEVBQUUsUUFBZ0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxtQkFBYSxHQUEzQixVQUE0QixRQUFnQixFQUFFLFFBQWdCO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUM1RCxDQUFDO0lBRWEsVUFBSSxHQUFsQixVQUFtQixHQUFVLEVBQUUsS0FBaUIsRUFBRSxHQUF3QjtRQUEzQyxzQkFBQSxFQUFBLFNBQWlCO1FBQUUsb0JBQUEsRUFBQSxNQUFjLEdBQUcsQ0FBQyxNQUFNO1FBQ3RFLElBQUksR0FBRyxJQUFJLEtBQUs7WUFDWixPQUFPLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNaLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsT0FBTyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLE1BQU07Z0JBQ2xCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDZCxNQUFNO2lCQUNUO2dCQUNELENBQUMsRUFBRSxDQUFDO2FBQ1A7WUFDRCxPQUFPLElBQUksRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLE1BQU07Z0JBQ2xCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDZCxNQUFNO2lCQUNUO2dCQUNELENBQUMsRUFBRSxDQUFDO2FBQ1A7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNOLE1BQU07U0FDYjtRQUNELElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDZixHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHFCQUFlLEdBQTdCLFVBQThCLEdBQWlCO1FBQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLGtCQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7WUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLGtCQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUNuQjthQUNKO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDcEI7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHdCQUFrQixHQUFoQyxVQUFpQyxJQUFhO1FBQzFDLElBQUksTUFBTSxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csa0JBQVksR0FBMUIsVUFBMkIsTUFBZTtRQUN0QyxJQUFJLE1BQU0sR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFHRDs7OztPQUlHO0lBQ1csNEJBQXNCLEdBQXBDLFVBQXFDLElBQVksRUFBRSxNQUFlO1FBQzlELElBQUksTUFBTSxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFBO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNYLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDO2FBQ25GLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDVyxjQUFRLEdBQXRCLFVBQXVCLEdBQVc7UUFDOUIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDVyxxQkFBZSxHQUE3QixVQUE4QixDQUFXO1FBQ3JDLElBQUksU0FBUyxHQUFlO1lBQ3hCO2dCQUNJLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQTtnQkFDekMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMzQixDQUFDLEVBQUUsQ0FBQTtnQkFDUCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFDRDtnQkFDSSxDQUFDLEVBQUUsQ0FBQztZQUNSLENBQUM7U0FDSixDQUFBO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbEI7UUFDRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ1csaUJBQVcsR0FBekI7UUFDSSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsSUFBSSxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBQ0Qsa0JBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUU7WUFDM0Isc0JBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ3RDLElBQUksT0FBTyxHQUFhLEdBQUcsSUFBSSxDQUFDLENBQUU7Z0JBQ2xDLGtCQUFRLENBQUMsU0FBUyxFQUFFLENBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csa0JBQVksR0FBMUIsVUFBMkIsTUFBc0IsRUFBRSxJQUFxQixFQUFFLFFBQXlCO1FBQXhFLHVCQUFBLEVBQUEsYUFBc0I7UUFBRSxxQkFBQSxFQUFBLFlBQXFCO1FBQUUseUJBQUEsRUFBQSxnQkFBeUI7UUFDL0YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDaEMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLGdCQUFVLEdBQXhCLFVBQXlCLE1BQXNCLEVBQUUsSUFBcUI7UUFBN0MsdUJBQUEsRUFBQSxhQUFzQjtRQUFFLHFCQUFBLEVBQUEsWUFBcUI7UUFDbEUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxFQUFFO1lBQ04sRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGNBQWM7Z0JBQzFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVM7O3dCQUVwQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVOzt3QkFFckMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUN4QztTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNXLGdCQUFVLEdBQXhCLFVBQXlCLElBQWEsRUFBRSxLQUFlLEVBQUUsSUFBYyxFQUFFLEdBQWEsRUFBRSxNQUFnQixFQUFFLE1BQVcsRUFBRSxJQUFvQjtRQUFwQixxQkFBQSxFQUFBLFdBQW9CO1FBQ3ZJLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM1RDtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHNCQUFnQixHQUE5QixVQUErQixJQUFhO1FBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUNoQixPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG9CQUFjLEdBQTVCLFVBQTZCLEtBQWMsRUFBRSxJQUFhO1FBQ3RELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7T0FFRztJQUNXLHFCQUFlLEdBQTdCLFVBQThCLElBQVU7UUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDcEYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csNEJBQXNCLEdBQXBDLFVBQXFDLE1BQXFCLEVBQUUsTUFBcUIsRUFBRSxJQUFZO1FBQzNGLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUM1QjtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUM1QjtRQUVELElBQUksTUFBTSxZQUFZLElBQUksSUFBSSxNQUFNLFlBQVksSUFBSSxFQUFFO1lBQ2xELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQzFELFFBQVEsSUFBSSxFQUFFO2dCQUNWLEtBQUssQ0FBQztvQkFDRixPQUFPO3dCQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUN0RCxhQUFhLEVBQUUsUUFBUTtxQkFDMUIsQ0FBQTtnQkFDTCxLQUFLLENBQUM7b0JBQ0YsT0FBTzt3QkFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUNqRCxhQUFhLEVBQUUsUUFBUTtxQkFDMUIsQ0FBQTtnQkFDTCxLQUFLLENBQUM7b0JBQ0YsT0FBTzt3QkFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzVDLGFBQWEsRUFBRSxRQUFRO3FCQUMxQixDQUFBO2dCQUNMLEtBQUssQ0FBQztvQkFDRixPQUFPO3dCQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN2QyxhQUFhLEVBQUUsUUFBUTtxQkFDMUIsQ0FBQTthQUNSO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDVyxhQUFPLEdBQXJCO1FBQ0ksT0FBTyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ1csb0JBQWMsR0FBNUIsVUFBNkIsSUFBYTtRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEJBQTBCO0lBQ1osc0JBQWdCLEdBQTlCLFVBQStCLElBQWE7UUFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ2xDLE9BQU87WUFDSCxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25HLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4RyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUcsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEgsQ0FBQTtJQUNMLENBQUM7SUFHRCxlQUFlO0lBQ0QscUJBQWUsR0FBN0IsVUFBOEIsS0FBVSxFQUFFLEdBQWU7UUFDckQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFB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b250ZW50IjpbImltcG9ydCBHbG9iYWwsIHtFeHBvcnREYXRhfSBmcm9tIFwiLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvYWRNZ3IgZnJvbSBcIi4vbWFuYWdlL0xvYWRNZ3JcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuL21hbmFnZS9DYWNoZU1nclwiO1xyXG5pbXBvcnQgR2FtZUxvZ01nciBmcm9tIFwiLi9tYW5hZ2UvR2FtZUxvZ01nclwiO1xyXG5pbXBvcnQgSml1V3VTREsgZnJvbSBcIi4uL1NESy9KaXVXdVNES1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vU2NlbmUvR2FtZVwiO1xyXG5pbXBvcnQgUGFuZWxNZ3IsIHtMYXllcn0gZnJvbSBcIi4vbWFuYWdlL1BhbmVsTWdyXCI7XHJcbmltcG9ydCBTaG9ydGFnZVZpZXcgZnJvbSBcIi4uL01vdWRsZS9WaWV3L1Nob3J0YWdlVmlld1wiO1xyXG5pbXBvcnQgaXNOdW1iZXIgPSBjYy5qcy5pc051bWJlcjtcclxuaW1wb3J0IFFnTmF0aXZlIGZyb20gXCIuL21hbmFnZS9BcGkvUWdOYXRpdmVcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi9Mb2dNZ3JcIjtcclxuaW1wb3J0IE5hdGl2ZVZpZXcgZnJvbSBcIi4uL01vdWRsZS9WaWV3L05hdGl2ZVZpZXdcIjtcclxuaW1wb3J0IFFnUmV3YXJkZWRBZCBmcm9tIFwiLi9tYW5hZ2UvQXBpL1FnUmV3YXJkZWRBZFwiO1xyXG5pbXBvcnQgUWdJbnRlcnNBZCBmcm9tIFwiLi9tYW5hZ2UvQXBpL1FnSW50ZXJzQWRcIjtcclxuaW1wb3J0IEF1ZGlvTWdyIGZyb20gXCIuL21hbmFnZS9BdWRpb01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHMge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3ViU3RyKHN0ciwgbikge1xyXG4gICAgICAgIGxldCByID0gL1teXFx4MDAtXFx4ZmZdL2c7XHJcbiAgICAgICAgaWYgKHN0ci5yZXBsYWNlKHIsIFwibW1cIikubGVuZ3RoIDw9IG4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG0gPSBNYXRoLmZsb29yKG4gLyAyKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc3RyLnN1YnN0cigwLCBpKS5yZXBsYWNlKHIsIFwibW1cIikubGVuZ3RoID49IG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIGkpICsgXCIuLi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55+t6ZyH5YqoXHJcbiAgICAgKiBsaWdodCAg6L276ZyH5YqoXHJcbiAgICAgKiBtZWRpdW0g5Lit6ZyH5YqoXHJcbiAgICAgKiBoZWF2eSAg6YeN6ZyH5YqoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdmlicmF0ZVNob3J0KHR5cGU6IHN0cmluZyA9ICdoZWF2eScsIG51bWJlcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCF3aW5kb3cucWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBudW1iZXI7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxZy52aWJyYXRlU2hvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnn63pnIfliqhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB2aWJyYXRlTG9uZygpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCF3aW5kb3cucWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBxZy52aWJyYXRlTG9uZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5LiA5Liq5YC85piv5ZCm5Zyo5LiA5Liq5pWw57uE5LitXHJcbiAgICBwdWJsaWMgc3RhdGljIEp1ZGdlVmFsdWVJbkFycih2YWx1ZTogYW55LCBhcnI6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHmt7Hmi7fotJ1cclxuICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWVwQ2xvbmUob2JqKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbTmlbDpmo/mnLrlgLxcclxuICAgICAqIEBwYXJhbSBtYXhWYWx1ZVxyXG4gICAgICogQHJldHVybiBbMCwgbWF4KVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmRvbU1heChtYXhWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pWw57uE6ZqP5py65YC8XHJcbiAgICAgKiBAcGFyYW0gYXJyYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSYW5kb21CeUFycmF5KGFycmF5OiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbdGhpcy5nZXRSYW5kb21NYXgoYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBHYW1lTG9nTWdyLmVycm9yKCfojrflj5bmlbDnu4Tpmo/mnLrlgLzlvILluLgnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pW05pWw6ZqP5py65YC8XHJcbiAgICAgKiBAcGFyYW0gbWluVmFsdWVcclxuICAgICAqIEBwYXJhbSBtYXhWYWx1ZVxyXG4gICAgICogQHJldHVybiBbbWluLCBtYXgpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmFuZG9tKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKyBtaW5WYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpmo/mnLrlgLxcclxuICAgICAqIEBwYXJhbSBtaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIG1heFZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIChtaW4sIG1heF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZWFsUmFuZG9tKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heFZhbHVlIC0gbWluVmFsdWUpICsgbWluVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzb3J0KGFycjogYW55W10sIGJlZ2luOiBudW1iZXIgPSAwLCBlbmQ6IG51bWJlciA9IGFyci5sZW5ndGgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICBpZiAoZW5kIDw9IGJlZ2luKVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIGxldCBpID0gYmVnaW47XHJcbiAgICAgICAgbGV0IGogPSBlbmQ7XHJcbiAgICAgICAgbGV0IGtleSA9IGFycltiZWdpbl0uc29ydDtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaikgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2pdLnNvcnQgPCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbal0gPSBhcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2ldID0gdGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGotLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaikgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLnNvcnQgPiBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2pdID0gdGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSBqKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmQgLSBqID4gMSkge1xyXG4gICAgICAgICAgICBhcnIgPSBUb29scy5zb3J0KGFyciwgaiArIDEsIGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpIC0gYmVnaW4gPiAxKSB7XHJcbiAgICAgICAgICAgIGFyciA9IFRvb2xzLnNvcnQoYXJyLCBiZWdpbiwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv6vpgJ/mjpLluo/lr7zlh7rkv6Hmga86XHJcbiAgICAgKiBAcGFyYW0gYXJyIOmcgOimgei/m+ihjOW/q+mAn+aOkuW6j+eahOaVsOe7hFxyXG4gICAgICogQHJldHVybnMgeypbXXwqfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHF1aWNrRXhwb3J0U29ydChhcnI6IEV4cG9ydERhdGFbXSkge1xyXG4gICAgICAgIGFyci5zb3J0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChDYWNoZU1nci5lYXJseUV4cG9ydFRyaXBQYXJ0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGFycjIgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdWRnZVZhbHVlSW5BcnIoYXJyW2ldLmFwcElkLCBDYWNoZU1nci5lYXJseUV4cG9ydFRyaXBQYXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycjIucHVzaChUb29scy5kZWVwQ2xvbmUoYXJyW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcnIyW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUueWPmOiKgueCueS9jee9rueahCB5IOS4uiBiYW5uZXIg5L2N572u55qEIHkgKOmql+eCueeUqClcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hhbmdlTm9kZVBvc2l0aW9uKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgYmFubmVyID0gR2FtZS5JbnMuYmFubmVyO1xyXG4gICAgICAgIG5vZGUueSA9IGJhbm5lci55ICsgYmFubmVyLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDosIPmlbTmjInpkq7kvY3nva7liLAgYmFubmVy5LiK5pa5XHJcbiAgICAgKiBAcGFyYW0gYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0RXhwb3J0UG9zKGJ1dHRvbjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBiYW5uZXIgPSBHYW1lLklucy5iYW5uZXI7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VOb2RlUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICBidXR0b24ueSA9IGJ1dHRvbi55ICsgYmFubmVyLmhlaWdodCAvIDIgKyBidXR0b24uaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqpfngrnnu5PmnZ/np7vliqgg5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdGltZVxyXG4gICAgICogQHBhcmFtIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldEV4cG9ydFBvc19BbmltYXRpb24odGltZTogbnVtYmVyLCBidXR0b246IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgYmFubmVyID0gR2FtZS5JbnMuYmFubmVyXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VOb2RlUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICBjYy50d2VlbihidXR0b24pXHJcbiAgICAgICAgICAgIC50byh0aW1lLCB7eTogYnV0dG9uLnkgKyBiYW5uZXIuaGVpZ2h0IC8gMiArIGJ1dHRvbi5oZWlnaHQgLyAyfSwge2Vhc2luZzogXCJzbW9vdGhcIn0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat55m+5YiG5q+UXHJcbiAgICAgKiBAcGFyYW0gcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tQZXIocGVyOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXBlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUb29scy5nZXRSYW5kb21NYXgoMTAwKSA8PSBwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/pk77mjqXlkI7lj7DvvIzotYTmupDliqDovb0sIOWIneWni+WMliBnYW1lQm94XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW9kZWxfaW5pdE1vZGVsKGY6IEZ1bmN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZnVuY3Rpb25zOiBGdW5jdGlvbltdID0gW1xyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZXMgPSBbXCJzdWJcIixcImhvbWVWaWV3XCIsXCJnYW1lVmlld1wiXVxyXG4gICAgICAgICAgICAgICAgTG9hZE1nci5sb2FkQnVuZGxlKG5hbWVzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGYoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uc1tpXSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmkq3mlL7op4bpopHvvIwgcmVzb2x2ZSDov5Tlm54gdHJ1ZSDkuLrojrflvpflpZblirHvvIwgZmFsc2Ug5Li65pyq6I635b6X5aWW5YqxXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGFuZGxlVmlkZW8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKGZhbHNlKSA7XHJcbiAgICAgICAgICAgIFFnUmV3YXJkZWRBZC5zaG93UmV3YXJkZWRWaWRlbygpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvb2xlYW4gOiBib29sZWFuID0gcmVzID09IDEgO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKCkgO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShib29sZWFuKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5oiW5YWz6ZetIOeisOaSnuezu+e7n+WKn+iDvVxyXG4gICAgICogQHBhcmFtIGlzT3BlbiDnorDmkp7ns7vnu59cclxuICAgICAqIEBwYXJhbSBkcmF3IGRlYnVnIOe7mOWItlxyXG4gICAgICogQHBhcmFtIGJvdW5kaW5nIOWMheWbtOebklxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENvbGxpc2lvbihpc09wZW46IGJvb2xlYW4gPSB0cnVlLCBkcmF3OiBib29sZWFuID0gZmFsc2UsIGJvdW5kaW5nOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBNYW5hZ2VyLmVuYWJsZWQgPSBpc09wZW47XHJcbiAgICAgICAgTWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gZHJhdztcclxuICAgICAgICBNYW5hZ2VyLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSBib3VuZGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOaIluWFs+mXrSDniannkIbns7vnu59cclxuICAgICAqIEBwYXJhbSBpc09wZW5cclxuICAgICAqIEBwYXJhbSBkcmF3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGh5c2ljcyhpc09wZW46IGJvb2xlYW4gPSB0cnVlLCBkcmF3OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZHJhdykge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID1cclxuICAgICAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdFxyXG4gICAgICAgICAgICAgICAgfFxyXG4gICAgICAgICAgICAgICAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdFxyXG4gICAgICAgICAgICAgICAgfFxyXG4gICAgICAgICAgICAgICAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdFxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOazqOWGjOS4gOe7hCB0b3VjaCDkuovku7ZcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRcclxuICAgICAqIEBwYXJhbSBtb3ZlXHJcbiAgICAgKiBAcGFyYW0gZW5kXHJcbiAgICAgKiBAcGFyYW0gY2FuY2VsXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0gYm9vbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uVG91Y2hBbGwobm9kZTogY2MuTm9kZSwgc3RhcnQ6IEZ1bmN0aW9uLCBtb3ZlOiBGdW5jdGlvbiwgZW5kOiBGdW5jdGlvbiwgY2FuY2VsOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnksIGJvb2w6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHN0YXJ0LCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBtb3ZlLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGVuZCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBjYW5jZWwsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgc3RhcnQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBtb3ZlLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBlbmQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGNhbmNlbCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiKgueCueaJgOWcqOeItuiKgueCueeahOS4i+agh1xyXG4gICAgICogIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRyZW5JbmRleChub2RlOiBjYy5Ob2RlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyZW50LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+l5L2N572u5piv5ZCm5Zyo6IqC54K55LitXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg5L2N572uXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQb2ludEluTm9kZShwb2ludDogY2MuVmVjMiwgbm9kZTogY2MuTm9kZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmNvbnRhaW5zKHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluavlOi+g+Wlh+aAqueahOaXtumXtOWtl+espuS4siDvvIjnibnlrprnmoTkuIDlpKkpIDIwMjEwMjAzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZV9nZXRUaW1lTnVtKGRhdGU6IERhdGUpIHtcclxuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Lik5Liq5pe26Ze055qE5pe26Ze05beuXHJcbiAgICAgKiBAcGFyYW0gc3RhcnQxICAg5q+U6L6D6Z2g5ZCO55qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gc3RhcnQyICAg5q+U6L6D6Z2g5YmN55qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gdHlwZSAgICAg6I635Y+W55qE5pe26Ze05beu57G75Z6LICAwIGRheSAgMSBob3VyIDIgbWludXRlciAzIHNlY29uZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVfZ2V0VGltZURpZmZlcmVuY2Uoc3RhcnQxOiBEYXRlIHwgbnVtYmVyLCBzdGFydDI6IERhdGUgfCBudW1iZXIsIHR5cGU6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgaWYgKGlzTnVtYmVyKHN0YXJ0MSkpIHtcclxuICAgICAgICAgICAgc3RhcnQxID0gbmV3IERhdGUoc3RhcnQxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOdW1iZXIoc3RhcnQyKSkge1xyXG4gICAgICAgICAgICBzdGFydDIgPSBuZXcgRGF0ZShzdGFydDIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhcnQxIGluc3RhbmNlb2YgRGF0ZSAmJiBzdGFydDIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHN0YXJ0MS5nZXRUaW1lKCkgLSBzdGFydDIuZ2V0VGltZSgpOyAvL+aXtumXtOW3ruenklxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5mbG9vcihkaXN0YW5jZSAvICgyNCAqIDYwICogNjAgKiAxMDAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlX3JlYWw6IGRpc3RhbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoNjAgKiA2MCAqIDEwMDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VfcmVhbDogZGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5mbG9vcihkaXN0YW5jZSAvICg2MCAqIDEwMDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VfcmVhbDogZGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAzICA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoMTAwMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZV9yZWFsOiBkaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3kuLvmnLrlnLDlnYBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIb3N0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEppdVd1U0RLLnVybC5ob3N0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiA5Liq55+p5b2iIO+8jOWIm+W7uuS4gOS4quiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vZGVGb3JSZWN0KHJlY3Q6IGNjLlJlY3QpOiBjYy5Ob2RlIHtcclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS53aWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgbm9kZS5oZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYzKHJlY3QuY2VudGVyKSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDkuKroioLngrnlm5vkuKrngrnnmoTkvY3nva4gKOacque7j+aXi+i9rCDov5nnp43mk43kvZzvvIlcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIC8v6I635Y+W5LiA5Liq6IqC54K55Zub5Liq54K555qE5L2N572uICjmnKrnu4/ml4vovawg6L+Z56eN5pON5L2c77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vZGVGb3VyUG9pbnQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBhbmNob3IgPSBub2RlLmdldEFuY2hvclBvaW50KClcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWZ0X2Rvd246IGNjLnYyKG5vZGUucG9zaXRpb24ueCAtIGFuY2hvci54ICogbm9kZS53aWR0aCwgbm9kZS5wb3NpdGlvbi55IC0gYW5jaG9yLnkgKiBub2RlLmhlaWdodCksXHJcbiAgICAgICAgICAgIGxlZnRfdG9wOiBjYy52Mihub2RlLnBvc2l0aW9uLnggLSBhbmNob3IueCAqIG5vZGUud2lkdGgsIG5vZGUucG9zaXRpb24ueSArICgxIC0gYW5jaG9yLnkpICogbm9kZS5oZWlnaHQpLFxyXG4gICAgICAgICAgICByaWdodF9kb3duOiBjYy52Mihub2RlLnBvc2l0aW9uLnggKyAoMSAtIGFuY2hvci54KSAqIG5vZGUud2lkdGgsIG5vZGUucG9zaXRpb24ueSAtIGFuY2hvci55ICogbm9kZS5oZWlnaHQpLFxyXG4gICAgICAgICAgICByaWdodF90b3A6IGNjLnYyKG5vZGUucG9zaXRpb24ueCArICgxIC0gYW5jaG9yLngpICogbm9kZS53aWR0aCwgbm9kZS5wb3NpdGlvbi55ICsgKDEgLSBhbmNob3IueSkgKiBub2RlLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pat5LiA5Liq5YC85piv5ZCm5Zyo5LiA5Liq5pWw57uE5LitXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlVmFsdWVJbkFycih2YWx1ZTogYW55LCBhcnI6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pat5Lik5Liq5pWw57uE5piv5ZCm55u45LqkXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlQXJyYXlTYW1lKGFycjE6IG51bWJlcltdLCBhcnIyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIGxldCBmbGFnID0gZmFsc2VcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyMVtpXSA9PSBhcnIyW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vYmFubmVy5qC55o2u6IqC54K56YCC6YWNXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJlYWxTaXplKG5vZGU6IGNjLk5vZGUsIHJlc2l6ZV93aWR0aCA9IG51bGwsIHJlc2l6ZV9oZWlnaHQgPSBudWxsKToge1xyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgbGVmdDogbnVtYmVyLFxyXG4gICAgICAgIHRvcDogbnVtYmVyXHJcbiAgICB9IHtcclxuICAgICAgICAvL+iOt+WPluWxj+W5leiuvuiuoeWwuuWvuFxyXG4gICAgICAgIGxldCBjYW52YXMgPSBub2RlLnBhcmVudFxyXG4gICAgICAgIGxldCBzaXplID0gY2FudmFzLmdldENvbnRlbnRTaXplKClcclxuICAgICAgICBsZXQgZGF0YSA9IFRvb2xzLmdldE5vZGVGb3VyUG9pbnQoY2FudmFzKVxyXG4gICAgICAgIGxldCBwYyA9IGRhdGEubGVmdF90b3Auc3ViKGNjLnYyKFRvb2xzLmdldE5vZGVGb3VyUG9pbnQobm9kZSkubGVmdF90b3ApKVxyXG4gICAgICAgIGxldCBzY3JlZW4gPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xyXG4gICAgICAgIGxldCBzY2FsZVggPSBzY3JlZW4ud2lkdGggLyBzaXplLndpZHRoXHJcbiAgICAgICAgbGV0IHNjYWxlWSA9IHNjcmVlbi5oZWlnaHQgLyBzaXplLmhlaWdodFxyXG5cclxuICAgICAgICBpZiAocmVzaXplX3dpZHRoICYmIHJlc2l6ZV9oZWlnaHQpIHtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHJlc2l6ZV93aWR0aCAvIHNjYWxlWFxyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IHJlc2l6ZV9oZWlnaHQgLyBzY2FsZVlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzY2FsZVhcIiwgc2NhbGVYLCBcInNjYWxlWVwiLCBzY2FsZVkpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IG5vZGUud2lkdGggKiBzY2FsZVgsXHJcbiAgICAgICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHQgKiBzY2FsZVksXHJcbiAgICAgICAgICAgIGxlZnQ6IC1wYy54ICogc2NhbGVYLFxyXG4gICAgICAgICAgICB0b3A6IHBjLnkgKiBzY2FsZVksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55L2T5YqbIO+8jCDlpoLmnpzkvZPlipvkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuuS9k+WKm+S4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bSDpnIDopoHmlLnliqjnmoTkvZPliptcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoYW5nZVN0YW1pbmEobnVtOiBudW1iZXIsIGNhbGxCYWNrPzogRnVuY3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc3RhbWluYSArIG51bSA8IDApIHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbDogU2hvcnRhZ2VWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGFtaW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiBNYXRoLmFicyhudW0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENhY2hlTWdyLnN0YW1pbmEgPSBDYWNoZU1nci5zdGFtaW5hICsgbnVtO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56YeR5biBIO+8jCDlpoLmnpzph5HluIHkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuumHkeW4geS4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bVxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrICAg5oiQ5Yqf5Zue6LCDIO+8iOWMheaLrOmihuWPlumHkeW4geaIkOWKn++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoYW5nZUdvbGQobnVtOiBudW1iZXIsIGNhbGxCYWNrPzogRnVuY3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQ2FjaGVNZ3IuZ29sZCArIG51bSA8IDApIHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbDogU2hvcnRhZ2VWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJnb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiBNYXRoLmFicyhudW0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ2FjaGVNZ3IuZ29sZCA9IENhY2hlTWdyLmdvbGQgKyBudW1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5L2T5YqbIO+8jCDlpoLmnpzkvZPlipvkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuuS9k+WKm+S4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bSDpnIDopoHmlLnliqjnmoTkvZPliptcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlU3RhbWluYShudW06IG51bWJlciwgY2FsbEJhY2s/OiBGdW5jdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChDYWNoZU1nci5zdGFtaW5hICsgbnVtIDwgMCkge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsOiBTaG9ydGFnZVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXllcjogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YW1pbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYWxsQmFjazogY2FsbEJhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDAsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3ph5HluIEg77yMIOWmguaenOmHkeW4geS4jei2syDvvIzkv67mlLnlpLHotKXnmoTor50g77yM5Lya6Ieq5Yqo5by55Ye66YeR5biB5LiN6Laz5qGGXHJcbiAgICAgKiBAcGFyYW0gbnVtXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sgICDmiJDlip/lm57osIMg77yI5YyF5ous6aKG5Y+W6YeR5biB5oiQ5Yqf77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMganVkZ2VHb2xkKG51bTogbnVtYmVyLCBjYWxsQmFjaz86IEZ1bmN0aW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKENhY2hlTWdyLmdvbGQgKyBudW0gPCAwKSB7XHJcbiAgICAgICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgcGFuZWw6IFNob3J0YWdlVmlldyxcclxuICAgICAgICAgICAgICAgIGxheWVyOiBMYXllci5nYW1lTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZ29sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrOiBjYWxsQmFjayxcclxuICAgICAgICAgICAgICAgICAgICBwcmljZTogbnVtLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3suefpeWchuW/g++8jOWNiuW+hO+8jOinkuW6pu+8jOaxguWchuS4iueahOeCueWdkOaghyAo5Z2Q5qCH6ZyA6KaB6Ieq5bex6L2sKVxyXG4gICAgICogQHBhcmFtIGNlbnRlclxyXG4gICAgICogQHBhcmFtIHJcclxuICAgICAqIEBwYXJhbSBhbmdsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENpcmNsZVBvaW50KGNlbnRlcjogY2MuVmVjMywgcjogbnVtYmVyLCBhbmdsZTogbnVtYmVyKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYzKFxyXG4gICAgICAgICAgICBjZW50ZXIueCArIHIgKiBNYXRoLmNvcyhhbmdsZSAqIDMuMTQgLyAxODApLFxyXG4gICAgICAgICAgICBjZW50ZXIueSArIHIgKiBNYXRoLnNpbihhbmdsZSAqIDMuMTQgLyAxODApXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaGFuZGxlckludGVycygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUWdJbnRlcnNBZC5zaG93SW50ZXJzKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreWOn+eUn+W5v+WRiuaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dOYXRpdmUodHlwZSwgbGFiZWxUeXBlLCB0aW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChRZ05hdGl2ZS5uYXRpdmVNZXNzYWdlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFFnTmF0aXZlLmxvYWROYXRpdmUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcihcIuWOn+eUn+W5v+WRiuaLieWPluWksei0pS4uLi4uLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsOiBOYXRpdmVWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLm5hdGl2ZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogbGFiZWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHRpbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19