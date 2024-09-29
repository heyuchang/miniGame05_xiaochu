"use strict";
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