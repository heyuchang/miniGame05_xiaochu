
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