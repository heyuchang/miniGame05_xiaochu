
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/LoadMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcTG9hZE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUFtQztBQUNuQyxJQUFPLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBRWhDLDJDQUFzQztBQUt0QztJQUFBO0lBb05BLENBQUM7SUE5TWlCLGtCQUFVLEdBQXhCLFVBQXlCLFdBQXFCO1FBQTlDLGlCQWVDO1FBZEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQTtZQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6QixJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtpQkFDL0M7YUFDSjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtnQkFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLENBQUMsRUFBRTtnQkFDQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDakIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFYSx5QkFBaUIsR0FBL0IsVUFBZ0MsSUFBWTtRQUE1QyxpQkFZQztRQVhHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTztZQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FB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QUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBVSxFQUFFLEtBQXFCO2dCQUMzRSxJQUFJLEdBQUcsRUFBRTtvQkFDTCxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZCxPQUFPO2lCQUNWO2dCQUNELEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqTmMsZUFBTyxHQUFHLEVBQUUsQ0FBQztJQUViLHlCQUFpQixHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtJQW9GbEUsc0JBQWMsR0FBZ0MsSUFBSSxHQUFHLEVBQTBCLENBQUM7SUFvRGhGLHFCQUFhLEdBQUcsRUFBRSxDQUFDO0lBMEJuQixxQkFBYSxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQXNCM0Usb0JBQVksR0FBRyxFQUFFLENBQUM7SUF3QnJDLGNBQUM7Q0FwTkQsQUFvTkMsSUFBQTtrQkFwTm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9HbG9iYWxcIjtcclxuaW1wb3J0IEdhbWVMb2cgZnJvbSBcIi4vR2FtZUxvZ01nclwiO1xyXG5pbXBvcnQgVGV4dHVyZTJEID0gY2MuVGV4dHVyZTJEO1xyXG5pbXBvcnQgQXVkaW9DbGlwID0gY2MuQXVkaW9DbGlwO1xyXG5pbXBvcnQgR2FtZUxvZ01nciBmcm9tIFwiLi9HYW1lTG9nTWdyXCI7XHJcbmltcG9ydCBUZXN0TWdyIGZyb20gXCIuLi9UZXN0XCI7XHJcbmltcG9ydCBCdW5kbGUgPSBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlO1xyXG5pbXBvcnQgdXJsID0gY2MudXJsO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZE1nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Nwcml0ZSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFscmVhZHlMb2FkQnVuZGxlOiBNYXA8c3RyaW5nLCBCdW5kbGU+ID0gbmV3IE1hcDxzdHJpbmcsIEJ1bmRsZT4oKVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZEJ1bmRsZShidW5kbGVOYW1lczogc3RyaW5nW10pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZnVuY3Rpb25zOiBhbnlbXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVuZGxlTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gYnVuZGxlTmFtZXNbaV1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbHJlYWR5TG9hZEJ1bmRsZS5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbnMucHVzaCh0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKGZ1bmN0aW9ucykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRCdW5kbGVfU2luZ2xlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTEsIHJlamVjdDEpID0+IHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUobmFtZSwgKGVyciwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2dNZ3IuZXJyb3IoXCLliqDovb3liIbljIXlpLHotKXvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIHvvIFcIiwgZXJyLCBcIm5hbWUgOlwiLCBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdDEoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLnNldChuYW1lLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZTEoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMganVkZ2VCdW5kbGVMb2FkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLmhhcyhuYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QnVuZGxlKGJ1bmRsZV9uYW1lOiBzdHJpbmcpOiBCdW5kbGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFscmVhZHlMb2FkQnVuZGxlLmdldChidW5kbGVfbmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvL+aPkOWJjeWIneWni+WMluaJgOacieWIhuWMhVxyXG4gICAgcHVibGljIHN0YXRpYyBpbml0X2J1bmRsZU1ncigpIHtcclxuICAgICAgICB0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKFwiaG9tZVZpZXdcIikudGhlbigpXHJcbiAgICAgICAgdGhpcy5sb2FkQnVuZGxlX1NpbmdsZShcImdhbWVWaWV3XCIpLnRoZW4oKVxyXG4gICAgICAgIHRoaXMubG9hZEJ1bmRsZV9TaW5nbGUoXCJob21lVmlld1wiKS50aGVuKClcclxuICAgICAgICB0aGlzLmxvYWRCdW5kbGVfU2luZ2xlKFwidHJlYVZpZXdcIikudGhlbigpXHJcbiAgICAgICAgdGhpcy5sb2FkQnVuZGxlX1NpbmdsZShcIm9uZUJveFwiKS50aGVuKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvueJh1xyXG4gICAgICogQHBhcmFtIHNwcml0ZVxyXG4gICAgICogQHBhcmFtIF91cmxcclxuICAgICAqIEBwYXJhbSBidW5kbGUg5Zu+54mH5omA5Zyo55qE5YiG5YyFXHJcbiAgICAgKiBAcGFyYW0gbmVlZEFjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRTcHJpdGUoc3ByaXRlOiBjYy5TcHJpdGUsIF91cmw6IHN0cmluZywgYnVuZGxlOiBCdW5kbGUgPSB0aGlzLmdldEJ1bmRsZShcInN1YlwiKSwgbmVlZEFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zcHJpdGUuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVbaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9zcHJpdGVbaWRdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidW5kbGUubG9hZChcImltYWdlL1wiICsgX3VybCwgY2MuU3ByaXRlRnJhbWUsIChlcnI6IEVycm9yLCBzcGY6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihpZCwgJyDlm77niYfliqDovb3plJnor68gJywgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVtpZF0gPSBzcGY7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcGY7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHNwZik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9yZW1vdGVfU3ByaXRlOiBNYXA8c3RyaW5nLCBjYy5TcHJpdGVGcmFtZT4gPSBuZXcgTWFwPHN0cmluZywgY2MuU3ByaXRlRnJhbWU+KCk7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFJlbW90ZVNwcml0ZShfdXJsOiBzdHJpbmcsIHNwcml0ZTogY2MuU3ByaXRlID0gbnVsbCwgbmVlZEFjdGl2ZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZWVkQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShfdXJsLCBUZXh0dXJlMkQsIChlcnIsIHRleHR1cmU6IFRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlLndpZHRoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBjYy5hc3NldE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldFRlbXAoX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHBhdGgsIChlcnIsIHNwOiBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTG9nLndhcm4oXCLnrKzkuozmrKHliqDovb3ov5znqIvlm77niYflpLHotKVcIiwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZV9TcHJpdGUuc2V0KF91cmwsIG5ldyBjYy5TcHJpdGVGcmFtZShzcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5fcmVtb3RlX1Nwcml0ZS5nZXQoX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy53YXJuKFwi5Yqg6L296L+c56iL5Zu+54mH5aSx6LSlXCIsIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZV9TcHJpdGUuc2V0KF91cmwsIG5ldyBjYy5TcHJpdGVGcmFtZSgodGV4dHVyZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuX3JlbW90ZV9TcHJpdGUuZ2V0KF91cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9yZW1vdGVfU3ByaXRlLmdldChfdXJsKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9wcmVmYWJDYWNoZXMgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vSDpooTliLbkvZNcclxuICAgICAqIEBwYXJhbSBfdXJsXHJcbiAgICAgKiBAcGFyYW0gYnVuZGxlICDpooTliLbkvZPmiYDlnKjnmoTliIbljIVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUHJlZmFiKF91cmw6IHN0cmluZywgYnVuZGxlOiBCdW5kbGUgPSB0aGlzLmdldEJ1bmRsZShcInN1YlwiKSkge1xyXG4gICAgICAgIGxldCBpZCA9IGJ1bmRsZS5uYW1lICsgXCIvXCIgKyBfdXJsXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZWZhYkNhY2hlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fcHJlZmFiQ2FjaGVzW2lkXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVuZGxlLmxvYWQoXCJwcmVmYWIvXCIgKyBfdXJsLCBjYy5QcmVmYWIsIChlcnI6IEVycm9yLCBwcmVmYWI6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVMb2cuZXJyb3IoJ3NldFByZWZhYiBlcnJvcicsIGVyciwgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlZmFiQ2FjaGVzW2lkXSA9IHByZWZhYjtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocHJlZmFiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2F1ZGlvX2NhY2hlczogTWFwPHN0cmluZywgY2MuQXVkaW9DbGlwPiA9IG5ldyBNYXA8c3RyaW5nLCBjYy5BdWRpb0NsaXA+KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkX0F1ZGlvQ2xpcChfdXJsOiBzdHJpbmcsIGJ1bmRsZTogQnVuZGxlID0gdGhpcy5nZXRCdW5kbGUoXCJzdWJcIikpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hdWRpb19jYWNoZXMuZ2V0KGlkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvQ2xpcCA9IHRoaXMuX2F1ZGlvX2NhY2hlcy5nZXQoaWQpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhdWRpb0NsaXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnVuZGxlLmxvYWQoXCJhdWRpby9cIiArIF91cmwsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgYXVkaW86IEF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUxvZy5lcnJvcihcIuWKoOi9vemfs+mikeWksei0pVwiLCBlcnIsIFwidXJsIDogXCIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1ZGlvX2NhY2hlcy5zZXQoaWQsIGF1ZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGF1ZGlvKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0F0bGFzQ2FjaGVzID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb0g5Zu+6ZuG5paH5Lu2XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRBdGxhcyhfdXJsOiBzdHJpbmcsIGJ1bmRsZTogQnVuZGxlID0gdGhpcy5nZXRCdW5kbGUoXCJzdWJcIikpIHtcclxuICAgICAgICBsZXQgaWQgPSBidW5kbGUubmFtZSArIFwiL1wiICsgX3VybFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9BdGxhc0NhY2hlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fQXRsYXNDYWNoZXNbaWRdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidW5kbGUubG9hZChcImltYWdlL1wiICsgX3VybCwgY2MuU3ByaXRlQXRsYXMsIChlcnI6IEVycm9yLCBhdGxhczogY2MuU3ByaXRlQXRsYXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTG9nLmxvZygnc2V0QXRsYXMgZXJyb3InLCBlcnIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX0F0bGFzQ2FjaGVzW2lkXSA9IGF0bGFzO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhdGxhcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==