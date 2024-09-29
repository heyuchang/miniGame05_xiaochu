
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