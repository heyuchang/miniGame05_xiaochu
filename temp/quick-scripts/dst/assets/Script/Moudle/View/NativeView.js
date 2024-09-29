
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