export default class LayerMgr {
    //这里是初始化三个父节点而已 ，实在Main中调用的，之后可以用于 UIMgr openUI 的参数
    public static init(param: any) {
        this.gameLayer = param.gameLayer;
        this.bannerLayer = param.bannerLayer;
        this.gameInfoLayer = param.gameInfoLayer;
    }

    public static gameLayer: cc.Node = null;

    public static bannerLayer: cc.Node = null;

    public static gameInfoLayer: cc.Node = null;

}
