
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