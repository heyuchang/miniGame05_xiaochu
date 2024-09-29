
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Common/Constant');
require('./assets/Script/Common/Global');
require('./assets/Script/Common/LogMgr');
require('./assets/Script/Common/ShowConfig');
require('./assets/Script/Common/Test');
require('./assets/Script/Common/Tools');
require('./assets/Script/Common/manage/ActionMgr');
require('./assets/Script/Common/manage/Api/QgApi');
require('./assets/Script/Common/manage/Api/QgBanner');
require('./assets/Script/Common/manage/Api/QgIntersAd');
require('./assets/Script/Common/manage/Api/QgNative');
require('./assets/Script/Common/manage/Api/QgRewardedAd');
require('./assets/Script/Common/manage/AudioMgr');
require('./assets/Script/Common/manage/CacheMgr');
require('./assets/Script/Common/manage/Emit/Emit');
require('./assets/Script/Common/manage/Emit/EmitBase');
require('./assets/Script/Common/manage/Emit/EmitData');
require('./assets/Script/Common/manage/GameLogMgr');
require('./assets/Script/Common/manage/Layer/LayerMgr');
require('./assets/Script/Common/manage/Layer/LayerPanel');
require('./assets/Script/Common/manage/Layer/LayerUI');
require('./assets/Script/Common/manage/LoadMgr');
require('./assets/Script/Common/manage/PanelMgr');
require('./assets/Script/Common/manage/PondMgr');
require('./assets/Script/Common/manage/StorageMgr');
require('./assets/Script/Common/manage/TimerMgr');
require('./assets/Script/Moudle/View/EndView');
require('./assets/Script/Moudle/View/GameInfoView');
require('./assets/Script/Moudle/View/GameView');
require('./assets/Script/Moudle/View/HomeView');
require('./assets/Script/Moudle/View/NativeView');
require('./assets/Script/Moudle/View/ShortageView');
require('./assets/Script/Moudle/View/logic/common/config');
require('./assets/Script/Moudle/View/logic/common/text');
require('./assets/Script/Moudle/View/logic/game/shop');
require('./assets/Script/Moudle/View/logic/game/sign');
require('./assets/Script/SDK/JiuWuSDK');
require('./assets/Script/Scene/Game');
require('./assets/Script/Scene/Loading');

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
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQWN0aW9uTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRzs7QUFFSCxJQUFPLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ2hDLDJDQUFtQztBQUVuQyxJQUFPLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBRXhCO0lBQUE7SUE4WUEsQ0FBQztJQTVZRyxRQUFRO0lBQ00sbUJBQVMsR0FBdkIsVUFBd0IsSUFBYTtRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQzthQUNqQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7YUFDbEIsS0FBSyxFQUFFO2FBQ1AsYUFBYSxFQUFFO2FBQ2YsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUdhLG1CQUFTLEdBQXZCLFVBQXdCLElBQWEsRUFBRSxLQUFhLEVBQUUsSUFBVTtRQUFWLHFCQUFBLEVBQUEsVUFBVTtRQUM1RCxJQUFJO1lBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1QsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBQyxDQUFDO2lCQUNwRCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUM7aUJBQzFCLEtBQUssRUFBRSxDQUFBO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsR0FB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cEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDdkIsQ0FBQyxDQUFDO2lCQUNELEtBQUssRUFBRSxDQUFBO1NBRWY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQzFCLG9CQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUEvSmEseUJBQWUsR0FBRztRQUM1QixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7UUFDUCxLQUFLLEVBQUUsQ0FBQztLQUNYLENBQUM7SUFFYSwrQkFBcUIsR0FBRyxFQUFFLENBQUM7SUF5SjlDLGdCQUFDO0NBOVlELEFBOFlDLElBQUE7a0JBOVlvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWKqOeUu+aViOaenOexu1xyXG4gKi9cclxuXHJcbmltcG9ydCBlYXNlSW5PdXQgPSBjYy5lYXNlSW5PdXQ7XHJcbmltcG9ydCBHYW1lTG9nIGZyb20gXCIuL0dhbWVMb2dNZ3JcIjtcclxuaW1wb3J0IFR3ZWVuID0gY2MuVHdlZW47XHJcbmltcG9ydCB0d2VlbiA9IGNjLnR3ZWVuO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uTWdyIHtcclxuXHJcbiAgICAvL+eWr+eLguaKluWKqOaJi+aMh1xyXG4gICAgcHVibGljIHN0YXRpYyBzaGFrZUhhbmQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC5ieSgwLjA1LCB7eTogMjB9KVxyXG4gICAgICAgICAgICAuYnkoMC4wNSwge3k6IC0yMH0pXHJcbiAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKClcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZU5vZGUobm9kZTogY2MuTm9kZSwgc2NhbGU6IG51bWJlciwgdGltZSA9IDAuNSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAudG8oMCwge3NjYWxlOiBzY2FsZSwgeTogLW5vZGUuaGVpZ2h0ICogKDEgLSBzY2FsZSl9KVxyXG4gICAgICAgICAgICAgICAgLnRvKHRpbWUsIHtzY2FsZTogMSwgeTogMH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKCdzaGFrZeWKqOeUu+W8guW4uCcsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVVcERvd25Gb3JldmVyKG5vZGU6IGNjLk5vZGUsIHJ1blRpbWUgPSAwLjIsIGRpZmYgPSAxMCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KHJ1blRpbWUsIG5ldyBjYy5WZWMyKDAsIGRpZmYpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShydW5UaW1lLCBuZXcgY2MuVmVjMigwLCAtZGlmZikpLFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peL6L2s6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRlKG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgMTgwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwgMzYwKSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+5aSn57yp5bCPIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gdGltZVJ1blxyXG4gICAgICogQHBhcmFtIHRpbWVTdG9wXHJcbiAgICAgKiBAcGFyYW0gc2NhbGVcclxuICAgICAqIEBwYXJhbSBjb3VudFxyXG4gICAgICogQHBhcmFtIGVuZFNjYWxlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZVN0b3Aobm9kZTogY2MuTm9kZSwgdGltZVJ1biA9IDAuMSwgdGltZVN0b3AgPSAxMCwgc2NhbGUgPSAwLjMsIGNvdW50ID0gMSwgZW5kU2NhbGUgPSAxKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IGVuZFNjYWxlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwZWF0KGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byh0aW1lUnVuLCB7c2NhbGU6IDEgKyBzY2FsZX0sIHtlYXNpbmc6IFwic21vb3RoXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byh0aW1lUnVuLCB7c2NhbGU6IGVuZFNjYWxlfSwge2Vhc2luZzogXCJzbW9vdGhcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogMH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lU3RvcClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcblxyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaGFrZU5vZGUobm9kZTogY2MuTm9kZSwgdGltZVJ1biA9IDAuMywgZHN0QW5nbGU6IG51bWJlciA9IDEwLCBjb3VudDogbnVtYmVyID0gNSkge1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC5yZXBlYXQoY291bnQsXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogLWRzdEFuZ2xlfSlcclxuICAgICAgICAgICAgICAgICAgICAudG8odGltZVJ1biwge2FuZ2xlOiBkc3RBbmdsZX0pXHJcbiAgICAgICAgICAgICkudG8odGltZVJ1biwge2FuZ2xlOiAwfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRh+WKqG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSBkc3RBbmdsZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hha2VOb2RlRm9yZXZlcihub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbiA9IDQsIGRzdEFuZ2xlID0gMTApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKS5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24sIC1kc3RBbmdsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24sIGRzdEFuZ2xlKSxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NoYWtlTm9kZeW8guW4uCcsIGUsIG5vZGUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub2Rl5pmD5Yqo5ZCO5YGc5q2i77yM5LiA5q615pe26Ze05ZCO57un57ut5pmD5YqoXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDliqjkvZznmoToioLngrlcclxuICAgICAqIEBwYXJhbSB0aW1lUnVuIOWNleasoeaZg+WKqOWIsOW3puWPs+S7u+S4gOi+ueeahOaXtumXtFxyXG4gICAgICogQHBhcmFtIHRpbWVTdG9wIOWBnOatoueahOaXtumXtFxyXG4gICAgICogQHBhcmFtIGRzdEFuZ2xlIOaZg+WKqOeahOinkuW6plxyXG4gICAgICogQHBhcmFtIHNoYWtlQ291bnQg5pmD5Yqo55qE5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hha2VTdG9wKG5vZGU6IGNjLk5vZGUsIHRpbWVSdW4gPSAwLjEsIHRpbWVTdG9wID0gMTAsIGRzdEFuZ2xlID0gMTAsIHNoYWtlQ291bnQgPSA1KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KHRpbWVTdG9wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwZWF0KHNoYWtlQ291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogLWRzdEFuZ2xlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8odGltZVJ1biwge2FuZ2xlOiBkc3RBbmdsZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVSdW4sIHthbmdsZTogMH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaGFrZVN0b3DlvILluLgnLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZU1vdmUobm9kZTogY2MuTm9kZSwgZGVsYXlUaW1lOiBudW1iZXIgPSAzLCByZXBlYXRDb3VudDogbnVtYmVyID0gMiwpIHtcclxuICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoZGVsYXlUaW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBlYXQocmVwZWF0Q291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjMsIHtzY2FsZTogMS4xfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLCB7c2NhbGU6IDF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMywge3NjYWxlOiAxLjJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAsIHtzY2FsZTogMX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8gLnJlcGVhdChyZXBlYXRDb3VudCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgICAgICAvLyApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLnvKnmlL7ov5vlhaVcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlQmlnSW4obm9kZTogY2MuTm9kZSwgZHVyYXRpb24gPSAwLjMpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMjtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiAxfSwgZWFzZUluT3V0KDEpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ21vdmVJbiDlvILluLgnLCBlLCBub2RlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdoue8qeaUvui/m+WFpVxyXG4gICAgICogQHBhcmFtIG5vZGVcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIGJlZ2luU2FsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVJbihub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbjogbnVtYmVyID0gMC40LCBiZWdpblNhbGU6IG51bWJlciA9IDApIHtcclxuICAgICAgICBub2RlLnNjYWxlID0gYmVnaW5TYWxlO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiAxfSwge2Vhc2luZzogJ2JhY2tPdXQnfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLku47kuIrmjqjkuItcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9wKG5vZGU6IGNjLk5vZGUsIHRpbWU6IG51bWJlciA9IDAuNCkge1xyXG4gICAgICAgIG5vZGUueSA9IG5vZGUuaGVpZ2h0IC8gMjtcclxuICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAudG8odGltZSx7eTogMH0sIHtlYXNpbmc6IFwic21vb3RoXCJ9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i57yp5pS+6YCA5Ye6XHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZW5kU2NhbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlT3V0KG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMC40LCBlbmRTY2FsZSA9IDApIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC50byhkdXJhdGlvbiwge3NjYWxlOiBlbmRTY2FsZX0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdtb3ZlT3V0IOW8guW4uCcsIGUsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFRXRUVOX0ZST01fU0lERSA9IHtcclxuICAgICAgICBUT1A6IDEsXHJcbiAgICAgICAgRE9XTjogMixcclxuICAgICAgICBMRUZUOiAzLFxyXG4gICAgICAgIFJJR0hUOiA0XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9tb3ZlU2lkZU5vZGVQb3NpdGlvbiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO55S75biD5aSW6L+b5YWlLCDkuI3og73ph43lpI3osIPnlKhcclxuICAgICAqIEBwYXJhbSBub2RlIOWKqOS9nOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGJlZ2luU2lkZSDnlYzpnaLov5vlhaXnmoTovrlcclxuICAgICAqIEBwYXJhbSB0aW1lIOWKqOS9nOi/m+ihjOeahOaXtumXtC9zXHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5Yqo5L2c5bu26L+f6L+b6KGM55qE5pe26Ze0L3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlSW5TaWRlKG5vZGU6IGNjLk5vZGUsIGJlZ2luU2lkZSA9IHRoaXMuVFdFRU5fRlJPTV9TSURFLlRPUCwgdGltZSA9IDAuNSwgZGVsYXkgPSAwKSB7XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb3ZlU2lkZU5vZGVQb3NpdGlvbi5oYXNPd25Qcm9wZXJ0eShub2RlLnV1aWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0gPSBub2RlLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRQb3MgPSB0aGlzLl9nZXRTaWRlUmVzdWx0UG9zKG5vZGUsIGJlZ2luU2lkZSk7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSByZXN1bHRQb3M7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKFwi6IqC54K5XCIsIG5vZGUubmFtZSwgXCLnlYzpnaLlpJblnZDmoIfkuLrvvJpcIiwgcmVzdWx0UG9zKTtcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5kZWxheShkZWxheSlcclxuICAgICAgICAgICAgICAgIC50byh0aW1lLCB7cG9zaXRpb246IHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0uY2xvbmUoKX0sIHtlYXNpbmc6ICdxdWFydEluJ30pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSB0aGlzLl9tb3ZlU2lkZU5vZGVQb3NpdGlvbltub2RlLnV1aWRdLmNsb25lKCk7XHJcbiAgICAgICAgICAgIEdhbWVMb2cubG9nKFwibW92ZSBJbiBTaWRlIOW8guW4uFwiLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Ye655S75biD5aSWLCDkuI3og73ph43lpI3osIPnlKhcclxuICAgICAqIEBwYXJhbSBub2RlIOWKqOS9nOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGVuZFNpZGUg55WM6Z2i56e75Ye655qE6L65XHJcbiAgICAgKiBAcGFyYW0gdGltZSDliqjkvZzov5vooYznmoTml7bpl7Qvc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVPdXRTaWRlKG5vZGU6IGNjLk5vZGUsIGVuZFNpZGUgPSB0aGlzLlRXRUVOX0ZST01fU0lERS5UT1AsIHRpbWUgPSAwLjUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uLmhhc093blByb3BlcnR5KG5vZGUudXVpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVNpZGVOb2RlUG9zaXRpb25bbm9kZS51dWlkXSA9IG5vZGUucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRQb3MgPSB0aGlzLl9nZXRTaWRlUmVzdWx0UG9zKG5vZGUsIGVuZFNpZGUpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKHRpbWUsIHtwb3NpdGlvbjogcmVzdWx0UG9zfSwge2Vhc2luZzogJ3F1YXJ0SW4nfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gdGhpcy5fbW92ZVNpZGVOb2RlUG9zaXRpb25bbm9kZS51dWlkXS5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2cubG9nKCdlbmQgbW92ZSBvdXQgc2lkZScsIG5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHRoaXMuX21vdmVTaWRlTm9kZVBvc2l0aW9uW25vZGUudXVpZF0uY2xvbmUoKTtcclxuICAgICAgICAgICAgR2FtZUxvZy5sb2coXCJtb3ZlIE91dCBTaWRlIOW8guW4uFwiLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9nZXRTaWRlUmVzdWx0UG9zKG5vZGU6IGNjLk5vZGUsIHNpZGUpIHtcclxuICAgICAgICAvL+iOt+WPluWxj+W5leWwuuWvuFxyXG4gICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luU2l6ZS53aWR0aDtcclxuICAgICAgICBHYW1lTG9nLmxvZyhcIuWxj+W5leWwuuWvuOWkp+Wwj+S4uu+8mlwiLCB3aW5kb3dIZWlnaHQsIHdpbmRvd1dpZHRoKTtcclxuICAgICAgICAvL+agueaNruiKgueCueenu+WKqOaWueWQkeiOt+WPluWdkOagh1xyXG4gICAgICAgIGxldCBwb3M7XHJcbiAgICAgICAgc3dpdGNoIChzaWRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5UT1A6XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIHdpbmRvd0hlaWdodCArIG5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvbk1nci5UV0VFTl9GUk9NX1NJREUuRE9XTjpcclxuICAgICAgICAgICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKG5vZGUueCwgLXdpbmRvd0hlaWdodCAtIG5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvbk1nci5UV0VFTl9GUk9NX1NJREUuTEVGVDpcclxuICAgICAgICAgICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKC13aW5kb3dXaWR0aCAtIG5vZGUud2lkdGgsIG5vZGUueSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgcG9zID0gbmV3IGNjLlZlYzIod2luZG93V2lkdGggKyBub2RlLndpZHRoLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blj7Pnp7vliqhcclxuICAgICAqIEBwYXJhbSBub2RlIOi/kOWKqOeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIGRpcmVjdGlvbiDov5DliqjnmoTmlrnlkJFcclxuICAgICAqIEBwYXJhbSBkaXNNb3ZlIOi/kOWKqOeahOi3neemu1xyXG4gICAgICogQHBhcmFtIHRpbWVNb3ZlIOi/kOWKqOeahOaXtumXtC9zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUxlZnRSaWdodChub2RlOiBjYy5Ob2RlLCBkaXJlY3Rpb24sIGRpc01vdmU6IG51bWJlciwgdGltZU1vdmU6IG51bWJlcikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBsZXNzUG9zO1xyXG4gICAgICAgICAgICBsZXQgbW9yZVBvcztcclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5MRUZUOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIGxlc3NQb3MgPSBuZXcgY2MuVmVjMihub2RlLnggLSBkaXNNb3ZlLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVQb3MgPSBuZXcgY2MuVmVjMihub2RlLnggKyBkaXNNb3ZlLCBub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb25NZ3IuVFdFRU5fRlJPTV9TSURFLlRPUDpcclxuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uTWdyLlRXRUVOX0ZST01fU0lERS5ET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgIGxlc3NQb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIG5vZGUueSAtIGRpc01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVQb3MgPSBuZXcgY2MuVmVjMihub2RlLngsIG5vZGUueSArIGRpc01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8odGltZU1vdmUsIGxlc3NQb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyh0aW1lTW92ZSwgbW9yZVBvcylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ21vdmVMZWZ0UmlnaHTlvILluLgnLCBlLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaG93R3JhZHVhbGx5KG5vZGU6IGNjLk5vZGUsIGR1cmF0aW9uID0gMSwgZGVsYXkgPSAwLCBlbmRPcGFjaXR5ID0gMjU1LCBzdGFyT3BhY2l0eSA9IDApIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IHN0YXJPcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGVsYXkoZGVsYXkpXHJcbiAgICAgICAgICAgICAgICAudG8oZHVyYXRpb24sIHtvcGFjaXR5OiBlbmRPcGFjaXR5fSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSBlbmRPcGFjaXR5O1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaG93R3JhZHVhbGx55byC5bi4JywgZSwgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaGlkZUdyYWR1YWxseShub2RlOiBjYy5Ob2RlLCBkdXJhdGlvbiA9IDEsIGRlbGF5ID0gMCwgZW5kT3BhY2l0eSA9IDUwKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgLnRvKGR1cmF0aW9uLCB7b3BhY2l0eTogZW5kT3BhY2l0eX0sIHtlYXNpbmc6ICdxdWFydEluJ30pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSBlbmRPcGFjaXR5O1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdzaG93R3JhZHVhbGx55byC5bi4JywgZSwgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/GameInfoView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f41d6l50UdLtJkX2F0iP7iE', 'GameInfoView');
// Script/Moudle/View/GameInfoView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var Global_1 = require("../../Common/Global");
var ShortageView_1 = require("./ShortageView");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var property = cc._decorator.property;
var Tools_1 = require("../../Common/Tools");
var tween = cc.tween;
var ccclass = cc._decorator.ccclass;
var GameInfoView = /** @class */ (function (_super) {
    __extends(GameInfoView, _super);
    function GameInfoView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fly_gold = null; //执行飞金币动画的图片
        _this.boomTime = 0.5; //金币爆开时长
        _this.flyTime = 1; //金币飞行时间
        _this.radius_min = 50; //最小半径
        _this.radius_max = 100; //最大半径
        _this.fly_gold_min = 4;
        _this.fly_gold_max = 10;
        _this.gold_scale_min = 0.9;
        _this.gold_scale_max = 1.2;
        _this.goldPool = new cc.NodePool(); //
        _this.fly_end = null;
        _this.gold = null;
        _this.diamond = null;
        _this.gold_add_button = null;
        _this.animationTime = null;
        _this.gold_num = null;
        _this.diamond_num = 0;
        _this.timeouts = new Map();
        return _this;
    }
    GameInfoView_1 = GameInfoView;
    GameInfoView.getUrl = function () {
        return {
            bundle: "gameInfoView",
            name: "gameInfoView"
        };
    };
    GameInfoView.INS = function () {
        return this.gameInfoViewIns;
    };
    GameInfoView.prototype.initUI = function () {
        var _this = this;
        GameInfoView_1.gameInfoViewIns = this;
        this.gold_num = CacheMgr_1.default.gold;
        this.diamond_num = CacheMgr_1.default.diamond;
        this.animationTime = Global_1.default.config.gameInfo.animation;
        this.gold = this.getNode("gold/num");
        this.gold_add_button = this.getNode("gold/add");
        this.timeouts.set("gold", []);
        this.timeouts.set("diamond", []);
        var gold = this.getNode("gold");
        var gold_icon = this.getNode("gold/icon");
        this.initPool();
        this.scheduleOnce(function () {
            var wp = gold.convertToWorldSpaceAR(gold_icon.position);
            _this.fly_end = _this.node.convertToNodeSpaceAR(wp);
        }, 0);
    };
    GameInfoView.prototype.show = function (param) {
        this.gold.getComponent(cc.Label).string = this.gold_num.toString();
        this.onTouch(this.gold_add_button, function () {
            PanelMgr_1.default.INS.openPanel({
                panel: ShortageView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    type: "gold",
                }
            });
        });
    };
    GameInfoView.prototype.hide = function () {
    };
    //初始化节点池
    GameInfoView.prototype.initPool = function () {
        if (this.fly_gold) {
            for (var i = 0; i < this.fly_gold_max; i++) {
                var gold = cc.instantiate(this.fly_gold);
                this.goldPool.put(gold);
            }
        }
    };
    /**
     * 监听金币是否改变
     * @param dt
     * @protected
     */
    GameInfoView.prototype.update = function (dt) {
        var newGold = CacheMgr_1.default.gold;
        if (this.gold_num != newGold) {
            this.changeAnimation("gold", newGold - this.gold_num);
        }
    };
    /**
     * 修改金币动画
     * @param type
     * @param num
     * @private
     */
    GameInfoView.prototype.changeAnimation = function (type, num) {
        var _this = this;
        this.clearTimeOut(type);
        var num_bas = Math.abs(num);
        var time = this.animationTime / num_bas;
        var allTime = 0; //累计耗时间
        var num_ = this[type + "_num"];
        this[type + "_num"] += num;
        var _loop_1 = function (i) {
            if (num < 0) {
                var arr = this_1.timeouts.get(type);
                arr[i] = window.setTimeout(function () {
                    _this[type].getComponent(cc.Label).string = (num_ - i).toString();
                }, allTime * 1000);
                allTime += time;
            }
            else {
                var arr = this_1.timeouts.get(type);
                arr[i] = window.setTimeout(function () {
                    _this[type].getComponent(cc.Label).string = (num_ + i).toString();
                }, allTime * 1000);
                allTime += time;
            }
        };
        var this_1 = this;
        for (var i = 1; i <= num_bas; i++) {
            _loop_1(i);
        }
    };
    /**
     * 清空所有动画
     * @param type
     * @private
     */
    GameInfoView.prototype.clearTimeOut = function (type) {
        //停止所有关于 该类型改变的值
        var timeouts = this.timeouts.get(type);
        for (var i = 0; i < timeouts.length; i++) {
            if (this.timeouts[i]) {
                window.clearTimeout(timeouts[i]);
            }
        }
        this[type].getComponent(cc.Label).string = this[type + "_num"].toString(); //直接赋值
        this.timeouts.set(type, []);
    };
    /**
     * @param point 需要飞金币的起始点（世界坐标）
     * @private
     */
    GameInfoView.prototype.fly_gold_animation = function (pointPosition) {
        var _this = this;
        pointPosition = this.node.convertToNodeSpaceAR(pointPosition);
        return new Promise(function (resolve, reject) {
            var num = Tools_1.default.getRandom(_this.fly_gold_min, _this.fly_gold_max - 1);
            if (num > _this.goldPool.size()) {
                resolve(true);
                return;
            }
            var p = [];
            for (var i = 0; i < num; i++) {
                var pro = new Promise(function (resolve, reject) {
                    var gold = _this.goldPool.get();
                    gold.position = cc.v3(pointPosition);
                    _this.node.addChild(gold);
                    var scale = Tools_1.default.getRealRandom(_this.gold_scale_min, _this.gold_scale_max);
                    gold.scale = scale;
                    //随机角度， 随机半径
                    var angle = Tools_1.default.getRandom(0, 360);
                    var r = Tools_1.default.getRandom(_this.radius_min, _this.radius_max + 1);
                    var boomPoint = Tools_1.default.getCirclePoint(pointPosition, r, angle);
                    tween(gold)
                        .to(_this.boomTime, { position: boomPoint }, { easing: "quadOut" })
                        .to(_this.flyTime, { position: _this.fly_end }, { easing: "quadOut" })
                        .call(function () {
                        _this.goldPool.put(gold);
                        resolve(true);
                    })
                        .start();
                });
                p.push(pro);
            }
            Promise.all(p).then(function () {
                resolve(true);
            });
        });
    };
    var GameInfoView_1;
    GameInfoView.gameInfoViewIns = null;
    __decorate([
        property(cc.Prefab)
    ], GameInfoView.prototype, "fly_gold", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "boomTime", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "flyTime", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "radius_min", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "radius_max", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "fly_gold_min", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "fly_gold_max", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "gold_scale_min", void 0);
    __decorate([
        property(cc.Integer)
    ], GameInfoView.prototype, "gold_scale_max", void 0);
    GameInfoView = GameInfoView_1 = __decorate([
        ccclass
    ], GameInfoView);
    return GameInfoView;
}(LayerPanel_1.default));
exports.default = GameInfoView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEdhbWVJbmZvVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFDcEQsbUVBQXlFO0FBQ3pFLDhDQUF5QztBQUN6QywrQ0FBMEM7QUFDMUMseURBQTZEO0FBQzdELElBQU8sUUFBUSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0FBQ3pDLDRDQUF1QztBQUN2QyxJQUFPLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBRWpCLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQTBDLGdDQUFVO0lBQXBEO1FBQUEscUVBdU1DO1FBN0xXLGNBQVEsR0FBYyxJQUFJLENBQUEsQ0FBQyxZQUFZO1FBRXZDLGNBQVEsR0FBVyxHQUFHLENBQUEsQ0FBQyxRQUFRO1FBRS9CLGFBQU8sR0FBVyxDQUFDLENBQUEsQ0FBRSxRQUFRO1FBRTdCLGdCQUFVLEdBQVcsRUFBRSxDQUFBLENBQUMsTUFBTTtRQUU5QixnQkFBVSxHQUFXLEdBQUcsQ0FBQSxDQUFDLE1BQU07UUFFL0Isa0JBQVksR0FBVyxDQUFDLENBQUE7UUFFeEIsa0JBQVksR0FBVyxFQUFFLENBQUE7UUFFekIsb0JBQWMsR0FBVyxHQUFHLENBQUE7UUFFNUIsb0JBQWMsR0FBVyxHQUFHLENBQUE7UUFFNUIsY0FBUSxHQUFnQixJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQSxDQUFDLEVBQUU7UUFFNUMsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUV2QixVQUFJLEdBQVksSUFBSSxDQUFDO1FBQ3JCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFDN0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixpQkFB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Q0FBQyxPQUFPLENBQUM7b0RBQ1U7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztvREFDVztJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3NEQUNXO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7c0RBQ1k7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3REFDZTtJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3dEQUNlO0lBMUJuQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBdU1oQztJQUFELG1CQUFDO0NBdk1ELEFBdU1DLENBdk15QyxvQkFBVSxHQXVNbkQ7a0JBdk1vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcbmltcG9ydCBMYXllclBhbmVsLCB7VXJsSW5mb30gZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJQYW5lbFwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9Db21tb24vR2xvYmFsXCI7XHJcbmltcG9ydCBTaG9ydGFnZVZpZXcgZnJvbSBcIi4vU2hvcnRhZ2VWaWV3XCI7XHJcbmltcG9ydCBQYW5lbE1nciwge0xheWVyfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5pbXBvcnQgcHJvcGVydHkgPSBjYy5fZGVjb3JhdG9yLnByb3BlcnR5O1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uLy4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgdHdlZW4gPSBjYy50d2VlbjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lSW5mb1ZpZXcgZXh0ZW5kcyBMYXllclBhbmVsIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVybCgpOiBVcmxJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBidW5kbGU6IFwiZ2FtZUluZm9WaWV3XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiZ2FtZUluZm9WaWV3XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgZmx5X2dvbGQ6IGNjLlByZWZhYiA9IG51bGwgLy/miafooYzpo57ph5HluIHliqjnlLvnmoTlm77niYdcclxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxyXG4gICAgcHJpdmF0ZSBib29tVGltZTogbnVtYmVyID0gMC41IC8v6YeR5biB54iG5byA5pe26ZW/XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByaXZhdGUgZmx5VGltZTogbnVtYmVyID0gMSAgLy/ph5HluIHpo57ooYzml7bpl7RcclxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxyXG4gICAgcHJpdmF0ZSByYWRpdXNfbWluOiBudW1iZXIgPSA1MCAvL+acgOWwj+WNiuW+hFxyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcml2YXRlIHJhZGl1c19tYXg6IG51bWJlciA9IDEwMCAvL+acgOWkp+WNiuW+hFxyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcml2YXRlIGZseV9nb2xkX21pbjogbnVtYmVyID0gNFxyXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXHJcbiAgICBwcml2YXRlIGZseV9nb2xkX21heDogbnVtYmVyID0gMTBcclxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxyXG4gICAgcHJpdmF0ZSBnb2xkX3NjYWxlX21pbjogbnVtYmVyID0gMC45XHJcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcclxuICAgIHByaXZhdGUgZ29sZF9zY2FsZV9tYXg6IG51bWJlciA9IDEuMlxyXG5cclxuICAgIHByaXZhdGUgZ29sZFBvb2w6IGNjLk5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKCkgLy9cclxuXHJcbiAgICBwcml2YXRlIGZseV9lbmQ6IGNjLlZlYzMgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBnb2xkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgZGlhbW9uZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBnb2xkX2FkZF9idXR0b246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYW5pbWF0aW9uVGltZTogbnVtYmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgZ29sZF9udW06IG51bWJlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIGRpYW1vbmRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aW1lb3V0czogTWFwPHN0cmluZywgbnVtYmVyW10+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcltdPigpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdhbWVJbmZvVmlld0luczogR2FtZUluZm9WaWV3ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIElOUygpOiBHYW1lSW5mb1ZpZXcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVJbmZvVmlld0lucztcclxuICAgIH1cclxuXHJcbiAgICBpbml0VUkoKTogdm9pZCB7XHJcbiAgICAgICAgR2FtZUluZm9WaWV3LmdhbWVJbmZvVmlld0lucyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5nb2xkX251bSA9IENhY2hlTWdyLmdvbGQ7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX251bSA9IENhY2hlTWdyLmRpYW1vbmQ7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25UaW1lID0gR2xvYmFsLmNvbmZpZy5nYW1lSW5mby5hbmltYXRpb247XHJcbiAgICAgICAgdGhpcy5nb2xkID0gdGhpcy5nZXROb2RlKFwiZ29sZC9udW1cIik7XHJcbiAgICAgICAgdGhpcy5nb2xkX2FkZF9idXR0b24gPSB0aGlzLmdldE5vZGUoXCJnb2xkL2FkZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lb3V0cy5zZXQoXCJnb2xkXCIsIFtdKTtcclxuICAgICAgICB0aGlzLnRpbWVvdXRzLnNldChcImRpYW1vbmRcIiwgW10pO1xyXG5cclxuICAgICAgICBsZXQgZ29sZCA9IHRoaXMuZ2V0Tm9kZShcImdvbGRcIilcclxuICAgICAgICBsZXQgZ29sZF9pY29uID0gdGhpcy5nZXROb2RlKFwiZ29sZC9pY29uXCIpXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFBvb2woKVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHdwID0gZ29sZC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZ29sZF9pY29uLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICB0aGlzLmZseV9lbmQgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod3ApXHJcbiAgICAgICAgfSwgMClcclxuICAgIH1cclxuXHJcbiAgICBzaG93KHBhcmFtOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdvbGQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdvbGRfbnVtLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLmdvbGRfYWRkX2J1dHRvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsOiBTaG9ydGFnZVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXllcjogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImdvbGRcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJboioLngrnmsaBcclxuICAgIHByaXZhdGUgaW5pdFBvb2woKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmx5X2dvbGQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZseV9nb2xkX21heDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ29sZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZmx5X2dvbGQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbGRQb29sLnB1dChnb2xkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs6YeR5biB5piv5ZCm5pS55Y+YXHJcbiAgICAgKiBAcGFyYW0gZHRcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5ld0dvbGQgPSBDYWNoZU1nci5nb2xkO1xyXG4gICAgICAgIGlmICh0aGlzLmdvbGRfbnVtICE9IG5ld0dvbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb24oXCJnb2xkXCIsIG5ld0dvbGQgLSB0aGlzLmdvbGRfbnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56YeR5biB5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICogQHBhcmFtIG51bVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VBbmltYXRpb24odHlwZTogc3RyaW5nLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lT3V0KHR5cGUpO1xyXG4gICAgICAgIGxldCBudW1fYmFzID0gTWF0aC5hYnMobnVtKTtcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMuYW5pbWF0aW9uVGltZSAvIG51bV9iYXM7XHJcbiAgICAgICAgbGV0IGFsbFRpbWUgPSAwOyAgIC8v57Sv6K6h6ICX5pe26Ze0XHJcbiAgICAgICAgbGV0IG51bV8gPSB0aGlzW3R5cGUgKyBcIl9udW1cIl07XHJcbiAgICAgICAgdGhpc1t0eXBlICsgXCJfbnVtXCJdICs9IG51bTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBudW1fYmFzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLnRpbWVvdXRzLmdldCh0eXBlKTtcclxuICAgICAgICAgICAgICAgIGFycltpXSA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKG51bV8gLSBpKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfSwgYWxsVGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgYWxsVGltZSArPSB0aW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMudGltZW91dHMuZ2V0KHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgYXJyW2ldID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAobnVtXyArIGkpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9LCBhbGxUaW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBhbGxUaW1lICs9IHRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrmiYDmnInliqjnlLtcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyVGltZU91dCh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAvL+WBnOatouaJgOacieWFs+S6jiDor6XnsbvlnovmlLnlj5jnmoTlgLxcclxuICAgICAgICBsZXQgdGltZW91dHMgPSB0aGlzLnRpbWVvdXRzLmdldCh0eXBlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVvdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVvdXRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzW3R5cGVdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpc1t0eXBlICsgXCJfbnVtXCJdLnRvU3RyaW5nKCk7ICAgLy/nm7TmjqXotYvlgLxcclxuICAgICAgICB0aGlzLnRpbWVvdXRzLnNldCh0eXBlLCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg6ZyA6KaB6aOe6YeR5biB55qE6LW35aeL54K577yI5LiW55WM5Z2Q5qCH77yJXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmx5X2dvbGRfYW5pbWF0aW9uKHBvaW50UG9zaXRpb246IGNjLlZlYzMpIHtcclxuICAgICAgICBwb2ludFBvc2l0aW9uID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvaW50UG9zaXRpb24pXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRvb2xzLmdldFJhbmRvbSh0aGlzLmZseV9nb2xkX21pbiwgdGhpcy5mbHlfZ29sZF9tYXggLSAxKVxyXG4gICAgICAgICAgICBpZiAobnVtID4gdGhpcy5nb2xkUG9vbC5zaXplKCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwOiBhbnkgW10gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb2xkID0gdGhpcy5nb2xkUG9vbC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGdvbGQucG9zaXRpb24gPSBjYy52Myhwb2ludFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChnb2xkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IFRvb2xzLmdldFJlYWxSYW5kb20odGhpcy5nb2xkX3NjYWxlX21pbiwgdGhpcy5nb2xkX3NjYWxlX21heClcclxuICAgICAgICAgICAgICAgICAgICBnb2xkLnNjYWxlID0gc2NhbGVcclxuICAgICAgICAgICAgICAgICAgICAvL+maj+acuuinkuW6pu+8jCDpmo/mnLrljYrlvoRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUgPSBUb29scy5nZXRSYW5kb20oMCwgMzYwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByID0gVG9vbHMuZ2V0UmFuZG9tKHRoaXMucmFkaXVzX21pbiwgdGhpcy5yYWRpdXNfbWF4ICsgMSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbVBvaW50ID0gVG9vbHMuZ2V0Q2lyY2xlUG9pbnQocG9pbnRQb3NpdGlvbiwgciwgYW5nbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4oZ29sZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRoaXMuYm9vbVRpbWUsIHtwb3NpdGlvbjogYm9vbVBvaW50fSwge2Vhc2luZzogXCJxdWFkT3V0XCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8odGhpcy5mbHlUaW1lLCB7cG9zaXRpb246IHRoaXMuZmx5X2VuZH0sIHtlYXNpbmc6IFwicXVhZE91dFwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkUG9vbC5wdXQoZ29sZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBwLnB1c2gocHJvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/EndView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67db6+pXehLwYlpeSPIChqs', 'EndView');
// Script/Moudle/View/EndView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HomeView_1 = require("./HomeView");
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var GameView_1 = require("./GameView");
var LayerMgr_1 = require("../../Common/manage/Layer/LayerMgr");
var AudioMgr_1 = require("../../Common/manage/AudioMgr");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var ShowConfig_1 = require("../../Common/ShowConfig");
var Global_1 = require("../../Common/Global");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EndView = /** @class */ (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paramData = {};
        _this._button = null;
        _this.coinPrefab = null;
        _this.coinPool = null; //星星对象金币对象池
        _this.getGold = null;
        _this.getScore = null;
        _this.gameBox = null;
        _this.maxScore = null;
        _this.newMax = null;
        _this.caiDai = null;
        _this.home_btn = null;
        _this.game_btn = null;
        _this.isNewMax = false;
        _this.score = null;
        return _this;
    }
    EndView_1 = EndView;
    EndView.getUrl = function () {
        return {
            bundle: "endView",
            name: "endView"
        };
    };
    EndView.prototype.initUI = function () {
        //todo logic
        this.getGold = this.getNode("topUi/huodejinbi/getGlod");
        this.gameBox = this.getNode("gameBox");
        this.getScore = this.getNode("topUi/getNum");
        this.maxScore = this.getNode("history/history_num");
        this.newMax = this.getNode("xinjilu");
        this.caiDai = this.getNode("caidai");
        this.game_btn = this.getNode("bottomUI/continue");
        this.onTouch(this.game_btn, this.handle_continue);
        this.home_btn = this.getNode("bottomUI/home");
        this.onTouch(this.home_btn, this.handle_home);
        this.coinPool = new cc.NodePool();
        this.initCoinPool();
    };
    EndView.prototype.show = function (param) {
        //todo 逻辑
        this.isNewMax = param.isNewMax;
        this.getScore.getComponent(cc.Label).string = param.score;
        this.getGold.getComponent(cc.Label).string = "+" + param.score;
        this.score = Number(param.score);
        this.maxScore.getComponent(cc.Label).string = CacheMgr_1.default.checkpoint.toString();
        ShowConfig_1.default.show('endConfig').then(function (res) {
            if (Global_1.default.config.endConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
            else {
                QgBanner_1.default.hideBanner();
            }
        });
    };
    EndView.prototype.hide = function () {
        CacheMgr_1.default.updateData();
        if (Global_1.default.config.gameConfig.nativeConfig.type == 2) {
            Emit_1.default.instance().emit(EmitData_1.default.CLOSE_NATIVE);
        }
    };
    //todo logic 方法
    /** 初始化金币对象池 */
    EndView.prototype.initCoinPool = function (count) {
        if (count === void 0) { count = 20; }
        for (var i = 0; i < count; i++) {
            var coin = cc.instantiate(this.coinPrefab);
            this.coinPool.put(coin);
        }
    };
    /** 播放动画 */
    EndView.prototype.playAnim = function () {
        AudioMgr_1.default.play("get_coins");
        /** 随机金币数量 */
        var randomCount = Math.random() * 15 + 10;
        /** 起始位置 */
        var startPos = this.node.convertToNodeSpaceAR(this.getGold.parent.parent.convertToWorldSpaceAR(this.getGold.parent.position));
        /** 结束位置 */
        var endPos = LayerMgr_1.default.gameInfoLayer.children[0].children[0].position;
        this.playCoinFlyAnim(randomCount, cc.v2(startPos), cc.v2(endPos));
    };
    /**
     * 播放金币飞出动画
     * @param count 金币数量
     * @param startPos 起始位置
     * @param endPos 结束位置
     * @param r 半径
     */
    EndView.prototype.playCoinFlyAnim = function (count, startPos, endPos, r) {
        var _this = this;
        if (r === void 0) { r = 200; }
        //确保当前节点池有足够的金币
        var poolSize = this.coinPool.size();
        var reCreateCoinCount = poolSize > count ? 0 : count - poolSize;
        this.initCoinPool(reCreateCoinCount);
        //生成园， 并且对圆上的点进行排序
        var points = this.getCirclePoints(r, startPos, count);
        var coinNodeList = points.map(function (pos) {
            var coin = _this.coinPool.get();
            coin.setPosition(startPos);
            _this.node.addChild(coin);
            return {
                node: coin,
                startPos: startPos,
                mdPos: pos,
                endPos: endPos,
                /** sub 用于把字符串显示为下标 */
                dis: pos.sub(endPos).mag()
            };
        });
        coinNodeList = coinNodeList.sort(function (a, b) {
            if (a.dis - b.dis > 0)
                return 1;
            if (a.dis - b.dis < 0)
                return -1;
            return 0;
        });
        //执行金币落袋的动画
        coinNodeList.forEach(function (item, index) {
            item.node.runAction(cc.sequence(cc.moveTo(0.3, item.mdPos), cc.delayTime(index * 0.01), cc.moveTo(0.5, item.endPos), cc.callFunc(function () {
                _this.coinPool.put(item.node);
            })));
        });
    };
    /**
     *
     * @param r 半径
     * @param pos 圆心坐标
     * @param count 等分点数量
     * @param randomScope 等分点的随机播动范围
     */
    EndView.prototype.getCirclePoints = function (r, pos, count, randomScope) {
        if (randomScope === void 0) { randomScope = 60; }
        var points = [];
        //弧度
        var radians = (Math.PI / 180) * Math.round(360 / count);
        for (var i = 0; i < count; i++) {
            var x = pos.x + r * Math.sin(radians * i);
            var y = pos.y + r * Math.cos(radians * i);
            points.unshift(cc.v3(x + Math.random() * randomScope, y + Math.random() * randomScope, 0));
        }
        return points;
    };
    EndView.prototype.handle_home = function () {
        PanelMgr_1.default.INS.openPanel({
            panel: HomeView_1.default,
            layer: PanelMgr_1.Layer.gameLayer,
            call: function () {
                PanelMgr_1.default.INS.closePanel(EndView_1);
            }
        });
    };
    EndView.prototype.handle_continue = function () {
        PanelMgr_1.default.INS.openPanel({
            panel: GameView_1.default,
            layer: PanelMgr_1.Layer.gameLayer,
            call: function () {
                PanelMgr_1.default.INS.closePanel(EndView_1);
            }
        });
    };
    var EndView_1;
    __decorate([
        property(cc.Prefab)
    ], EndView.prototype, "coinPrefab", void 0);
    EndView = EndView_1 = __decorate([
        ccclass
    ], EndView);
    return EndView;
}(LayerPanel_1.default));
exports.default = EndView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEVuZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQWtDO0FBQ2xDLG1FQUF5RTtBQUN6RSx5REFBb0Q7QUFDcEQsdUNBQWtDO0FBQ2xDLCtEQUEwRDtBQUMxRCx5REFBb0Q7QUFDcEQseURBQTZEO0FBQzdELHNEQUFpRDtBQUNqRCw4Q0FBeUM7QUFDekMsNkRBQXdEO0FBQ3hELHNEQUFpRDtBQUNqRCw4REFBeUQ7QUFFbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVU7SUFBL0M7UUFBQSxxRUFnTEM7UUF4S1csZ0JBQVUsR0FBUSxFQUFFLENBQUM7UUFFckIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixnQkFBVSxHQUFjLElBQUksQ0FBQTtRQUNwQyxjQUFRLEdBQWdCLElBQUksQ0FBQyxDQUFFLFdBQVc7UUFDMUMsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUN2QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBQ3hCLGFBQU8sR0FBWSxJQUFJLENBQUE7UUFDdkIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUN4QixZQUFNLEdBQVksSUFBSSxDQUFBO1FBQ3RCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFDdEIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUN4QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBQ3hCLGNBQVEsR0FBWSxLQUFLLENBQUE7UUFDekIsV0FBSyxHQUFXLElBQUksQ0FBQTs7SUF5SnhCLENBQUM7Z0JBaExvQixPQUFPO0lBQ1YsY0FBTSxHQUFwQjtRQUNJLE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztZQUNqQixJQUFJLEVBQUUsU0FBUztTQUNsQixDQUFBO0lBQ0wsQ0FBQztJQW1CTSx3QkFBTSxHQUFiO1FBQ0ks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Q0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFHRCw2QkFBVyxHQUFYO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ25CLEtBQUssRUFBRyxrQkFBUTtZQUNoQixLQUFLLEVBQUcsZ0JBQUssQ0FBQyxTQUFTO1lBQ3ZCLElBQUksRUFBRztnQkFDSCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBTyxDQUFDLENBQUU7WUFDdEMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpQ0FBZSxHQUFmO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ25CLEtBQUssRUFBRyxrQkFBUTtZQUNoQixLQUFLLEVBQUcsZ0JBQUssQ0FBQyxTQUFTO1lBQ3ZCLElBQUksRUFBRztnQkFDSCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBTyxDQUFDLENBQUU7WUFDdEMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7O0lBbktEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ2dCO0lBWm5CLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FnTDNCO0lBQUQsY0FBQztDQWhMRCxBQWdMQyxDQWhMb0Msb0JBQVUsR0FnTDlDO2tCQWhMb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIb21lVmlldyBmcm9tIFwiLi9Ib21lVmlld1wiO1xyXG5pbXBvcnQgTGF5ZXJQYW5lbCwge1VybEluZm99IGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0xheWVyL0xheWVyUGFuZWxcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcbmltcG9ydCBHYW1lVmlldyBmcm9tIFwiLi9HYW1lVmlld1wiO1xyXG5pbXBvcnQgTGF5ZXJNZ3IgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJNZ3JcIjtcclxuaW1wb3J0IEF1ZGlvTWdyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0F1ZGlvTWdyXCI7XHJcbmltcG9ydCBQYW5lbE1nciwge0xheWVyfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5pbXBvcnQgU2hvd0NvbmZpZyBmcm9tIFwiLi4vLi4vQ29tbW9uL1Nob3dDb25maWdcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQgRW1pdERhdGEgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0RGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRWaWV3IGV4dGVuZHMgTGF5ZXJQYW5lbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVybCgpOiBVcmxJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBidW5kbGU6IFwiZW5kVmlld1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcImVuZFZpZXdcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJhbURhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBjb2luUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBjb2luUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsOyAgLy/mmJ/mmJ/lr7nosaHph5HluIHlr7nosaHmsaBcclxuICAgIGdldEdvbGQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBnZXRTY29yZTogY2MuTm9kZSA9IG51bGxcclxuICAgIGdhbWVCb3g6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBtYXhTY29yZTogY2MuTm9kZSA9IG51bGxcclxuICAgIG5ld01heDogY2MuTm9kZSA9IG51bGxcclxuICAgIGNhaURhaTogY2MuTm9kZSA9IG51bGxcclxuICAgIGhvbWVfYnRuOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgZ2FtZV9idG46IGNjLk5vZGUgPSBudWxsXHJcbiAgICBpc05ld01heDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICBzY29yZTogbnVtYmVyID0gbnVsbFxyXG5cclxuICAgIHB1YmxpYyBpbml0VUkoKSB7XHJcbiAgICAgICAgLy90b2RvIGxvZ2ljXHJcbiAgICAgICAgdGhpcy5nZXRHb2xkID0gdGhpcy5nZXROb2RlKFwidG9wVWkvaHVvZGVqaW5iaS9nZXRHbG9kXCIpXHJcbiAgICAgICAgdGhpcy5nYW1lQm94ID0gdGhpcy5nZXROb2RlKFwiZ2FtZUJveFwiKVxyXG4gICAgICAgIHRoaXMuZ2V0U2NvcmUgPSB0aGlzLmdldE5vZGUoXCJ0b3BVaS9nZXROdW1cIilcclxuICAgICAgICB0aGlzLm1heFNjb3JlID0gdGhpcy5nZXROb2RlKFwiaGlzdG9yeS9oaXN0b3J5X251bVwiKVxyXG4gICAgICAgIHRoaXMubmV3TWF4ID0gdGhpcy5nZXROb2RlKFwieGluamlsdVwiKVxyXG4gICAgICAgIHRoaXMuY2FpRGFpID0gdGhpcy5nZXROb2RlKFwiY2FpZGFpXCIpXHJcbiAgICAgICAgdGhpcy5nYW1lX2J0biA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL2NvbnRpbnVlXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuZ2FtZV9idG4sIHRoaXMuaGFuZGxlX2NvbnRpbnVlKVxyXG4gICAgICAgIHRoaXMuaG9tZV9idG4gPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9ob21lXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuaG9tZV9idG4sIHRoaXMuaGFuZGxlX2hvbWUpXHJcbiAgICAgICAgdGhpcy5jb2luUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdENvaW5Qb29sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cocGFyYW06IGFueSkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpFcclxuICAgICAgICB0aGlzLmlzTmV3TWF4ID0gcGFyYW0uaXNOZXdNYXg7XHJcbiAgICAgICAgdGhpcy5nZXRTY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHBhcmFtLnNjb3JlO1xyXG4gICAgICAgIHRoaXMuZ2V0R29sZC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgcGFyYW0uc2NvcmU7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IE51bWJlcihwYXJhbS5zY29yZSk7XHJcbiAgICAgICAgdGhpcy5tYXhTY29yZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IENhY2hlTWdyLmNoZWNrcG9pbnQudG9TdHJpbmcoKTtcclxuXHJcblxyXG4gICAgICAgIFNob3dDb25maWcuc2hvdygnZW5kQ29uZmlnJykudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmVuZENvbmZpZy5iYW5uZXJTaG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLnNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLmhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIENhY2hlTWdyLnVwZGF0ZURhdGEoKTtcclxuICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZy5nYW1lQ29uZmlnLm5hdGl2ZUNvbmZpZy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRW1pdERhdGEuQ0xPU0VfTkFUSVZFKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9kbyBsb2dpYyDmlrnms5VcclxuICAgIC8qKiDliJ3lp4vljJbph5HluIHlr7nosaHmsaAgKi9cclxuICAgIGluaXRDb2luUG9vbChjb3VudDogbnVtYmVyID0gMjApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvaW4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvaW5QcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvaW5Qb29sLnB1dChjb2luKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaSreaUvuWKqOeUuyAqL1xyXG4gICAgcGxheUFuaW0oKSB7XHJcbiAgICAgICAgQXVkaW9NZ3IucGxheShcImdldF9jb2luc1wiKVxyXG5cclxuICAgICAgICAvKiog6ZqP5py66YeR5biB5pWw6YePICovXHJcbiAgICAgICAgbGV0IHJhbmRvbUNvdW50ID0gTWF0aC5yYW5kb20oKSAqIDE1ICsgMTA7XHJcbiAgICAgICAgLyoqIOi1t+Wni+S9jee9riAqL1xyXG4gICAgICAgIGxldCBzdGFydFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmdldEdvbGQucGFyZW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5nZXRHb2xkLnBhcmVudC5wb3NpdGlvbikpXHJcblxyXG4gICAgICAgIC8qKiDnu5PmnZ/kvY3nva4gKi9cclxuICAgICAgICBsZXQgZW5kUG9zID0gTGF5ZXJNZ3IuZ2FtZUluZm9MYXllci5jaGlsZHJlblswXS5jaGlsZHJlblswXS5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMucGxheUNvaW5GbHlBbmltKHJhbmRvbUNvdW50LCBjYy52MihzdGFydFBvcyksIGNjLnYyKGVuZFBvcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+6YeR5biB6aOe5Ye65Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gY291bnQg6YeR5biB5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRQb3Mg6LW35aeL5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZW5kUG9zIOe7k+adn+S9jee9rlxyXG4gICAgICogQHBhcmFtIHIg5Y2K5b6EXHJcbiAgICAgKi9cclxuICAgIHBsYXlDb2luRmx5QW5pbShjb3VudDogbnVtYmVyLCBzdGFydFBvczogY2MuVmVjMiwgZW5kUG9zOiBjYy5WZWMyLCByOiBudW1iZXIgPSAyMDApIHtcclxuICAgICAgICAvL+ehruS/neW9k+WJjeiKgueCueaxoOaciei2s+Wkn+eahOmHkeW4gVxyXG4gICAgICAgIGNvbnN0IHBvb2xTaXplID0gdGhpcy5jb2luUG9vbC5zaXplKCk7XHJcbiAgICAgICAgY29uc3QgcmVDcmVhdGVDb2luQ291bnQgPSBwb29sU2l6ZSA+IGNvdW50ID8gMCA6IGNvdW50IC0gcG9vbFNpemU7XHJcbiAgICAgICAgdGhpcy5pbml0Q29pblBvb2wocmVDcmVhdGVDb2luQ291bnQpO1xyXG4gICAgICAgIC8v55Sf5oiQ5Zut77yMIOW5tuS4lOWvueWchuS4iueahOeCuei/m+ihjOaOkuW6j1xyXG4gICAgICAgIGxldCBwb2ludHMgPSB0aGlzLmdldENpcmNsZVBvaW50cyhyLCBzdGFydFBvcywgY291bnQpO1xyXG4gICAgICAgIGxldCBjb2luTm9kZUxpc3QgPSBwb2ludHMubWFwKHBvcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb2luID0gdGhpcy5jb2luUG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgY29pbi5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChjb2luKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6IGNvaW4sXHJcbiAgICAgICAgICAgICAgICBzdGFydFBvczogc3RhcnRQb3MsXHJcbiAgICAgICAgICAgICAgICBtZFBvczogcG9zLFxyXG4gICAgICAgICAgICAgICAgZW5kUG9zOiBlbmRQb3MsXHJcbiAgICAgICAgICAgICAgICAvKiogc3ViIOeUqOS6juaKiuWtl+espuS4suaYvuekuuS4uuS4i+aghyAqL1xyXG4gICAgICAgICAgICAgICAgZGlzOiAocG9zIGFzIGFueSkuc3ViKGVuZFBvcykubWFnKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb2luTm9kZUxpc3QgPSBjb2luTm9kZUxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5kaXMgLSBiLmRpcyA+IDApIHJldHVybiAxO1xyXG4gICAgICAgICAgICBpZiAoYS5kaXMgLSBiLmRpcyA8IDApIHJldHVybiAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/miafooYzph5HluIHokL3ooovnmoTliqjnlLtcclxuICAgICAgICBjb2luTm9kZUxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjMsIGl0ZW0ubWRQb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShpbmRleCAqIDAuMDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjUsIGl0ZW0uZW5kUG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29pblBvb2wucHV0KGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gciDljYrlvoRcclxuICAgICAqIEBwYXJhbSBwb3Mg5ZyG5b+D5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gY291bnQg562J5YiG54K55pWw6YePXHJcbiAgICAgKiBAcGFyYW0gcmFuZG9tU2NvcGUg562J5YiG54K555qE6ZqP5py65pKt5Yqo6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIGdldENpcmNsZVBvaW50cyhyOiBudW1iZXIsIHBvczogY2MuVmVjMiwgY291bnQ6IG51bWJlciwgcmFuZG9tU2NvcGU6IG51bWJlciA9IDYwKTogY2MuVmVjMltdIHtcclxuICAgICAgICBsZXQgcG9pbnRzID0gW107XHJcbiAgICAgICAgLy/lvKfluqZcclxuICAgICAgICBsZXQgcmFkaWFucyA9IChNYXRoLlBJIC8gMTgwKSAqIE1hdGgucm91bmQoMzYwIC8gY291bnQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgeCA9IHBvcy54ICsgciAqIE1hdGguc2luKHJhZGlhbnMgKiBpKTtcclxuICAgICAgICAgICAgbGV0IHkgPSBwb3MueSArIHIgKiBNYXRoLmNvcyhyYWRpYW5zICogaSk7XHJcbiAgICAgICAgICAgIHBvaW50cy51bnNoaWZ0KGNjLnYzKHggKyBNYXRoLnJhbmRvbSgpICogcmFuZG9tU2NvcGUsIHkgKyBNYXRoLnJhbmRvbSgpICogcmFuZG9tU2NvcGUsIDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgaGFuZGxlX2hvbWUoKSB7XHJcbiAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgIHBhbmVsIDogSG9tZVZpZXcsXHJcbiAgICAgICAgICAgIGxheWVyIDogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICBjYWxsIDogKCk9PntcclxuICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEVuZFZpZXcpIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlX2NvbnRpbnVlKCkge1xyXG4gICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICBwYW5lbCA6IEdhbWVWaWV3LFxyXG4gICAgICAgICAgICBsYXllciA6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgY2FsbCA6ICgpPT57XHJcbiAgICAgICAgICAgICAgICBQYW5lbE1nci5JTlMuY2xvc2VQYW5lbChFbmRWaWV3KSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/logic/common/config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '209a5a0WahIgZHTzehy84h/', 'config');
// Script/Moudle/View/logic/common/config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../../../Common/Tools");
var CacheMgr_1 = require("../../../../Common/manage/CacheMgr");
var gameConfig = /** @class */ (function () {
    function gameConfig() {
    }
    //GameConfig
    gameConfig.gridSize = 90; // 格子长宽
    //生成方块空白格子区间
    gameConfig.bottomBlankMin = 1;
    gameConfig.bottomBlankMax = 3;
    gameConfig.price = 30; //道具金币
    //商城价格
    gameConfig.price_hammer = 200;
    gameConfig.price_sprite = 200;
    gameConfig.price_stamina = 300;
    //时间
    gameConfig.upTime = 0.3;
    gameConfig.downTime = 0.2;
    gameConfig.lineShake = 0.3;
    gameConfig.blockFlyTime = 0.1;
    gameConfig.hammerRotation = 0.1;
    gameConfig.hide_hint_sprite = 1; //隐藏提示图片时间
    gameConfig.sprite_move = 0.5;
    gameConfig.sprite_jump = 0.5;
    gameConfig.xinjilu = 2;
    gameConfig.hint_hand_move = 1; //提示手指移动时间
    gameConfig.menu_box_move = 0.2;
    //签到
    gameConfig.signData = [
        {
            type: 1,
            num: 300,
            title: "金币300",
            func: function (num) {
                Tools_1.default.changeGold(num);
            }
        },
        {
            type: 2,
            num: 2,
            title: "锤子2个",
            func: function (num) {
                CacheMgr_1.default.setting.hammerNum = CacheMgr_1.default.setting.hammerNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 3,
            num: 3,
            title: "恶魔3个",
            func: function (num) {
                CacheMgr_1.default.setting.spriteNum = CacheMgr_1.default.setting.spriteNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 1,
            num: 1000,
            title: "金币1000",
            func: function (num) {
                Tools_1.default.changeGold(num);
            }
        },
        {
            type: 2,
            num: 4,
            title: "锤子4个",
            func: function (num) {
                CacheMgr_1.default.setting.hammerNum = CacheMgr_1.default.setting.hammerNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 3,
            num: 5,
            title: "恶魔5个",
            func: function (num) {
                CacheMgr_1.default.setting.spriteNum = CacheMgr_1.default.setting.spriteNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
    ];
    gameConfig.singData7 = {
        type: [1, 2, 3],
        title: ["金币1000", "锤子2个", "恶魔2个"],
        func: function (num) {
            Tools_1.default.changeGold(1000 * num);
            CacheMgr_1.default.setting.hammerNum += 2 * num;
            CacheMgr_1.default.setting.spriteNum += 2 * num;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
        }
    };
    //提示数据
    gameConfig.hint_data = [
        [
            {
                column: 1,
                num: 3
            },
            {
                column: 4,
                num: 1
            },
            {
                column: 6,
                num: 1
            },
            {
                column: 7,
                num: 2
            },
        ],
        [
            {
                column: 1,
                num: 3
            },
            {
                column: 4,
                num: 1
            },
            {
                column: 6,
                num: 1
            },
            {
                column: 7,
                num: 2
            },
        ]
    ];
    gameConfig.grade_of_difficulty_config = [
        null,
        { probability_1: 20, probability_2: 30, probability_3: 10, probability_4: 0 },
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        { probability_1: 50, probability_2: 40, probability_3: 20, probability_4: 10 },
        { probability_1: 40, probability_2: 50, probability_3: 30, probability_4: 20 },
        { probability_1: 40, probability_2: 60, probability_3: 40, probability_4: 30 },
        { probability_1: 30, probability_2: 70, probability_3: 50, probability_4: 40 },
        { probability_1: 20, probability_2: 30, probability_3: 60, probability_4: 60 },
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        { probability_1: 50, probability_2: 40, probability_3: 70, probability_4: 70 },
        { probability_1: 40, probability_2: 50, probability_3: 80, probability_4: 80 },
        { probability_1: 40, probability_2: 60, probability_3: 90, probability_4: 90 },
        { probability_1: 30, probability_2: 70, probability_3: 100, probability_4: 100 },
    ];
    return gameConfig;
}());
exports.default = gameConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXGxvZ2ljXFxjb21tb25cXGNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUE2QztBQUM3QywrREFBMEQ7QUFFMUQ7SUFBQTtJQW9KQSxDQUFDO0lBbkpHLFlBQVk7SUFDRSxtQkFBUSxHQUFXLEVBQUUsQ0FBQSxDQUFFLE9BQU87SUFDNUMsWUFBWTtJQUNFLHlCQUFjLEdBQVcsQ0FBQyxDQUFBO0lBQzFCLHlCQUFjLEdBQVcsQ0FBQyxDQUFBO0lBRTFCLGdCQUFLLEdBQVcsRUFBRSxDQUFBLENBQUMsTUFBTTtJQUN2QyxNQUFNO0lBQ1EsdUJBQVksR0FBVyxHQUFHLENBQUE7SUFDMUIsdUJBQVksR0FBVyxHQUFHLENBQUE7SUFDMUIsd0JBQWEsR0FBVyxHQUFHLENBQUE7SUFDekMsSUFBSTtJQUNVLGlCQUFNLEdBQVcsR0FBRyxDQUFBO0lBQ3BCLG1CQUFRLEdBQVcsR0FBRyxDQUFBO0lBQ3RCLG9CQUFTLEdBQVcsR0FBRyxDQUFBO0lBQ3ZCLHVCQUFZLEdBQVcsR0FBRyxDQUFBO0lBQzFCLHlCQUFjLEdBQVcsR0FBRyxDQUFBO0lBQzVCLDJCQUFnQixHQUFXLENBQUMsQ0FBQSxDQUFDLFVBQVU7SUFDdkMsc0JBQVcsR0FBVyxHQUFHLENBQUE7SUFDekIsc0JBQVcsR0FBVyxHQUFHLENBQUE7SUFDekIsa0JBQU8sR0FBVyxDQUFDLENBQUE7SUFDbkIseUJBQWMsR0FBVyxDQUFDLENBQUEsQ0FBQyxVQUFVO0lBQ3JDLHdCQUFhLEdBQVcsR0FBRyxDQUFBO0lBQ3pDLElBQUk7SUFDVSxtQkFBUSxHQUFlO1FBQ2pDO1lBQ0ksSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsR0FBRztZQUNSLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLFVBQUMsR0FBVztnQkFDZCxlQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pCLENBQUM7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFVBQUMsR0FBVztnQkFDZCxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtnQkFDN0Qsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUE7WUFDdkMsQ0FBQztTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsQ0FBQztZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsVUFBQyxHQUFXO2dCQUNkLGtCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO2dCQUM3RCxrQkFBUSxDQUFDLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQTtZQUN2QyxDQUFDO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxDQUFDO1lBQ1AsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxVQUFDLEdBQVc7Z0JBQ2QsZUFBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6QixDQUFDO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxDQUFDO1lBQ1AsR0FBRyxFQUFFLENBQUM7WUFDTixLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxVQUFDLEdBQVc7Z0JBQ2Qsa0JBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7Z0JBQzdELGtCQUFRLENBQUMsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFBO1lBQ3ZDLENBQUM7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFVBQUMsR0FBVztnQkFDZCxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtnQkFDN0Qsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUE7WUFDdkMsQ0FBQztTQUNKO0tBQ0osQ0FBQTtJQUVhLG9CQUFTLEdBQWtCO1FBQ3JDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDakMsSUFBSSxFQUFFLFVBQUMsR0FBVztZQUNkLGVBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1lBQzVCLGtCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO1lBQ3JDLGtCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO1lBQ3JDLGtCQUFRLENBQUMsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFBO1FBQ3ZDLENBQUM7S0FDSixDQUFBO0lBRUQsTUFBTTtJQUNRLG9CQUFTLEdBQXdCO1FBQzNDO1lBRUk7Z0JBQ0ksTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVDtZQUNEO2dCQUNJLE1BQU0sRUFBRSxDQUFDO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1Q7WUFDRDtnQkFDSSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNUO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVDtTQUNKO1FBRUQ7WUFFSTtnQkFDSSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNUO1lBQ0Q7Z0JBQ0ksTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVDtZQUNEO2dCQUNJLE1BQU0sRUFBRSxDQUFDO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1Q7WUFDRDtnQkFDSSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNUO1NBQ0o7S0FDSixDQUFBO0lBQ2EscUNBQTBCLEdBQWtDO1FBQ3RFLElBQUk7UUFDSixFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUM7UUFDM0UsOEVBQThFO1FBQzlFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsRUFBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFDO1FBQzVFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsOEVBQThFO1FBQzlFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsRUFBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFDO1FBQzVFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBQztLQUNqRixDQUFBO0lBQ0wsaUJBQUM7Q0FwSkQsQUFvSkMsSUFBQTtrQkFwSm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge25leHRCbG9ja0luZm99IGZyb20gXCIuLi8uLi9HYW1lVmlld1wiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9tYW5hZ2UvQ2FjaGVNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVDb25maWcge1xyXG4gICAgLy9HYW1lQ29uZmlnXHJcbiAgICBwdWJsaWMgc3RhdGljIGdyaWRTaXplOiBudW1iZXIgPSA5MCAgLy8g5qC85a2Q6ZW/5a69XHJcbiAgICAvL+eUn+aIkOaWueWdl+epuueZveagvOWtkOWMuumXtFxyXG4gICAgcHVibGljIHN0YXRpYyBib3R0b21CbGFua01pbjogbnVtYmVyID0gMVxyXG4gICAgcHVibGljIHN0YXRpYyBib3R0b21CbGFua01heDogbnVtYmVyID0gM1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcHJpY2U6IG51bWJlciA9IDMwIC8v6YGT5YW36YeR5biBXHJcbiAgICAvL+WVhuWfjuS7t+agvFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9oYW1tZXI6IG51bWJlciA9IDIwMFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9zcHJpdGU6IG51bWJlciA9IDIwMFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9zdGFtaW5hOiBudW1iZXIgPSAzMDBcclxuICAgIC8v5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIHVwVGltZTogbnVtYmVyID0gMC4zXHJcbiAgICBwdWJsaWMgc3RhdGljIGRvd25UaW1lOiBudW1iZXIgPSAwLjJcclxuICAgIHB1YmxpYyBzdGF0aWMgbGluZVNoYWtlOiBudW1iZXIgPSAwLjNcclxuICAgIHB1YmxpYyBzdGF0aWMgYmxvY2tGbHlUaW1lOiBudW1iZXIgPSAwLjFcclxuICAgIHB1YmxpYyBzdGF0aWMgaGFtbWVyUm90YXRpb246IG51bWJlciA9IDAuMVxyXG4gICAgcHVibGljIHN0YXRpYyBoaWRlX2hpbnRfc3ByaXRlOiBudW1iZXIgPSAxIC8v6ZqQ6JeP5o+Q56S65Zu+54mH5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIHNwcml0ZV9tb3ZlOiBudW1iZXIgPSAwLjVcclxuICAgIHB1YmxpYyBzdGF0aWMgc3ByaXRlX2p1bXA6IG51bWJlciA9IDAuNVxyXG4gICAgcHVibGljIHN0YXRpYyB4aW5qaWx1OiBudW1iZXIgPSAyXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpbnRfaGFuZF9tb3ZlOiBudW1iZXIgPSAxIC8v5o+Q56S65omL5oyH56e75Yqo5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIG1lbnVfYm94X21vdmU6IG51bWJlciA9IDAuMlxyXG4gICAgLy/nrb7liLBcclxuICAgIHB1YmxpYyBzdGF0aWMgc2lnbkRhdGE6IHNpZ25EYXRhW10gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBudW06IDMwMCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6YeR5biBMzAwXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuY2hhbmdlR29sZChudW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogMixcclxuICAgICAgICAgICAgbnVtOiAyLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLplKTlrZAy5LiqXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gPSBDYWNoZU1nci5zZXR0aW5nLmhhbW1lck51bSArIG51bVxyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAzLFxyXG4gICAgICAgICAgICBudW06IDMsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaBtumtlDPkuKpcIixcclxuICAgICAgICAgICAgZnVuYzogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSA9IENhY2hlTWdyLnNldHRpbmcuc3ByaXRlTnVtICsgbnVtXHJcbiAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nID0gQ2FjaGVNZ3Iuc2V0dGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIG51bTogMTAwMCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6YeR5biBMTAwMFwiLFxyXG4gICAgICAgICAgICBmdW5jOiAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLmNoYW5nZUdvbGQobnVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IDIsXHJcbiAgICAgICAgICAgIG51bTogNCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6ZSk5a2QNOS4qlwiLFxyXG4gICAgICAgICAgICBmdW5jOiAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcuaGFtbWVyTnVtID0gQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gKyBudW1cclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogMyxcclxuICAgICAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgICAgICB0aXRsZTogXCLmgbbprZQ15LiqXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0gPSBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSArIG51bVxyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaW5nRGF0YTc6IHNpZ25EYXRhU2V2ZW4gPSB7XHJcbiAgICAgICAgdHlwZTogWzEsIDIsIDNdLFxyXG4gICAgICAgIHRpdGxlOiBbXCLph5HluIExMDAwXCIsIFwi6ZSk5a2QMuS4qlwiLCBcIuaBtumtlDLkuKpcIl0sXHJcbiAgICAgICAgZnVuYzogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIFRvb2xzLmNoYW5nZUdvbGQoMTAwMCAqIG51bSlcclxuICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gKz0gMiAqIG51bVxyXG4gICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSArPSAyICogbnVtXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o+Q56S65pWw5o2uXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpbnRfZGF0YTogbmV4dEJsb2NrSW5mbyBbXSBbXSA9IFtcclxuICAgICAgICBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDEsXHJcbiAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogNixcclxuICAgICAgICAgICAgICAgIG51bTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDcsXHJcbiAgICAgICAgICAgICAgICBudW06IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDEsXHJcbiAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogNixcclxuICAgICAgICAgICAgICAgIG51bTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDcsXHJcbiAgICAgICAgICAgICAgICBudW06IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICBdXHJcbiAgICBwdWJsaWMgc3RhdGljIGdyYWRlX29mX2RpZmZpY3VsdHlfY29uZmlnOiBncmFkZV9vZl9kaWZmaWN1bHR5X2NvbmZpZyBbXSA9IFtcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiAyMCwgcHJvYmFiaWxpdHlfMjogMzAsIHByb2JhYmlsaXR5XzM6IDEwLCBwcm9iYWJpbGl0eV80OiAwfSxcclxuICAgICAgICAvLyB7cHJvYmFiaWxpdHlfMTogMTAwLCBwcm9iYWJpbGl0eV8yOiAwLCBwcm9iYWJpbGl0eV8zOiAwLCBwcm9iYWJpbGl0eV80OiAwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogNTAsIHByb2JhYmlsaXR5XzI6IDQwLCBwcm9iYWJpbGl0eV8zOiAyMCwgcHJvYmFiaWxpdHlfNDogMTB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiA0MCwgcHJvYmFiaWxpdHlfMjogNTAsIHByb2JhYmlsaXR5XzM6IDMwLCBwcm9iYWJpbGl0eV80OiAyMH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDQwLCBwcm9iYWJpbGl0eV8yOiA2MCwgcHJvYmFiaWxpdHlfMzogNDAsIHByb2JhYmlsaXR5XzQ6IDMwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogMzAsIHByb2JhYmlsaXR5XzI6IDcwLCBwcm9iYWJpbGl0eV8zOiA1MCwgcHJvYmFiaWxpdHlfNDogNDB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiAyMCwgcHJvYmFiaWxpdHlfMjogMzAsIHByb2JhYmlsaXR5XzM6IDYwLCBwcm9iYWJpbGl0eV80OiA2MH0sXHJcbiAgICAgICAgLy8ge3Byb2JhYmlsaXR5XzE6IDEwMCwgcHJvYmFiaWxpdHlfMjogMCwgcHJvYmFiaWxpdHlfMzogMCwgcHJvYmFiaWxpdHlfNDogMH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDUwLCBwcm9iYWJpbGl0eV8yOiA0MCwgcHJvYmFiaWxpdHlfMzogNzAsIHByb2JhYmlsaXR5XzQ6IDcwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogNDAsIHByb2JhYmlsaXR5XzI6IDUwLCBwcm9iYWJpbGl0eV8zOiA4MCwgcHJvYmFiaWxpdHlfNDogODB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiA0MCwgcHJvYmFiaWxpdHlfMjogNjAsIHByb2JhYmlsaXR5XzM6IDkwLCBwcm9iYWJpbGl0eV80OiA5MH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDMwLCBwcm9iYWJpbGl0eV8yOiA3MCwgcHJvYmFiaWxpdHlfMzogMTAwLCBwcm9iYWJpbGl0eV80OiAxMDB9LFxyXG4gICAgXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWcge1xyXG4gICAgcHJvYmFiaWxpdHlfMTogbnVtYmVyOyAgLy/kuIDkuKrmlrnlnZfmpoLnjodcclxuICAgIHByb2JhYmlsaXR5XzI6IG51bWJlcjsgIC8v5Lik5Liq5pa55Z2X5qaC546HXHJcbiAgICBwcm9iYWJpbGl0eV8zOiBudW1iZXI7ICAvL+S4ieS4quaWueWdl+amgueOh1xyXG4gICAgcHJvYmFiaWxpdHlfNDogbnVtYmVyOyAgLy/lm5vkuKrmlrnlnZfmpoLnjodcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBzaWduRGF0YSB7XHJcbiAgICB0eXBlOiBudW1iZXIgLy/nsbvlnotcclxuICAgIG51bTogbnVtYmVyICAvLyAyXHJcbiAgICB0aXRsZTogc3RyaW5nICAvL+S7i+e7jVxyXG4gICAgZnVuYzogRnVuY3Rpb24gIC8vaGFuZGxlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugc2lnbkRhdGFTZXZlbiB7XHJcbiAgICB0eXBlOiBudW1iZXJbXSAvL+exu+Wei1xyXG4gICAgdGl0bGU6IHN0cmluZ1tdICAvL+S7i+e7jVxyXG4gICAgZnVuYzogRnVuY3Rpb24gIC8vaGFuZGxlXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXFRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTRDO0FBQzVDLDRDQUF1QztBQUN2Qyw4Q0FBeUM7QUFDekMsa0RBQTZDO0FBQzdDLDRDQUF1QztBQUN2QyxzQ0FBaUM7QUFDakMsOENBQWtEO0FBQ2xELDREQUF1RDtBQUN2RCxJQUFPLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNqQyxrREFBNkM7QUFDN0MsbUNBQThCO0FBQzlCLHdEQUFtRDtBQUNuRCwwREFBcUQ7QUFDckQsc0RBQWlEO0FBQ2pELDhDQUF5QztBQUV6QztJQUFBO0lBdW5CQSxDQUFDO0lBcm5CaUIsWUFBTSxHQUFwQixVQUFxQixHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDL0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDbkM7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7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RSxDQUFBO1FBQ2xDLE9BQU87WUFDSCxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25HLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4RyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUcsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEgsQ0FBQTtJQUNMLENBQUM7SUFHRCxlQUFlO0lBQ0QscUJBQWUsR0FBN0IsVUFBOEIsS0FBVSxFQUFFLEdBQWU7UUFDckQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFB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b250ZW50IjpbImltcG9ydCBHbG9iYWwsIHtFeHBvcnREYXRhfSBmcm9tIFwiLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvYWRNZ3IgZnJvbSBcIi4vbWFuYWdlL0xvYWRNZ3JcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuL21hbmFnZS9DYWNoZU1nclwiO1xyXG5pbXBvcnQgR2FtZUxvZ01nciBmcm9tIFwiLi9tYW5hZ2UvR2FtZUxvZ01nclwiO1xyXG5pbXBvcnQgSml1V3VTREsgZnJvbSBcIi4uL1NESy9KaXVXdVNES1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vU2NlbmUvR2FtZVwiO1xyXG5pbXBvcnQgUGFuZWxNZ3IsIHtMYXllcn0gZnJvbSBcIi4vbWFuYWdlL1BhbmVsTWdyXCI7XHJcbmltcG9ydCBTaG9ydGFnZVZpZXcgZnJvbSBcIi4uL01vdWRsZS9WaWV3L1Nob3J0YWdlVmlld1wiO1xyXG5pbXBvcnQgaXNOdW1iZXIgPSBjYy5qcy5pc051bWJlcjtcclxuaW1wb3J0IFFnTmF0aXZlIGZyb20gXCIuL21hbmFnZS9BcGkvUWdOYXRpdmVcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi9Mb2dNZ3JcIjtcclxuaW1wb3J0IE5hdGl2ZVZpZXcgZnJvbSBcIi4uL01vdWRsZS9WaWV3L05hdGl2ZVZpZXdcIjtcclxuaW1wb3J0IFFnUmV3YXJkZWRBZCBmcm9tIFwiLi9tYW5hZ2UvQXBpL1FnUmV3YXJkZWRBZFwiO1xyXG5pbXBvcnQgUWdJbnRlcnNBZCBmcm9tIFwiLi9tYW5hZ2UvQXBpL1FnSW50ZXJzQWRcIjtcclxuaW1wb3J0IEF1ZGlvTWdyIGZyb20gXCIuL21hbmFnZS9BdWRpb01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHMge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3ViU3RyKHN0ciwgbikge1xyXG4gICAgICAgIGxldCByID0gL1teXFx4MDAtXFx4ZmZdL2c7XHJcbiAgICAgICAgaWYgKHN0ci5yZXBsYWNlKHIsIFwibW1cIikubGVuZ3RoIDw9IG4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG0gPSBNYXRoLmZsb29yKG4gLyAyKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc3RyLnN1YnN0cigwLCBpKS5yZXBsYWNlKHIsIFwibW1cIikubGVuZ3RoID49IG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIGkpICsgXCIuLi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55+t6ZyH5YqoXHJcbiAgICAgKiBsaWdodCAg6L276ZyH5YqoXHJcbiAgICAgKiBtZWRpdW0g5Lit6ZyH5YqoXHJcbiAgICAgKiBoZWF2eSAg6YeN6ZyH5YqoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdmlicmF0ZVNob3J0KHR5cGU6IHN0cmluZyA9ICdoZWF2eScsIG51bWJlcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCF3aW5kb3cucWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBudW1iZXI7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxZy52aWJyYXRlU2hvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnn63pnIfliqhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB2aWJyYXRlTG9uZygpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKCF3aW5kb3cucWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBxZy52aWJyYXRlTG9uZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5LiA5Liq5YC85piv5ZCm5Zyo5LiA5Liq5pWw57uE5LitXHJcbiAgICBwdWJsaWMgc3RhdGljIEp1ZGdlVmFsdWVJbkFycih2YWx1ZTogYW55LCBhcnI6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHmt7Hmi7fotJ1cclxuICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWVwQ2xvbmUob2JqKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbTmlbDpmo/mnLrlgLxcclxuICAgICAqIEBwYXJhbSBtYXhWYWx1ZVxyXG4gICAgICogQHJldHVybiBbMCwgbWF4KVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmRvbU1heChtYXhWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pWw57uE6ZqP5py65YC8XHJcbiAgICAgKiBAcGFyYW0gYXJyYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSYW5kb21CeUFycmF5KGFycmF5OiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbdGhpcy5nZXRSYW5kb21NYXgoYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBHYW1lTG9nTWdyLmVycm9yKCfojrflj5bmlbDnu4Tpmo/mnLrlgLzlvILluLgnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pW05pWw6ZqP5py65YC8XHJcbiAgICAgKiBAcGFyYW0gbWluVmFsdWVcclxuICAgICAqIEBwYXJhbSBtYXhWYWx1ZVxyXG4gICAgICogQHJldHVybiBbbWluLCBtYXgpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmFuZG9tKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VmFsdWUgLSBtaW5WYWx1ZSkgKyBtaW5WYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpmo/mnLrlgLxcclxuICAgICAqIEBwYXJhbSBtaW5WYWx1ZVxyXG4gICAgICogQHBhcmFtIG1heFZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIChtaW4sIG1heF1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZWFsUmFuZG9tKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heFZhbHVlIC0gbWluVmFsdWUpICsgbWluVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzb3J0KGFycjogYW55W10sIGJlZ2luOiBudW1iZXIgPSAwLCBlbmQ6IG51bWJlciA9IGFyci5sZW5ndGgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICBpZiAoZW5kIDw9IGJlZ2luKVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIGxldCBpID0gYmVnaW47XHJcbiAgICAgICAgbGV0IGogPSBlbmQ7XHJcbiAgICAgICAgbGV0IGtleSA9IGFycltiZWdpbl0uc29ydDtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaikgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2pdLnNvcnQgPCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbal0gPSBhcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2ldID0gdGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGotLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaikgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLnNvcnQgPiBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2pdID0gdGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSBqKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmQgLSBqID4gMSkge1xyXG4gICAgICAgICAgICBhcnIgPSBUb29scy5zb3J0KGFyciwgaiArIDEsIGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpIC0gYmVnaW4gPiAxKSB7XHJcbiAgICAgICAgICAgIGFyciA9IFRvb2xzLnNvcnQoYXJyLCBiZWdpbiwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv6vpgJ/mjpLluo/lr7zlh7rkv6Hmga86XHJcbiAgICAgKiBAcGFyYW0gYXJyIOmcgOimgei/m+ihjOW/q+mAn+aOkuW6j+eahOaVsOe7hFxyXG4gICAgICogQHJldHVybnMgeypbXXwqfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHF1aWNrRXhwb3J0U29ydChhcnI6IEV4cG9ydERhdGFbXSkge1xyXG4gICAgICAgIGFyci5zb3J0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChDYWNoZU1nci5lYXJseUV4cG9ydFRyaXBQYXJ0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGFycjIgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qdWRnZVZhbHVlSW5BcnIoYXJyW2ldLmFwcElkLCBDYWNoZU1nci5lYXJseUV4cG9ydFRyaXBQYXJ0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycjIucHVzaChUb29scy5kZWVwQ2xvbmUoYXJyW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcnIyW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUueWPmOiKgueCueS9jee9rueahCB5IOS4uiBiYW5uZXIg5L2N572u55qEIHkgKOmql+eCueeUqClcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hhbmdlTm9kZVBvc2l0aW9uKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgYmFubmVyID0gR2FtZS5JbnMuYmFubmVyO1xyXG4gICAgICAgIG5vZGUueSA9IGJhbm5lci55ICsgYmFubmVyLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDosIPmlbTmjInpkq7kvY3nva7liLAgYmFubmVy5LiK5pa5XHJcbiAgICAgKiBAcGFyYW0gYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0RXhwb3J0UG9zKGJ1dHRvbjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBiYW5uZXIgPSBHYW1lLklucy5iYW5uZXI7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VOb2RlUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICBidXR0b24ueSA9IGJ1dHRvbi55ICsgYmFubmVyLmhlaWdodCAvIDIgKyBidXR0b24uaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqpfngrnnu5PmnZ/np7vliqgg5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdGltZVxyXG4gICAgICogQHBhcmFtIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldEV4cG9ydFBvc19BbmltYXRpb24odGltZTogbnVtYmVyLCBidXR0b246IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgYmFubmVyID0gR2FtZS5JbnMuYmFubmVyXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VOb2RlUG9zaXRpb24oYnV0dG9uKTtcclxuICAgICAgICBjYy50d2VlbihidXR0b24pXHJcbiAgICAgICAgICAgIC50byh0aW1lLCB7eTogYnV0dG9uLnkgKyBiYW5uZXIuaGVpZ2h0IC8gMiArIGJ1dHRvbi5oZWlnaHQgLyAyfSwge2Vhc2luZzogXCJzbW9vdGhcIn0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat55m+5YiG5q+UXHJcbiAgICAgKiBAcGFyYW0gcGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tQZXIocGVyOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXBlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUb29scy5nZXRSYW5kb21NYXgoMTAwKSA8PSBwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/pk77mjqXlkI7lj7DvvIzotYTmupDliqDovb0sIOWIneWni+WMliBnYW1lQm94XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW9kZWxfaW5pdE1vZGVsKGY6IEZ1bmN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZnVuY3Rpb25zOiBGdW5jdGlvbltdID0gW1xyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZXMgPSBbXCJzdWJcIixcImhvbWVWaWV3XCIsXCJnYW1lVmlld1wiXVxyXG4gICAgICAgICAgICAgICAgTG9hZE1nci5sb2FkQnVuZGxlKG5hbWVzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGYoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uc1tpXSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmkq3mlL7op4bpopHvvIwgcmVzb2x2ZSDov5Tlm54gdHJ1ZSDkuLrojrflvpflpZblirHvvIwgZmFsc2Ug5Li65pyq6I635b6X5aWW5YqxXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGFuZGxlVmlkZW8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKGZhbHNlKSA7XHJcbiAgICAgICAgICAgIFFnUmV3YXJkZWRBZC5zaG93UmV3YXJkZWRWaWRlbygpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvb2xlYW4gOiBib29sZWFuID0gcmVzID09IDEgO1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKCkgO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShib29sZWFuKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5oiW5YWz6ZetIOeisOaSnuezu+e7n+WKn+iDvVxyXG4gICAgICogQHBhcmFtIGlzT3BlbiDnorDmkp7ns7vnu59cclxuICAgICAqIEBwYXJhbSBkcmF3IGRlYnVnIOe7mOWItlxyXG4gICAgICogQHBhcmFtIGJvdW5kaW5nIOWMheWbtOebklxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENvbGxpc2lvbihpc09wZW46IGJvb2xlYW4gPSB0cnVlLCBkcmF3OiBib29sZWFuID0gZmFsc2UsIGJvdW5kaW5nOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBNYW5hZ2VyLmVuYWJsZWQgPSBpc09wZW47XHJcbiAgICAgICAgTWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gZHJhdztcclxuICAgICAgICBNYW5hZ2VyLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSBib3VuZGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOaIluWFs+mXrSDniannkIbns7vnu59cclxuICAgICAqIEBwYXJhbSBpc09wZW5cclxuICAgICAqIEBwYXJhbSBkcmF3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGh5c2ljcyhpc09wZW46IGJvb2xlYW4gPSB0cnVlLCBkcmF3OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZHJhdykge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID1cclxuICAgICAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdFxyXG4gICAgICAgICAgICAgICAgfFxyXG4gICAgICAgICAgICAgICAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdFxyXG4gICAgICAgICAgICAgICAgfFxyXG4gICAgICAgICAgICAgICAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdFxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOazqOWGjOS4gOe7hCB0b3VjaCDkuovku7ZcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRcclxuICAgICAqIEBwYXJhbSBtb3ZlXHJcbiAgICAgKiBAcGFyYW0gZW5kXHJcbiAgICAgKiBAcGFyYW0gY2FuY2VsXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0gYm9vbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uVG91Y2hBbGwobm9kZTogY2MuTm9kZSwgc3RhcnQ6IEZ1bmN0aW9uLCBtb3ZlOiBGdW5jdGlvbiwgZW5kOiBGdW5jdGlvbiwgY2FuY2VsOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnksIGJvb2w6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHN0YXJ0LCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBtb3ZlLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGVuZCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBjYW5jZWwsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgc3RhcnQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBtb3ZlLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBlbmQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGNhbmNlbCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiKgueCueaJgOWcqOeItuiKgueCueeahOS4i+agh1xyXG4gICAgICogIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRyZW5JbmRleChub2RlOiBjYy5Ob2RlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyZW50LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+l5L2N572u5piv5ZCm5Zyo6IqC54K55LitXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg5L2N572uXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQb2ludEluTm9kZShwb2ludDogY2MuVmVjMiwgbm9kZTogY2MuTm9kZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmNvbnRhaW5zKHBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluavlOi+g+Wlh+aAqueahOaXtumXtOWtl+espuS4siDvvIjnibnlrprnmoTkuIDlpKkpIDIwMjEwMjAzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZV9nZXRUaW1lTnVtKGRhdGU6IERhdGUpIHtcclxuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Lik5Liq5pe26Ze055qE5pe26Ze05beuXHJcbiAgICAgKiBAcGFyYW0gc3RhcnQxICAg5q+U6L6D6Z2g5ZCO55qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gc3RhcnQyICAg5q+U6L6D6Z2g5YmN55qE5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gdHlwZSAgICAg6I635Y+W55qE5pe26Ze05beu57G75Z6LICAwIGRheSAgMSBob3VyIDIgbWludXRlciAzIHNlY29uZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVfZ2V0VGltZURpZmZlcmVuY2Uoc3RhcnQxOiBEYXRlIHwgbnVtYmVyLCBzdGFydDI6IERhdGUgfCBudW1iZXIsIHR5cGU6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgaWYgKGlzTnVtYmVyKHN0YXJ0MSkpIHtcclxuICAgICAgICAgICAgc3RhcnQxID0gbmV3IERhdGUoc3RhcnQxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOdW1iZXIoc3RhcnQyKSkge1xyXG4gICAgICAgICAgICBzdGFydDIgPSBuZXcgRGF0ZShzdGFydDIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhcnQxIGluc3RhbmNlb2YgRGF0ZSAmJiBzdGFydDIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHN0YXJ0MS5nZXRUaW1lKCkgLSBzdGFydDIuZ2V0VGltZSgpOyAvL+aXtumXtOW3ruenklxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5mbG9vcihkaXN0YW5jZSAvICgyNCAqIDYwICogNjAgKiAxMDAwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlX3JlYWw6IGRpc3RhbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoNjAgKiA2MCAqIDEwMDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VfcmVhbDogZGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5mbG9vcihkaXN0YW5jZSAvICg2MCAqIDEwMDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VfcmVhbDogZGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAzICA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoMTAwMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZV9yZWFsOiBkaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3kuLvmnLrlnLDlnYBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIb3N0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEppdVd1U0RLLnVybC5ob3N0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiA5Liq55+p5b2iIO+8jOWIm+W7uuS4gOS4quiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vZGVGb3JSZWN0KHJlY3Q6IGNjLlJlY3QpOiBjYy5Ob2RlIHtcclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS53aWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgbm9kZS5oZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYzKHJlY3QuY2VudGVyKSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDkuKroioLngrnlm5vkuKrngrnnmoTkvY3nva4gKOacque7j+aXi+i9rCDov5nnp43mk43kvZzvvIlcclxuICAgICAqIEBwYXJhbSBub2RlXHJcbiAgICAgKi9cclxuICAgIC8v6I635Y+W5LiA5Liq6IqC54K55Zub5Liq54K555qE5L2N572uICjmnKrnu4/ml4vovawg6L+Z56eN5pON5L2c77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vZGVGb3VyUG9pbnQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBhbmNob3IgPSBub2RlLmdldEFuY2hvclBvaW50KClcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZWZ0X2Rvd246IGNjLnYyKG5vZGUucG9zaXRpb24ueCAtIGFuY2hvci54ICogbm9kZS53aWR0aCwgbm9kZS5wb3NpdGlvbi55IC0gYW5jaG9yLnkgKiBub2RlLmhlaWdodCksXHJcbiAgICAgICAgICAgIGxlZnRfdG9wOiBjYy52Mihub2RlLnBvc2l0aW9uLnggLSBhbmNob3IueCAqIG5vZGUud2lkdGgsIG5vZGUucG9zaXRpb24ueSArICgxIC0gYW5jaG9yLnkpICogbm9kZS5oZWlnaHQpLFxyXG4gICAgICAgICAgICByaWdodF9kb3duOiBjYy52Mihub2RlLnBvc2l0aW9uLnggKyAoMSAtIGFuY2hvci54KSAqIG5vZGUud2lkdGgsIG5vZGUucG9zaXRpb24ueSAtIGFuY2hvci55ICogbm9kZS5oZWlnaHQpLFxyXG4gICAgICAgICAgICByaWdodF90b3A6IGNjLnYyKG5vZGUucG9zaXRpb24ueCArICgxIC0gYW5jaG9yLngpICogbm9kZS53aWR0aCwgbm9kZS5wb3NpdGlvbi55ICsgKDEgLSBhbmNob3IueSkgKiBub2RlLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pat5LiA5Liq5YC85piv5ZCm5Zyo5LiA5Liq5pWw57uE5LitXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlVmFsdWVJbkFycih2YWx1ZTogYW55LCBhcnI6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pat5Lik5Liq5pWw57uE5piv5ZCm55u45LqkXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlQXJyYXlTYW1lKGFycjE6IG51bWJlcltdLCBhcnIyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIGxldCBmbGFnID0gZmFsc2VcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyMVtpXSA9PSBhcnIyW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vYmFubmVy5qC55o2u6IqC54K56YCC6YWNXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJlYWxTaXplKG5vZGU6IGNjLk5vZGUsIHJlc2l6ZV93aWR0aCA9IG51bGwsIHJlc2l6ZV9oZWlnaHQgPSBudWxsKToge1xyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgbGVmdDogbnVtYmVyLFxyXG4gICAgICAgIHRvcDogbnVtYmVyXHJcbiAgICB9IHtcclxuICAgICAgICAvL+iOt+WPluWxj+W5leiuvuiuoeWwuuWvuFxyXG4gICAgICAgIGxldCBjYW52YXMgPSBub2RlLnBhcmVudFxyXG4gICAgICAgIGxldCBzaXplID0gY2FudmFzLmdldENvbnRlbnRTaXplKClcclxuICAgICAgICBsZXQgZGF0YSA9IFRvb2xzLmdldE5vZGVGb3VyUG9pbnQoY2FudmFzKVxyXG4gICAgICAgIGxldCBwYyA9IGRhdGEubGVmdF90b3Auc3ViKGNjLnYyKFRvb2xzLmdldE5vZGVGb3VyUG9pbnQobm9kZSkubGVmdF90b3ApKVxyXG4gICAgICAgIGxldCBzY3JlZW4gPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xyXG4gICAgICAgIGxldCBzY2FsZVggPSBzY3JlZW4ud2lkdGggLyBzaXplLndpZHRoXHJcbiAgICAgICAgbGV0IHNjYWxlWSA9IHNjcmVlbi5oZWlnaHQgLyBzaXplLmhlaWdodFxyXG5cclxuICAgICAgICBpZiAocmVzaXplX3dpZHRoICYmIHJlc2l6ZV9oZWlnaHQpIHtcclxuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHJlc2l6ZV93aWR0aCAvIHNjYWxlWFxyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IHJlc2l6ZV9oZWlnaHQgLyBzY2FsZVlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzY2FsZVhcIiwgc2NhbGVYLCBcInNjYWxlWVwiLCBzY2FsZVkpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IG5vZGUud2lkdGggKiBzY2FsZVgsXHJcbiAgICAgICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHQgKiBzY2FsZVksXHJcbiAgICAgICAgICAgIGxlZnQ6IC1wYy54ICogc2NhbGVYLFxyXG4gICAgICAgICAgICB0b3A6IHBjLnkgKiBzY2FsZVksXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55L2T5YqbIO+8jCDlpoLmnpzkvZPlipvkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuuS9k+WKm+S4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bSDpnIDopoHmlLnliqjnmoTkvZPliptcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoYW5nZVN0YW1pbmEobnVtOiBudW1iZXIsIGNhbGxCYWNrPzogRnVuY3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc3RhbWluYSArIG51bSA8IDApIHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbDogU2hvcnRhZ2VWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGFtaW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiBNYXRoLmFicyhudW0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENhY2hlTWdyLnN0YW1pbmEgPSBDYWNoZU1nci5zdGFtaW5hICsgbnVtO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56YeR5biBIO+8jCDlpoLmnpzph5HluIHkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuumHkeW4geS4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bVxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrICAg5oiQ5Yqf5Zue6LCDIO+8iOWMheaLrOmihuWPlumHkeW4geaIkOWKn++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoYW5nZUdvbGQobnVtOiBudW1iZXIsIGNhbGxCYWNrPzogRnVuY3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQ2FjaGVNZ3IuZ29sZCArIG51bSA8IDApIHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbDogU2hvcnRhZ2VWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJnb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiBNYXRoLmFicyhudW0pLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ2FjaGVNZ3IuZ29sZCA9IENhY2hlTWdyLmdvbGQgKyBudW1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5L2T5YqbIO+8jCDlpoLmnpzkvZPlipvkuI3otrMg77yM5L+u5pS55aSx6LSl55qE6K+dIO+8jOS8muiHquWKqOW8ueWHuuS9k+WKm+S4jei2s+ahhlxyXG4gICAgICogQHBhcmFtIG51bSDpnIDopoHmlLnliqjnmoTkvZPliptcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlU3RhbWluYShudW06IG51bWJlciwgY2FsbEJhY2s/OiBGdW5jdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChDYWNoZU1nci5zdGFtaW5hICsgbnVtIDwgMCkge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsOiBTaG9ydGFnZVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXllcjogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YW1pbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYWxsQmFjazogY2FsbEJhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDAsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3ph5HluIEg77yMIOWmguaenOmHkeW4geS4jei2syDvvIzkv67mlLnlpLHotKXnmoTor50g77yM5Lya6Ieq5Yqo5by55Ye66YeR5biB5LiN6Laz5qGGXHJcbiAgICAgKiBAcGFyYW0gbnVtXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sgICDmiJDlip/lm57osIMg77yI5YyF5ous6aKG5Y+W6YeR5biB5oiQ5Yqf77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMganVkZ2VHb2xkKG51bTogbnVtYmVyLCBjYWxsQmFjaz86IEZ1bmN0aW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKENhY2hlTWdyLmdvbGQgKyBudW0gPCAwKSB7XHJcbiAgICAgICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgcGFuZWw6IFNob3J0YWdlVmlldyxcclxuICAgICAgICAgICAgICAgIGxheWVyOiBMYXllci5nYW1lTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZ29sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxCYWNrOiBjYWxsQmFjayxcclxuICAgICAgICAgICAgICAgICAgICBwcmljZTogbnVtLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3suefpeWchuW/g++8jOWNiuW+hO+8jOinkuW6pu+8jOaxguWchuS4iueahOeCueWdkOaghyAo5Z2Q5qCH6ZyA6KaB6Ieq5bex6L2sKVxyXG4gICAgICogQHBhcmFtIGNlbnRlclxyXG4gICAgICogQHBhcmFtIHJcclxuICAgICAqIEBwYXJhbSBhbmdsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENpcmNsZVBvaW50KGNlbnRlcjogY2MuVmVjMywgcjogbnVtYmVyLCBhbmdsZTogbnVtYmVyKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYzKFxyXG4gICAgICAgICAgICBjZW50ZXIueCArIHIgKiBNYXRoLmNvcyhhbmdsZSAqIDMuMTQgLyAxODApLFxyXG4gICAgICAgICAgICBjZW50ZXIueSArIHIgKiBNYXRoLnNpbihhbmdsZSAqIDMuMTQgLyAxODApXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaGFuZGxlckludGVycygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUWdJbnRlcnNBZC5zaG93SW50ZXJzKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreWOn+eUn+W5v+WRiuaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dOYXRpdmUodHlwZSwgbGFiZWxUeXBlLCB0aW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChRZ05hdGl2ZS5uYXRpdmVNZXNzYWdlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFFnTmF0aXZlLmxvYWROYXRpdmUoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcihcIuWOn+eUn+W5v+WRiuaLieWPluWksei0pS4uLi4uLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsOiBOYXRpdmVWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXI6IExheWVyLm5hdGl2ZUxheWVyLFxyXG4gICAgICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogbGFiZWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHRpbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/AudioMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1f55Ux+bxKBL58UPq/GXsh', 'AudioMgr');
// Script/Common/manage/AudioMgr.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./GameLogMgr");
var CacheMgr_1 = require("./CacheMgr");
var LoadMgr_1 = require("./LoadMgr");
var ccclass = cc._decorator.ccclass;
var AudioMgr = /** @class */ (function () {
    function AudioMgr() {
    }
    /**
     * @param isStop
     */
    AudioMgr.backMusic = function (isStop) {
        if (isStop === void 0) { isStop = true; }
        if (CacheMgr_1.default.setting.setting.music === 0) {
            cc.audioEngine.stopMusic();
        }
        else if (!isStop) {
            cc.audioEngine.stopMusic();
        }
        else if (!cc.audioEngine.isMusicPlaying()) {
            LoadMgr_1.default.load_AudioClip("bg").then(function (audio) {
                cc.audioEngine.playMusic(audio, true);
                cc.audioEngine.setMusicVolume(CacheMgr_1.default.setting.setting.music);
            });
        }
    };
    AudioMgr.play = function (url, max, loop) {
        if (max === void 0) { max = 1; }
        if (loop === void 0) { loop = false; }
        return new Promise(function (resolve, reject) {
            if (CacheMgr_1.default.setting.setting.audio === 0) {
                GameLogMgr_1.default.warn(" 当前音量静音 ");
                resolve(false);
            }
            LoadMgr_1.default.load_AudioClip(url).then(function (audio) {
                var id = 0;
                cc.audioEngine.setEffectsVolume(max * CacheMgr_1.default.setting.setting.audio);
                id = cc.audioEngine.playEffect(audio, loop);
                resolve(id);
            });
            // Global.bundleList.audio.load(url, cc.AudioClip, (err: Error, audio: cc.AudioClip) => {
            //     if (err) {
            //         GameLog.error(' 音效播放错误 ', url);
            //         reject(false);
            //     }
            //     let id: number = 0;
            //     cc.audioEngine.setEffectsVolume(max * CacheMgr.setting.setting.audio);
            //     id = cc.audioEngine.playEffect(audio, loop)
            //     resolve(id);
            // });
        });
    };
    AudioMgr = __decorate([
        ccclass
    ], AudioMgr);
    return AudioMgr;
}());
exports.default = AudioMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXVkaW9NZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSwyQ0FBbUM7QUFDbkMsdUNBQWtDO0FBQ2xDLHFDQUFnQztBQUV6QixJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUdoQztJQUFBO0lBNENBLENBQUM7SUExQ0c7O09BRUc7SUFDVyxrQkFBUyxHQUF2QixVQUF3QixNQUFhO1FBQWIsdUJBQUEsRUFBQSxhQUFhO1FBQ2pDLElBQUksa0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDdEMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3pDLGlCQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQW1CO2dCQUNsRCxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVhLGFBQUksR0FBbEIsVUFBbUIsR0FBVyxFQUFFLEdBQWUsRUFBRSxJQUFxQjtRQUF0QyxvQkFBQSxFQUFBLE9BQWU7UUFBRSxxQkFBQSxFQUFBLFlBQXFCO1FBQ2xFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixJQUFJLGtCQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxvQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsaUJBQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBbUI7Z0JBQ2pELElBQUksRUFBRSxHQUFXLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7WUFFRix5RkFBeUY7WUFDekYsaUJBQWlCO1lBQ2pCLDBDQUEwQztZQUMxQyx5QkFBeUI7WUFDekIsUUFBUTtZQUNSLDBCQUEwQjtZQUMxQiw2RUFBNkU7WUFDN0Usa0RBQWtEO1lBQ2xELG1CQUFtQjtZQUNuQixNQUFNO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0NnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNEM1QjtJQUFELGVBQUM7Q0E1Q0QsQUE0Q0MsSUFBQTtrQkE1Q29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6Z+z5LmQ566h55CG5ZmoXHJcbiAqL1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9HbG9iYWxcIjtcclxuaW1wb3J0IEdhbWVMb2cgZnJvbSBcIi4vR2FtZUxvZ01nclwiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4vQ2FjaGVNZ3JcIjtcclxuaW1wb3J0IExvYWRNZ3IgZnJvbSBcIi4vTG9hZE1nclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3N9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWdyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBpc1N0b3BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiYWNrTXVzaWMoaXNTdG9wID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLnNldHRpbmcubXVzaWMgPT09IDApIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghaXNTdG9wKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgTG9hZE1nci5sb2FkX0F1ZGlvQ2xpcChcImJnXCIpLnRoZW4oKGF1ZGlvOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhhdWRpbywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZShDYWNoZU1nci5zZXR0aW5nLnNldHRpbmcubXVzaWMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5KHVybDogc3RyaW5nLCBtYXg6IG51bWJlciA9IDEsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLnNldHRpbmcuYXVkaW8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIEdhbWVMb2cud2FybihcIiDlvZPliY3pn7Pph4/pnZnpn7MgXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIExvYWRNZ3IubG9hZF9BdWRpb0NsaXAodXJsKS50aGVuKChhdWRpbzogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKG1heCAqIENhY2hlTWdyLnNldHRpbmcuc2V0dGluZy5hdWRpbyk7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW8sIGxvb3ApXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlkKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5idW5kbGVMaXN0LmF1ZGlvLmxvYWQodXJsLCBjYy5BdWRpb0NsaXAsIChlcnI6IEVycm9yLCBhdWRpbzogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZUxvZy5lcnJvcignIOmfs+aViOaSreaUvumUmeivryAnLCB1cmwpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgaWQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKG1heCAqIENhY2hlTWdyLnNldHRpbmcuc2V0dGluZy5hdWRpbyk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW8sIGxvb3ApXHJcbiAgICAgICAgICAgIC8vICAgICByZXNvbHZlKGlkKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09dc9O+/1xHuLxuoXl8x+Mz', 'Global');
// Script/Common/Global.ts

"use strict";
/**
 * 全局变量
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.isVivo = false;
    Global.fromAppId = '';
    Global.config = {
        homeConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        gameConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        endConfig: {
            startVideo: 1,
            videoPer: 100,
            startNative: 1,
            nativePer: 100,
            nativeConfig: {
                type: 1,
                labelType: 1,
                time: 0
            },
            startIntersAd: 1,
            intersAdPer: 100,
            bannerShow: 1,
        },
        advertisingConfig: {
            rewardedVideoAdId: [
                "180d657c8ca14c4ea2089385ab85cc4c"
            ],
            interstitialAdId: [
                "e1a55af9ad0240d58063373c019eac8b"
            ],
            bannerAdId: [
                "e3c3b01217a843fe8c695ec0ad053ed8"
            ],
            nativeAdId: [
                "d8bfb3dc126748388d86311af35c4d00"
            ]
        },
        gameInfo: {
            animation: 0.5,
            maxStamina: 10,
            autoAddStaminaTime: 1,
            autoAddStaminaNum: 1
        },
        addInfo: {
            gold: 100,
            diamond: 2,
            stamina: 2
        },
        bannerRefreshTime: 10,
        isLog: 1,
    };
    return Global;
}());
exports.default = Global;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXEdsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7O0FBRUg7SUFBQTtJQWdGQSxDQUFDO0lBL0VpQixhQUFNLEdBQUcsS0FBSyxDQUFDO0lBTWYsZ0JBQVMsR0FBVyxFQUFFLENBQUM7SUFFdkIsYUFBTSxHQUFHO1FBQ25CLFVBQVUsRUFBRTtZQUNSLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELFVBQVUsRUFBRTtZQUNSLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLFVBQVUsRUFBRSxDQUFDO1lBQ2IsUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxhQUFhLEVBQUUsQ0FBQztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUNELGlCQUFpQixFQUFFO1lBQ2YsaUJBQWlCLEVBQUU7Z0JBQ2Ysa0NBQWtDO2FBQ3JDO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2Qsa0NBQWtDO2FBQ3JDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLGtDQUFrQzthQUNyQztZQUNELFVBQVUsRUFBRTtnQkFDUixrQ0FBa0M7YUFDckM7U0FDSjtRQUNELFFBQVEsRUFBRTtZQUNOLFNBQVMsRUFBRSxHQUFHO1lBQ2QsVUFBVSxFQUFFLEVBQUU7WUFDZCxrQkFBa0IsRUFBRSxDQUFDO1lBQ3JCLGlCQUFpQixFQUFFLENBQUM7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsR0FBRztZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELGlCQUFpQixFQUFFLEVBQUU7UUFDckIsS0FBSyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBQ04sYUFBQztDQWhGRCxBQWdGQyxJQUFBO2tCQWhGb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlhajlsYDlj5jph49cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iYWwge1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1Zpdm8gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFsbERhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbmZpZ0RhdGE6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21BcHBJZDogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb25maWcgPSB7XHJcbiAgICAgICAgaG9tZUNvbmZpZzoge1xyXG4gICAgICAgICAgICBzdGFydFZpZGVvOiAxLFxyXG4gICAgICAgICAgICB2aWRlb1BlcjogMTAwLFxyXG4gICAgICAgICAgICBzdGFydE5hdGl2ZTogMSxcclxuICAgICAgICAgICAgbmF0aXZlUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIG5hdGl2ZUNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHRpbWU6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhcnRJbnRlcnNBZDogMSxcclxuICAgICAgICAgICAgaW50ZXJzQWRQZXI6IDEwMCxcclxuICAgICAgICAgICAgYmFubmVyU2hvdzogMSwgLy/mmK/lkKbmmL7npLpCYW5uZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhbWVDb25maWc6IHtcclxuICAgICAgICAgICAgc3RhcnRWaWRlbzogMSxcclxuICAgICAgICAgICAgdmlkZW9QZXI6IDEwMCxcclxuICAgICAgICAgICAgc3RhcnROYXRpdmU6IDEsXHJcbiAgICAgICAgICAgIG5hdGl2ZVBlcjogMTAwLFxyXG4gICAgICAgICAgICBuYXRpdmVDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBsYWJlbFR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJzQWQ6IDEsXHJcbiAgICAgICAgICAgIGludGVyc0FkUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIGJhbm5lclNob3c6IDEsIC8v5piv5ZCm5pi+56S6QmFubmVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmRDb25maWc6IHtcclxuICAgICAgICAgICAgc3RhcnRWaWRlbzogMSxcclxuICAgICAgICAgICAgdmlkZW9QZXI6IDEwMCxcclxuICAgICAgICAgICAgc3RhcnROYXRpdmU6IDEsXHJcbiAgICAgICAgICAgIG5hdGl2ZVBlcjogMTAwLFxyXG4gICAgICAgICAgICBuYXRpdmVDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBsYWJlbFR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJzQWQ6IDEsXHJcbiAgICAgICAgICAgIGludGVyc0FkUGVyOiAxMDAsXHJcbiAgICAgICAgICAgIGJhbm5lclNob3c6IDEsIC8v5piv5ZCm5pi+56S6QmFubmVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZHZlcnRpc2luZ0NvbmZpZzoge1xyXG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWRJZDogW1xyXG4gICAgICAgICAgICAgICAgXCIxODBkNjU3YzhjYTE0YzRlYTIwODkzODVhYjg1Y2M0Y1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkSWQ6IFtcclxuICAgICAgICAgICAgICAgIFwiZTFhNTVhZjlhZDAyNDBkNTgwNjMzNzNjMDE5ZWFjOGJcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBiYW5uZXJBZElkOiBbXHJcbiAgICAgICAgICAgICAgICBcImUzYzNiMDEyMTdhODQzZmU4YzY5NWVjMGFkMDUzZWQ4XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbmF0aXZlQWRJZDogW1xyXG4gICAgICAgICAgICAgICAgXCJkOGJmYjNkYzEyNjc0ODM4OGQ4NjMxMWFmMzVjNGQwMFwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogMC41LFxyXG4gICAgICAgICAgICBtYXhTdGFtaW5hOiAxMCxcclxuICAgICAgICAgICAgYXV0b0FkZFN0YW1pbmFUaW1lOiAxLFxyXG4gICAgICAgICAgICBhdXRvQWRkU3RhbWluYU51bTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkSW5mbzoge1xyXG4gICAgICAgICAgICBnb2xkOiAxMDAsXHJcbiAgICAgICAgICAgIGRpYW1vbmQ6IDIsXHJcbiAgICAgICAgICAgIHN0YW1pbmE6IDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhbm5lclJlZnJlc2hUaW1lOiAxMCwgLy9iYW5uZXLliLfmlrDml7bpl7Qg77yI5Y2V5L2N77ya56eSL3PvvIzigJzmnIDlsI8gMzDigJ3vvIlcclxuICAgICAgICBpc0xvZzogMSwgLy9sb2cgIDAgOiDkuI1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlr7zlh7rmlbDmja5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0RGF0YSB7XHJcbiAgICBhcHBJZDogc3RyaW5nIC8vIGFwcElEXHJcbiAgICBpZDogbnVtYmVyIC8vIOWQjuWPsOWvvOWHuklEXHJcbiAgICBhZEltZzogc3RyaW5nIC8vIOW5v+WRiuWbvlVSTFxyXG4gICAgZXhwb3J0U3JjOiBzdHJpbmcgLy8g5a+85Ye66Lev5YqyXHJcbiAgICBnYW1lT3JpZ2luSWQ6IG51bWJlciAvLyDljp/muLjmiI9JRFxyXG4gICAgZ2FtZVRhcmdldElkOiBudW1iZXJcclxuICAgIGdhbWVUYXJnZXROYW1lOiBzdHJpbmcgLy8g5YiG5Lqr5ri45oiP5ZCN56ewXHJcbiAgICBpY29uSW1nOiBzdHJpbmdcclxuICAgIGlzTGlrZTogbnVtYmVyXHJcbiAgICBpc09mZmxpbmU6IG51bWJlclxyXG4gICAgaXNQb3B1bGFyOiBudW1iZXJcclxuICAgIHNvcnQ6IG51bWJlclxyXG4gICAgaXNUcmlwYXJ0OiBudW1iZXJcclxuICAgIHBhZ2VUeXBlOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVSUNvbmZpZyB7XHJcbiAgICBiYW5uZXJfcHJvYmFiaWxpdHk6IG51bWJlciwgICAgLy9iYW5uZXIg5pi+56S65qaC546HXHJcbiAgICBnYW1lQm94X3Byb2JhYmlsaXR5OiBudW1iZXIsICAvL2dhbWVCb3gg5pi+56S65qaC546HXHJcbiAgICBjaGVzdF9wcm9iYWJpbGl0eTogbnVtYmVyLCAgIC8v6K+v6Kem5a6d566xXHJcbiAgICBpbnNlcnRfcHJvYmFiaWxpdHk6IG51bWJlciwgIC8v5o+S5bGPXHJcbiAgICB2aWRlb19wcm9iYWJpbGl0eTogbnVtYmVyLCAgIC8vIOW8uuaLieinhumikVxyXG4gICAgZXhwb3J0X3Nob3c6IG51bWJlcltdLCAgICAgIC8v5pi+56S65pe25YCZ55qE5a+85Ye6XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgIntersAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b70eaGfrLZBlJ9Qn43+9fKr', 'QgIntersAd');
// Script/Common/manage/Api/QgIntersAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgIntersAd = /** @class */ (function () {
    function QgIntersAd() {
    }
    /**
     * 创建插屏
     */
    QgIntersAd.createInters = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建插屏');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.interstitialAdId);
            if (!unitId) {
                LogMgr_1.default.error('插屏Id获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.initInterstitialAd = window.qg.createInterstitialAd({ adUnitId: unitId });
            _this.initInterstitialAd.onError(function (err) {
                LogMgr_1.default.error('插屏错误onError:', err);
            });
            _this.initInterstitialAd.onLoad(function (res) {
                _this.isLoad_Inters = true;
                LogMgr_1.default.log('插屏广告加载完成-onload触发', JSON.stringify(res));
            });
            _this.initInterstitialAd.onClose(function () {
                _this.isLoad_Inters = false;
                LogMgr_1.default.log('插屏关闭>>>>>>');
                _this.createInters().then();
            });
            resolve(true);
        });
    };
    /**
     * 展示插屏
     */
    QgIntersAd.showInters = function () {
        if (!this.isLoad_Inters || !this.initInterstitialAd) {
            LogMgr_1.default.error('插屏加载中......', this.isLoad_Inters, 'rewardedAd:', this.initInterstitialAd);
            this.createInters().then().catch();
            return;
        }
        this.initInterstitialAd.show().then(function () {
        }).catch(function (err) {
            LogMgr_1.default.error('插屏广告展示失败', JSON.stringify(err));
        });
    };
    QgIntersAd.isLoad_Inters = false;
    return QgIntersAd;
}());
exports.default = QgIntersAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0ludGVyc0FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLHVDQUFrQztBQUNsQyx1Q0FBa0M7QUFFbEM7SUFBQTtJQThEQSxDQUFDO0lBekRHOztPQUVHO0lBQ1csdUJBQVksR0FBMUI7UUFBQSxpQkFvQ0M7UUFuQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRS9CLElBQUksQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFO2dCQUNmLE9BQU07YUFDVDtZQUVELElBQUksTUFBTSxHQUFHLGVBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFBO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUU7Z0JBQ2YsT0FBTTthQUNUO1lBRUQsYUFBYTtZQUNiLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFN0UsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ2hDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQTtZQUVGLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO2dCQUMvQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFBO1lBRUYsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLGdCQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFFO2dCQUMxQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUU7WUFDaEMsQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDVyxxQkFBVSxHQUF4QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2pELGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUU7WUFDcEMsT0FBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztRQUVwQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUExRGEsd0JBQWEsR0FBWSxLQUFLLENBQUM7SUEyRGpELGlCQUFDO0NBOURELEFBOERDLElBQUE7a0JBOURvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0ludGVyc0FkIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbml0SW50ZXJzdGl0aWFsQWQ6IGFueTsgLy/mj5LlsY/lr7nosaFcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNMb2FkX0ludGVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65o+S5bGPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlSW50ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pIHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign5b2T5YmN6Z2edml2b+W5s+WPsO+8jOaXoOazleWIm+W7uuaPkuWxjycpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHVuaXRJZCA9IFRvb2xzLmdldFJhbmRvbUJ5QXJyYXkoR2xvYmFsLmNvbmZpZy5hZHZlcnRpc2luZ0NvbmZpZy5pbnRlcnN0aXRpYWxBZElkKTtcclxuICAgICAgICAgICAgaWYgKCF1bml0SWQpIHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign5o+S5bGPSWTojrflj5blpLHotKXvvJonICsgdW5pdElkKVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLmluaXRJbnRlcnN0aXRpYWxBZCA9IHdpbmRvdy5xZy5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7YWRVbml0SWQ6IHVuaXRJZH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyKSA9PiB7IC8v55uR5ZCs5o+S5bGP6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+aPkuWxj+mUmeivr29uRXJyb3I6JywgZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEludGVyc3RpdGlhbEFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZF9JbnRlcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5o+S5bGP5bm/5ZGK5Yqg6L295a6M5oiQLW9ubG9hZOinpuWPkScsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQub25DbG9zZSgoKSA9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX0ludGVycyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5o+S5bGP5YWz6ZetPj4+Pj4+JykgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnMoKS50aGVuKCkgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLrmj5LlsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaG93SW50ZXJzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRfSW50ZXJzIHx8ICF0aGlzLmluaXRJbnRlcnN0aXRpYWxBZCkge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+aPkuWxj+WKoOi9veS4rS4uLi4uLicsdGhpcy5pc0xvYWRfSW50ZXJzLCdyZXdhcmRlZEFkOicsdGhpcy5pbml0SW50ZXJzdGl0aWFsQWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVycygpLnRoZW4oKS5jYXRjaCgpIDtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRJbnRlcnN0aXRpYWxBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfmj5LlsY/lub/lkYrlsZXnpLrlpLHotKUnLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SDK/JiuWuSDK.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '836feHm5g1MJIqJTju0KlY0', 'JiuWuSDK');
// Script/SDK/JiuWuSDK.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../Common/Tools");
var Global_1 = require("../Common/Global");
var QgApi_1 = require("../Common/manage/Api/QgApi");
var LogMgr_1 = require("../Common/LogMgr");
var CacheMgr_1 = require("../Common/manage/CacheMgr");
var JiuWuSDK = /** @class */ (function () {
    function JiuWuSDK() {
    }
    JiuWuSDK.inSet_API_Config = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.login().then(function () {
                _this.register().then(function (data) {
                    Global_1.default.allData = data;
                    var gmsUser = Global_1.default.allData.data.data.gmsUser;
                    CacheMgr_1.default.userId = gmsUser.userId;
                    CacheMgr_1.default.openId = gmsUser.openId;
                    CacheMgr_1.default.isAuth = gmsUser.isAuth;
                    // @ts-ignore
                    Global_1.default.config = JSON.parse(Global_1.default.allData.data.data.versionMode);
                    QgApi_1.default.createAdv();
                    LogMgr_1.default.log('一切就绪......');
                    _this.initSDK = true;
                    resolve(true);
                }, function () {
                    LogMgr_1.default.error('就绪失败......');
                });
            });
        });
    };
    /**
     * 后台 注册或者登录
     */
    JiuWuSDK.register = function () {
        var _this = this;
        try {
            return new Promise(function (resolve, reject) {
                console.log('准备发送请求......');
                var param = Object(null);
                console.log('发送请求中......A');
                param.url = Tools_1.default.getHost() + '/api/login/loginsum';
                console.log('发送请求中......B');
                param.data = {
                    code: _this.qgToken,
                    gameId: _this.gameInfo.gameId,
                    sceneVal: undefined,
                    exportId: undefined,
                    version: _this.gameInfo.gameVersion,
                };
                console.log('发送请求中......C');
                param.method = 'POST';
                param.header = _this.headers();
                param.header['content-type'] = 'application/json';
                param.success = function (res) {
                    if (res.data.code === 200) {
                        console.log('后台登录注册成功：', res);
                        resolve(res);
                    }
                    else {
                        console.error('登录错误：', res);
                        reject(res);
                    }
                };
                param.fail = function (err) {
                    console.error('发送请求失败：', err);
                };
                console.log('发送请求中......D');
                QgApi_1.default.sponsorHttps(param);
            });
        }
        catch (e) {
            console.error('后台登录错误:', e);
        }
    };
    /**
     * 登录vivo
     */
    JiuWuSDK.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                QgApi_1.default.login().then(function (token) {
                    if (token != false) {
                        _this.qgToken = token;
                        resolve(true);
                    }
                }, function () {
                    console.error('登录失败');
                });
            }
            catch (e) {
                console.log(' login error', e);
            }
        });
    };
    JiuWuSDK.headers = function () {
        return {
            'x-client': this.gameInfo.client,
            'x-token': this.gameInfo.token
        };
    };
    JiuWuSDK.qgToken = null;
    JiuWuSDK.initSDK = false;
    JiuWuSDK.url = {
        test: "https://api.jiuwugame.cn",
        host: "https://api.jiuwugame.cn",
    };
    JiuWuSDK.gameInfo = {
        gameId: 125,
        gameVersion: "20211026",
        client: '95e7b3d7beceea9a7b85a3235892e728',
        token: '$2a$10$gjXXqXHT85QpdRZSsS8QZuu6AnI5hJL/ZzyJ8yzMCit2ii7RhGd.W',
    };
    JiuWuSDK.launchData = {
        scene: '',
        query: null,
        shareTicket: '',
        referrerInfo: {
            appId: '',
            extraData: null
        }
    };
    return JiuWuSDK;
}());
exports.default = JiuWuSDK;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTREtcXEppdVd1U0RLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUN0QyxvREFBK0M7QUFFL0MsMkNBQXNDO0FBQ3RDLHNEQUFpRDtBQUVqRDtJQUFBO0lBMkhBLENBQUM7SUEvRmlCLHlCQUFnQixHQUE5QjtRQUFBLGlCQXdCQztRQXZCRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtvQkFDdEIsZ0JBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUV0QixJQUFJLE9BQU8sR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0Msa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsa0JBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDakMsYUFBYTtvQkFDYixnQkFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRWpFLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBRTtvQkFFbkIsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7b0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsRUFBRTtvQkFDQyxnQkFBTSxD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Q0FBQyxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFYSxnQkFBTyxHQUFyQjtRQUNJLE9BQU87WUFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7U0FDakMsQ0FBQTtJQUNMLENBQUM7SUF2SGEsZ0JBQU8sR0FBUSxJQUFJLENBQUM7SUFFcEIsZ0JBQU8sR0FBWSxLQUFLLENBQUM7SUFFekIsWUFBRyxHQUFHO1FBQ2hCLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsSUFBSSxFQUFFLDBCQUEwQjtLQUNuQyxDQUFBO0lBRWEsaUJBQVEsR0FBYTtRQUMvQixNQUFNLEVBQUUsR0FBRztRQUNYLFdBQVcsRUFBRSxVQUFVO1FBQ3ZCLE1BQU0sRUFBRSxrQ0FBa0M7UUFDMUMsS0FBSyxFQUFFLDhEQUE4RDtLQUN4RSxDQUFBO0lBRWEsbUJBQVUsR0FBZTtRQUNuQyxLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO1FBQ1gsV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCO0tBQ0osQ0FBQTtJQWlHTCxlQUFDO0NBM0hELEFBMkhDLElBQUE7a0JBM0hvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9Db21tb24vVG9vbHNcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgUWdBcGkgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQXBpXCI7XHJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuLi9TY2VuZS9Mb2FkaW5nXCI7XHJcbmltcG9ydCBMb2dNZ3IgZnJvbSBcIi4uL0NvbW1vbi9Mb2dNZ3JcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKaXVXdVNESyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBxZ1Rva2VuOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdFNESzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdXJsID0ge1xyXG4gICAgICAgIHRlc3Q6IFwiaHR0cHM6Ly9hcGkuaml1d3VnYW1lLmNuXCIsXHJcbiAgICAgICAgaG9zdDogXCJodHRwczovL2FwaS5qaXV3dWdhbWUuY25cIixcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdhbWVJbmZvOiBHYW1lSW5mbyA9IHtcclxuICAgICAgICBnYW1lSWQ6IDEyNSxcclxuICAgICAgICBnYW1lVmVyc2lvbjogXCIyMDIxMTAyNlwiLFxyXG4gICAgICAgIGNsaWVudDogJzk1ZTdiM2Q3YmVjZWVhOWE3Yjg1YTMyMzU4OTJlNzI4JyxcclxuICAgICAgICB0b2tlbjogJyQyYSQxMCRnalhYcVhIVDg1UXBkUlpTc1M4UVp1dTZBbkk1aEpML1p6eUo4eXpNQ2l0MmlpN1JoR2QuVycsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsYXVuY2hEYXRhOiBsYXVuY2hEYXRhID0ge1xyXG4gICAgICAgIHNjZW5lOiAnJyxcclxuICAgICAgICBxdWVyeTogbnVsbCxcclxuICAgICAgICBzaGFyZVRpY2tldDogJycsXHJcbiAgICAgICAgcmVmZXJyZXJJbmZvOiB7XHJcbiAgICAgICAgICAgIGFwcElkOiAnJyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5TZXRfQVBJX0NvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5hbGxEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdtc1VzZXIgPSBHbG9iYWwuYWxsRGF0YS5kYXRhLmRhdGEuZ21zVXNlcjtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci51c2VySWQgPSBnbXNVc2VyLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5vcGVuSWQgPSBnbXNVc2VyLm9wZW5JZDtcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5pc0F1dGggPSBnbXNVc2VyLmlzQXV0aDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLmNvbmZpZyA9IEpTT04ucGFyc2UoR2xvYmFsLmFsbERhdGEuZGF0YS5kYXRhLnZlcnNpb25Nb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUWdBcGkuY3JlYXRlQWR2KCkgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCfkuIDliIflsLHnu6ouLi4uLi4nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFNESyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+Wwsee7quWksei0pS4uLi4uLicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCO5Y+wIOazqOWGjOaIluiAheeZu+W9lVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YeG5aSH5Y+R6YCB6K+35rGCLi4uLi4uJylcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbTogcmVnaXNNZXNzYWdlID0gT2JqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axguS4rS4uLi4uLkEnKVxyXG4gICAgICAgICAgICAgICAgcGFyYW0udXJsID0gVG9vbHMuZ2V0SG9zdCgpICsgJy9hcGkvbG9naW4vbG9naW5zdW0nO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axguS4rS4uLi4uLkInKVxyXG4gICAgICAgICAgICAgICAgcGFyYW0uZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiB0aGlzLnFnVG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUlkOiB0aGlzLmdhbWVJbmZvLmdhbWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZVZhbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydElkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5nYW1lSW5mby5nYW1lVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5HpgIHor7fmsYLkuK0uLi4uLi5DJylcclxuICAgICAgICAgICAgICAgIHBhcmFtLm1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICAgICAgICAgIHBhcmFtLmhlYWRlciA9IHRoaXMuaGVhZGVycygpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uaGVhZGVyWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICAgICAgICAgIHBhcmFtLnN1Y2Nlc3MgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5ZCO5Y+w55m75b2V5rOo5YaM5oiQ5Yqf77yaJywgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75b2V6ZSZ6K+v77yaJywgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmZhaWwgPSAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y+R6YCB6K+35rGC5aSx6LSl77yaJywgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflj5HpgIHor7fmsYLkuK0uLi4uLi5EJylcclxuICAgICAgICAgICAgICAgIFFnQXBpLnNwb25zb3JIdHRwcyhwYXJhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5ZCO5Y+w55m75b2V6ZSZ6K+vOicsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeZu+W9lXZpdm9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2dpbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUWdBcGkubG9naW4oKS50aGVuKCh0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbiAhPSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnFnVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75b2V5aSx6LSlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbG9naW4gZXJyb3InLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBoZWFkZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd4LWNsaWVudCc6IHRoaXMuZ2FtZUluZm8uY2xpZW50LFxyXG4gICAgICAgICAgICAneC10b2tlbic6IHRoaXMuZ2FtZUluZm8udG9rZW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIEdhbWVJbmZvIHtcclxuICAgIGdhbWVJZDogbnVtYmVyLFxyXG4gICAgZ2FtZVZlcnNpb246IHN0cmluZyxcclxuICAgIGNsaWVudDogc3RyaW5nLFxyXG4gICAgdG9rZW46IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgbGF1bmNoRGF0YSB7XHJcbiAgICBzY2VuZTogc3RyaW5nLFxyXG4gICAgcXVlcnk6IGFueSxcclxuICAgIHNoYXJlVGlja2V0OiBzdHJpbmcsXHJcbiAgICByZWZlcnJlckluZm86IHJlZmVycmVySW5mb1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlZmVycmVySW5mbyB7XHJcbiAgICBhcHBJZDogc3RyaW5nLFxyXG4gICAgZXh0cmFEYXRhOiBhbnlcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByZWdpc01lc3NhZ2Uge1xyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBkYXRhOiBvYmplY3QsXHJcbiAgICBtZXRob2Q6IHN0cmluZyxcclxuICAgIHN1Y2Nlc3M6IGFueSxcclxuICAgIGZhaWw6IGFueSxcclxuICAgIGhlYWRlcjogYW55XHJcbn1cclxuXHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/EmitBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc12a8YU1VB+aC5ouotezi4', 'EmitBase');
// Script/Common/manage/Emit/EmitBase.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//事件派发
var GameLogMgr_1 = require("../GameLogMgr");
var EmitBase = /** @class */ (function (_super) {
    __extends(EmitBase, _super);
    function EmitBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param type
     * @param handler
     * @param target
     * @param useCapture
     */
    EmitBase.prototype.on = function (type, handler, target, useCapture) {
        if ((!type && type != 0) || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.on.call(this, type, handler, target, useCapture);
        }
        else {
            return _super.prototype.on.call(this, type.toString(), handler, target, useCapture);
        }
    };
    /**
     * @param type
     * @param handler
     * @param target
     */
    EmitBase.prototype.once = function (type, handler, target) {
        if (!type || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.once.call(this, type, handler, target);
        }
        else {
            return _super.prototype.once.call(this, type.toString(), handler, target);
        }
    };
    /**
     *
     * @param type
     * @param handler
     * @param target
     */
    EmitBase.prototype.off = function (type, handler, target) {
        if (!type || !target) {
            GameLogMgr_1.default.error("事件对象|类型为空===> type = ", type, "target =", target);
            return;
        }
        if (typeof type == "string") {
            return _super.prototype.off.call(this, type, handler, target);
        }
        else {
            return _super.prototype.off.call(this, type.toString(), handler, target);
        }
    };
    /**
     *
     * @param target
     */
    EmitBase.prototype.targetOff = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("事件对象===>  target =", target);
            return;
        }
        return _super.prototype.targetOff.call(this, target);
    };
    /**
     * 派发事件
     * @param type  事件类型
     * @param arg1
     * @param arg2
     * @param arg3
     * @param arg4
     * @param arg5
     */
    EmitBase.prototype.emit = function (type, arg1, arg2, arg3, arg4, arg5) {
        if (typeof type == "string") {
            return _super.prototype.emit.call(this, type, arg1, arg2, arg3, arg4, arg5);
        }
        else {
            return _super.prototype.emit.call(this, type.toString(), arg1, arg2, arg3, arg4, arg5);
        }
    };
    return EmitBase;
}(cc.EventTarget));
exports.default = EmitBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDRDQUFvQztBQUdwQztJQUFzQyw0QkFBYztJQUFwRDs7SUF1RkEsQ0FBQztJQXRGRzs7Ozs7O09BTUc7SUFDSSxxQkFBRSxHQUFULFVBQThCLElBQXFCLEVBQUUsT0FBVSxFQUFFLE1BQVcsRUFBRSxVQUFvQjtRQUM5RixJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pDLG9CQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakUsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsT0FBTyxpQkFBTSxFQUFFLFlBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUE7U0FDckQ7YUFBTTtZQUNILE9BQU8saUJBQU0sRUFBRSxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQ2hFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx1QkFBSSxHQUFYLFVBQVksSUFBcUIsRUFBRSxPQUE2RSxFQUFFLE1BQVk7UUFDMUgsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3pCLE9BQU8saUJBQU0sSUFBSSxZQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILE9BQU8saUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkQ7SUFFTCxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSSxzQkFBRyxHQUFWLFVBQVcsSUFBcUIsRUFBRSxPQUFpQixFQUFFLE1BQVc7UUFDNUQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixvQkFBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDVjtRQUVELElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3pCLE9BQU8saUJBQU0sR0FBRyxZQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILE9BQU8saUJBQU0sR0FBRyxZQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNEJBQVMsR0FBaEIsVUFBaUIsTUFBVztRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1Qsb0JBQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNWO1FBQ0QsT0FBTyxpQkFBTSxTQUFTLFlBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksdUJBQUksR0FBWCxVQUFZLElBQXFCLEVBQUUsSUFBVSxFQUFFLElBQVUsRUFBRSxJQUFVLEVBQUUsSUFBVSxFQUFFLElBQVU7UUFDekYsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUN4RDthQUFNO1lBQ0gsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNuRTtJQUNMLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0F2RkEsQUF1RkMsQ0F2RnFDLEVBQUUsQ0FBQyxXQUFXLEdBdUZuRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5LqL5Lu25rS+5Y+RXHJcbmltcG9ydCBHYW1lTG9nIGZyb20gXCIuLi9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBpc051bWJlciA9IGNjLmpzLmlzTnVtYmVyO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdEJhc2UgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICogQHBhcmFtIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB0YXJnZXRcclxuICAgICAqIEBwYXJhbSB1c2VDYXB0dXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZyB8IG51bWJlciwgaGFuZGxlcjogVCwgdGFyZ2V0OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVCB7XHJcbiAgICAgICAgaWYgKCghdHlwZSAmJiB0eXBlICE9IDApIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuS6i+S7tuWvueixoXznsbvlnovkuLrnqbo9PT0+IHR5cGUgPSBcIiwgdHlwZSwgXCJ0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbih0eXBlLCBoYW5kbGVyLCB0YXJnZXQsIHVzZUNhcHR1cmUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uKHR5cGUudG9TdHJpbmcoKSwgaGFuZGxlciwgdGFyZ2V0LCB1c2VDYXB0dXJlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGhhbmRsZXI6IChhcmcxPzogYW55LCBhcmcyPzogYW55LCBhcmczPzogYW55LCBhcmc0PzogYW55LCBhcmc1PzogYW55KSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXR5cGUgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKFwi5LqL5Lu25a+56LGhfOexu+Wei+S4uuepuj09PT4gdHlwZSA9IFwiLCB0eXBlLCBcInRhcmdldCA9XCIsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbmNlKHR5cGUsIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uY2UodHlwZS50b1N0cmluZygpLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZyB8IG51bWJlciwgaGFuZGxlcjogRnVuY3Rpb24sIHRhcmdldDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0eXBlIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuS6i+S7tuWvueixoXznsbvlnovkuLrnqbo9PT0+IHR5cGUgPSBcIiwgdHlwZSwgXCJ0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIub2ZmKHR5cGUsIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9mZih0eXBlLnRvU3RyaW5nKCksIGhhbmRsZXIsIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0YXJnZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldE9mZih0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoXCLkuovku7blr7nosaE9PT0+ICB0YXJnZXQgPVwiLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdXBlci50YXJnZXRPZmYodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUgIOS6i+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtIGFyZzFcclxuICAgICAqIEBwYXJhbSBhcmcyXHJcbiAgICAgKiBAcGFyYW0gYXJnM1xyXG4gICAgICogQHBhcmFtIGFyZzRcclxuICAgICAqIEBwYXJhbSBhcmc1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbWl0KHR5cGU6IHN0cmluZyB8IG51bWJlciwgYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5lbWl0KHR5cGUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmVtaXQodHlwZS50b1N0cmluZygpLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee296Xoo4NLQ6NOmcdiL7Pb', 'LayerPanel');
// Script/Common/manage/Layer/LayerPanel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerUI_1 = require("./LayerUI");
var GameLogMgr_1 = require("../GameLogMgr");
var ccclass = cc._decorator.ccclass;
var LayerPanel = /** @class */ (function (_super) {
    __extends(LayerPanel, _super);
    function LayerPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //动态加载的资源  ,将需要清除的动态资源放在asset中，在该面板销毁的时候，会自动释放这些资源
        _this.assets = [];
        return _this;
    }
    LayerPanel.getUrl = function () {
        GameLogMgr_1.default.error("需要重写getURL");
        return null;
    };
    LayerPanel.prototype.onDestroyDo = function () {
    };
    LayerPanel = __decorate([
        ccclass
    ], LayerPanel);
    return LayerPanel;
}(LayerUI_1.default));
exports.default = LayerPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDRDQUFvQztBQUU3QixJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUdoQztJQUFpRCw4QkFBTztJQUF4RDtRQUFBLHFFQThCQztRQXhCRyxrREFBa0Q7UUFDM0MsWUFBTSxHQUFnQixFQUFFLENBQUE7O0lBdUJuQyxDQUFDO0lBN0JpQixpQkFBTSxHQUFwQjtRQUNJLG9CQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQXVCTSxnQ0FBVyxHQUFsQjtJQUVBLENBQUM7SUE3QnlCLFVBQVU7UUFEdkMsT0FBTztPQUNzQixVQUFVLENBOEJ2QztJQUFELGlCQUFDO0NBOUJELEFBOEJDLENBOUJnRCxpQkFBTyxHQThCdkQ7a0JBOUI2QixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyVUkgZnJvbSBcIi4vTGF5ZXJVSVwiO1xyXG5pbXBvcnQgR2FtZUxvZyBmcm9tIFwiLi4vR2FtZUxvZ01nclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3N9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIExheWVyUGFuZWwgZXh0ZW5kcyBMYXllclVJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIEdhbWVMb2cuZXJyb3IoXCLpnIDopoHph43lhplnZXRVUkxcIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvL+WKqOaAgeWKoOi9veeahOi1hOa6kCAgLOWwhumcgOimgea4hemZpOeahOWKqOaAgei1hOa6kOaUvuWcqGFzc2V05Lit77yM5Zyo6K+l6Z2i5p2/6ZSA5q+B55qE5pe25YCZ77yM5Lya6Ieq5Yqo6YeK5pS+6L+Z5Lqb6LWE5rqQXHJcbiAgICBwdWJsaWMgYXNzZXRzOiBjYy5Bc3NldCBbXSA9IFtdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogIOmdouadv+WIneWni+WMliznrKzkuIDmrKHnlJ/miJDnmoTml7blgJnosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGluaXRVSSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIOmdouadv+aYvuekuiDmr4/mrKHmmL7npLrpg73osIPnlKgg5Y+v5Lul6L+b6KGM55u45YWz5Yid5aeL5YyW77yIVUnjgIHkuovku7bvvInkvJrlnKhvbmxvYWTvvIxzdGFydOS5i+WJjeiwg+eUqFxyXG4gICAgICogQHBhcmFtIHBhcmFtIOmdouadv+aYvuekuuWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2hvdyhwYXJhbTogYW55KTogdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmdouadv+makOiXjyAg5q+P5qyh5Zug5q2k6YO96LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBoaWRlKCk7XHJcblxyXG4gICAgcHVibGljIG9uRGVzdHJveURvKCkge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXJsSW5mbyB7XHJcbiAgICBidW5kbGU6IHN0cmluZyxcclxuICAgIG5hbWU6IHN0cmluZyxcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Scene/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec6e2rgMvFB4oPzJeQ8YAZt', 'Loading');
// Script/Scene/Loading.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../Common/Tools");
var JiuWuSDK_1 = require("../SDK/JiuWuSDK");
var CacheMgr_1 = require("../Common/manage/CacheMgr");
var Global_1 = require("../Common/Global");
var Emit_1 = require("../Common/manage/Emit/Emit");
var LogMgr_1 = require("../Common/LogMgr");
var QgBanner_1 = require("../Common/manage/Api/QgBanner");
var EmitData_1 = require("../Common/manage/Emit/EmitData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.round = null;
        _this.mask = null;
        _this.tween = null;
        return _this;
    }
    Loading.prototype.onLoad = function () {
        var _this = this;
        // @ts-ignore
        if (window.qg) {
            Global_1.default.isVivo = true;
        }
        this.mask.width = 0;
        //假的进度条
        this.tween = cc.tween(this.mask)
            .to(3, { width: 300 }, { easing: "quadOut" })
            .start();
        var i = 0;
        cc.director.preloadScene("Game");
        var num = Tools_1.default.model_initModel(function () {
            i++;
            if (i === num) {
                _this.tween.stop();
                cc.tween(_this.mask)
                    .to(2, { width: 500 }, { easing: 'quadOut' })
                    .call(function () {
                    if (Global_1.default.isVivo) {
                        if (JiuWuSDK_1.default.initSDK) {
                            _this.loadScene();
                        }
                        else {
                            Emit_1.default.instance().on(EmitData_1.default.LOAD_GAME_SCENE, _this.loadScene, _this);
                        }
                    }
                    else {
                        cc.director.loadScene('Game');
                    }
                })
                    .start();
            }
        });
        this.someMotor();
    };
    Loading.prototype.loadScene = function () {
        cc.director.loadScene('Game');
    };
    Loading.prototype.someMotor = function () {
        if (!Global_1.default.isVivo) {
            return;
        }
        // @ts-ignore
        window.qg.onShow(function () {
            LogMgr_1.default.log('Banner刷新>>>>>>onShow', QgBanner_1.default.isShow);
            if (QgBanner_1.default.isShow) {
                QgBanner_1.default.cutBanner().then();
            }
            cc.audioEngine.resumeMusic();
        });
        // @ts-ignore
        window.qg.onHide(function () {
            CacheMgr_1.default.updateData();
            cc.audioEngine.pauseMusic();
        });
        JiuWuSDK_1.default.inSet_API_Config().then(function () {
            Emit_1.default.instance().emit(EmitData_1.default.LOAD_GAME_SCENE);
        });
    };
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "round", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "mask", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTY2VuZVxcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsNENBQXVDO0FBQ3ZDLHNEQUFpRDtBQUNqRCwyQ0FBc0M7QUFDdEMsbURBQThDO0FBQzlDLDJDQUFzQztBQUN0QywwREFBcUQ7QUFDckQsMkRBQXNEO0FBRWhELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBaUZDO1FBOUVHLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUViLFdBQUssR0FBRyxJQUFJLENBQUM7O0lBeUV6QixDQUFDO0lBdkVhLHdCQUFNLEdBQWhCO1FBQUEsaUJBcUNDO1FBcENHLGFBQWE7UUFDYixJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDWCxnQkFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDbkIsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzNCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLENBQUM7YUFDeEMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHVixFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVoQyxJQUFJLEdBQUcsR0FBRyxlQUFLLENBQUMsZUFBZSxDQUFDO1lBQzVCLENBQUMsRUFBRSxDQUFBO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNYLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztxQkFDZCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDO3FCQUN4QyxJQUFJLENBQUM7b0JBQ0YsSUFBSSxnQkFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDZixJQUFJLGtCQUFRLENBQUMsT0FBTyxFQUFFOzRCQUNsQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ3BCOzZCQUFNOzRCQUNILGNBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsa0JBQVEsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsQ0FBQzt5QkFDdEU7cUJBQ0o7eUJBQU07d0JBQ0gsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2pDO2dCQUNMLENBQUMsQ0FBQztxQkFDRCxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQkFBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUdELDJCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBRUQsYUFBYTtRQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2IsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLGtCQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNqQixrQkFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQy9CO1lBRUQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUViLGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtRQUVGLGtCQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDN0IsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQTdFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0c7SUFOSixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBaUYzQjtJQUFELGNBQUM7Q0FqRkQsQUFpRkMsQ0FqRm9DLEVBQUUsQ0FBQyxTQUFTLEdBaUZoRDtrQkFqRm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgSml1V3VTREsgZnJvbSBcIi4uL1NESy9KaXVXdVNES1wiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQ2FjaGVNZ3JcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgRW1pdCBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXRcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vQ29tbW9uL0xvZ01nclwiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBFbWl0RGF0YSBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcm91bmQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbWFzazogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB0d2VlbiA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKHdpbmRvdy5xZykge1xyXG4gICAgICAgICAgICBHbG9iYWwuaXNWaXZvID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXNrLndpZHRoID0gMFxyXG4gICAgICAgIC8v5YGH55qE6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy50d2VlbiA9IGNjLnR3ZWVuKHRoaXMubWFzaylcclxuICAgICAgICAgICAgLnRvKDMsIHt3aWR0aDogMzAwfSwge2Vhc2luZzogXCJxdWFkT3V0XCJ9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcblxyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJHYW1lXCIpXHJcblxyXG4gICAgICAgIGxldCBudW0gPSBUb29scy5tb2RlbF9pbml0TW9kZWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgaWYgKGkgPT09IG51bSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm1hc2spXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDIsIHt3aWR0aDogNTAwfSwge2Vhc2luZzogJ3F1YWRPdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSml1V3VTREsuaW5pdFNESykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5vbihFbWl0RGF0YS5MT0FEX0dBTUVfU0NFTkUsIHRoaXMubG9hZFNjZW5lLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbWVNb3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTY2VuZSgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0dhbWUnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc29tZU1vdG9yKCkge1xyXG4gICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB3aW5kb3cucWcub25TaG93KCgpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmxvZygnQmFubmVy5Yi35pawPj4+Pj4+b25TaG93JywgUWdCYW5uZXIuaXNTaG93KTtcclxuICAgICAgICAgICAgaWYgKFFnQmFubmVyLmlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgUWdCYW5uZXIuY3V0QmFubmVyKCkudGhlbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHdpbmRvdy5xZy5vbkhpZGUoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgQ2FjaGVNZ3IudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBKaXVXdVNESy5pblNldF9BUElfQ29uZmlnKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5lbWl0KEVtaXREYXRhLkxPQURfR0FNRV9TQ0VORSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/logic/game/shop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d262wFPIRN3o01sPN4thii', 'shop');
// Script/Moudle/View/logic/game/shop.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../../../Common/manage/Layer/LayerPanel");
var Tools_1 = require("../../../../Common/Tools");
var config_1 = require("../common/config");
var CacheMgr_1 = require("../../../../Common/manage/CacheMgr");
var PanelMgr_1 = require("../../../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hammer_btn = null;
        _this.sprite_btn = null;
        _this.stamina_btn = null;
        _this.close_btn = null;
        return _this;
    }
    Shop_1 = Shop;
    Shop.getUrl = function () {
        return {
            bundle: "game",
            name: "shop"
        };
    };
    Shop.prototype.initUI = function () {
        this.hammer_btn = this.getNode("content/hammer/btn");
        this.onTouch(this.hammer_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_hammer, function () {
                CacheMgr_1.default.setting.hammerNum++;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            });
        });
        this.change_price(this.hammer_btn, config_1.default.price_hammer);
        this.sprite_btn = this.getNode("content/sprite/btn");
        this.onTouch(this.sprite_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_sprite, function () {
                CacheMgr_1.default.setting.spriteNum++;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            });
        });
        this.change_price(this.sprite_btn, config_1.default.price_sprite);
        this.stamina_btn = this.getNode("content/stamina/btn");
        this.onTouch(this.stamina_btn, function () {
            Tools_1.default.changeGold(-config_1.default.price_stamina, function () {
                CacheMgr_1.default.stamina = CacheMgr_1.default.stamina + 1;
            });
        });
        this.change_price(this.stamina_btn, config_1.default.price_stamina);
        this.close_btn = this.getNode("btn");
        this.onTouch(this.close_btn, function () {
            PanelMgr_1.default.INS.closePanel(Shop_1);
        });
    };
    Shop.prototype.change_price = function (node, num) {
        var label = node.getChildByName("num").getComponent(cc.Label);
        label.string = num.toString();
    };
    Shop.prototype.show = function (param) {
    };
    Shop.prototype.hide = function () {
    };
    var Shop_1;
    Shop = Shop_1 = __decorate([
        ccclass
    ], Shop);
    return Shop;
}(LayerPanel_1.default));
exports.default = Shop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXGxvZ2ljXFxnYW1lXFxzaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUErRTtBQUMvRSxrREFBNkM7QUFDN0MsMkNBQTBDO0FBQzFDLCtEQUEwRDtBQUMxRCwrREFBMEQ7QUFFcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVU7SUFBNUM7UUFBQSxxRUFxREM7UUFwRFcsZ0JBQVUsR0FBWSxJQUFJLENBQUE7UUFDMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUE7UUFDMUIsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFDM0IsZUFBUyxHQUFZLElBQUksQ0FBQTs7SUFpRHJDLENBQUM7YUFyRG9CLElBQUk7SUFNUCxXQUFNLEdBQXBCO1FBQ0ksT0FBTztZQUNILE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDZixDQUFBO0lBQ0wsQ0FBQztJQUVELHFCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDMUIsZUFBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFVLENBQUMsWUFBWSxFQUFFO2dCQUN2QyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtnQkFDNUIsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUE7WUFDdkMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxnQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMxQixlQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQVUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLGtCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO2dCQUM1QixrQkFBUSxDQUFDLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQTtZQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGdCQUFVLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLGVBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBVSxDQUFDLGFBQWEsRUFBRTtnQkFDeEMsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsZ0JBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3pCLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFJLENBQUMsQ0FBRTtRQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCwyQkFBWSxHQUFaLFVBQWEsSUFBYSxFQUFFLEdBQVc7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzdELEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFRCxtQkFBSSxHQUFKLFVBQUssS0FBVTtJQUNmLENBQUM7SUFFRCxtQkFBSSxHQUFKO0lBQ0EsQ0FBQzs7SUFwRGdCLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FxRHhCO0lBQUQsV0FBQztDQXJERCxBQXFEQyxDQXJEaUMsb0JBQVUsR0FxRDNDO2tCQXJEb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXllclBhbmVsLCB7VXJsSW5mb30gZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJQYW5lbFwiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgZ2FtZUNvbmZpZyBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9tYW5hZ2UvQ2FjaGVNZ3JcIjtcclxuaW1wb3J0IFBhbmVsTWdyIGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vbWFuYWdlL1BhbmVsTWdyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3AgZXh0ZW5kcyBMYXllclBhbmVsIHtcclxuICAgIHByaXZhdGUgaGFtbWVyX2J0bjogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgc3ByaXRlX2J0bjogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgc3RhbWluYV9idG46IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIGNsb3NlX2J0bjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVybCgpOiBVcmxJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBidW5kbGU6IFwiZ2FtZVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcInNob3BcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5oYW1tZXJfYnRuID0gdGhpcy5nZXROb2RlKFwiY29udGVudC9oYW1tZXIvYnRuXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuaGFtbWVyX2J0biwgKCkgPT4ge1xyXG4gICAgICAgICAgICBUb29scy5jaGFuZ2VHb2xkKC1nYW1lQ29uZmlnLnByaWNlX2hhbW1lciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0rK1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY2hhbmdlX3ByaWNlKHRoaXMuaGFtbWVyX2J0biwgZ2FtZUNvbmZpZy5wcmljZV9oYW1tZXIpXHJcbiAgICAgICAgdGhpcy5zcHJpdGVfYnRuID0gdGhpcy5nZXROb2RlKFwiY29udGVudC9zcHJpdGUvYnRuXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuc3ByaXRlX2J0biwgKCkgPT4ge1xyXG4gICAgICAgICAgICBUb29scy5jaGFuZ2VHb2xkKC1nYW1lQ29uZmlnLnByaWNlX3Nwcml0ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0rK1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY2hhbmdlX3ByaWNlKHRoaXMuc3ByaXRlX2J0biwgZ2FtZUNvbmZpZy5wcmljZV9zcHJpdGUpXHJcbiAgICAgICAgdGhpcy5zdGFtaW5hX2J0biA9IHRoaXMuZ2V0Tm9kZShcImNvbnRlbnQvc3RhbWluYS9idG5cIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5zdGFtaW5hX2J0biwgKCkgPT4ge1xyXG4gICAgICAgICAgICBUb29scy5jaGFuZ2VHb2xkKC1nYW1lQ29uZmlnLnByaWNlX3N0YW1pbmEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnN0YW1pbmEgPSBDYWNoZU1nci5zdGFtaW5hICsgMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfcHJpY2UodGhpcy5zdGFtaW5hX2J0biwgZ2FtZUNvbmZpZy5wcmljZV9zdGFtaW5hKVxyXG4gICAgICAgIHRoaXMuY2xvc2VfYnRuID0gdGhpcy5nZXROb2RlKFwiYnRuXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuY2xvc2VfYnRuLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKFNob3ApIDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZV9wcmljZShub2RlOiBjYy5Ob2RlLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIGxhYmVsLnN0cmluZyA9IG51bS50b1N0cmluZygpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhwYXJhbTogYW55KTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ecf25dSYJE8p7160kC1rXT', 'Constant');
// Script/Common/Constant.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 常量配置
 */
var Constant = /** @class */ (function () {
    function Constant() {
    }
    Constant.REWARDED_VIDEO_END_TYPE = {
        END: 1,
        NOT_END: 2,
        ERROR: 3,
    };
    // 分享类型
    Constant.UNLOCK_TYPE = {
        PASS_GAME: 1,
        TIPS: 2,
        GET_STRENGTH: 3,
        DOUBLE_STRENGTH: 4,
        NEXT_LEVEL: 5,
        GET_GOLD: 6,
        DOUBLE: 7,
        TRY_SKIN: 8
    };
    Constant.GAME_BOX_TWEEN_TYPE = {
        SHAKE_STOP: 1,
        SHAKE_FOREVER: 2,
        SCALE_MOVE: 3
    };
    //?
    Constant.LOGIN_CODE = {
        1: '本地环境不予后台进行交互;',
        2: '微信接口调用失败;',
        3: '微信登录接口调用成功，但 Code 为空;',
        4: "用户后台登录失败 code != 200;",
        5: '用户后台登录失败！',
        6: '更新用户数据失败, Code != 200;',
        7: '更新用户数据失败;',
        8: '获取游戏配置失败, Code != 200;',
        9: '获取游戏配置失败;',
        10: '获取游戏导出失败, Code != 200;',
        11: '获取游戏导出失败;',
        12: '上报游戏导出失败, Code != 200;',
        13: '上报游戏导出失败;',
    };
    Constant.VIDEO_TYPE = {
        POP: 1,
        GET_PROPS: 2,
        GET_POWER: 3,
        GET_GOLD: 4,
        GET_DOUBLE: 5,
        UNLOCK: 6,
        GET_SKIN: 7,
        ENFORCE: 8,
        PLAY_END: 9,
        PLAY_CLOSE: 10,
    };
    //4
    Constant.BOTTOM_TYPE = {
        NEW_BANNER_SHOW: 1,
        OLD_BANNER_SHOW: 2,
        NEW_CUSTOM_SHOW: 3,
        OLD_CUSTOM_SHOW: 4,
    };
    //5  导出成功记录
    Constant.EXPORT_TYPE = {
        FORCE: 1,
        RAND_FORCE: 2,
        GAME_BOX_ONE: 3,
        GAME_BOX_TWO: 5,
        GAME_BOX_THREE: 6,
        GAME_BOX_FOUR: 11,
        GAME_BOX_SLIDER: 7,
        OPEN_DATA: 8,
        VIEW_BOX: 9,
        BANNER_BOX: 10,
    };
    return Constant;
}());
exports.default = Constant;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXENvbnN0YW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0dBRUc7QUFDSDtJQUFBO0lBZ0ZBLENBQUM7SUE5RWlCLGdDQUF1QixHQUFHO1FBQ3BDLEdBQUcsRUFBRSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsQ0FBQztLQUdYLENBQUM7SUFFRixPQUFPO0lBQ08sb0JBQVcsR0FBRztRQUN4QixTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksRUFBRSxDQUFDO1FBQ1AsWUFBWSxFQUFFLENBQUM7UUFDZixlQUFlLEVBQUUsQ0FBQztRQUNsQixVQUFVLEVBQUUsQ0FBQztRQUNiLFFBQVEsRUFBRSxDQUFDO1FBQ1gsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsQ0FBQztLQUNkLENBQUM7SUFFWSw0QkFBbUIsR0FBRztRQUNoQyxVQUFVLEVBQUUsQ0FBQztRQUNiLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLFVBQVUsRUFBRSxDQUFDO0tBQ2hCLENBQUM7SUFFRixHQUFHO0lBQ1csbUJBQVUsR0FBRztRQUN2QixDQUFDLEVBQUUsZUFBZTtRQUNsQixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSx1QkFBdUI7UUFDMUIsQ0FBQyxFQUFFLHVCQUF1QjtRQUMxQixDQUFDLEVBQUUsV0FBVztRQUNkLENBQUMsRUFBRSx3QkFBd0I7UUFDM0IsQ0FBQyxFQUFFLFdBQVc7UUFDZCxDQUFDLEVBQUUsd0JBQXdCO1FBQzNCLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLHdCQUF3QjtRQUM1QixFQUFFLEVBQUUsV0FBVztRQUNmLEVBQUUsRUFBRSx3QkFBd0I7UUFDNUIsRUFBRSxFQUFFLFdBQVc7S0FDbEIsQ0FBQTtJQUVhLG1CQUFVLEdBQUc7UUFDdkIsR0FBRyxFQUFFLENBQUM7UUFDTixTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLENBQUM7UUFDWCxVQUFVLEVBQUUsQ0FBQztRQUNiLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLENBQUM7UUFDWCxPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxDQUFDO1FBQ1gsVUFBVSxFQUFFLEVBQUU7S0FDakIsQ0FBQTtJQUNELEdBQUc7SUFDVyxvQkFBVyxHQUFHO1FBQ3hCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLGVBQWUsRUFBRSxDQUFDO0tBQ3JCLENBQUE7SUFFRCxXQUFXO0lBQ0csb0JBQVcsR0FBRztRQUN4QixLQUFLLEVBQUUsQ0FBQztRQUNSLFVBQVUsRUFBRSxDQUFDO1FBQ2IsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUsQ0FBQztRQUNmLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFLENBQUM7UUFDWCxVQUFVLEVBQUUsRUFBRTtLQUNqQixDQUFBO0lBR0wsZUFBQztDQWhGRCxBQWdGQyxJQUFBO2tCQWhGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTG9nTWdyIGZyb20gXCIuL21hbmFnZS9HYW1lTG9nTWdyXCI7XHJcblxyXG4vKipcclxuICog5bi46YeP6YWN572uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudCB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBSRVdBUkRFRF9WSURFT19FTkRfVFlQRSA9IHtcclxuICAgICAgICBFTkQ6IDEsIC8vIOaSreaUvuWujOaVtFxyXG4gICAgICAgIE5PVF9FTkQ6IDIsIC8vIOacquaSreaUvuWujOaVtFxyXG4gICAgICAgIEVSUk9SOiAzLCAvLyDmiqXplJlcclxuICAgICAgICAvLyBJTlNFUlRfU0NSRUVOOiA0LCAvL+aPkuWxj+S7o+abv1xyXG4gICAgICAgIC8vIFNIQVJFOiA1LCAvL+WIhuS6q+S7o+abv1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDliIbkuqvnsbvlnotcclxuICAgIHB1YmxpYyBzdGF0aWMgVU5MT0NLX1RZUEUgPSB7XHJcbiAgICAgICAgUEFTU19HQU1FOiAxLCAvLyDot7Pov4dcclxuICAgICAgICBUSVBTOiAyLCAvLyDlj4zlgI3ph5HluIFcclxuICAgICAgICBHRVRfU1RSRU5HVEg6IDMsIC8vIOiOt+WPluS9k+WKm1xyXG4gICAgICAgIERPVUJMRV9TVFJFTkdUSDogNCwgLy8g5Y+M5YCN5L2T5YqbXHJcbiAgICAgICAgTkVYVF9MRVZFTDogNSwgLy8g5LiL5LiA5YWz5Y2hXHJcbiAgICAgICAgR0VUX0dPTEQ6IDYsIC8vIOiOt+WPluS9k+WKm1xyXG4gICAgICAgIERPVUJMRTogNywgLy9cclxuICAgICAgICBUUllfU0tJTjogOFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdBTUVfQk9YX1RXRUVOX1RZUEUgPSB7XHJcbiAgICAgICAgU0hBS0VfU1RPUDogMSxcclxuICAgICAgICBTSEFLRV9GT1JFVkVSOiAyLFxyXG4gICAgICAgIFNDQUxFX01PVkU6IDNcclxuICAgIH07XHJcblxyXG4gICAgLy8/XHJcbiAgICBwdWJsaWMgc3RhdGljIExPR0lOX0NPREUgPSB7XHJcbiAgICAgICAgMTogJ+acrOWcsOeOr+Wig+S4jeS6iOWQjuWPsOi/m+ihjOS6pOS6kjsnLFxyXG4gICAgICAgIDI6ICflvq7kv6HmjqXlj6PosIPnlKjlpLHotKU7JyxcclxuICAgICAgICAzOiAn5b6u5L+h55m75b2V5o6l5Y+j6LCD55So5oiQ5Yqf77yM5L2GIENvZGUg5Li656m6OycsXHJcbiAgICAgICAgNDogXCLnlKjmiLflkI7lj7DnmbvlvZXlpLHotKUgY29kZSAhPSAyMDA7XCIsXHJcbiAgICAgICAgNTogJ+eUqOaIt+WQjuWPsOeZu+W9leWksei0pe+8gScsXHJcbiAgICAgICAgNjogJ+abtOaWsOeUqOaIt+aVsOaNruWksei0pSwgQ29kZSAhPSAyMDA7JyxcclxuICAgICAgICA3OiAn5pu05paw55So5oi35pWw5o2u5aSx6LSlOycsXHJcbiAgICAgICAgODogJ+iOt+WPlua4uOaIj+mFjee9ruWksei0pSwgQ29kZSAhPSAyMDA7JyxcclxuICAgICAgICA5OiAn6I635Y+W5ri45oiP6YWN572u5aSx6LSlOycsXHJcbiAgICAgICAgMTA6ICfojrflj5bmuLjmiI/lr7zlh7rlpLHotKUsIENvZGUgIT0gMjAwOycsXHJcbiAgICAgICAgMTE6ICfojrflj5bmuLjmiI/lr7zlh7rlpLHotKU7JyxcclxuICAgICAgICAxMjogJ+S4iuaKpea4uOaIj+WvvOWHuuWksei0pSwgQ29kZSAhPSAyMDA7JyxcclxuICAgICAgICAxMzogJ+S4iuaKpea4uOaIj+WvvOWHuuWksei0pTsnLFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVklERU9fVFlQRSA9IHtcclxuICAgICAgICBQT1A6IDEsIC8vIOW8ueeql+Wei+ivleeUqOW5v+WRiu+8jFxyXG4gICAgICAgIEdFVF9QUk9QUzogMiwgLy8g6I635Y+W6YGT5YW3LFxyXG4gICAgICAgIEdFVF9QT1dFUjogMywgLy8g6I635Y+W5L2T5YqbLFxyXG4gICAgICAgIEdFVF9HT0xEOiA0LCAvLyDojrflj5bph5HluIHvvIxcclxuICAgICAgICBHRVRfRE9VQkxFOiA1LCAvLyDlj4zlgI3pooblj5bvvIxcclxuICAgICAgICBVTkxPQ0s6IDYsIC8v6Kej6ZSB5YWz5Y2h77yMXHJcbiAgICAgICAgR0VUX1NLSU46IDcsIC8vIOiOt+WPluearuiCpFxyXG4gICAgICAgIEVORk9SQ0U6IDgsIC8vIOW8uuaLieinhumikVxyXG4gICAgICAgIFBMQVlfRU5EOiA5LCAvL+aSreaUvuWujOaIkFxyXG4gICAgICAgIFBMQVlfQ0xPU0U6IDEwLCAvL+aSreaUvuWIsOS4gOWNiuayoeS6hlxyXG4gICAgfVxyXG4gICAgLy80XHJcbiAgICBwdWJsaWMgc3RhdGljIEJPVFRPTV9UWVBFID0ge1xyXG4gICAgICAgIE5FV19CQU5ORVJfU0hPVzogMSwgLy/mlrBiYW5uZXLlsZXnpLrlrozmiJBcclxuICAgICAgICBPTERfQkFOTkVSX1NIT1c6IDIsIC8v5penYmFubmVy5bGV56S65a6M5oiQXHJcbiAgICAgICAgTkVXX0NVU1RPTV9TSE9XOiAzLCAvL+aWsOiHquWumuS5ieW5v+WRiuWxleekuuWujOaIkFxyXG4gICAgICAgIE9MRF9DVVNUT01fU0hPVzogNCwgLy/ml6foh6rlrprkuYnlub/lkYrlsZXnpLrlrozmiJBcclxuICAgIH1cclxuXHJcbiAgICAvLzUgIOWvvOWHuuaIkOWKn+iusOW9lVxyXG4gICAgcHVibGljIHN0YXRpYyBFWFBPUlRfVFlQRSA9IHtcclxuICAgICAgICBGT1JDRTogMSwgICAgICAvL+W8uuWItuWvvOWHulxyXG4gICAgICAgIFJBTkRfRk9SQ0U6IDIsIC8v6ZqP5py65LiA5LiqXHJcbiAgICAgICAgR0FNRV9CT1hfT05FOiAzLCAgIC8vT05FIEJPWFxyXG4gICAgICAgIEdBTUVfQk9YX1RXTzogNSwgIC8vVFdPIEJPWFxyXG4gICAgICAgIEdBTUVfQk9YX1RIUkVFOiA2LCAvL1RIUkVFIEJPWFxyXG4gICAgICAgIEdBTUVfQk9YX0ZPVVI6IDExLCAvL0ZPVVIgQk9YXHJcbiAgICAgICAgR0FNRV9CT1hfU0xJREVSOiA3LC8vIFNMSURFUiBCT1ggIOS+p+i+ueagj+WvvOWHulxyXG4gICAgICAgIE9QRU5fREFUQTogOCwgIC8v5byA5pS+5pWw5o2u5Z+fXHJcbiAgICAgICAgVklFV19CT1g6IDksIC8v6aG16Z2i5a+85Ye6XHJcbiAgICAgICAgQkFOTkVSX0JPWDogMTAsIC8vYmFubmVy5a+85Ye6XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/Test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5633cJ6yBFCb2RIub9WDst', 'Test');
// Script/Common/Test.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./manage/GameLogMgr");
var TestMgr = /** @class */ (function () {
    function TestMgr() {
    }
    TestMgr.start = function (flag) {
        if (this.timeData.has(flag)) {
            GameLogMgr_1.default.warn("TestMgr 重复 flag ", flag);
            return;
        }
        this.timeData.set(flag, new Date().getTime());
    };
    TestMgr.end = function (flag) {
        if (!this.timeData.has(flag)) {
            GameLogMgr_1.default.warn("flag不存在， 无法计算时差", flag);
            return;
        }
        GameLogMgr_1.default.log(flag, new Date().getTime() - this.timeData.get(flag));
        this.timeData.delete(flag);
    };
    TestMgr.timeData = new Map();
    return TestMgr;
}());
exports.default = TestMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFFN0M7SUFBQTtJQW9CQSxDQUFDO0lBakJpQixhQUFLLEdBQW5CLFVBQW9CLElBQVk7UUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixvQkFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN6QyxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFYSxXQUFHLEdBQWpCLFVBQWtCLElBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLG9CQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hDLE9BQU07U0FDVDtRQUNELG9CQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQWpCYyxnQkFBUSxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtJQW1CNUUsY0FBQztDQXBCRCxBQW9CQyxJQUFBO2tCQXBCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTG9nTWdyIGZyb20gXCIuL21hbmFnZS9HYW1lTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHRpbWVEYXRhOiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhcnQoZmxhZzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZURhdGEuaGFzKGZsYWcpKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2dNZ3Iud2FybihcIlRlc3RNZ3Ig6YeN5aSNIGZsYWcgXCIsIGZsYWcpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVEYXRhLnNldChmbGFnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuZChmbGFnOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGltZURhdGEuaGFzKGZsYWcpKSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2dNZ3Iud2FybihcImZsYWfkuI3lrZjlnKjvvIwg5peg5rOV6K6h566X5pe25beuXCIsIGZsYWcpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTG9nTWdyLmxvZyhmbGFnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMudGltZURhdGEuZ2V0KGZsYWcpKVxyXG4gICAgICAgIHRoaXMudGltZURhdGEuZGVsZXRlKGZsYWcpXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/GameLogMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84d83ziGZZN4LH30WDE1S/l', 'GameLogMgr');
// Script/Common/manage/GameLogMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../Global");
var GameLogMgr = /** @class */ (function () {
    function GameLogMgr() {
    }
    GameLogMgr.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.log.apply(cc.log, args);
        }
    };
    GameLogMgr.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.warn.apply(cc.warn, args);
        }
    };
    GameLogMgr.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.error.apply(cc.error, args);
        }
    };
    return GameLogMgr;
}());
exports.default = GameLogMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcR2FtZUxvZ01nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUErQjtBQUUvQjtJQUFBO0lBbUJBLENBQUM7SUFqQmlCLGNBQUcsR0FBakI7UUFBa0IsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDNUIsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRWEsZUFBSSxHQUFsQjtRQUFtQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUM3QixJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFYSxnQkFBSyxHQUFuQjtRQUFvQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUM5QixJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBbkJBLEFBbUJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9HbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb2dNZ3Ige1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuaXNMb2cgPT0gMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjYy5sb2csIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZy5pc0xvZyA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjYy53YXJuLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcnJvciguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmlzTG9nID09IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvci5hcHBseShjYy5lcnJvciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/PanelMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5e36JQ0GRBYYm5P5DBYjVC', 'PanelMgr');
// Script/Common/manage/PanelMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.Layer = void 0;
var CacheMgr_1 = require("./CacheMgr");
var LoadMgr_1 = require("./LoadMgr");
var Emit_1 = require("./Emit/Emit");
var EmitData_1 = require("./Emit/EmitData");
var LayerPanel_1 = require("./Layer/LayerPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelMgr = /** @class */ (function (_super) {
    __extends(PanelMgr, _super);
    function PanelMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layers = [];
        //当前正在Loading 的面板
        _this.LoadingList = new Map();
        //当前打开的面板数组
        _this.openList = new Map();
        //当前关闭但是未摧毁的面板，存储在这里，下次打开该面板的时候，就会使用这里的面板
        _this.hideList = new Map();
        return _this;
    }
    PanelMgr_1 = PanelMgr;
    PanelMgr.prototype.onLoad = function () {
        PanelMgr_1.INS = this;
        console.log('PanelMgr初始化完成');
        Emit_1.default.instance().emit(EmitData_1.EventCode.PanelMgrInitOK);
    };
    /**
     * @param param{
     *     layer : 在哪一个容器打开页面
     *     panel: 打开面板
     *     call : 打开成功回调 可选
     *     param: 传递给下一个面板的参数
     * }
     */
    PanelMgr.prototype.openPanel = function (param) {
        var _this = this;
        var layer = this.layers[param.layer];
        console.log('param:', param, this.layers);
        if (!layer) {
            return;
        }
        //加载分包
        var urlInfo = param.panel.getUrl();
        if (this.LoadingList.has(urlInfo.name)) {
            return;
        }
        if (this.openList.has(param.panel.getUrl().name)) {
            return;
        }
        this.LoadingList.set(urlInfo.name, 1); //添加一个加载标识， 防止重复添加
        //todo  mask
        var openPanelWay = function () {
            var way = function () {
                var panel = null;
                //判断有没有旧的panel可用，有的话就不重新实例化了
                if (_this.hideList.has(urlInfo.name)) {
                    panel = _this.hideList.get(urlInfo.name);
                    panel.parent = layer;
                    panel.active = false;
                    // this.scheduleOnce(() => {
                    _this.openList.set(urlInfo.name, panel);
                    _this.showPanel(panel, param.param);
                    _this.LoadingList.delete(urlInfo.name);
                    if (_this.LoadingList.size == 0) {
                        //todo mask
                    }
                    if (param.call) {
                        param.call();
                    }
                    // }, 0)
                }
                else {
                    LoadMgr_1.default.loadPrefab(urlInfo.name, LoadMgr_1.default.getBundle(urlInfo.bundle)).then(function (prefab) {
                        panel = cc.instantiate(prefab);
                        panel.parent = layer;
                        panel.active = false;
                        _this.openList.set(urlInfo.name, panel);
                        panel.getComponent(LayerPanel_1.default).initUI();
                        _this.showPanel(panel, param.param);
                        _this.LoadingList.delete(urlInfo.name);
                        if (_this.LoadingList.size == 0) {
                            //todo mask
                        }
                        if (param.call) {
                            param.call();
                        }
                    });
                }
            };
            if (LoadMgr_1.default.judgeBundleLoad(urlInfo.name)) {
                way();
            }
            else {
                LoadMgr_1.default.loadBundle_Single(urlInfo.bundle).then(function () {
                    way();
                });
            }
        };
        //没有配置立即准备打开目标panel
        openPanelWay();
    };
    PanelMgr.prototype.showPanel = function (panel, param) {
        var script = panel.getComponent(LayerPanel_1.default);
        script.show(param);
        panel.active = true;
    };
    /**
     *
     * @param panel 需要关闭的面板
     * @param destroy 是否需要彻底销毁这个面板
     */
    PanelMgr.prototype.closePanel = function (panel, destroy) {
        if (destroy === void 0) { destroy = true; }
        var node = this.openList.get(panel.getUrl().name);
        if (!node) {
            return;
        }
        node.getComponent(LayerPanel_1.default).hide(); //这里可以做清除代码
        node.getComponent(LayerPanel_1.default).unscheduleAllCallbacks(); //取消所有定时器
        if (panel.getUrl().name == "endView") { //如果是endView的化 ，需要同步数据
            CacheMgr_1.default.updateData();
        }
        node.parent = null;
        this.openList.delete(panel.getUrl().name);
        if (destroy) {
            node.getComponent(LayerPanel_1.default).onDestroyDo(); //这里可以做清除代码
            node.destroy();
        }
        else {
            this.hideList.set(panel.getUrl().name, node);
        }
    };
    PanelMgr.prototype.getPanel = function (panel) {
        return this.openList.get(panel.getUrl().name);
    };
    var PanelMgr_1;
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "只要将Game中的场景layer按照顺序赋值即可， 如果存在修改，需要到PannerMgr.ts中修改枚举变量 Layer,也是需要按照绑定顺序"
        })
    ], PanelMgr.prototype, "layers", void 0);
    PanelMgr = PanelMgr_1 = __decorate([
        ccclass
    ], PanelMgr);
    return PanelMgr;
}(cc.Component));
exports.default = PanelMgr;
var Layer;
(function (Layer) {
    Layer[Layer["gameLayer"] = 0] = "gameLayer";
    Layer[Layer["gameInfoLayer"] = 1] = "gameInfoLayer";
    Layer[Layer["otherLayer"] = 2] = "otherLayer";
    Layer[Layer["nativeLayer"] = 3] = "nativeLayer";
})(Layer = exports.Layer || (exports.Layer = {}));
var View;
(function (View) {
    View[View["endView"] = 0] = "endView";
    View[View["gameView"] = 1] = "gameView";
    View[View["homeView"] = 2] = "homeView";
})(View = exports.View || (exports.View = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcUGFuZWxNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUNsQyxxQ0FBZ0M7QUFDaEMsb0NBQStCO0FBQy9CLDRDQUEwQztBQUMxQyxpREFBNEM7QUFFdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwSUM7UUFsSVUsWUFBTSxHQUFjLEVBQUUsQ0FBQTtRQUU3QixpQkFBaUI7UUFDVCxpQkFBVyxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtRQUNwRSxXQUFXO1FBQ0gsY0FBUSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQTtRQUNuRSx5Q0FBeUM7UUFDakMsY0FBUSxHQUF5QixJQUFJLEdBQUcsRUFBbUIsQ0FBQTs7SUEySHZFLENBQUM7aUJBMUlvQixRQUFRO0lBaUJ6Qix5QkFBTSxHQUFOO1FBQ0ksVUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUM1QixjQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCw0QkFBUyxHQUFULFVBQVUsS0FBZ0I7UUFBMUIsaUJBb0VDO1FBbkVHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9B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UUFDekMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLFdBQVc7WUFDdkQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2pCO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQy9DO0lBQ0wsQ0FBQztJQUVELDJCQUFRLEdBQVIsVUFBUyxLQUF3QjtRQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqRCxDQUFDOztJQWpJRDtRQU5DLFFBQVEsQ0FDTDtZQUNJLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDZixPQUFPLEVBQUUsMEVBQTBFO1NBQ3RGLENBQ0o7NENBQzRCO0lBUlosUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTBJNUI7SUFBRCxlQUFDO0NBMUlELEFBMElDLENBMUlxQyxFQUFFLENBQUMsU0FBUyxHQTBJakQ7a0JBMUlvQixRQUFRO0FBNEk3QixJQUFZLEtBS1g7QUFMRCxXQUFZLEtBQUs7SUFDYiwyQ0FBUyxDQUFBO0lBQ1QsbURBQWEsQ0FBQTtJQUNiLDZDQUFVLENBQUE7SUFDViwrQ0FBVyxDQUFBO0FBQ2YsQ0FBQyxFQUxXLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQUtoQjtBQUVELElBQVksSUFJWDtBQUpELFdBQVksSUFBSTtJQUNaLHFDQUFPLENBQUE7SUFDUCx1Q0FBUSxDQUFBO0lBQ1IsdUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFKVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFJZiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi9DYWNoZU1nclwiO1xyXG5pbXBvcnQgTG9hZE1nciBmcm9tIFwiLi9Mb2FkTWdyXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQge0V2ZW50Q29kZX0gZnJvbSBcIi4vRW1pdC9FbWl0RGF0YVwiO1xyXG5pbXBvcnQgTGF5ZXJQYW5lbCBmcm9tIFwiLi9MYXllci9MYXllclBhbmVsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxNZ3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlM6IFBhbmVsTWdyXHJcbiAgICBAcHJvcGVydHkoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5Y+q6KaB5bCGR2FtZeS4reeahOWcuuaZr2xheWVy5oyJ54Wn6aG65bqP6LWL5YC85Y2z5Y+v77yMIOWmguaenOWtmOWcqOS/ruaUue+8jOmcgOimgeWIsFBhbm5lck1nci50c+S4reS/ruaUueaemuS4vuWPmOmHjyBMYXllcizkuZ/mmK/pnIDopoHmjInnhafnu5Hlrprpobrluo9cIlxyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIHB1YmxpYyBsYXllcnM6IGNjLk5vZGVbXSA9IFtdXHJcblxyXG4gICAgLy/lvZPliY3mraPlnKhMb2FkaW5nIOeahOmdouadv1xyXG4gICAgcHJpdmF0ZSBMb2FkaW5nTGlzdDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KClcclxuICAgIC8v5b2T5YmN5omT5byA55qE6Z2i5p2/5pWw57uEXHJcbiAgICBwcml2YXRlIG9wZW5MaXN0OiBNYXA8c3RyaW5nLCBjYy5Ob2RlPiA9IG5ldyBNYXA8c3RyaW5nLCBjYy5Ob2RlPigpXHJcbiAgICAvL+W9k+WJjeWFs+mXreS9huaYr+acquaRp+avgeeahOmdouadv++8jOWtmOWCqOWcqOi/memHjO+8jOS4i+asoeaJk+W8gOivpemdouadv+eahOaXtuWAme+8jOWwseS8muS9v+eUqOi/memHjOeahOmdouadv1xyXG4gICAgcHJpdmF0ZSBoaWRlTGlzdDogTWFwPHN0cmluZywgY2MuTm9kZT4gPSBuZXcgTWFwPHN0cmluZywgY2MuTm9kZT4oKVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBQYW5lbE1nci5JTlMgPSB0aGlzXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BhbmVsTWdy5Yid5aeL5YyW5a6M5oiQJylcclxuICAgICAgICBFbWl0Lmluc3RhbmNlKCkuZW1pdChFdmVudENvZGUuUGFuZWxNZ3JJbml0T0spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW17XHJcbiAgICAgKiAgICAgbGF5ZXIgOiDlnKjlk6rkuIDkuKrlrrnlmajmiZPlvIDpobXpnaJcclxuICAgICAqICAgICBwYW5lbDog5omT5byA6Z2i5p2/XHJcbiAgICAgKiAgICAgY2FsbCA6IOaJk+W8gOaIkOWKn+WbnuiwgyDlj6/pgIlcclxuICAgICAqICAgICBwYXJhbTog5Lyg6YCS57uZ5LiL5LiA5Liq6Z2i5p2/55qE5Y+C5pWwXHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIG9wZW5QYW5lbChwYXJhbTogb3BlblBhcmFtKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5sYXllcnNbcGFyYW0ubGF5ZXJdXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbTonLHBhcmFtLHRoaXMubGF5ZXJzKVxyXG4gICAgICAgIGlmICghbGF5ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WKoOi9veWIhuWMhVxyXG4gICAgICAgIGxldCB1cmxJbmZvID0gcGFyYW0ucGFuZWwuZ2V0VXJsKClcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTG9hZGluZ0xpc3QuaGFzKHVybEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3Blbkxpc3QuaGFzKHBhcmFtLnBhbmVsLmdldFVybCgpLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Mb2FkaW5nTGlzdC5zZXQodXJsSW5mby5uYW1lLCAxKSAvL+a3u+WKoOS4gOS4quWKoOi9veagh+ivhu+8jCDpmLLmraLph43lpI3mt7vliqBcclxuICAgICAgICAvL3RvZG8gIG1hc2tcclxuICAgICAgICBsZXQgb3BlblBhbmVsV2F5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgd2F5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mnInmsqHmnInml6fnmoRwYW5lbOWPr+eUqO+8jOacieeahOivneWwseS4jemHjeaWsOWunuS+i+WMluS6hlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZUxpc3QuaGFzKHVybEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbCA9IHRoaXMuaGlkZUxpc3QuZ2V0KHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5wYXJlbnQgPSBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc2V0KHVybEluZm8ubmFtZSwgcGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwocGFuZWwsIHBhcmFtLnBhcmFtKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ0xpc3QuZGVsZXRlKHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Mb2FkaW5nTGlzdC5zaXplID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvIG1hc2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0sIDApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvYWRNZ3IubG9hZFByZWZhYih1cmxJbmZvLm5hbWUsIExvYWRNZ3IuZ2V0QnVuZGxlKHVybEluZm8uYnVuZGxlKSkudGhlbigocHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLnBhcmVudCA9IGxheWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc2V0KHVybEluZm8ubmFtZSwgcGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLmdldENvbXBvbmVudChMYXllclBhbmVsKS5pbml0VUkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQYW5lbChwYW5lbCwgcGFyYW0ucGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ0xpc3QuZGVsZXRlKHVybEluZm8ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTG9hZGluZ0xpc3Quc2l6ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG8gbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChMb2FkTWdyLmp1ZGdlQnVuZGxlTG9hZCh1cmxJbmZvLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB3YXkoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9hZE1nci5sb2FkQnVuZGxlX1NpbmdsZSh1cmxJbmZvLmJ1bmRsZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/msqHmnInphY3nva7nq4vljbPlh4blpIfmiZPlvIDnm67moIdwYW5lbFxyXG4gICAgICAgIG9wZW5QYW5lbFdheSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UGFuZWwocGFuZWw6IGNjLk5vZGUsIHBhcmFtOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2NyaXB0ID0gcGFuZWwuZ2V0Q29tcG9uZW50KExheWVyUGFuZWwpXHJcbiAgICAgICAgc2NyaXB0LnNob3cocGFyYW0pXHJcbiAgICAgICAgcGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYW5lbCDpnIDopoHlhbPpl63nmoTpnaLmnb9cclxuICAgICAqIEBwYXJhbSBkZXN0cm95IOaYr+WQpumcgOimgeW9u+W6lemUgOavgei/meS4qumdouadv1xyXG4gICAgICovXHJcbiAgICBjbG9zZVBhbmVsKHBhbmVsOiB0eXBlb2YgTGF5ZXJQYW5lbCwgZGVzdHJveSA9IHRydWUpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMub3Blbkxpc3QuZ2V0KHBhbmVsLmdldFVybCgpLm5hbWUpXHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTGF5ZXJQYW5lbCkuaGlkZSgpIC8v6L+Z6YeM5Y+v5Lul5YGa5riF6Zmk5Luj56CBXHJcblxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KExheWVyUGFuZWwpLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKSAvL+WPlua2iOaJgOacieWumuaXtuWZqFxyXG4gICAgICAgIGlmIChwYW5lbC5nZXRVcmwoKS5uYW1lID09IFwiZW5kVmlld1wiKSB7IC8v5aaC5p6c5pivZW5kVmlld+eahOWMliDvvIzpnIDopoHlkIzmraXmlbDmja5cclxuICAgICAgICAgICAgQ2FjaGVNZ3IudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBudWxsXHJcbiAgICAgICAgdGhpcy5vcGVuTGlzdC5kZWxldGUocGFuZWwuZ2V0VXJsKCkubmFtZSlcclxuICAgICAgICBpZiAoZGVzdHJveSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChMYXllclBhbmVsKS5vbkRlc3Ryb3lEbygpIC8v6L+Z6YeM5Y+v5Lul5YGa5riF6Zmk5Luj56CBXHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlTGlzdC5zZXQocGFuZWwuZ2V0VXJsKCkubmFtZSwgbm9kZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFuZWwocGFuZWw6IHR5cGVvZiBMYXllclBhbmVsKTogY2MuTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbkxpc3QuZ2V0KHBhbmVsLmdldFVybCgpLm5hbWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExheWVyIHtcclxuICAgIGdhbWVMYXllcixcclxuICAgIGdhbWVJbmZvTGF5ZXIsXHJcbiAgICBvdGhlckxheWVyLFxyXG4gICAgbmF0aXZlTGF5ZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZpZXcge1xyXG4gICAgZW5kVmlldyxcclxuICAgIGdhbWVWaWV3LFxyXG4gICAgaG9tZVZpZXcsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb3BlblBhcmFtIHtcclxuICAgIGxheWVyOiBMYXllcixcclxuICAgIHBhbmVsOiB0eXBlb2YgTGF5ZXJQYW5lbCxcclxuICAgIGNhbGw/OiBGdW5jdGlvbixcclxuICAgIHBhcmFtPzogYW55XHJcbn1cclxuXHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/TimerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e49b5BloYREHZGgmecvbJv1', 'TimerMgr');
// Script/Common/manage/TimerMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheMgr_1 = require("./CacheMgr");
var Tools_1 = require("../Tools");
var Emit_1 = require("./Emit/Emit");
var EmitData_1 = require("./Emit/EmitData");
/**
 *  总定时器 ， 用来 判断签到 或者恢复体力  每分钟判断
 */
var TimerMgr = /** @class */ (function () {
    function TimerMgr() {
        var _this = this;
        //每秒进行判断
        window.setInterval(function () {
            _this.update();
        }, 1000);
    }
    TimerMgr.prototype.update = function () {
        //每秒执行
        var nowTime = new Date();
        var dataNum = Tools_1.default.date_getTimeNum(nowTime);
        if (dataNum != CacheMgr_1.default.exportTime) {
            //新的一天 ，重置导出。。
            CacheMgr_1.default.earlyExportTripPart = [];
            CacheMgr_1.default.earlyExport = [];
            Emit_1.default.instance().emit(EmitData_1.EventCode.GAME_BOX_UPDATE);
            CacheMgr_1.default.exportTime = dataNum;
        }
    };
    return TimerMgr;
}());
exports.default = new TimerMgr();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcVGltZXJNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsa0NBQTZCO0FBQzdCLG9DQUErQjtBQUMvQiw0Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUNJO1FBQUEsaUJBS0M7UUFKRyxRQUFRO1FBQ1IsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNmLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNJLE1BQU07UUFDTixJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksT0FBTyxHQUFHLGVBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDNUMsSUFBSSxPQUFPLElBQUksa0JBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDaEMsY0FBYztZQUNkLGtCQUFRLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFBO1lBQ2pDLGtCQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtZQUN6QixjQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDL0Msa0JBQVEsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFBO1NBQ2hDO0lBQ0wsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi9DYWNoZU1nclwiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uL1Rvb2xzXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQge0V2ZW50Q29kZX0gZnJvbSBcIi4vRW1pdC9FbWl0RGF0YVwiO1xyXG5cclxuLyoqXHJcbiAqICDmgLvlrprml7blmagg77yMIOeUqOadpSDliKTmlq3nrb7liLAg5oiW6ICF5oGi5aSN5L2T5YqbICDmr4/liIbpkp/liKTmlq1cclxuICovXHJcbmNsYXNzIFRpbWVyTWdyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5q+P56eS6L+b6KGM5Yik5patXHJcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8v5q+P56eS5omn6KGMXHJcbiAgICAgICAgbGV0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRhTnVtID0gVG9vbHMuZGF0ZV9nZXRUaW1lTnVtKG5vd1RpbWUpXHJcbiAgICAgICAgaWYgKGRhdGFOdW0gIT0gQ2FjaGVNZ3IuZXhwb3J0VGltZSkge1xyXG4gICAgICAgICAgICAvL+aWsOeahOS4gOWkqSDvvIzph43nva7lr7zlh7rjgILjgIJcclxuICAgICAgICAgICAgQ2FjaGVNZ3IuZWFybHlFeHBvcnRUcmlwUGFydCA9IFtdXHJcbiAgICAgICAgICAgIENhY2hlTWdyLmVhcmx5RXhwb3J0ID0gW11cclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRXZlbnRDb2RlLkdBTUVfQk9YX1VQREFURSlcclxuICAgICAgICAgICAgQ2FjaGVNZ3IuZXhwb3J0VGltZSA9IGRhdGFOdW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBUaW1lck1ncigpO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgNative.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a17f9wr1ThJ+I6MpRy1bdby', 'QgNative');
// Script/Common/manage/Api/QgNative.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgNative = /** @class */ (function () {
    function QgNative() {
    }
    /**
     * 创建原生广告
     */
    QgNative.createNative = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建原生广告');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.nativeAdId);
            if (!unitId) {
                LogMgr_1.default.error('原生ID获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.nativeAd = qg.createNativeAd({ posId: unitId });
            _this.nativeAd.onLoad(function (res) {
                if (res && res.adList) {
                    LogMgr_1.default.log('原生广告拉取成功>>>>>>', res.adList);
                    _this.nativeMessage = res.adList[0];
                    _this.nativeResolve(res.adList[0]);
                    _this.isLoad_Native = true;
                }
                _this.nativeResolve = null;
            });
            resolve(true);
        });
    };
    /**
     * 加载原生广告
     */
    QgNative.loadNative = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.nativeResolve = resolve;
            if (!_this.nativeAd) {
                LogMgr_1.default.error('原生广告未创建，无法加载......');
                _this.createNative().then(function () { }).catch();
                _this.nativeResolve(false);
                _this.nativeResolve = null;
                return;
            }
            if (_this.nativeMessage != null) {
                _this.nativeResolve(_this.nativeMessage);
                _this.nativeResolve = null;
            }
            _this.nativeAd.load().then(function () {
            }).catch(function () {
                _this.nativeResolve(false);
            });
        });
    };
    /**
     * 上报原生广告曝光
     */
    QgNative.repAdShow = function (adId) {
        if (!this.nativeAd)
            return;
        LogMgr_1.default.log('上报用户曝光>>>>>>');
        this.nativeAd.reportAdShow({
            adId: adId
        });
    };
    /**
     * 上报原生广告点击
     */
    QgNative.repAdClick = function (adId) {
        if (!this.nativeAd)
            return;
        LogMgr_1.default.log('上报用户点击>>>>>>');
        this.nativeAd.reportAdClick({
            adId: adId
        });
    };
    /**
     * 重新拉去广告信息
     */
    QgNative.anewLoad = function () {
        this.nativeMessage = null;
        this.isLoad_Native = false;
        this.loadNative().then();
    };
    QgNative.isLoad_Native = false;
    QgNative.nativeResolve = null;
    QgNative.nativeMessage = null;
    return QgNative;
}());
exports.default = QgNative;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ05hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyx1Q0FBa0M7QUFDbEMsdUNBQWtDO0FBRWxDO0lBQUE7SUFzR0EsQ0FBQztJQTlGRzs7T0FFRztJQUNXLHFCQUFZLEdBQTFCO1FBQUEsaUJBK0JDO1FBOUJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUUvQixJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRTtnQkFDZixPQUFNO2FBQ1Q7WUFFRCxJQUFJLE1BQU0sR0FBRyxlQUFLLENBQUMsZ0JBQWdCLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRTtnQkFDZixPQUFNO2FBQ1Q7WUFFRCxhQUFhO1lBQ2IsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFHLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFcEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHO2dCQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNuQixnQkFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUU7b0JBQ3pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBRTtvQkFDcEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUU7b0JBQ25DLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFFO2lCQUM5QjtnQkFDRCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBRTtZQUMvQixDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNXLG1CQUFVLEdBQXhCO1FBQUEsaUJBc0JDO1FBckJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2dCQUNsQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUU7Z0JBQzFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUU7Z0JBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFFO2dCQUMzQixPQUFNO2FBQ1Q7WUFFRCxJQUFJLEtBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO2dCQUM1QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBRTtnQkFDeEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUU7YUFDOUI7WUFFRCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUUxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ0wsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBRTtZQUMvQixDQUFDLENBQUMsQ0FBRTtRQUNSLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ1csa0JBQVMsR0FBdkIsVUFBeUIsSUFBSTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFRO1FBQzVCLGdCQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFFO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ1csbUJBQVUsR0FBeEIsVUFBMEIsSUFBSTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFRO1FBQzVCLGdCQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ1csaUJBQVEsR0FBdEI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBRTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBRTtRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUU7SUFDOUIsQ0FBQztJQWpHYSxzQkFBYSxHQUFZLEtBQUssQ0FBQztJQUM5QixzQkFBYSxHQUFHLElBQUksQ0FBRTtJQUN2QixzQkFBYSxHQUFTLElBQUksQ0FBRTtJQWlHOUMsZUFBQztDQXRHRCxBQXNHQyxJQUFBO2tCQXRHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb29scyBmcm9tIFwiLi4vLi4vVG9vbHNcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vLi4vR2xvYmFsXCI7XHJcbmltcG9ydCBMb2dNZ3IgZnJvbSBcIi4uLy4uL0xvZ01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUWdOYXRpdmUge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5hdGl2ZUFkOiBhbnk7IC8v5Y6f55Sf5bm/5ZGK5a+56LGhXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzTG9hZF9OYXRpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc3RhdGljIG5hdGl2ZVJlc29sdmUgPSBudWxsIDtcclxuICAgIHB1YmxpYyBzdGF0aWMgbmF0aXZlTWVzc2FnZSA6IGFueSA9IG51bGwgO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuWOn+eUn+W5v+WRilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU5hdGl2ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCflvZPliY3pnZ52aXZv5bmz5Y+w77yM5peg5rOV5Yib5bu65Y6f55Sf5bm/5ZGKJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5pdElkID0gVG9vbHMuZ2V0UmFuZG9tQnlBcnJheShHbG9iYWwuY29uZmlnLmFkdmVydGlzaW5nQ29uZmlnLm5hdGl2ZUFkSWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVuaXRJZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfljp/nlJ9JROiOt+WPluWksei0pe+8micgKyB1bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkID0gcWcuY3JlYXRlTmF0aXZlQWQoe3Bvc0lkIDogdW5pdElkfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUFkLm9uTG9hZCgocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuYWRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5Y6f55Sf5bm/5ZGK5ouJ5Y+W5oiQ5YqfPj4+Pj4+JyxyZXMuYWRMaXN0KSA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVNZXNzYWdlID0gcmVzLmFkTGlzdFswXSA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVSZXNvbHZlKHJlcy5hZExpc3RbMF0pIDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZF9OYXRpdmUgPSB0cnVlIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZSA9IG51bGwgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55Sf5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZE5hdGl2ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUgPSByZXNvbHZlIDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5hdGl2ZUFkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+WOn+eUn+W5v+WRiuacquWIm+W7uu+8jOaXoOazleWKoOi9vS4uLi4uLicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5hdGl2ZSgpLnRoZW4oKCk9Pnt9KS5jYXRjaCgpIDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVSZXNvbHZlID0gbnVsbCA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubmF0aXZlTWVzc2FnZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUodGhpcy5uYXRpdmVNZXNzYWdlKSA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVJlc29sdmUgPSBudWxsIDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVBZC5sb2FkKCkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlUmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICB9KSA7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWOn+eUn+W5v+WRiuabneWFiVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcEFkU2hvdyAoYWRJZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5uYXRpdmVBZCkgcmV0dXJuIDtcclxuICAgICAgICBMb2dNZ3IubG9nKCfkuIrmiqXnlKjmiLfmm53lhYk+Pj4+Pj4nKVxyXG4gICAgICAgIHRoaXMubmF0aXZlQWQucmVwb3J0QWRTaG93KHtcclxuICAgICAgICAgICAgYWRJZDogYWRJZFxyXG4gICAgICAgIH0pIDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWOn+eUn+W5v+WRiueCueWHu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcEFkQ2xpY2sgKGFkSWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubmF0aXZlQWQpIHJldHVybiA7XHJcbiAgICAgICAgTG9nTWdyLmxvZygn5LiK5oql55So5oi354K55Ye7Pj4+Pj4+JylcclxuICAgICAgICB0aGlzLm5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgICAgICBhZElkOiBhZElkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeaWsOaLieWOu+W5v+WRiuS/oeaBr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFuZXdMb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZU1lc3NhZ2UgPSBudWxsIDtcclxuICAgICAgICB0aGlzLmlzTG9hZF9OYXRpdmUgPSBmYWxzZSA7XHJcbiAgICAgICAgdGhpcy5sb2FkTmF0aXZlKCkudGhlbigpIDtcclxuICAgIH1cclxuXHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgRewardedAd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '358caMktlFHz7wtU4673p9v', 'QgRewardedAd');
// Script/Common/manage/Api/QgRewardedAd.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgRewardedAd = /** @class */ (function () {
    function QgRewardedAd() {
    }
    QgRewardedAd.createRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建视频');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.rewardedVideoAdId);
            if (!unitId) {
                LogMgr_1.default.error('视频ID获取失败：' + unitId);
                reject(false);
                return;
            }
            // @ts-ignore
            _this.rewardedAd = window.qg.createRewardedVideoAd({ posId: unitId });
            _this.rewardedAd.onError(function (err) {
                LogMgr_1.default.error("激励视频广告错误", err);
                _this.rewardedVideoResolve(2);
                _this.rewardedVideoResolve = null;
            });
            _this.rewardedAd.onClose(function (isEnded) {
                if (isEnded.isEnded) {
                    _this.rewardedVideoResolve(1); //播放完成
                }
                else {
                    _this.rewardedVideoResolve(3); //中途关闭
                }
                _this.isLoad_Rewarded = false;
                _this.rewardedVideoResolve = null;
                _this.loadRewardedVideo().then();
            });
            _this.rewardedAd.onLoad(function (res) {
                _this.isLoad_Rewarded = true;
                LogMgr_1.default.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            });
            resolve(true);
        });
    };
    /**
     * 加载视频
     */
    QgRewardedAd.loadRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.rewardedAd) {
                LogMgr_1.default.error('视频未创建>>>无法load()');
                _this.createRewardedVideo().then();
                reject(false);
                return;
            }
            _this.rewardedAd.load().then(function () {
                resolve(true);
            }, function (error) {
                LogMgr_1.default.error('视频加载失败：' + error);
                reject(false);
            });
        });
    };
    /**
     * show视频
     */
    QgRewardedAd.showRewardedVideo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rewardedVideoResolve = resolve;
            if (!_this.isLoad_Rewarded) {
                _this.rewardedVideoResolve(2);
                _this.loadRewardedVideo().then();
                LogMgr_1.default.error('视频加载中......');
                return;
            }
            _this.rewardedAd.show().then(function () {
            }).catch(function (err) {
                LogMgr_1.default.error('激励视频广告展示失败', JSON.stringify(err));
            });
        });
    };
    QgRewardedAd.isLoad_Rewarded = false;
    QgRewardedAd.rewardedVideoResolve = null; //视频状态返回 1 : 播放完成， 2 : 播放错误, 3 : 播放中途关闭
    return QgRewardedAd;
}());
exports.default = QgRewardedAd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ1Jld2FyZGVkQWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBMEZBLENBQUM7SUFwRmlCLGdDQUFtQixHQUFqQztRQUFBLGlCQTJDQztRQTFDRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFL0IsSUFBSSxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFFO2dCQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxNQUFNLEdBQUcsZUFBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxPQUFNO2FBQ1Q7WUFFRCxhQUFhO1lBQ2IsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFFbkUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUN2QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNyQyxDQUFD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IGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ1Jld2FyZGVkQWQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJld2FyZGVkQWQ6IGFueTsgLy/op4bpopHlr7nosaFcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNMb2FkX1Jld2FyZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXdhcmRlZFZpZGVvUmVzb2x2ZSA9IG51bGw7IC8v6KeG6aKR54q25oCB6L+U5ZueIDEgOiDmkq3mlL7lrozmiJDvvIwgMiA6IOaSreaUvumUmeivrywgMyA6IOaSreaUvuS4remAlOWFs+mXrVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUmV3YXJkZWRWaWRlbygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+W9k+WJjemdnnZpdm/lubPlj7DvvIzml6Dms5XliJvlu7rop4bpopEnKSA7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bml0SWQgPSBUb29scy5nZXRSYW5kb21CeUFycmF5KEdsb2JhbC5jb25maWcuYWR2ZXJ0aXNpbmdDb25maWcucmV3YXJkZWRWaWRlb0FkSWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVuaXRJZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfop4bpopFJROiOt+WPluWksei0pe+8micgKyB1bml0SWQpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkID0gd2luZG93LnFnLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7cG9zSWQ6IHVuaXRJZH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcihcIua/gOWKseinhumikeW5v+WRiumUmeivr1wiLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkZWRWaWRlb1Jlc29sdmUgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5vbkNsb3NlKChpc0VuZGVkKSA9PiB7IC8v5byA5ZCv5YWz6Zet55uR5ZCsXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbmRlZC5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgxKTsgLy/mkq3mlL7lrozmiJBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgzKTsgLy/kuK3pgJTlhbPpl61cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX1Jld2FyZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW9SZXNvbHZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKCkgO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZEFkLm9uTG9hZCgocmVzKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkX1Jld2FyZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIExvZ01nci5sb2coJ+a/gOWKseinhumikeW5v+WRiuWKoOi9veWujOaIkC1vbmxvYWTop6blj5EnLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veinhumikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRSZXdhcmRlZFZpZGVvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXdhcmRlZEFkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+inhumikeacquWIm+W7uj4+PuaXoOazlWxvYWQoKScpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJld2FyZGVkVmlkZW8oKS50aGVuKClcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcign6KeG6aKR5Yqg6L295aSx6LSl77yaJyArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSkgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2hvd+inhumikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dSZXdhcmRlZFZpZGVvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW9SZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9hZF9SZXdhcmRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvUmVzb2x2ZSgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKCkgO1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfop4bpopHliqDovb3kuK0uLi4uLi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRBZC5zaG93KCkudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ+a/gOWKseinhumikeW5v+WRiuWxleekuuWksei0pScsIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgBanner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c28cdkb3kBCIrhAgkSRKQn3', 'QgBanner');
// Script/Common/manage/Api/QgBanner.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../../../Scene/Game");
var Tools_1 = require("../../Tools");
var Global_1 = require("../../Global");
var LogMgr_1 = require("../../LogMgr");
var QgBanner = /** @class */ (function () {
    function QgBanner() {
    }
    /**
     * 创建banner
     */
    QgBanner.createBanner = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Global_1.default.isVivo) {
                LogMgr_1.default.error('当前非vivo平台，无法创建Banner');
                reject(false);
                return;
            }
            var unitId = Tools_1.default.getRandomByArray(Global_1.default.config.advertisingConfig.bannerAdId);
            if (!unitId) {
                LogMgr_1.default.error('BannerId获取失败:' + unitId);
                reject(false);
                return;
            }
            var banner_exm = Game_1.default.Ins.banner;
            var size = Tools_1.default.getRealSize(banner_exm);
            var refreshTime = 30;
            if (Global_1.default.config.bannerRefreshTime >= 30) {
                refreshTime = Global_1.default.config.bannerRefreshTime;
            }
            var bannerParam = {
                adUnitId: unitId,
                style: {
                    left: size.left,
                    top: size.top,
                },
                adIntervals: refreshTime,
            };
            // @ts-ignore
            _this.bannerAd = qg.createBannerAd(bannerParam);
            _this.bannerAd.onLoad(function (res) {
                _this.isLoad = true;
                LogMgr_1.default.log('Banner广告加载完成-onload触发', JSON.stringify(res));
                resolve(true);
            });
            _this.bannerAd.onClose(function () {
                LogMgr_1.default.log('Banner关闭......');
            });
            _this.bannerAd.onError(function (err) {
                LogMgr_1.default.error('Banner错误:err:', err);
                reject(false);
            });
        });
    };
    /**
     *展示Banner
     */
    QgBanner.showBanner = function () {
        var _this = this;
        if (!this.isLoad) {
            this.createBanner().then();
            LogMgr_1.default.error('Banner未创建或未加载，无法显示');
            return;
        }
        if (this.isShow) {
            LogMgr_1.default.error('Banner已显示，无法重复显示');
            return;
        }
        this.bannerAd.show().then(function () {
            _this.isShow = true;
        }).catch(function (err) {
            LogMgr_1.default.error('Banner显示错误:', err);
        });
    };
    /**
     * 隐藏Banner
     */
    QgBanner.hideBanner = function () {
        if (!this.isLoad) {
            LogMgr_1.default.error('Banner未创建或未加载，无法隐藏');
            return;
        }
        if (!this.isShow) {
            LogMgr_1.default.error('Banner未显示，无需隐藏');
            return;
        }
        this.bannerAd.hide();
        this.isShow = false;
    };
    /**
     * 销毁Banner实例
     */
    QgBanner.destroyBanner = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.bannerAd) {
                LogMgr_1.default.error('Banner未创建>>>无法destroy()');
                resolve(false);
                return;
            }
            _this.bannerAd.destroy();
            _this.isLoad = false;
            _this.isShow = false;
            resolve(true);
        });
    };
    /**
     * 刷新Banner
     */
    QgBanner.cutBanner = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.destroyBanner().then(function (res) {
                if (res) {
                    _this.createBanner().then(function () {
                        _this.showBanner();
                    });
                }
                resolve(true);
            });
        });
    };
    QgBanner.isLoad = false; //加载状态
    QgBanner.isShow = false; //显示状态
    return QgBanner;
}());
exports.default = QgBanner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0Jhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2QyxxQ0FBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBNklBLENBQUM7SUFySUc7O09BRUc7SUFDVyxxQkFBWSxHQUExQjtRQUFBLGlCQW9EQztRQW5ERyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFL0IsSUFBSSxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNoQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxNQUFNLEdBQUcsZUFBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBRUQsSUFBSSxVQUFVLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7WUFDaEMsSUFBSSxJQUFJLEdBQUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUN4QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUU7WUFFdEIsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZDLFdBQVcsR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBRTthQUNsRDtZQUVELElBQUksV0FBVyxHQUFHO2dCQUNkLFFBQVEs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QUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDVyxrQkFBUyxHQUF2QjtRQUFBLGlCQVdDO1FBVkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQzFCLElBQUksR0FBRyxFQUFFO29CQUNMLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBeklhLGVBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQyxNQUFNO0lBSS9CLGVBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQyxNQUFNO0lBdUlqRCxlQUFDO0NBN0lELEFBNklDLElBQUE7a0JBN0lvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWUgZnJvbSBcIi4uLy4uLy4uL1NjZW5lL0dhbWVcIjtcclxuaW1wb3J0IFRvb2xzIGZyb20gXCIuLi8uLi9Ub29sc1wiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuLi8uLi9HbG9iYWxcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0Jhbm5lciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0xvYWQ6IGJvb2xlYW4gPSBmYWxzZTsgLy/liqDovb3nirbmgIFcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBiYW5uZXJBZDogYW55OyAvL2Jhbm5lcuWvueixoVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTaG93OiBib29sZWFuID0gZmFsc2U7IC8v5pi+56S654q25oCBXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7piYW5uZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCflvZPliY3pnZ52aXZv5bmz5Y+w77yM5peg5rOV5Yib5bu6QmFubmVyJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bml0SWQgPSBUb29scy5nZXRSYW5kb21CeUFycmF5KEdsb2JhbC5jb25maWcuYWR2ZXJ0aXNpbmdDb25maWcuYmFubmVyQWRJZCk7XHJcbiAgICAgICAgICAgIGlmICghdW5pdElkKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcklk6I635Y+W5aSx6LSlOicgKyB1bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmFubmVyX2V4bSA9IEdhbWUuSW5zLmJhbm5lclxyXG4gICAgICAgICAgICBsZXQgc2l6ZSA9IFRvb2xzLmdldFJlYWxTaXplKGJhbm5lcl9leG0pXHJcbiAgICAgICAgICAgIGxldCByZWZyZXNoVGltZSA9IDMwIDtcclxuXHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmJhbm5lclJlZnJlc2hUaW1lID49IDMwKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoVGltZSA9IEdsb2JhbC5jb25maWcuYmFubmVyUmVmcmVzaFRpbWUgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYmFubmVyUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogdW5pdElkLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzaXplLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaXplLnRvcCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhZEludGVydmFsczogcmVmcmVzaFRpbWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQgPSBxZy5jcmVhdGVCYW5uZXJBZChiYW5uZXJQYXJhbSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uTG9hZCgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCdCYW5uZXLlub/lkYrliqDovb3lrozmiJAtb25sb2Fk6Kem5Y+RJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkNsb3NlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBMb2dNZ3IubG9nKCdCYW5uZXLlhbPpl60uLi4uLi4nKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ01nci5lcnJvcignQmFubmVy6ZSZ6K+vOmVycjonLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq5bGV56S6QmFubmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0Jhbm5lcigpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9hZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJhbm5lcigpLnRoZW4oKTtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmnKrliJvlu7rmiJbmnKrliqDovb3vvIzml6Dms5XmmL7npLonKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvdykge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuW3suaYvuekuu+8jOaXoOazlemHjeWkjeaYvuekuicpIDtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmmL7npLrplJnor686JywgZXJyKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj0Jhbm5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpZGVCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9hZCkge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuacquWIm+W7uuaIluacquWKoOi9ve+8jOaXoOazlemakOiXjycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvdykge1xyXG4gICAgICAgICAgICBMb2dNZ3IuZXJyb3IoJ0Jhbm5lcuacquaYvuekuu+8jOaXoOmcgOmakOiXjycpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgUJhbm5lcuWunuS+i1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlc3Ryb3lCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5iYW5uZXJBZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCdCYW5uZXLmnKrliJvlu7o+Pj7ml6Dms5VkZXN0cm95KCknKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrBCYW5uZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXRCYW5uZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUJhbm5lcigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFubmVyKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/HomeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cb3bfFe0WFPIJpKXt1o4F5F', 'HomeView');
// Script/Moudle/View/HomeView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var GameInfoView_1 = require("./GameInfoView");
var GameView_1 = require("./GameView");
var shop_1 = require("./logic/game/shop");
var sign_1 = require("./logic/game/sign");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var ShowConfig_1 = require("../../Common/ShowConfig");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var Global_1 = require("../../Common/Global");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var QgApi_1 = require("../../Common/manage/Api/QgApi");
var ccclass = cc._decorator.ccclass;
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._exportData = null;
        //node
        _this._button = null;
        _this._setting = null;
        _this._shopBtn = null;
        _this._shortBtn = null;
        return _this;
        //todo logic 方法
    }
    HomeView_1 = HomeView;
    HomeView.getUrl = function () {
        return {
            bundle: "homeView",
            name: "homeView"
        };
    };
    HomeView.prototype.initUI = function () {
        var _this = this;
        //todo 逻辑
        PanelMgr_1.default.INS.openPanel({
            panel: GameInfoView_1.default,
            layer: PanelMgr_1.Layer.gameInfoLayer,
        });
        this._button = this.getNode("next");
        this.onTouch(this._button, function () {
            PanelMgr_1.default.INS.openPanel({
                panel: GameView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                call: function () {
                    PanelMgr_1.default.INS.closePanel(HomeView_1);
                    PanelMgr_1.default.INS.closePanel(shop_1.default);
                    PanelMgr_1.default.INS.closePanel(sign_1.default);
                }
            });
        });
        this._setting = this.getNode("setting");
        this._shopBtn = this.getNode("bottomUI/shopIcon");
        this.onTouch(this._shopBtn, function () {
            PanelMgr_1.default.INS.openPanel({
                panel: shop_1.default,
                layer: PanelMgr_1.Layer.gameLayer
            });
        });
        this._shortBtn = this.getNode('shortBtn');
        QgApi_1.default.judgeShortIcon().then(function (res) {
            _this._shortBtn.active = res;
        });
        this.onTouch(this._shortBtn, function () {
            QgApi_1.default.addShortcutIcon().then(function (res) {
                if (res) {
                    _this._shortBtn.active = false;
                }
            });
        });
    };
    HomeView.prototype.show = function (param) {
        ShowConfig_1.default.show('homeConfig').then(function (res) {
            if (Global_1.default.config.homeConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
            else {
                QgBanner_1.default.hideBanner();
            }
        });
    };
    HomeView.prototype.hide = function () {
        if (Global_1.default.config.homeConfig.nativeConfig.type == 2) {
            Emit_1.default.instance().emit(EmitData_1.default.CLOSE_NATIVE);
        }
    };
    var HomeView_1;
    HomeView = HomeView_1 = __decorate([
        ccclass
    ], HomeView);
    return HomeView;
}(LayerPanel_1.default));
exports.default = HomeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEhvbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUF5RTtBQUN6RSwrQ0FBMEM7QUFDMUMsdUNBQWtDO0FBQ2xDLDBDQUFxQztBQUNyQywwQ0FBcUM7QUFFckMseURBQTZEO0FBQzdELHNEQUFpRDtBQUNqRCw2REFBd0Q7QUFDeEQsOENBQXlDO0FBQ3pDLHNEQUFpRDtBQUNqRCw4REFBeUQ7QUFDekQsdURBQWtEO0FBRTNDLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBRWhDO0lBQXNDLDRCQUFVO0lBQWhEO1FBQUEscUVBK0VDO1FBeEVXLGlCQUFXLEdBQVEsSUFBSSxDQUFDO1FBRWhDLE1BQU07UUFDRSxhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFZLElBQUksQ0FBRTtRQUMxQixlQUFTLEdBQWEsSUFBSSxDQUFFOztRQWlFcEMsZUFBZTtJQUNuQixDQUFDO2lCQS9Fb0IsUUFBUTtJQUNYLGVBQU0sR0FBcEI7UUFDSSxPQUFPO1lBQ0gsTUFBTSxFQUFFLFVBQVU7WUFDbEIsSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FBQTtJQUNMLENBQUM7SUFRTSx5QkFBTSxHQUFiO1FBQUEsaUJBMkNDO1FBMUNHLFNBQVM7UUFDVCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxFQUFFLHNCQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBSyxDQUFDLGFBQWE7U0FDN0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLEtBQUssRUFBRyxrQkFBUTtnQkFDaEIsS0FBSyxFQUFHLGdCQUFLLENBQUMsU0FBUztnQkFDdkIsSUFBSSxFQUFHO29CQUNILGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFRLENBQUMsQ0FBRTtvQkFDbkMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxDQUFFO29CQUMvQixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBSSxDQUFDLENBQUU7Z0JBQ25DLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDeEIsa0JBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2dCQUNuQixLQUFLLEVBQUcsY0FBSTtnQkFDWixLQUFLLEVBQUcsZ0JBQUssQ0FBQyxTQUFTO2FBQzFCLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFFO1FBRTNDLGVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFhO1lBQ3RDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN6QixlQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDN0IsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2lCQUNsQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLEtBQVU7UUFDbEIsb0JBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUNuQyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUMxQyxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1QkFBSSxHQUFYO1FBRUksSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDakQsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFFO1NBQ2hEO0lBQ0wsQ0FBQzs7SUExRWdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErRTVCO0lBQUQsZUFBQztDQS9FRCxBQStFQyxDQS9FcUMsb0JBQVUsR0ErRS9DO2tCQS9Fb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXllclBhbmVsLCB7VXJsSW5mb30gZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJQYW5lbFwiO1xyXG5pbXBvcnQgR2FtZUluZm9WaWV3IGZyb20gXCIuL0dhbWVJbmZvVmlld1wiO1xyXG5pbXBvcnQgR2FtZVZpZXcgZnJvbSBcIi4vR2FtZVZpZXdcIjtcclxuaW1wb3J0IFNob3AgZnJvbSBcIi4vbG9naWMvZ2FtZS9zaG9wXCI7XHJcbmltcG9ydCBTaWduIGZyb20gXCIuL2xvZ2ljL2dhbWUvc2lnblwiO1xyXG5cclxuaW1wb3J0IFBhbmVsTWdyLCB7TGF5ZXJ9IGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL1BhbmVsTWdyXCI7XHJcbmltcG9ydCBTaG93Q29uZmlnIGZyb20gXCIuLi8uLi9Db21tb24vU2hvd0NvbmZpZ1wiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0NvbW1vbi9HbG9iYWxcIjtcclxuaW1wb3J0IEVtaXQgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0XCI7XHJcbmltcG9ydCBFbWl0RGF0YSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcbmltcG9ydCBRZ0FwaSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9BcGkvUWdBcGlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVWaWV3IGV4dGVuZHMgTGF5ZXJQYW5lbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVybCgpOiBVcmxJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBidW5kbGU6IFwiaG9tZVZpZXdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJob21lVmlld1wiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0RGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvL25vZGVcclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zZXR0aW5nOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Nob3BCdG46IGNjLk5vZGUgPSBudWxsIDtcclxuICAgIHByaXZhdGUgX3Nob3J0QnRuIDogY2MuTm9kZSA9IG51bGwgO1xyXG4gICAgcHVibGljIGluaXRVSSgpIHtcclxuICAgICAgICAvL3RvZG8g6YC76L6RXHJcbiAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgIHBhbmVsOiBHYW1lSW5mb1ZpZXcsXHJcbiAgICAgICAgICAgIGxheWVyOiBMYXllci5nYW1lSW5mb0xheWVyLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuZ2V0Tm9kZShcIm5leHRcIik7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX2J1dHRvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMub3BlblBhbmVsKHtcclxuICAgICAgICAgICAgICAgIHBhbmVsIDogR2FtZVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXllciA6IExheWVyLmdhbWVMYXllcixcclxuICAgICAgICAgICAgICAgIGNhbGwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEhvbWVWaWV3KSA7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLmNsb3NlUGFuZWwoU2hvcCkgO1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKFNpZ24pIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2V0dGluZyA9IHRoaXMuZ2V0Tm9kZShcInNldHRpbmdcIilcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvcEJ0biA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL3Nob3BJY29uXCIpXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX3Nob3BCdG4sICgpID0+IHtcclxuICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBwYW5lbCA6IFNob3AsXHJcbiAgICAgICAgICAgICAgICBsYXllciA6IExheWVyLmdhbWVMYXllclxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3J0QnRuID0gdGhpcy5nZXROb2RlKCdzaG9ydEJ0bicpIDtcclxuXHJcbiAgICAgICAgUWdBcGkuanVkZ2VTaG9ydEljb24oKS50aGVuKChyZXMgOiBib29sZWFuKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydEJ0bi5hY3RpdmUgPSByZXM7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX3Nob3J0QnRuLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFFnQXBpLmFkZFNob3J0Y3V0SWNvbigpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydEJ0bi5hY3RpdmUgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbTogYW55KSB7XHJcbiAgICAgICAgU2hvd0NvbmZpZy5zaG93KCdob21lQ29uZmlnJykudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmhvbWVDb25maWcuYmFubmVyU2hvdyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBRZ0Jhbm5lci5zaG93QmFubmVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBRZ0Jhbm5lci5oaWRlQmFubmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuaG9tZUNvbmZpZy5uYXRpdmVDb25maWcudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5lbWl0KEVtaXREYXRhLkNMT1NFX05BVElWRSkgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vdG9kbyBsb2dpYyDmlrnms5VcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/LogMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05e78fNvJNI3af2BGa5v0Hg', 'LogMgr');
// Script/Common/LogMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LogMgr = /** @class */ (function () {
    function LogMgr() {
    }
    LogMgr.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.log.apply(cc.log, args);
        }
    };
    LogMgr.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.warn.apply(cc.warn, args);
        }
    };
    LogMgr.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global_1.default.config.isLog == 1) {
            console.error.apply(cc.error, args);
        }
    };
    return LogMgr;
}());
exports.default = LogMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXExvZ01nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE4QjtBQUU5QjtJQUFBO0lBb0JBLENBQUM7SUFsQmlCLFVBQUcsR0FBakI7UUFBa0IsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDNUIsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRWEsV0FBSSxHQUFsQjtRQUFtQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUM3QixJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFYSxZQUFLLEdBQW5CO1FBQW9CLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQzlCLElBQUksZ0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi9HbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ01nciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2coLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZy5pc0xvZyA9PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNjLmxvZywgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgd2FybiguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHbG9iYWwuY29uZmlnLmlzTG9nID09IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNjLndhcm4sIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuaXNMb2cgPT0gMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNjLmVycm9yLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/Emit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d5e4GincFNvokwnifcxxO2', 'Emit');
// Script/Common/manage/Emit/Emit.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件管理器
 */
var EmitBase_1 = require("./EmitBase");
var Emit = /** @class */ (function (_super) {
    __extends(Emit, _super);
    function Emit() {
        var _this = _super.call(this) || this;
        if (Emit._instance) {
            return _this;
        }
        Emit._instance = _this;
        return _this;
    }
    Emit.instance = function () {
        return this._instance;
    };
    Emit._instance = new EmitBase_1.default();
    return Emit;
}(EmitBase_1.default));
exports.default = Emit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHVDQUFrQztBQUVsQztJQUFrQyx3QkFBUTtJQVF0QztRQUFBLFlBQ0ksaUJBQU8sU0FLVjtRQUpHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7U0FFbkI7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQzs7SUFDMUIsQ0FBQztJQVZhLGFBQVEsR0FBdEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUpnQixjQUFTLEdBQWEsSUFBSSxrQkFBUSxFQUFFLENBQUM7SUFjMUQsV0FBQztDQWhCRCxBQWdCQyxDQWhCaUMsa0JBQVEsR0FnQnpDO2tCQWhCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDkuovku7bnrqHnkIblmahcclxuICovXHJcbmltcG9ydCBFbWl0QmFzZSBmcm9tIFwiLi9FbWl0QmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdCBleHRlbmRzIEVtaXRCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogRW1pdEJhc2UgPSBuZXcgRW1pdEJhc2UoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlKCk6IEVtaXRCYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoRW1pdC5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBFbWl0Ll9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91564A1TFxPHpZ2/kzicOPw', 'LayerMgr');
// Script/Common/manage/Layer/LayerMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayerMgr = /** @class */ (function () {
    function LayerMgr() {
    }
    //这里是初始化三个父节点而已 ，实在Main中调用的，之后可以用于 UIMgr openUI 的参数
    LayerMgr.init = function (param) {
        this.gameLayer = param.gameLayer;
        this.bannerLayer = param.bannerLayer;
        this.gameInfoLayer = param.gameInfoLayer;
    };
    LayerMgr.gameLayer = null;
    LayerMgr.bannerLayer = null;
    LayerMgr.gameInfoLayer = null;
    return LayerMgr;
}());
exports.default = LayerMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQWNBLENBQUM7SUFiRyxtREFBbUQ7SUFDckMsYUFBSSxHQUFsQixVQUFtQixLQUFVO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFFYSxrQkFBUyxHQUFZLElBQUksQ0FBQztJQUUxQixvQkFBVyxHQUFZLElBQUksQ0FBQztJQUU1QixzQkFBYSxHQUFZLElBQUksQ0FBQztJQUVoRCxlQUFDO0NBZEQsQUFjQyxJQUFBO2tCQWRvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJNZ3Ige1xyXG4gICAgLy/ov5nph4zmmK/liJ3lp4vljJbkuInkuKrniLboioLngrnogIzlt7Ig77yM5a6e5ZyoTWFpbuS4reiwg+eUqOeahO+8jOS5i+WQjuWPr+S7peeUqOS6jiBVSU1nciBvcGVuVUkg55qE5Y+C5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQocGFyYW06IGFueSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUxheWVyID0gcGFyYW0uZ2FtZUxheWVyO1xyXG4gICAgICAgIHRoaXMuYmFubmVyTGF5ZXIgPSBwYXJhbS5iYW5uZXJMYXllcjtcclxuICAgICAgICB0aGlzLmdhbWVJbmZvTGF5ZXIgPSBwYXJhbS5nYW1lSW5mb0xheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2FtZUxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGJhbm5lckxheWVyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdhbWVJbmZvTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/EmitData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a2484vEg9NCJnJkpym2+TS', 'EmitData');
// Script/Common/manage/Emit/EmitData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCode = void 0;
/**
 * 事件数据
 */
var EmitData = /** @class */ (function () {
    function EmitData() {
    }
    EmitData.IN_NATIVE_NEXT = 'inNative_Next';
    EmitData.CLOSE_NATIVE = 'closeNative';
    EmitData.LOAD_GAME_SCENE = 'load_game_scene';
    return EmitData;
}());
exports.default = EmitData;
var EventCode;
(function (EventCode) {
    EventCode[EventCode["GetConfigOver"] = 0] = "GetConfigOver";
    EventCode[EventCode["PanelMgrInitOK"] = 1] = "PanelMgrInitOK";
    EventCode[EventCode["BannerBoxInitOver"] = 2] = "BannerBoxInitOver";
    EventCode[EventCode["BannerOrGridInitOK"] = 3] = "BannerOrGridInitOK";
    EventCode[EventCode["GAME_BOX_UPDATE"] = 4] = "GAME_BOX_UPDATE";
})(EventCode = exports.EventCode || (exports.EventCode = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUFBO0lBTUEsQ0FBQztJQUxpQix1QkFBYyxHQUFZLGVBQWUsQ0FBRTtJQUUzQyxxQkFBWSxHQUFZLGFBQWEsQ0FBRTtJQUV2Qyx3QkFBZSxHQUFZLGlCQUFpQixDQUFBO0lBQzlELGVBQUM7Q0FORCxBQU1DLElBQUE7a0JBTm9CLFFBQVE7QUFRN0IsSUFBWSxTQU1YO0FBTkQsV0FBWSxTQUFTO0lBQ2pCLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QsbUVBQWlCLENBQUE7SUFDakIscUVBQWtCLENBQUE7SUFDbEIsK0RBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFNcEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5LqL5Lu25pWw5o2uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0RGF0YSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOX05BVElWRV9ORVhUIDogc3RyaW5nID0gJ2luTmF0aXZlX05leHQnIDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENMT1NFX05BVElWRSA6IHN0cmluZyA9ICdjbG9zZU5hdGl2ZScgO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTE9BRF9HQU1FX1NDRU5FIDogc3RyaW5nID0gJ2xvYWRfZ2FtZV9zY2VuZSdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRXZlbnRDb2RlIHtcclxuICAgIEdldENvbmZpZ092ZXIsIC8v6I635Y+W6YWN572u5L+h5oGv5oiQ5YqfXHJcbiAgICBQYW5lbE1nckluaXRPSywgLy9wYW5lbOeuoeeQhuWZqOWIneWni+WMluWujOaIkFxyXG4gICAgQmFubmVyQm94SW5pdE92ZXIsIC8vYmFubmVyQm945Yid5aeL5YyW5oiQ5YqfXHJcbiAgICBCYW5uZXJPckdyaWRJbml0T0ssIC8vIGJhbm5lcuaIluiAheagvOWtkOWIneWni+WMluaIkOWKn1xyXG4gICAgR0FNRV9CT1hfVVBEQVRFLCAgLy9nYW1lQm946ZyA6KaB5Yi35pawXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Scene/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8438fx1oexOf4Jrd9uEt5U9', 'Game');
// Script/Scene/Game.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PanelMgr_1 = require("../Common/manage/PanelMgr");
var Emit_1 = require("../Common/manage/Emit/Emit");
var EmitData_1 = require("../Common/manage/Emit/EmitData");
var HomeView_1 = require("../Moudle/View/HomeView");
var Global_1 = require("../Common/Global");
var AudioMgr_1 = require("../Common/manage/AudioMgr");
var QgApi_1 = require("../Common/manage/Api/QgApi");
var ShowConfig_1 = require("../Common/ShowConfig");
// cc.macro.CLEANUP_IMAGE_CACHE = false;
// cc.dynamicAtlasManager.enabled = true;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.banner = null;
        return _this;
    }
    Game_1 = Game;
    Game.prototype.onLoad = function () {
        AudioMgr_1.default.backMusic();
        Game_1.Ins = this;
        if (!PanelMgr_1.default.INS) {
            Emit_1.default.instance().on(EmitData_1.EventCode.PanelMgrInitOK, this.do_after_panelMgr_initOK, this);
        }
        else {
            this.do_after_panelMgr_initOK();
        }
    };
    //PanelMgr 初始化完成之后执行的方法
    Game.prototype.do_after_panelMgr_initOK = function () {
        this.banner = this.node.getChildByName('bannerLayer').children[0];
        if (Global_1.default.isVivo) {
            QgApi_1.default.createBanner();
            ShowConfig_1.default.initEmit();
        }
        PanelMgr_1.default.INS.openPanel({
            layer: PanelMgr_1.Layer.gameLayer,
            panel: HomeView_1.default,
        });
    };
    var Game_1;
    //Game实例
    Game.Ins = null;
    Game = Game_1 = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTY2VuZVxcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBZ0U7QUFDaEUsbURBQThDO0FBQzlDLDJEQUF5RDtBQUN6RCxvREFBK0M7QUFDL0MsMkNBQXNDO0FBQ3RDLHNEQUFpRDtBQUNqRCxvREFBK0M7QUFDL0MsbURBQThDO0FBRTlDLHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFnQ0M7UUEvQkcsWUFBTSxHQUFZLElBQUksQ0FBQTs7SUErQjFCLENBQUM7YUFoQ29CLElBQUk7SUFNckIscUJBQU0sR0FBTjtRQUNJLGtCQUFRLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDcEIsTUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUU7UUFFakIsSUFBSSxDQUFDLGtCQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2YsY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxvQkFBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDcEY7YUFBTTtZQUNILElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELHVCQUF1QjtJQUN2Qix1Q0FBd0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLGdCQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsZUFBSyxDQUFDLFlBQVksRUFBRSxDQUFFO1lBQ3RCLG9CQUFVLENBQUMsUUFBUSxFQUFFLENBQUU7U0FDMUI7UUFFRCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxFQUFFLGdCQUFLLENBQUMsU0FBUztZQUN0QixLQUFLLEVBQUUsa0JBQVE7U0FDbEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7SUEzQkQsUUFBUTtJQUNNLFFBQUcsR0FBUyxJQUFJLENBQUM7SUFKZCxJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBZ0N4QjtJQUFELFdBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ2lDLEVBQUUsQ0FBQyxTQUFTLEdBZ0M3QztrQkFoQ29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFuZWxNZ3IsIHtMYXllciwgVmlld30gZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvUGFuZWxNZ3JcIjtcclxuaW1wb3J0IEVtaXQgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0XCI7XHJcbmltcG9ydCB7RXZlbnRDb2RlfSBmcm9tIFwiLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXREYXRhXCI7XHJcbmltcG9ydCBIb21lVmlldyBmcm9tIFwiLi4vTW91ZGxlL1ZpZXcvSG9tZVZpZXdcIjtcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQ29tbW9uL0dsb2JhbFwiO1xyXG5pbXBvcnQgQXVkaW9NZ3IgZnJvbSBcIi4uL0NvbW1vbi9tYW5hZ2UvQXVkaW9NZ3JcIjtcclxuaW1wb3J0IFFnQXBpIGZyb20gXCIuLi9Db21tb24vbWFuYWdlL0FwaS9RZ0FwaVwiO1xyXG5pbXBvcnQgU2hvd0NvbmZpZyBmcm9tIFwiLi4vQ29tbW9uL1Nob3dDb25maWdcIjtcclxuXHJcbi8vIGNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUgPSBmYWxzZTtcclxuLy8gY2MuZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIGJhbm5lcjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICAvL0dhbWXlrp7kvotcclxuICAgIHB1YmxpYyBzdGF0aWMgSW5zOiBHYW1lID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgQXVkaW9NZ3IuYmFja011c2ljKClcclxuICAgICAgICBHYW1lLklucyA9IHRoaXMgO1xyXG5cclxuICAgICAgICBpZiAoIVBhbmVsTWdyLklOUykge1xyXG4gICAgICAgICAgICBFbWl0Lmluc3RhbmNlKCkub24oRXZlbnRDb2RlLlBhbmVsTWdySW5pdE9LLCB0aGlzLmRvX2FmdGVyX3BhbmVsTWdyX2luaXRPSywgdGhpcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRvX2FmdGVyX3BhbmVsTWdyX2luaXRPSygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vUGFuZWxNZ3Ig5Yid5aeL5YyW5a6M5oiQ5LmL5ZCO5omn6KGM55qE5pa55rOVXHJcbiAgICBkb19hZnRlcl9wYW5lbE1ncl9pbml0T0soKSB7XHJcbiAgICAgICAgdGhpcy5iYW5uZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jhbm5lckxheWVyJykuY2hpbGRyZW5bMF07XHJcblxyXG4gICAgICAgIGlmIChHbG9iYWwuaXNWaXZvKSB7XHJcbiAgICAgICAgICAgIFFnQXBpLmNyZWF0ZUJhbm5lcigpIDtcclxuICAgICAgICAgICAgU2hvd0NvbmZpZy5pbml0RW1pdCgpIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICBsYXllcjogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICBwYW5lbDogSG9tZVZpZXcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Api/QgApi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cdd4dv45ZdCF7WRpcG9r/94', 'QgApi');
// Script/Common/manage/Api/QgApi.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flyio_1 = require("flyio");
var QgRewardedAd_1 = require("./QgRewardedAd");
var QgIntersAd_1 = require("./QgIntersAd");
var QgBanner_1 = require("./QgBanner");
var Global_1 = require("../../Global");
var QgNative_1 = require("./QgNative");
var LogMgr_1 = require("../../LogMgr");
var QgApi = /** @class */ (function () {
    function QgApi() {
    }
    QgApi.createAdv = function () {
        if (!Global_1.default.isVivo)
            return;
        this.createVideo();
        this.createInters();
        this.createNative();
    };
    QgApi.createBanner = function () {
        if (!Global_1.default.isVivo)
            return;
        this.createBannerAd();
    };
    QgApi.createVideo = function () {
        var _this = this;
        QgRewardedAd_1.default.createRewardedVideo().then(function () {
            QgRewardedAd_1.default.loadRewardedVideo().then();
        }).catch(function () {
            setTimeout(function () {
                if (!QgRewardedAd_1.default.isLoad_Rewarded) {
                    _this.createVideo();
                }
            }, 5000);
        });
    };
    QgApi.createInters = function () {
        var _this = this;
        QgIntersAd_1.default.createInters().then().catch(function () {
            setTimeout(function () {
                if (!QgIntersAd_1.default.isLoad_Inters) {
                    _this.createInters();
                }
            }, 5000);
        });
    };
    QgApi.createNative = function () {
        var _this = this;
        QgNative_1.default.createNative().then(function () {
            QgNative_1.default.loadNative().then();
        }).catch(function () {
            setTimeout(function () {
                if (!QgNative_1.default.isLoad_Native) {
                    _this.createNative();
                }
            }, 5000);
        });
    };
    QgApi.createBannerAd = function () {
        var _this = this;
        QgBanner_1.default.createBanner().then(function () {
            if (Global_1.default.config.gameConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
        }).catch(function () {
            setTimeout(function () {
                if (!QgBanner_1.default.isLoad) {
                    _this.createBannerAd();
                }
            }, 5000);
        });
    };
    /**
     * 发起HTTPS网络请求
     */
    QgApi.sponsorHttps = function (options) {
        if (!options.hasOwnProperty("url")) {
            console.warn("request param  url is  null");
            return;
        }
        var url = options.url;
        var data = null;
        var param = {};
        if (!options.hasOwnProperty("method")) {
            param.method = "GET";
        }
        else {
            param.method = options.method;
        }
        if (options.hasOwnProperty("data")) {
            data = options.data;
        }
        if (options.hasOwnProperty("timeOut")) {
            param.timeout = options.timeout;
        }
        if (options.hasOwnProperty("header")) {
            param.headers = options.header;
        }
        param.pareseJson = true;
        flyio_1.default.request(url, data, param).then(function (data) {
            if (options.hasOwnProperty("success")) {
                options.success(data);
            }
        }).catch(function (e) {
            if (options.hasOwnProperty("fail")) {
                options.fail(data);
            }
        });
    };
    /**
     * 登录
     */
    QgApi.login = function () {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            if (qg.getSystemInfoSync().platformVersionCode >= 1063) {
                // @ts-ignore
                window.qg.login().then(function (res) {
                    if (res.data.token) {
                        console.log('登录成功!!', res.data.token);
                        resolve(res.data.token);
                    }
                }, function (err) {
                    resolve(false);
                    console.error('登录失败' + JSON.stringify(err));
                });
            }
            else {
                resolve(false);
                console.error('版本号过低，无法登录');
            }
        });
    };
    /**
     * 分享
     */
    QgApi.share = function () {
        // @ts-ignore
        qg.share();
    };
    /**
     * 判断是否已创建桌面图标
     */
    QgApi.judgeShortIcon = function () {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            qg.hasShortcutInstalled({
                success: function (res) {
                    if (res) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                },
                fail: function (err) {
                    LogMgr_1.default.log(err);
                    reject(false);
                }
            });
        });
    };
    /**
     * 添加桌面图标
     */
    QgApi.addShortcutIcon = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.judgeShortIcon().then(function (res) {
                if (res) {
                    // @ts-ignore
                    qg.installShortcut({
                        message: '创建桌面游戏图标，快捷进入游戏！',
                        success: function () {
                            LogMgr_1.default.log('创建成功');
                            resolve(true);
                        },
                        fail: function () {
                            LogMgr_1.default.error('创建失败');
                            resolve(false);
                        }
                    });
                }
                else {
                    resolve(false);
                    return;
                }
            }).catch(function () {
                resolve(false);
                return;
            });
        });
    };
    return QgApi;
}());
exports.default = QgApi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcQXBpXFxRZ0FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUF3QjtBQUN4QiwrQ0FBMEM7QUFDMUMsMkNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyx1Q0FBa0M7QUFDbEMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUVsQztJQUFBO0lBOExBLENBQUM7SUEzTGlCLGVBQVMsR0FBdkI7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNO1lBQUMsT0FBUTtRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFFO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBRTtJQUN6QixDQUFDO0lBRWEsa0JBQVksR0FBMUI7UUFDSSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxNQUFNO1lBQUMsT0FBUTtRQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUU7SUFDM0IsQ0FBQztJQUVjLGlCQUFXLEdBQTFCO1FBQUEsaUJBVUM7UUFURyxzQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3BDLHNCQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTCxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLHNCQUFZLENBQUMsZUFBZSxFQUFFO29CQUMvQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUU7aUJBQ3ZCO1lBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ1gsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRWMsa0JBQVksR0FBM0I7UUFBQSxpQkFRQztRQVBHLG9CQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25DLFVBQVUsQ0FBQztnQkFDUCxJQUFJ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O0FBQUQsQ0E5TEEsQUE4TEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmbHkgZnJvbSBcImZseWlvXCI7XHJcbmltcG9ydCBRZ1Jld2FyZGVkQWQgZnJvbSBcIi4vUWdSZXdhcmRlZEFkXCI7XHJcbmltcG9ydCBRZ0ludGVyc0FkIGZyb20gXCIuL1FnSW50ZXJzQWRcIjtcclxuaW1wb3J0IFFnQmFubmVyIGZyb20gXCIuL1FnQmFubmVyXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0dsb2JhbFwiO1xyXG5pbXBvcnQgUWdOYXRpdmUgZnJvbSBcIi4vUWdOYXRpdmVcIjtcclxuaW1wb3J0IExvZ01nciBmcm9tIFwiLi4vLi4vTG9nTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRZ0FwaSB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWR2ICgpIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pcmV0dXJuIDtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZGVvKCkgO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJzKCkgO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTmF0aXZlKCkgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQmFubmVyICgpIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5pc1Zpdm8pcmV0dXJuIDtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJhbm5lckFkKCkgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVZpZGVvKCkge1xyXG4gICAgICAgIFFnUmV3YXJkZWRBZC5jcmVhdGVSZXdhcmRlZFZpZGVvKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBRZ1Jld2FyZGVkQWQubG9hZFJld2FyZGVkVmlkZW8oKS50aGVuKClcclxuICAgICAgICB9KS5jYXRjaCgoKT0+e1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIVFnUmV3YXJkZWRBZC5pc0xvYWRfUmV3YXJkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZGVvKCkgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LDUwMDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVJbnRlcnMoKSB7XHJcbiAgICAgICAgUWdJbnRlcnNBZC5jcmVhdGVJbnRlcnMoKS50aGVuKCkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFRZ0ludGVyc0FkLmlzTG9hZF9JbnRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVycygpIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSw1MDAwKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlTmF0aXZlKCkge1xyXG4gICAgICAgIFFnTmF0aXZlLmNyZWF0ZU5hdGl2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgUWdOYXRpdmUubG9hZE5hdGl2ZSgpLnRoZW4oKSA7XHJcbiAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFRZ05hdGl2ZS5pc0xvYWRfTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOYXRpdmUoKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUJhbm5lckFkKCkge1xyXG4gICAgICAgIFFnQmFubmVyLmNyZWF0ZUJhbm5lcigpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuZ2FtZUNvbmZpZy5iYW5uZXJTaG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLnNob3dCYW5uZXIoKSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoKT0+e1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIVFnQmFubmVyLmlzTG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFubmVyQWQoKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sNTAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6LW3SFRUUFPnvZHnu5zor7fmsYJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzcG9uc29ySHR0cHMob3B0aW9ucykge1xyXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInVybFwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJyZXF1ZXN0IHBhcmFtICB1cmwgaXMgIG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cmwgPSBvcHRpb25zLnVybFxyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSBudWxsXHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcIm1ldGhvZFwiKSkge1xyXG4gICAgICAgICAgICBwYXJhbS5tZXRob2QgPSBcIkdFVFwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW0ubWV0aG9kID0gb3B0aW9ucy5tZXRob2RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiZGF0YVwiKSkge1xyXG4gICAgICAgICAgICBkYXRhID0gb3B0aW9ucy5kYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInRpbWVPdXRcIikpIHtcclxuICAgICAgICAgICAgcGFyYW0udGltZW91dCA9IG9wdGlvbnMudGltZW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJoZWFkZXJcIikpIHtcclxuICAgICAgICAgICAgcGFyYW0uaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtLnBhcmVzZUpzb24gPSB0cnVlXHJcblxyXG4gICAgICAgIGZseS5yZXF1ZXN0KHVybCwgZGF0YSwgcGFyYW0pLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwic3VjY2Vzc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKGRhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJmYWlsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZhaWwoZGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55m75b2VXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9naW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAocWcuZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlID49IDEwNjMpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5xZy5sb2dpbigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5oiQ5YqfISEnLCByZXMuZGF0YS50b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eZu+W9leWksei0pScgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eJiOacrOWPt+i/h+S9ju+8jOaXoOazleeZu+W9lScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5LqrXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhcmUoKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHFnLnNoYXJlKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuW3suWIm+W7uuahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGp1ZGdlU2hvcnRJY29uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHFnLmhhc1Nob3J0Y3V0SW5zdGFsbGVkKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiAocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSkgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwgOiAoZXJyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ01nci5sb2coZXJyKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOahjOmdouWbvuagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZFNob3J0Y3V0SWNvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmp1ZGdlU2hvcnRJY29uKCkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBxZy5pbnN0YWxsU2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogJ+WIm+W7uuahjOmdoua4uOaIj+Wbvuagh++8jOW/q+aNt+i/m+WFpea4uOaIj++8gScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmxvZygn5Yib5bu65oiQ5YqfJykgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCfliJvlu7rlpLHotKUnKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9PntcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpIDtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Layer/LayerUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07b55fvQGxH34PGtUdVwK/o', 'LayerUI');
// Script/Common/manage/Layer/LayerUI.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AudioMgr_1 = require("../AudioMgr");
var GameLogMgr_1 = require("../GameLogMgr");
/**
 * 这个是 封装了一些方法  ，例如 注册点击事件 销毁事件 等等
 */
var ccclass = cc._decorator.ccclass;
var LayerUI = /** @class */ (function (_super) {
    __extends(LayerUI, _super);
    function LayerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._touchList = {};
        _this._touchEndList = {};
        _this._enableList = {};
        return _this;
    }
    /**
     * 是否交互 需在target注册onTouch之后
     * @param target
     * @param v
     * @param isGray
     */
    LayerUI.prototype.setInteractable = function (target, v, isGray) {
        if (isGray === void 0) { isGray = true; }
        if (!target)
            return;
        var button = target.getComponent(cc.Button);
        if (button) {
            button.enableAutoGrayEffect = isGray;
            button.interactable = v;
        }
        this._enableList[target.name] = { enabled: v, isGray: isGray };
    };
    /**
     *  注册点击事件
     * @param target    点击对象
     * @param handler   触发事件
     * @param sound     播放声音名称
     * @param scale     缩放值
     * @param stopEvent
     */
    LayerUI.prototype.onTouch = function (target, handler, sound, scale, stopEvent) {
        var _this = this;
        if (sound === void 0) { sound = "click"; }
        if (scale === void 0) { scale = 0.9; }
        if (stopEvent === void 0) { stopEvent = true; }
        if (!target || !handler) {
            GameLogMgr_1.default.error("target || handler为空-->", target, handler);
            return;
        }
        var targetName = target.name;
        if (this._touchList[targetName] && this._touchList[targetName].target == target) {
            GameLogMgr_1.default.warn("重复设置-->", targetName);
            return;
        }
        //添加一个button 动画
        var button = target.getComponent(cc.Button);
        if (scale != 1) {
            if (!button) {
                button = target.addComponent(cc.Button);
                button.transition = cc.Button.Transition.SCALE;
                button.zoomScale = scale;
            }
        }
        var enabled = true;
        var isGray = true;
        if (this._enableList[target.name]) {
            enabled = this._enableList[target.name].enabled;
            isGray = this._enableList[target.name].isGray;
        }
        this.setInteractable(target, enabled, isGray);
        var callObj = this;
        var touchHandler = function (event) {
            var _a = (_this._enableList[target.name] || {}).enabled, enabled = _a === void 0 ? true : _a;
            if (!enabled) {
                return;
            }
            if (stopEvent) {
                event.stopPropagation();
            }
            if (sound && sound != "") {
                // if (sound === "check") {
                // sound = "piano/a" + Math.floor(Math.random() * (5 - 1) + 1);
                // }
                AudioMgr_1.default.play(sound).then();
            }
            handler.call(callObj, event);
        };
        target.on(cc.Node.EventType.TOUCH_START, touchHandler);
        this._touchList[targetName] = { target: target, handler: touchHandler, callObj: callObj };
    };
    LayerUI.prototype.onTouchEnd = function (target, handler) {
        if (!target || !handler) {
            GameLogMgr_1.default.error("target || handle为空 ondTouchEnd -->", target, handler);
            return;
        }
        var targetName = target.name;
        if (this._touchEndList[targetName] && this._touchEndList[targetName].target == target) {
            GameLogMgr_1.default.warn("重复设置 --> onTouchEnd ", targetName);
        }
        var callObj = this;
        var touchHandler = function (event) {
            handler.call(callObj, event);
        };
        target.on(cc.Node.EventType.TOUCH_END, touchHandler);
        target.on(cc.Node.EventType.TOUCH_CANCEL, touchHandler);
        this._touchEndList[targetName] = { target: target, handler: touchHandler, callObj: callObj };
    };
    LayerUI.prototype.offTouchEnd = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("target 为空 ");
            return;
        }
        var targetName = target.name;
        if (this._touchEndList[targetName]) {
            var handler = this._touchEndList[targetName].handler;
            target.off(cc.Node.EventType.TOUCH_END, handler);
            target.off(cc.Node.EventType.TOUCH_CANCEL, handler);
            delete this._touchEndList[targetName];
        }
    };
    /**
     * 移除对象点击事件
     * @param target
     */
    LayerUI.prototype.offTouch = function (target) {
        if (!target) {
            GameLogMgr_1.default.error("target 为空");
            return;
        }
        var targetName = target.name;
        if (this._touchList[targetName]) {
            var touchHandler = this._touchList[targetName].handler;
            target.off(cc.Node.EventType.TOUCH_START, touchHandler);
            delete this._touchList[targetName];
        }
        delete this._enableList[targetName];
    };
    LayerUI.prototype.clear = function () {
        for (var key in this._touchList) {
            this.offTouch(this._touchList[key].target);
        }
    };
    LayerUI.prototype.onDestroy = function () {
        this.clear();
    };
    /**
     *
     * @param path 路径或者名字
     */
    LayerUI.prototype.getNode = function (path) {
        var node = null;
        if (path == "" || !path)
            return null;
        if (path.indexOf("/") != -1) {
            node = cc.find(path, this.node);
        }
        else {
            node = this.node.getChildByName(path);
        }
        if (!node) {
            GameLogMgr_1.default.warn("未找到该节点  path=", path);
        }
        return node;
    };
    LayerUI = __decorate([
        ccclass
    ], LayerUI);
    return LayerUI;
}(cc.Component));
exports.default = LayerUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTGF5ZXJcXExheWVyVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQW1DO0FBQ25DLDRDQUFvQztBQUVwQzs7R0FFRztBQUNJLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBeUtDO1FBdktXLGdCQUFVLEdBQW9ELEVBQUUsQ0FBQztRQUNqRSxtQkFBYSxHQUFvRCxFQUFFLENBQUE7UUFFbkUsaUJBQVcsR0FBNkQsRUFBRSxDQUFDOztJQW9LdkYsQ0FBQztJQWpLRzs7Ozs7T0FLRztJQUNPLGlDQUFlLEdBQXpCLFVBQTBCLE1BQWUsRUFBRSxDQUFVLEVBQUUsTUFBc0I7UUFBdEIsdUJBQUEsRUFBQSxhQUFzQjtRQUN6RSxJQUFJLENBQUMsTUFBTTtZQUNQLE9BQU87UUFDWCxJQUFJLE1BQU0sR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7WUFDckMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLHlCQUFPLEdBQWpCLFVBQWtCLE1BQWUsRUFBRSxPQUFpQixFQUFFLEtBQXVCLEVBQUUsS0FBVyxFQUFFLFNBQWdCO1FBQTVHLGlCQW1EQztRQW5EcUQsc0JBQUEsRUFBQSxlQUF1QjtRQUFFLHNCQUFBLEVBQUEsV0FBVztRQUFFLDBCQUFBLEVB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QUdHO0lBQ08seUJBQU8sR0FBakIsVUFBa0IsSUFBWTtRQUMxQixJQUFJLElBQUksR0FBWSxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNuQixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLG9CQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF2S2dCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F5SzNCO0lBQUQsY0FBQztDQXpLRCxBQXlLQyxDQXpLb0MsRUFBRSxDQUFDLFNBQVMsR0F5S2hEO2tCQXpLb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdWRpb01nciBmcm9tIFwiLi4vQXVkaW9NZ3JcIjtcclxuaW1wb3J0IEdhbWVMb2cgZnJvbSBcIi4uL0dhbWVMb2dNZ3JcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nkuKrmmK8g5bCB6KOF5LqG5LiA5Lqb5pa55rOVICDvvIzkvovlpoIg5rOo5YaM54K55Ye75LqL5Lu2IOmUgOavgeS6i+S7tiDnrYnnrYlcclxuICovXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllclVJIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF90b3VjaExpc3Q6IHsgW2tleTogc3RyaW5nXTogeyB0YXJnZXQsIGhhbmRsZXIsIGNhbGxPYmogfSB9ID0ge307XHJcbiAgICBwcml2YXRlIF90b3VjaEVuZExpc3Q6IHsgW2tleTogc3RyaW5nXTogeyB0YXJnZXQsIGhhbmRsZXIsIGNhbGxPYmogfSB9ID0ge31cclxuXHJcbiAgICBwcml2YXRlIF9lbmFibGVMaXN0OiB7IFtrZXk6IHN0cmluZ106IHsgZW5hYmxlZDogYm9vbGVhbiwgaXNHcmF5OiBib29sZWFuIH0gfSA9IHt9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS6pOS6kiDpnIDlnKh0YXJnZXTms6jlhoxvblRvdWNo5LmL5ZCOXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICogQHBhcmFtIGlzR3JheVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0SW50ZXJhY3RhYmxlKHRhcmdldDogY2MuTm9kZSwgdjogYm9vbGVhbiwgaXNHcmF5OiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gdGFyZ2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgYnV0dG9uLmVuYWJsZUF1dG9HcmF5RWZmZWN0ID0gaXNHcmF5O1xyXG4gICAgICAgICAgICBidXR0b24uaW50ZXJhY3RhYmxlID0gdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlTGlzdFt0YXJnZXQubmFtZV0gPSB7ZW5hYmxlZDogdiwgaXNHcmF5fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDms6jlhozngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgICAg54K55Ye75a+56LGhXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlciAgIOinpuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHNvdW5kICAgICDmkq3mlL7lo7Dpn7PlkI3np7BcclxuICAgICAqIEBwYXJhbSBzY2FsZSAgICAg57yp5pS+5YC8XHJcbiAgICAgKiBAcGFyYW0gc3RvcEV2ZW50XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblRvdWNoKHRhcmdldDogY2MuTm9kZSwgaGFuZGxlcjogRnVuY3Rpb24sIHNvdW5kOiBzdHJpbmcgPSBcImNsaWNrXCIsIHNjYWxlID0gMC45LCBzdG9wRXZlbnQgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgIWhhbmRsZXIpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcInRhcmdldCB8fCBoYW5kbGVy5Li656m6LS0+XCIsIHRhcmdldCwgaGFuZGxlcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXROYW1lOiBzdHJpbmcgPSB0YXJnZXQubmFtZTtcclxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdICYmIHRoaXMuX3RvdWNoTGlzdFt0YXJnZXROYW1lXS50YXJnZXQgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cud2FybihcIumHjeWkjeiuvue9ri0tPlwiLCB0YXJnZXROYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mt7vliqDkuIDkuKpidXR0b24g5Yqo55S7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICBpZiAoc2NhbGUgIT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGFyZ2V0LmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnRyYW5zaXRpb24gPSBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi56b29tU2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBlbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaXNHcmF5ID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5fZW5hYmxlTGlzdFt0YXJnZXQubmFtZV0pIHtcclxuICAgICAgICAgICAgZW5hYmxlZCA9IHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0Lm5hbWVdLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGlzR3JheSA9IHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0Lm5hbWVdLmlzR3JheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SW50ZXJhY3RhYmxlKHRhcmdldCwgZW5hYmxlZCwgaXNHcmF5KTtcclxuXHJcbiAgICAgICAgbGV0IGNhbGxPYmogPSB0aGlzO1xyXG4gICAgICAgIGxldCB0b3VjaEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtlbmFibGVkID0gdHJ1ZX0gPSB0aGlzLl9lbmFibGVMaXN0W3RhcmdldC5uYW1lXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKCFlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0b3BFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNvdW5kICYmIHNvdW5kICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChzb3VuZCA9PT0gXCJjaGVja1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzb3VuZCA9IFwicGlhbm8vYVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDUgLSAxKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShzb3VuZCkudGhlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjYWxsT2JqLCBldmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRvdWNoSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdID0ge3RhcmdldDogdGFyZ2V0LCBoYW5kbGVyOiB0b3VjaEhhbmRsZXIsIGNhbGxPYmo6IGNhbGxPYmp9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblRvdWNoRW5kKHRhcmdldDogY2MuTm9kZSwgaGFuZGxlcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRhcmdldCB8fCAhaGFuZGxlcikge1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKFwidGFyZ2V0IHx8IGhhbmRsZeS4uuepuiBvbmRUb3VjaEVuZCAtLT5cIiwgdGFyZ2V0LCBoYW5kbGVyKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldE5hbWU6IHN0cmluZyA9IHRhcmdldC5uYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXSAmJiB0aGlzLl90b3VjaEVuZExpc3RbdGFyZ2V0TmFtZV0udGFyZ2V0ID09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLph43lpI3orr7nva4gLS0+IG9uVG91Y2hFbmQgXCIsIHRhcmdldE5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FsbE9iaiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRvdWNoSGFuZGxlciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwoY2FsbE9iaiwgZXZlbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGFyZ2V0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdG91Y2hIYW5kbGVyKTtcclxuICAgICAgICB0YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0b3VjaEhhbmRsZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl90b3VjaEVuZExpc3RbdGFyZ2V0TmFtZV0gPSB7dGFyZ2V0OiB0YXJnZXQsIGhhbmRsZXI6IHRvdWNoSGFuZGxlciwgY2FsbE9iajogY2FsbE9ian07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9mZlRvdWNoRW5kKHRhcmdldDogY2MuTm9kZSkge1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoXCJ0YXJnZXQg5Li656m6IFwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldE5hbWU6IHN0cmluZyA9IHRhcmdldC5uYW1lXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXSkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXS5oYW5kbGVyXHJcbiAgICAgICAgICAgIHRhcmdldC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBoYW5kbGVyKVxyXG4gICAgICAgICAgICB0YXJnZXQub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgaGFuZGxlcilcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoRW5kTGlzdFt0YXJnZXROYW1lXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOWvueixoeeCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb2ZmVG91Y2godGFyZ2V0OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcInRhcmdldCDkuLrnqbpcIik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFyZ2V0TmFtZTogc3RyaW5nID0gdGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdFt0YXJnZXROYW1lXSkge1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hIYW5kbGVyID0gdGhpcy5fdG91Y2hMaXN0W3RhcmdldE5hbWVdLmhhbmRsZXI7XHJcbiAgICAgICAgICAgIHRhcmdldC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRvdWNoSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl90b3VjaExpc3RbdGFyZ2V0TmFtZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2VuYWJsZUxpc3RbdGFyZ2V0TmFtZV1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGNsZWFyKCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl90b3VjaExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZUb3VjaCh0aGlzLl90b3VjaExpc3Rba2V5XS50YXJnZXQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aCDot6/lvoTmiJbogIXlkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE5vZGUocGF0aDogc3RyaW5nKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmIChwYXRoID09IFwiXCIgfHwgIXBhdGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIvXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5maW5kKHBhdGgsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShwYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLmnKrmib7liLDor6XoioLngrkgIHBhdGg9XCIsIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/NativeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1918avBtcdAv7HTwHdhUQ91', 'NativeView');
// Script/Moudle/View/NativeView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var QgNative_1 = require("../../Common/manage/Api/QgNative");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TOUCH_START = cc.Node.EventType.TOUCH_START;
var NativeView = /** @class */ (function (_super) {
    __extends(NativeView, _super);
    function NativeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.native_inters = null;
        _this.native_implant = null;
        _this.nativeMessage = null;
        _this.currSprite = null;
        _this.adId = null;
        _this.labelType = null;
        _this.labelArr = ['点击查看', '点击跳过'];
        _this.type = null;
        return _this;
        // update (dt) {}
    }
    NativeView_1 = NativeView;
    NativeView.getUrl = function () {
        return {
            bundle: "nativeView",
            name: "nativeView"
        };
    };
    NativeView.prototype.initUI = function () {
        this.initTouch();
    };
    NativeView.prototype.show = function (param) {
        var _this = this;
        this.node.getChildByName('inputEvent').active = false;
        this.node.getChildByName('inputEvent_implant').active = false;
        this.native_inters.active = false;
        this.native_implant.active = false;
        this.labelType = param.labelType;
        this.type = param.type;
        this.scheduleOnce(function () {
            if (QgNative_1.default.nativeMessage != null) {
                _this.nativeMessage = QgNative_1.default.nativeMessage;
                _this.open_type(param.type);
            }
            else {
                QgNative_1.default.loadNative().then(function (res) {
                    if (res && res != false) {
                        _this.nativeMessage = res;
                        _this.open_type(param.type);
                    }
                    else {
                    }
                });
            }
        }, param.time);
        if (this.type == 2) {
            Emit_1.default.instance().on(EmitData_1.default.CLOSE_NATIVE, this.closeNative, this);
        }
    };
    NativeView.prototype.openNative = function (node) {
        var _this = this;
        node.getChildByName('title').getComponent(cc.Label).string = this.nativeMessage.desc;
        var imgUrl = null;
        if (this.nativeMessage.imgUrlList && this.nativeMessage.imgUrlList.length > 0) {
            imgUrl = this.nativeMessage.imgUrlList[0];
        }
        if (imgUrl != null) {
            cc.assetManager.loadRemote(imgUrl, { ext: '.png' }, function (err, asset) {
                if (err) {
                    console.error('原生广告图片加载错误>>>>>>', err);
                    return;
                }
                _this.currSprite = asset;
                node.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(_this.currSprite);
            });
        }
        this.adId = this.nativeMessage.adId;
        QgNative_1.default.repAdShow(this.nativeMessage.adId);
    };
    NativeView.prototype.open_type = function (type) {
        var _this = this;
        if (!this.nativeMessage) {
            return;
        }
        if (type == 1) {
            this.node.getChildByName('inputEvent').active = true;
            this.native_inters.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1];
            this.native_inters.getChildByName('close').active = false;
            this.native_inters.active = true;
            this.scheduleOnce(function () {
                _this.native_inters.getChildByName('close').active = true;
            }, 2);
            this.openNative(this.native_inters);
        }
        if (type == 2) {
            QgBanner_1.default.hideBanner();
            this.node.getChildByName('inputEvent_implant').active = true;
            this.native_implant.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1];
            this.native_implant.getChildByName('close').active = false;
            this.native_implant.active = true;
            this.scheduleOnce(function () {
                _this.native_implant.getChildByName('close').active = true;
            }, 2);
            this.openNative(this.native_implant);
        }
    };
    NativeView.prototype.initTouch = function () {
        var _this = this;
        this.native_inters.getChildByName('image').on(TOUCH_START, function () {
            QgNative_1.default.repAdClick(_this.adId);
        });
        this.native_implant.getChildByName('image').on(TOUCH_START, function () {
            QgNative_1.default.repAdClick(_this.adId);
        });
        this.native_inters.getChildByName('nativeBtn').on(TOUCH_START, function () {
            _this.handlerNativeBtn();
        });
        this.native_implant.getChildByName('nativeBtn').on(TOUCH_START, function () {
            _this.handlerNativeBtn();
        });
        this.native_inters.getChildByName('close').on(TOUCH_START, function () {
            _this.closeNative();
        });
        this.native_implant.getChildByName('close').on(TOUCH_START, function () {
            _this.closeNative();
        });
    };
    NativeView.prototype.handlerNativeBtn = function () {
        if (this.labelType == 1) {
            QgNative_1.default.repAdClick(this.adId);
        }
        else {
            this.closeNative();
        }
    };
    NativeView.prototype.hide = function () {
        QgNative_1.default.anewLoad();
        Emit_1.default.instance().emit(EmitData_1.default.IN_NATIVE_NEXT);
        if (this.type == 2) {
            QgBanner_1.default.showBanner();
            Emit_1.default.instance().off(EmitData_1.default.CLOSE_NATIVE, this.closeNative, this);
        }
    };
    NativeView.prototype.closeNative = function () {
        PanelMgr_1.default.INS.closePanel(NativeView_1, false);
    };
    var NativeView_1;
    __decorate([
        property(cc.Node)
    ], NativeView.prototype, "native_inters", void 0);
    __decorate([
        property(cc.Node)
    ], NativeView.prototype, "native_implant", void 0);
    NativeView = NativeView_1 = __decorate([
        ccclass
    ], NativeView);
    return NativeView;
}(LayerPanel_1.default));
exports.default = NativeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXE5hdGl2ZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQXlFO0FBRXpFLDZEQUF3RDtBQUN4RCxzREFBaUQ7QUFDakQsOERBQXlEO0FBQ3pELDZEQUF3RDtBQUN4RCx5REFBb0Q7QUFFOUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFbkMsSUFBQSxXQUFXLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLFlBQXJCLENBQXVCO0FBR3pDO0lBQXdDLDhCQUFVO0lBQWxEO1FBQUEscUVBK0tDO1FBcktHLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRXZCLG1CQUFhLEdBQVMsSUFBSSxDQUFFO1FBRTVCLGdCQUFVLEdBQWtCLElBQUksQ0FBRTtRQUVsQyxVQUFJLEdBQVksSUFBSSxDQUFFO1FBRXRCLGVBQVMsR0FBWSxJQUFJLENBQUU7UUFFM0IsY0FBUSxHQUFjLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFFO1FBRXZDLFVBQUksR0FBWSxJQUFJLENBQUU7O1FBcUo5QixpQkFBaUI7SUFDckIsQ0FBQzttQkEvS29CLFVBQVU7SUFFYixpQkFBTSxHQUFwQjtRQUNJLE9BQU87WUFDSCxNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFBO0lBQ0wsQ0FBQztJQW9CRCwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFFO0lBQ3RCLENBQUM7SUFFRCx5QkFBSSxHQUFKLFVBQUssS0FBVTtRQUFmLGlCQThCQztRQTdCRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO1FB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O0lBYmQsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQStLOUI7SUFBRCxpQkFBQztDQS9LRCxBQStLQyxDQS9LdUMsb0JBQVUsR0ErS2pEO2tCQS9Lb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXllclBhbmVsLCB7VXJsSW5mb30gZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTGF5ZXIvTGF5ZXJQYW5lbFwiO1xyXG5pbXBvcnQgVGV4dHVyZTJEID0gY2MuVGV4dHVyZTJEO1xyXG5pbXBvcnQgUWdOYXRpdmUgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnTmF0aXZlXCI7XHJcbmltcG9ydCBFbWl0IGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0VtaXQvRW1pdFwiO1xyXG5pbXBvcnQgRW1pdERhdGEgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvRW1pdC9FbWl0RGF0YVwiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvQXBpL1FnQmFubmVyXCI7XHJcbmltcG9ydCBQYW5lbE1nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCB7VE9VQ0hfU1RBUlR9ID0gY2MuTm9kZS5FdmVudFR5cGUgO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF0aXZlVmlldyBleHRlbmRzIExheWVyUGFuZWwge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ1bmRsZTogXCJuYXRpdmVWaWV3XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwibmF0aXZlVmlld1wiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbmF0aXZlX2ludGVyczogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBuYXRpdmVfaW1wbGFudDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVNZXNzYWdlIDogYW55ID0gbnVsbCA7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyU3ByaXRlIDogY2MuVGV4dHVyZTJEID0gbnVsbCA7XHJcblxyXG4gICAgcHJpdmF0ZSBhZElkIDogc3RyaW5nID0gbnVsbCA7XHJcblxyXG4gICAgcHJpdmF0ZSBsYWJlbFR5cGUgOiBudW1iZXIgPSBudWxsIDtcclxuXHJcbiAgICBwcml2YXRlIGxhYmVsQXJyIDogc3RyaW5nW10gPSBbJ+eCueWHu+afpeeciycsJ+eCueWHu+i3s+i/hyddIDtcclxuXHJcbiAgICBwcml2YXRlIHR5cGUgOiBudW1iZXIgPSBudWxsIDtcclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0VG91Y2goKSA7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhwYXJhbTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbnB1dEV2ZW50JykuYWN0aXZlID0gZmFsc2UgO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5wdXRFdmVudF9pbXBsYW50JykuYWN0aXZlID0gZmFsc2UgO1xyXG5cclxuICAgICAgICB0aGlzLm5hdGl2ZV9pbnRlcnMuYWN0aXZlID0gZmFsc2UgO1xyXG4gICAgICAgIHRoaXMubmF0aXZlX2ltcGxhbnQuYWN0aXZlID0gZmFsc2UgO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsVHlwZSA9IHBhcmFtLmxhYmVsVHlwZSA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW0udHlwZSA7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGlmIChRZ05hdGl2ZS5uYXRpdmVNZXNzYWdlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlTWVzc2FnZSA9IFFnTmF0aXZlLm5hdGl2ZU1lc3NhZ2UgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuX3R5cGUocGFyYW0udHlwZSkgO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBRZ05hdGl2ZS5sb2FkTmF0aXZlKCkudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzICE9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlTWVzc2FnZSA9IHJlcyA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbl90eXBlKHBhcmFtLnR5cGUpIDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHBhcmFtLnRpbWUpIDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEVtaXQuaW5zdGFuY2UoKS5vbihFbWl0RGF0YS5DTE9TRV9OQVRJVkUsdGhpcy5jbG9zZU5hdGl2ZSx0aGlzKSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvcGVuTmF0aXZlIChub2RlIDogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm5hdGl2ZU1lc3NhZ2UuZGVzYyA7XHJcblxyXG4gICAgICAgIGxldCBpbWdVcmwgPSBudWxsIDtcclxuICAgICAgICBpZiAodGhpcy5uYXRpdmVNZXNzYWdlLmltZ1VybExpc3QgJiYgdGhpcy5uYXRpdmVNZXNzYWdlLmltZ1VybExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpbWdVcmwgPSB0aGlzLm5hdGl2ZU1lc3NhZ2UuaW1nVXJsTGlzdFswXSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nVXJsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoaW1nVXJsLHtleHQ6ICcucG5nJ30sKGVyciwgYXNzZXQgOiBUZXh0dXJlMkQpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y6f55Sf5bm/5ZGK5Zu+54mH5Yqg6L296ZSZ6K+vPj4+Pj4+JyxlcnIpIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJTcHJpdGUgPSBhc3NldCA7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdpbWFnZScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMuY3VyclNwcml0ZSkgO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRJZCA9IHRoaXMubmF0aXZlTWVzc2FnZS5hZElkIDtcclxuICAgICAgICBRZ05hdGl2ZS5yZXBBZFNob3codGhpcy5uYXRpdmVNZXNzYWdlLmFkSWQpIDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb3Blbl90eXBlICh0eXBlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5hdGl2ZU1lc3NhZ2UpICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2lucHV0RXZlbnQnKS5hY3RpdmUgPSB0cnVlIDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlX2ludGVycy5nZXRDaGlsZEJ5TmFtZSgnbmF0aXZlQnRuJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmxhYmVsQXJyW3RoaXMubGFiZWxUeXBlIC0gMV0gO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfaW50ZXJzLmdldENoaWxkQnlOYW1lKCdjbG9zZScpLmFjdGl2ZSA9IGZhbHNlIDtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfaW50ZXJzLmFjdGl2ZSA9IHRydWUgO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVfaW50ZXJzLmdldENoaWxkQnlOYW1lKCdjbG9zZScpLmFjdGl2ZSA9IHRydWUgO1xyXG4gICAgICAgICAgICB9LDIpXHJcblxyXG4gICAgICAgICAgICB0aGlzLm9wZW5OYXRpdmUodGhpcy5uYXRpdmVfaW50ZXJzKSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIFFnQmFubmVyLmhpZGVCYW5uZXIoKSA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5wdXRFdmVudF9pbXBsYW50JykuYWN0aXZlID0gdHJ1ZSA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZV9pbXBsYW50LmdldENoaWxkQnlOYW1lKCduYXRpdmVCdG4nKS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMubGFiZWxBcnJbdGhpcy5sYWJlbFR5cGUgLSAxXSA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZV9pbXBsYW50LmdldENoaWxkQnlOYW1lKCdjbG9zZScpLmFjdGl2ZSA9IGZhbHNlIDtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfaW1wbGFudC5hY3RpdmUgPSB0cnVlIDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubmF0aXZlX2ltcGxhbnQuZ2V0Q2hpbGRCeU5hbWUoJ2Nsb3NlJykuYWN0aXZlID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIH0sMilcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3Blbk5hdGl2ZSh0aGlzLm5hdGl2ZV9pbXBsYW50KSA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0VG91Y2ggKCkge1xyXG4gICAgICAgIHRoaXMubmF0aXZlX2ludGVycy5nZXRDaGlsZEJ5TmFtZSgnaW1hZ2UnKS5vbihUT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICBRZ05hdGl2ZS5yZXBBZENsaWNrKHRoaXMuYWRJZCkgO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMubmF0aXZlX2ltcGxhbnQuZ2V0Q2hpbGRCeU5hbWUoJ2ltYWdlJykub24oVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgUWdOYXRpdmUucmVwQWRDbGljayh0aGlzLmFkSWQpIDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLm5hdGl2ZV9pbnRlcnMuZ2V0Q2hpbGRCeU5hbWUoJ25hdGl2ZUJ0bicpLm9uKFRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck5hdGl2ZUJ0bigpIDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLm5hdGl2ZV9pbXBsYW50LmdldENoaWxkQnlOYW1lKCduYXRpdmVCdG4nKS5vbihUT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJOYXRpdmVCdG4oKSA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5uYXRpdmVfaW50ZXJzLmdldENoaWxkQnlOYW1lKCdjbG9zZScpLm9uKFRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VOYXRpdmUoKSA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5uYXRpdmVfaW1wbGFudC5nZXRDaGlsZEJ5TmFtZSgnY2xvc2UnKS5vbihUT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlTmF0aXZlKCkgO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZXJOYXRpdmVCdG4gKCkge1xyXG4gICAgICAgaWYgKHRoaXMubGFiZWxUeXBlID09IDEpICB7XHJcbiAgICAgICAgICAgUWdOYXRpdmUucmVwQWRDbGljayh0aGlzLmFkSWQpIDtcclxuICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICB0aGlzLmNsb3NlTmF0aXZlKCkgO1xyXG4gICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgUWdOYXRpdmUuYW5ld0xvYWQoKSA7XHJcbiAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRW1pdERhdGEuSU5fTkFUSVZFX05FWFQpIDtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgUWdCYW5uZXIuc2hvd0Jhbm5lcigpIDtcclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLm9mZihFbWl0RGF0YS5DTE9TRV9OQVRJVkUsdGhpcy5jbG9zZU5hdGl2ZSx0aGlzKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlTmF0aXZlKCkge1xyXG4gICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKE5hdGl2ZVZpZXcsZmFsc2UpIDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/logic/common/text.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71b0ecN47xG34cjJwCEDbpS', 'text');
// Script/Moudle/View/logic/common/text.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delay = 0;
        return _this;
    }
    Text.prototype.start = function () {
        var _this = this;
        cc.tween(this.node)
            .delay(this.delay)
            .to(2, { opacity: 0 })
            .call(function () {
            _this.node.destroy();
        })
            .start();
    };
    Text = __decorate([
        ccclass
    ], Text);
    return Text;
}(cc.Component));
exports.default = Text;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXGxvZ2ljXFxjb21tb25cXHRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFhQztRQVhHLFdBQUssR0FBVyxDQUFDLENBQUE7O0lBV3JCLENBQUM7SUFURyxvQkFBSyxHQUFMO1FBQUEsaUJBUUM7UUFQRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNqQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO2FBQ25CLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQVpnQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBYXhCO0lBQUQsV0FBQztDQWJELEFBYUMsQ0FiaUMsRUFBRSxDQUFDLFNBQVMsR0FhN0M7a0JBYm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGRlbGF5OiBudW1iZXIgPSAwXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxyXG4gICAgICAgICAgICAuZGVsYXkodGhpcy5kZWxheSlcclxuICAgICAgICAgICAgLnRvKDIsIHtvcGFjaXR5OiAwfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/ShortageView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9bbd6c1Jv5Ik5gzQRE3I2bs', 'ShortageView');
// Script/Moudle/View/ShortageView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var Global_1 = require("../../Common/Global");
var LoadMgr_1 = require("../../Common/manage/LoadMgr");
var GameLogMgr_1 = require("../../Common/manage/GameLogMgr");
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var Tools_1 = require("../../Common/Tools");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShortageView = /** @class */ (function (_super) {
    __extends(ShortageView, _super);
    function ShortageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //node
        _this._image = null;
        _this._button = null;
        _this._skipButton = null;
        _this._addNum = null;
        _this.callBack = null; // 玩家领取成功对应的道具 回调
        _this.price = 0; //当前逻辑所需要的消耗数量
        return _this;
    }
    ShortageView_1 = ShortageView;
    ShortageView.getUrl = function () {
        return {
            bundle: "shortageView",
            name: "shortageView"
        };
    };
    ShortageView.prototype.initUI = function () {
        this._image = this.getNode("image");
        this._button = this.getNode("button");
        this._skipButton = this.getNode("skip");
        this._addNum = this.getNode("add_num");
    };
    /**
     * @param param  {
     *     type  :   string   不足类型  例如   gold : 金币  st
     *     callBack : Function  //回调
     *     price :   number   本次展示观看视频成功之后，回调执行条件价格
     * }
     */
    ShortageView.prototype.show = function (param) {
        var _this = this;
        try {
            var type_1 = "";
            if (param) {
                this.callBack = param.callBack;
                this.price = param.price;
                type_1 = param.type;
            }
            this._image.active = false;
            this._skipButton.active = false;
            this._button.active = false;
            this.replaceSprite(this._image, type_1);
            this.replaceSprite(this._skipButton, type_1);
            this.replaceSprite(this._button, type_1);
            var addNum_1 = Global_1.default.config.addInfo[type_1];
            this._addNum.getComponent(cc.Label).string = "+" + addNum_1;
            this.onTouch(this._button, function () {
                Tools_1.default.handleVideo().then(function (res) {
                    if (res) {
                        if (type_1 == "gold") {
                            CacheMgr_1.default.gold = CacheMgr_1.default.gold + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.gold >= _this.price) {
                                CacheMgr_1.default.gold = CacheMgr_1.default.gold - _this.price;
                                _this.callBack();
                            }
                        }
                        else if (type_1 == "diamond") {
                            CacheMgr_1.default.diamond = CacheMgr_1.default.diamond + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.diamond >= _this.price) {
                                CacheMgr_1.default.diamond = CacheMgr_1.default.diamond - _this.price;
                                _this.callBack();
                            }
                        }
                        else if (type_1 == "stamina") {
                            CacheMgr_1.default.stamina = CacheMgr_1.default.stamina + addNum_1;
                            PanelMgr_1.default.INS.closePanel(ShortageView_1);
                            if (_this.callBack && CacheMgr_1.default.stamina >= _this.price) {
                                CacheMgr_1.default.stamina = CacheMgr_1.default.stamina - _this.price;
                                _this.callBack();
                            }
                        }
                    }
                });
            });
            this.onTouch(this._skipButton, function () {
                PanelMgr_1.default.INS.closePanel(ShortageView_1);
            });
            this.node.active = true;
        }
        catch (e) {
            GameLogMgr_1.default.error('home show error ');
        }
    };
    //替换图片
    ShortageView.prototype.replaceSprite = function (node, type) {
        if (!node || !type) {
            return;
        }
        var sprite = node.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }
        LoadMgr_1.default.loadSprite(sprite, "view/shortage/" + type + "/" + node.name).then();
    };
    ShortageView.prototype.hide = function () {
    };
    var ShortageView_1;
    ShortageView = ShortageView_1 = __decorate([
        ccclass
    ], ShortageView);
    return ShortageView;
}(LayerPanel_1.default));
exports.default = ShortageView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXFNob3J0YWdlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBeUU7QUFDekUsOENBQXlDO0FBQ3pDLHVEQUFrRDtBQUNsRCw2REFBcUQ7QUFDckQseURBQW9EO0FBQ3BELDRDQUF1QztBQUV2Qyx5REFBb0Q7QUFFOUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBMEMsZ0NBQVU7SUFBcEQ7UUFBQSxxRUF3R0M7UUFoR0csTUFBTTtRQUNFLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixhQUFPLEdBQVksSUFBSSxDQUFBO1FBRXZCLGNBQVEsR0FBYSxJQUFJLENBQUMsQ0FBRSxpQkFBaUI7UUFDN0MsV0FBSyxHQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWM7O0lBeUY3QyxDQUFDO3FCQXhHb0IsWUFBWTtJQUNmLG1CQUFNLEdBQXBCO1FBQ0ksT0FBTztZQUNILE1BQU0sRUFBRSxjQUFjO1lBQ3RCLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUE7SUFDTCxDQUFDO0lBV00sNkJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksMkJBQUksR0FBWCxVQUFZLEtBQVU7UUFBdEIsaUJBeURDO1FBeERHLElBQUk7WUFDQSxJQUFJLE1BQUksR0FBVyxFQUFFLENBQUE7WUFDckIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFJLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBSSxDQUFDLENBQUM7WUFFdkMsSUFBSSxRQUFNLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQUksQ0FBQyxDQUFBO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQU0sQ0FBQTtZQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLGVBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO29CQUN6QixJQUFJLEdBQUcsRUFBRTt3QkFDTCxJQUFJLE1BQUksSUFBSSxNQUFNLEVBQUU7NEJBQ2hCLGtCQUFRLENBQUMsSUFBSSxHQUFHLGtCQUFRLENBQUMsSUFBSSxHQUFHLFFBQU0sQ0FBQTs0QkFDdEMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQVksQ0FBQyxDQUFBOzRCQUNyQyxJQUFJLEtBQUksQ0FBQyxRQUFRLElBQUksa0JBQVEsQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtnQ0FDOUMsa0JBQVEsQ0FBQyxJQUFJLEdBQUcsa0JBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQTtnQ0FDMUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOzZCQUNsQjt5QkFDSjs2QkFBTSxJQUFJLE1BQUksSUFBSSxTQUFTLEVBQUU7NEJBQzFCLGtCQUFRLENBQUMsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxHQUFHLFFBQU0sQ0FBQTs0QkFDNUMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQVksQ0FBQyxDQUFBOzRCQUNyQyxJQUFJLEtBQUksQ0FBQyxRQUFRLElBQUksa0JBQVEsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtnQ0FDakQsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQTtnQ0FDaEQsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOzZCQUNsQjt5QkFDSjs2QkFBTSxJQUFJLE1BQUksSUFBSSxTQUFTLEVBQUU7NEJBQzFCLGtCQUFRLENBQUMsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxHQUFHLFFBQU0sQ0FBQTs0QkFDNUMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQVksQ0FBQyxDQUFBOzRCQUNyQyxJQUFJLEtBQUksQ0FBQyxRQUFRLElBQUksa0JBQVEsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtnQ0FDakQsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQTtnQ0FDaEQsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOzZCQUNsQjt5QkFDSjtxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMzQixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBWSxDQUFDLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLG9CQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQsTUFBTTtJQUNDLG9DQUFhLEdBQXBCLFVBQXFCLElBQWEsRUFBRSxJQUFZO1FBQzVDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87U0FDVjtRQUNELGlCQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqRixDQUFDO0lBRU0sMkJBQUksR0FBWDtJQUNBLENBQUM7O0lBdkdnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBd0doQztJQUFELG1CQUFDO0NBeEdELEFBd0dDLENBeEd5QyxvQkFBVSxHQXdHbkQ7a0JBeEdvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyUGFuZWwsIHtVcmxJbmZvfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9MYXllci9MYXllclBhbmVsXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0NvbW1vbi9HbG9iYWxcIjtcclxuaW1wb3J0IExvYWRNZ3IgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvTG9hZE1nclwiO1xyXG5pbXBvcnQgR2FtZUxvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9DYWNoZU1nclwiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uLy4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgdXJsID0gY2MudXJsO1xyXG5pbXBvcnQgUGFuZWxNZ3IgZnJvbSBcIi4uLy4uL0NvbW1vbi9tYW5hZ2UvUGFuZWxNZ3JcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9ydGFnZVZpZXcgZXh0ZW5kcyBMYXllclBhbmVsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ1bmRsZTogXCJzaG9ydGFnZVZpZXdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJzaG9ydGFnZVZpZXdcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL25vZGVcclxuICAgIHByaXZhdGUgX2ltYWdlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2lwQnV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2FkZE51bTogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIGNhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGw7ICAvLyDnjqnlrrbpooblj5bmiJDlip/lr7nlupTnmoTpgZPlhbcg5Zue6LCDXHJcbiAgICBwcml2YXRlIHByaWNlOiBudW1iZXIgPSAwOyAvL+W9k+WJjemAu+i+keaJgOmcgOimgeeahOa2iOiAl+aVsOmHj1xyXG5cclxuICAgIHB1YmxpYyBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2UgPSB0aGlzLmdldE5vZGUoXCJpbWFnZVwiKTtcclxuICAgICAgICB0aGlzLl9idXR0b24gPSB0aGlzLmdldE5vZGUoXCJidXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5fc2tpcEJ1dHRvbiA9IHRoaXMuZ2V0Tm9kZShcInNraXBcIik7XHJcbiAgICAgICAgdGhpcy5fYWRkTnVtID0gdGhpcy5nZXROb2RlKFwiYWRkX251bVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHBhcmFtICB7XHJcbiAgICAgKiAgICAgdHlwZSAgOiAgIHN0cmluZyAgIOS4jei2s+exu+WeiyAg5L6L5aaCICAgZ29sZCA6IOmHkeW4gSAgc3RcclxuICAgICAqICAgICBjYWxsQmFjayA6IEZ1bmN0aW9uICAvL+Wbnuiwg1xyXG4gICAgICogICAgIHByaWNlIDogICBudW1iZXIgICDmnKzmrKHlsZXnpLrop4LnnIvop4bpopHmiJDlip/kuYvlkI7vvIzlm57osIPmiafooYzmnaHku7bku7fmoLxcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3cocGFyYW06IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFjayA9IHBhcmFtLmNhbGxCYWNrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmljZSA9IHBhcmFtLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHBhcmFtLnR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9za2lwQnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VTcHJpdGUodGhpcy5faW1hZ2UsIHR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VTcHJpdGUodGhpcy5fc2tpcEJ1dHRvbiwgdHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZVNwcml0ZSh0aGlzLl9idXR0b24sIHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFkZE51bSA9IEdsb2JhbC5jb25maWcuYWRkSW5mb1t0eXBlXVxyXG4gICAgICAgICAgICB0aGlzLl9hZGROdW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIitcIiArIGFkZE51bVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoKHRoaXMuX2J1dHRvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuaGFuZGxlVmlkZW8oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiZ29sZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5nb2xkID0gQ2FjaGVNZ3IuZ29sZCArIGFkZE51bVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFuZWxNZ3IuSU5TLmNsb3NlUGFuZWwoU2hvcnRhZ2VWaWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2sgJiYgQ2FjaGVNZ3IuZ29sZCA+PSB0aGlzLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3IuZ29sZCA9IENhY2hlTWdyLmdvbGQgLSB0aGlzLnByaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcImRpYW1vbmRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3IuZGlhbW9uZCA9IENhY2hlTWdyLmRpYW1vbmQgKyBhZGROdW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKFNob3J0YWdlVmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbGxCYWNrICYmIENhY2hlTWdyLmRpYW1vbmQgPj0gdGhpcy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhY2hlTWdyLmRpYW1vbmQgPSBDYWNoZU1nci5kaWFtb25kIC0gdGhpcy5wcmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2soKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJzdGFtaW5hXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhY2hlTWdyLnN0YW1pbmEgPSBDYWNoZU1nci5zdGFtaW5hICsgYWRkTnVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYW5lbE1nci5JTlMuY2xvc2VQYW5lbChTaG9ydGFnZVZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWxsQmFjayAmJiBDYWNoZU1nci5zdGFtaW5hID49IHRoaXMucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5zdGFtaW5hID0gQ2FjaGVNZ3Iuc3RhbWluYSAtIHRoaXMucHJpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLl9za2lwQnV0dG9uLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBQYW5lbE1nci5JTlMuY2xvc2VQYW5lbChTaG9ydGFnZVZpZXcpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBHYW1lTG9nLmVycm9yKCdob21lIHNob3cgZXJyb3IgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu/5o2i5Zu+54mHXHJcbiAgICBwdWJsaWMgcmVwbGFjZVNwcml0ZShub2RlOiBjYy5Ob2RlLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIW5vZGUgfHwgIXR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIGlmICghc3ByaXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9hZE1nci5sb2FkU3ByaXRlKHNwcml0ZSwgXCJ2aWV3L3Nob3J0YWdlL1wiICsgdHlwZSArIFwiL1wiICsgbm9kZS5uYW1lKS50aGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/logic/game/sign.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ea41O1751C4Yy7ck2U7iOS', 'sign');
// Script/Moudle/View/logic/game/sign.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../../../Common/manage/Layer/LayerPanel");
var Tools_1 = require("../../../../Common/Tools");
var config_1 = require("../common/config");
var CacheMgr_1 = require("../../../../Common/manage/CacheMgr");
var PanelMgr_1 = require("../../../../Common/manage/PanelMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Sign = /** @class */ (function (_super) {
    __extends(Sign, _super);
    function Sign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type_spriteFrame = [];
        _this.items = [];
        _this.get = null;
        _this.double_get = null;
        _this.close = null;
        return _this;
    }
    Sign_1 = Sign;
    Sign.getUrl = function () {
        return {
            bundle: "game",
            name: "sign"
        };
    };
    Sign.prototype.initUI = function () {
        this.get = this.getNode("get");
        this.onTouch(this.get, this.handle_get);
        this.double_get = this.getNode("double");
        this.onTouch(this.double_get, this.handle_double_get);
        this.close = this.getNode("btn");
        this.onTouch(this.close, function () {
            PanelMgr_1.default.INS.closePanel(Sign_1);
        });
        var content = this.node.children[0];
        for (var i = 0; i < content.childrenCount; i++) {
            this.items.push(content.children[i]);
            if (i == 6) {
                // this.changeItem7(content.children[i], gameConfig.singData7)
            }
            else {
                this.changeItem(content.children[i], config_1.default.signData[i]);
            }
            if (i == 6) {
                this.changeSignStatus7(content.children[i]);
            }
            else {
                this.changeSignStatus(i, content.children[i]);
            }
        }
        if (CacheMgr_1.default.setting.signNum >= 6 || CacheMgr_1.default.setting.lastSignNum == Tools_1.default.date_getTimeNum(new Date)) {
            this.hideBtn();
        }
    };
    Sign.prototype.changeItem = function (node, data) {
        // let one = node.children[0]
        node.children[1].getComponent(cc.Sprite).spriteFrame = this.type_spriteFrame[data.type];
        node.children[2].getComponent(cc.Label).string = data.title;
    };
    Sign.prototype.changeSignStatus = function (i, node) {
        if (i == -1) {
            node.getChildByName("mask").active = true;
            node.getChildByName("签到").active = true;
            return;
        }
        if (CacheMgr_1.default.setting.signNum >= i) {
            node.getChildByName("mask").active = true;
            node.getChildByName("签到").active = true;
        }
        else {
            node.getChildByName("mask").active = false;
            node.getChildByName("签到").active = false;
        }
    };
    Sign.prototype.changeSignStatus7 = function (node, isFalse) {
        if (isFalse === void 0) { isFalse = false; }
        if (isFalse) {
            node.getChildByName("签到").active = true;
            node.getChildByName("mask").active = true;
        }
        if (CacheMgr_1.default.setting.signNum >= 6) {
            node.getChildByName("签到").active = true;
            node.getChildByName("mask").active = true;
        }
        else {
            node.getChildByName("签到").active = false;
            node.getChildByName("mask").active = false;
        }
    };
    Sign.prototype.handle_get = function () {
        if (CacheMgr_1.default.setting.signNum == 5) {
            config_1.default.singData7.func(1);
            CacheMgr_1.default.setting.signNum++;
            this.changeSignStatus7(this.items[6], true);
        }
        else {
            var data = config_1.default.signData[CacheMgr_1.default.setting.signNum + 1];
            CacheMgr_1.default.setting.signNum++;
            this.changeSignStatus(-1, this.items[CacheMgr_1.default.setting.signNum]);
            data.func(data.num);
        }
        CacheMgr_1.default.setting.lastSignNum = Tools_1.default.date_getTimeNum(new Date());
        CacheMgr_1.default.setting = CacheMgr_1.default.setting;
        this.hideBtn();
    };
    Sign.prototype.handle_double_get = function () {
        var _this = this;
        Tools_1.default.handleVideo().then(function (res) {
            if (res) {
                if (CacheMgr_1.default.setting.signNum == 5) {
                    config_1.default.singData7.func(2);
                    CacheMgr_1.default.setting.signNum++;
                    _this.changeSignStatus7(_this.items[6], true);
                }
                else {
                    var data = config_1.default.signData[CacheMgr_1.default.setting.signNum + 1];
                    CacheMgr_1.default.setting.signNum++;
                    _this.changeSignStatus(-1, _this.items[CacheMgr_1.default.setting.signNum]);
                    data.func(data.num * 2);
                }
                CacheMgr_1.default.setting.lastSignNum = Tools_1.default.date_getTimeNum(new Date());
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                _this.hideBtn();
            }
        });
    };
    Sign.prototype.hideBtn = function () {
        this.get.active = false;
        this.double_get.active = false;
    };
    Sign.prototype.show = function (param) {
    };
    Sign.prototype.hide = function () {
    };
    var Sign_1;
    __decorate([
        property([cc.SpriteFrame])
    ], Sign.prototype, "type_spriteFrame", void 0);
    Sign = Sign_1 = __decorate([
        ccclass
    ], Sign);
    return Sign;
}(LayerPanel_1.default));
exports.default = Sign;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXGxvZ2ljXFxnYW1lXFxzaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUErRTtBQUMvRSxrREFBNkM7QUFDN0MsMkNBQXFFO0FBQ3JFLCtEQUEwRDtBQUUxRCwrREFBMEQ7QUFFcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVU7SUFBNUM7UUFBQSxxRUFrSUM7UUEvSEcsc0JBQWdCLEdBQXFCLEVBQUUsQ0FBQTtRQVMvQixXQUFLLEdBQWUsRUFBRSxDQUFBO1FBQ3RCLFNBQUcsR0FBWSxJQUFJLENBQUE7UUFDbkIsZ0JBQVUsR0FBWSxJQUFJLENBQUE7UUFDMUIsV0FBSyxHQUFZLElBQUksQ0FBQTs7SUFtSGpDLENBQUM7YUFsSW9CLElBQUk7SUFNUCxXQUFNLEdBQXBCO1FBQ0ksT0FBTztZQUNILE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDZixDQUFBO0lBQ0wsQ0FBQztJQU1ELHFCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoQyxJ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QVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGVBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUNoRSxrQkFBUSxDQUFDLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQTtnQkFDbkMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sc0JBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDbEMsQ0FBQztJQUVELG1CQUFJLEdBQUosVUFBSyxLQUFVO0lBQ2YsQ0FBQztJQUVELG1CQUFJLEdBQUo7SUFDQSxDQUFDOztJQTdIRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztrREFDWTtJQUh0QixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBa0l4QjtJQUFELFdBQUM7Q0FsSUQsQUFrSUMsQ0FsSWlDLG9CQUFVLEdBa0kzQztrQkFsSW9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXJQYW5lbCwge1VybEluZm99IGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vbWFuYWdlL0xheWVyL0xheWVyUGFuZWxcIjtcclxuaW1wb3J0IFRvb2xzIGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vVG9vbHNcIjtcclxuaW1wb3J0IGdhbWVDb25maWcsIHtzaWduRGF0YSwgc2lnbkRhdGFTZXZlbn0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWdcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcbmltcG9ydCBDb25zdGFudCBmcm9tIFwiLi4vLi4vLi4vLi4vQ29tbW9uL0NvbnN0YW50XCI7XHJcbmltcG9ydCBQYW5lbE1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduIGV4dGVuZHMgTGF5ZXJQYW5lbCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICB0eXBlX3Nwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW11cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRVcmwoKTogVXJsSW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYnVuZGxlOiBcImdhbWVcIixcclxuICAgICAgICAgICAgbmFtZTogXCJzaWduXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGl0ZW1zOiBjYy5Ob2RlIFtdID0gW11cclxuICAgIHByaXZhdGUgZ2V0OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBkb3VibGVfZ2V0OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjbG9zZTogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5nZXQgPSB0aGlzLmdldE5vZGUoXCJnZXRcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5nZXQsIHRoaXMuaGFuZGxlX2dldClcclxuICAgICAgICB0aGlzLmRvdWJsZV9nZXQgPSB0aGlzLmdldE5vZGUoXCJkb3VibGVcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5kb3VibGVfZ2V0LCB0aGlzLmhhbmRsZV9kb3VibGVfZ2V0KVxyXG4gICAgICAgIHRoaXMuY2xvc2UgPSB0aGlzLmdldE5vZGUoXCJidG5cIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5jbG9zZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBQYW5lbE1nci5JTlMuY2xvc2VQYW5lbChTaWduKSA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5jaGlsZHJlblswXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGNvbnRlbnQuY2hpbGRyZW5baV0pXHJcbiAgICAgICAgICAgIGlmIChpID09IDYpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hhbmdlSXRlbTcoY29udGVudC5jaGlsZHJlbltpXSwgZ2FtZUNvbmZpZy5zaW5nRGF0YTcpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUl0ZW0oY29udGVudC5jaGlsZHJlbltpXSwgZ2FtZUNvbmZpZy5zaWduRGF0YVtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNpZ25TdGF0dXM3KGNvbnRlbnQuY2hpbGRyZW5baV0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNpZ25TdGF0dXMoaSwgY29udGVudC5jaGlsZHJlbltpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc2V0dGluZy5zaWduTnVtID49IDYgfHwgQ2FjaGVNZ3Iuc2V0dGluZy5sYXN0U2lnbk51bSA9PSBUb29scy5kYXRlX2dldFRpbWVOdW0obmV3IERhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ0bigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlSXRlbShub2RlOiBjYy5Ob2RlLCBkYXRhOiBzaWduRGF0YSkge1xyXG4gICAgICAgIC8vIGxldCBvbmUgPSBub2RlLmNoaWxkcmVuWzBdXHJcbiAgICAgICAgbm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudHlwZV9zcHJpdGVGcmFtZVtkYXRhLnR5cGVdXHJcbiAgICAgICAgbm9kZS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEudGl0bGVcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVNpZ25TdGF0dXMoaTogbnVtYmVyLCBub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKGkgPT0gLTEpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwi562+5YiwXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLnNpZ25OdW0gPj0gaSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLnrb7liLBcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLnrb7liLBcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlU2lnblN0YXR1czcobm9kZTogY2MuTm9kZSwgaXNGYWxzZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGlzRmFsc2UpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIuetvuWIsFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENhY2hlTWdyLnNldHRpbmcuc2lnbk51bSA+PSA2KSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCLnrb7liLBcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZShcIuetvuWIsFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9nZXQoKSB7XHJcbiAgICAgICAgaWYgKENhY2hlTWdyLnNldHRpbmcuc2lnbk51bSA9PSA1KSB7XHJcbiAgICAgICAgICAgIGdhbWVDb25maWcuc2luZ0RhdGE3LmZ1bmMoMSlcclxuICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5zaWduTnVtKytcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTaWduU3RhdHVzNyh0aGlzLml0ZW1zWzZdLCB0cnVlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gZ2FtZUNvbmZpZy5zaWduRGF0YVtDYWNoZU1nci5zZXR0aW5nLnNpZ25OdW0gKyAxXVxyXG4gICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNpZ25OdW0rK1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNpZ25TdGF0dXMoLTEsIHRoaXMuaXRlbXNbQ2FjaGVNZ3Iuc2V0dGluZy5zaWduTnVtXSlcclxuICAgICAgICAgICAgZGF0YS5mdW5jKGRhdGEubnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBDYWNoZU1nci5zZXR0aW5nLmxhc3RTaWduTnVtID0gVG9vbHMuZGF0ZV9nZXRUaW1lTnVtKG5ldyBEYXRlKCkpXHJcbiAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICB0aGlzLmhpZGVCdG4oKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlX2RvdWJsZV9nZXQoKSB7XHJcblxyXG4gICAgICAgIFRvb2xzLmhhbmRsZVZpZGVvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLnNpZ25OdW0gPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVDb25maWcuc2luZ0RhdGE3LmZ1bmMoMilcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNpZ25OdW0rK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2lnblN0YXR1czcodGhpcy5pdGVtc1s2XSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBnYW1lQ29uZmlnLnNpZ25EYXRhW0NhY2hlTWdyLnNldHRpbmcuc2lnbk51bSArIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5zaWduTnVtKytcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNpZ25TdGF0dXMoLTEsIHRoaXMuaXRlbXNbQ2FjaGVNZ3Iuc2V0dGluZy5zaWduTnVtXSlcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZ1bmMoZGF0YS5udW0gKiAyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcubGFzdFNpZ25OdW0gPSBUb29scy5kYXRlX2dldFRpbWVOdW0obmV3IERhdGUoKSlcclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCdG4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVCdG4oKSB7XHJcbiAgICAgICAgdGhpcy5nZXQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmRvdWJsZV9nZXQuYWN0aXZlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzaG93KHBhcmFtOiBhbnkpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/ShowConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4d84ygktZD2pfhA2/12s8I', 'ShowConfig');
// Script/Common/ShowConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LogMgr_1 = require("./LogMgr");
var Tools_1 = require("./Tools");
var Emit_1 = require("./manage/Emit/Emit");
var EmitData_1 = require("./manage/Emit/EmitData");
var QgBanner_1 = require("./manage/Api/QgBanner");
var ShowConfig = /** @class */ (function () {
    function ShowConfig() {
    }
    ShowConfig.initEmit = function () {
        Emit_1.default.instance().on(EmitData_1.default.IN_NATIVE_NEXT, this.inNativeNext, this);
    };
    ShowConfig.show = function (str) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.showResolve = resolve;
            if (!Global_1.default.isVivo) {
                _this.showResolve(false);
                _this.showResolve = null;
                return;
            }
            if (!str || !Global_1.default.config[str]) {
                LogMgr_1.default.error('参数为空或者config中不存在该配置:str:' + str);
                _this.showResolve(false);
                _this.showResolve = null;
                return;
            }
            LogMgr_1.default.log('检测配置信息');
            _this.str = str;
            if (Global_1.default.config[_this.str].nativeConfig.type == 2) {
                QgBanner_1.default.hideBanner();
            }
            console.log('AAA>>>>>>');
            _this.playVideo().then(function () {
                console.log('BBB>>>>>>');
                return _this.openNative();
            }).then(function (res) {
                if (!res) {
                    _this.inNativeNext();
                }
            });
        });
    };
    ShowConfig.playVideo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Global_1.default.config[_this.str].startVideo == 0) {
                Global_1.default.config[_this.str].startVideo = 1;
                resolve(true);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].videoPer)) {
                Tools_1.default.handleVideo().then(function () {
                    resolve(true);
                });
            }
            else {
                resolve(true);
            }
        });
    };
    ShowConfig.openNative = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('CCC>>>>>>');
            if (Global_1.default.config[_this.str].startNative == 0) {
                Global_1.default.config[_this.str].startNative = 1;
                resolve(false);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].nativePer)) {
                Tools_1.default.showNative(Global_1.default.config[_this.str].nativeConfig.type, Global_1.default.config[_this.str].nativeConfig.labelType, Global_1.default.config[_this.str].nativeConfig.time).then(function (res) {
                    resolve(res);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    ShowConfig.openIntersAd = function () {
        var _this = this;
        return new Promise(function (resolve) {
            console.log('DDD>>>>>>');
            if (Global_1.default.config[_this.str].startIntersAd == 0) {
                Global_1.default.config[_this.str].startIntersAd = 1;
                resolve(false);
                return;
            }
            if (Tools_1.default.checkPer(Global_1.default.config[_this.str].intersAdPer)) {
                Tools_1.default.handlerInters().then(function (res) {
                    resolve(res);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    ShowConfig.inNativeNext = function () {
        var _this = this;
        this.openIntersAd().then(function (res) {
            console.log('EEE>>>>>>');
            _this.showResolve(true);
            _this.showResolve = null;
        });
    };
    ShowConfig.str = '';
    ShowConfig.showResolve = null;
    return ShowConfig;
}());
exports.default = ShowConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXFNob3dDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEI7QUFDOUIsbUNBQThCO0FBQzlCLGlDQUE0QjtBQUM1QiwyQ0FBc0M7QUFDdEMsbURBQThDO0FBQzlDLGtEQUE2QztBQUU3QztJQUFBO0lBaUhBLENBQUM7SUEzR2lCLG1CQUFRLEdBQXRCO1FBQ0ksY0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFHYSxlQUFJLEdBQWxCLFVBQW1CLEdBQVc7UUFBOUIsaUJBbUNDO1FBbENHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixPQUFNO2FBQ1Q7WUFDRCxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVyQixLQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUdmLElBQUksZ0JBQU0sQ0FBQyxNQUFNLENBQUMs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QUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hCLElBQUksZ0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7Z0JBQzVDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTTthQUNUO1lBRUQsSUFBSSxlQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDckQsZUFBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTTtnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHYyx1QkFBWSxHQUEzQjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUN4QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQTdHYyxjQUFHLEdBQVcsRUFBRSxDQUFDO0lBRWpCLHNCQUFXLEdBQVEsSUFBSSxDQUFDO0lBNkczQyxpQkFBQztDQWpIRCxBQWlIQyxJQUFBO2tCQWpIb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHbG9iYWwgZnJvbSBcIi4vR2xvYmFsXCI7XHJcbmltcG9ydCBMb2dNZ3IgZnJvbSBcIi4vTG9nTWdyXCI7XHJcbmltcG9ydCBUb29scyBmcm9tIFwiLi9Ub29sc1wiO1xyXG5pbXBvcnQgRW1pdCBmcm9tIFwiLi9tYW5hZ2UvRW1pdC9FbWl0XCI7XHJcbmltcG9ydCBFbWl0RGF0YSBmcm9tIFwiLi9tYW5hZ2UvRW1pdC9FbWl0RGF0YVwiO1xyXG5pbXBvcnQgUWdCYW5uZXIgZnJvbSBcIi4vbWFuYWdlL0FwaS9RZ0Jhbm5lclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd0NvbmZpZyB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3RyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93UmVzb2x2ZTogYW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXRFbWl0KCkge1xyXG4gICAgICAgIEVtaXQuaW5zdGFuY2UoKS5vbihFbWl0RGF0YS5JTl9OQVRJVkVfTkVYVCwgdGhpcy5pbk5hdGl2ZU5leHQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3coc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLmlzVml2bykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXNvbHZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHIgfHwgIUdsb2JhbC5jb25maWdbc3RyXSkge1xyXG4gICAgICAgICAgICAgICAgTG9nTWdyLmVycm9yKCflj4LmlbDkuLrnqbrmiJbogIVjb25maWfkuK3kuI3lrZjlnKjor6XphY3nva46c3RyOicgKyBzdHIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXNvbHZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ01nci5sb2coJ+ajgOa1i+mFjee9ruS/oeaBrycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdHIgPSBzdHI7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLm5hdGl2ZUNvbmZpZy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLmhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FBQT4+Pj4+PicpXHJcbiAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQkJCPj4+Pj4+JylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5OYXRpdmUoKTtcclxuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5OYXRpdmVOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGxheVZpZGVvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZ1t0aGlzLnN0cl0uc3RhcnRWaWRlbyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuY29uZmlnW3RoaXMuc3RyXS5zdGFydFZpZGVvID0gMTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLnZpZGVvUGVyKSkge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuaGFuZGxlVmlkZW8oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG9wZW5OYXRpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDQ0M+Pj4+Pj4nKTtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLnN0YXJ0TmF0aXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLnN0YXJ0TmF0aXZlID0gMTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChUb29scy5jaGVja1BlcihHbG9iYWwuY29uZmlnW3RoaXMuc3RyXS5uYXRpdmVQZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5zaG93TmF0aXZlKEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLm5hdGl2ZUNvbmZpZy50eXBlLCBHbG9iYWwuY29uZmlnW3RoaXMuc3RyXS5uYXRpdmVDb25maWcubGFiZWxUeXBlLCBHbG9iYWwuY29uZmlnW3RoaXMuc3RyXS5uYXRpdmVDb25maWcudGltZSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgb3BlbkludGVyc0FkKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnREREPj4+Pj4+JylcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWdbdGhpcy5zdHJdLnN0YXJ0SW50ZXJzQWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLmNvbmZpZ1t0aGlzLnN0cl0uc3RhcnRJbnRlcnNBZCA9IDE7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoVG9vbHMuY2hlY2tQZXIoR2xvYmFsLmNvbmZpZ1t0aGlzLnN0cl0uaW50ZXJzQWRQZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5oYW5kbGVySW50ZXJzKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5OYXRpdmVOZXh0KCkge1xyXG4gICAgICAgIHRoaXMub3BlbkludGVyc0FkKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFRUU+Pj4+Pj4nKVxyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXNvbHZlID0gbnVsbDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufSJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/LoadMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f744UhRIBHxoK05CsVLTZs', 'LoadMgr');
// Script/Common/manage/LoadMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./GameLogMgr");
var Texture2D = cc.Texture2D;
var GameLogMgr_2 = require("./GameLogMgr");
var LoadMgr = /** @class */ (function () {
    function LoadMgr() {
    }
    LoadMgr.loadBundle = function (bundleNames) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var functions = [];
            for (var i = 0; i < bundleNames.length; i++) {
                var name = bundleNames[i];
                if (!_this.alreadyLoadBundle.has(name)) {
                    functions.push(_this.loadBundle_Single(name));
                }
            }
            Promise.all(functions).then(function (data) {
                resolve(data);
            }, function () {
                reject(false);
            });
        });
    };
    LoadMgr.loadBundle_Single = function (name) {
        var _this = this;
        return new Promise(function (resolve1, reject1) {
            cc.assetManager.loadBundle(name, function (err, data) {
                if (err) {
                    GameLogMgr_2.default.error("加载分包失败！！！！！！！！！", err, "name :", name);
                    reject1(false);
                    return;
                }
                _this.alreadyLoadBundle.set(name, data);
                resolve1(data);
            });
        });
    };
    LoadMgr.judgeBundleLoad = function (name) {
        return this.alreadyLoadBundle.has(name);
    };
    LoadMgr.getBundle = function (bundle_name) {
        return this.alreadyLoadBundle.get(bundle_name);
    };
    //提前初始化所有分包
    LoadMgr.init_bundleMgr = function () {
        this.loadBundle_Single("homeView").then();
        this.loadBundle_Single("gameView").then();
        this.loadBundle_Single("homeView").then();
        this.loadBundle_Single("treaView").then();
        this.loadBundle_Single("oneBox").then();
    };
    /**
     * 加载图片
     * @param sprite
     * @param _url
     * @param bundle 图片所在的分包
     * @param needActive
     */
    LoadMgr.loadSprite = function (sprite, _url, bundle, needActive) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        if (needActive === void 0) { needActive = true; }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._sprite.hasOwnProperty(id)) {
                sprite.spriteFrame = _this._sprite[id];
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(_this._sprite[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteFrame, function (err, spf) {
                if (err) {
                    GameLogMgr_1.default.error(id, ' 图片加载错误 ', err);
                    reject(false);
                    return;
                }
                _this._sprite[id] = spf;
                sprite.spriteFrame = spf;
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(spf);
            });
        });
    };
    LoadMgr.loadRemoteSprite = function (_url, sprite, needActive) {
        var _this = this;
        if (sprite === void 0) { sprite = null; }
        if (needActive === void 0) { needActive = true; }
        return new Promise(function (resolve, reject) {
            if (_this._remote_Sprite.get(_url)) {
                if (sprite) {
                    sprite.spriteFrame = _this._remote_Sprite.get(_url);
                }
                if (needActive) {
                    if (sprite) {
                        sprite.node.active = true;
                    }
                }
                resolve(_this._remote_Sprite.get(_url));
            }
            else {
                cc.assetManager.loadRemote(_url, Texture2D, function (err, texture) {
                    if (texture.width == 0) {
                        var path = cc.assetManager.cacheManager.getTemp(_url);
                        cc.assetManager.loadRemote(path, function (err, sp) {
                            if (err) {
                                GameLogMgr_1.default.warn("第二次加载远程图片失败", err);
                                reject(false);
                                return;
                            }
                            _this._remote_Sprite.set(_url, new cc.SpriteFrame(sp));
                        });
                        if (sprite) {
                            sprite.spriteFrame = _this._remote_Sprite.get(_url);
                        }
                        resolve(_this._remote_Sprite.get(_url));
                    }
                    else {
                        if (err) {
                            GameLogMgr_1.default.warn("加载远程图片失败", err);
                            reject(false);
                            return;
                        }
                        _this._remote_Sprite.set(_url, new cc.SpriteFrame((texture)));
                    }
                    if (needActive) {
                        if (sprite) {
                            sprite.node.active = true;
                            sprite.spriteFrame = _this._remote_Sprite.get(_url);
                            // sprite.spriteFrame = new cc.SpriteFrame(texture)
                        }
                    }
                    resolve(_this._remote_Sprite.get(_url));
                });
            }
        });
    };
    /**
     * 加载 预制体
     * @param _url
     * @param bundle  预制体所在的分包
     */
    LoadMgr.loadPrefab = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._prefabCaches.hasOwnProperty(id)) {
                resolve(_this._prefabCaches[id]);
                return;
            }
            bundle.load("prefab/" + _url, cc.Prefab, function (err, prefab) {
                if (err) {
                    GameLogMgr_1.default.error('setPrefab error', err, id);
                    reject(false);
                    return;
                }
                _this._prefabCaches[id] = prefab;
                resolve(prefab);
            });
        });
    };
    LoadMgr.load_AudioClip = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._audio_caches.get(id)) {
                var audioClip = _this._audio_caches.get(id);
                resolve(audioClip);
            }
            else {
                bundle.load("audio/" + _url, cc.AudioClip, function (err, audio) {
                    if (err) {
                        GameLogMgr_1.default.error("加载音频失败", err, "url : ", id);
                        reject(null);
                        return;
                    }
                    _this._audio_caches.set(id, audio);
                    resolve(audio);
                });
            }
        });
    };
    /**
     * 加载 图集文件
     * @private
     */
    LoadMgr.loadAtlas = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._AtlasCaches.hasOwnProperty(id)) {
                resolve(_this._AtlasCaches[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    GameLogMgr_1.default.log('setAtlas error', err, id);
                    reject(false);
                    return;
                }
                _this._AtlasCaches[id] = atlas;
                resolve(atlas);
            });
        });
    };
    LoadMgr._sprite = {};
    LoadMgr.alreadyLoadBundle = new Map();
    LoadMgr._remote_Sprite = new Map();
    LoadMgr._prefabCaches = {};
    LoadMgr._audio_caches = new Map();
    LoadMgr._AtlasCaches = {};
    return LoadMgr;
}());
exports.default = LoadMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTG9hZE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUFtQztBQUNuQyxJQUFPLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBRWhDLDJDQUFzQztBQUt0QztJQUFBO0lBb05BLENBQUM7SUE5TWlCLGtCQUFVLEdBQXhCLFVBQXlCLFdBQXFCO1FBQTlDLGlCQWVDO1FBZEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQTtZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6QixJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtpQkFDL0M7YUFDSjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLENBQUMsRUFBRTtnQkFDQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDakIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFYSx5QkFBaUIsR0FBL0IsVUFBZ0MsSUFBWTtRQUE1QyxpQkFZQztRQVhHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FB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QUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBVSxFQUFFLEtBQXFCO2dCQUMzRSxJQUFJLEdBQUcsRUFBRTtvQkFDTCxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZCxPQUFPO2lCQUNWO2dCQUNELEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqTmMsZUFBTyxHQUFHLEVBQUUsQ0FBQztJQUViLHlCQUFpQixHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtJQW9GbEUsc0JBQWMsR0FBZ0MsSUFBSSxHQUFHLEVBQTBCLENBQUM7SUFvRGhGLHFCQUFhLEdBQUcsRUFBRSxDQUFDO0lBMEJuQixxQkFBYSxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQXNCM0Usb0JBQVksR0FBRyxFQUFFLENBQUM7SUF3QnJDLGNBQUM7Q0FwTkQsQUFvTkMsSUFBQTtrQkFwTm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9HbG9iYWxcIjtcclxuaW1wb3J0IEdhbWVMb2cgZnJvbSBcIi4vR2FtZUxvZ01nclwiO1xyXG5pbXBvcnQgVGV4dHVyZTJEID0gY2MuVGV4dHVyZTJEO1xyXG5pbXBvcnQgQXVkaW9DbGlwID0gY2MuQXVkaW9DbGlwO1xyXG5pbXBvcnQgR2FtZUxvZ01nciBmcm9tIFwiLi9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBUZXN0TWdyIGZyb20gXCIuLi9UZXN0XCI7XHJcbmltcG9ydCBCdW5kbGUgPSBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlO1xyXG5pbXBvcnQgdXJsID0gY2MudXJsO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZE1nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Nwcml0ZSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFscmVhZHlMb2FkQnVuZGxlOiBNYXA8c3RyaW5nLCBCdW5kbGU+ID0gbmV3IE1hcDxzdHJpbmcsIEJ1bmRsZT4oKVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZEJ1bmRsZShidW5kbGVOYW1lczogc3RyaW5nW10pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZnVuY3Rpb25zOiBhbnlbXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVuZGxlTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gYnVuZGxlTmFtZXNbaV1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbHJlYWR5TG9hZEJ1bmRsZS5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbnMucHVzaCh0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKGZ1bmN0aW9ucykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRCdW5kbGVfU2luZ2xlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTEsIHJlamVjdDEpID0+IHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUobmFtZSwgKGVyciwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2dNZ3IuZXJyb3IoXCLliqDovb3liIbljIXlpLHotKXvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIFcIiwgZXJyLCBcIm5hbWUgOlwiLCBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdDEoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLnNldChuYW1lLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZTEoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMganVkZ2VCdW5kbGVMb2FkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLmhhcyhuYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QnVuZGxlKGJ1bmRsZV9uYW1lOiBzdHJpbmcpOiBCdW5kbGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLmdldChidW5kbGVfbmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvL+aPkOWJjeWIneWni+WMluaJgOacieWIhuWMhVxyXG4gICAgcHVibGljIHN0YXRpYyBpbml0X2J1bmRsZU1ncigpIHtcclxuICAgICAgICB0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKFwiaG9tZVZpZXdcIikudGhlbigpXHJcbiAgICAgICAgdGhpcy5sb2FkQnVuZGxlX1NpbmdsZShcImdhbWVWaWV3XCIpLnRoZW4oKVxyXG4gICAgICAgIHRoaXMubG9hZEJ1bmRsZV9TaW5nbGUoXCJob21lVmlld1wiKS50aGVuKClcclxuICAgICAgICB0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKFwidHJlYVZpZXdcIikudGhlbigpXHJcbiAgICAgICAgdGhpcy5sb2FkQnVuZGxlX1NpbmdsZShcIm9uZUJveFwiKS50aGVuKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvueJh1xyXG4gICAgICogQHBhcmFtIHNwcml0ZVxyXG4gICAgICogQHBhcmFtIF91cmxcclxuICAgICAqIEBwYXJhbSBidW5kbGUg5Zu+54mH5omA5Zyo55qE5YiG5YyFXHJcbiAgICAgKiBAcGFyYW0gbmVlZEFjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRTcHJpdGUoc3ByaXRlOiBjYy5TcHJpdGUsIF91cmw6IHN0cmluZywgYnVuZGxlOiBCdW5kbGUgPSB0aGlzLmdldEJ1bmRsZShcInN1YlwiKSwgbmVlZEFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zcHJpdGUuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVbaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9zcHJpdGVbaWRdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidW5kbGUubG9hZChcImltYWdlL1wiICsgX3VybCwgY2MuU3ByaXRlRnJhbWUsIChlcnI6IEVycm9yLCBzcGY6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihpZCwgJyDlm77niYfliqDovb3plJnor68gJywgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVtpZF0gPSBzcGY7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcGY7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHNwZik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9yZW1vdGVfU3ByaXRlOiBNYXA8c3RyaW5nLCBjYy5TcHJpdGVGcmFtZT4gPSBuZXcgTWFwPHN0cmluZywgY2MuU3ByaXRlRnJhbWU+KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFJlbW90ZVNwcml0ZShfdXJsOiBzdHJpbmcsIHNwcml0ZTogY2MuU3ByaXRlID0gbnVsbCwgbmVlZEFjdGl2ZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZWVkQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShfdXJsLCBUZXh0dXJlMkQsIChlcnIsIHRleHR1cmU6IFRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlLndpZHRoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBjYy5hc3NldE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldFRlbXAoX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHBhdGgsIChlcnIsIHNwOiBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLnrKzkuozmrKHliqDovb3ov5znqIvlm77niYflpLHotKVcIiwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZV9TcHJpdGUuc2V0KF91cmwsIG5ldyBjYy5TcHJpdGVGcmFtZShzcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy53YXJuKFwi5Yqg6L296L+c56iL5Zu+54mH5aSx6LSlXCIsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZV9TcHJpdGUuc2V0KF91cmwsIG5ldyBjYy5TcHJpdGVGcmFtZSgodGV4dHVyZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuX3JlbW90ZV9TcHJpdGUuZ2V0KF91cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9wcmVmYWJDYWNoZXMgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vSDpooTliLbkvZNcclxuICAgICAqIEBwYXJhbSBfdXJsXHJcbiAgICAgKiBAcGFyYW0gYnVuZGxlICDpooTliLbkvZPmiYDlnKjnmoTliIbljIVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUHJlZmFiKF91cmw6IHN0cmluZywgYnVuZGxlOiBCdW5kbGUgPSB0aGlzLmdldEJ1bmRsZShcInN1YlwiKSkge1xyXG4gICAgICAgIGxldCBpZCA9IGJ1bmRsZS5uYW1lICsgXCIvXCIgKyBfdXJsXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZWZhYkNhY2hlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fcHJlZmFiQ2FjaGVzW2lkXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVuZGxlLmxvYWQoXCJwcmVmYWIvXCIgKyBfdXJsLCBjYy5QcmVmYWIsIChlcnI6IEVycm9yLCBwcmVmYWI6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NldFByZWZhYiBlcnJvcicsIGVyciwgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlZmFiQ2FjaGVzW2lkXSA9IHByZWZhYjtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocHJlZmFiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2F1ZGlvX2NhY2hlczogTWFwPHN0cmluZywgY2MuQXVkaW9DbGlwPiA9IG5ldyBNYXA8c3RyaW5nLCBjYy5BdWRpb0NsaXA+KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkX0F1ZGlvQ2xpcChfdXJsOiBzdHJpbmcsIGJ1bmRsZTogQnVuZGxlID0gdGhpcy5nZXRCdW5kbGUoXCJzdWJcIikpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdWRpb19jYWNoZXMuZ2V0KGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvQ2xpcCA9IHRoaXMuX2F1ZGlvX2NhY2hlcy5nZXQoaWQpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnVuZGxlLmxvYWQoXCJhdWRpby9cIiArIF91cmwsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgYXVkaW86IEF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuWKoOi9vemfs+mikeWksei0pVwiLCBlcnIsIFwidXJsIDogXCIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1ZGlvX2NhY2hlcy5zZXQoaWQsIGF1ZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGF1ZGlvKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0F0bGFzQ2FjaGVzID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb0g5Zu+6ZuG5paH5Lu2XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRBdGxhcyhfdXJsOiBzdHJpbmcsIGJ1bmRsZTogQnVuZGxlID0gdGhpcy5nZXRCdW5kbGUoXCJzdWJcIikpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9BdGxhc0NhY2hlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fQXRsYXNDYWNoZXNbaWRdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidW5kbGUubG9hZChcImltYWdlL1wiICsgX3VybCwgY2MuU3ByaXRlQXRsYXMsIChlcnI6IEVycm9yLCBhdGxhczogY2MuU3ByaXRlQXRsYXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTG9nLmxvZygnc2V0QXRsYXMgZXJyb3InLCBlcnIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX0F0bGFzQ2FjaGVzW2lkXSA9IGF0bGFzO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhdGxhcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/GameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfce93ObH9DBbRXeAjfXK5B', 'GameView');
// Script/Moudle/View/GameView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var Tools_1 = require("../../Common/Tools");
var EndView_1 = require("./EndView");
var text_1 = require("./logic/common/text");
var config_1 = require("./logic/common/config");
var HomeView_1 = require("./HomeView");
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var AudioMgr_1 = require("../../Common/manage/AudioMgr");
var LoadMgr_1 = require("../../Common/manage/LoadMgr");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var tween = cc.tween;
var ShowConfig_1 = require("../../Common/ShowConfig");
var Global_1 = require("../../Common/Global");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paramData = {};
        _this._button = null;
        //test
        _this.testMakeBottomBlock = null;
        _this.testReadyMakeBottomBlock = null;
        //logic
        _this.graySpriteFrame = null;
        _this.whiteSpriteFrame = null;
        _this.hintBlockSpriteFrame = null;
        _this.text_prefab = null;
        _this.hammer_prefab = null;
        _this.sprite_prefab = null;
        _this.sprite_spriteFrame = [];
        _this.hint_1_spriteFrame = null;
        _this.hint_2_spriteFrame = null;
        _this.start_prefab = null;
        _this.hardUp_prefab = null;
        _this.nice_prefab = null;
        _this.get_prefab = null;
        _this._startPoint = null;
        _this._content = null;
        _this._hintUI = null;
        _this._whiteHint = null;
        _this._textHint = null;
        _this._hardLevelLabel = null;
        _this._scoreLabel = null;
        _this._mouth = null;
        _this._mask = null;
        _this._hammer = null;
        _this._sprite = null;
        _this._menu = null;
        _this._menuPanel = null;
        _this._hint_hammer = null;
        _this._hint_sprite = null;
        _this._hint_mask = null;
        _this._hint_label = null;
        _this._hint_hand = null;
        _this._price_sprite = null;
        _this._sprite_icon = null;
        _this._hammer_sprite = null;
        _this._hammer_icon = null;
        _this._content_cover = null;
        _this._lineDatas = [null];
        _this._hintData = null;
        _this.blockPool = null;
        _this.nextBlockInfo = [];
        _this.touchEndFlag = false;
        _this.hardLevel = 1;
        _this.score = 0;
        _this.continueXiao = 0; // 当前连消
        _this.allContinueXiao = 0; //当前难度总消除
        _this.moveX = -1;
        _this.sprite_color = 0; //精灵颜色
        _this.hintFlag = true;
        return _this;
    }
    GameView_1 = GameView;
    GameView.getUrl = function () {
        return {
            bundle: "gameView",
            name: "gameView"
        };
    };
    GameView.prototype.initUI = function () {
        var _this = this;
        //todo 逻辑
        this.testMakeBottomBlock = this.getNode("testUI/makeBottomBlock");
        this.testReadyMakeBottomBlock = this.getNode("testUI/readymakeBottomBlock");
        this.onTouch(this.testMakeBottomBlock, function () {
            _this.makeBottomBlock();
        });
        this.onTouch(this.testReadyMakeBottomBlock, function () {
            _this.readyMakeBottomBlock();
        });
        this._startPoint = this.getNode("startPoint");
        this._content = this.getNode("content");
        this._content_cover = this.getNode("content_cover");
        this._hintUI = this.getNode("hintUI");
        this._whiteHint = this.getNode("white_hint");
        this._textHint = this.getNode("textHint");
        this._mouth = this.getNode("content_cover/top/mouth");
        this._mask = this.getNode("mask");
        this._hammer_sprite = this.getNode("bottomUI/hammer/price");
        this._hammer_icon = this.getNode("bottomUI/hammer/vedioIcon");
        this._hammer_icon.active = false;
        this._price_sprite = this.getNode("bottomUI/sprite/price");
        this._sprite_icon = this.getNode("bottomUI/sprite/vedioIcon");
        this._sprite_icon.active = false;
        this._hint_mask = this.getNode("hint_mask");
        this._hint_mask.active = false;
        this._hint_label = this.getNode("hint_label");
        this._hint_label.active = false;
        this._hint_hand = this.getNode("hint_hand");
        this._hint_hand.active = false;
        this._menu = this.getNode("bottomUI/menu");
        this.onTouch(this._menu, this.handle_menu);
        this._menuPanel = this.getNode("bottomUI/menuPanel");
        this._menuPanel.active = false;
        this.onTouch(this._menuPanel.children[0], this.handle_restart);
        this.onTouch(this._menuPanel.children[1], this.handle_return);
        this._hammer = this.getNode("bottomUI/hammer");
        // this._hammer.on(cc.Node.EventType.TOUCH_END, this.handle_hammer, this)
        this.onTouch(this._hammer, this.handle_hammer);
        this._sprite = this.getNode("bottomUI/sprite");
        this.onTouch(this._sprite, this.handle_sprite);
        this._hint_hammer = this.getNode("hint_hammer");
        this._hint_hammer.active = false;
        this._hint_sprite = this.getNode("hint_sprite");
        this._hint_sprite.active = false;
        this._hardLevelLabel = this.getNode("content_cover/top/hardLevel").getComponent(cc.Label);
        this._scoreLabel = this.getNode("content_cover/top/scoreData").getComponent(cc.Label);
        this.updateSprite();
        //创建对象池
        this.blockPool = new cc.NodePool();
        var blockExm = new cc.Node();
        blockExm.x = 0;
        blockExm.y = 0;
        blockExm.setAnchorPoint(0, 0);
        var sprite = blockExm.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        for (var i = 0; i < 80; i++) {
            var node = cc.instantiate(blockExm);
            this.blockPool.put(node);
        }
        this.scheduleOnce(function () {
            _this._menuPanel.position = _this._menu.position;
            var gridExm = new cc.Node();
            config_1.default.gridSize = _this._startPoint.height / 10;
            _this._content.width = config_1.default.gridSize * 8;
            _this._content.height = config_1.default.gridSize * 10;
            _this._whiteHint.width = _this._content.width;
            _this._whiteHint.height = _this._content.height;
            _this._whiteHint.parent = _this._content;
            gridExm.setAnchorPoint(0, 0);
            gridExm.width = config_1.default.gridSize;
            gridExm.height = config_1.default.gridSize;
            gridExm.opacity = 200;
            _this._hint_hand.width = config_1.default.gridSize;
            _this._hint_hand.height = config_1.default.gridSize;
            _this._hint_hand.setAnchorPoint(0, 0);
            var lineContentExm = new cc.Node();
            lineContentExm.setAnchorPoint(0.5, 0);
            lineContentExm.width = gridExm.width * 8;
            lineContentExm.height = gridExm.height;
            _this._hintUI.width = lineContentExm.width;
            var startPosition = _this._startPoint.getPosition();
            var gridColorTemp = 0; // 0 浅色   1  深色
            for (var i = 10; i >= 1; i--) {
                var lineContent = cc.instantiate(lineContentExm);
                lineContent.name = i.toString();
                lineContent.x = 0;
                lineContent.y = startPosition.y;
                startPosition.y += lineContent.height;
                _this._content.addChild(lineContent);
                var posData = Tools_1.default.getNodeFourPoint(lineContent);
                lineContent.setAnchorPoint(0, 0);
                lineContent.position = cc.v3(posData.left_down);
                if (_this._hintUI.x != lineContent.x) {
                    _this._hintUI.x = lineContent.x;
                    _this._hintData = {
                        blockNodes: [],
                        line: _this._hintUI,
                        linePos: [-1]
                    };
                    var flagX_1 = 0;
                    for (var i_1 = 1; i_1 <= 8; i_1++) {
                        _this._hintData.linePos[i_1] = flagX_1;
                        flagX_1 += config_1.default.gridSize;
                    }
                }
                var flagX = 0;
                var linePosArr = [-1]; //记录 x 轴
                for (var j = 1; j <= 8; j++) {
                    var grid = cc.instantiate(gridExm);
                    grid.name = j.toString();
                    var sprite_1 = grid.addComponent(cc.Sprite);
                    sprite_1.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    if (gridColorTemp == 0) {
                        if (j == 1 && i != 10) {
                            sprite_1.spriteFrame = _this.graySpriteFrame;
                        }
                        else {
                            gridColorTemp = 1;
                            sprite_1.spriteFrame = _this.whiteSpriteFrame;
                        }
                    }
                    else {
                        if (j == 1 && i != 1) {
                            sprite_1.spriteFrame = _this.whiteSpriteFrame;
                        }
                        else {
                            gridColorTemp = 0;
                            sprite_1.spriteFrame = _this.graySpriteFrame;
                        }
                    }
                    grid.y = 0;
                    grid.x = flagX;
                    linePosArr.push(grid.x);
                    flagX += grid.width;
                    lineContent.addChild(grid);
                }
                _this._lineDatas[i] = {
                    blockNodes: [],
                    line: lineContent,
                    linePos: linePosArr
                };
                if (i == 10) {
                    _this._whiteHint.x = lineContent.x;
                    _this._whiteHint.y = lineContent.y;
                    _this._whiteHint.active = false;
                }
            }
            _this.adaptive();
            lineContentExm.destroy();
            gridExm.destroy();
            _this._startPoint.destroy();
            _this.text_start();
            _this.makeBottomBlock(true);
        }, 0);
    };
    GameView.prototype.show = function (param) {
        //todo 逻辑
        ShowConfig_1.default.show('gameConfig').then(function (res) {
            if (Global_1.default.config.gameConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
            else {
                QgBanner_1.default.hideBanner();
            }
        });
    };
    GameView.prototype.hide = function () {
        if (Global_1.default.config.gameConfig.nativeConfig.type == 2) {
            Emit_1.default.instance().emit(EmitData_1.default.CLOSE_NATIVE);
        }
    };
    //todo logic 方法
    GameView.prototype.getBlock = function (size, color) {
        if (color === void 0) { color = -1; }
        var block = this.blockPool.get();
        block.width = size * config_1.default.gridSize;
        block.height = config_1.default.gridSize;
        block.on(cc.Node.EventType.TOUCH_START, this.handle_block_start, this);
        block.on(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this);
        block.on(cc.Node.EventType.TOUCH_END, this.handle_block_end, this);
        block.on(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this);
        LoadMgr_1.default.loadAtlas("view/gameView/block/p").then(function (p) {
            var id = ((color * 10) + size);
            var spriteFrame = p.getSpriteFrame(id.toString());
            block.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        return block;
    };
    //归还方块
    GameView.prototype.returnBlock = function (node) {
        node.off(cc.Node.EventType.TOUCH_START, this.handle_block_start, this);
        node.off(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this);
        node.off(cc.Node.EventType.TOUCH_END, this.handle_block_end, this);
        node.off(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this);
        node.parent = null;
        node.x = 0;
        node.y = 0;
        node.width = config_1.default.gridSize;
        node.height = config_1.default.gridSize;
        node.getComponent(cc.Sprite).spriteFrame = null;
        this.blockPool.put(node);
        return;
    };
    //预创建最低层的方块
    GameView.prototype.readyMakeBottomBlock = function () {
        //先随机需要空出来几个
        //判断是否需要新手提示
        if (!CacheMgr_1.default.isNeedHint || config_1.default.hint_data.length == 0) {
            var blankNum = Tools_1.default.getRandom(config_1.default.bottomBlankMin, config_1.default.bottomBlankMax + 1);
            var blankColumns = [];
            while (true) {
                var column = Tools_1.default.getRandom(1, 9);
                var flag = Tools_1.default.JudgeValueInArr(column, blankColumns);
                for (var i = 0; i < blankColumns.length; i++) {
                    if (column == blankColumns[i]) {
                        flag = true;
                    }
                }
                if (flag) {
                    continue;
                }
                blankColumns.push(column);
                if (blankColumns.length >= blankNum) {
                    break;
                }
            }
            //获取数组中连续的一段
            var allContinueArr = [];
            var continueArr = [];
            for (var i = 1; i < 9; i++) {
                if (Tools_1.default.JudgeValueInArr(i, blankColumns)) {
                    if (continueArr.length > 0) {
                        allContinueArr.push(Tools_1.default.deepClone(continueArr));
                    }
                    continueArr = [];
                }
                else {
                    continueArr.push(i);
                    if (i == 8) {
                        allContinueArr.push(Tools_1.default.deepClone(continueArr));
                    }
                }
            }
            var allBlockInfo_1 = [];
            for (var i = 0; i < allContinueArr.length; i++) {
                var blocInfos = this.definitionBlockType(Tools_1.default.deepClone(allContinueArr[i]));
                blocInfos.forEach(function (value) {
                    allBlockInfo_1.push(value);
                });
            }
            this.nextBlockInfo = allBlockInfo_1;
        }
        else {
            this.nextBlockInfo = config_1.default.hint_data[0];
            config_1.default.hint_data.shift();
        }
        this.updateHint();
    };
    //根据一个位置数组定义这一组方块类型
    GameView.prototype.definitionBlockType = function (arr) {
        var blockInfos = [];
        while (true) {
            var length = arr.length;
            if (arr.length == 0) {
                break;
            }
            if (length >= 4) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_4)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 4,
                    });
                    arr.splice(0, 4);
                    continue;
                }
            }
            if (length >= 3) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_3)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 3
                    });
                    arr.splice(0, 3);
                    continue;
                }
            }
            if (length >= 2) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_2)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 2,
                    });
                    arr.splice(0, 3);
                    continue;
                }
            }
            if (length >= 1) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_1)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 1,
                    });
                    arr.splice(0, 1);
                }
            }
        }
        return blockInfos;
    };
    //刷新提示
    GameView.prototype.updateHint = function () {
        this._hintUI.removeAllChildren();
        for (var i = 0; i < this.nextBlockInfo.length; i++) {
            var info = this.nextBlockInfo[i];
            var hintBlock = new cc.Node("hintBlock");
            hintBlock.setAnchorPoint(0, 0);
            var sprite = hintBlock.addComponent(cc.Sprite);
            sprite.type = cc.Sprite.Type.SLICED;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.hintBlockSpriteFrame;
            hintBlock.width = info.num * config_1.default.gridSize;
            hintBlock.height = this._hintUI.height;
            this._hintUI.addChild(hintBlock);
            hintBlock.y = 0;
            hintBlock.x = this._hintData.linePos[info.column];
        }
    };
    //创建最底层的一套方块
    GameView.prototype.makeBottomBlock = function (isStart) {
        var _this = this;
        if (isStart === void 0) { isStart = false; }
        if (this.nextBlockInfo.length == 0) {
            this.readyMakeBottomBlock();
        }
        this._mask.active = true;
        var result = this.upAllLine();
        Promise.all(result).then(function () {
            //创建方块在下一层
            for (var i = 0; i < _this.nextBlockInfo.length; i++) {
                var lineData = _this._lineDatas[10];
                var nextBlockInfo = _this.nextBlockInfo[i];
                var color = Tools_1.default.getRandom(1, 6);
                var block = _this.getBlock(nextBlockInfo.num, color);
                block.parent = lineData.line;
                block.name = "c_" + nextBlockInfo.column;
                block.x = lineData.linePos[nextBlockInfo.column];
                var blockInfo = {
                    node: block,
                    column: nextBlockInfo.column,
                    num: nextBlockInfo.num,
                    cover: _this.getCoverColumn(nextBlockInfo.column, nextBlockInfo.num),
                    color: color
                };
                lineData.blockNodes.push(blockInfo);
            }
            _this._mask.active = false;
            _this.readyMakeBottomBlock();
            if (isStart) {
                _this.makeBottomBlock();
            }
            else {
                if (CacheMgr_1.default.isNeedHint && _this.hintFlag) {
                    _this.hintFlag = false;
                    _this.hint_play();
                }
                _this.downAllLine(10);
            }
        });
    };
    //将一行方块向上移动
    GameView.prototype.upLine = function (line) {
        var result = [];
        var data = this._lineDatas[line];
        var nextData = this._lineDatas[line - 1];
        if (data.blockNodes && data.blockNodes.length > 0) {
            var nodesData = data.blockNodes;
            var nextNodesData = nextData.blockNodes;
            var _loop_1 = function (i) {
                var n = nodesData[i];
                nextNodesData.push(n);
                n.node.parent = nextData.line;
                n.node.y = -config_1.default.gridSize; //如果y = 0 的话，就没有动画做了
                var p = new Promise(function (resolve, reject) {
                    cc.tween(n.node)
                        .to(config_1.default.upTime, { y: 0 }, { easing: 'cubicInOut' })
                        .call(function () {
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
            };
            for (var i = 0; i < nodesData.length; i++) {
                _loop_1(i);
            }
            data.blockNodes = [];
        }
        return result;
    };
    //将所有方块向上移动
    GameView.prototype.upAllLine = function () {
        //从倒数第二行开始   依次往上移动
        var result = [];
        for (var i = 2; i <= 10; i++) {
            var r = this.upLine(i);
            for (var i_2 = 0; i_2 < r.length; i_2++) {
                result.push(r[i_2]);
            }
        }
        return result;
    };
    GameView.prototype.getCoverColumn = function (first, num) {
        var arr = [];
        for (var i = first; i < first + num; i++) {
            arr.push(i);
        }
        return arr;
    };
    GameView.prototype.handle_block_start = function (e) {
        var node = e.target;
        this._whiteHint.width = node.width;
        var world = node.parent.convertToWorldSpaceAR(node.position);
        var position = this._whiteHint.parent.convertToNodeSpaceAR(world);
        this._whiteHint.x = position.x;
        this._whiteHint.active = true;
        this.moveX = node.x;
    };
    GameView.prototype.handle_block_move = function (e) {
        var node = e.target;
        var a = e.getDelta();
        var world = node.parent.convertToWorldSpaceAR(node.position);
        var position = this._whiteHint.parent.convertToNodeSpaceAR(world);
        this._whiteHint.x = position.x;
        var line = Number(node.parent.name);
        var column = Number(node.name.split("_")[1]);
        var data = this.getCanMoveMax(line, column);
        // let position2 = node.parent.convertToNodeSpaceAR(e.getLocation())
        var x = node.x += a.x;
        if (data.min_x > x) {
            x = data.min_x;
        }
        else if (data.max_x < x) {
            x = data.max_x;
        }
        node.x = x;
    };
    GameView.prototype.getCanMoveMax = function (line, column) {
        var lineData = this._lineDatas[line];
        var right_column = -1;
        var num = 0;
        var left_column = column;
        for (var i = 0; i < lineData.blockNodes.length; i++) {
            var data = lineData.blockNodes[i];
            if (data.column == column) {
                num = data.num;
                right_column = data.cover[data.cover.length - 1];
            }
        }
        var max = 0;
        var min = 0;
        //寻找左右两边最大能够移动的距离
        while (true) {
            right_column++;
            if (right_column > 8) {
                max = right_column - 1;
                break;
            }
            var flag = true;
            for (var i = 0; i < lineData.blockNodes.length; i++) {
                var data = lineData.blockNodes[i];
                for (var j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == right_column) {
                        flag = false;
                        break;
                    }
                }
            }
            if (!flag) {
                max = right_column - 1;
                break;
            }
            else {
                max = right_column;
            }
        }
        while (true) {
            left_column--;
            if (left_column < 1) {
                min = left_column + 1;
                break;
            }
            var flag = true;
            for (var i = 0; i < lineData.blockNodes.length; i++) {
                var data = lineData.blockNodes[i];
                for (var j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == left_column) {
                        flag = false;
                        break;
                    }
                }
            }
            if (!flag) {
                min = left_column + 1;
                break;
            }
            else {
                min = left_column;
            }
        }
        var min_x = lineData.linePos[min];
        var max_x = lineData.linePos[max - num + 1];
        return {
            min_x: min_x,
            max_x: max_x
        };
    };
    GameView.prototype.handle_block_end = function (e) {
        var node = e.target;
        var line = Number(node.parent.name);
        var column = Number(node.name.split("_")[1]);
        this._whiteHint.active = false;
        var lineData = this._lineDatas[line];
        this.continueXiao = 0;
        for (var i = 1; i <= 8; i++) {
            var grid = lineData.line.getChildByName(i.toString());
            var position = cc.v2(grid.x + grid.width / 2, grid.y + grid.height / 2);
            if (node.getBoundingBox().contains(position)) {
                node.x = lineData.linePos[i];
                node.name = "c_" + i;
                for (var j = 0; j < lineData.blockNodes.length; j++) {
                    var bInfo = lineData.blockNodes[j];
                    if (bInfo.column == column) {
                        bInfo.column = i;
                        bInfo.cover = this.getCoverColumn(i, bInfo.num);
                        break;
                    }
                }
                break;
            }
        }
        if (node.x == this.moveX) {
            this.moveX = -1;
            return;
        }
        AudioMgr_1.default.play("move_end").then();
        Tools_1.default.vibrateShort();
        this.touchEndFlag = true;
        this.downAllLine(line);
    };
    //将一行方块向下移动
    GameView.prototype.downLine = function (line) {
        var _this = this;
        var result = [];
        var data = this._lineDatas[line];
        var needChange = [];
        var _loop_2 = function (i) {
            //循环需要下拉行的 所有方块
            var blockInfo = data.blockNodes[i];
            //判断每一个方块最多可以下降到哪一行
            var toLine = -1;
            for (var j = line + 1; j <= 10; j++) {
                var flag = true;
                var nextData = this_1._lineDatas[j];
                for (var k = 0; k < nextData.blockNodes.length; k++) {
                    var cover = nextData.blockNodes[k].cover;
                    if (Tools_1.default.judgeArraySame(blockInfo.cover, cover)) {
                        flag = false;
                    }
                }
                if (flag) {
                    toLine = j;
                }
                else {
                    break;
                }
            }
            if (toLine != -1) {
                needChange.push({
                    index: i,
                    to: toLine,
                });
                var p = new Promise(function (resolve, reject) {
                    var n = blockInfo.node;
                    cc.tween(n)
                        .to(config_1.default.downTime * 0.6, { y: -config_1.default.gridSize * (toLine - line) }, { easing: 'cubicInOut' })
                        .by(config_1.default.downTime * 0.2, { y: 10 })
                        .by(config_1.default.downTime * 0.2, { y: -10 })
                        .union()
                        .call(function () {
                        n.parent = _this._lineDatas[toLine].line;
                        n.y = 0;
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.blockNodes.length; i++) {
            _loop_2(i);
        }
        for (var i = needChange.length - 1; i >= 0; i--) {
            var cdata = needChange[i];
            this._lineDatas[cdata.to].blockNodes.push(data.blockNodes[cdata.index]);
            data.blockNodes.splice(cdata.index, 1);
        }
        return result;
    };
    //将所有方块向下移动
    GameView.prototype.downAllLine = function (line) {
        var _this = this;
        //从倒数第二行开始   依次往上移动
        this._mask.active = true;
        var result = [];
        for (var i = line; i >= 1; i--) {
            if (i == 10) {
                continue;
            }
            var r = this.downLine(i);
            for (var i_3 = 0; i_3 < r.length; i_3++) {
                result.push(r[i_3]);
            }
        }
        if (result.length > 0) {
            Promise.all(result).then(function () {
                AudioMgr_1.default.play("down").then();
                _this.scheduleOnce(function () {
                    _this.judgeAllCanClear();
                });
            });
        }
        else {
            this.judgeAllCanClear();
        }
        // return result
    };
    GameView.prototype.judgeLineCanClear = function (line) {
        var _this = this;
        var result = null;
        var blockData = this._lineDatas[line].blockNodes;
        //获取这个一行所有覆盖
        var allCover = [];
        for (var i = 0; i < blockData.length; i++) {
            blockData[i].cover.forEach(function (value) {
                allCover.push(value);
            });
        }
        if (allCover.length >= 8) {
            result = new Promise(function (resolve, reject) {
                cc.tween(_this._lineDatas[line].line)
                    .by(config_1.default.lineShake / 2, { x: -15 })
                    .by(config_1.default.lineShake / 2, { x: 15 })
                    // .by(gameConfig.lineShake / 30, {y: 2.5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {x: 5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: -5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: 2.5, x: -2.5}, {easing: 'cubicInOut'})
                    .union()
                    // .repeat(6)
                    .call(function () {
                    var line_data = _this._lineDatas[line];
                    for (var i = 0; i < blockData.length; i++) {
                        _this.returnBlock(blockData[i].node);
                    }
                    resolve(true);
                    line_data.blockNodes = [];
                })
                    .start();
            });
        }
        return result;
    };
    //判断所有行是否存在可以消除的行
    GameView.prototype.judgeAllCanClear = function () {
        var _this = this;
        var result = [];
        for (var i = 1; i <= 10; i++) {
            var r = this.judgeLineCanClear(i);
            if (r) {
                result.push(r);
            }
        }
        if (result.length > 0) {
            AudioMgr_1.default.play("xiaochu");
            Tools_1.default.vibrateShort("heavy");
            this.continueXiao += result.length;
            this.allContinueXiao += result.length;
            this.text_defen(result.length);
            this.text_addHard();
            Promise.all(result).then(function () {
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
                if (CacheMgr_1.default.isNeedHint) {
                    _this.hint_hint();
                }
            });
        }
        else {
            //没有需要消除的，需要判断一下是不是输了 ， 即第1层是不是有东西
            if (this._lineDatas[1].blockNodes.length > 0) {
                //todo 输了
                this.fail_win();
                return;
            }
            else if (this._lineDatas[9].blockNodes.length == 0) {
                this.touchEndFlag = false;
                this.makeBottomBlock();
            }
            else if (this.touchEndFlag) {
                this.touchEndFlag = false;
                this.makeBottomBlock();
            }
            else {
                this._mask.active = false;
            }
        }
        return result;
    };
    //适配边框
    GameView.prototype.adaptive = function () {
        var top = this._content_cover.getChildByName("top");
        var left = this._content_cover.getChildByName("left_wall");
        var right = this._content_cover.getChildByName("right_wall");
        var bottom = this._content_cover.getChildByName("bottom");
        var temp = this._lineDatas[1].line.getPosition();
        temp.y += config_1.default.gridSize;
        var left_top = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp));
        temp = Tools_1.default.getNodeFourPoint(this._lineDatas[10].line).right_down;
        var right_bottom = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp));
        top.y = left_top.y;
        top.width = this._content.width + 20;
        top.getChildByName("scoreData").getComponent(cc.Widget).updateAlignment();
        top.getChildByName("hardLevel").getComponent(cc.Widget).updateAlignment();
        bottom.y = right_bottom.y;
        bottom.width = this._content.width + 20;
        left.height = this._content.height + 20;
        left.x = left_top.x;
        left.y = left_top.y - this._content.height / 2;
        right.height = this._content.height + 20;
        right.x = right_bottom.x;
        right.y = left_top.y - this._content.height / 2;
    };
    GameView.prototype.update = function () {
        this._scoreLabel.string = "当前得分:" + this.score;
        this._hardLevelLabel.string = "当前难度:" + this.hardLevel.toString();
        if (CacheMgr_1.default.setting.hammerNum > 0) {
            this._hammer_icon.active = false;
            this._hammer_sprite.active = true;
            // console.log("够 的1 ")
            this._hammer_sprite.getComponent(cc.Label).string = CacheMgr_1.default.setting.hammerNum.toString();
        }
        else {
            // console.log("不够1 ")
            this._hammer_sprite.active = false;
            this._hammer_icon.active = true;
        }
        if (CacheMgr_1.default.setting.spriteNum > 0) {
            // console.log("狗的2 ")
            this._sprite_icon.active = false;
            this._price_sprite.active = true;
            this._price_sprite.getComponent(cc.Label).string = CacheMgr_1.default.setting.spriteNum.toString();
        }
        else {
            // console.log("不够2 ")
            this._price_sprite.active = false;
            this._sprite_icon.active = true;
        }
    };
    //更新精灵节点
    GameView.prototype.updateSprite = function () {
        this.sprite_color = Tools_1.default.getRandom(1, 6);
        this._sprite.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = this.sprite_spriteFrame[this.sprite_color];
    };
    GameView.prototype.fail_win = function () {
        var _this = this;
        AudioMgr_1.default.play("fail");
        Tools_1.default.vibrateLong();
        var result = [];
        var time = 0;
        for (var i = 1; i <= 10; i++) {
            var lineData = this._lineDatas[i];
            lineData.blockNodes.forEach(function (value) {
                var node = value.node;
                var world = _this._mouth.parent.convertToWorldSpaceAR(_this._mouth.position);
                var position = node.parent.convertToNodeSpaceAR(world);
                position.x -= config_1.default.gridSize / 2;
                position.y -= config_1.default.gridSize / 2;
                // node.setAnchorPoint(0.5,0.5)
                var p = new Promise(function (resolve, reject) {
                    cc.tween(node)
                        .delay(time)
                        .bezierTo(config_1.default.blockFlyTime, cc.v2(Tools_1.default.getRandom(0, 500), Tools_1.default.getRandom(0, 500)), cc.v2(Tools_1.default.getRandom(0, 500), Tools_1.default.getRandom(0, 500)), cc.v2(position))
                        .call(function () {
                        node.active = false;
                        node.destroy();
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
                time += config_1.default.blockFlyTime;
            });
        }
        var isNewMax = false;
        CacheMgr_1.default.gold = CacheMgr_1.default.gold + this.score;
        if (this.score > CacheMgr_1.default.checkpoint) {
            CacheMgr_1.default.checkpoint = this.score;
            isNewMax = true;
        }
        Promise.all(result).then(function () {
            PanelMgr_1.default.INS.openPanel({
                panel: EndView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    score: _this.score,
                    isNewMax: isNewMax
                },
                call: function () {
                    PanelMgr_1.default.INS.closePanel(GameView_1);
                }
            });
        });
    };
    GameView.prototype.text_defen = function (n) {
        var num = this.hardLevel * n * this.continueXiao;
        this.score += num;
        var node = null;
        node = cc.instantiate(this.get_prefab);
        node.children[0].getComponent(cc.Label).string = num.toString();
        this._textHint.addChild(node);
        if (this.continueXiao > 1) {
            node = cc.instantiate(this.nice_prefab);
            node.children[0].getComponent(cc.Label).string = this.continueXiao.toString();
            this._textHint.addChild(node);
        }
    };
    GameView.prototype.text_start = function () {
        AudioMgr_1.default.play("start");
        var text_prefab = cc.instantiate(this.start_prefab);
        // text_prefab.getComponent(cc.Label).string = "游戏开始"
        text_prefab.getComponent(text_1.default).delay = 5;
        // this._textHint.addChild(text_prefab)
        // text_prefab = cc.instantiate(this.text_prefab)
        // text_prefab.getComponent(Text).delay = 5
        // text_prefab.getComponent(cc.Label).string = "拖动方块，消除整行."
        this._textHint.addChild(text_prefab);
    };
    GameView.prototype.text_addHard = function () {
        if (this.hardLevel >= config_1.default.grade_of_difficulty_config.length - 1) {
            return;
        }
        if (this.allContinueXiao >= 10) {
            this.hardLevel++;
            this.allContinueXiao = 2;
            var text_prefab = cc.instantiate(this.hardUp_prefab);
            // text_prefab.getComponent(cc.Label).string = "难度提升，得分X" + this.hardLevel
            text_prefab.children[0].getComponent(cc.Label).string = this.hardLevel.toString();
            text_prefab.getComponent(text_1.default).delay = 5;
            this._textHint.addChild(text_prefab);
        }
    };
    GameView.prototype.handle_hammer = function () {
        var _this = this;
        if (this._hint_hammer.active) {
            return;
        }
        if (CacheMgr_1.default.setting.hammerNum <= 0) {
            Tools_1.default.handleVideo().then(function (res) {
                if (!res) {
                    return;
                }
                //判断是否存在3个的方块
                var dataBeChui = [];
                var _loop_4 = function (i) {
                    _this._lineDatas[i].blockNodes.forEach(function (value) {
                        if (value.num >= 3) {
                            dataBeChui.push({
                                line: i,
                                column: value.column
                            });
                        }
                    });
                };
                for (var i = 1; i <= 10; i++) {
                    _loop_4(i);
                }
                if (dataBeChui.length == 0) {
                    _this._hint_hammer.active = true;
                    // Tools.changeGold(gameConfig.price)
                    _this.scheduleOnce(function () {
                        _this._hint_hammer.active = false;
                    }, config_1.default.hide_hint_sprite);
                    CacheMgr_1.default.setting.hammerNum++;
                    CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                    return;
                }
                _this._mask.active = true;
                var pss = [];
                var needDelete = new Map();
                dataBeChui.forEach(function (value) {
                    var pp = new Promise(function (resolve, reject) {
                        var lineData = _this._lineDatas[value.line];
                        var idx = 0;
                        lineData.blockNodes.forEach(function (value2, index) {
                            if (value2.column == value.column) {
                                idx = index;
                            }
                        });
                        var oldBlock = lineData.blockNodes[idx];
                        var ps = [];
                        var _loop_5 = function (i) {
                            var h = cc.instantiate(_this.hammer_prefab);
                            h.width = config_1.default.gridSize;
                            h.height = config_1.default.gridSize;
                            var world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position);
                            _this._content.addChild(h);
                            h.position = h.parent.convertToNodeSpaceAR(world);
                            h.x += oldBlock.node.width / 2;
                            h.y += oldBlock.node.height / 2;
                            var p = new Promise(function (resolve, reject) {
                                cc.tween(h)
                                    .delay(0.5)
                                    .to(config_1.default.hammerRotation, { angle: 30 }, { easing: 'cubicInOut' })
                                    .call(function () {
                                    cc.tween(oldBlock.node)
                                        .by(config_1.default.lineShake / 2, { x: -15 })
                                        .by(config_1.default.lineShake / 2, { x: 15 })
                                        .union()
                                        .call(function () {
                                        h.active = false;
                                        h.destroy();
                                        var node = _this.getBlock(1, oldBlock.color);
                                        node.y = 0;
                                        node.x = lineData.linePos[oldBlock.cover[i]];
                                        node.name = "c_" + oldBlock.cover[i];
                                        lineData.line.addChild(node);
                                        lineData.blockNodes.push({
                                            node: node,
                                            column: oldBlock.cover[i],
                                            num: 1,
                                            cover: [oldBlock.cover[i]],
                                            color: oldBlock.color,
                                        });
                                        resolve(true);
                                    })
                                        .start();
                                })
                                    .start();
                            });
                            ps.push(p);
                        };
                        for (var i = 0; i < oldBlock.cover.length; i++) {
                            _loop_5(i);
                        }
                        Promise.all(ps).then(function () {
                            _this.returnBlock(oldBlock.node);
                            // needDelete.push({
                            //     line: value.line,
                            //     idx: idx
                            // })
                            if (!needDelete.has(value.line)) {
                                needDelete.set(value.line, []);
                            }
                            needDelete.get(value.line).push(idx);
                            // lineData.blockNodes.splice(idx, 1)
                            resolve(true);
                        });
                    });
                    pss.push(pp);
                });
                _this.scheduleOnce(function () {
                    AudioMgr_1.default.play("knock");
                }, 0.5);
                Promise.all(pss).then(function () {
                    _this._mask.active = false;
                    needDelete.forEach(function (value, key) {
                        for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools_1.default.JudgeValueInArr(i, value)) {
                                _this._lineDatas[key].blockNodes.splice(i, 1);
                            }
                        }
                    });
                    _this.scheduleOnce(function () {
                        _this.downAllLine(10);
                    }, 0);
                });
            });
        }
        else {
            //判断是否存在3个的方块
            var dataBeChui_1 = [];
            var _loop_3 = function (i) {
                this_2._lineDatas[i].blockNodes.forEach(function (value) {
                    if (value.num >= 3) {
                        dataBeChui_1.push({
                            line: i,
                            column: value.column
                        });
                    }
                });
            };
            var this_2 = this;
            for (var i = 1; i <= 10; i++) {
                _loop_3(i);
            }
            if (dataBeChui_1.length == 0) {
                this._hint_hammer.active = true;
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(function () {
                    _this._hint_hammer.active = false;
                }, config_1.default.hide_hint_sprite);
                return;
            }
            CacheMgr_1.default.setting.hammerNum--;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            this._mask.active = true;
            var pss_1 = [];
            var needDelete_1 = new Map();
            dataBeChui_1.forEach(function (value) {
                var pp = new Promise(function (resolve, reject) {
                    var lineData = _this._lineDatas[value.line];
                    var idx = 0;
                    lineData.blockNodes.forEach(function (value2, index) {
                        if (value2.column == value.column) {
                            idx = index;
                        }
                    });
                    var oldBlock = lineData.blockNodes[idx];
                    var ps = [];
                    var _loop_6 = function (i) {
                        var h = cc.instantiate(_this.hammer_prefab);
                        h.width = config_1.default.gridSize;
                        h.height = config_1.default.gridSize;
                        var world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position);
                        _this._content.addChild(h);
                        h.position = h.parent.convertToNodeSpaceAR(world);
                        h.x += oldBlock.node.width / 2;
                        h.y += oldBlock.node.height / 2;
                        var p = new Promise(function (resolve, reject) {
                            cc.tween(h)
                                .delay(0.5)
                                .to(config_1.default.hammerRotation, { angle: 30 }, { easing: 'cubicInOut' })
                                .call(function () {
                                cc.tween(oldBlock.node)
                                    .by(config_1.default.lineShake / 2, { x: -15 })
                                    .by(config_1.default.lineShake / 2, { x: 15 })
                                    .union()
                                    .call(function () {
                                    h.active = false;
                                    h.destroy();
                                    var node = _this.getBlock(1, oldBlock.color);
                                    node.y = 0;
                                    node.x = lineData.linePos[oldBlock.cover[i]];
                                    node.name = "c_" + oldBlock.cover[i];
                                    lineData.line.addChild(node);
                                    lineData.blockNodes.push({
                                        node: node,
                                        column: oldBlock.cover[i],
                                        num: 1,
                                        cover: [oldBlock.cover[i]],
                                        color: oldBlock.color,
                                    });
                                    resolve(true);
                                })
                                    .start();
                            })
                                .start();
                        });
                        ps.push(p);
                    };
                    for (var i = 0; i < oldBlock.cover.length; i++) {
                        _loop_6(i);
                    }
                    Promise.all(ps).then(function () {
                        _this.returnBlock(oldBlock.node);
                        // needDelete.push({
                        //     line: value.line,
                        //     idx: idx
                        // })
                        if (!needDelete_1.has(value.line)) {
                            needDelete_1.set(value.line, []);
                        }
                        needDelete_1.get(value.line).push(idx);
                        // lineData.blockNodes.splice(idx, 1)
                        resolve(true);
                    });
                });
                pss_1.push(pp);
            });
            this.scheduleOnce(function () {
                AudioMgr_1.default.play("knock");
            }, 0.5);
            Promise.all(pss_1).then(function () {
                _this._mask.active = false;
                needDelete_1.forEach(function (value, key) {
                    for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools_1.default.JudgeValueInArr(i, value)) {
                            _this._lineDatas[key].blockNodes.splice(i, 1);
                        }
                    }
                });
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
            });
        }
    };
    GameView.prototype.handle_sprite = function () {
        var _this = this;
        if (this._hint_sprite.active) {
            return;
        }
        if (CacheMgr_1.default.setting.spriteNum <= 0) {
            Tools_1.default.handleVideo().then(function (res) {
                if (!res) {
                    return;
                }
                var needDelData = new Map();
                var ps = [];
                var _loop_8 = function (i) {
                    var blockInfo = _this._lineDatas[i].blockNodes;
                    blockInfo.forEach(function (value, index) {
                        if (value.color == _this.sprite_color) {
                            if (!needDelData.has(i)) {
                                needDelData.set(i, []);
                            }
                            needDelData.get(i).push(index);
                            var sprite_node_1 = cc.instantiate(_this.sprite_prefab);
                            sprite_node_1.scale = config_1.default.gridSize / sprite_node_1.width;
                            _this.node.addChild(sprite_node_1);
                            sprite_node_1.position = sprite_node_1.parent.convertToNodeSpaceAR(_this._sprite.parent.convertToWorldSpaceAR(_this._sprite.position));
                            sprite_node_1.getComponent(cc.Sprite).spriteFrame = _this.sprite_spriteFrame[_this.sprite_color];
                            var p = new Promise(function (resolve, reject) {
                                var world = value.node.parent.convertToWorldSpaceAR(value.node.position);
                                var position = sprite_node_1.parent.convertToNodeSpaceAR(world);
                                position.x += value.node.width / 2;
                                position.y += value.node.height / 2;
                                cc.tween(sprite_node_1)
                                    .bezierTo(config_1.default.sprite_move, cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(position))
                                    .call(function () {
                                    cc.tween(sprite_node_1)
                                        .by(config_1.default.sprite_jump / 2, { y: 20 }, { easing: 'cubicInOut' })
                                        .by(config_1.default.sprite_jump / 2, { y: -20 }, { easing: 'cubicInOut' })
                                        .union()
                                        .call(function () {
                                        cc.tween(value.node)
                                            .by(config_1.default.lineShake / 2, { x: -15 })
                                            .by(config_1.default.lineShake / 2, { x: 15 })
                                            .union()
                                            .call(function () {
                                            sprite_node_1.active = false;
                                            value.node.active = false;
                                            value.node.destroy();
                                            resolve(true);
                                        })
                                            .start();
                                    })
                                        .start();
                                })
                                    .start();
                            });
                            ps.push(p);
                        }
                    });
                };
                //遍历颜色
                for (var i = 1; i <= 10; i++) {
                    _loop_8(i);
                }
                if (needDelData.size == 0) {
                    _this._hint_sprite.active = true;
                    // Tools.changeGold(gameConfig.price)
                    _this.scheduleOnce(function () {
                        _this._hint_sprite.active = false;
                    }, config_1.default.hide_hint_sprite);
                    CacheMgr_1.default.setting.spriteNum++;
                    CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                    console.log("加上一次提示机会", CacheMgr_1.default.setting);
                    return;
                }
                // AudioMgr.play("sprite_move")
                _this._mask.active = true;
                Promise.all(ps).then(function () {
                    AudioMgr_1.default.play("sprite_xiaochu");
                    needDelData.forEach(function (value, key) {
                        for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools_1.default.JudgeValueInArr(i, value)) {
                                _this._lineDatas[key].blockNodes.splice(i, 1);
                            }
                        }
                    });
                    _this.updateSprite();
                    _this.scheduleOnce(function () {
                        _this.downAllLine(10);
                    }, 0);
                    _this._mask.active = false;
                });
            });
        }
        else {
            var needDelData_1 = new Map();
            var ps_1 = [];
            var _loop_7 = function (i) {
                var blockInfo = this_3._lineDatas[i].blockNodes;
                blockInfo.forEach(function (value, index) {
                    if (value.color == _this.sprite_color) {
                        if (!needDelData_1.has(i)) {
                            needDelData_1.set(i, []);
                        }
                        needDelData_1.get(i).push(index);
                        var sprite_node_2 = cc.instantiate(_this.sprite_prefab);
                        sprite_node_2.scale = config_1.default.gridSize / sprite_node_2.width;
                        _this.node.addChild(sprite_node_2);
                        sprite_node_2.position = sprite_node_2.parent.convertToNodeSpaceAR(_this._sprite.parent.convertToWorldSpaceAR(_this._sprite.position));
                        sprite_node_2.getComponent(cc.Sprite).spriteFrame = _this.sprite_spriteFrame[_this.sprite_color];
                        var p = new Promise(function (resolve, reject) {
                            var world = value.node.parent.convertToWorldSpaceAR(value.node.position);
                            var position = sprite_node_2.parent.convertToNodeSpaceAR(world);
                            position.x += value.node.width / 2;
                            position.y += value.node.height / 2;
                            cc.tween(sprite_node_2)
                                .bezierTo(config_1.default.sprite_move, cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(position))
                                .call(function () {
                                cc.tween(sprite_node_2)
                                    .by(config_1.default.sprite_jump / 2, { y: 20 }, { easing: 'cubicInOut' })
                                    .by(config_1.default.sprite_jump / 2, { y: -20 }, { easing: 'cubicInOut' })
                                    .union()
                                    .call(function () {
                                    cc.tween(value.node)
                                        .by(config_1.default.lineShake / 2, { x: -15 })
                                        .by(config_1.default.lineShake / 2, { x: 15 })
                                        .union()
                                        .call(function () {
                                        sprite_node_2.active = false;
                                        value.node.active = false;
                                        value.node.destroy();
                                        resolve(true);
                                    })
                                        .start();
                                })
                                    .start();
                            })
                                .start();
                        });
                        ps_1.push(p);
                    }
                });
            };
            var this_3 = this;
            //遍历颜色
            for (var i = 1; i <= 10; i++) {
                _loop_7(i);
            }
            if (needDelData_1.size == 0) {
                this._hint_sprite.active = true;
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(function () {
                    _this._hint_sprite.active = false;
                }, config_1.default.hide_hint_sprite);
                return;
            }
            CacheMgr_1.default.setting.spriteNum--;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            // AudioMgr.play("sprite_move")
            this._mask.active = true;
            Promise.all(ps_1).then(function () {
                AudioMgr_1.default.play("sprite_xiaochu");
                needDelData_1.forEach(function (value, key) {
                    for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools_1.default.JudgeValueInArr(i, value)) {
                            _this._lineDatas[key].blockNodes.splice(i, 1);
                        }
                    }
                });
                _this.updateSprite();
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
                _this._mask.active = false;
            });
        }
    };
    GameView.prototype.handle_menu = function () {
        var _this = this;
        // this._menuPanel.active = !this._menuPanel.active
        if (this._menuPanel.y > this._menu.y) {
            if (this._menuPanel.y != this._menu.y + this._menu.height) {
                return;
            }
            tween(this._menuPanel)
                .to(config_1.default.menu_box_move, { y: this._menu.y }, { easing: 'cubicInOut' })
                .call(function () {
                _this.scheduleOnce(function () {
                    _this._menuPanel.active = false;
                });
            })
                .start();
        }
        else {
            this._menuPanel.active = true;
            tween(this._menuPanel)
                .to(config_1.default.menu_box_move, { y: this._menu.y + this._menu.height })
                .start();
        }
    };
    //重新开始
    GameView.prototype.handle_restart = function () {
        var _this = this;
        for (var i = 1; i <= 10; i++) {
            var lineData = this._lineDatas[i];
            lineData.blockNodes.forEach(function (value) {
                _this.returnBlock(value.node);
            });
            lineData.blockNodes = [];
        }
        this.continueXiao = 0;
        this.allContinueXiao = 0;
        this.hardLevel = 1;
        this.score = 0;
        this.makeBottomBlock(true);
    };
    //返回首页
    GameView.prototype.handle_return = function () {
        PanelMgr_1.default.INS.openPanel({
            panel: HomeView_1.default,
            layer: PanelMgr_1.Layer.gameLayer,
            call: function () {
                PanelMgr_1.default.INS.closePanel(GameView_1);
            }
        });
    };
    GameView.prototype.update_hintMask = function () {
        if (this._hint_mask) {
            this._hint_mask.children[0].x = -this._hint_mask.position.x;
            this._hint_mask.children[0].y = -this._hint_mask.position.y;
        }
    };
    GameView.prototype.hint_play = function () {
        var _this = this;
        this._hint_mask.active = true;
        this._hint_mask.width = this._lineDatas[10].line.width;
        this._hint_mask.height = this._lineDatas[10].line.height * 2;
        this._hint_mask.position = this._lineDatas[10].line.position;
        for (var i = 9; i <= 10; i++) {
            if (i == 10) {
                this._lineDatas[i].blockNodes.forEach(function (value) {
                    var node = value.node;
                    node.off(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
                    node.off(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
                    node.off(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
                    node.off(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
                });
            }
            else {
                this._lineDatas[i].blockNodes.forEach(function (value) {
                    if (value.column != 6) {
                        var node = value.node;
                        node.off(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
                        node.off(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
                        node.off(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
                        node.off(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
                    }
                });
            }
        }
        // this._hint_label.getComponent(cc.Label).string = "按住方块，向左拖动1格"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_1_spriteFrame;
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height;
        this._hint_label.active = true;
        this._hint_hand.active = true;
        this._hint_hand.width = config_1.default.gridSize;
        this._hint_hand.height = config_1.default.gridSize;
        var p = cc.v3(this._lineDatas[9].linePos[6]);
        var startWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p);
        var startPosition = this.node.convertToNodeSpaceAR(startWorld);
        startPosition.x += config_1.default.gridSize / 2;
        startPosition.y -= config_1.default.gridSize / 2;
        var p2 = cc.v3(this._lineDatas[9].linePos[5]);
        var endWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p2);
        var endPosition = this.node.convertToNodeSpaceAR(endWorld);
        endPosition.y -= config_1.default.gridSize / 2;
        this._hint_hand.position = startPosition;
        tween(this._hint_hand)
            .to(config_1.default.hint_hand_move, { position: endPosition })
            .to(0, { position: startPosition })
            .union()
            .repeatForever()
            .start();
        this.update_hintMask();
    };
    GameView.prototype.hint_hint = function () {
        var _this = this;
        this._hint_mask.width = this._hintUI.width;
        this._hint_mask.height = this._hintUI.height;
        this._hint_mask.position = this._hintUI.position;
        this._hint_hand.active = false;
        // this._hint_label.getComponent(cc.Label).string = "这里是下一行即将出现的方块（点击空白继续）"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_2_spriteFrame;
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height;
        this._hint_label.active = true;
        this.update_hintMask();
        this.hint_register();
        CacheMgr_1.default.isNeedHint = false;
        this._hint_mask.active = false;
        this.scheduleOnce(function () {
            tween(_this._hint_label)
                .to(1, { opacity: 0 })
                .call(function () {
                _this._hint_label.active = false;
            })
                .start();
        }, 4);
    };
    GameView.prototype.hint_register = function () {
        var _this = this;
        this._lineDatas[9].blockNodes.forEach(function (value) {
            var block = value.node;
            block.on(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
            block.on(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
            block.on(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
            block.on(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
        });
    };
    //重写 gameBoxScroll 滚动方向
    GameView.prototype.gameBoxScrollViewDirection = function () {
        return "v";
    };
    var GameView_1;
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "graySpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "whiteSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hintBlockSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "text_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "hammer_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "sprite_prefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GameView.prototype, "sprite_spriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hint_1_spriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hint_2_spriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "start_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "hardUp_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "nice_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "get_prefab", void 0);
    GameView = GameView_1 = __decorate([
        ccclass
    ], GameView);
    return GameView;
}(LayerPanel_1.default));
exports.default = GameView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEdhbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUF5RTtBQUN6RSw0Q0FBdUM7QUFDdkMscUNBQWdDO0FBQ2hDLDRDQUF1QztBQUN2QyxnREFBK0M7QUFDL0MsdUNBQWtDO0FBQ2xDLHlEQUFvRDtBQUNwRCx5REFBb0Q7QUFDcEQsdURBQWtEO0FBRWxELHlEQUE2RDtBQUM3RCxJQUFPLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3hCLHNEQUFpRDtBQUNqRCw4Q0FBeUM7QUFDekMsNkRBQXdEO0FBQ3hELHNEQUFpRDtBQUNqRCw4REFBeUQ7QUFFbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVU7SUFBaEQ7UUFBQSxxRUEwL0NDO1FBbi9DVyxnQkFBVSxHQUFRLEVBQUUsQ0FBQztRQUVyQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRWhDLE1BQU07UUFDRSx5QkFBbUIsR0FBWSxJQUFJLENBQUE7UUFDbkMsOEJBQXdCLEdBQVksSUFBSSxDQUFBO1FBQ2hELE9BQU87UUFFQSxxQkFBZSxHQUFtQixJQUFJLENBQUE7UUFFdEMsc0JBQWdCLEdBQW1CLElBQUksQ0FBQTtRQUV2QywwQkFBb0IsR0FBbUIsSUFBSSxDQUFBO1FBRTNDLGlCQUFXLEdBQWMsSUFBSSxDQUFBO1FBRTdCLG1CQUFhLEdBQWMsSUFBSSxDQUFBO1FBRS9CLG1CQUFhLEdBQWMsSUFBSSxDQUFBO1FBRS9CLHdCQUFrQixHQUFxQixFQUFFLENBQUE7UUFHekMsd0JBQWtCLEdBQW1CLElBQUksQ0FBQTtRQUV6Qyx3QkFBa0IsR0FBbUIsSUFBSSxDQUFBO1FBR3pDLGtCQUFZLEdBQWMsSUFBSSxDQUFBO1FBRTlCLG1CQUFhLEdBQWMsSUFB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RSxDQUFDLE1BQU0sQ0FBQztpREFDZ0I7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDZTtJQTFDbEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTAvQzVCO0lBQUQsZUFBQztDQTEvQ0QsQUEwL0NDLENBMS9DcUMsb0JBQVUsR0EwL0MvQztrQkExL0NvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyUGFuZWwsIHtVcmxJbmZvfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9MYXllci9MYXllclBhbmVsXCI7XHJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vLi4vQ29tbW9uL1Rvb2xzXCI7XHJcbmltcG9ydCBFbmRWaWV3IGZyb20gXCIuL0VuZFZpZXdcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vbG9naWMvY29tbW9uL3RleHRcIjtcclxuaW1wb3J0IGdhbWVDb25maWcgZnJvbSBcIi4vbG9naWMvY29tbW9uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgSG9tZVZpZXcgZnJvbSBcIi4vSG9tZVZpZXdcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcbmltcG9ydCBBdWRpb01nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9BdWRpb01nclwiO1xyXG5pbXBvcnQgTG9hZE1nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9Mb2FkTWdyXCI7XHJcbmltcG9ydCBDb25zdGFudCBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbnN0YW50XCI7XHJcbmltcG9ydCBQYW5lbE1nciwge0xheWVyfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5pbXBvcnQgdHdlZW4gPSBjYy50d2VlbjtcclxuaW1wb3J0IFNob3dDb25maWcgZnJvbSBcIi4uLy4uL0NvbW1vbi9TaG93Q29uZmlnXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0NvbW1vbi9HbG9iYWxcIjtcclxuaW1wb3J0IFFnQmFubmVyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0FwaS9RZ0Jhbm5lclwiO1xyXG5pbXBvcnQgRW1pdCBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXRcIjtcclxuaW1wb3J0IEVtaXREYXRhIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0VtaXQvRW1pdERhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVZpZXcgZXh0ZW5kcyBMYXllclBhbmVsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ1bmRsZTogXCJnYW1lVmlld1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcImdhbWVWaWV3XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9wYXJhbURhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy90ZXN0XHJcbiAgICBwcml2YXRlIHRlc3RNYWtlQm90dG9tQmxvY2s6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHRlc3RSZWFkeU1ha2VCb3R0b21CbG9jazogY2MuTm9kZSA9IG51bGxcclxuICAgIC8vbG9naWNcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHB1YmxpYyBncmF5U3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIHdoaXRlU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIGhpbnRCbG9ja1Nwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgdGV4dF9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgaGFtbWVyX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBzcHJpdGVfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHB1YmxpYyBzcHJpdGVfc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHB1YmxpYyBoaW50XzFfc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIGhpbnRfMl9zcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBzdGFydF9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgaGFyZFVwX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBuaWNlX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBnZXRfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcblxyXG5cclxuICAgIHByaXZhdGUgX3N0YXJ0UG9pbnQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfaGludFVJOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfd2hpdGVIaW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfdGV4dEhpbnQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oYXJkTGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcbiAgICBwcml2YXRlIF9zY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgX21vdXRoOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfbWFzazogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hhbW1lcjogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX3Nwcml0ZTogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX21lbnU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9tZW51UGFuZWw6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfaGludF9oYW1tZXI6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oaW50X3Nwcml0ZTogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hpbnRfbWFzazogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hpbnRfbGFiZWw6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oaW50X2hhbmQ6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfcHJpY2Vfc3ByaXRlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfc3ByaXRlX2ljb246IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oYW1tZXJfc3ByaXRlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfaGFtbWVyX2ljb246IGNjLk5vZGUgPSBudWxsXHJcblxyXG5cclxuICAgIHByaXZhdGUgX2NvbnRlbnRfY292ZXI6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfbGluZURhdGFzOiBsaW5lRGF0YVtdID0gW251bGxdXHJcbiAgICBwcml2YXRlIF9oaW50RGF0YTogbGluZURhdGEgPSBudWxsXHJcbiAgICBwcml2YXRlIGJsb2NrUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsXHJcbiAgICBwcml2YXRlIG5leHRCbG9ja0luZm86IG5leHRCbG9ja0luZm8gW10gPSBbXVxyXG4gICAgcHJpdmF0ZSB0b3VjaEVuZEZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgcHJpdmF0ZSBoYXJkTGV2ZWw6IG51bWJlciA9IDFcclxuICAgIHByaXZhdGUgc2NvcmU6IG51bWJlciA9IDBcclxuICAgIHByaXZhdGUgY29udGludWVYaWFvOiBudW1iZXIgPSAwIC8vIOW9k+WJjei/nua2iFxyXG4gICAgcHJpdmF0ZSBhbGxDb250aW51ZVhpYW86IG51bWJlciA9IDAvL+W9k+WJjemavuW6puaAu+a2iOmZpFxyXG4gICAgcHJpdmF0ZSBtb3ZlWCA9IC0xXHJcbiAgICBwcml2YXRlIHNwcml0ZV9jb2xvcjogbnVtYmVyID0gMCAvL+eyvueBteminOiJslxyXG4gICAgcHJpdmF0ZSBoaW50RmxhZyA9IHRydWVcclxuXHJcbiAgICBwdWJsaWMgaW5pdFVJKCkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpFcclxuICAgICAgICB0aGlzLnRlc3RNYWtlQm90dG9tQmxvY2sgPSB0aGlzLmdldE5vZGUoXCJ0ZXN0VUkvbWFrZUJvdHRvbUJsb2NrXCIpXHJcbiAgICAgICAgdGhpcy50ZXN0UmVhZHlNYWtlQm90dG9tQmxvY2sgPSB0aGlzLmdldE5vZGUoXCJ0ZXN0VUkvcmVhZHltYWtlQm90dG9tQmxvY2tcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy50ZXN0TWFrZUJvdHRvbUJsb2NrLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLnRlc3RSZWFkeU1ha2VCb3R0b21CbG9jaywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5TWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSB0aGlzLmdldE5vZGUoXCJzdGFydFBvaW50XCIpXHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHRoaXMuZ2V0Tm9kZShcImNvbnRlbnRcIilcclxuICAgICAgICB0aGlzLl9jb250ZW50X2NvdmVyID0gdGhpcy5nZXROb2RlKFwiY29udGVudF9jb3ZlclwiKVxyXG4gICAgICAgIHRoaXMuX2hpbnRVSSA9IHRoaXMuZ2V0Tm9kZShcImhpbnRVSVwiKVxyXG4gICAgICAgIHRoaXMuX3doaXRlSGludCA9IHRoaXMuZ2V0Tm9kZShcIndoaXRlX2hpbnRcIilcclxuICAgICAgICB0aGlzLl90ZXh0SGludCA9IHRoaXMuZ2V0Tm9kZShcInRleHRIaW50XCIpXHJcbiAgICAgICAgdGhpcy5fbW91dGggPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9tb3V0aFwiKVxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB0aGlzLmdldE5vZGUoXCJtYXNrXCIpXHJcbiAgICAgICAgdGhpcy5faGFtbWVyX3Nwcml0ZSA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL2hhbW1lci9wcmljZVwiKVxyXG4gICAgICAgIHRoaXMuX2hhbW1lcl9pY29uID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvaGFtbWVyL3ZlZGlvSWNvblwiKVxyXG4gICAgICAgIHRoaXMuX2hhbW1lcl9pY29uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvc3ByaXRlL3ByaWNlXCIpXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24gPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9zcHJpdGUvdmVkaW9JY29uXCIpXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sgPSB0aGlzLmdldE5vZGUoXCJoaW50X21hc2tcIilcclxuICAgICAgICB0aGlzLl9oaW50X21hc2suYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X2xhYmVsID0gdGhpcy5nZXROb2RlKFwiaGludF9sYWJlbFwiKVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQgPSB0aGlzLmdldE5vZGUoXCJoaW50X2hhbmRcIilcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5fbWVudSA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL21lbnVcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fbWVudSwgdGhpcy5oYW5kbGVfbWVudSlcclxuICAgICAgICB0aGlzLl9tZW51UGFuZWwgPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9tZW51UGFuZWxcIilcclxuICAgICAgICB0aGlzLl9tZW51UGFuZWwuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fbWVudVBhbmVsLmNoaWxkcmVuWzBdLCB0aGlzLmhhbmRsZV9yZXN0YXJ0KVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLl9tZW51UGFuZWwuY2hpbGRyZW5bMV0sIHRoaXMuaGFuZGxlX3JldHVybilcclxuXHJcbiAgICAgICAgdGhpcy5faGFtbWVyID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvaGFtbWVyXCIpXHJcbiAgICAgICAgLy8gdGhpcy5faGFtbWVyLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfaGFtbWVyLCB0aGlzKVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLl9oYW1tZXIsIHRoaXMuaGFuZGxlX2hhbW1lcilcclxuICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9zcHJpdGVcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fc3ByaXRlLCB0aGlzLmhhbmRsZV9zcHJpdGUpXHJcblxyXG4gICAgICAgIHRoaXMuX2hpbnRfaGFtbWVyID0gdGhpcy5nZXROb2RlKFwiaGludF9oYW1tZXJcIilcclxuICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICB0aGlzLl9oaW50X3Nwcml0ZSA9IHRoaXMuZ2V0Tm9kZShcImhpbnRfc3ByaXRlXCIpXHJcbiAgICAgICAgdGhpcy5faGludF9zcHJpdGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5faGFyZExldmVsTGFiZWwgPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9oYXJkTGV2ZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuX3Njb3JlTGFiZWwgPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9zY29yZURhdGFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUoKVxyXG4gICAgICAgIC8v5Yib5bu65a+56LGh5rGgXHJcbiAgICAgICAgdGhpcy5ibG9ja1Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKVxyXG4gICAgICAgIGxldCBibG9ja0V4bSA9IG5ldyBjYy5Ob2RlKClcclxuICAgICAgICBibG9ja0V4bS54ID0gMFxyXG4gICAgICAgIGJsb2NrRXhtLnkgPSAwXHJcbiAgICAgICAgYmxvY2tFeG0uc2V0QW5jaG9yUG9pbnQoMCwgMClcclxuICAgICAgICBsZXQgc3ByaXRlID0gYmxvY2tFeG0uYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYmxvY2tFeG0pXHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tQb29sLnB1dChub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbnVQYW5lbC5wb3NpdGlvbiA9IHRoaXMuX21lbnUucG9zaXRpb25cclxuICAgICAgICAgICAgbGV0IGdyaWRFeG0gPSBuZXcgY2MuTm9kZSgpXHJcbiAgICAgICAgICAgIGdhbWVDb25maWcuZ3JpZFNpemUgPSB0aGlzLl9zdGFydFBvaW50LmhlaWdodCAvIDEwXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplICogOFxyXG4gICAgICAgICAgICB0aGlzLl9jb250ZW50LmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemUgKiAxMFxyXG4gICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQud2lkdGggPSB0aGlzLl9jb250ZW50LndpZHRoXHJcbiAgICAgICAgICAgIHRoaXMuX3doaXRlSGludC5oZWlnaHQgPSB0aGlzLl9jb250ZW50LmhlaWdodFxyXG4gICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQucGFyZW50ID0gdGhpcy5fY29udGVudFxyXG4gICAgICAgICAgICBncmlkRXhtLnNldEFuY2hvclBvaW50KDAsIDApXHJcbiAgICAgICAgICAgIGdyaWRFeG0ud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgIGdyaWRFeG0uaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICBncmlkRXhtLm9wYWNpdHkgPSAyMDBcclxuICAgICAgICAgICAgdGhpcy5faGludF9oYW5kLndpZHRoID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X2hhbmQuaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X2hhbmQuc2V0QW5jaG9yUG9pbnQoMCwgMClcclxuICAgICAgICAgICAgbGV0IGxpbmVDb250ZW50RXhtID0gbmV3IGNjLk5vZGUoKVxyXG4gICAgICAgICAgICBsaW5lQ29udGVudEV4bS5zZXRBbmNob3JQb2ludCgwLjUsIDApXHJcbiAgICAgICAgICAgIGxpbmVDb250ZW50RXhtLndpZHRoID0gZ3JpZEV4bS53aWR0aCAqIDhcclxuICAgICAgICAgICAgbGluZUNvbnRlbnRFeG0uaGVpZ2h0ID0gZ3JpZEV4bS5oZWlnaHRcclxuICAgICAgICAgICAgdGhpcy5faGludFVJLndpZHRoID0gbGluZUNvbnRlbnRFeG0ud2lkdGhcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gdGhpcy5fc3RhcnRQb2ludC5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgICAgIGxldCBncmlkQ29sb3JUZW1wID0gMCAgIC8vIDAg5rWF6ImyICAgMSAg5rex6ImyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA+PSAxOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lQ29udGVudCA9IGNjLmluc3RhbnRpYXRlKGxpbmVDb250ZW50RXhtKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQubmFtZSA9IGkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQueCA9IDBcclxuICAgICAgICAgICAgICAgIGxpbmVDb250ZW50LnkgPSBzdGFydFBvc2l0aW9uLnlcclxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24ueSArPSBsaW5lQ29udGVudC5oZWlnaHRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkQ2hpbGQobGluZUNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zRGF0YSA9IFRvb2xzLmdldE5vZGVGb3VyUG9pbnQobGluZUNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBsaW5lQ29udGVudC5zZXRBbmNob3JQb2ludCgwLCAwKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQucG9zaXRpb24gPSBjYy52Myhwb3NEYXRhLmxlZnRfZG93bilcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oaW50VUkueCAhPSBsaW5lQ29udGVudC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludFVJLnggPSBsaW5lQ29udGVudC54XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTm9kZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLl9oaW50VUksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVQb3M6IFstMV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZsYWdYID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50RGF0YS5saW5lUG9zW2ldID0gZmxhZ1hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1ggKz0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmbGFnWCA9IDBcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lUG9zQXJyOiBudW1iZXJbXSA9IFstMV0gLy/orrDlvZUgeCDovbRcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gY2MuaW5zdGFudGlhdGUoZ3JpZEV4bSlcclxuICAgICAgICAgICAgICAgICAgICBncmlkLm5hbWUgPSBqLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gZ3JpZC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT01cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZENvbG9yVGVtcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IDEgJiYgaSAhPSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ncmF5U3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2xvclRlbXAgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLndoaXRlU3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IDEgJiYgaSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLndoaXRlU3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2xvclRlbXAgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmdyYXlTcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQueSA9IDBcclxuICAgICAgICAgICAgICAgICAgICBncmlkLnggPSBmbGFnWFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVQb3NBcnIucHVzaChncmlkLngpXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ1ggKz0gZ3JpZC53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDb250ZW50LmFkZENoaWxkKGdyaWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lRGF0YXNbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tOb2RlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZUNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvczogbGluZVBvc0FyclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQueCA9IGxpbmVDb250ZW50LnhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQueSA9IGxpbmVDb250ZW50LnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkYXB0aXZlKClcclxuICAgICAgICAgICAgbGluZUNvbnRlbnRFeG0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgIGdyaWRFeG0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0UG9pbnQuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9zdGFydCgpXHJcbiAgICAgICAgICAgIHRoaXMubWFrZUJvdHRvbUJsb2NrKHRydWUpXHJcbiAgICAgICAgfSwgMClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbTogYW55KSB7XHJcbiAgICAgICAgLy90b2RvIOmAu+i+kVxyXG5cclxuICAgICAgICBTaG93Q29uZmlnLnNob3coJ2dhbWVDb25maWcnKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuZ2FtZUNvbmZpZy5iYW5uZXJTaG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLnNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLmhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG5cclxuICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZy5nYW1lQ29uZmlnLm5hdGl2ZUNvbmZpZy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRW1pdERhdGEuQ0xPU0VfTkFUSVZFKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9kbyBsb2dpYyDmlrnms5VcclxuICAgIHByaXZhdGUgZ2V0QmxvY2soc2l6ZTogbnVtYmVyLCBjb2xvcjogbnVtYmVyID0gLTEpOiBjYy5Ob2RlIHtcclxuICAgICAgICBsZXQgYmxvY2sgPSB0aGlzLmJsb2NrUG9vbC5nZXQoKVxyXG4gICAgICAgIGJsb2NrLndpZHRoID0gc2l6ZSAqIGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBibG9jay5oZWlnaHQgPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuaGFuZGxlX2Jsb2NrX3N0YXJ0LCB0aGlzKVxyXG4gICAgICAgIGJsb2NrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuaGFuZGxlX2Jsb2NrX21vdmUsIHRoaXMpXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgTG9hZE1nci5sb2FkQXRsYXMoXCJ2aWV3L2dhbWVWaWV3L2Jsb2NrL3BcIikudGhlbigocDogY2MuU3ByaXRlQXRsYXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gKChjb2xvciAqIDEwKSArIHNpemUpXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHAuZ2V0U3ByaXRlRnJhbWUoaWQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgYmxvY2suZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGJsb2NrXHJcbiAgICB9XHJcblxyXG4gICAgLy/lvZLov5jmlrnlnZdcclxuICAgIHByaXZhdGUgcmV0dXJuQmxvY2sobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmhhbmRsZV9ibG9ja19zdGFydCwgdGhpcylcclxuICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgIG5vZGUucGFyZW50ID0gbnVsbFxyXG4gICAgICAgIG5vZGUueCA9IDBcclxuICAgICAgICBub2RlLnkgPSAwXHJcbiAgICAgICAgbm9kZS53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBub2RlLmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgICAgIHRoaXMuYmxvY2tQb29sLnB1dChub2RlKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8v6aKE5Yib5bu65pyA5L2O5bGC55qE5pa55Z2XXHJcbiAgICBwcml2YXRlIHJlYWR5TWFrZUJvdHRvbUJsb2NrKCkge1xyXG4gICAgICAgIC8v5YWI6ZqP5py66ZyA6KaB56m65Ye65p2l5Yeg5LiqXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbpnIDopoHmlrDmiYvmj5DnpLpcclxuICAgICAgICBpZiAoIUNhY2hlTWdyLmlzTmVlZEhpbnQgfHwgZ2FtZUNvbmZpZy5oaW50X2RhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGJsYW5rTnVtID0gVG9vbHMuZ2V0UmFuZG9tKGdhbWVDb25maWcuYm90dG9tQmxhbmtNaW4sIGdhbWVDb25maWcuYm90dG9tQmxhbmtNYXggKyAxKVxyXG4gICAgICAgICAgICBsZXQgYmxhbmtDb2x1bW5zOiBudW1iZXIgW10gPSBbXVxyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IFRvb2xzLmdldFJhbmRvbSgxLCA5KVxyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcgPSBUb29scy5KdWRnZVZhbHVlSW5BcnIoY29sdW1uLCBibGFua0NvbHVtbnMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYW5rQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPT0gYmxhbmtDb2x1bW5zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYmxhbmtDb2x1bW5zLnB1c2goY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJsYW5rQ29sdW1ucy5sZW5ndGggPj0gYmxhbmtOdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pWw57uE5Lit6L+e57ut55qE5LiA5q61XHJcbiAgICAgICAgICAgIGxldCBhbGxDb250aW51ZUFycjogbnVtYmVyIFtdIFtdID0gW11cclxuICAgICAgICAgICAgbGV0IGNvbnRpbnVlQXJyOiBudW1iZXIgW10gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLkp1ZGdlVmFsdWVJbkFycihpLCBibGFua0NvbHVtbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRpbnVlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsQ29udGludWVBcnIucHVzaChUb29scy5kZWVwQ2xvbmUoY29udGludWVBcnIpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZUFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlQXJyLnB1c2goaSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbENvbnRpbnVlQXJyLnB1c2goVG9vbHMuZGVlcENsb25lKGNvbnRpbnVlQXJyKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFsbEJsb2NrSW5mbzogbmV4dEJsb2NrSW5mb1tdID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDb250aW51ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NJbmZvcyA9IHRoaXMuZGVmaW5pdGlvbkJsb2NrVHlwZShUb29scy5kZWVwQ2xvbmUoYWxsQ29udGludWVBcnJbaV0pKVxyXG4gICAgICAgICAgICAgICAgYmxvY0luZm9zLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQmxvY2tJbmZvLnB1c2godmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJsb2NrSW5mbyA9IGFsbEJsb2NrSW5mb1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJsb2NrSW5mbyA9IGdhbWVDb25maWcuaGludF9kYXRhWzBdXHJcbiAgICAgICAgICAgIGdhbWVDb25maWcuaGludF9kYXRhLnNoaWZ0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVIaW50KClcclxuICAgIH1cclxuXHJcbiAgICAvL+agueaNruS4gOS4quS9jee9ruaVsOe7hOWumuS5iei/meS4gOe7hOaWueWdl+exu+Wei1xyXG4gICAgcHJpdmF0ZSBkZWZpbml0aW9uQmxvY2tUeXBlKGFycjogbnVtYmVyIFtdKTogbmV4dEJsb2NrSW5mb1tdIHtcclxuICAgICAgICBsZXQgYmxvY2tJbmZvczogbmV4dEJsb2NrSW5mb1tdID0gW11cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gYXJyLmxlbmd0aFxyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnIgWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKDAsIDQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChUb29scy5jaGVja1BlcihnYW1lQ29uZmlnLmdyYWRlX29mX2RpZmZpY3VsdHlfY29uZmlnW3RoaXMuaGFyZExldmVsXS5wcm9iYWJpbGl0eV8zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5mb3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogYXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnJbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnJbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmxvY2tJbmZvc1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw5o+Q56S6XHJcbiAgICBwcml2YXRlIHVwZGF0ZUhpbnQoKSB7XHJcbiAgICAgICAgdGhpcy5faGludFVJLnJlbW92ZUFsbENoaWxkcmVuKClcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMubmV4dEJsb2NrSW5mb1tpXVxyXG4gICAgICAgICAgICBsZXQgaGludEJsb2NrID0gbmV3IGNjLk5vZGUoXCJoaW50QmxvY2tcIilcclxuICAgICAgICAgICAgaGludEJsb2NrLnNldEFuY2hvclBvaW50KDAsIDApXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGUgPSBoaW50QmxvY2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmhpbnRCbG9ja1Nwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIGhpbnRCbG9jay53aWR0aCA9IGluZm8ubnVtICogZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICBoaW50QmxvY2suaGVpZ2h0ID0gdGhpcy5faGludFVJLmhlaWdodFxyXG4gICAgICAgICAgICB0aGlzLl9oaW50VUkuYWRkQ2hpbGQoaGludEJsb2NrKVxyXG4gICAgICAgICAgICBoaW50QmxvY2sueSA9IDBcclxuICAgICAgICAgICAgaGludEJsb2NrLnggPSB0aGlzLl9oaW50RGF0YS5saW5lUG9zW2luZm8uY29sdW1uXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuacgOW6leWxgueahOS4gOWll+aWueWdl1xyXG4gICAgcHJpdmF0ZSBtYWtlQm90dG9tQmxvY2soaXNTdGFydCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5TWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMudXBBbGxMaW5lKClcclxuICAgICAgICBQcm9taXNlLmFsbChyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaWueWdl+WcqOS4i+S4gOWxglxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVEYXRhID0gdGhpcy5fbGluZURhdGFzWzEwXVxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCbG9ja0luZm8gPSB0aGlzLm5leHRCbG9ja0luZm9baV1cclxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IFRvb2xzLmdldFJhbmRvbSgxLCA2KVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gdGhpcy5nZXRCbG9jayhuZXh0QmxvY2tJbmZvLm51bSwgY29sb3IpXHJcbiAgICAgICAgICAgICAgICBibG9jay5wYXJlbnQgPSBsaW5lRGF0YS5saW5lXHJcbiAgICAgICAgICAgICAgICBibG9jay5uYW1lID0gXCJjX1wiICsgbmV4dEJsb2NrSW5mby5jb2x1bW5cclxuICAgICAgICAgICAgICAgIGJsb2NrLnggPSBsaW5lRGF0YS5saW5lUG9zW25leHRCbG9ja0luZm8uY29sdW1uXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NrSW5mbzogYmxvY2tJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGJsb2NrLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbmV4dEJsb2NrSW5mby5jb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtOiBuZXh0QmxvY2tJbmZvLm51bSxcclxuICAgICAgICAgICAgICAgICAgICBjb3ZlcjogdGhpcy5nZXRDb3ZlckNvbHVtbihuZXh0QmxvY2tJbmZvLmNvbHVtbiwgbmV4dEJsb2NrSW5mby5udW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5wdXNoKGJsb2NrSW5mbylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmVhZHlNYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICBpZiAoaXNTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKENhY2hlTWdyLmlzTmVlZEhpbnQgJiYgdGhpcy5oaW50RmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludEZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludF9wbGF5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5LiA6KGM5pa55Z2X5ZCR5LiK56e75YqoXHJcbiAgICBwcml2YXRlIHVwTGluZShsaW5lOiBudW1iZXIpOiBhbnlbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICBsZXQgbmV4dERhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZSAtIDFdXHJcbiAgICAgICAgaWYgKGRhdGEuYmxvY2tOb2RlcyAmJiBkYXRhLmJsb2NrTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZXNEYXRhID0gZGF0YS5ibG9ja05vZGVzXHJcbiAgICAgICAgICAgIGxldCBuZXh0Tm9kZXNEYXRhID0gbmV4dERhdGEuYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSBub2Rlc0RhdGFbaV1cclxuICAgICAgICAgICAgICAgIG5leHROb2Rlc0RhdGEucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgbi5ub2RlLnBhcmVudCA9IG5leHREYXRhLmxpbmVcclxuICAgICAgICAgICAgICAgIG4ubm9kZS55ID0gLWdhbWVDb25maWcuZ3JpZFNpemUgLy/lpoLmnpx5ID0gMCDnmoTor53vvIzlsLHmsqHmnInliqjnlLvlgZrkuoZcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG4ubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGdhbWVDb25maWcudXBUaW1lLCB7eTogMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuYmxvY2tOb2RlcyA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuaJgOacieaWueWdl+WQkeS4iuenu+WKqFxyXG4gICAgcHJpdmF0ZSB1cEFsbExpbmUoKTogYW55W10ge1xyXG4gICAgICAgIC8v5LuO5YCS5pWw56ys5LqM6KGM5byA5aeLICAg5L6d5qyh5b6A5LiK56e75YqoXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgciA9IHRoaXMudXBMaW5lKGkpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocltpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb3ZlckNvbHVtbihmaXJzdDogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgYXJyOiBudW1iZXJbXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0OyBpIDwgZmlyc3QgKyBudW07IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaChpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVfYmxvY2tfc3RhcnQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gZS50YXJnZXRcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQud2lkdGggPSBub2RlLndpZHRoXHJcbiAgICAgICAgbGV0IHdvcmxkID0gbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG5vZGUucG9zaXRpb24pXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5fd2hpdGVIaW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQueCA9IHBvc2l0aW9uLnhcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubW92ZVggPSBub2RlLnhcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9ibG9ja19tb3ZlKGUpIHtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGUudGFyZ2V0XHJcbiAgICAgICAgbGV0IGEgPSBlLmdldERlbHRhKClcclxuICAgICAgICBsZXQgd29ybGQgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5wb3NpdGlvbilcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLl93aGl0ZUhpbnQucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgIHRoaXMuX3doaXRlSGludC54ID0gcG9zaXRpb24ueFxyXG5cclxuICAgICAgICBsZXQgbGluZSA9IE51bWJlcihub2RlLnBhcmVudC5uYW1lKVxyXG4gICAgICAgIGxldCBjb2x1bW4gPSBOdW1iZXIobm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXSlcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0Q2FuTW92ZU1heChsaW5lLCBjb2x1bW4pXHJcbiAgICAgICAgLy8gbGV0IHBvc2l0aW9uMiA9IG5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSlcclxuICAgICAgICBsZXQgeCA9IG5vZGUueCArPSBhLng7XHJcbiAgICAgICAgaWYgKGRhdGEubWluX3ggPiB4KSB7XHJcbiAgICAgICAgICAgIHggPSBkYXRhLm1pbl94XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLm1heF94IDwgeCkge1xyXG4gICAgICAgICAgICB4ID0gZGF0YS5tYXhfeFxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLnggPSB4XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDYW5Nb3ZlTWF4KGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICBsZXQgcmlnaHRfY29sdW1uOiBudW1iZXIgPSAtMVxyXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IDBcclxuICAgICAgICBsZXQgbGVmdF9jb2x1bW46IG51bWJlciA9IGNvbHVtblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZURhdGEuYmxvY2tOb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgaWYgKGRhdGEuY29sdW1uID09IGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gZGF0YS5udW1cclxuICAgICAgICAgICAgICAgIHJpZ2h0X2NvbHVtbiA9IGRhdGEuY292ZXJbZGF0YS5jb3Zlci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXggPSAwXHJcbiAgICAgICAgbGV0IG1pbiA9IDBcclxuICAgICAgICAvL+Wvu+aJvuW3puWPs+S4pOi+ueacgOWkp+iDveWkn+enu+WKqOeahOi3neemu1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHJpZ2h0X2NvbHVtbisrXHJcbiAgICAgICAgICAgIGlmIChyaWdodF9jb2x1bW4gPiA4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSByaWdodF9jb2x1bW4gLSAxXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gdHJ1ZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVEYXRhLmJsb2NrTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbGluZURhdGEuYmxvY2tOb2Rlc1tpXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmNvdmVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY292ZXJbal0gPT0gcmlnaHRfY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IHJpZ2h0X2NvbHVtbiAtIDFcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSByaWdodF9jb2x1bW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZWZ0X2NvbHVtbi0tXHJcbiAgICAgICAgICAgIGlmIChsZWZ0X2NvbHVtbiA8IDEpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uICsgMVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lRGF0YS5ibG9ja05vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5jb3Zlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvdmVyW2pdID09IGxlZnRfY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uICsgMVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pbl94ID0gbGluZURhdGEubGluZVBvc1ttaW5dXHJcbiAgICAgICAgbGV0IG1heF94ID0gbGluZURhdGEubGluZVBvc1ttYXggLSBudW0gKyAxXVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5feDogbWluX3gsXHJcbiAgICAgICAgICAgIG1heF94OiBtYXhfeFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9ibG9ja19lbmQoZSkge1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gZS50YXJnZXRcclxuICAgICAgICBsZXQgbGluZSA9IE51bWJlcihub2RlLnBhcmVudC5uYW1lKVxyXG4gICAgICAgIGxldCBjb2x1bW4gPSBOdW1iZXIobm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXSlcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICB0aGlzLmNvbnRpbnVlWGlhbyA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSBsaW5lRGF0YS5saW5lLmdldENoaWxkQnlOYW1lKGkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gY2MudjIoZ3JpZC54ICsgZ3JpZC53aWR0aCAvIDIsIGdyaWQueSArIGdyaWQuaGVpZ2h0IC8gMilcclxuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0Qm91bmRpbmdCb3goKS5jb250YWlucyhwb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueCA9IGxpbmVEYXRhLmxpbmVQb3NbaV1cclxuICAgICAgICAgICAgICAgIG5vZGUubmFtZSA9IFwiY19cIiArIGlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZURhdGEuYmxvY2tOb2Rlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiSW5mbyA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbal1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYkluZm8uY29sdW1uID09IGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiSW5mby5jb2x1bW4gPSBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJJbmZvLmNvdmVyID0gdGhpcy5nZXRDb3ZlckNvbHVtbihpLCBiSW5mby5udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS54ID09IHRoaXMubW92ZVgpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IC0xXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01nci5wbGF5KFwibW92ZV9lbmRcIikudGhlbigpXHJcbiAgICAgICAgVG9vbHMudmlicmF0ZVNob3J0KClcclxuICAgICAgICB0aGlzLnRvdWNoRW5kRmxhZyA9IHRydWVcclxuICAgICAgICB0aGlzLmRvd25BbGxMaW5lKGxpbmUpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIbkuIDooYzmlrnlnZflkJHkuIvnp7vliqhcclxuICAgIHByaXZhdGUgZG93bkxpbmUobGluZTogbnVtYmVyKTogYW55W10ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fbGluZURhdGFzW2xpbmVdXHJcbiAgICAgICAgbGV0IG5lZWRDaGFuZ2U6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmJsb2NrTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/lvqrnjq/pnIDopoHkuIvmi4nooYznmoQg5omA5pyJ5pa55Z2XXHJcbiAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSBkYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgLy/liKTmlq3mr4/kuIDkuKrmlrnlnZfmnIDlpJrlj6/ku6XkuIvpmY3liLDlk6rkuIDooYxcclxuICAgICAgICAgICAgbGV0IHRvTGluZSA9IC0xXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsaW5lICsgMTsgaiA8PSAxMDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0RGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tqXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBuZXh0RGF0YS5ibG9ja05vZGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdmVyID0gbmV4dERhdGEuYmxvY2tOb2Rlc1trXS5jb3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUb29scy5qdWRnZUFycmF5U2FtZShibG9ja0luZm8uY292ZXIsIGNvdmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvTGluZSA9IGpcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvTGluZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbmVlZENoYW5nZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG9MaW5lLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuID0gYmxvY2tJbmZvLm5vZGVcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5kb3duVGltZSAqIDAuNiwge3k6IC1nYW1lQ29uZmlnLmdyaWRTaXplICogKHRvTGluZSAtIGxpbmUpfSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcuZG93blRpbWUgKiAwLjIsIHt5OiAxMH0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5kb3duVGltZSAqIDAuMiwge3k6IC0xMH0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLnBhcmVudCA9IHRoaXMuX2xpbmVEYXRhc1t0b0xpbmVdLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4ueSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSBuZWVkQ2hhbmdlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjZGF0YSA9IG5lZWRDaGFuZ2VbaV1cclxuICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2NkYXRhLnRvXS5ibG9ja05vZGVzLnB1c2goZGF0YS5ibG9ja05vZGVzW2NkYXRhLmluZGV4XSlcclxuICAgICAgICAgICAgZGF0YS5ibG9ja05vZGVzLnNwbGljZShjZGF0YS5pbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5omA5pyJ5pa55Z2X5ZCR5LiL56e75YqoXHJcbiAgICBwcml2YXRlIGRvd25BbGxMaW5lKGxpbmU6IG51bWJlcikge1xyXG4gICAgICAgIC8v5LuO5YCS5pWw56ys5LqM6KGM5byA5aeLICAg5L6d5qyh5b6A5LiK56e75YqoXHJcbiAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGxpbmU7IGkgPj0gMTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5kb3duTGluZShpKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcImRvd25cIikudGhlbigpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdWRnZUFsbENhbkNsZWFyKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qdWRnZUFsbENhbkNsZWFyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGp1ZGdlTGluZUNhbkNsZWFyKGxpbmUpOiBhbnkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsXHJcbiAgICAgICAgbGV0IGJsb2NrRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tsaW5lXS5ibG9ja05vZGVzXHJcbiAgICAgICAgLy/ojrflj5bov5nkuKrkuIDooYzmiYDmnInopobnm5ZcclxuICAgICAgICBsZXQgYWxsQ292ZXIgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJsb2NrRGF0YVtpXS5jb3Zlci5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxsQ292ZXIucHVzaCh2YWx1ZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFsbENvdmVyLmxlbmd0aCA+PSA4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuX2xpbmVEYXRhc1tsaW5lXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAyLCB7eDogMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IDIuNX0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLmJ5KGdhbWVDb25maWcubGluZVNoYWtlIC8gMzAsIHt4OiA1fSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IC01fSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IDIuNSwgeDogLTIuNX0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAucmVwZWF0KDYpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZV9kYXRhID0gdGhpcy5fbGluZURhdGFzW2xpbmVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVybkJsb2NrKGJsb2NrRGF0YVtpXS5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZV9kYXRhLmJsb2NrTm9kZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5omA5pyJ6KGM5piv5ZCm5a2Y5Zyo5Y+v5Lul5raI6Zmk55qE6KGMXHJcbiAgICBwcml2YXRlIGp1ZGdlQWxsQ2FuQ2xlYXIoKTogYW55W10ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueVtdID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5qdWRnZUxpbmVDYW5DbGVhcihpKVxyXG4gICAgICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcInhpYW9jaHVcIilcclxuICAgICAgICAgICAgVG9vbHMudmlicmF0ZVNob3J0KFwiaGVhdnlcIilcclxuICAgICAgICAgICAgdGhpcy5jb250aW51ZVhpYW8gKz0gcmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICB0aGlzLmFsbENvbnRpbnVlWGlhbyArPSByZXN1bHQubGVuZ3RoXHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9kZWZlbihyZXN1bHQubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aGlzLnRleHRfYWRkSGFyZCgpXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duQWxsTGluZSgxMClcclxuICAgICAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FjaGVNZ3IuaXNOZWVkSGludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludF9oaW50KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+ayoeaciemcgOimgea2iOmZpOeahO+8jOmcgOimgeWIpOaWreS4gOS4i+aYr+S4jeaYr+i+k+S6hiDvvIwg5Y2z56ysMeWxguaYr+S4jeaYr+acieS4nOilv1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGluZURhdGFzWzFdLmJsb2NrTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvIOi+k+S6hlxyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsX3dpbigpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9saW5lRGF0YXNbOV0uYmxvY2tOb2Rlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEVuZEZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hFbmRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoRW5kRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VCb3R0b21CbG9jaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v6YCC6YWN6L655qGGXHJcbiAgICBwcml2YXRlIGFkYXB0aXZlKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl9jb250ZW50X2NvdmVyLmdldENoaWxkQnlOYW1lKFwidG9wXCIpXHJcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl9jb250ZW50X2NvdmVyLmdldENoaWxkQnlOYW1lKFwibGVmdF93YWxsXCIpXHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5fY29udGVudF9jb3Zlci5nZXRDaGlsZEJ5TmFtZShcInJpZ2h0X3dhbGxcIilcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5fY29udGVudF9jb3Zlci5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLl9saW5lRGF0YXNbMV0ubGluZS5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgdGVtcC55ICs9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBsZXQgbGVmdF90b3AgPSB0aGlzLl9jb250ZW50X2NvdmVyLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuX2NvbnRlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRlbXApKVxyXG5cclxuICAgICAgICB0ZW1wID0gVG9vbHMuZ2V0Tm9kZUZvdXJQb2ludCh0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUpLnJpZ2h0X2Rvd25cclxuICAgICAgICBsZXQgcmlnaHRfYm90dG9tID0gdGhpcy5fY29udGVudF9jb3Zlci5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLl9jb250ZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0ZW1wKSlcclxuXHJcbiAgICAgICAgdG9wLnkgPSBsZWZ0X3RvcC55XHJcbiAgICAgICAgdG9wLndpZHRoID0gdGhpcy5fY29udGVudC53aWR0aCArIDIwXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic2NvcmVEYXRhXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiaGFyZExldmVsXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXHJcbiAgICAgICAgYm90dG9tLnkgPSByaWdodF9ib3R0b20ueVxyXG4gICAgICAgIGJvdHRvbS53aWR0aCA9IHRoaXMuX2NvbnRlbnQud2lkdGggKyAyMFxyXG4gICAgICAgIGxlZnQuaGVpZ2h0ID0gdGhpcy5fY29udGVudC5oZWlnaHQgKyAyMFxyXG4gICAgICAgIGxlZnQueCA9IGxlZnRfdG9wLnhcclxuICAgICAgICBsZWZ0LnkgPSBsZWZ0X3RvcC55IC0gdGhpcy5fY29udGVudC5oZWlnaHQgLyAyXHJcblxyXG4gICAgICAgIHJpZ2h0LmhlaWdodCA9IHRoaXMuX2NvbnRlbnQuaGVpZ2h0ICsgMjBcclxuICAgICAgICByaWdodC54ID0gcmlnaHRfYm90dG9tLnhcclxuICAgICAgICByaWdodC55ID0gbGVmdF90b3AueSAtIHRoaXMuX2NvbnRlbnQuaGVpZ2h0IC8gMlxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9zY29yZUxhYmVsLnN0cmluZyA9IFwi5b2T5YmN5b6X5YiGOlwiICsgdGhpcy5zY29yZVxyXG4gICAgICAgIHRoaXMuX2hhcmRMZXZlbExhYmVsLnN0cmluZyA9IFwi5b2T5YmN6Zq+5bqmOlwiICsgdGhpcy5oYXJkTGV2ZWwudG9TdHJpbmcoKVxyXG5cclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lcl9pY29uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lcl9zcHJpdGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWknyDnmoQxIFwiKVxyXG4gICAgICAgICAgICB0aGlzLl9oYW1tZXJfc3ByaXRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0udG9TdHJpbmcoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LiN5aSfMSBcIilcclxuICAgICAgICAgICAgdGhpcy5faGFtbWVyX3Nwcml0ZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9oYW1tZXJfaWNvbi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi54uX55qEMiBcIilcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0udG9TdHJpbmcoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LiN5aSfMiBcIilcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZV9pY29uLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu05paw57K+54G16IqC54K5XHJcbiAgICB1cGRhdGVTcHJpdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVfY29sb3IgPSBUb29scy5nZXRSYW5kb20oMSwgNilcclxuICAgICAgICB0aGlzLl9zcHJpdGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcHJpdGVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9zcHJpdGVGcmFtZVt0aGlzLnNwcml0ZV9jb2xvcl1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZhaWxfd2luKCkge1xyXG4gICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJmYWlsXCIpXHJcbiAgICAgICAgVG9vbHMudmlicmF0ZUxvbmcoKVxyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5lRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tpXVxyXG4gICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHZhbHVlLm5vZGVcclxuICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX21vdXRoLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5fbW91dGgucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICAgICAgICAgIC8vIG5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LDAuNSlcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5ibG9ja0ZseVRpbWUsIGNjLnYyKFRvb2xzLmdldFJhbmRvbSgwLCA1MDApLCBUb29scy5nZXRSYW5kb20oMCwgNTAwKSksIGNjLnYyKFRvb2xzLmdldFJhbmRvbSgwLCA1MDApLCBUb29scy5nZXRSYW5kb20oMCwgNTAwKSksIGNjLnYyKHBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKTtcclxuICAgICAgICAgICAgICAgIHRpbWUgKz0gZ2FtZUNvbmZpZy5ibG9ja0ZseVRpbWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNOZXdNYXggPSBmYWxzZTtcclxuICAgICAgICBDYWNoZU1nci5nb2xkID0gQ2FjaGVNZ3IuZ29sZCArIHRoaXMuc2NvcmU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPiBDYWNoZU1nci5jaGVja3BvaW50KSB7XHJcbiAgICAgICAgICAgIENhY2hlTWdyLmNoZWNrcG9pbnQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgICAgICBpc05ld01heCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb21pc2UuYWxsKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgcGFuZWwgOiBFbmRWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIgOiBMYXllci5nYW1lTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBwYXJhbSA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSA6IHRoaXMuc2NvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNOZXdNYXggOiBpc05ld01heFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEdhbWVWaWV3KSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXh0X2RlZmVuKG46IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW0gPSB0aGlzLmhhcmRMZXZlbCAqIG4gKiB0aGlzLmNvbnRpbnVlWGlhb1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gbnVtXHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ2V0X3ByZWZhYilcclxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbnVtLnRvU3RyaW5nKClcclxuICAgICAgICB0aGlzLl90ZXh0SGludC5hZGRDaGlsZChub2RlKVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRpbnVlWGlhbyA+IDEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubmljZV9wcmVmYWIpXHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmNvbnRpbnVlWGlhby50b1N0cmluZygpXHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRIaW50LmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGV4dF9zdGFydCgpIHtcclxuICAgICAgICBBdWRpb01nci5wbGF5KFwic3RhcnRcIilcclxuICAgICAgICBsZXQgdGV4dF9wcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJ0X3ByZWZhYilcclxuICAgICAgICAvLyB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5ri45oiP5byA5aeLXCJcclxuICAgICAgICB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoVGV4dCkuZGVsYXkgPSA1XHJcbiAgICAgICAgLy8gdGhpcy5fdGV4dEhpbnQuYWRkQ2hpbGQodGV4dF9wcmVmYWIpXHJcbiAgICAgICAgLy8gdGV4dF9wcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRleHRfcHJlZmFiKVxyXG4gICAgICAgIC8vIHRleHRfcHJlZmFiLmdldENvbXBvbmVudChUZXh0KS5kZWxheSA9IDVcclxuICAgICAgICAvLyB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5ouW5Yqo5pa55Z2X77yM5raI6Zmk5pW06KGMLlwiXHJcbiAgICAgICAgdGhpcy5fdGV4dEhpbnQuYWRkQ2hpbGQodGV4dF9wcmVmYWIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXh0X2FkZEhhcmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFyZExldmVsID49IGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsQ29udGludWVYaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFyZExldmVsKytcclxuICAgICAgICAgICAgdGhpcy5hbGxDb250aW51ZVhpYW8gPSAyXHJcbiAgICAgICAgICAgIGxldCB0ZXh0X3ByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFyZFVwX3ByZWZhYilcclxuICAgICAgICAgICAgLy8gdGV4dF9wcmVmYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumavuW6puaPkOWNh++8jOW+l+WIhlhcIiArIHRoaXMuaGFyZExldmVsXHJcbiAgICAgICAgICAgIHRleHRfcHJlZmFiLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5oYXJkTGV2ZWwudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoVGV4dCkuZGVsYXkgPSA1XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRIaW50LmFkZENoaWxkKHRleHRfcHJlZmFiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9oYW1tZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hpbnRfaGFtbWVyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLmhhbW1lck51bSA8PSAwKSB7XHJcbiAgICAgICAgICAgIFRvb2xzLmhhbmRsZVZpZGVvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyoM+S4queahOaWueWdl1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCZUNodWk6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2ldLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm51bSA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhQmVDaHVpLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB2YWx1ZS5jb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFCZUNodWkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9vbHMuY2hhbmdlR29sZChnYW1lQ29uZmlnLnByaWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludF9oYW1tZXIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LCBnYW1lQ29uZmlnLmhpZGVfaGludF9zcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0rK1xyXG4gICAgICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBsZXQgcHNzID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBuZWVkRGVsZXRlOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyW10+KClcclxuICAgICAgICAgICAgICAgIGRhdGFCZUNodWkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1t2YWx1ZS5saW5lXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlMiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZTIuY29sdW1uID09IHZhbHVlLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRCbG9jayA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZEJsb2NrLmNvdmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFtbWVyX3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IG9sZEJsb2NrLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihvbGRCbG9jay5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGVudC5hZGRDaGlsZChoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5wb3NpdGlvbiA9IGgucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC54ICs9IG9sZEJsb2NrLm5vZGUud2lkdGggLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLnkgKz0gb2xkQmxvY2subm9kZS5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC41KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5oYW1tZXJSb3RhdGlvbiwge2FuZ2xlOiAzMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG9sZEJsb2NrLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcubGluZVNoYWtlIC8gMiwge3g6IC0xNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRCbG9jaygxLCBvbGRCbG9jay5jb2xvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS55ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnggPSBsaW5lRGF0YS5saW5lUG9zW29sZEJsb2NrLmNvdmVyW2ldXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSBcImNfXCIgKyBvbGRCbG9jay5jb3ZlcltpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5saW5lLmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhLmJsb2NrTm9kZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBvbGRCbG9jay5jb3ZlcltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyOiBbb2xkQmxvY2suY292ZXJbaV1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9sZEJsb2NrLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2gocClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVybkJsb2NrKG9sZEJsb2NrLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkRGVsZXRlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxpbmU6IHZhbHVlLmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWR4OiBpZHhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxldGUuaGFzKHZhbHVlLmxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZERlbGV0ZS5zZXQodmFsdWUubGluZSwgW10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkRGVsZXRlLmdldCh2YWx1ZS5saW5lKS5wdXNoKGlkeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmVEYXRhLmJsb2NrTm9kZXMuc3BsaWNlKGlkeCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHBzcy5wdXNoKHBwKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJrbm9ja1wiKVxyXG4gICAgICAgICAgICAgICAgfSwgMC41KVxyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocHNzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZERlbGV0ZS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9saW5lRGF0YXNba2V5XS5ibG9ja05vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyoM+S4queahOaWueWdl1xyXG4gICAgICAgICAgICBsZXQgZGF0YUJlQ2h1aTogYW55IFtdID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2ldLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubnVtID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJlQ2h1aS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHZhbHVlLmNvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGFCZUNodWkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfaGFtbWVyLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIC8vIFRvb2xzLmNoYW5nZUdvbGQoZ2FtZUNvbmZpZy5wcmljZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgZ2FtZUNvbmZpZy5oaWRlX2hpbnRfc3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcuaGFtbWVyTnVtLS1cclxuICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBwc3MgPSBbXVxyXG4gICAgICAgICAgICBsZXQgbmVlZERlbGV0ZTogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcltdPigpXHJcbiAgICAgICAgICAgIGRhdGFCZUNodWkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbdmFsdWUubGluZV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUyLmNvbHVtbiA9PSB2YWx1ZS5jb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbGRCbG9jayA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRCbG9jay5jb3Zlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFtbWVyX3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC5oZWlnaHQgPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IG9sZEJsb2NrLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihvbGRCbG9jay5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50LmFkZENoaWxkKGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGgucG9zaXRpb24gPSBoLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC54ICs9IG9sZEJsb2NrLm5vZGUud2lkdGggLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGgueSArPSBvbGRCbG9jay5ub2RlLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSgwLjUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGdhbWVDb25maWcuaGFtbWVyUm90YXRpb24sIHthbmdsZTogMzB9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4ob2xkQmxvY2subm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0QmxvY2soMSwgb2xkQmxvY2suY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS55ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUueCA9IGxpbmVEYXRhLmxpbmVQb3Nbb2xkQmxvY2suY292ZXJbaV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5uYW1lID0gXCJjX1wiICsgb2xkQmxvY2suY292ZXJbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5saW5lLmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBvbGRCbG9jay5jb3ZlcltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3ZlcjogW29sZEJsb2NrLmNvdmVyW2ldXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9sZEJsb2NrLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHBzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5CbG9jayhvbGRCbG9jay5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkRGVsZXRlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGluZTogdmFsdWUubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlkeDogaWR4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVlZERlbGV0ZS5oYXModmFsdWUubGluZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxldGUuc2V0KHZhbHVlLmxpbmUsIFtdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxldGUuZ2V0KHZhbHVlLmxpbmUpLnB1c2goaWR4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lRGF0YS5ibG9ja05vZGVzLnNwbGljZShpZHgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHBzcy5wdXNoKHBwKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJrbm9ja1wiKVxyXG4gICAgICAgICAgICB9LCAwLjUpXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHBzcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBuZWVkRGVsZXRlLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fbGluZURhdGFzW2tleV0uYmxvY2tOb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2tleV0uYmxvY2tOb2Rlcy5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVfc3ByaXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9oaW50X3Nwcml0ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENhY2hlTWdyLnNldHRpbmcuc3ByaXRlTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgVG9vbHMuaGFuZGxlVmlkZW8oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWREZWxEYXRhOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyW10+KClcclxuICAgICAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAvL+mBjeWOhuminOiJslxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5mby5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNvbG9yID09IHRoaXMuc3ByaXRlX2NvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxEYXRhLmhhcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLnNldChpLCBbXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLmdldChpKS5wdXNoKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ZV9ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zcHJpdGVfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUuc2NhbGUgPSBnYW1lQ29uZmlnLmdyaWRTaXplIC8gc3ByaXRlX25vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZV9ub2RlLnBvc2l0aW9uID0gc3ByaXRlX25vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuX3Nwcml0ZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuX3Nwcml0ZS5wb3NpdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX3Nwcml0ZUZyYW1lW3RoaXMuc3ByaXRlX2NvbG9yXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmxkID0gdmFsdWUubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHZhbHVlLm5vZGUucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gc3ByaXRlX25vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKz0gdmFsdWUubm9kZS53aWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICs9IHZhbHVlLm5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNwcml0ZV9ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5zcHJpdGVfbW92ZSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIocG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAyMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcuc3ByaXRlX2p1bXAgLyAyLCB7eTogLTIwfSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odmFsdWUubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5ub2RlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWREZWxEYXRhLnNpemUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfc3ByaXRlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBUb29scy5jaGFuZ2VHb2xkKGdhbWVDb25maWcucHJpY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X3Nwcml0ZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGdhbWVDb25maWcuaGlkZV9oaW50X3Nwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSsrXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOS4iuS4gOasoeaPkOekuuacuuS8mlwiLCBDYWNoZU1nci5zZXR0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQXVkaW9NZ3IucGxheShcInNwcml0ZV9tb3ZlXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHBzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBdWRpb01nci5wbGF5KFwic3ByaXRlX3hpYW9jaHVcIilcclxuICAgICAgICAgICAgICAgICAgICBuZWVkRGVsRGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9saW5lRGF0YXNba2V5XS5ibG9ja05vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3ByaXRlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuZWVkRGVsRGF0YTogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcltdPigpXHJcbiAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgIC8v6YGN5Y6G6aKc6ImyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICAgICAgYmxvY2tJbmZvLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5jb2xvciA9PSB0aGlzLnNwcml0ZV9jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxEYXRhLmhhcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZERlbERhdGEuc2V0KGksIFtdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLmdldChpKS5wdXNoKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ByaXRlX25vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNwcml0ZV9wcmVmYWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZV9ub2RlLnNjYWxlID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIHNwcml0ZV9ub2RlLndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUucG9zaXRpb24gPSBzcHJpdGVfbm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5fc3ByaXRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5fc3ByaXRlLnBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9zcHJpdGVGcmFtZVt0aGlzLnNwcml0ZV9jb2xvcl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd29ybGQgPSB2YWx1ZS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodmFsdWUubm9kZS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHNwcml0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKz0gdmFsdWUubm9kZS53aWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKz0gdmFsdWUubm9kZS5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5zcHJpdGVfbW92ZSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIocG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oc3ByaXRlX25vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAyMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAtMjB9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih2YWx1ZS5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAyLCB7eDogLTE1fSwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5lZWREZWxEYXRhLnNpemUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGludF9zcHJpdGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gVG9vbHMuY2hhbmdlR29sZChnYW1lQ29uZmlnLnByaWNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfc3ByaXRlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCBnYW1lQ29uZmlnLmhpZGVfaGludF9zcHJpdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bS0tXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgIC8vIEF1ZGlvTWdyLnBsYXkoXCJzcHJpdGVfbW92ZVwiKVxyXG4gICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcInNwcml0ZV94aWFvY2h1XCIpXHJcbiAgICAgICAgICAgICAgICBuZWVkRGVsRGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFRvb2xzLkp1ZGdlVmFsdWVJbkFycihpLCB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9tZW51KCkge1xyXG4gICAgICAgIC8vIHRoaXMuX21lbnVQYW5lbC5hY3RpdmUgPSAhdGhpcy5fbWVudVBhbmVsLmFjdGl2ZVxyXG4gICAgICAgIGlmICh0aGlzLl9tZW51UGFuZWwueSA+IHRoaXMuX21lbnUueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWVudVBhbmVsLnkgIT0gdGhpcy5fbWVudS55ICsgdGhpcy5fbWVudS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR3ZWVuKHRoaXMuX21lbnVQYW5lbClcclxuICAgICAgICAgICAgICAgIC50byhnYW1lQ29uZmlnLm1lbnVfYm94X21vdmUsIHt5OiB0aGlzLl9tZW51Lnl9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lbnVQYW5lbC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tZW51UGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0d2Vlbih0aGlzLl9tZW51UGFuZWwpXHJcbiAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5tZW51X2JveF9tb3ZlLCB7eTogdGhpcy5fbWVudS55ICsgdGhpcy5fbWVudS5oZWlnaHR9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIHByaXZhdGUgaGFuZGxlX3Jlc3RhcnQoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbaV1cclxuICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5CbG9jayh2YWx1ZS5ub2RlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250aW51ZVhpYW8gPSAwXHJcbiAgICAgICAgdGhpcy5hbGxDb250aW51ZVhpYW8gPSAwXHJcbiAgICAgICAgdGhpcy5oYXJkTGV2ZWwgPSAxXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDBcclxuICAgICAgICB0aGlzLm1ha2VCb3R0b21CbG9jayh0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+U5Zue6aaW6aG1XHJcbiAgICBwcml2YXRlIGhhbmRsZV9yZXR1cm4oKSB7XHJcbiAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgIHBhbmVsIDogSG9tZVZpZXcsXHJcbiAgICAgICAgICAgIGxheWVyIDogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICBjYWxsIDogKCk9PntcclxuICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEdhbWVWaWV3KSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVfaGludE1hc2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hpbnRfbWFzaykge1xyXG4gICAgICAgICAgICB0aGlzLl9oaW50X21hc2suY2hpbGRyZW5bMF0ueCA9IC10aGlzLl9oaW50X21hc2sucG9zaXRpb24ueFxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X21hc2suY2hpbGRyZW5bMF0ueSA9IC10aGlzLl9oaW50X21hc2sucG9zaXRpb24ueVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaW50X3BsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5faGludF9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sud2lkdGggPSB0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUud2lkdGhcclxuICAgICAgICB0aGlzLl9oaW50X21hc2suaGVpZ2h0ID0gdGhpcy5fbGluZURhdGFzWzEwXS5saW5lLmhlaWdodCAqIDJcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sucG9zaXRpb24gPSB0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUucG9zaXRpb25cclxuICAgICAgICBmb3IgKGxldCBpID0gOTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdmFsdWUubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmhhbmRsZV9ibG9ja19zdGFydCwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1tpXS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNvbHVtbiAhPSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdmFsdWUubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5oYW5kbGVfYmxvY2tfc3RhcnQsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuaGFuZGxlX2Jsb2NrX21vdmUsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuaGFuZGxlX2Jsb2NrX2VuZCwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaMieS9j+aWueWdl++8jOWQkeW3puaLluWKqDHmoLxcIlxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmhpbnRfMV9zcHJpdGVGcmFtZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwueSA9IHRoaXMuX2hpbnRfbWFzay55ICsgdGhpcy5faGludF9tYXNrLmhlaWdodFxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfaGFuZC53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgIGxldCBwID0gY2MudjModGhpcy5fbGluZURhdGFzWzldLmxpbmVQb3NbNl0pXHJcbiAgICAgICAgbGV0IHN0YXJ0V29ybGQgPSB0aGlzLl9saW5lRGF0YXNbOV0ubGluZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocClcclxuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydFdvcmxkKVxyXG5cclxuICAgICAgICBzdGFydFBvc2l0aW9uLnggKz0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICBzdGFydFBvc2l0aW9uLnkgLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuXHJcbiAgICAgICAgbGV0IHAyID0gY2MudjModGhpcy5fbGluZURhdGFzWzldLmxpbmVQb3NbNV0pXHJcbiAgICAgICAgbGV0IGVuZFdvcmxkID0gdGhpcy5fbGluZURhdGFzWzldLmxpbmUuY29udmVydFRvV29ybGRTcGFjZUFSKHAyKVxyXG4gICAgICAgIGxldCBlbmRQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmRXb3JsZClcclxuICAgICAgICBlbmRQb3NpdGlvbi55IC09IGdhbWVDb25maWcuZ3JpZFNpemUgLyAyXHJcbiAgICAgICAgdGhpcy5faGludF9oYW5kLnBvc2l0aW9uID0gc3RhcnRQb3NpdGlvblxyXG4gICAgICAgIHR3ZWVuKHRoaXMuX2hpbnRfaGFuZClcclxuICAgICAgICAgICAgLnRvKGdhbWVDb25maWcuaGludF9oYW5kX21vdmUsIHtwb3NpdGlvbjogZW5kUG9zaXRpb259KVxyXG4gICAgICAgICAgICAudG8oMCwge3Bvc2l0aW9uOiBzdGFydFBvc2l0aW9ufSlcclxuICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZV9oaW50TWFzaygpXHJcbiAgICB9XHJcblxyXG4gICAgaGludF9oaW50KCkge1xyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay53aWR0aCA9IHRoaXMuX2hpbnRVSS53aWR0aFxyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay5oZWlnaHQgPSB0aGlzLl9oaW50VUkuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5faGludF9tYXNrLnBvc2l0aW9uID0gdGhpcy5faGludFVJLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5faGludF9oYW5kLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIui/memHjOaYr+S4i+S4gOihjOWNs+WwhuWHuueOsOeahOaWueWdl++8iOeCueWHu+epuueZvee7p+e7re+8iVwiXHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaGludF8yX3Nwcml0ZUZyYW1lXHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC55ID0gdGhpcy5faGludF9tYXNrLnkgKyB0aGlzLl9oaW50X21hc2suaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy51cGRhdGVfaGludE1hc2soKVxyXG4gICAgICAgIHRoaXMuaGludF9yZWdpc3RlcigpXHJcblxyXG4gICAgICAgIENhY2hlTWdyLmlzTmVlZEhpbnQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdHdlZW4odGhpcy5faGludF9sYWJlbClcclxuICAgICAgICAgICAgICAgIC50bygxLCB7b3BhY2l0eTogMH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludF9sYWJlbC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSwgNClcclxuICAgIH1cclxuXHJcbiAgICBoaW50X3JlZ2lzdGVyKCkge1xyXG4gICAgICAgIHRoaXMuX2xpbmVEYXRhc1s5XS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9IHZhbHVlLm5vZGVcclxuICAgICAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuaGFuZGxlX2Jsb2NrX3N0YXJ0LCB0aGlzKVxyXG4gICAgICAgICAgICBibG9jay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgICAgICBibG9jay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuaGFuZGxlX2Jsb2NrX2VuZCwgdGhpcylcclxuICAgICAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+mHjeWGmSBnYW1lQm94U2Nyb2xsIOa7muWKqOaWueWQkVxyXG4gICAgcHJvdGVjdGVkIGdhbWVCb3hTY3JvbGxWaWV3RGlyZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwidlwiXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5pbnRlcmZhY2UgbGluZURhdGEge1xyXG4gICAgbGluZTogY2MuTm9kZVxyXG4gICAgbGluZVBvczogbnVtYmVyW11cclxuICAgIGJsb2NrTm9kZXM6IGJsb2NrSW5mb1tdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgbmV4dEJsb2NrSW5mbyB7XHJcbiAgICBudW06IG51bWJlclxyXG4gICAgY29sdW1uOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIGJsb2NrSW5mbyB7XHJcbiAgICBub2RlOiBjYy5Ob2RlLFxyXG4gICAgY29sdW1uOiBudW1iZXIsXHJcbiAgICBudW06IG51bWJlcixcclxuICAgIGNvdmVyOiBudW1iZXJbXSxcclxuICAgIGNvbG9yOiBudW1iZXJcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__node_modules/flyio/index.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}//For browser entry
var Fly= require("./dist/npm/fly")
var fly= new Fly;
module.exports = fly;

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__node_modules/flyio/dist/npm/fly.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + ('%5B' + i + '%5D'));
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve = void 0;
            var reject = void 0;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (needQuery && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (needQuery && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || needQuery)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        try {
                            // The xhr of IE9 has not response field
                            var response = engine.response || engine.responseText;
                            if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                                response = JSON.parse(response);
                            }

                            var headers = engine.responseHeaders;
                            // In browser
                            if (!headers) {
                                headers = {};
                                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                                items.pop();
                                items.forEach(function (e) {
                                    if (!e) return;
                                    var key = e.split(":")[0];
                                    headers[key] = engine.getResponseHeader(key);
                                });
                            }
                            var status = engine.status;
                            var statusText = engine.statusText;
                            var _data = { data: response, headers: headers, status: status, statusText: statusText };
                            // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                            utils.merge(_data, engine._response);
                            if (status >= 200 && status < 300 || status === 304) {
                                _data.engine = engine;
                                _data.request = options;
                                onresult(responseInterceptor.handler, _data, 0);
                            } else {
                                var e = new Err(statusText, status);
                                e.response = _data;
                                onerror(e);
                            }
                        } catch (e) {
                            onerror(new Err(e.msg, engine.status));
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(needQuery ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, JSON.parse(JSON.stringify(_this.config)));
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
["lock", "unlock", "clear"].forEach(function (e) {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    };
});
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ })
/******/ ]);
});
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
//------QC-SOURCE-SPLIT------
