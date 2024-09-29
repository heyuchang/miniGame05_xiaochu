import LayerPanel, {UrlInfo} from "../../../../Common/manage/Layer/LayerPanel";
import Tools from "../../../../Common/Tools";
import gameConfig, {signData, signDataSeven} from "../common/config";
import CacheMgr from "../../../../Common/manage/CacheMgr";
import Constant from "../../../../Common/Constant";
import PanelMgr from "../../../../Common/manage/PanelMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sign extends LayerPanel {

    @property([cc.SpriteFrame])
    type_spriteFrame: cc.SpriteFrame[] = []


    public static getUrl(): UrlInfo {
        return {
            bundle: "game",
            name: "sign"
        }
    }
    private items: cc.Node [] = []
    private get: cc.Node = null
    private double_get: cc.Node = null
    private close: cc.Node = null

    initUI() {
        this.get = this.getNode("get")
        this.onTouch(this.get, this.handle_get)
        this.double_get = this.getNode("double")
        this.onTouch(this.double_get, this.handle_double_get)
        this.close = this.getNode("btn")
        this.onTouch(this.close, () => {
            PanelMgr.INS.closePanel(Sign) ;
        })
        let content = this.node.children[0]
        for (let i = 0; i < content.childrenCount; i++) {
            this.items.push(content.children[i])
            if (i == 6) {
                // this.changeItem7(content.children[i], gameConfig.singData7)
            } else {
                this.changeItem(content.children[i], gameConfig.signData[i])
            }
            if (i == 6) {
                this.changeSignStatus7(content.children[i])
            } else {
                this.changeSignStatus(i, content.children[i])
            }
        }
        if (CacheMgr.setting.signNum >= 6 || CacheMgr.setting.lastSignNum == Tools.date_getTimeNum(new Date)) {
            this.hideBtn()
        }
    }

    private changeItem(node: cc.Node, data: signData) {
        // let one = node.children[0]
        node.children[1].getComponent(cc.Sprite).spriteFrame = this.type_spriteFrame[data.type]
        node.children[2].getComponent(cc.Label).string = data.title
    }

    private changeSignStatus(i: number, node: cc.Node) {
        if (i == -1) {
            node.getChildByName("mask").active = true
            node.getChildByName("签到").active = true
            return
        }
        if (CacheMgr.setting.signNum >= i) {
            node.getChildByName("mask").active = true
            node.getChildByName("签到").active = true
        } else {
            node.getChildByName("mask").active = false
            node.getChildByName("签到").active = false
        }
    }


    private changeSignStatus7(node: cc.Node, isFalse: boolean = false) {
        if (isFalse) {
            node.getChildByName("签到").active = true
            node.getChildByName("mask").active = true
        }
        if (CacheMgr.setting.signNum >= 6) {
            node.getChildByName("签到").active = true
            node.getChildByName("mask").active = true
        } else {
            node.getChildByName("签到").active = false
            node.getChildByName("mask").active = false
        }
    }

    private handle_get() {
        if (CacheMgr.setting.signNum == 5) {
            gameConfig.singData7.func(1)
            CacheMgr.setting.signNum++
            this.changeSignStatus7(this.items[6], true)
        } else {
            let data = gameConfig.signData[CacheMgr.setting.signNum + 1]
            CacheMgr.setting.signNum++
            this.changeSignStatus(-1, this.items[CacheMgr.setting.signNum])
            data.func(data.num)
        }
        CacheMgr.setting.lastSignNum = Tools.date_getTimeNum(new Date())
        CacheMgr.setting = CacheMgr.setting
        this.hideBtn()
    }

    private handle_double_get() {

        Tools.handleVideo().then((res) => {
            if (res) {
                if (CacheMgr.setting.signNum == 5) {
                    gameConfig.singData7.func(2)
                    CacheMgr.setting.signNum++
                    this.changeSignStatus7(this.items[6], true)
                } else {
                    let data = gameConfig.signData[CacheMgr.setting.signNum + 1]
                    CacheMgr.setting.signNum++
                    this.changeSignStatus(-1, this.items[CacheMgr.setting.signNum])
                    data.func(data.num * 2)
                }

                CacheMgr.setting.lastSignNum = Tools.date_getTimeNum(new Date())
                CacheMgr.setting = CacheMgr.setting
                this.hideBtn()
            }
        })
    }

    private hideBtn() {
        this.get.active = false
        this.double_get.active = false
    }

    show(param: any): void {
    }

    hide() {
    }

}
