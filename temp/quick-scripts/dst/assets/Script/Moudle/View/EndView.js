
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