import HomeView from "./HomeView";
import LayerPanel, {UrlInfo} from "../../Common/manage/Layer/LayerPanel";
import CacheMgr from "../../Common/manage/CacheMgr";
import GameView from "./GameView";
import LayerMgr from "../../Common/manage/Layer/LayerMgr";
import AudioMgr from "../../Common/manage/AudioMgr";
import PanelMgr, {Layer} from "../../Common/manage/PanelMgr";
import ShowConfig from "../../Common/ShowConfig";
import Global from "../../Common/Global";
import QgBanner from "../../Common/manage/Api/QgBanner";
import Emit from "../../Common/manage/Emit/Emit";
import EmitData from "../../Common/manage/Emit/EmitData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EndView extends LayerPanel {
    public static getUrl(): UrlInfo {
        return {
            bundle: "endView",
            name: "endView"
        }
    }

    private _paramData: any = {};

    private _button: cc.Node = null;
    @property(cc.Prefab)
    private coinPrefab: cc.Prefab = null
    coinPool: cc.NodePool = null;  //星星对象金币对象池
    getGold: cc.Node = null
    getScore: cc.Node = null
    gameBox: cc.Node = null
    maxScore: cc.Node = null
    newMax: cc.Node = null
    caiDai: cc.Node = null
    home_btn: cc.Node = null
    game_btn: cc.Node = null
    isNewMax: boolean = false
    score: number = null

    public initUI() {
        //todo logic
        this.getGold = this.getNode("topUi/huodejinbi/getGlod")
        this.gameBox = this.getNode("gameBox")
        this.getScore = this.getNode("topUi/getNum")
        this.maxScore = this.getNode("history/history_num")
        this.newMax = this.getNode("xinjilu")
        this.caiDai = this.getNode("caidai")
        this.game_btn = this.getNode("bottomUI/continue")
        this.onTouch(this.game_btn, this.handle_continue)
        this.home_btn = this.getNode("bottomUI/home")
        this.onTouch(this.home_btn, this.handle_home)
        this.coinPool = new cc.NodePool();
        this.initCoinPool();
    }

    public show(param: any) {
        //todo 逻辑
        this.isNewMax = param.isNewMax;
        this.getScore.getComponent(cc.Label).string = param.score;
        this.getGold.getComponent(cc.Label).string = "+" + param.score;
        this.score = Number(param.score);
        this.maxScore.getComponent(cc.Label).string = CacheMgr.checkpoint.toString();


        ShowConfig.show('endConfig').then((res) => {
            if (Global.config.endConfig.bannerShow == 1) {
                QgBanner.showBanner();
            } else {
                QgBanner.hideBanner();
            }
        });
    }

    public hide() {
        CacheMgr.updateData();
        if (Global.config.gameConfig.nativeConfig.type == 2) {
            Emit.instance().emit(EmitData.CLOSE_NATIVE) ;
        }
    }

    //todo logic 方法
    /** 初始化金币对象池 */
    initCoinPool(count: number = 20) {
        for (let i = 0; i < count; i++) {
            let coin = cc.instantiate(this.coinPrefab);
            this.coinPool.put(coin);
        }
    }

    /** 播放动画 */
    playAnim() {
        AudioMgr.play("get_coins")

        /** 随机金币数量 */
        let randomCount = Math.random() * 15 + 10;
        /** 起始位置 */
        let startPos = this.node.convertToNodeSpaceAR(this.getGold.parent.parent.convertToWorldSpaceAR(this.getGold.parent.position))

        /** 结束位置 */
        let endPos = LayerMgr.gameInfoLayer.children[0].children[0].position
        this.playCoinFlyAnim(randomCount, cc.v2(startPos), cc.v2(endPos));
    }

    /**
     * 播放金币飞出动画
     * @param count 金币数量
     * @param startPos 起始位置
     * @param endPos 结束位置
     * @param r 半径
     */
    playCoinFlyAnim(count: number, startPos: cc.Vec2, endPos: cc.Vec2, r: number = 200) {
        //确保当前节点池有足够的金币
        const poolSize = this.coinPool.size();
        const reCreateCoinCount = poolSize > count ? 0 : count - poolSize;
        this.initCoinPool(reCreateCoinCount);
        //生成园， 并且对圆上的点进行排序
        let points = this.getCirclePoints(r, startPos, count);
        let coinNodeList = points.map(pos => {
            let coin = this.coinPool.get();
            coin.setPosition(startPos);
            this.node.addChild(coin);
            return {
                node: coin,
                startPos: startPos,
                mdPos: pos,
                endPos: endPos,
                /** sub 用于把字符串显示为下标 */
                dis: (pos as any).sub(endPos).mag()
            };
        });
        coinNodeList = coinNodeList.sort((a, b) => {
            if (a.dis - b.dis > 0) return 1;
            if (a.dis - b.dis < 0) return -1;
            return 0;
        })

        //执行金币落袋的动画
        coinNodeList.forEach((item, index) => {
            item.node.runAction(
                cc.sequence(
                    cc.moveTo(0.3, item.mdPos),
                    cc.delayTime(index * 0.01),
                    cc.moveTo(0.5, item.endPos),
                    cc.callFunc(() => {
                        this.coinPool.put(item.node);
                    })
                )
            );
        });
    }

    /**
     *
     * @param r 半径
     * @param pos 圆心坐标
     * @param count 等分点数量
     * @param randomScope 等分点的随机播动范围
     */
    getCirclePoints(r: number, pos: cc.Vec2, count: number, randomScope: number = 60): cc.Vec2[] {
        let points = [];
        //弧度
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            points.unshift(cc.v3(x + Math.random() * randomScope, y + Math.random() * randomScope, 0));
        }
        return points;
    }


    handle_home() {
        PanelMgr.INS.openPanel({
            panel : HomeView,
            layer : Layer.gameLayer,
            call : ()=>{
                PanelMgr.INS.closePanel(EndView) ;
            }
        })
    }

    handle_continue() {
        PanelMgr.INS.openPanel({
            panel : GameView,
            layer : Layer.gameLayer,
            call : ()=>{
                PanelMgr.INS.closePanel(EndView) ;
            }
        })
    }
}
