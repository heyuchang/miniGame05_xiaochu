"use strict";
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