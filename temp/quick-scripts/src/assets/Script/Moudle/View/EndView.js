"use strict";
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