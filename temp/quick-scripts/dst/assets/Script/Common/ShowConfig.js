
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