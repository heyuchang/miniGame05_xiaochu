import LayerUI from "./LayerUI";
import GameLog from "../GameLogMgr";

const {ccclass} = cc._decorator;

@ccclass
export default abstract class LayerPanel extends LayerUI {
    public static getUrl(): UrlInfo {
        GameLog.error("需要重写getURL");
        return null
    }

    //动态加载的资源  ,将需要清除的动态资源放在asset中，在该面板销毁的时候，会自动释放这些资源
    public assets: cc.Asset [] = []

    /**
     *
     *  面板初始化,第一次生成的时候调用
     */
    public abstract initUI();

    /**
     *
     * 面板显示 每次显示都调用 可以进行相关初始化（UI、事件）会在onload，start之前调用
     * @param param 面板显示参数
     */
    public abstract show(param: any): void;

    /**
     * 面板隐藏  每次因此都调用
     */
    public abstract hide();

    public onDestroyDo() {

    }
}


export interface UrlInfo {
    bundle: string,
    name: string,
}
