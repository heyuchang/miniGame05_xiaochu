
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