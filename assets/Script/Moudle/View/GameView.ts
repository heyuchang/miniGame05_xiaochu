import LayerPanel, {UrlInfo} from "../../Common/manage/Layer/LayerPanel";
import Tools from "../../Common/Tools";
import EndView from "./EndView";
import Text from "./logic/common/text";
import gameConfig from "./logic/common/config";
import HomeView from "./HomeView";
import CacheMgr from "../../Common/manage/CacheMgr";
import AudioMgr from "../../Common/manage/AudioMgr";
import LoadMgr from "../../Common/manage/LoadMgr";
import Constant from "../../Common/Constant";
import PanelMgr, {Layer} from "../../Common/manage/PanelMgr";
import tween = cc.tween;
import ShowConfig from "../../Common/ShowConfig";
import Global from "../../Common/Global";
import QgBanner from "../../Common/manage/Api/QgBanner";
import Emit from "../../Common/manage/Emit/Emit";
import EmitData from "../../Common/manage/Emit/EmitData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameView extends LayerPanel {
    public static getUrl(): UrlInfo {
        return {
            bundle: "gameView",
            name: "gameView"
        }
    }
    private _paramData: any = {};

    private _button: cc.Node = null;

    //test
    private testMakeBottomBlock: cc.Node = null
    private testReadyMakeBottomBlock: cc.Node = null
    //logic
    @property(cc.SpriteFrame)
    public graySpriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    public whiteSpriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    public hintBlockSpriteFrame: cc.SpriteFrame = null
    @property(cc.Prefab)
    public text_prefab: cc.Prefab = null
    @property(cc.Prefab)
    public hammer_prefab: cc.Prefab = null
    @property(cc.Prefab)
    public sprite_prefab: cc.Prefab = null
    @property([cc.SpriteFrame])
    public sprite_spriteFrame: cc.SpriteFrame[] = []

    @property(cc.SpriteFrame)
    public hint_1_spriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    public hint_2_spriteFrame: cc.SpriteFrame = null

    @property(cc.Prefab)
    public start_prefab: cc.Prefab = null
    @property(cc.Prefab)
    public hardUp_prefab: cc.Prefab = null
    @property(cc.Prefab)
    public nice_prefab: cc.Prefab = null
    @property(cc.Prefab)
    public get_prefab: cc.Prefab = null


    private _startPoint: cc.Node = null
    private _content: cc.Node = null
    private _hintUI: cc.Node = null
    private _whiteHint: cc.Node = null
    private _textHint: cc.Node = null
    private _hardLevelLabel: cc.Label = null
    private _scoreLabel: cc.Label = null
    private _mouth: cc.Node = null
    private _mask: cc.Node = null
    private _hammer: cc.Node = null
    private _sprite: cc.Node = null
    private _menu: cc.Node = null
    private _menuPanel: cc.Node = null

    private _hint_hammer: cc.Node = null
    private _hint_sprite: cc.Node = null
    private _hint_mask: cc.Node = null
    private _hint_label: cc.Node = null
    private _hint_hand: cc.Node = null

    private _price_sprite: cc.Node = null
    private _sprite_icon: cc.Node = null
    private _hammer_sprite: cc.Node = null
    private _hammer_icon: cc.Node = null


    private _content_cover: cc.Node = null

    private _lineDatas: lineData[] = [null]
    private _hintData: lineData = null
    private blockPool: cc.NodePool = null
    private nextBlockInfo: nextBlockInfo [] = []
    private touchEndFlag: boolean = false
    private hardLevel: number = 1
    private score: number = 0
    private continueXiao: number = 0 // 当前连消
    private allContinueXiao: number = 0//当前难度总消除
    private moveX = -1
    private sprite_color: number = 0 //精灵颜色
    private hintFlag = true

    public initUI() {
        //todo 逻辑
        this.testMakeBottomBlock = this.getNode("testUI/makeBottomBlock")
        this.testReadyMakeBottomBlock = this.getNode("testUI/readymakeBottomBlock")
        this.onTouch(this.testMakeBottomBlock, () => {
            this.makeBottomBlock()
        })
        this.onTouch(this.testReadyMakeBottomBlock, () => {
            this.readyMakeBottomBlock()
        })
        this._startPoint = this.getNode("startPoint")
        this._content = this.getNode("content")
        this._content_cover = this.getNode("content_cover")
        this._hintUI = this.getNode("hintUI")
        this._whiteHint = this.getNode("white_hint")
        this._textHint = this.getNode("textHint")
        this._mouth = this.getNode("content_cover/top/mouth")
        this._mask = this.getNode("mask")
        this._hammer_sprite = this.getNode("bottomUI/hammer/price")
        this._hammer_icon = this.getNode("bottomUI/hammer/vedioIcon")
        this._hammer_icon.active = false
        this._price_sprite = this.getNode("bottomUI/sprite/price")
        this._sprite_icon = this.getNode("bottomUI/sprite/vedioIcon")
        this._sprite_icon.active = false
        this._hint_mask = this.getNode("hint_mask")
        this._hint_mask.active = false
        this._hint_label = this.getNode("hint_label")
        this._hint_label.active = false
        this._hint_hand = this.getNode("hint_hand")
        this._hint_hand.active = false

        this._menu = this.getNode("bottomUI/menu")
        this.onTouch(this._menu, this.handle_menu)
        this._menuPanel = this.getNode("bottomUI/menuPanel")
        this._menuPanel.active = false
        this.onTouch(this._menuPanel.children[0], this.handle_restart)
        this.onTouch(this._menuPanel.children[1], this.handle_return)

        this._hammer = this.getNode("bottomUI/hammer")
        // this._hammer.on(cc.Node.EventType.TOUCH_END, this.handle_hammer, this)
        this.onTouch(this._hammer, this.handle_hammer)
        this._sprite = this.getNode("bottomUI/sprite")
        this.onTouch(this._sprite, this.handle_sprite)

        this._hint_hammer = this.getNode("hint_hammer")
        this._hint_hammer.active = false

        this._hint_sprite = this.getNode("hint_sprite")
        this._hint_sprite.active = false

        this._hardLevelLabel = this.getNode("content_cover/top/hardLevel").getComponent(cc.Label)
        this._scoreLabel = this.getNode("content_cover/top/scoreData").getComponent(cc.Label)


        this.updateSprite()
        //创建对象池
        this.blockPool = new cc.NodePool()
        let blockExm = new cc.Node()
        blockExm.x = 0
        blockExm.y = 0
        blockExm.setAnchorPoint(0, 0)
        let sprite = blockExm.addComponent(cc.Sprite)
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM
        for (let i = 0; i < 80; i++) {
            let node = cc.instantiate(blockExm)
            this.blockPool.put(node)
        }
        this.scheduleOnce(() => {
            this._menuPanel.position = this._menu.position
            let gridExm = new cc.Node()
            gameConfig.gridSize = this._startPoint.height / 10
            this._content.width = gameConfig.gridSize * 8
            this._content.height = gameConfig.gridSize * 10
            this._whiteHint.width = this._content.width
            this._whiteHint.height = this._content.height
            this._whiteHint.parent = this._content
            gridExm.setAnchorPoint(0, 0)
            gridExm.width = gameConfig.gridSize
            gridExm.height = gameConfig.gridSize
            gridExm.opacity = 200
            this._hint_hand.width = gameConfig.gridSize
            this._hint_hand.height = gameConfig.gridSize
            this._hint_hand.setAnchorPoint(0, 0)
            let lineContentExm = new cc.Node()
            lineContentExm.setAnchorPoint(0.5, 0)
            lineContentExm.width = gridExm.width * 8
            lineContentExm.height = gridExm.height
            this._hintUI.width = lineContentExm.width

            let startPosition = this._startPoint.getPosition()
            let gridColorTemp = 0   // 0 浅色   1  深色
            for (let i = 10; i >= 1; i--) {
                let lineContent = cc.instantiate(lineContentExm)
                lineContent.name = i.toString()
                lineContent.x = 0
                lineContent.y = startPosition.y
                startPosition.y += lineContent.height
                this._content.addChild(lineContent)
                let posData = Tools.getNodeFourPoint(lineContent)
                lineContent.setAnchorPoint(0, 0)
                lineContent.position = cc.v3(posData.left_down)
                if (this._hintUI.x != lineContent.x) {
                    this._hintUI.x = lineContent.x
                    this._hintData = {
                        blockNodes: [],
                        line: this._hintUI,
                        linePos: [-1]
                    }
                    let flagX = 0
                    for (let i = 1; i <= 8; i++) {
                        this._hintData.linePos[i] = flagX
                        flagX += gameConfig.gridSize
                    }
                }
                let flagX = 0
                let linePosArr: number[] = [-1] //记录 x 轴
                for (let j = 1; j <= 8; j++) {
                    let grid = cc.instantiate(gridExm)
                    grid.name = j.toString()
                    let sprite = grid.addComponent(cc.Sprite)
                    sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM
                    if (gridColorTemp == 0) {
                        if (j == 1 && i != 10) {
                            sprite.spriteFrame = this.graySpriteFrame
                        } else {
                            gridColorTemp = 1
                            sprite.spriteFrame = this.whiteSpriteFrame
                        }
                    } else {
                        if (j == 1 && i != 1) {
                            sprite.spriteFrame = this.whiteSpriteFrame
                        } else {
                            gridColorTemp = 0
                            sprite.spriteFrame = this.graySpriteFrame
                        }
                    }
                    grid.y = 0
                    grid.x = flagX
                    linePosArr.push(grid.x)
                    flagX += grid.width
                    lineContent.addChild(grid)
                }
                this._lineDatas[i] = {
                    blockNodes: [],
                    line: lineContent,
                    linePos: linePosArr
                }
                if (i == 10) {
                    this._whiteHint.x = lineContent.x
                    this._whiteHint.y = lineContent.y
                    this._whiteHint.active = false
                }
            }
            this.adaptive()
            lineContentExm.destroy()
            gridExm.destroy()
            this._startPoint.destroy()
            this.text_start()
            this.makeBottomBlock(true)
        }, 0)
    }

    public show(param: any) {
        //todo 逻辑

        ShowConfig.show('gameConfig').then((res) => {
            if (Global.config.gameConfig.bannerShow == 1) {
                QgBanner.showBanner();
            } else {
                QgBanner.hideBanner();
            }
        });
    }

    public hide() {

        if (Global.config.gameConfig.nativeConfig.type == 2) {
            Emit.instance().emit(EmitData.CLOSE_NATIVE) ;
        }
    }

    //todo logic 方法
    private getBlock(size: number, color: number = -1): cc.Node {
        let block = this.blockPool.get()
        block.width = size * gameConfig.gridSize
        block.height = gameConfig.gridSize
        block.on(cc.Node.EventType.TOUCH_START, this.handle_block_start, this)
        block.on(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this)
        block.on(cc.Node.EventType.TOUCH_END, this.handle_block_end, this)
        block.on(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this)
        LoadMgr.loadAtlas("view/gameView/block/p").then((p: cc.SpriteAtlas) => {
            let id = ((color * 10) + size)
            let spriteFrame = p.getSpriteFrame(id.toString())
            block.getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
        return block
    }

    //归还方块
    private returnBlock(node: cc.Node) {
        node.off(cc.Node.EventType.TOUCH_START, this.handle_block_start, this)
        node.off(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this)
        node.off(cc.Node.EventType.TOUCH_END, this.handle_block_end, this)
        node.off(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this)
        node.parent = null
        node.x = 0
        node.y = 0
        node.width = gameConfig.gridSize
        node.height = gameConfig.gridSize
        node.getComponent(cc.Sprite).spriteFrame = null
        this.blockPool.put(node)
        return
    }

    //预创建最低层的方块
    private readyMakeBottomBlock() {
        //先随机需要空出来几个
        //判断是否需要新手提示
        if (!CacheMgr.isNeedHint || gameConfig.hint_data.length == 0) {
            let blankNum = Tools.getRandom(gameConfig.bottomBlankMin, gameConfig.bottomBlankMax + 1)
            let blankColumns: number [] = []
            while (true) {
                let column = Tools.getRandom(1, 9)
                let flag = Tools.JudgeValueInArr(column, blankColumns)
                for (let i = 0; i < blankColumns.length; i++) {
                    if (column == blankColumns[i]) {
                        flag = true
                    }
                }
                if (flag) {
                    continue
                }
                blankColumns.push(column)
                if (blankColumns.length >= blankNum) {
                    break
                }
            }
            //获取数组中连续的一段
            let allContinueArr: number [] [] = []
            let continueArr: number [] = []
            for (let i = 1; i < 9; i++) {
                if (Tools.JudgeValueInArr(i, blankColumns)) {
                    if (continueArr.length > 0) {
                        allContinueArr.push(Tools.deepClone(continueArr))
                    }
                    continueArr = []
                } else {
                    continueArr.push(i)
                    if (i == 8) {
                        allContinueArr.push(Tools.deepClone(continueArr))
                    }
                }
            }
            let allBlockInfo: nextBlockInfo[] = []
            for (let i = 0; i < allContinueArr.length; i++) {
                let blocInfos = this.definitionBlockType(Tools.deepClone(allContinueArr[i]))
                blocInfos.forEach((value) => {
                    allBlockInfo.push(value)
                })
            }
            this.nextBlockInfo = allBlockInfo
        } else {
            this.nextBlockInfo = gameConfig.hint_data[0]
            gameConfig.hint_data.shift()
        }
        this.updateHint()
    }

    //根据一个位置数组定义这一组方块类型
    private definitionBlockType(arr: number []): nextBlockInfo[] {
        let blockInfos: nextBlockInfo[] = []
        while (true) {
            let length = arr.length
            if (arr.length == 0) {
                break
            }
            if (length >= 4) {
                if (Tools.checkPer(gameConfig.grade_of_difficulty_config[this.hardLevel].probability_4)) {
                    blockInfos.push({
                        column: arr [0],
                        num: 4,
                    })
                    arr.splice(0, 4)
                    continue
                }
            }
            if (length >= 3) {
                if (Tools.checkPer(gameConfig.grade_of_difficulty_config[this.hardLevel].probability_3)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 3
                    })
                    arr.splice(0, 3)
                    continue
                }
            }
            if (length >= 2) {
                if (Tools.checkPer(gameConfig.grade_of_difficulty_config[this.hardLevel].probability_2)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 2,
                    })
                    arr.splice(0, 3)
                    continue
                }
            }
            if (length >= 1) {
                if (Tools.checkPer(gameConfig.grade_of_difficulty_config[this.hardLevel].probability_1)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 1,
                    })
                    arr.splice(0, 1)
                }
            }
        }
        return blockInfos
    }

    //刷新提示
    private updateHint() {
        this._hintUI.removeAllChildren()
        for (let i = 0; i < this.nextBlockInfo.length; i++) {
            let info = this.nextBlockInfo[i]
            let hintBlock = new cc.Node("hintBlock")
            hintBlock.setAnchorPoint(0, 0)
            let sprite = hintBlock.addComponent(cc.Sprite)
            sprite.type = cc.Sprite.Type.SLICED
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM
            sprite.spriteFrame = this.hintBlockSpriteFrame
            hintBlock.width = info.num * gameConfig.gridSize
            hintBlock.height = this._hintUI.height
            this._hintUI.addChild(hintBlock)
            hintBlock.y = 0
            hintBlock.x = this._hintData.linePos[info.column]
        }
    }

    //创建最底层的一套方块
    private makeBottomBlock(isStart = false) {
        if (this.nextBlockInfo.length == 0) {
            this.readyMakeBottomBlock()
        }
        this._mask.active = true
        let result = this.upAllLine()
        Promise.all(result).then(() => {
            //创建方块在下一层
            for (let i = 0; i < this.nextBlockInfo.length; i++) {
                let lineData = this._lineDatas[10]
                let nextBlockInfo = this.nextBlockInfo[i]
                let color = Tools.getRandom(1, 6)
                let block = this.getBlock(nextBlockInfo.num, color)
                block.parent = lineData.line
                block.name = "c_" + nextBlockInfo.column
                block.x = lineData.linePos[nextBlockInfo.column]
                let blockInfo: blockInfo = {
                    node: block,
                    column: nextBlockInfo.column,
                    num: nextBlockInfo.num,
                    cover: this.getCoverColumn(nextBlockInfo.column, nextBlockInfo.num),
                    color: color
                }
                lineData.blockNodes.push(blockInfo)
            }
            this._mask.active = false
            this.readyMakeBottomBlock()
            if (isStart) {
                this.makeBottomBlock()
            } else {
                if (CacheMgr.isNeedHint && this.hintFlag) {
                    this.hintFlag = false
                    this.hint_play()
                }
                this.downAllLine(10)
            }
        })
    }

    //将一行方块向上移动
    private upLine(line: number): any[] {
        let result = []
        let data = this._lineDatas[line]
        let nextData = this._lineDatas[line - 1]
        if (data.blockNodes && data.blockNodes.length > 0) {
            let nodesData = data.blockNodes
            let nextNodesData = nextData.blockNodes
            for (let i = 0; i < nodesData.length; i++) {
                let n = nodesData[i]
                nextNodesData.push(n)
                n.node.parent = nextData.line
                n.node.y = -gameConfig.gridSize //如果y = 0 的话，就没有动画做了
                let p = new Promise((resolve, reject) => {
                    cc.tween(n.node)
                        .to(gameConfig.upTime, {y: 0}, {easing: 'cubicInOut'})
                        .call(() => {
                            resolve(true)
                        })
                        .start()
                })
                result.push(p)
            }
            data.blockNodes = []
        }
        return result
    }

    //将所有方块向上移动
    private upAllLine(): any[] {
        //从倒数第二行开始   依次往上移动
        let result = []
        for (let i = 2; i <= 10; i++) {
            let r = this.upLine(i)
            for (let i = 0; i < r.length; i++) {
                result.push(r[i])
            }
        }
        return result
    }

    private getCoverColumn(first: number, num: number): number[] {
        let arr: number[] = []
        for (let i = first; i < first + num; i++) {
            arr.push(i)
        }
        return arr
    }

    private handle_block_start(e: cc.Event.EventTouch) {
        let node: cc.Node = e.target
        this._whiteHint.width = node.width
        let world = node.parent.convertToWorldSpaceAR(node.position)
        let position = this._whiteHint.parent.convertToNodeSpaceAR(world)
        this._whiteHint.x = position.x
        this._whiteHint.active = true
        this.moveX = node.x
    }

    private handle_block_move(e) {
        let node: cc.Node = e.target
        let a = e.getDelta()
        let world = node.parent.convertToWorldSpaceAR(node.position)
        let position = this._whiteHint.parent.convertToNodeSpaceAR(world)
        this._whiteHint.x = position.x

        let line = Number(node.parent.name)
        let column = Number(node.name.split("_")[1])
        let data = this.getCanMoveMax(line, column)
        // let position2 = node.parent.convertToNodeSpaceAR(e.getLocation())
        let x = node.x += a.x;
        if (data.min_x > x) {
            x = data.min_x
        } else if (data.max_x < x) {
            x = data.max_x
        }
        node.x = x
    }

    private getCanMoveMax(line: number, column: number) {
        let lineData = this._lineDatas[line]
        let right_column: number = -1
        let num: number = 0
        let left_column: number = column
        for (let i = 0; i < lineData.blockNodes.length; i++) {
            let data = lineData.blockNodes[i]
            if (data.column == column) {
                num = data.num
                right_column = data.cover[data.cover.length - 1]
            }
        }
        let max = 0
        let min = 0
        //寻找左右两边最大能够移动的距离
        while (true) {
            right_column++
            if (right_column > 8) {
                max = right_column - 1
                break
            }
            let flag = true
            for (let i = 0; i < lineData.blockNodes.length; i++) {
                let data = lineData.blockNodes[i]
                for (let j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == right_column) {
                        flag = false
                        break
                    }
                }
            }
            if (!flag) {
                max = right_column - 1
                break
            } else {
                max = right_column
            }
        }
        while (true) {
            left_column--
            if (left_column < 1) {
                min = left_column + 1
                break
            }
            let flag = true
            for (let i = 0; i < lineData.blockNodes.length; i++) {
                let data = lineData.blockNodes[i]
                for (let j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == left_column) {
                        flag = false
                        break
                    }
                }
            }
            if (!flag) {
                min = left_column + 1
                break
            } else {
                min = left_column
            }
        }
        let min_x = lineData.linePos[min]
        let max_x = lineData.linePos[max - num + 1]

        return {
            min_x: min_x,
            max_x: max_x
        }
    }

    private handle_block_end(e) {
        let node: cc.Node = e.target
        let line = Number(node.parent.name)
        let column = Number(node.name.split("_")[1])
        this._whiteHint.active = false
        let lineData = this._lineDatas[line]
        this.continueXiao = 0
        for (let i = 1; i <= 8; i++) {
            let grid = lineData.line.getChildByName(i.toString())
            let position = cc.v2(grid.x + grid.width / 2, grid.y + grid.height / 2)
            if (node.getBoundingBox().contains(position)) {
                node.x = lineData.linePos[i]
                node.name = "c_" + i
                for (let j = 0; j < lineData.blockNodes.length; j++) {
                    let bInfo = lineData.blockNodes[j]
                    if (bInfo.column == column) {
                        bInfo.column = i
                        bInfo.cover = this.getCoverColumn(i, bInfo.num)
                        break
                    }
                }
                break
            }
        }
        if (node.x == this.moveX) {
            this.moveX = -1
            return
        }
        AudioMgr.play("move_end").then()
        Tools.vibrateShort()
        this.touchEndFlag = true
        this.downAllLine(line)
    }

    //将一行方块向下移动
    private downLine(line: number): any[] {
        let result = []
        let data = this._lineDatas[line]
        let needChange: any [] = []
        for (let i = 0; i < data.blockNodes.length; i++) {
            //循环需要下拉行的 所有方块
            let blockInfo = data.blockNodes[i]
            //判断每一个方块最多可以下降到哪一行
            let toLine = -1
            for (let j = line + 1; j <= 10; j++) {
                let flag = true
                let nextData = this._lineDatas[j]
                for (let k = 0; k < nextData.blockNodes.length; k++) {
                    let cover = nextData.blockNodes[k].cover
                    if (Tools.judgeArraySame(blockInfo.cover, cover)) {
                        flag = false
                    }
                }
                if (flag) {
                    toLine = j
                } else {
                    break
                }
            }

            if (toLine != -1) {
                needChange.push({
                    index: i,
                    to: toLine,
                })
                let p = new Promise((resolve, reject) => {
                    let n = blockInfo.node
                    cc.tween(n)
                        .to(gameConfig.downTime * 0.6, {y: -gameConfig.gridSize * (toLine - line)}, {easing: 'cubicInOut'})
                        .by(gameConfig.downTime * 0.2, {y: 10},)
                        .by(gameConfig.downTime * 0.2, {y: -10},)
                        .union()
                        .call(() => {
                            n.parent = this._lineDatas[toLine].line
                            n.y = 0
                            resolve(true)
                        })
                        .start()
                })
                result.push(p)
            }
        }
        for (let i = needChange.length - 1; i >= 0; i--) {
            let cdata = needChange[i]
            this._lineDatas[cdata.to].blockNodes.push(data.blockNodes[cdata.index])
            data.blockNodes.splice(cdata.index, 1)
        }
        return result
    }

    //将所有方块向下移动
    private downAllLine(line: number) {
        //从倒数第二行开始   依次往上移动
        this._mask.active = true
        let result = []
        for (let i = line; i >= 1; i--) {
            if (i == 10) {
                continue
            }
            let r = this.downLine(i)
            for (let i = 0; i < r.length; i++) {
                result.push(r[i])
            }
        }

        if (result.length > 0) {
            Promise.all(result).then(() => {
                AudioMgr.play("down").then()
                this.scheduleOnce(() => {
                    this.judgeAllCanClear()
                })
            })
        } else {
            this.judgeAllCanClear()
        }

        // return result
    }

    private judgeLineCanClear(line): any {
        let result = null
        let blockData = this._lineDatas[line].blockNodes
        //获取这个一行所有覆盖
        let allCover = []
        for (let i = 0; i < blockData.length; i++) {
            blockData[i].cover.forEach((value) => {
                allCover.push(value)
            })
        }
        if (allCover.length >= 8) {
            result = new Promise((resolve, reject) => {
                cc.tween(this._lineDatas[line].line)
                    .by(gameConfig.lineShake / 2, {x: -15},)
                    .by(gameConfig.lineShake / 2, {x: 15},)
                    // .by(gameConfig.lineShake / 30, {y: 2.5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {x: 5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: -5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: 2.5, x: -2.5}, {easing: 'cubicInOut'})
                    .union()
                    // .repeat(6)
                    .call(() => {
                        let line_data = this._lineDatas[line]
                        for (let i = 0; i < blockData.length; i++) {
                            this.returnBlock(blockData[i].node)
                        }
                        resolve(true)
                        line_data.blockNodes = []
                    })
                    .start()
            })
        }
        return result
    }

    //判断所有行是否存在可以消除的行
    private judgeAllCanClear(): any[] {
        let result: any[] = []
        for (let i = 1; i <= 10; i++) {
            let r = this.judgeLineCanClear(i)
            if (r) {
                result.push(r)
            }
        }
        if (result.length > 0) {
            AudioMgr.play("xiaochu")
            Tools.vibrateShort("heavy")
            this.continueXiao += result.length
            this.allContinueXiao += result.length
            this.text_defen(result.length)
            this.text_addHard()
            Promise.all(result).then(() => {
                this.scheduleOnce(() => {
                    this.downAllLine(10)
                }, 0)
                if (CacheMgr.isNeedHint) {
                    this.hint_hint()
                }
            })
        } else {
            //没有需要消除的，需要判断一下是不是输了 ， 即第1层是不是有东西
            if (this._lineDatas[1].blockNodes.length > 0) {
                //todo 输了
                this.fail_win()
                return
            } else if (this._lineDatas[9].blockNodes.length == 0) {
                this.touchEndFlag = false
                this.makeBottomBlock()
            } else if (this.touchEndFlag) {
                this.touchEndFlag = false
                this.makeBottomBlock()
            } else {
                this._mask.active = false
            }
        }
        return result
    }

    //适配边框
    private adaptive() {
        let top = this._content_cover.getChildByName("top")
        let left = this._content_cover.getChildByName("left_wall")
        let right = this._content_cover.getChildByName("right_wall")
        let bottom = this._content_cover.getChildByName("bottom")


        let temp = this._lineDatas[1].line.getPosition()
        temp.y += gameConfig.gridSize
        let left_top = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp))

        temp = Tools.getNodeFourPoint(this._lineDatas[10].line).right_down
        let right_bottom = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp))

        top.y = left_top.y
        top.width = this._content.width + 20
        top.getChildByName("scoreData").getComponent(cc.Widget).updateAlignment()
        top.getChildByName("hardLevel").getComponent(cc.Widget).updateAlignment()
        bottom.y = right_bottom.y
        bottom.width = this._content.width + 20
        left.height = this._content.height + 20
        left.x = left_top.x
        left.y = left_top.y - this._content.height / 2

        right.height = this._content.height + 20
        right.x = right_bottom.x
        right.y = left_top.y - this._content.height / 2
    }

    update() {
        this._scoreLabel.string = "当前得分:" + this.score
        this._hardLevelLabel.string = "当前难度:" + this.hardLevel.toString()

        if (CacheMgr.setting.hammerNum > 0) {
            this._hammer_icon.active = false
            this._hammer_sprite.active = true
            // console.log("够 的1 ")
            this._hammer_sprite.getComponent(cc.Label).string = CacheMgr.setting.hammerNum.toString()
        } else {
            // console.log("不够1 ")
            this._hammer_sprite.active = false
            this._hammer_icon.active = true
        }

        if (CacheMgr.setting.spriteNum > 0) {
            // console.log("狗的2 ")
            this._sprite_icon.active = false
            this._price_sprite.active = true
            this._price_sprite.getComponent(cc.Label).string = CacheMgr.setting.spriteNum.toString()
        } else {
            // console.log("不够2 ")
            this._price_sprite.active = false
            this._sprite_icon.active = true
        }

    }

    //更新精灵节点
    updateSprite() {
        this.sprite_color = Tools.getRandom(1, 6)
        this._sprite.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = this.sprite_spriteFrame[this.sprite_color]
    }

    private fail_win() {
        AudioMgr.play("fail")
        Tools.vibrateLong()
        let result: any [] = []
        let time: number = 0
        for (let i = 1; i <= 10; i++) {
            let lineData = this._lineDatas[i]
            lineData.blockNodes.forEach((value) => {
                let node = value.node
                let world = this._mouth.parent.convertToWorldSpaceAR(this._mouth.position)
                let position = node.parent.convertToNodeSpaceAR(world)
                position.x -= gameConfig.gridSize / 2
                position.y -= gameConfig.gridSize / 2
                // node.setAnchorPoint(0.5,0.5)
                let p = new Promise((resolve, reject) => {
                    cc.tween(node)
                        .delay(time)
                        .bezierTo(gameConfig.blockFlyTime, cc.v2(Tools.getRandom(0, 500), Tools.getRandom(0, 500)), cc.v2(Tools.getRandom(0, 500), Tools.getRandom(0, 500)), cc.v2(position))
                        .call(() => {
                            node.active = false
                            node.destroy()
                            resolve(true)
                        })
                        .start()
                })
                result.push(p);
                time += gameConfig.blockFlyTime;
            })
        }

        let isNewMax = false;
        CacheMgr.gold = CacheMgr.gold + this.score;
        if (this.score > CacheMgr.checkpoint) {
            CacheMgr.checkpoint = this.score;
            isNewMax = true;
        }
        Promise.all(result).then(() => {
            PanelMgr.INS.openPanel({
                panel : EndView,
                layer : Layer.gameLayer,
                param : {
                    score : this.score,
                    isNewMax : isNewMax
                },
                call : ()=>{
                    PanelMgr.INS.closePanel(GameView) ;
                }
            })
        });
    }

    private text_defen(n: number) {
        let num = this.hardLevel * n * this.continueXiao
        this.score += num
        let node: cc.Node = null
        node = cc.instantiate(this.get_prefab)
        node.children[0].getComponent(cc.Label).string = num.toString()
        this._textHint.addChild(node)
        if (this.continueXiao > 1) {
            node = cc.instantiate(this.nice_prefab)
            node.children[0].getComponent(cc.Label).string = this.continueXiao.toString()
            this._textHint.addChild(node)
        }
    }

    private text_start() {
        AudioMgr.play("start")
        let text_prefab = cc.instantiate(this.start_prefab)
        // text_prefab.getComponent(cc.Label).string = "游戏开始"
        text_prefab.getComponent(Text).delay = 5
        // this._textHint.addChild(text_prefab)
        // text_prefab = cc.instantiate(this.text_prefab)
        // text_prefab.getComponent(Text).delay = 5
        // text_prefab.getComponent(cc.Label).string = "拖动方块，消除整行."
        this._textHint.addChild(text_prefab)
    }

    private text_addHard() {
        if (this.hardLevel >= gameConfig.grade_of_difficulty_config.length - 1) {
            return
        }
        if (this.allContinueXiao >= 10) {
            this.hardLevel++
            this.allContinueXiao = 2
            let text_prefab = cc.instantiate(this.hardUp_prefab)
            // text_prefab.getComponent(cc.Label).string = "难度提升，得分X" + this.hardLevel
            text_prefab.children[0].getComponent(cc.Label).string = this.hardLevel.toString()
            text_prefab.getComponent(Text).delay = 5
            this._textHint.addChild(text_prefab)
        }
    }

    private handle_hammer() {
        if (this._hint_hammer.active) {
            return;
        }
        if (CacheMgr.setting.hammerNum <= 0) {
            Tools.handleVideo().then((res) => {
                if (!res) {
                    return;
                }
                //判断是否存在3个的方块
                let dataBeChui: any [] = []
                for (let i = 1; i <= 10; i++) {
                    this._lineDatas[i].blockNodes.forEach((value) => {
                        if (value.num >= 3) {
                            dataBeChui.push({
                                line: i,
                                column: value.column
                            })
                        }
                    })
                }
                if (dataBeChui.length == 0) {
                    this._hint_hammer.active = true
                    // Tools.changeGold(gameConfig.price)
                    this.scheduleOnce(() => {
                        this._hint_hammer.active = false
                    }, gameConfig.hide_hint_sprite)
                    CacheMgr.setting.hammerNum++
                    CacheMgr.setting = CacheMgr.setting
                    return
                }

                this._mask.active = true
                let pss = []
                let needDelete: Map<number, number[]> = new Map<number, number[]>()
                dataBeChui.forEach((value) => {
                    let pp = new Promise((resolve, reject) => {
                        let lineData = this._lineDatas[value.line]
                        let idx = 0
                        lineData.blockNodes.forEach((value2, index) => {
                            if (value2.column == value.column) {
                                idx = index
                            }
                        })
                        let oldBlock = lineData.blockNodes[idx]
                        let ps = []
                        for (let i = 0; i < oldBlock.cover.length; i++) {
                            let h = cc.instantiate(this.hammer_prefab)
                            h.width = gameConfig.gridSize
                            h.height = gameConfig.gridSize
                            let world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position)
                            this._content.addChild(h)
                            h.position = h.parent.convertToNodeSpaceAR(world)
                            h.x += oldBlock.node.width / 2
                            h.y += oldBlock.node.height / 2
                            let p = new Promise((resolve, reject) => {
                                cc.tween(h)
                                    .delay(0.5)
                                    .to(gameConfig.hammerRotation, {angle: 30}, {easing: 'cubicInOut'})
                                    .call(() => {
                                        cc.tween(oldBlock.node)
                                            .by(gameConfig.lineShake / 2, {x: -15},)
                                            .by(gameConfig.lineShake / 2, {x: 15},)
                                            .union()
                                            .call(() => {
                                                h.active = false
                                                h.destroy()
                                                let node = this.getBlock(1, oldBlock.color)
                                                node.y = 0
                                                node.x = lineData.linePos[oldBlock.cover[i]]
                                                node.name = "c_" + oldBlock.cover[i]
                                                lineData.line.addChild(node)
                                                lineData.blockNodes.push({
                                                    node: node,
                                                    column: oldBlock.cover[i],
                                                    num: 1,
                                                    cover: [oldBlock.cover[i]],
                                                    color: oldBlock.color,
                                                })
                                                resolve(true)
                                            })
                                            .start()
                                    })
                                    .start()
                            })
                            ps.push(p)
                        }
                        Promise.all(ps).then(() => {
                            this.returnBlock(oldBlock.node)
                            // needDelete.push({
                            //     line: value.line,
                            //     idx: idx
                            // })
                            if (!needDelete.has(value.line)) {
                                needDelete.set(value.line, [])
                            }
                            needDelete.get(value.line).push(idx)
                            // lineData.blockNodes.splice(idx, 1)
                            resolve(true)
                        })
                    })
                    pss.push(pp)
                })


                this.scheduleOnce(() => {
                    AudioMgr.play("knock")
                }, 0.5)
                Promise.all(pss).then(() => {
                    this._mask.active = false
                    needDelete.forEach((value, key) => {
                        for (let i = this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools.JudgeValueInArr(i, value)) {
                                this._lineDatas[key].blockNodes.splice(i, 1)
                            }
                        }
                    })

                    this.scheduleOnce(() => {
                        this.downAllLine(10)
                    }, 0)
                })
            })

        } else {
            //判断是否存在3个的方块
            let dataBeChui: any [] = []
            for (let i = 1; i <= 10; i++) {
                this._lineDatas[i].blockNodes.forEach((value) => {
                    if (value.num >= 3) {
                        dataBeChui.push({
                            line: i,
                            column: value.column
                        })
                    }
                })
            }
            if (dataBeChui.length == 0) {
                this._hint_hammer.active = true
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(() => {
                    this._hint_hammer.active = false
                }, gameConfig.hide_hint_sprite)
                return
            }

            CacheMgr.setting.hammerNum--
            CacheMgr.setting = CacheMgr.setting
            this._mask.active = true
            let pss = []
            let needDelete: Map<number, number[]> = new Map<number, number[]>()
            dataBeChui.forEach((value) => {
                let pp = new Promise((resolve, reject) => {
                    let lineData = this._lineDatas[value.line]
                    let idx = 0
                    lineData.blockNodes.forEach((value2, index) => {
                        if (value2.column == value.column) {
                            idx = index
                        }
                    })
                    let oldBlock = lineData.blockNodes[idx]
                    let ps = []
                    for (let i = 0; i < oldBlock.cover.length; i++) {
                        let h = cc.instantiate(this.hammer_prefab)
                        h.width = gameConfig.gridSize
                        h.height = gameConfig.gridSize
                        let world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position)
                        this._content.addChild(h)
                        h.position = h.parent.convertToNodeSpaceAR(world)
                        h.x += oldBlock.node.width / 2
                        h.y += oldBlock.node.height / 2
                        let p = new Promise((resolve, reject) => {
                            cc.tween(h)
                                .delay(0.5)
                                .to(gameConfig.hammerRotation, {angle: 30}, {easing: 'cubicInOut'})
                                .call(() => {
                                    cc.tween(oldBlock.node)
                                        .by(gameConfig.lineShake / 2, {x: -15},)
                                        .by(gameConfig.lineShake / 2, {x: 15},)
                                        .union()
                                        .call(() => {
                                            h.active = false
                                            h.destroy()
                                            let node = this.getBlock(1, oldBlock.color)
                                            node.y = 0
                                            node.x = lineData.linePos[oldBlock.cover[i]]
                                            node.name = "c_" + oldBlock.cover[i]
                                            lineData.line.addChild(node)
                                            lineData.blockNodes.push({
                                                node: node,
                                                column: oldBlock.cover[i],
                                                num: 1,
                                                cover: [oldBlock.cover[i]],
                                                color: oldBlock.color,
                                            })
                                            resolve(true)
                                        })
                                        .start()
                                })
                                .start()
                        })
                        ps.push(p)
                    }
                    Promise.all(ps).then(() => {
                        this.returnBlock(oldBlock.node)
                        // needDelete.push({
                        //     line: value.line,
                        //     idx: idx
                        // })
                        if (!needDelete.has(value.line)) {
                            needDelete.set(value.line, [])
                        }
                        needDelete.get(value.line).push(idx)
                        // lineData.blockNodes.splice(idx, 1)
                        resolve(true)
                    })
                })
                pss.push(pp)
            })


            this.scheduleOnce(() => {
                AudioMgr.play("knock")
            }, 0.5)
            Promise.all(pss).then(() => {
                this._mask.active = false
                needDelete.forEach((value, key) => {
                    for (let i = this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools.JudgeValueInArr(i, value)) {
                            this._lineDatas[key].blockNodes.splice(i, 1)
                        }
                    }
                })

                this.scheduleOnce(() => {
                    this.downAllLine(10)
                }, 0)
            })

        }
    }

    private handle_sprite() {
        if (this._hint_sprite.active) {
            return;
        }

        if (CacheMgr.setting.spriteNum <= 0) {
            Tools.handleVideo().then((res) => {
                if (!res) {
                    return;
                }
                let needDelData: Map<number, number[]> = new Map<number, number[]>()
                let ps = []
                //遍历颜色
                for (let i = 1; i <= 10; i++) {
                    let blockInfo = this._lineDatas[i].blockNodes
                    blockInfo.forEach((value, index) => {
                        if (value.color == this.sprite_color) {
                            if (!needDelData.has(i)) {
                                needDelData.set(i, [])
                            }
                            needDelData.get(i).push(index)
                            let sprite_node = cc.instantiate(this.sprite_prefab)
                            sprite_node.scale = gameConfig.gridSize / sprite_node.width
                            this.node.addChild(sprite_node)
                            sprite_node.position = sprite_node.parent.convertToNodeSpaceAR(this._sprite.parent.convertToWorldSpaceAR(this._sprite.position))
                            sprite_node.getComponent(cc.Sprite).spriteFrame = this.sprite_spriteFrame[this.sprite_color]
                            let p = new Promise((resolve, reject) => {
                                let world = value.node.parent.convertToWorldSpaceAR(value.node.position)
                                let position = sprite_node.parent.convertToNodeSpaceAR(world)
                                position.x += value.node.width / 2
                                position.y += value.node.height / 2
                                cc.tween(sprite_node)
                                    .bezierTo(gameConfig.sprite_move, cc.v2(Tools.getRandom(-500, 500), Tools.getRandom(-500, 500)), cc.v2(Tools.getRandom(-500, 500), Tools.getRandom(-500, 500)), cc.v2(position))
                                    .call(() => {
                                        cc.tween(sprite_node)
                                            .by(gameConfig.sprite_jump / 2, {y: 20}, {easing: 'cubicInOut'})
                                            .by(gameConfig.sprite_jump / 2, {y: -20}, {easing: 'cubicInOut'})
                                            .union()
                                            .call(() => {
                                                cc.tween(value.node)
                                                    .by(gameConfig.lineShake / 2, {x: -15},)
                                                    .by(gameConfig.lineShake / 2, {x: 15},)
                                                    .union()
                                                    .call(() => {
                                                        sprite_node.active = false
                                                        value.node.active = false
                                                        value.node.destroy()
                                                        resolve(true)
                                                    })
                                                    .start()
                                            })
                                            .start()
                                    })
                                    .start()
                            })
                            ps.push(p)
                        }
                    })
                }
                if (needDelData.size == 0) {
                    this._hint_sprite.active = true
                    // Tools.changeGold(gameConfig.price)
                    this.scheduleOnce(() => {
                        this._hint_sprite.active = false
                    }, gameConfig.hide_hint_sprite)
                    CacheMgr.setting.spriteNum++
                    CacheMgr.setting = CacheMgr.setting
                    console.log("加上一次提示机会", CacheMgr.setting)
                    return
                }
                // AudioMgr.play("sprite_move")
                this._mask.active = true
                Promise.all(ps).then(() => {
                    AudioMgr.play("sprite_xiaochu")
                    needDelData.forEach((value, key) => {
                        for (let i = this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools.JudgeValueInArr(i, value)) {
                                this._lineDatas[key].blockNodes.splice(i, 1)
                            }
                        }
                    })
                    this.updateSprite()
                    this.scheduleOnce(() => {
                        this.downAllLine(10)
                    }, 0)
                    this._mask.active = false
                })
            })
        } else {
            let needDelData: Map<number, number[]> = new Map<number, number[]>()
            let ps = []
            //遍历颜色
            for (let i = 1; i <= 10; i++) {
                let blockInfo = this._lineDatas[i].blockNodes
                blockInfo.forEach((value, index) => {
                    if (value.color == this.sprite_color) {
                        if (!needDelData.has(i)) {
                            needDelData.set(i, [])
                        }
                        needDelData.get(i).push(index)
                        let sprite_node = cc.instantiate(this.sprite_prefab)
                        sprite_node.scale = gameConfig.gridSize / sprite_node.width
                        this.node.addChild(sprite_node)
                        sprite_node.position = sprite_node.parent.convertToNodeSpaceAR(this._sprite.parent.convertToWorldSpaceAR(this._sprite.position))
                        sprite_node.getComponent(cc.Sprite).spriteFrame = this.sprite_spriteFrame[this.sprite_color]
                        let p = new Promise((resolve, reject) => {
                            let world = value.node.parent.convertToWorldSpaceAR(value.node.position)
                            let position = sprite_node.parent.convertToNodeSpaceAR(world)
                            position.x += value.node.width / 2
                            position.y += value.node.height / 2
                            cc.tween(sprite_node)
                                .bezierTo(gameConfig.sprite_move, cc.v2(Tools.getRandom(-500, 500), Tools.getRandom(-500, 500)), cc.v2(Tools.getRandom(-500, 500), Tools.getRandom(-500, 500)), cc.v2(position))
                                .call(() => {
                                    cc.tween(sprite_node)
                                        .by(gameConfig.sprite_jump / 2, {y: 20}, {easing: 'cubicInOut'})
                                        .by(gameConfig.sprite_jump / 2, {y: -20}, {easing: 'cubicInOut'})
                                        .union()
                                        .call(() => {
                                            cc.tween(value.node)
                                                .by(gameConfig.lineShake / 2, {x: -15},)
                                                .by(gameConfig.lineShake / 2, {x: 15},)
                                                .union()
                                                .call(() => {
                                                    sprite_node.active = false
                                                    value.node.active = false
                                                    value.node.destroy()
                                                    resolve(true)
                                                })
                                                .start()
                                        })
                                        .start()
                                })
                                .start()
                        })
                        ps.push(p)
                    }
                })
            }
            if (needDelData.size == 0) {
                this._hint_sprite.active = true
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(() => {
                    this._hint_sprite.active = false
                }, gameConfig.hide_hint_sprite)
                return
            }
            CacheMgr.setting.spriteNum--
            CacheMgr.setting = CacheMgr.setting
            // AudioMgr.play("sprite_move")
            this._mask.active = true
            Promise.all(ps).then(() => {
                AudioMgr.play("sprite_xiaochu")
                needDelData.forEach((value, key) => {
                    for (let i = this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools.JudgeValueInArr(i, value)) {
                            this._lineDatas[key].blockNodes.splice(i, 1)
                        }
                    }
                })
                this.updateSprite()
                this.scheduleOnce(() => {
                    this.downAllLine(10)
                }, 0)
                this._mask.active = false
            })
        }
    }

    private handle_menu() {
        // this._menuPanel.active = !this._menuPanel.active
        if (this._menuPanel.y > this._menu.y) {
            if (this._menuPanel.y != this._menu.y + this._menu.height) {
                return
            }
            tween(this._menuPanel)
                .to(gameConfig.menu_box_move, {y: this._menu.y}, {easing: 'cubicInOut'})
                .call(() => {

                    this.scheduleOnce(() => {
                        this._menuPanel.active = false
                    })
                })
                .start()
        } else {
            this._menuPanel.active = true
            tween(this._menuPanel)
                .to(gameConfig.menu_box_move, {y: this._menu.y + this._menu.height})
                .start()
        }
    }

    //重新开始
    private handle_restart() {
        for (let i = 1; i <= 10; i++) {
            let lineData = this._lineDatas[i]
            lineData.blockNodes.forEach((value) => {
                this.returnBlock(value.node)
            })
            lineData.blockNodes = []
        }
        this.continueXiao = 0
        this.allContinueXiao = 0
        this.hardLevel = 1
        this.score = 0
        this.makeBottomBlock(true)
    }

    //返回首页
    private handle_return() {
        PanelMgr.INS.openPanel({
            panel : HomeView,
            layer : Layer.gameLayer,
            call : ()=>{
                PanelMgr.INS.closePanel(GameView) ;
            }
        })
    }


    update_hintMask() {
        if (this._hint_mask) {
            this._hint_mask.children[0].x = -this._hint_mask.position.x
            this._hint_mask.children[0].y = -this._hint_mask.position.y
        }
    }

    hint_play() {
        this._hint_mask.active = true
        this._hint_mask.width = this._lineDatas[10].line.width
        this._hint_mask.height = this._lineDatas[10].line.height * 2
        this._hint_mask.position = this._lineDatas[10].line.position
        for (let i = 9; i <= 10; i++) {
            if (i == 10) {
                this._lineDatas[i].blockNodes.forEach((value) => {
                    let node = value.node
                    node.off(cc.Node.EventType.TOUCH_START, this.handle_block_start, this)
                    node.off(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this)
                    node.off(cc.Node.EventType.TOUCH_END, this.handle_block_end, this)
                    node.off(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this)
                })
            } else {
                this._lineDatas[i].blockNodes.forEach((value) => {
                    if (value.column != 6) {
                        let node = value.node
                        node.off(cc.Node.EventType.TOUCH_START, this.handle_block_start, this)
                        node.off(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this)
                        node.off(cc.Node.EventType.TOUCH_END, this.handle_block_end, this)
                        node.off(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this)
                    }
                })
            }
        }
        // this._hint_label.getComponent(cc.Label).string = "按住方块，向左拖动1格"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_1_spriteFrame
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height
        this._hint_label.active = true

        this._hint_hand.active = true
        this._hint_hand.width = gameConfig.gridSize
        this._hint_hand.height = gameConfig.gridSize
        let p = cc.v3(this._lineDatas[9].linePos[6])
        let startWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p)
        let startPosition = this.node.convertToNodeSpaceAR(startWorld)

        startPosition.x += gameConfig.gridSize / 2
        startPosition.y -= gameConfig.gridSize / 2

        let p2 = cc.v3(this._lineDatas[9].linePos[5])
        let endWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p2)
        let endPosition = this.node.convertToNodeSpaceAR(endWorld)
        endPosition.y -= gameConfig.gridSize / 2
        this._hint_hand.position = startPosition
        tween(this._hint_hand)
            .to(gameConfig.hint_hand_move, {position: endPosition})
            .to(0, {position: startPosition})
            .union()
            .repeatForever()
            .start()

        this.update_hintMask()
    }

    hint_hint() {
        this._hint_mask.width = this._hintUI.width
        this._hint_mask.height = this._hintUI.height
        this._hint_mask.position = this._hintUI.position
        this._hint_hand.active = false

        // this._hint_label.getComponent(cc.Label).string = "这里是下一行即将出现的方块（点击空白继续）"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_2_spriteFrame
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height
        this._hint_label.active = true
        this.update_hintMask()
        this.hint_register()

        CacheMgr.isNeedHint = false
        this._hint_mask.active = false
        this.scheduleOnce(() => {
            tween(this._hint_label)
                .to(1, {opacity: 0})
                .call(() => {
                    this._hint_label.active = false
                })
                .start()
        }, 4)
    }

    hint_register() {
        this._lineDatas[9].blockNodes.forEach((value) => {
            let block = value.node
            block.on(cc.Node.EventType.TOUCH_START, this.handle_block_start, this)
            block.on(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this)
            block.on(cc.Node.EventType.TOUCH_END, this.handle_block_end, this)
            block.on(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this)
        })
    }

    //重写 gameBoxScroll 滚动方向
    protected gameBoxScrollViewDirection(): string {
        return "v"
    }

}

interface lineData {
    line: cc.Node
    linePos: number[]
    blockNodes: blockInfo[]
}

export interface nextBlockInfo {
    num: number
    column: number
}

interface blockInfo {
    node: cc.Node,
    column: number,
    num: number,
    cover: number[],
    color: number
}
