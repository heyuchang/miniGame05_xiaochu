"use strict";
cc._RF.push(module, '7f744UhRIBHxoK05CsVLTZs', 'LoadMgr');
// Script/Common/manage/LoadMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLogMgr_1 = require("./GameLogMgr");
var Texture2D = cc.Texture2D;
var GameLogMgr_2 = require("./GameLogMgr");
var LoadMgr = /** @class */ (function () {
    function LoadMgr() {
    }
    LoadMgr.loadBundle = function (bundleNames) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var functions = [];
            for (var i = 0; i < bundleNames.length; i++) {
                var name = bundleNames[i];
                if (!_this.alreadyLoadBundle.has(name)) {
                    functions.push(_this.loadBundle_Single(name));
                }
            }
            Promise.all(functions).then(function (data) {
                resolve(data);
            }, function () {
                reject(false);
            });
        });
    };
    LoadMgr.loadBundle_Single = function (name) {
        var _this = this;
        return new Promise(function (resolve1, reject1) {
            cc.assetManager.loadBundle(name, function (err, data) {
                if (err) {
                    GameLogMgr_2.default.error("加载分包失败！！！！！！！！！", err, "name :", name);
                    reject1(false);
                    return;
                }
                _this.alreadyLoadBundle.set(name, data);
                resolve1(data);
            });
        });
    };
    LoadMgr.judgeBundleLoad = function (name) {
        return this.alreadyLoadBundle.has(name);
    };
    LoadMgr.getBundle = function (bundle_name) {
        return this.alreadyLoadBundle.get(bundle_name);
    };
    //提前初始化所有分包
    LoadMgr.init_bundleMgr = function () {
        this.loadBundle_Single("homeView").then();
        this.loadBundle_Single("gameView").then();
        this.loadBundle_Single("homeView").then();
        this.loadBundle_Single("treaView").then();
        this.loadBundle_Single("oneBox").then();
    };
    /**
     * 加载图片
     * @param sprite
     * @param _url
     * @param bundle 图片所在的分包
     * @param needActive
     */
    LoadMgr.loadSprite = function (sprite, _url, bundle, needActive) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        if (needActive === void 0) { needActive = true; }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._sprite.hasOwnProperty(id)) {
                sprite.spriteFrame = _this._sprite[id];
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(_this._sprite[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteFrame, function (err, spf) {
                if (err) {
                    GameLogMgr_1.default.error(id, ' 图片加载错误 ', err);
                    reject(false);
                    return;
                }
                _this._sprite[id] = spf;
                sprite.spriteFrame = spf;
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(spf);
            });
        });
    };
    LoadMgr.loadRemoteSprite = function (_url, sprite, needActive) {
        var _this = this;
        if (sprite === void 0) { sprite = null; }
        if (needActive === void 0) { needActive = true; }
        return new Promise(function (resolve, reject) {
            if (_this._remote_Sprite.get(_url)) {
                if (sprite) {
                    sprite.spriteFrame = _this._remote_Sprite.get(_url);
                }
                if (needActive) {
                    if (sprite) {
                        sprite.node.active = true;
                    }
                }
                resolve(_this._remote_Sprite.get(_url));
            }
            else {
                cc.assetManager.loadRemote(_url, Texture2D, function (err, texture) {
                    if (texture.width == 0) {
                        var path = cc.assetManager.cacheManager.getTemp(_url);
                        cc.assetManager.loadRemote(path, function (err, sp) {
                            if (err) {
                                GameLogMgr_1.default.warn("第二次加载远程图片失败", err);
                                reject(false);
                                return;
                            }
                            _this._remote_Sprite.set(_url, new cc.SpriteFrame(sp));
                        });
                        if (sprite) {
                            sprite.spriteFrame = _this._remote_Sprite.get(_url);
                        }
                        resolve(_this._remote_Sprite.get(_url));
                    }
                    else {
                        if (err) {
                            GameLogMgr_1.default.warn("加载远程图片失败", err);
                            reject(false);
                            return;
                        }
                        _this._remote_Sprite.set(_url, new cc.SpriteFrame((texture)));
                    }
                    if (needActive) {
                        if (sprite) {
                            sprite.node.active = true;
                            sprite.spriteFrame = _this._remote_Sprite.get(_url);
                            // sprite.spriteFrame = new cc.SpriteFrame(texture)
                        }
                    }
                    resolve(_this._remote_Sprite.get(_url));
                });
            }
        });
    };
    /**
     * 加载 预制体
     * @param _url
     * @param bundle  预制体所在的分包
     */
    LoadMgr.loadPrefab = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._prefabCaches.hasOwnProperty(id)) {
                resolve(_this._prefabCaches[id]);
                return;
            }
            bundle.load("prefab/" + _url, cc.Prefab, function (err, prefab) {
                if (err) {
                    GameLogMgr_1.default.error('setPrefab error', err, id);
                    reject(false);
                    return;
                }
                _this._prefabCaches[id] = prefab;
                resolve(prefab);
            });
        });
    };
    LoadMgr.load_AudioClip = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._audio_caches.get(id)) {
                var audioClip = _this._audio_caches.get(id);
                resolve(audioClip);
            }
            else {
                bundle.load("audio/" + _url, cc.AudioClip, function (err, audio) {
                    if (err) {
                        GameLogMgr_1.default.error("加载音频失败", err, "url : ", id);
                        reject(null);
                        return;
                    }
                    _this._audio_caches.set(id, audio);
                    resolve(audio);
                });
            }
        });
    };
    /**
     * 加载 图集文件
     * @private
     */
    LoadMgr.loadAtlas = function (_url, bundle) {
        var _this = this;
        if (bundle === void 0) { bundle = this.getBundle("sub"); }
        var id = bundle.name + "/" + _url;
        return new Promise(function (resolve, reject) {
            if (_this._AtlasCaches.hasOwnProperty(id)) {
                resolve(_this._AtlasCaches[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    GameLogMgr_1.default.log('setAtlas error', err, id);
                    reject(false);
                    return;
                }
                _this._AtlasCaches[id] = atlas;
                resolve(atlas);
            });
        });
    };
    LoadMgr._sprite = {};
    LoadMgr.alreadyLoadBundle = new Map();
    LoadMgr._remote_Sprite = new Map();
    LoadMgr._prefabCaches = {};
    LoadMgr._audio_caches = new Map();
    LoadMgr._AtlasCaches = {};
    return LoadMgr;
}());
exports.default = LoadMgr;

cc._RF.pop();