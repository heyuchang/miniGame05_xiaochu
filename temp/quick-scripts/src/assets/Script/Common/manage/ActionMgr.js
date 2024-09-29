"use strict";
cc._RF.push(module, '6f8c8uoFNJJzLKZkdh6en9Z', 'ActionMgr');
// Script/Common/manage/ActionMgr.ts

"use strict";
/**
 * 动画效果类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var easeInOut = cc.easeInOut;
var GameLogMgr_1 = require("./GameLogMgr");
var tween = cc.tween;
var ActionMgr = /** @class */ (function () {
    function ActionMgr() {
    }
    //疯狂抖动手指
    ActionMgr.shakeHand = function (node) {
        tween(node)
            .by(0.05, { y: 20 })
            .by(0.05, { y: -20 })
            .union()
            .repeatForever()
            .start();
    };
    ActionMgr.scaleNode = function (node, scale, time) {
        if (time === void 0) { time = 0.5; }
        try {
            cc.tween(node)
                .to(0, { scale: scale, y: -node.height * (1 - scale) })
                .to(time, { scale: 1, y: 0 })
                .start();
        }
        catch (e) {
            node.scale = 1;
            node.y = 0;
            GameLogMgr_1.default.log('shake动画异常', e);
        }
    };
    ActionMgr.moveUpDownForever = function (node, runTime, diff) {
        if (runTime === void 0) { runTime = 0.2; }
        if (diff === void 0) { diff = 10; }
        cc.tween(node).repeatForever(cc.sequence(cc.moveBy(runTime, new cc.Vec2(0, diff)), cc.moveBy(runTime, new cc.Vec2(0, -diff)))).start();
    };
    /**
     * 旋转节点
     * @param node
     * @param duration
     */
    ActionMgr.rotate = function (node, duration) {
        if (duration === void 0) { duration = 3; }
        try {
            cc.tween(node).repeatForever(cc.sequence(cc.rotateTo(duration, 180), cc.rotateTo(duration, 360))).start();
        }
        catch (e) {
            GameLogMgr_1.default.error('shakeNode异常', e, node);
        }
    };
    /**
     * 放大缩小 node
     * @param node
     * @param timeRun
     * @param timeStop
     * @param scale
     * @param count
     * @param endScale
     * @constructor
     */
    ActionMgr.scaleStop = function (node, timeRun, timeStop, scale, count, endScale) {
        if (timeRun === void 0) { timeRun = 0.1; }
        if (timeStop === void 0) { timeStop = 10; }
        if (scale === void 0) { scale = 0.3; }
        if (count === void 0) { count = 1; }
        if (endScale === void 0) { endScale = 1; }
        try {
            if (!node) {
                return;
            }
            node.scale = endScale;
            cc.tween(node)
                .repeatForever(cc.tween()
                .repeat(count, cc.tween()
                .to(timeRun, { scale: 1 + scale }, { easing: "smooth" })
                .to(timeRun, { scale: endScale }, { easing: "smooth" }))
                .to(timeRun, { angle: 0 })
                .delay(timeStop))
                .start();
        }
        catch (e) {
            GameLogMgr_1.default.error('shakeNode异常', e, node);
        }
    };
    ActionMgr.shakeNode = function (node, timeRun, dstAngle, count) {
        if (timeRun === void 0) { timeRun = 0.3; }
        if (dstAngle === void 0) { dstAngle = 10; }
        if (count === void 0) { count = 5; }
        cc.tween(node)
            .repeat(count, cc.tween()
            .to(timeRun, { angle: -dstAngle })
            .to(timeRun, { angle: dstAngle })).to(timeRun, { angle: 0 }).start();
    };
    /**
     * 摇动node
     * @param node
     * @param duration
     * @param dstAngle
     * @constructor
     */
    ActionMgr.shakeNodeForever = function (node, duration, dstAngle) {
        if (duration === void 0) { duration = 4; }
        if (dstAngle === void 0) { dstAngle = 10; }
        try {
            cc.tween(node).repeatForever(cc.sequence(cc.rotateTo(duration, -dstAngle), cc.rotateTo(duration, dstAngle))).start();
        }
        catch (e) {
            GameLogMgr_1.default.error('shakeNode异常', e, node);
        }
    };
    /**
     * node晃动后停止，一段时间后继续晃动
     * @param node 动作的节点
     * @param timeRun 单次晃动到左右任一边的时间
     * @param timeStop 停止的时间
     * @param dstAngle 晃动的角度
     * @param shakeCount 晃动的次数
     */
    ActionMgr.shakeStop = function (node, timeRun, timeStop, dstAngle, shakeCount) {
        if (timeRun === void 0) { timeRun = 0.1; }
        if (timeStop === void 0) { timeStop = 10; }
        if (dstAngle === void 0) { dstAngle = 10; }
        if (shakeCount === void 0) { shakeCount = 5; }
        try {
            cc.tween(node)
                .repeatForever(cc.tween()
                .delay(timeStop)
                .repeat(shakeCount, cc.tween()
                .to(timeRun, { angle: -dstAngle })
                .to(timeRun, { angle: dstAngle }))
                .to(timeRun, { angle: 0 }))
                .start();
        }
        catch (e) {
            GameLogMgr_1.default.error('shakeStop异常', e, node);
        }
    };
    ActionMgr.scaleMove = function (node, delayTime, repeatCount) {
        if (delayTime === void 0) { delayTime = 3; }
        if (repeatCount === void 0) { repeatCount = 2; }
        cc.tween(node)
            .repeatForever(cc.tween()
            .delay(delayTime)
            .repeat(repeatCount, cc.tween()
            .to(0.3, { scale: 1.1 })
            .to(0, { scale: 1 })
            .to(0.3, { scale: 1.2 })
            .to(0, { scale: 1 }))
        // .repeat(repeatCount,
        //     cc.tween()
        // )
        )
            .start();
    };
    /**
     * 界面缩放进入
     * @param node
     * @param duration
     */
    ActionMgr.moveBigIn = function (node, duration) {
        if (duration === void 0) { duration = 0.3; }
        if (!node) {
            return false;
        }
        try {
            node.scale = 2;
            cc.tween(node)
                .to(duration, { scale: 1 }, easeInOut(1))
                .start();
        }
        catch (e) {
            node.scale = 1;
            GameLogMgr_1.default.error('moveIn 异常', e, node);
        }
    };
    /**
     * 界面缩放进入
     * @param node
     * @param duration
     * @param beginSale
     */
    ActionMgr.moveIn = function (node, duration, beginSale) {
        if (duration === void 0) { duration = 0.4; }
        if (beginSale === void 0) { beginSale = 0; }
        node.scale = beginSale;
        cc.tween(node)
            .to(duration, { scale: 1 }, { easing: 'backOut' })
            .start();
    };
    /**
     * 界面从上推下
     */
    ActionMgr.moveTop = function (node, time) {
        if (time === void 0) { time = 0.4; }
        node.y = node.height / 2;
        cc.tween(node)
            .to(time, { y: 0 }, { easing: "smooth" })
            .start();
    };
    /**
     * 界面缩放退出
     * @param node
     * @param duration
     * @param endScale
     */
    ActionMgr.moveOut = function (node, duration, endScale) {
        if (duration === void 0) { duration = 0.4; }
        if (endScale === void 0) { endScale = 0; }
        if (!node) {
            return false;
        }
        try {
            node.scale = 1;
            cc.tween(node)
                .to(duration, { scale: endScale })
                .start();
        }
        catch (e) {
            node.scale = 0;
            GameLogMgr_1.default.error('moveOut 异常', e, node);
        }
    };
    /**
     * 从画布外进入, 不能重复调用
     * @param node 动作的节点
     * @param beginSide 界面进入的边
     * @param time 动作进行的时间/s
     * @param delay 动作延迟进行的时间/s
     */
    ActionMgr.moveInSide = function (node, beginSide, time, delay) {
        if (beginSide === void 0) { beginSide = this.TWEEN_FROM_SIDE.TOP; }
        if (time === void 0) { time = 0.5; }
        if (delay === void 0) { delay = 0; }
        if (!node) {
            return false;
        }
        if (!this._moveSideNodePosition.hasOwnProperty(node.uuid)) {
            this._moveSideNodePosition[node.uuid] = node.position.clone();
        }
        try {
            var resultPos = this._getSideResultPos(node, beginSide);
            node.position = resultPos;
            GameLogMgr_1.default.log("节点", node.name, "界面外坐标为：", resultPos);
            cc.tween(node)
                .delay(delay)
                .to(time, { position: this._moveSideNodePosition[node.uuid].clone() }, { easing: 'quartIn' })
                .start();
        }
        catch (e) {
            node.position = this._moveSideNodePosition[node.uuid].clone();
            GameLogMgr_1.default.log("move In Side 异常", e, node);
        }
    };
    /**
     * 移出画布外, 不能重复调用
     * @param node 动作的节点
     * @param endSide 界面移出的边
     * @param time 动作进行的时间/s
     */
    ActionMgr.moveOutSide = function (node, endSide, time) {
        var _this = this;
        if (endSide === void 0) { endSide = this.TWEEN_FROM_SIDE.TOP; }
        if (time === void 0) { time = 0.5; }
        if (!node) {
            return false;
        }
        if (!this._moveSideNodePosition.hasOwnProperty(node.uuid)) {
            this._moveSideNodePosition[node.uuid] = node.position;
        }
        try {
            var resultPos = this._getSideResultPos(node, endSide);
            cc.tween(node)
                .to(time, { position: resultPos }, { easing: 'quartIn' })
                .call(function () {
                node.position = _this._moveSideNodePosition[node.uuid].clone();
                GameLogMgr_1.default.log('end move out side', node.position);
            })
                .start();
        }
        catch (e) {
            node.position = this._moveSideNodePosition[node.uuid].clone();
            GameLogMgr_1.default.log("move Out Side 异常", e, node);
        }
    };
    ActionMgr._getSideResultPos = function (node, side) {
        //获取屏幕尺寸
        var winSize = cc.winSize;
        var windowHeight = winSize.height;
        var windowWidth = winSize.width;
        GameLogMgr_1.default.log("屏幕尺寸大小为：", windowHeight, windowWidth);
        //根据节点移动方向获取坐标
        var pos;
        switch (side) {
            case ActionMgr.TWEEN_FROM_SIDE.TOP:
                pos = new cc.Vec2(node.x, windowHeight + node.height);
                break;
            case ActionMgr.TWEEN_FROM_SIDE.DOWN:
                pos = new cc.Vec2(node.x, -windowHeight - node.height);
                break;
            case ActionMgr.TWEEN_FROM_SIDE.LEFT:
                pos = new cc.Vec2(-windowWidth - node.width, node.y);
                break;
            case ActionMgr.TWEEN_FROM_SIDE.RIGHT:
                pos = new cc.Vec2(windowWidth + node.width, node.y);
                break;
        }
        return pos;
    };
    /**
     * 左右移动
     * @param node 运动的节点
     * @param direction 运动的方向
     * @param disMove 运动的距离
     * @param timeMove 运动的时间/s
     */
    ActionMgr.moveLeftRight = function (node, direction, disMove, timeMove) {
        try {
            var lessPos = void 0;
            var morePos = void 0;
            switch (direction) {
                case ActionMgr.TWEEN_FROM_SIDE.LEFT:
                case ActionMgr.TWEEN_FROM_SIDE.RIGHT:
                    lessPos = new cc.Vec2(node.x - disMove, node.y);
                    morePos = new cc.Vec2(node.x + disMove, node.y);
                    break;
                case ActionMgr.TWEEN_FROM_SIDE.TOP:
                case ActionMgr.TWEEN_FROM_SIDE.DOWN:
                    lessPos = new cc.Vec2(node.x, node.y - disMove);
                    morePos = new cc.Vec2(node.x, node.y + disMove);
                    break;
            }
            cc.tween(node).repeatForever(cc.sequence(cc.moveTo(timeMove, lessPos), cc.moveTo(timeMove, morePos))).start();
        }
        catch (e) {
            GameLogMgr_1.default.error('moveLeftRight异常', e, node);
        }
    };
    ActionMgr.showGradually = function (node, duration, delay, endOpacity, starOpacity) {
        if (duration === void 0) { duration = 1; }
        if (delay === void 0) { delay = 0; }
        if (endOpacity === void 0) { endOpacity = 255; }
        if (starOpacity === void 0) { starOpacity = 0; }
        try {
            cc.tween(node)
                .call(function () {
                node.opacity = starOpacity;
                node.active = true;
            })
                .delay(delay)
                .to(duration, { opacity: endOpacity })
                .start();
        }
        catch (e) {
            node.opacity = endOpacity;
            GameLogMgr_1.default.error('showGradually异常', e, node);
        }
    };
    ActionMgr.hideGradually = function (node, duration, delay, endOpacity) {
        if (duration === void 0) { duration = 1; }
        if (delay === void 0) { delay = 0; }
        if (endOpacity === void 0) { endOpacity = 50; }
        try {
            node.active = true;
            cc.tween(node)
                .delay(delay)
                .to(duration, { opacity: endOpacity }, { easing: 'quartIn' })
                .call(function () {
                node.active = false;
                node.opacity = 255;
            })
                .start();
        }
        catch (e) {
            node.opacity = endOpacity;
            GameLogMgr_1.default.error('showGradually异常', e, node);
        }
    };
    ActionMgr.TWEEN_FROM_SIDE = {
        TOP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    };
    ActionMgr._moveSideNodePosition = {};
    return ActionMgr;
}());
exports.default = ActionMgr;

cc._RF.pop();