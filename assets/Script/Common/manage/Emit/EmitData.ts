/**
 * 事件数据
 */
export default class EmitData {
    public static IN_NATIVE_NEXT : string = 'inNative_Next' ;

    public static CLOSE_NATIVE : string = 'closeNative' ;

    public static LOAD_GAME_SCENE : string = 'load_game_scene'
}

export enum EventCode {
    GetConfigOver, //获取配置信息成功
    PanelMgrInitOK, //panel管理器初始化完成
    BannerBoxInitOver, //bannerBox初始化成功
    BannerOrGridInitOK, // banner或者格子初始化成功
    GAME_BOX_UPDATE,  //gameBox需要刷新
}
