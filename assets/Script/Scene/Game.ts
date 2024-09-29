import PanelMgr, {Layer, View} from "../Common/manage/PanelMgr";
import Emit from "../Common/manage/Emit/Emit";
import {EventCode} from "../Common/manage/Emit/EmitData";
import HomeView from "../Moudle/View/HomeView";
import Global from "../Common/Global";
import AudioMgr from "../Common/manage/AudioMgr";
import QgApi from "../Common/manage/Api/QgApi";
import ShowConfig from "../Common/ShowConfig";

// cc.macro.CLEANUP_IMAGE_CACHE = false;
// cc.dynamicAtlasManager.enabled = true;
const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    banner: cc.Node = null

    //Game实例
    public static Ins: Game = null;

    onLoad() {
        AudioMgr.backMusic()
        Game.Ins = this ;

        if (!PanelMgr.INS) {
            Emit.instance().on(EventCode.PanelMgrInitOK, this.do_after_panelMgr_initOK, this)
        } else {
            this.do_after_panelMgr_initOK()
        }
    }

    //PanelMgr 初始化完成之后执行的方法
    do_after_panelMgr_initOK() {
        this.banner = this.node.getChildByName('bannerLayer').children[0];

        if (Global.isVivo) {
            QgApi.createBanner() ;
            ShowConfig.initEmit() ;
        }

        PanelMgr.INS.openPanel({
            layer: Layer.gameLayer,
            panel: HomeView,
        })
    }

}
