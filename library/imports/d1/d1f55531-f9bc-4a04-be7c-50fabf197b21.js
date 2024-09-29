"use strict";
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