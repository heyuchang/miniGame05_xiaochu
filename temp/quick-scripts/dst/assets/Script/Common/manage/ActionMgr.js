
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/ActionMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQWN0aW9uTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRzs7QUFFSCxJQUFPLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ2hDLDJDQUFtQztBQUVuQyxJQUFPLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBRXhCO0lBQUE7SUE4WUEsQ0FBQztJQTVZRyxRQUFRO0lBQ00sbUJBQVMsR0FBdkIsVUFBd0IsSUFBYTtRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQzthQUNqQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7YUFDbEIsS0FBSyxFQUFFO2FBQ1AsYUFBYSxFQUFFO2FBQ2YsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUdhLG1CQUFTLEdBQXZCLFVBQXdCLElBQWEsRUFBRSxLQUFhLEVBQUUsSUFBVTtRQUFWLHFCQUFBLEVBQUEsVUFBVTtRQUM1RCxJQUFJO1lBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBQyxDQUFDO2lCQUNwRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUM7aUJBQzFCLEtBQUssRUFBRSxDQUFBO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRWEsMkJBQWlCLEdBQS9CLFVBQWdDLElBQWEsRUFBRSxPQUFhLEVBQUUsSUFBUztRQUF4Qix3QkFBQSxFQUFBLGFBQWE7UUFBRSxxQkFBQSxFQUFBLFNBQVM7UUFDbkUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQ3hCLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUN4QyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDNUMsQ0FDSixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxnQkFBTSxHQUFwQixVQUFxQixJQUFhLEVBQUUsUUFBWTtRQUFaLHlCQUFBLEVBQUEsWUFBWTtRQUM1QyxJQUFJO1lBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQ3hCLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQzFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUM3QixDQUNKLENBQUMsS0FBSyxFQUFFLENBQUM7U0FFYjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1Isb0JBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUV6QztJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7O09BU0c7SUFDVyxtQkFBUyxHQUF2QixVQUF3QixJQUFhLEVBQUUsT0FBYSxFQUFFLFFBQWEsRUFBRSxLQUFXLEVBQUUsS0FBUyxFQUFFLFFBQVk7UUFBbEUsd0JBQUEsRUFBQSxhQUFhO1FBQUUseUJBQUEsRUFBQSxhQUFhO1FBQUUsc0JBQUEsRUFBQSxXQUFXO1FBQUUsc0JBQUEsRUFBQSxTQUFTO1FBQUUseUJBQUEsRUFBQSxZQUFZO1FBQ3JHLElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNULGFBQWEsQ0FDVixFQUFFLENBQUMsS0FBSyxFQUFFO2lCQUNMLE1BQU0sQ0FBQyxLQUFLLEVBQ1QsRUFBRSxDQUFDLEtBQUssRUFBRTtpQkFDTCxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQztpQkFDbkQsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUMxRDtpQkFDQSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO2lCQUN2QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQ3ZCO2lCQUNBLEtBQUssRUFBRSxDQUFBO1NBR2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLG9CQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFekM7SUFDTCxDQUFDO0lBRWEsbUJBQVMsR0FBdkIsVUFBd0IsSUFBYSxFQUFFLE9BQWEsRUFBRSxRQUFxQixFQUFFLEtBQWlCO1FBQXZELHdCQUFBLEVBQUEsYUFBYTtRQUFFLHlCQUFBLEVBQUEsYUFBcUI7UUFBRSxzQkFBQSxFQUFBLFNBQWlCO1FBQzFGLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1QsTUFBTSxDQUFDLEtBQUssRUFDVCxFQUFFLENBQUMsS0FBSyxFQUFFO2FBQ0wsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBQyxDQUFDO2FBQy9CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FDdEMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLDBCQUFnQixHQUE5QixVQUErQixJQUFhLEVBQUUsUUFBWSxFQUFFLFFBQWE7UUFBM0IseUJBQUEsRUFBQSxZQUFZO1FBQUUseUJBQUEsRUFBQSxhQUFhO1FBQ3JFLElBQUk7WUFDQSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FDeEIsRUFBRSxDQUFDLFFBQVEsQ0FDUCxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUNoQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FDbEMsQ0FDSixDQUFDLEtBQUssRUFBRSxDQUFDO1NBRWI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLG9CQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFekM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNXLG1CQUFTLEdBQXZCLFVBQXdCLElBQWEsRUFBRSxPQUFhLEVBQUUsUUFBYSxFQUFFLFFBQWEsRUFBRSxVQUFjO1FBQTNELHdCQUFBLEVBQUEsYUFBYTtRQUFFLHlCQUFBLEVBQUEsYUFBYTtRQUFFLHlCQUFBLEVBQUEsYUFBYTtRQUFFLDJCQUFBLEVBQUEsY0FBYztRQUM5RixJQUFJO1lBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsYUFBYSxDQUNWLEVBQUUsQ0FBQyxLQUFLLEVBQUU7aUJBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDZixNQUFNLENBQUMsVUFBVSxFQUNkLEVBQUUsQ0FBQyxLQUFLLEVBQUU7aUJBQ0wsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBQyxDQUFDO2lCQUMvQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQ3RDO2lCQUNBLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FDL0I7aUJBQ0EsS0FBSyxFQUFFLENBQUE7U0FFZjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBRVIsb0JBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFYSxtQkFBUyxHQUF2QixVQUF3QixJQUFhLEVBQUUsU0FBcUIsRUFBRSxXQUF1QjtRQUE5QywwQkFBQSxFQUFBLGFBQXFCO1FBQUUsNEJBQUEsRUFBQSxlQUF1QjtRQUNqRixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNULGFBQWEsQ0FDVixFQUFFLENBQUMsS0FBSyxFQUFFO2FBQ0wsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNoQixNQUFNLENBQUMsV0FBVyxFQUNmLEVBQUUsQ0FBQyxLQUFLLEVBQUU7YUFDTCxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDO2FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7YUFDakIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQzthQUNyQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQ3pCO1FBQ0wsdUJBQXVCO1FBQ3ZCLGlCQUFpQjtRQUNqQixJQUFJO1NBQ1A7YUFDQSxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG1CQUFTLEdBQXZCLFVBQXdCLElBQWEsRUFBRSxRQUFjO1FBQWQseUJBQUEsRUFBQSxjQUFjO1FBQ2pELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUk7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNULEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0QyxLQUFLLEVBQUUsQ0FBQztTQUVoQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixvQkFBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXZDO0lBQ0wsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ1csZ0JBQU0sR0FBcEIsVUFBcUIsSUFBYSxFQUFFLFFBQXNCLEVBQUUsU0FBcUI7UUFBN0MseUJBQUEsRUFBQSxjQUFzQjtRQUFFLDBCQUFBLEVBQUEsYUFBcUI7UUFDN0UsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVCxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDO2FBQzdDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNXLGlCQUFPLEdBQXJCLFVBQXNCLElBQWEsRUFBRSxJQUFrQjtRQUFsQixxQkFBQSxFQUFBLFVBQWtCO1FBQ25ELElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVCxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDO2FBQ25DLEtBQUssRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLGlCQUFPLEdBQXJCLFVBQXNCLElBQWEsRUFBRSxRQUFjLEVBQUUsUUFBWTtRQUE1Qix5QkFBQSxFQUFBLGNBQWM7UUFBRSx5QkFBQSxFQUFBLFlBQVk7UUFDN0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSTtZQUNBLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQztpQkFDL0IsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2Ysb0JBQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFXRDs7Ozs7O09BTUc7SUFDVyxvQkFBVSxHQUF4QixVQUF5QixJQUFhLEVBQUUsU0FBb0MsRUFBRSxJQUFVLEVBQUUsS0FBUztRQUEzRCwwQkFBQSxFQUFBLFlBQVksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHO1FBQUUscUJBQUEsRUFBQSxVQUFVO1FBQUUsc0JBQUEsRUFBQSxTQUFTO1FBQy9GLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakU7UUFDRCxJQUFJO1lBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUMxQixvQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsQ0FBQztpQkFDeEYsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5RCxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0M7SUFFTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxxQkFBVyxHQUF6QixVQUEwQixJQUFhLEVBQUUsT0FBa0MsRUFBRSxJQUFVO1FBQXZGLGlCQXFCQztRQXJCd0Msd0JBQUEsRUFBQSxVQUFVLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztRQUFFLHFCQUFBLEVBQUEsVUFBVTtRQUNuRixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3pEO1FBQ0QsSUFBSTtZQUNBLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsQ0FBQztpQkFDcEQsSUFBSSxDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUQsb0JBQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQztpQkFDRCxLQUFLLEVBQUUsQ0FBQztTQUNoQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlELG9CQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QztJQUVMLENBQUM7SUFFYywyQkFBaUIsR0FBaEMsVUFBaUMsSUFBYSxFQUFFLElBQUk7UUFDaEQsUUFBUTtRQUNSLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDekIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2hDLG9CQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkQsY0FBYztRQUNkLElBQUksR0FBRyxDQUFDO1FBQ1IsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRztnQkFDOUIsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSTtnQkFDL0IsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJO2dCQUMvQixHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUs7Z0JBQ2hDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1NBQ2I7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyx1QkFBYSxHQUEzQixVQUE0QixJQUFhLEVBQUUsU0FBUyxFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUNuRixJQUFJO1lBQ0EsSUFBSSxPQUFPLFNBQUEsQ0FBQztZQUNaLElBQUksT0FBTyxTQUFBLENBQUM7WUFDWixRQUFRLFNBQVMsRUFBRTtnQkFDZixLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSztvQkFDaEMsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxNQUFNO2dCQUNWLEtBQUssU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLEtBQUssU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJO29CQUMvQixPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7b0JBQ2hELE1BQU07YUFDYjtZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUN4QixFQUFFLENBQUMsUUFBUSxDQUNQLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUM1QixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FDL0IsQ0FDSixDQUFDLEtBQUssRUFBRSxDQUFDO1NBRWI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLG9CQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFYSx1QkFBYSxHQUEzQixVQUE0QixJQUFhLEVBQUUsUUFBWSxFQUFFLEtBQVMsRUFBRSxVQUFnQixFQUFFLFdBQWU7UUFBMUQseUJBQUEsRUFBQSxZQUFZO1FBQUUsc0JBQUEsRUFBQSxTQUFTO1FBQUUsMkJBQUEsRUFBQSxnQkFBZ0I7UUFBRSw0QkFBQSxFQUFBLGVBQWU7UUFDakcsSUFBSTtZQUNBLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNULElBQUksQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ1osRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQztpQkFDbkMsS0FBSyxFQUFFLENBQUE7U0FDZjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDMUIsb0JBQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVhLHVCQUFhLEdBQTNCLFVBQTRCLElBQWEsRUFBRSxRQUFZLEVBQUUsS0FBUyxFQUFFLFVBQWU7UUFBeEMseUJBQUEsRUFBQSxZQUFZO1FBQUUsc0JBQUEsRUFBQSxTQUFTO1FBQUUsMkJBQUEsRUFBQSxlQUFlO1FBQy9FLElBQUk7WUFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDVCxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLENBQUM7aUJBQ3hELElBQUksQ0FBQztnQkFDRixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDdkIsQ0FBQyxDQUFDO2lCQUNELEtBQUssRUFBRSxDQUFBO1NBRWY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQzFCLG9CQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUEvSmEseUJBQWUsR0FBRztRQUM1QixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsQ0FBQztLQUNYLENBQUM7SUFFYSwrQkFBcUIsR0FBRyxFQUFFLENBQUM7SUF5SjlDLGdCQUFDO0NBOVlELEFBOFlDLElBQUE7a0JBOVlvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWKqOeUu+aViOaenOexu1xyXG4gKi9cclxuXHJcbmltcG9ydCBlYXNlSW5PdXQgPSBjYy5lYXNlSW5PdXQ7XHJcbmltcG9ydCBHYW1lTG9nIGZyb20gXCIuL0dhbWVMb2dNZ3JcIjtcclxuaW1wb3J0IFR3ZWVuID0gY2MuVHdlZW47XHJcbmltcG9ydCB0d2VlbiA9IGNjLnR3ZWVuO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uTWdyIHtcclxuXHJcbiAgICAvL+eWr+eLguaKluWKqOaJi+aMh1xyXG4gICAgcHVibGljIHN0YXRpYyBzaGFrZUhhbmQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC5ieSgwLjA1LCB7eTogMjB9KVxyXG4gICAgICAgICAgICAuYnkoMC4wNSwge3k6IC0yMH0pXHJcbiAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZU5vZGUobm9kZTogY2MuTm9kZSwgc2NhbGU6IG51bWJlciwgdGltZSA9IDAuNSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAudG8oMCwge3NjYWxlOiBzY2FsZSwgeTogLW5vZGUuaGVpZ2h0ICogKDEgLSBzY2FsZSl9KVxyXG4gICAgICAgICAgICAgICAgLnRvKHRpbWUsIHtzY2FsZTogMSwgeTogMH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKCdzaGFrZeWKqOeUu+W8guW4uCcsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVVcERvd25Gb3JldmVyKG5vZGU6IGNjLk5vZGUsIHJ1blRpbWUgPSAwLjIsIGRpZmYgPSAxMCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KHJ1blRpbWUsIG5ldyBjYy5WZWMyKDAsIGRpZmYpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShydW5UaW1lLCBuZXcgY2MuVmVjMigwLCAtZGlmZikpLFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peL6L2s6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlKG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgMTgwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgMzYwKSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+5aSn57yp5bCPIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gdGltZVJ1blxyXG4gICAgICogQHBhcmFtIHRpbWVTdG9wXHJcbiAgICAgKiBAcGFyYW0gc2NhbGVcclxuICAgICAqIEBwYXJhbSBjb3VudFxyXG4gICAgICogQHBhcmFtIGVuZFNjYWxlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZVN0b3Aobm9kZTogY2MuTm9kZSwgdGltZVJ1biA9IDAuMSwgdGltZVN0b3AgPSAxMCwgc2NhbGUgPSAwLjMsIGNvdW50ID0gMSwgZW5kU2NhbGUgPSAxKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IGVuZFNjYWxlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwZWF0KGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byh0aW1lUnVuLCB7c2NhbGU6IDEgKyBzY2FsZX0sIHtlYXNpbmc6IFwic21vb3RoXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byh0aW1lUnVuLCB7c2NhbGU6IGVuZFNjYWxlfSwge2Vhc2luZzogXCJzbW9vdGhcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogMH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lU3RvcClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcblxyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaGFrZU5vZGUobm9kZTogY2MuTm9kZSwgdGltZVJ1biA9IDAuMywgZHN0QW5nbGU6IG51bWJlciA9IDEwLCBjb3VudDogbnVtYmVyID0gNSkge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC5yZXBlYXQoY291bnQsXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogLWRzdEFuZ2xlfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8odGltZVJ1biwge2FuZ2xlOiBkc3RBbmdsZX0pXHJcbiAgICAgICAgICAgICkudG8odGltZVJ1biwge2FuZ2xlOiAwfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRh+WKqG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSBkc3RBbmdsZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hha2VOb2RlRm9yZXZlcihub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbiA9IDQsIGRzdEFuZ2xlID0gMTApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24sIC1kc3RBbmdsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24sIGRzdEFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub2Rl5pmD5Yqo5ZCO5YGc5q2i77yM5LiA5q615pe26Ze05ZCO57un57ut5pmD5YqoXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDliqjkvZznmoToioLngrlcclxuICAgICAqIEBwYXJhbSB0aW1lUnVuIOWNleasoeaZg+WKqOWIsOW3puWPs+S7u+S4gOi+ueeahOaXtumXtFxyXG4gICAgICogQHBhcmFtIHRpbWVTdG9wIOWBnOatoueahOaXtumXtFxyXG4gICAgICogQHBhcmFtIGRzdEFuZ2xlIOaZg+WKqOeahOinkuW6plxyXG4gICAgICogQHBhcmFtIHNoYWtlQ291bnQg5pmD5Yqo55qE5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hha2VTdG9wKG5vZGU6IGNjLk5vZGUsIHRpbWVSdW4gPSAwLjEsIHRpbWVTdG9wID0gMTAsIGRzdEFuZ2xlID0gMTAsIHNoYWtlQ291bnQgPSA1KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KHRpbWVTdG9wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwZWF0KHNoYWtlQ291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogLWRzdEFuZ2xlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8odGltZVJ1biwge2FuZ2xlOiBkc3RBbmdsZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogMH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaGFrZVN0b3DlvILluLgnLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZU1vdmUobm9kZTogY2MuTm9kZSwgZGVsYXlUaW1lOiBudW1iZXIgPSAzLCByZXBlYXRDb3VudDogbnVtYmVyID0gMiwpIHtcclxuICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoZGVsYXlUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBlYXQocmVwZWF0Q291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjMsIHtzY2FsZTogMS4xfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLCB7c2NhbGU6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMywge3NjYWxlOiAxLjJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAsIHtzY2FsZTogMX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8gLnJlcGVhdChyZXBlYXRDb3VudCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAvLyApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLnvKnmlL7ov5vlhaVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlQmlnSW4obm9kZTogY2MuTm9kZSwgZHVyYXRpb24gPSAwLjMpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMjtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiAxfSwgZWFzZUluT3V0KDEpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ21vdmVJbiDlvILluLgnLCBlLCBub2RlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdoue8qeaUvui/m+WFpVxyXG4gICAgICogQHBhcmFtIG5vZGVcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIGJlZ2luU2FsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVJbihub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbjogbnVtYmVyID0gMC40LCBiZWdpblNhbGU6IG51bWJlciA9IDApIHtcclxuICAgICAgICBub2RlLnNjYWxlID0gYmVnaW5TYWxlO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiAxfSwge2Vhc2luZzogJ2JhY2tPdXQnfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLku47kuIrmjqjkuItcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9wKG5vZGU6IGNjLk5vZGUsIHRpbWU6IG51bWJlciA9IDAuNCkge1xyXG4gICAgICAgIG5vZGUueSA9IG5vZGUuaGVpZ2h0IC8gMjtcclxuICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAudG8odGltZSx7eTogMH0sIHtlYXNpbmc6IFwic21vb3RoXCJ9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i57yp5pS+6YCA5Ye6XHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZW5kU2NhbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlT3V0KG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMC40LCBlbmRTY2FsZSA9IDApIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiBlbmRTY2FsZX0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdtb3ZlT3V0IOW8guW4uCcsIGUsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFRXRUVOX0ZST01fU0lERSA9IHtcclxuICAgICAgICBUT1A6IDEsXHJcbiAgICAgICAgRE9XTjogMixcclxuICAgICAgICBMRUZUOiAzLFxyXG4gICAgICAgIFJJR0hUOiA0XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9tb3ZlU2lkZU5vZGVQb3NpdGlvbiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO55S75biD5aSW6L+b5YWlLCDkuI3og73ph43lpI3osIPnlKhcclxuICAgICAqIEBwYXJhbSBub2RlIOWKqOS9nOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGJlZ2luU2lkZSDnlYzpnaLov5vlhaXnmoTovrlcclxuICAgICAqIEBwYXJhbSB0aW1lIOWKqOS9nOi/m+ihjOeahOaXtumXtC9zXHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5Yqo5L2c5bu26L+f6L+b6KGM55qE5pe26Ze0L3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlSW5TaWRlKG5vZGU6IGNjLk5vZGUsIGJlZ2luU2lkZSA9IHRoaXMuVFdFRU5fRlJPTV9TSURFLlRPUCwgdGltZSA9IDAuNSwgZGVsYXkgPSAwKSB7XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb3ZlU2lkZU5vZGVQb3NpdGlvbi5oYXNPd25Qcm9wZXJ0eShub2RlLnV1aWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0gPSBub2RlLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRQb3MgPSB0aGlzLl9nZXRTaWRlUmVzdWx0UG9zKG5vZGUsIGJlZ2luU2lkZSk7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSByZXN1bHRQb3M7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKFwi6IqC54K5XCIsIG5vZGUubmFtZSwgXCLnlYzpnaLlpJblnZDmoIfkuLrvvJpcIiwgcmVzdWx0UG9zKTtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5kZWxheShkZWxheSlcclxuICAgICAgICAgICAgICAgIC50byh0aW1lLCB7cG9zaXRpb246IHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0uY2xvbmUoKX0sIHtlYXNpbmc6ICdxdWFydEluJ30pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSB0aGlzLl9tb3ZlU2lkZU5vZGVQb3NpdGlvbltub2RlLnV1aWRdLmNsb25lKCk7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKFwibW92ZSBJbiBTaWRlIOW8guW4uFwiLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Ye655S75biD5aSWLCDkuI3og73ph43lpI3osIPnlKhcclxuICAgICAqIEBwYXJhbSBub2RlIOWKqOS9nOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGVuZFNpZGUg55WM6Z2i56e75Ye655qE6L65XHJcbiAgICAgKiBAcGFyYW0gdGltZSDliqjkvZzov5vooYznmoTml7bpl7Qvc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVPdXRTaWRlKG5vZGU6IGNjLk5vZGUsIGVuZFNpZGUgPSB0aGlzLlRXRUVOX0ZST01fU0lERS5UT1AsIHRpbWUgPSAwLjUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uLmhhc093blByb3BlcnR5KG5vZGUudXVpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVNpZGVOb2RlUG9zaXRpb25bbm9kZS51dWlkXSA9IG5vZGUucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRQb3MgPSB0aGlzLl9nZXRTaWRlUmVzdWx0UG9zKG5vZGUsIGVuZFNpZGUpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKHRpbWUsIHtwb3NpdGlvbjogcmVzdWx0UG9zfSwge2Vhc2luZzogJ3F1YXJ0SW4nfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gdGhpcy5fbW92ZVNpZGVOb2RlUG9zaXRpb25bbm9kZS51dWlkXS5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2cubG9nKCdlbmQgbW92ZSBvdXQgc2lkZScsIG5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0uY2xvbmUoKTtcclxuICAgICAgICAgICAgR2FtZUxvZy5sb2coXCJtb3ZlIE91dCBTaWRlIOW8guW4uFwiLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9nZXRTaWRlUmVzdWx0UG9zKG5vZGU6IGNjLk5vZGUsIHNpZGUpIHtcclxuICAgICAgICAvL+iOt+WPluWxj+W5leWwuuWvuFxyXG4gICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luU2l6ZS53aWR0aDtcclxuICAgICAgICBHYW1lTG9nLmxvZyhcIuWxj+W5leWwuuWvuOWkp+Wwj+S4uu+8mlwiLCB3aW5kb3dIZWlnaHQsIHdpbmRvd1dpZHRoKTtcclxuICAgICAgICAvL+agueaNruiKgueCueenu+WKqOaWueWQkeiOt+WPluWdkOagh1xyXG4gICAgICAgIGxldCBwb3M7XHJcbiAgICAgICAgc3dpdGNoIChzaWRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5UT1A6XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIHdpbmRvd0hlaWdodCArIG5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvbk1nci5UV0VFTl9GUk9NX1NJREUuRE9XTjpcclxuICAgICAgICAgICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKG5vZGUueCwgLXdpbmRvd0hlaWdodCAtIG5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvbk1nci5UV0VFTl9GUk9NX1NJREUuTEVGVDpcclxuICAgICAgICAgICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKC13aW5kb3dXaWR0aCAtIG5vZGUud2lkdGgsIG5vZGUueSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgcG9zID0gbmV3IGNjLlZlYzIod2luZG93V2lkdGggKyBub2RlLndpZHRoLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blj7Pnp7vliqhcclxuICAgICAqIEBwYXJhbSBub2RlIOi/kOWKqOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGRpcmVjdGlvbiDov5DliqjnmoTmlrnlkJFcclxuICAgICAqIEBwYXJhbSBkaXNNb3ZlIOi/kOWKqOeahOi3neemu1xyXG4gICAgICogQHBhcmFtIHRpbWVNb3ZlIOi/kOWKqOeahOaXtumXtC9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUxlZnRSaWdodChub2RlOiBjYy5Ob2RlLCBkaXJlY3Rpb24sIGRpc01vdmU6IG51bWJlciwgdGltZU1vdmU6IG51bWJlcikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBsZXNzUG9zO1xyXG4gICAgICAgICAgICBsZXQgbW9yZVBvcztcclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5MRUZUOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIGxlc3NQb3MgPSBuZXcgY2MuVmVjMihub2RlLnggLSBkaXNNb3ZlLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVQb3MgPSBuZXcgY2MuVmVjMihub2RlLnggKyBkaXNNb3ZlLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlRPUDpcclxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5ET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgIGxlc3NQb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIG5vZGUueSAtIGRpc01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVQb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIG5vZGUueSArIGRpc01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odGltZU1vdmUsIGxlc3NQb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0aW1lTW92ZSwgbW9yZVBvcylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ21vdmVMZWZ0UmlnaHTlvILluLgnLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaG93R3JhZHVhbGx5KG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMSwgZGVsYXkgPSAwLCBlbmRPcGFjaXR5ID0gMjU1LCBzdGFyT3BhY2l0eSA9IDApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IHN0YXJPcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoZGVsYXkpXHJcbiAgICAgICAgICAgICAgICAudG8oZHVyYXRpb24sIHtvcGFjaXR5OiBlbmRPcGFjaXR5fSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSBlbmRPcGFjaXR5O1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaG93R3JhZHVhbGx55byC5bi4JywgZSwgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaGlkZUdyYWR1YWxseShub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbiA9IDEsIGRlbGF5ID0gMCwgZW5kT3BhY2l0eSA9IDUwKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgLnRvKGR1cmF0aW9uLCB7b3BhY2l0eTogZW5kT3BhY2l0eX0sIHtlYXNpbmc6ICdxdWFydEluJ30pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSBlbmRPcGFjaXR5O1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaG93R3JhZHVhbGx55byC5bi4JywgZSwgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==