import LayerPanel, {UrlInfo} from "../../Common/manage/Layer/LayerPanel";
import GameInfoView from "./GameInfoView";
import GameView from "./GameView";
import Shop from "./logic/game/shop";
import Sign from "./logic/game/sign";

import PanelMgr, {Layer} from "../../Common/manage/PanelMgr";
import ShowConfig from "../../Common/ShowConfig";
import QgBanner from "../../Common/manage/Api/QgBanner";
import Global from "../../Common/Global";
import Emit from "../../Common/manage/Emit/Emit";
import EmitData from "../../Common/manage/Emit/EmitData";
import QgApi from "../../Common/manage/Api/QgApi";

const {ccclass} = cc._decorator;
@ccclass
export default class HomeView extends LayerPanel {
    public static getUrl(): UrlInfo {
        return {
            bundle: "homeView",
            name: "homeView"
        }
    }
    private _exportData: any = null;

    //node
    private _button: cc.Node = null;
    private _setting: cc.Node = null;
    private _shopBtn: cc.Node = null ;
    private _shortBtn : cc.Node = null ;
    public initUI() {
        //todo 逻辑
        PanelMgr.INS.openPanel({
            panel: GameInfoView,
            layer: Layer.gameInfoLayer,
        })

        this._button = this.getNode("next");
        this.onTouch(this._button, () => {
            PanelMgr.INS.openPanel({
                panel : GameView,
                layer : Layer.gameLayer,
                call : ()=>{
                    PanelMgr.INS.closePanel(HomeView) ;
                    PanelMgr.INS.closePanel(Shop) ;
                    PanelMgr.INS.closePanel(Sign) ;
                }
            })
        });

        this._setting = this.getNode("setting")

        this._shopBtn = this.getNode("bottomUI/shopIcon")
        this.onTouch(this._shopBtn, () => {
            PanelMgr.INS.openPanel({
                panel : Shop,
                layer : Layer.gameLayer
            })
        })

        this._shortBtn = this.getNode('shortBtn') ;

        QgApi.judgeShortIcon().then((res : boolean)=>{
            this._shortBtn.active = res;
        })

        this.onTouch(this._shortBtn, () => {
            QgApi.addShortcutIcon().then((res)=>{
                if (res) {
                    this._shortBtn.active = false ;
                }
            })
        })
    }

    public show(param: any) {
        ShowConfig.show('homeConfig').then((res) => {
            if (Global.config.homeConfig.bannerShow == 1) {
                QgBanner.showBanner();
            } else {
                QgBanner.hideBanner();
            }
        });
    }

    public hide() {

        if (Global.config.homeConfig.nativeConfig.type == 2) {
            Emit.instance().emit(EmitData.CLOSE_NATIVE) ;
        }
    }



    //todo logic 方法
}
