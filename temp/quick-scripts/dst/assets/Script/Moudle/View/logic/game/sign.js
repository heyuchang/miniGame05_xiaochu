
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