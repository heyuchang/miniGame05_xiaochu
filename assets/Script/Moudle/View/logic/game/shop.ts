import LayerPanel, {UrlInfo} from "../../../../Common/manage/Layer/LayerPanel";
import Tools from "../../../../Common/Tools";
import gameConfig from "../common/config";
import CacheMgr from "../../../../Common/manage/CacheMgr";
import PanelMgr from "../../../../Common/manage/PanelMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Shop extends LayerPanel {
    private hammer_btn: cc.Node = null
    private sprite_btn: cc.Node = null
    private stamina_btn: cc.Node = null
    private close_btn: cc.Node = null

    public static getUrl(): UrlInfo {
        return {
            bundle: "game",
            name: "shop"
        }
    }

    initUI() {
        this.hammer_btn = this.getNode("content/hammer/btn")
        this.onTouch(this.hammer_btn, () => {
            Tools.changeGold(-gameConfig.price_hammer, () => {
                CacheMgr.setting.hammerNum++
                CacheMgr.setting = CacheMgr.setting
            })
        })
        this.change_price(this.hammer_btn, gameConfig.price_hammer)
        this.sprite_btn = this.getNode("content/sprite/btn")
        this.onTouch(this.sprite_btn, () => {
            Tools.changeGold(-gameConfig.price_sprite, () => {
                CacheMgr.setting.spriteNum++
                CacheMgr.setting = CacheMgr.setting
            })
        })
        this.change_price(this.sprite_btn, gameConfig.price_sprite)
        this.stamina_btn = this.getNode("content/stamina/btn")
        this.onTouch(this.stamina_btn, () => {
            Tools.changeGold(-gameConfig.price_stamina, () => {
                CacheMgr.stamina = CacheMgr.stamina + 1
            })
        })
        this.change_price(this.stamina_btn, gameConfig.price_stamina)
        this.close_btn = this.getNode("btn")
        this.onTouch(this.close_btn, () => {
            PanelMgr.INS.closePanel(Shop) ;
        })
    }

    change_price(node: cc.Node, num: number) {
        let label = node.getChildByName("num").getComponent(cc.Label)
        label.string = num.toString()
    }

    show(param: any): void {
    }

    hide() {
    }
}
