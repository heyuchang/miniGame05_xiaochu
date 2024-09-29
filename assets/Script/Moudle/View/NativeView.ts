import LayerPanel, {UrlInfo} from "../../Common/manage/Layer/LayerPanel";
import Texture2D = cc.Texture2D;
import QgNative from "../../Common/manage/Api/QgNative";
import Emit from "../../Common/manage/Emit/Emit";
import EmitData from "../../Common/manage/Emit/EmitData";
import QgBanner from "../../Common/manage/Api/QgBanner";
import PanelMgr from "../../Common/manage/PanelMgr";

const {ccclass, property} = cc._decorator;

const {TOUCH_START} = cc.Node.EventType ;

@ccclass
export default class NativeView extends LayerPanel {

    public static getUrl(): UrlInfo {
        return {
            bundle: "nativeView",
            name: "nativeView"
        }
    }

    @property(cc.Node)
    native_inters: cc.Node = null;

    @property(cc.Node)
    native_implant: cc.Node = null;

    private nativeMessage : any = null ;

    private currSprite : cc.Texture2D = null ;

    private adId : string = null ;

    private labelType : number = null ;

    private labelArr : string[] = ['点击查看','点击跳过'] ;

    private type : number = null ;

    initUI() {
        this.initTouch() ;
    }

    show(param: any): void {
        this.node.getChildByName('inputEvent').active = false ;
        this.node.getChildByName('inputEvent_implant').active = false ;

        this.native_inters.active = false ;
        this.native_implant.active = false ;

        this.labelType = param.labelType ;
        this.type = param.type ;

        this.scheduleOnce(()=>{
            if (QgNative.nativeMessage != null) {
                this.nativeMessage = QgNative.nativeMessage ;
                this.open_type(param.type) ;
            }else {
                QgNative.loadNative().then((res)=>{
                    if (res && res != false) {
                        this.nativeMessage = res ;
                        this.open_type(param.type) ;
                    }else {

                    }
                })
            }
        },param.time) ;

        if (this.type == 2) {
            Emit.instance().on(EmitData.CLOSE_NATIVE,this.closeNative,this) ;
        }

    }

    openNative (node : cc.Node) {
        node.getChildByName('title').getComponent(cc.Label).string = this.nativeMessage.desc ;

        let imgUrl = null ;
        if (this.nativeMessage.imgUrlList && this.nativeMessage.imgUrlList.length > 0) {
            imgUrl = this.nativeMessage.imgUrlList[0] ;
        }

        if (imgUrl != null) {
            cc.assetManager.loadRemote(imgUrl,{ext: '.png'},(err, asset : Texture2D)=>{
                if (err) {
                    console.error('原生广告图片加载错误>>>>>>',err) ;
                    return
                }

                this.currSprite = asset ;
                node.getChildByName('image').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.currSprite) ;

            })
        }

        this.adId = this.nativeMessage.adId ;
        QgNative.repAdShow(this.nativeMessage.adId) ;

    }

    open_type (type) {
        if (!this.nativeMessage)  {
            return
        }

        if (type == 1) {
            this.node.getChildByName('inputEvent').active = true ;

            this.native_inters.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1] ;

            this.native_inters.getChildByName('close').active = false ;
            this.native_inters.active = true ;
            this.scheduleOnce(()=>{
                this.native_inters.getChildByName('close').active = true ;
            },2)

            this.openNative(this.native_inters) ;
        }

        if (type == 2) {
            QgBanner.hideBanner() ;
            this.node.getChildByName('inputEvent_implant').active = true ;

            this.native_implant.getChildByName('nativeBtn').getChildByName('label').getComponent(cc.Label).string = this.labelArr[this.labelType - 1] ;

            this.native_implant.getChildByName('close').active = false ;
            this.native_implant.active = true ;
            this.scheduleOnce(()=>{
                this.native_implant.getChildByName('close').active = true ;
            },2)

            this.openNative(this.native_implant) ;
        }

    }

    initTouch () {
        this.native_inters.getChildByName('image').on(TOUCH_START,()=>{
            QgNative.repAdClick(this.adId) ;
        })

        this.native_implant.getChildByName('image').on(TOUCH_START,()=>{
            QgNative.repAdClick(this.adId) ;
        })

        this.native_inters.getChildByName('nativeBtn').on(TOUCH_START,()=>{
            this.handlerNativeBtn() ;
        })

        this.native_implant.getChildByName('nativeBtn').on(TOUCH_START,()=>{
            this.handlerNativeBtn() ;
        })

        this.native_inters.getChildByName('close').on(TOUCH_START,()=>{
            this.closeNative() ;
        })

        this.native_implant.getChildByName('close').on(TOUCH_START,()=>{
            this.closeNative() ;
        })

    }

    handlerNativeBtn () {
       if (this.labelType == 1)  {
           QgNative.repAdClick(this.adId) ;
       }else {
           this.closeNative() ;
       }
    }

    hide() {
        QgNative.anewLoad() ;
        Emit.instance().emit(EmitData.IN_NATIVE_NEXT) ;
        if (this.type == 2) {
            QgBanner.showBanner() ;
            Emit.instance().off(EmitData.CLOSE_NATIVE,this.closeNative,this) ;
        }
    }

    closeNative() {
        PanelMgr.INS.closePanel(NativeView,false) ;
    }


    // update (dt) {}
}
