import Tools from "../Common/Tools";
import JiuWuSDK from "../SDK/JiuWuSDK";
import CacheMgr from "../Common/manage/CacheMgr";
import Global from "../Common/Global";
import Emit from "../Common/manage/Emit/Emit";
import LogMgr from "../Common/LogMgr";
import QgBanner from "../Common/manage/Api/QgBanner";
import EmitData from "../Common/manage/Emit/EmitData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Node)
    round: cc.Node = null;

    @property(cc.Node)
    mask: cc.Node = null;

    private tween = null;

    protected onLoad() {
        // @ts-ignore
        if (window.qg) {
            Global.isVivo = true;
        }
        this.mask.width = 0
        //假的进度条
        this.tween = cc.tween(this.mask)
            .to(3, {width: 300}, {easing: "quadOut"})
            .start();
        let i = 0;


        cc.director.preloadScene("Game")

        let num = Tools.model_initModel(() => {
            i++
            if (i === num) {
                this.tween.stop();
                cc.tween(this.mask)
                    .to(2, {width: 500}, {easing: 'quadOut'})
                    .call(() => {
                        if (Global.isVivo) {
                            if (JiuWuSDK.initSDK) {
                                this.loadScene();
                            } else {
                                Emit.instance().on(EmitData.LOAD_GAME_SCENE, this.loadScene, this);
                            }
                        } else {
                            cc.director.loadScene('Game');
                        }
                    })
                    .start();
            }
        });

        this.someMotor();
    }

    loadScene() {
        cc.director.loadScene('Game');
    }


    someMotor() {
        if (!Global.isVivo) {
            return
        }

        // @ts-ignore
        window.qg.onShow(() => {
            LogMgr.log('Banner刷新>>>>>>onShow', QgBanner.isShow);
            if (QgBanner.isShow) {
                QgBanner.cutBanner().then();
            }

            cc.audioEngine.resumeMusic()
        })

        // @ts-ignore
        window.qg.onHide(() => {

            CacheMgr.updateData();
            cc.audioEngine.pauseMusic()
        })

        JiuWuSDK.inSet_API_Config().then(() => {
            Emit.instance().emit(EmitData.LOAD_GAME_SCENE);
        })

    }
}
