import Global, {ExportData} from "./Global";
import LoadMgr from "./manage/LoadMgr";
import CacheMgr from "./manage/CacheMgr";
import GameLogMgr from "./manage/GameLogMgr";
import JiuWuSDK from "../SDK/JiuWuSDK";
import Game from "../Scene/Game";
import PanelMgr, {Layer} from "./manage/PanelMgr";
import ShortageView from "../Moudle/View/ShortageView";
import isNumber = cc.js.isNumber;
import QgNative from "./manage/Api/QgNative";
import LogMgr from "./LogMgr";
import NativeView from "../Moudle/View/NativeView";
import QgRewardedAd from "./manage/Api/QgRewardedAd";
import QgIntersAd from "./manage/Api/QgIntersAd";
import AudioMgr from "./manage/AudioMgr";

export default class Tools {

    public static subStr(str, n) {
        let r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        let m = Math.floor(n / 2);
        for (let i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "...";
            }
        }
        return str;
    }

    /**
     * 短震动
     * light  轻震动
     * medium 中震动
     * heavy  重震动
     */
    public static vibrateShort(type: string = 'heavy', number: number = 10) {
        // @ts-ignore
        if (!window.qg) {
            return
        }
        for (let index = 0; index < number; index++) {
            // @ts-ignore
            qg.vibrateShort();
        }
    }

    /**
     * 短震动
     */
    public static vibrateLong() {
        // @ts-ignore
        if (!window.qg) {
            return
        }
        // @ts-ignore
        qg.vibrateLong();
    }

    //判断一个值是否在一个数组中
    public static JudgeValueInArr(value: any, arr: Array<any>) {
        let flag = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                flag = true
                break
            }
        }
        return flag
    }

    /**
     * 对象深拷贝
     * @param obj
     */
    public static deepClone(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        } catch (e) {
            return obj;
        }
    }


    /**
     * 获取整数随机值
     * @param maxValue
     * @return [0, max)
     */
    public static getRandomMax(maxValue: number) {
        return Math.floor(Math.random() * maxValue)
    }

    /**
     * 获取数组随机值
     * @param array
     */
    public static getRandomByArray(array: any) {
        try {
            return array[this.getRandomMax(array.length)];
        } catch (e) {
            GameLogMgr.error('获取数组随机值异常', e);
        }
        return {};
    }

    /**
     * 获取整数随机值
     * @param minValue
     * @param maxValue
     * @return [min, max)
     */
    public static getRandom(minValue: number, maxValue: number): number {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    }

    /**
     * 获取随机值
     * @param minValue
     * @param maxValue
     * @return (min, max]
     */
    public static getRealRandom(minValue: number, maxValue: number): number {
        return Math.random() * (maxValue - minValue) + minValue;
    }

    public static sort(arr: any[], begin: number = 0, end: number = arr.length): Array<number> {
        if (end <= begin)
            return arr;
        let i = begin;
        let j = end;
        let key = arr[begin].sort;
        while (true) {
            while (true) {
                if (i == j) break;
                if (arr[j].sort < key) {
                    let temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                    break;
                }
                j--;
            }
            while (true) {
                if (i == j) break;
                if (arr[i].sort > key) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    break;
                }
                i++;
            }
            if (i == j)
                break;
        }
        if (end - j > 1) {
            arr = Tools.sort(arr, j + 1, end);
        }
        if (i - begin > 1) {
            arr = Tools.sort(arr, begin, i);
        }
        return arr;
    }

    /**
     * 快速排序导出信息:
     * @param arr 需要进行快速排序的数组
     * @returns {*[]|*}
     */
    public static quickExportSort(arr: ExportData[]) {
        arr.sort(() => {
            return 0.5 - Math.random()
        })
        if (CacheMgr.earlyExportTripPart.length > 0) {
            let arr2 = []
            for (let i = arr.length - 1; i >= 0; i--) {
                if (this.judgeValueInArr(arr[i].appId, CacheMgr.earlyExportTripPart)) {
                    arr2.push(Tools.deepClone(arr[i]))
                    arr.splice(i, 1)
                }
            }
            for (let i = 0; i < arr2.length; i++) {
                arr.push(arr2[i])
            }
        }
        return arr
    }

    /**
     * 改变节点位置的 y 为 banner 位置的 y (骗点用)
     * @param node
     */
    public static changeNodePosition(node: cc.Node) {
        let banner = Game.Ins.banner;
        node.y = banner.y + banner.height / 2;
    }

    /**
     * 调整按钮位置到 banner上方
     * @param button
     */
    public static setExportPos(button: cc.Node) {
        let banner = Game.Ins.banner;
        this.changeNodePosition(button);
        button.y = button.y + banner.height / 2 + button.height / 2;
    }


    /**
     * 骗点结束移动 按钮
     * @param time
     * @param button
     */
    public static setExportPos_Animation(time: number, button: cc.Node) {
        let banner = Game.Ins.banner
        this.changeNodePosition(button);
        cc.tween(button)
            .to(time, {y: button.y + banner.height / 2 + button.height / 2}, {easing: "smooth"})
            .start();
    }

    /**
     * 判断百分比
     * @param per
     */
    public static checkPer(per: number) {
        if (!per) {
            return false;
        }
        return Tools.getRandomMax(100) <= per;
    }

    /**
     * 游戏链接后台，资源加载, 初始化 gameBox
     */
    public static model_initModel(f: Function): number {
        let functions: Function[] = [
            () => {
                let names = ["sub","homeView","gameView"]
                LoadMgr.loadBundle(names).then(() => {
                    f()
                })
            },
            () => {
                f();
            },
        ]

        for (let i = 0; i < functions.length; i++) {
            functions[i]();
        }
        return functions.length;
    }

    /**
     *  播放视频， resolve 返回 true 为获得奖励， false 为未获得奖励
     */
    public static handleVideo() {
        return new Promise((resolve, reject) => {
            if (!Global.isVivo) {
                resolve(true);
                return
            }
            AudioMgr.backMusic(false) ;
            QgRewardedAd.showRewardedVideo().then((res) => {
                let boolean : boolean = res == 1 ;
                AudioMgr.backMusic() ;
                resolve(boolean);
            })
        })
    }

    /**
     * 打开或关闭 碰撞系统功能
     * @param isOpen 碰撞系统
     * @param draw debug 绘制
     * @param bounding 包围盒
     */
    public static getCollision(isOpen: boolean = true, draw: boolean = false, bounding: boolean = false) {
        let Manager = cc.director.getCollisionManager();
        Manager.enabled = isOpen;
        Manager.enabledDebugDraw = draw;
        Manager.enabledDrawBoundingBox = bounding;
    }

    /**
     * 打开或关闭 物理系统
     * @param isOpen
     * @param draw
     */
    public static getPhysics(isOpen: boolean = true, draw: boolean = false) {
        let Manager = cc.director.getPhysicsManager();
        Manager.enabled = true;
        if (draw) {
            cc.director.getPhysicsManager().debugDrawFlags =
                cc.PhysicsManager.DrawBits.e_aabbBit
                |
                cc.PhysicsManager.DrawBits.e_jointBit
                |
                cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        }
    }

    /**
     *  注册一组 touch 事件
     * @param node
     * @param start
     * @param move
     * @param end
     * @param cancel
     * @param target
     * @param bool
     */
    public static onTouchAll(node: cc.Node, start: Function, move: Function, end: Function, cancel: Function, target: any, bool: boolean = true) {
        if (node) {
            if (bool) {
                node.on(cc.Node.EventType.TOUCH_START, start, target);
                node.on(cc.Node.EventType.TOUCH_MOVE, move, target);
                node.on(cc.Node.EventType.TOUCH_END, end, target);
                node.on(cc.Node.EventType.TOUCH_CANCEL, cancel, target);
            } else {
                node.off(cc.Node.EventType.TOUCH_START, start, target);
                node.off(cc.Node.EventType.TOUCH_MOVE, move, target);
                node.off(cc.Node.EventType.TOUCH_END, end, target);
                node.off(cc.Node.EventType.TOUCH_CANCEL, cancel, target);
            }
        }
    }

    /**
     * 获取节点所在父节点的下标
     *  @param node
     */
    public static getChildrenIndex(node: cc.Node): number {
        let parent = node.parent;
        for (let i = 0; i < parent.children.length; i++) {
            let value = parent.children[i];
            if (node === value) {
                return i;
            }
        }
    }

    /**
     * 该位置是否在节点中
     * @param point 位置
     * @param node 节点
     */
    public static getPointInNode(point: cc.Vec2, node: cc.Node): boolean {
        return node.getBoundingBoxToWorld().contains(point);
    }

    /**
     * 获取比较奇怪的时间字符串 （特定的一天) 20210203
     */
    public static date_getTimeNum(date: Date) {
        return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    }

    /**
     * 获取两个时间的时间差
     * @param start1   比较靠后的时间
     * @param start2   比较靠前的时间
     * @param type     获取的时间差类型  0 day  1 hour 2 minuter 3 second
     */
    public static date_getTimeDifference(start1: Date | number, start2: Date | number, type: number): any {
        if (isNumber(start1)) {
            start1 = new Date(start1)
        }
        if (isNumber(start2)) {
            start2 = new Date(start2)
        }

        if (start1 instanceof Date && start2 instanceof Date) {
            let distance = start1.getTime() - start2.getTime(); //时间差秒
            switch (type) {
                case 0:
                    return {
                        distance: Math.floor(distance / (24 * 60 * 60 * 1000)),
                        distance_real: distance,
                    }
                case 1 :
                    return {
                        distance: Math.floor(distance / (60 * 60 * 1000)),
                        distance_real: distance,
                    }
                case 2 :
                    return {
                        distance: Math.floor(distance / (60 * 1000)),
                        distance_real: distance,
                    }
                case 3  :
                    return {
                        distance: Math.floor(distance / (1000)),
                        distance_real: distance,
                    }
            }
        }
    }

    /**
     * 获取当前主机地址
     */
    public static getHost(): string {
        return JiuWuSDK.url.host;
    }

    /**
     * 根据一个矩形 ，创建一个节点
     */
    public static getNodeForRect(rect: cc.Rect): cc.Node {
        let node = new cc.Node();
        node.width = rect.width;
        node.height = rect.height;
        node.setPosition(cc.v3(rect.center));
        return node;
    }

    /**
     * 获取一个节点四个点的位置 (未经旋转 这种操作）
     * @param node
     */
    //获取一个节点四个点的位置 (未经旋转 这种操作）
    public static getNodeFourPoint(node: cc.Node) {
        let anchor = node.getAnchorPoint()
        return {
            left_down: cc.v2(node.position.x - anchor.x * node.width, node.position.y - anchor.y * node.height),
            left_top: cc.v2(node.position.x - anchor.x * node.width, node.position.y + (1 - anchor.y) * node.height),
            right_down: cc.v2(node.position.x + (1 - anchor.x) * node.width, node.position.y - anchor.y * node.height),
            right_top: cc.v2(node.position.x + (1 - anchor.x) * node.width, node.position.y + (1 - anchor.y) * node.height)
        }
    }


    //判断一个值是否在一个数组中
    public static judgeValueInArr(value: any, arr: Array<any>) {
        let flag = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                flag = true
                break
            }
        }
        return flag
    }


    //判断两个数组是否相交
    public static judgeArraySame(arr1: number[], arr2: number[]) {
        let flag = false
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i] == arr2[j]) {
                    flag = true
                    return flag
                }
            }
        }
        return flag
    }


    //banner根据节点适配
    public static getRealSize(node: cc.Node, resize_width = null, resize_height = null): {
        width: number,
        height: number,
        left: number,
        top: number
    } {
        //获取屏幕设计尺寸
        let canvas = node.parent
        let size = canvas.getContentSize()
        let data = Tools.getNodeFourPoint(canvas)
        let pc = data.left_top.sub(cc.v2(Tools.getNodeFourPoint(node).left_top))
        let screen = cc.view.getFrameSize();
        let scaleX = screen.width / size.width
        let scaleY = screen.height / size.height

        if (resize_width && resize_height) {
            node.width = resize_width / scaleX
            node.height = resize_height / scaleY
        }
        // console.log("scaleX", scaleX, "scaleY", scaleY)
        return {
            width: node.width * scaleX,
            height: node.height * scaleY,
            left: -pc.x * scaleX,
            top: pc.y * scaleY,
        }
    }

    /**
     * 修改体力 ， 如果体力不足 ，修改失败的话 ，会自动弹出体力不足框
     * @param num 需要改动的体力
     * @param callBack
     */
    public static changeStamina(num: number, callBack?: Function): boolean {
        if (CacheMgr.stamina + num < 0) {
            PanelMgr.INS.openPanel({
                panel: ShortageView,
                layer: Layer.gameLayer,
                param: {
                    type: "stamina",
                    callBack: callBack,
                    price: Math.abs(num),
                }
            })
            return false;
        } else {
            if (callBack) {
                callBack();
            }
        }
        CacheMgr.stamina = CacheMgr.stamina + num;
        return true;
    }

    /**
     * 修改金币 ， 如果金币不足 ，修改失败的话 ，会自动弹出金币不足框
     * @param num
     * @param callBack   成功回调 （包括领取金币成功）
     */
    public static changeGold(num: number, callBack?: Function): boolean {
        if (CacheMgr.gold + num < 0) {
            PanelMgr.INS.openPanel({
                panel: ShortageView,
                layer: Layer.gameLayer,
                param: {
                    type: "gold",
                    callBack: callBack,
                    price: Math.abs(num),
                }
            })
            return false
        } else {
            if (callBack) {
                callBack();
            }
        }
        CacheMgr.gold = CacheMgr.gold + num
        return true
    }

    /**
     * 判断体力 ， 如果体力不足 ，修改失败的话 ，会自动弹出体力不足框
     * @param num 需要改动的体力
     * @param callBack
     */
    public static judgeStamina(num: number, callBack?: Function): boolean {
        if (CacheMgr.stamina + num < 0) {
            PanelMgr.INS.openPanel({
                panel: ShortageView,
                layer: Layer.gameLayer,
                param: {
                    type: "stamina",
                    callBack: callBack,
                    price: 0,
                }
            })
            return false;
        } else {
            if (callBack) {
                callBack();
            }
        }
        return true;
    }

    /**
     * 判断金币 ， 如果金币不足 ，修改失败的话 ，会自动弹出金币不足框
     * @param num
     * @param callBack   成功回调 （包括领取金币成功）
     */
    public static judgeGold(num: number, callBack?: Function): boolean {
        if (CacheMgr.gold + num < 0) {
            PanelMgr.INS.openPanel({
                panel: ShortageView,
                layer: Layer.gameLayer,
                param: {
                    type: "gold",
                    callBack: callBack,
                    price: num,
                }
            })
            return false
        } else {
            if (callBack) {
                callBack();
            }
        }
        return true
    }

    /**
     * 已知圆心，半径，角度，求圆上的点坐标 (坐标需要自己转)
     * @param center
     * @param r
     * @param angle
     */
    public static getCirclePoint(center: cc.Vec3, r: number, angle: number): cc.Vec3 {
        return cc.v3(
            center.x + r * Math.cos(angle * 3.14 / 180),
            center.y + r * Math.sin(angle * 3.14 / 180)
        )
    }

    public static handlerInters() {
        return new Promise((resolve) => {
            if (!Global.isVivo) {
                resolve(true);
                return
            }
            QgIntersAd.showInters();
            resolve(true);
        })
    }

    /**
     * 判断原生广告显示
     */
    public static showNative(type, labelType, time) {
        return new Promise((resolve) => {
            if (QgNative.nativeMessage == null) {
                QgNative.loadNative().then((res) => {
                    if (res == false) {
                        LogMgr.error("原生广告拉取失败......")
                        resolve(false);
                        return
                    }
                })
            }
            PanelMgr.INS.openPanel({
                panel: NativeView,
                layer: Layer.nativeLayer,
                param: {
                    type: type,
                    labelType: labelType,
                    time: time
                }
            })
            resolve(true);
        })
    }
}


