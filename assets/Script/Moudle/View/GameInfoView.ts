import CacheMgr from "../../Common/manage/CacheMgr";
import LayerPanel, {UrlInfo} from "../../Common/manage/Layer/LayerPanel";
import Global from "../../Common/Global";
import ShortageView from "./ShortageView";
import PanelMgr, {Layer} from "../../Common/manage/PanelMgr";
import property = cc._decorator.property;
import Tools from "../../Common/Tools";
import tween = cc.tween;

const {ccclass} = cc._decorator;

@ccclass
export default class GameInfoView extends LayerPanel {

    public static getUrl(): UrlInfo {
        return {
            bundle: "gameInfoView",
            name: "gameInfoView"
        }
    }

    @property(cc.Prefab)
    private fly_gold: cc.Prefab = null //执行飞金币动画的图片
    @property(cc.Integer)
    private boomTime: number = 0.5 //金币爆开时长
    @property(cc.Integer)
    private flyTime: number = 1  //金币飞行时间
    @property(cc.Integer)
    private radius_min: number = 50 //最小半径
    @property(cc.Integer)
    private radius_max: number = 100 //最大半径
    @property(cc.Integer)
    private fly_gold_min: number = 4
    @property(cc.Integer)
    private fly_gold_max: number = 10
    @property(cc.Integer)
    private gold_scale_min: number = 0.9
    @property(cc.Integer)
    private gold_scale_max: number = 1.2

    private goldPool: cc.NodePool = new cc.NodePool() //

    private fly_end: cc.Vec3 = null

    private gold: cc.Node = null;
    private diamond: cc.Node = null;

    private gold_add_button: cc.Node = null;

    private animationTime: number = null;
    private gold_num: number = null;
    private diamond_num: number = 0;
    private timeouts: Map<string, number[]> = new Map<string, number[]>();

    private static gameInfoViewIns: GameInfoView = null;

    public static INS(): GameInfoView {
        return this.gameInfoViewIns;
    }

    initUI(): void {
        GameInfoView.gameInfoViewIns = this;
        this.gold_num = CacheMgr.gold;
        this.diamond_num = CacheMgr.diamond;
        this.animationTime = Global.config.gameInfo.animation;
        this.gold = this.getNode("gold/num");
        this.gold_add_button = this.getNode("gold/add");

        this.timeouts.set("gold", []);
        this.timeouts.set("diamond", []);

        let gold = this.getNode("gold")
        let gold_icon = this.getNode("gold/icon")

        this.initPool()
        this.scheduleOnce(() => {
            let wp = gold.convertToWorldSpaceAR(gold_icon.position)
            this.fly_end = this.node.convertToNodeSpaceAR(wp)
        }, 0)
    }

    show(param: any): void {
        this.gold.getComponent(cc.Label).string = this.gold_num.toString();

        this.onTouch(this.gold_add_button, () => {
            PanelMgr.INS.openPanel({
                panel: ShortageView,
                layer: Layer.gameLayer,
                param: {
                    type: "gold",
                }
            })
        });

    }

    hide() {

    }

    //初始化节点池
    private initPool() {
        if (this.fly_gold) {
            for (let i = 0; i < this.fly_gold_max; i++) {
                let gold = cc.instantiate(this.fly_gold)
                this.goldPool.put(gold)
            }
        }
    }

    /**
     * 监听金币是否改变
     * @param dt
     * @protected
     */
    protected update(dt: number) {
        let newGold = CacheMgr.gold;
        if (this.gold_num != newGold) {
            this.changeAnimation("gold", newGold - this.gold_num);
        }
    }


    /**
     * 修改金币动画
     * @param type
     * @param num
     * @private
     */
    private changeAnimation(type: string, num: number) {
        this.clearTimeOut(type);
        let num_bas = Math.abs(num);
        let time = this.animationTime / num_bas;
        let allTime = 0;   //累计耗时间
        let num_ = this[type + "_num"];
        this[type + "_num"] += num;
        for (let i = 1; i <= num_bas; i++) {
            if (num < 0) {
                let arr = this.timeouts.get(type);
                arr[i] = window.setTimeout(() => {
                    this[type].getComponent(cc.Label).string = (num_ - i).toString();
                }, allTime * 1000);
                allTime += time;
            } else {
                let arr = this.timeouts.get(type);
                arr[i] = window.setTimeout(() => {
                    this[type].getComponent(cc.Label).string = (num_ + i).toString();
                }, allTime * 1000);
                allTime += time;
            }
        }
    }

    /**
     * 清空所有动画
     * @param type
     * @private
     */
    private clearTimeOut(type: string) {
        //停止所有关于 该类型改变的值
        let timeouts = this.timeouts.get(type);
        for (let i = 0; i < timeouts.length; i++) {
            if (this.timeouts[i]) {
                window.clearTimeout(timeouts[i]);
            }
        }
        this[type].getComponent(cc.Label).string = this[type + "_num"].toString();   //直接赋值
        this.timeouts.set(type, []);
    }

    /**
     * @param point 需要飞金币的起始点（世界坐标）
     * @private
     */
    public fly_gold_animation(pointPosition: cc.Vec3) {
        pointPosition = this.node.convertToNodeSpaceAR(pointPosition)
        return new Promise((resolve, reject) => {
            let num = Tools.getRandom(this.fly_gold_min, this.fly_gold_max - 1)
            if (num > this.goldPool.size()) {
                resolve(true)
                return
            }
            let p: any [] = []
            for (let i = 0; i < num; i++) {
                let pro = new Promise((resolve, reject) => {
                    let gold = this.goldPool.get()
                    gold.position = cc.v3(pointPosition)
                    this.node.addChild(gold)
                    let scale = Tools.getRealRandom(this.gold_scale_min, this.gold_scale_max)
                    gold.scale = scale
                    //随机角度， 随机半径
                    let angle = Tools.getRandom(0, 360)
                    let r = Tools.getRandom(this.radius_min, this.radius_max + 1)
                    let boomPoint = Tools.getCirclePoint(pointPosition, r, angle)
                    tween(gold)
                        .to(this.boomTime, {position: boomPoint}, {easing: "quadOut"})
                        .to(this.flyTime, {position: this.fly_end}, {easing: "quadOut"})
                        .call(() => {
                            this.goldPool.put(gold)
                            resolve(true)
                        })
                        .start()
                })
                p.push(pro)
            }
            Promise.all(p).then(() => {
                resolve(true)
            })
        })
    }

}
