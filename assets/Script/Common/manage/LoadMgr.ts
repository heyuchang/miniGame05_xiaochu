import Global from "../Global";
import GameLog from "./GameLogMgr";
import Texture2D = cc.Texture2D;
import AudioClip = cc.AudioClip;
import GameLogMgr from "./GameLogMgr";
import TestMgr from "../Test";
import Bundle = cc.AssetManager.Bundle;
import url = cc.url;

export default class LoadMgr {

    private static _sprite = {};

    private static alreadyLoadBundle: Map<string, Bundle> = new Map<string, Bundle>()

    public static loadBundle(bundleNames: string[]) {
        return new Promise((resolve, reject) => {
            let functions: any[] = []
            for (let i = 0; i < bundleNames.length; i++) {
                let name = bundleNames[i]
                if (!this.alreadyLoadBundle.has(name)) {
                    functions.push(this.loadBundle_Single(name))
                }
            }
            Promise.all(functions).then((data) => {
                resolve(data)
            }, () => {
                reject(false)
            })
        })
    }

    public static loadBundle_Single(name: string) {
        return new Promise((resolve1, reject1) => {
            cc.assetManager.loadBundle(name, (err, data) => {
                if (err) {
                    GameLogMgr.error("加载分包失败！！！！！！！！！", err, "name :", name)
                    reject1(false)
                    return
                }
                this.alreadyLoadBundle.set(name, data)
                resolve1(data)
            })
        })
    }

    public static judgeBundleLoad(name: string): boolean {
        return this.alreadyLoadBundle.has(name)
    }

    public static getBundle(bundle_name: string): Bundle {
        return this.alreadyLoadBundle.get(bundle_name)
    }

    //提前初始化所有分包
    public static init_bundleMgr() {
        this.loadBundle_Single("homeView").then()
        this.loadBundle_Single("gameView").then()
        this.loadBundle_Single("homeView").then()
        this.loadBundle_Single("treaView").then()
        this.loadBundle_Single("oneBox").then()
    }

    /**
     * 加载图片
     * @param sprite
     * @param _url
     * @param bundle 图片所在的分包
     * @param needActive
     */
    public static loadSprite(sprite: cc.Sprite, _url: string, bundle: Bundle = this.getBundle("sub"), needActive = true) {
        let id = bundle.name + "/" + _url
        return new Promise((resolve, reject) => {
            if (this._sprite.hasOwnProperty(id)) {
                sprite.spriteFrame = this._sprite[id];
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(this._sprite[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteFrame, (err: Error, spf: cc.SpriteFrame) => {
                if (err) {
                    GameLog.error(id, ' 图片加载错误 ', err);
                    reject(false);
                    return;
                }
                this._sprite[id] = spf;
                sprite.spriteFrame = spf;
                if (needActive) {
                    sprite.node.active = true;
                }
                resolve(spf);
            });
        });
    }

    private static _remote_Sprite: Map<string, cc.SpriteFrame> = new Map<string, cc.SpriteFrame>();


    public static loadRemoteSprite(_url: string, sprite: cc.Sprite = null, needActive: boolean = true) {
        return new Promise((resolve, reject) => {
            if (this._remote_Sprite.get(_url)) {
                if (sprite) {
                    sprite.spriteFrame = this._remote_Sprite.get(_url);
                }
                if (needActive) {
                    if (sprite) {
                        sprite.node.active = true;
                    }
                }
                resolve(this._remote_Sprite.get(_url))
            } else {
                cc.assetManager.loadRemote(_url, Texture2D, (err, texture: Texture2D) => {
                    if (texture.width == 0) {
                        let path = cc.assetManager.cacheManager.getTemp(_url);
                        cc.assetManager.loadRemote(path, (err, sp: cc.Texture2D) => {
                            if (err) {
                                GameLog.warn("第二次加载远程图片失败", err);
                                reject(false);
                                return;
                            }
                            this._remote_Sprite.set(_url, new cc.SpriteFrame(sp));
                        });
                        if (sprite) {
                            sprite.spriteFrame = this._remote_Sprite.get(_url);
                        }
                        resolve(this._remote_Sprite.get(_url));
                    } else {
                        if (err) {
                            GameLog.warn("加载远程图片失败", err);
                            reject(false);
                            return;
                        }
                        this._remote_Sprite.set(_url, new cc.SpriteFrame((texture)));
                    }
                    if (needActive) {
                        if (sprite) {
                            sprite.node.active = true;
                            sprite.spriteFrame = this._remote_Sprite.get(_url);
                            // sprite.spriteFrame = new cc.SpriteFrame(texture)
                        }
                    }
                    resolve(this._remote_Sprite.get(_url));
                });
            }
        });
    }

    private static _prefabCaches = {};

    /**
     * 加载 预制体
     * @param _url
     * @param bundle  预制体所在的分包
     */
    public static loadPrefab(_url: string, bundle: Bundle = this.getBundle("sub")) {
        let id = bundle.name + "/" + _url
        return new Promise((resolve, reject) => {
            if (this._prefabCaches.hasOwnProperty(id)) {
                resolve(this._prefabCaches[id]);
                return;
            }
            bundle.load("prefab/" + _url, cc.Prefab, (err: Error, prefab: cc.Prefab) => {
                if (err) {
                    GameLog.error('setPrefab error', err, id);
                    reject(false);
                    return;
                }
                this._prefabCaches[id] = prefab;
                resolve(prefab);
            });
        });
    }

    private static _audio_caches: Map<string, cc.AudioClip> = new Map<string, cc.AudioClip>();

    public static load_AudioClip(_url: string, bundle: Bundle = this.getBundle("sub")) {
        let id = bundle.name + "/" + _url
        return new Promise((resolve, reject) => {
            if (this._audio_caches.get(id)) {
                let audioClip = this._audio_caches.get(id);
                resolve(audioClip);
            } else {
                bundle.load("audio/" + _url, cc.AudioClip, (err, audio: AudioClip) => {
                    if (err) {
                        GameLog.error("加载音频失败", err, "url : ", id);
                        reject(null);
                        return;
                    }
                    this._audio_caches.set(id, audio);
                    resolve(audio);
                });
            }
        });
    }

    private static _AtlasCaches = {};

    /**
     * 加载 图集文件
     * @private
     */
    public static loadAtlas(_url: string, bundle: Bundle = this.getBundle("sub")) {
        let id = bundle.name + "/" + _url
        return new Promise((resolve, reject) => {
            if (this._AtlasCaches.hasOwnProperty(id)) {
                resolve(this._AtlasCaches[id]);
                return;
            }
            bundle.load("image/" + _url, cc.SpriteAtlas, (err: Error, atlas: cc.SpriteAtlas) => {
                if (err) {
                    GameLog.log('setAtlas error', err, id);
                    reject(false);
                    return;
                }
                this._AtlasCaches[id] = atlas;
                resolve(atlas);
            });
        });
    }
}
