import CacheMgr from "./CacheMgr";
import LoadMgr from "./LoadMgr";
import Emit from "./Emit/Emit";
import {EventCode} from "./Emit/EmitData";
import LayerPanel from "./Layer/LayerPanel";

const {ccclass, property} = cc._decorator;
@ccclass
export default class PanelMgr extends cc.Component {
    public static INS: PanelMgr
    @property(
        {
            type: [cc.Node],
            tooltip: "只要将Game中的场景layer按照顺序赋值即可， 如果存在修改，需要到PannerMgr.ts中修改枚举变量 Layer,也是需要按照绑定顺序"
        }
    )
    public layers: cc.Node[] = []

    //当前正在Loading 的面板
    private LoadingList: Map<string, number> = new Map<string, number>()
    //当前打开的面板数组
    private openList: Map<string, cc.Node> = new Map<string, cc.Node>()
    //当前关闭但是未摧毁的面板，存储在这里，下次打开该面板的时候，就会使用这里的面板
    private hideList: Map<string, cc.Node> = new Map<string, cc.Node>()

    onLoad() {
        PanelMgr.INS = this
        console.log('PanelMgr初始化完成')
        Emit.instance().emit(EventCode.PanelMgrInitOK)
    }

    /**
     * @param param{
     *     layer : 在哪一个容器打开页面
     *     panel: 打开面板
     *     call : 打开成功回调 可选
     *     param: 传递给下一个面板的参数
     * }
     */
    openPanel(param: openParam) {
        let layer = this.layers[param.layer]

        console.log('param:',param,this.layers)
        if (!layer) {
            return
        }

        //加载分包
        let urlInfo = param.panel.getUrl()

        if (this.LoadingList.has(urlInfo.name)) {
            return;
        }

        if (this.openList.has(param.panel.getUrl().name)) {
            return;
        }
        this.LoadingList.set(urlInfo.name, 1) //添加一个加载标识， 防止重复添加
        //todo  mask
        let openPanelWay = () => {
            let way = () => {
                let panel: cc.Node = null
                //判断有没有旧的panel可用，有的话就不重新实例化了
                if (this.hideList.has(urlInfo.name)) {
                    panel = this.hideList.get(urlInfo.name)
                    panel.parent = layer
                    panel.active = false
                    // this.scheduleOnce(() => {
                    this.openList.set(urlInfo.name, panel)
                    this.showPanel(panel, param.param)
                    this.LoadingList.delete(urlInfo.name)
                    if (this.LoadingList.size == 0) {
                        //todo mask
                    }
                    if (param.call) {
                        param.call()
                    }
                    // }, 0)
                } else {
                    LoadMgr.loadPrefab(urlInfo.name, LoadMgr.getBundle(urlInfo.bundle)).then((prefab: cc.Prefab) => {
                        panel = cc.instantiate(prefab)
                        panel.parent = layer
                        panel.active = false
                        this.openList.set(urlInfo.name, panel)
                        panel.getComponent(LayerPanel).initUI()
                        this.showPanel(panel, param.param)
                        this.LoadingList.delete(urlInfo.name)
                        if (this.LoadingList.size == 0) {
                            //todo mask
                        }
                        if (param.call) {
                            param.call()
                        }
                    })
                }
            }

            if (LoadMgr.judgeBundleLoad(urlInfo.name)) {
                way()
            } else {
                LoadMgr.loadBundle_Single(urlInfo.bundle).then(() => {
                    way()
                })
            }
        }
        //没有配置立即准备打开目标panel
        openPanelWay()
    }

    private showPanel(panel: cc.Node, param: any) {
        let script = panel.getComponent(LayerPanel)
        script.show(param)
        panel.active = true
    }

    /**
     *
     * @param panel 需要关闭的面板
     * @param destroy 是否需要彻底销毁这个面板
     */
    closePanel(panel: typeof LayerPanel, destroy = true) {
        let node = this.openList.get(panel.getUrl().name)
        if (!node) {
            return
        }

        node.getComponent(LayerPanel).hide() //这里可以做清除代码

        node.getComponent(LayerPanel).unscheduleAllCallbacks() //取消所有定时器
        if (panel.getUrl().name == "endView") { //如果是endView的化 ，需要同步数据
            CacheMgr.updateData();
        }

        node.parent = null
        this.openList.delete(panel.getUrl().name)
        if (destroy) {
            node.getComponent(LayerPanel).onDestroyDo() //这里可以做清除代码
            node.destroy()
        } else {
            this.hideList.set(panel.getUrl().name, node)
        }
    }

    getPanel(panel: typeof LayerPanel): cc.Node {
        return this.openList.get(panel.getUrl().name)
    }
}

export enum Layer {
    gameLayer,
    gameInfoLayer,
    otherLayer,
    nativeLayer,
}

export enum View {
    endView,
    gameView,
    homeView,
}

export interface openParam {
    layer: Layer,
    panel: typeof LayerPanel,
    call?: Function,
    param?: any
}

