"use strict";
cc._RF.push(module, 'bfce93ObH9DBbRXeAjfXK5B', 'GameView');
// Script/Moudle/View/GameView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayerPanel_1 = require("../../Common/manage/Layer/LayerPanel");
var Tools_1 = require("../../Common/Tools");
var EndView_1 = require("./EndView");
var text_1 = require("./logic/common/text");
var config_1 = require("./logic/common/config");
var HomeView_1 = require("./HomeView");
var CacheMgr_1 = require("../../Common/manage/CacheMgr");
var AudioMgr_1 = require("../../Common/manage/AudioMgr");
var LoadMgr_1 = require("../../Common/manage/LoadMgr");
var PanelMgr_1 = require("../../Common/manage/PanelMgr");
var tween = cc.tween;
var ShowConfig_1 = require("../../Common/ShowConfig");
var Global_1 = require("../../Common/Global");
var QgBanner_1 = require("../../Common/manage/Api/QgBanner");
var Emit_1 = require("../../Common/manage/Emit/Emit");
var EmitData_1 = require("../../Common/manage/Emit/EmitData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paramData = {};
        _this._button = null;
        //test
        _this.testMakeBottomBlock = null;
        _this.testReadyMakeBottomBlock = null;
        //logic
        _this.graySpriteFrame = null;
        _this.whiteSpriteFrame = null;
        _this.hintBlockSpriteFrame = null;
        _this.text_prefab = null;
        _this.hammer_prefab = null;
        _this.sprite_prefab = null;
        _this.sprite_spriteFrame = [];
        _this.hint_1_spriteFrame = null;
        _this.hint_2_spriteFrame = null;
        _this.start_prefab = null;
        _this.hardUp_prefab = null;
        _this.nice_prefab = null;
        _this.get_prefab = null;
        _this._startPoint = null;
        _this._content = null;
        _this._hintUI = null;
        _this._whiteHint = null;
        _this._textHint = null;
        _this._hardLevelLabel = null;
        _this._scoreLabel = null;
        _this._mouth = null;
        _this._mask = null;
        _this._hammer = null;
        _this._sprite = null;
        _this._menu = null;
        _this._menuPanel = null;
        _this._hint_hammer = null;
        _this._hint_sprite = null;
        _this._hint_mask = null;
        _this._hint_label = null;
        _this._hint_hand = null;
        _this._price_sprite = null;
        _this._sprite_icon = null;
        _this._hammer_sprite = null;
        _this._hammer_icon = null;
        _this._content_cover = null;
        _this._lineDatas = [null];
        _this._hintData = null;
        _this.blockPool = null;
        _this.nextBlockInfo = [];
        _this.touchEndFlag = false;
        _this.hardLevel = 1;
        _this.score = 0;
        _this.continueXiao = 0; // 当前连消
        _this.allContinueXiao = 0; //当前难度总消除
        _this.moveX = -1;
        _this.sprite_color = 0; //精灵颜色
        _this.hintFlag = true;
        return _this;
    }
    GameView_1 = GameView;
    GameView.getUrl = function () {
        return {
            bundle: "gameView",
            name: "gameView"
        };
    };
    GameView.prototype.initUI = function () {
        var _this = this;
        //todo 逻辑
        this.testMakeBottomBlock = this.getNode("testUI/makeBottomBlock");
        this.testReadyMakeBottomBlock = this.getNode("testUI/readymakeBottomBlock");
        this.onTouch(this.testMakeBottomBlock, function () {
            _this.makeBottomBlock();
        });
        this.onTouch(this.testReadyMakeBottomBlock, function () {
            _this.readyMakeBottomBlock();
        });
        this._startPoint = this.getNode("startPoint");
        this._content = this.getNode("content");
        this._content_cover = this.getNode("content_cover");
        this._hintUI = this.getNode("hintUI");
        this._whiteHint = this.getNode("white_hint");
        this._textHint = this.getNode("textHint");
        this._mouth = this.getNode("content_cover/top/mouth");
        this._mask = this.getNode("mask");
        this._hammer_sprite = this.getNode("bottomUI/hammer/price");
        this._hammer_icon = this.getNode("bottomUI/hammer/vedioIcon");
        this._hammer_icon.active = false;
        this._price_sprite = this.getNode("bottomUI/sprite/price");
        this._sprite_icon = this.getNode("bottomUI/sprite/vedioIcon");
        this._sprite_icon.active = false;
        this._hint_mask = this.getNode("hint_mask");
        this._hint_mask.active = false;
        this._hint_label = this.getNode("hint_label");
        this._hint_label.active = false;
        this._hint_hand = this.getNode("hint_hand");
        this._hint_hand.active = false;
        this._menu = this.getNode("bottomUI/menu");
        this.onTouch(this._menu, this.handle_menu);
        this._menuPanel = this.getNode("bottomUI/menuPanel");
        this._menuPanel.active = false;
        this.onTouch(this._menuPanel.children[0], this.handle_restart);
        this.onTouch(this._menuPanel.children[1], this.handle_return);
        this._hammer = this.getNode("bottomUI/hammer");
        // this._hammer.on(cc.Node.EventType.TOUCH_END, this.handle_hammer, this)
        this.onTouch(this._hammer, this.handle_hammer);
        this._sprite = this.getNode("bottomUI/sprite");
        this.onTouch(this._sprite, this.handle_sprite);
        this._hint_hammer = this.getNode("hint_hammer");
        this._hint_hammer.active = false;
        this._hint_sprite = this.getNode("hint_sprite");
        this._hint_sprite.active = false;
        this._hardLevelLabel = this.getNode("content_cover/top/hardLevel").getComponent(cc.Label);
        this._scoreLabel = this.getNode("content_cover/top/scoreData").getComponent(cc.Label);
        this.updateSprite();
        //创建对象池
        this.blockPool = new cc.NodePool();
        var blockExm = new cc.Node();
        blockExm.x = 0;
        blockExm.y = 0;
        blockExm.setAnchorPoint(0, 0);
        var sprite = blockExm.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        for (var i = 0; i < 80; i++) {
            var node = cc.instantiate(blockExm);
            this.blockPool.put(node);
        }
        this.scheduleOnce(function () {
            _this._menuPanel.position = _this._menu.position;
            var gridExm = new cc.Node();
            config_1.default.gridSize = _this._startPoint.height / 10;
            _this._content.width = config_1.default.gridSize * 8;
            _this._content.height = config_1.default.gridSize * 10;
            _this._whiteHint.width = _this._content.width;
            _this._whiteHint.height = _this._content.height;
            _this._whiteHint.parent = _this._content;
            gridExm.setAnchorPoint(0, 0);
            gridExm.width = config_1.default.gridSize;
            gridExm.height = config_1.default.gridSize;
            gridExm.opacity = 200;
            _this._hint_hand.width = config_1.default.gridSize;
            _this._hint_hand.height = config_1.default.gridSize;
            _this._hint_hand.setAnchorPoint(0, 0);
            var lineContentExm = new cc.Node();
            lineContentExm.setAnchorPoint(0.5, 0);
            lineContentExm.width = gridExm.width * 8;
            lineContentExm.height = gridExm.height;
            _this._hintUI.width = lineContentExm.width;
            var startPosition = _this._startPoint.getPosition();
            var gridColorTemp = 0; // 0 浅色   1  深色
            for (var i = 10; i >= 1; i--) {
                var lineContent = cc.instantiate(lineContentExm);
                lineContent.name = i.toString();
                lineContent.x = 0;
                lineContent.y = startPosition.y;
                startPosition.y += lineContent.height;
                _this._content.addChild(lineContent);
                var posData = Tools_1.default.getNodeFourPoint(lineContent);
                lineContent.setAnchorPoint(0, 0);
                lineContent.position = cc.v3(posData.left_down);
                if (_this._hintUI.x != lineContent.x) {
                    _this._hintUI.x = lineContent.x;
                    _this._hintData = {
                        blockNodes: [],
                        line: _this._hintUI,
                        linePos: [-1]
                    };
                    var flagX_1 = 0;
                    for (var i_1 = 1; i_1 <= 8; i_1++) {
                        _this._hintData.linePos[i_1] = flagX_1;
                        flagX_1 += config_1.default.gridSize;
                    }
                }
                var flagX = 0;
                var linePosArr = [-1]; //记录 x 轴
                for (var j = 1; j <= 8; j++) {
                    var grid = cc.instantiate(gridExm);
                    grid.name = j.toString();
                    var sprite_1 = grid.addComponent(cc.Sprite);
                    sprite_1.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    if (gridColorTemp == 0) {
                        if (j == 1 && i != 10) {
                            sprite_1.spriteFrame = _this.graySpriteFrame;
                        }
                        else {
                            gridColorTemp = 1;
                            sprite_1.spriteFrame = _this.whiteSpriteFrame;
                        }
                    }
                    else {
                        if (j == 1 && i != 1) {
                            sprite_1.spriteFrame = _this.whiteSpriteFrame;
                        }
                        else {
                            gridColorTemp = 0;
                            sprite_1.spriteFrame = _this.graySpriteFrame;
                        }
                    }
                    grid.y = 0;
                    grid.x = flagX;
                    linePosArr.push(grid.x);
                    flagX += grid.width;
                    lineContent.addChild(grid);
                }
                _this._lineDatas[i] = {
                    blockNodes: [],
                    line: lineContent,
                    linePos: linePosArr
                };
                if (i == 10) {
                    _this._whiteHint.x = lineContent.x;
                    _this._whiteHint.y = lineContent.y;
                    _this._whiteHint.active = false;
                }
            }
            _this.adaptive();
            lineContentExm.destroy();
            gridExm.destroy();
            _this._startPoint.destroy();
            _this.text_start();
            _this.makeBottomBlock(true);
        }, 0);
    };
    GameView.prototype.show = function (param) {
        //todo 逻辑
        ShowConfig_1.default.show('gameConfig').then(function (res) {
            if (Global_1.default.config.gameConfig.bannerShow == 1) {
                QgBanner_1.default.showBanner();
            }
            else {
                QgBanner_1.default.hideBanner();
            }
        });
    };
    GameView.prototype.hide = function () {
        if (Global_1.default.config.gameConfig.nativeConfig.type == 2) {
            Emit_1.default.instance().emit(EmitData_1.default.CLOSE_NATIVE);
        }
    };
    //todo logic 方法
    GameView.prototype.getBlock = function (size, color) {
        if (color === void 0) { color = -1; }
        var block = this.blockPool.get();
        block.width = size * config_1.default.gridSize;
        block.height = config_1.default.gridSize;
        block.on(cc.Node.EventType.TOUCH_START, this.handle_block_start, this);
        block.on(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this);
        block.on(cc.Node.EventType.TOUCH_END, this.handle_block_end, this);
        block.on(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this);
        LoadMgr_1.default.loadAtlas("view/gameView/block/p").then(function (p) {
            var id = ((color * 10) + size);
            var spriteFrame = p.getSpriteFrame(id.toString());
            block.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        return block;
    };
    //归还方块
    GameView.prototype.returnBlock = function (node) {
        node.off(cc.Node.EventType.TOUCH_START, this.handle_block_start, this);
        node.off(cc.Node.EventType.TOUCH_MOVE, this.handle_block_move, this);
        node.off(cc.Node.EventType.TOUCH_END, this.handle_block_end, this);
        node.off(cc.Node.EventType.TOUCH_CANCEL, this.handle_block_end, this);
        node.parent = null;
        node.x = 0;
        node.y = 0;
        node.width = config_1.default.gridSize;
        node.height = config_1.default.gridSize;
        node.getComponent(cc.Sprite).spriteFrame = null;
        this.blockPool.put(node);
        return;
    };
    //预创建最低层的方块
    GameView.prototype.readyMakeBottomBlock = function () {
        //先随机需要空出来几个
        //判断是否需要新手提示
        if (!CacheMgr_1.default.isNeedHint || config_1.default.hint_data.length == 0) {
            var blankNum = Tools_1.default.getRandom(config_1.default.bottomBlankMin, config_1.default.bottomBlankMax + 1);
            var blankColumns = [];
            while (true) {
                var column = Tools_1.default.getRandom(1, 9);
                var flag = Tools_1.default.JudgeValueInArr(column, blankColumns);
                for (var i = 0; i < blankColumns.length; i++) {
                    if (column == blankColumns[i]) {
                        flag = true;
                    }
                }
                if (flag) {
                    continue;
                }
                blankColumns.push(column);
                if (blankColumns.length >= blankNum) {
                    break;
                }
            }
            //获取数组中连续的一段
            var allContinueArr = [];
            var continueArr = [];
            for (var i = 1; i < 9; i++) {
                if (Tools_1.default.JudgeValueInArr(i, blankColumns)) {
                    if (continueArr.length > 0) {
                        allContinueArr.push(Tools_1.default.deepClone(continueArr));
                    }
                    continueArr = [];
                }
                else {
                    continueArr.push(i);
                    if (i == 8) {
                        allContinueArr.push(Tools_1.default.deepClone(continueArr));
                    }
                }
            }
            var allBlockInfo_1 = [];
            for (var i = 0; i < allContinueArr.length; i++) {
                var blocInfos = this.definitionBlockType(Tools_1.default.deepClone(allContinueArr[i]));
                blocInfos.forEach(function (value) {
                    allBlockInfo_1.push(value);
                });
            }
            this.nextBlockInfo = allBlockInfo_1;
        }
        else {
            this.nextBlockInfo = config_1.default.hint_data[0];
            config_1.default.hint_data.shift();
        }
        this.updateHint();
    };
    //根据一个位置数组定义这一组方块类型
    GameView.prototype.definitionBlockType = function (arr) {
        var blockInfos = [];
        while (true) {
            var length = arr.length;
            if (arr.length == 0) {
                break;
            }
            if (length >= 4) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_4)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 4,
                    });
                    arr.splice(0, 4);
                    continue;
                }
            }
            if (length >= 3) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_3)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 3
                    });
                    arr.splice(0, 3);
                    continue;
                }
            }
            if (length >= 2) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_2)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 2,
                    });
                    arr.splice(0, 3);
                    continue;
                }
            }
            if (length >= 1) {
                if (Tools_1.default.checkPer(config_1.default.grade_of_difficulty_config[this.hardLevel].probability_1)) {
                    blockInfos.push({
                        column: arr[0],
                        num: 1,
                    });
                    arr.splice(0, 1);
                }
            }
        }
        return blockInfos;
    };
    //刷新提示
    GameView.prototype.updateHint = function () {
        this._hintUI.removeAllChildren();
        for (var i = 0; i < this.nextBlockInfo.length; i++) {
            var info = this.nextBlockInfo[i];
            var hintBlock = new cc.Node("hintBlock");
            hintBlock.setAnchorPoint(0, 0);
            var sprite = hintBlock.addComponent(cc.Sprite);
            sprite.type = cc.Sprite.Type.SLICED;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.hintBlockSpriteFrame;
            hintBlock.width = info.num * config_1.default.gridSize;
            hintBlock.height = this._hintUI.height;
            this._hintUI.addChild(hintBlock);
            hintBlock.y = 0;
            hintBlock.x = this._hintData.linePos[info.column];
        }
    };
    //创建最底层的一套方块
    GameView.prototype.makeBottomBlock = function (isStart) {
        var _this = this;
        if (isStart === void 0) { isStart = false; }
        if (this.nextBlockInfo.length == 0) {
            this.readyMakeBottomBlock();
        }
        this._mask.active = true;
        var result = this.upAllLine();
        Promise.all(result).then(function () {
            //创建方块在下一层
            for (var i = 0; i < _this.nextBlockInfo.length; i++) {
                var lineData = _this._lineDatas[10];
                var nextBlockInfo = _this.nextBlockInfo[i];
                var color = Tools_1.default.getRandom(1, 6);
                var block = _this.getBlock(nextBlockInfo.num, color);
                block.parent = lineData.line;
                block.name = "c_" + nextBlockInfo.column;
                block.x = lineData.linePos[nextBlockInfo.column];
                var blockInfo = {
                    node: block,
                    column: nextBlockInfo.column,
                    num: nextBlockInfo.num,
                    cover: _this.getCoverColumn(nextBlockInfo.column, nextBlockInfo.num),
                    color: color
                };
                lineData.blockNodes.push(blockInfo);
            }
            _this._mask.active = false;
            _this.readyMakeBottomBlock();
            if (isStart) {
                _this.makeBottomBlock();
            }
            else {
                if (CacheMgr_1.default.isNeedHint && _this.hintFlag) {
                    _this.hintFlag = false;
                    _this.hint_play();
                }
                _this.downAllLine(10);
            }
        });
    };
    //将一行方块向上移动
    GameView.prototype.upLine = function (line) {
        var result = [];
        var data = this._lineDatas[line];
        var nextData = this._lineDatas[line - 1];
        if (data.blockNodes && data.blockNodes.length > 0) {
            var nodesData = data.blockNodes;
            var nextNodesData = nextData.blockNodes;
            var _loop_1 = function (i) {
                var n = nodesData[i];
                nextNodesData.push(n);
                n.node.parent = nextData.line;
                n.node.y = -config_1.default.gridSize; //如果y = 0 的话，就没有动画做了
                var p = new Promise(function (resolve, reject) {
                    cc.tween(n.node)
                        .to(config_1.default.upTime, { y: 0 }, { easing: 'cubicInOut' })
                        .call(function () {
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
            };
            for (var i = 0; i < nodesData.length; i++) {
                _loop_1(i);
            }
            data.blockNodes = [];
        }
        return result;
    };
    //将所有方块向上移动
    GameView.prototype.upAllLine = function () {
        //从倒数第二行开始   依次往上移动
        var result = [];
        for (var i = 2; i <= 10; i++) {
            var r = this.upLine(i);
            for (var i_2 = 0; i_2 < r.length; i_2++) {
                result.push(r[i_2]);
            }
        }
        return result;
    };
    GameView.prototype.getCoverColumn = function (first, num) {
        var arr = [];
        for (var i = first; i < first + num; i++) {
            arr.push(i);
        }
        return arr;
    };
    GameView.prototype.handle_block_start = function (e) {
        var node = e.target;
        this._whiteHint.width = node.width;
        var world = node.parent.convertToWorldSpaceAR(node.position);
        var position = this._whiteHint.parent.convertToNodeSpaceAR(world);
        this._whiteHint.x = position.x;
        this._whiteHint.active = true;
        this.moveX = node.x;
    };
    GameView.prototype.handle_block_move = function (e) {
        var node = e.target;
        var a = e.getDelta();
        var world = node.parent.convertToWorldSpaceAR(node.position);
        var position = this._whiteHint.parent.convertToNodeSpaceAR(world);
        this._whiteHint.x = position.x;
        var line = Number(node.parent.name);
        var column = Number(node.name.split("_")[1]);
        var data = this.getCanMoveMax(line, column);
        // let position2 = node.parent.convertToNodeSpaceAR(e.getLocation())
        var x = node.x += a.x;
        if (data.min_x > x) {
            x = data.min_x;
        }
        else if (data.max_x < x) {
            x = data.max_x;
        }
        node.x = x;
    };
    GameView.prototype.getCanMoveMax = function (line, column) {
        var lineData = this._lineDatas[line];
        var right_column = -1;
        var num = 0;
        var left_column = column;
        for (var i = 0; i < lineData.blockNodes.length; i++) {
            var data = lineData.blockNodes[i];
            if (data.column == column) {
                num = data.num;
                right_column = data.cover[data.cover.length - 1];
            }
        }
        var max = 0;
        var min = 0;
        //寻找左右两边最大能够移动的距离
        while (true) {
            right_column++;
            if (right_column > 8) {
                max = right_column - 1;
                break;
            }
            var flag = true;
            for (var i = 0; i < lineData.blockNodes.length; i++) {
                var data = lineData.blockNodes[i];
                for (var j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == right_column) {
                        flag = false;
                        break;
                    }
                }
            }
            if (!flag) {
                max = right_column - 1;
                break;
            }
            else {
                max = right_column;
            }
        }
        while (true) {
            left_column--;
            if (left_column < 1) {
                min = left_column + 1;
                break;
            }
            var flag = true;
            for (var i = 0; i < lineData.blockNodes.length; i++) {
                var data = lineData.blockNodes[i];
                for (var j = 0; j < data.cover.length; j++) {
                    if (data.cover[j] == left_column) {
                        flag = false;
                        break;
                    }
                }
            }
            if (!flag) {
                min = left_column + 1;
                break;
            }
            else {
                min = left_column;
            }
        }
        var min_x = lineData.linePos[min];
        var max_x = lineData.linePos[max - num + 1];
        return {
            min_x: min_x,
            max_x: max_x
        };
    };
    GameView.prototype.handle_block_end = function (e) {
        var node = e.target;
        var line = Number(node.parent.name);
        var column = Number(node.name.split("_")[1]);
        this._whiteHint.active = false;
        var lineData = this._lineDatas[line];
        this.continueXiao = 0;
        for (var i = 1; i <= 8; i++) {
            var grid = lineData.line.getChildByName(i.toString());
            var position = cc.v2(grid.x + grid.width / 2, grid.y + grid.height / 2);
            if (node.getBoundingBox().contains(position)) {
                node.x = lineData.linePos[i];
                node.name = "c_" + i;
                for (var j = 0; j < lineData.blockNodes.length; j++) {
                    var bInfo = lineData.blockNodes[j];
                    if (bInfo.column == column) {
                        bInfo.column = i;
                        bInfo.cover = this.getCoverColumn(i, bInfo.num);
                        break;
                    }
                }
                break;
            }
        }
        if (node.x == this.moveX) {
            this.moveX = -1;
            return;
        }
        AudioMgr_1.default.play("move_end").then();
        Tools_1.default.vibrateShort();
        this.touchEndFlag = true;
        this.downAllLine(line);
    };
    //将一行方块向下移动
    GameView.prototype.downLine = function (line) {
        var _this = this;
        var result = [];
        var data = this._lineDatas[line];
        var needChange = [];
        var _loop_2 = function (i) {
            //循环需要下拉行的 所有方块
            var blockInfo = data.blockNodes[i];
            //判断每一个方块最多可以下降到哪一行
            var toLine = -1;
            for (var j = line + 1; j <= 10; j++) {
                var flag = true;
                var nextData = this_1._lineDatas[j];
                for (var k = 0; k < nextData.blockNodes.length; k++) {
                    var cover = nextData.blockNodes[k].cover;
                    if (Tools_1.default.judgeArraySame(blockInfo.cover, cover)) {
                        flag = false;
                    }
                }
                if (flag) {
                    toLine = j;
                }
                else {
                    break;
                }
            }
            if (toLine != -1) {
                needChange.push({
                    index: i,
                    to: toLine,
                });
                var p = new Promise(function (resolve, reject) {
                    var n = blockInfo.node;
                    cc.tween(n)
                        .to(config_1.default.downTime * 0.6, { y: -config_1.default.gridSize * (toLine - line) }, { easing: 'cubicInOut' })
                        .by(config_1.default.downTime * 0.2, { y: 10 })
                        .by(config_1.default.downTime * 0.2, { y: -10 })
                        .union()
                        .call(function () {
                        n.parent = _this._lineDatas[toLine].line;
                        n.y = 0;
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.blockNodes.length; i++) {
            _loop_2(i);
        }
        for (var i = needChange.length - 1; i >= 0; i--) {
            var cdata = needChange[i];
            this._lineDatas[cdata.to].blockNodes.push(data.blockNodes[cdata.index]);
            data.blockNodes.splice(cdata.index, 1);
        }
        return result;
    };
    //将所有方块向下移动
    GameView.prototype.downAllLine = function (line) {
        var _this = this;
        //从倒数第二行开始   依次往上移动
        this._mask.active = true;
        var result = [];
        for (var i = line; i >= 1; i--) {
            if (i == 10) {
                continue;
            }
            var r = this.downLine(i);
            for (var i_3 = 0; i_3 < r.length; i_3++) {
                result.push(r[i_3]);
            }
        }
        if (result.length > 0) {
            Promise.all(result).then(function () {
                AudioMgr_1.default.play("down").then();
                _this.scheduleOnce(function () {
                    _this.judgeAllCanClear();
                });
            });
        }
        else {
            this.judgeAllCanClear();
        }
        // return result
    };
    GameView.prototype.judgeLineCanClear = function (line) {
        var _this = this;
        var result = null;
        var blockData = this._lineDatas[line].blockNodes;
        //获取这个一行所有覆盖
        var allCover = [];
        for (var i = 0; i < blockData.length; i++) {
            blockData[i].cover.forEach(function (value) {
                allCover.push(value);
            });
        }
        if (allCover.length >= 8) {
            result = new Promise(function (resolve, reject) {
                cc.tween(_this._lineDatas[line].line)
                    .by(config_1.default.lineShake / 2, { x: -15 })
                    .by(config_1.default.lineShake / 2, { x: 15 })
                    // .by(gameConfig.lineShake / 30, {y: 2.5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {x: 5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: -5}, {easing: 'cubicInOut'})
                    // .by(gameConfig.lineShake / 30, {y: 2.5, x: -2.5}, {easing: 'cubicInOut'})
                    .union()
                    // .repeat(6)
                    .call(function () {
                    var line_data = _this._lineDatas[line];
                    for (var i = 0; i < blockData.length; i++) {
                        _this.returnBlock(blockData[i].node);
                    }
                    resolve(true);
                    line_data.blockNodes = [];
                })
                    .start();
            });
        }
        return result;
    };
    //判断所有行是否存在可以消除的行
    GameView.prototype.judgeAllCanClear = function () {
        var _this = this;
        var result = [];
        for (var i = 1; i <= 10; i++) {
            var r = this.judgeLineCanClear(i);
            if (r) {
                result.push(r);
            }
        }
        if (result.length > 0) {
            AudioMgr_1.default.play("xiaochu");
            Tools_1.default.vibrateShort("heavy");
            this.continueXiao += result.length;
            this.allContinueXiao += result.length;
            this.text_defen(result.length);
            this.text_addHard();
            Promise.all(result).then(function () {
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
                if (CacheMgr_1.default.isNeedHint) {
                    _this.hint_hint();
                }
            });
        }
        else {
            //没有需要消除的，需要判断一下是不是输了 ， 即第1层是不是有东西
            if (this._lineDatas[1].blockNodes.length > 0) {
                //todo 输了
                this.fail_win();
                return;
            }
            else if (this._lineDatas[9].blockNodes.length == 0) {
                this.touchEndFlag = false;
                this.makeBottomBlock();
            }
            else if (this.touchEndFlag) {
                this.touchEndFlag = false;
                this.makeBottomBlock();
            }
            else {
                this._mask.active = false;
            }
        }
        return result;
    };
    //适配边框
    GameView.prototype.adaptive = function () {
        var top = this._content_cover.getChildByName("top");
        var left = this._content_cover.getChildByName("left_wall");
        var right = this._content_cover.getChildByName("right_wall");
        var bottom = this._content_cover.getChildByName("bottom");
        var temp = this._lineDatas[1].line.getPosition();
        temp.y += config_1.default.gridSize;
        var left_top = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp));
        temp = Tools_1.default.getNodeFourPoint(this._lineDatas[10].line).right_down;
        var right_bottom = this._content_cover.convertToNodeSpaceAR(this._content.convertToWorldSpaceAR(temp));
        top.y = left_top.y;
        top.width = this._content.width + 20;
        top.getChildByName("scoreData").getComponent(cc.Widget).updateAlignment();
        top.getChildByName("hardLevel").getComponent(cc.Widget).updateAlignment();
        bottom.y = right_bottom.y;
        bottom.width = this._content.width + 20;
        left.height = this._content.height + 20;
        left.x = left_top.x;
        left.y = left_top.y - this._content.height / 2;
        right.height = this._content.height + 20;
        right.x = right_bottom.x;
        right.y = left_top.y - this._content.height / 2;
    };
    GameView.prototype.update = function () {
        this._scoreLabel.string = "当前得分:" + this.score;
        this._hardLevelLabel.string = "当前难度:" + this.hardLevel.toString();
        if (CacheMgr_1.default.setting.hammerNum > 0) {
            this._hammer_icon.active = false;
            this._hammer_sprite.active = true;
            // console.log("够 的1 ")
            this._hammer_sprite.getComponent(cc.Label).string = CacheMgr_1.default.setting.hammerNum.toString();
        }
        else {
            // console.log("不够1 ")
            this._hammer_sprite.active = false;
            this._hammer_icon.active = true;
        }
        if (CacheMgr_1.default.setting.spriteNum > 0) {
            // console.log("狗的2 ")
            this._sprite_icon.active = false;
            this._price_sprite.active = true;
            this._price_sprite.getComponent(cc.Label).string = CacheMgr_1.default.setting.spriteNum.toString();
        }
        else {
            // console.log("不够2 ")
            this._price_sprite.active = false;
            this._sprite_icon.active = true;
        }
    };
    //更新精灵节点
    GameView.prototype.updateSprite = function () {
        this.sprite_color = Tools_1.default.getRandom(1, 6);
        this._sprite.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = this.sprite_spriteFrame[this.sprite_color];
    };
    GameView.prototype.fail_win = function () {
        var _this = this;
        AudioMgr_1.default.play("fail");
        Tools_1.default.vibrateLong();
        var result = [];
        var time = 0;
        for (var i = 1; i <= 10; i++) {
            var lineData = this._lineDatas[i];
            lineData.blockNodes.forEach(function (value) {
                var node = value.node;
                var world = _this._mouth.parent.convertToWorldSpaceAR(_this._mouth.position);
                var position = node.parent.convertToNodeSpaceAR(world);
                position.x -= config_1.default.gridSize / 2;
                position.y -= config_1.default.gridSize / 2;
                // node.setAnchorPoint(0.5,0.5)
                var p = new Promise(function (resolve, reject) {
                    cc.tween(node)
                        .delay(time)
                        .bezierTo(config_1.default.blockFlyTime, cc.v2(Tools_1.default.getRandom(0, 500), Tools_1.default.getRandom(0, 500)), cc.v2(Tools_1.default.getRandom(0, 500), Tools_1.default.getRandom(0, 500)), cc.v2(position))
                        .call(function () {
                        node.active = false;
                        node.destroy();
                        resolve(true);
                    })
                        .start();
                });
                result.push(p);
                time += config_1.default.blockFlyTime;
            });
        }
        var isNewMax = false;
        CacheMgr_1.default.gold = CacheMgr_1.default.gold + this.score;
        if (this.score > CacheMgr_1.default.checkpoint) {
            CacheMgr_1.default.checkpoint = this.score;
            isNewMax = true;
        }
        Promise.all(result).then(function () {
            PanelMgr_1.default.INS.openPanel({
                panel: EndView_1.default,
                layer: PanelMgr_1.Layer.gameLayer,
                param: {
                    score: _this.score,
                    isNewMax: isNewMax
                },
                call: function () {
                    PanelMgr_1.default.INS.closePanel(GameView_1);
                }
            });
        });
    };
    GameView.prototype.text_defen = function (n) {
        var num = this.hardLevel * n * this.continueXiao;
        this.score += num;
        var node = null;
        node = cc.instantiate(this.get_prefab);
        node.children[0].getComponent(cc.Label).string = num.toString();
        this._textHint.addChild(node);
        if (this.continueXiao > 1) {
            node = cc.instantiate(this.nice_prefab);
            node.children[0].getComponent(cc.Label).string = this.continueXiao.toString();
            this._textHint.addChild(node);
        }
    };
    GameView.prototype.text_start = function () {
        AudioMgr_1.default.play("start");
        var text_prefab = cc.instantiate(this.start_prefab);
        // text_prefab.getComponent(cc.Label).string = "游戏开始"
        text_prefab.getComponent(text_1.default).delay = 5;
        // this._textHint.addChild(text_prefab)
        // text_prefab = cc.instantiate(this.text_prefab)
        // text_prefab.getComponent(Text).delay = 5
        // text_prefab.getComponent(cc.Label).string = "拖动方块，消除整行."
        this._textHint.addChild(text_prefab);
    };
    GameView.prototype.text_addHard = function () {
        if (this.hardLevel >= config_1.default.grade_of_difficulty_config.length - 1) {
            return;
        }
        if (this.allContinueXiao >= 10) {
            this.hardLevel++;
            this.allContinueXiao = 2;
            var text_prefab = cc.instantiate(this.hardUp_prefab);
            // text_prefab.getComponent(cc.Label).string = "难度提升，得分X" + this.hardLevel
            text_prefab.children[0].getComponent(cc.Label).string = this.hardLevel.toString();
            text_prefab.getComponent(text_1.default).delay = 5;
            this._textHint.addChild(text_prefab);
        }
    };
    GameView.prototype.handle_hammer = function () {
        var _this = this;
        if (this._hint_hammer.active) {
            return;
        }
        if (CacheMgr_1.default.setting.hammerNum <= 0) {
            Tools_1.default.handleVideo().then(function (res) {
                if (!res) {
                    return;
                }
                //判断是否存在3个的方块
                var dataBeChui = [];
                var _loop_4 = function (i) {
                    _this._lineDatas[i].blockNodes.forEach(function (value) {
                        if (value.num >= 3) {
                            dataBeChui.push({
                                line: i,
                                column: value.column
                            });
                        }
                    });
                };
                for (var i = 1; i <= 10; i++) {
                    _loop_4(i);
                }
                if (dataBeChui.length == 0) {
                    _this._hint_hammer.active = true;
                    // Tools.changeGold(gameConfig.price)
                    _this.scheduleOnce(function () {
                        _this._hint_hammer.active = false;
                    }, config_1.default.hide_hint_sprite);
                    CacheMgr_1.default.setting.hammerNum++;
                    CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                    return;
                }
                _this._mask.active = true;
                var pss = [];
                var needDelete = new Map();
                dataBeChui.forEach(function (value) {
                    var pp = new Promise(function (resolve, reject) {
                        var lineData = _this._lineDatas[value.line];
                        var idx = 0;
                        lineData.blockNodes.forEach(function (value2, index) {
                            if (value2.column == value.column) {
                                idx = index;
                            }
                        });
                        var oldBlock = lineData.blockNodes[idx];
                        var ps = [];
                        var _loop_5 = function (i) {
                            var h = cc.instantiate(_this.hammer_prefab);
                            h.width = config_1.default.gridSize;
                            h.height = config_1.default.gridSize;
                            var world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position);
                            _this._content.addChild(h);
                            h.position = h.parent.convertToNodeSpaceAR(world);
                            h.x += oldBlock.node.width / 2;
                            h.y += oldBlock.node.height / 2;
                            var p = new Promise(function (resolve, reject) {
                                cc.tween(h)
                                    .delay(0.5)
                                    .to(config_1.default.hammerRotation, { angle: 30 }, { easing: 'cubicInOut' })
                                    .call(function () {
                                    cc.tween(oldBlock.node)
                                        .by(config_1.default.lineShake / 2, { x: -15 })
                                        .by(config_1.default.lineShake / 2, { x: 15 })
                                        .union()
                                        .call(function () {
                                        h.active = false;
                                        h.destroy();
                                        var node = _this.getBlock(1, oldBlock.color);
                                        node.y = 0;
                                        node.x = lineData.linePos[oldBlock.cover[i]];
                                        node.name = "c_" + oldBlock.cover[i];
                                        lineData.line.addChild(node);
                                        lineData.blockNodes.push({
                                            node: node,
                                            column: oldBlock.cover[i],
                                            num: 1,
                                            cover: [oldBlock.cover[i]],
                                            color: oldBlock.color,
                                        });
                                        resolve(true);
                                    })
                                        .start();
                                })
                                    .start();
                            });
                            ps.push(p);
                        };
                        for (var i = 0; i < oldBlock.cover.length; i++) {
                            _loop_5(i);
                        }
                        Promise.all(ps).then(function () {
                            _this.returnBlock(oldBlock.node);
                            // needDelete.push({
                            //     line: value.line,
                            //     idx: idx
                            // })
                            if (!needDelete.has(value.line)) {
                                needDelete.set(value.line, []);
                            }
                            needDelete.get(value.line).push(idx);
                            // lineData.blockNodes.splice(idx, 1)
                            resolve(true);
                        });
                    });
                    pss.push(pp);
                });
                _this.scheduleOnce(function () {
                    AudioMgr_1.default.play("knock");
                }, 0.5);
                Promise.all(pss).then(function () {
                    _this._mask.active = false;
                    needDelete.forEach(function (value, key) {
                        for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools_1.default.JudgeValueInArr(i, value)) {
                                _this._lineDatas[key].blockNodes.splice(i, 1);
                            }
                        }
                    });
                    _this.scheduleOnce(function () {
                        _this.downAllLine(10);
                    }, 0);
                });
            });
        }
        else {
            //判断是否存在3个的方块
            var dataBeChui_1 = [];
            var _loop_3 = function (i) {
                this_2._lineDatas[i].blockNodes.forEach(function (value) {
                    if (value.num >= 3) {
                        dataBeChui_1.push({
                            line: i,
                            column: value.column
                        });
                    }
                });
            };
            var this_2 = this;
            for (var i = 1; i <= 10; i++) {
                _loop_3(i);
            }
            if (dataBeChui_1.length == 0) {
                this._hint_hammer.active = true;
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(function () {
                    _this._hint_hammer.active = false;
                }, config_1.default.hide_hint_sprite);
                return;
            }
            CacheMgr_1.default.setting.hammerNum--;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            this._mask.active = true;
            var pss_1 = [];
            var needDelete_1 = new Map();
            dataBeChui_1.forEach(function (value) {
                var pp = new Promise(function (resolve, reject) {
                    var lineData = _this._lineDatas[value.line];
                    var idx = 0;
                    lineData.blockNodes.forEach(function (value2, index) {
                        if (value2.column == value.column) {
                            idx = index;
                        }
                    });
                    var oldBlock = lineData.blockNodes[idx];
                    var ps = [];
                    var _loop_6 = function (i) {
                        var h = cc.instantiate(_this.hammer_prefab);
                        h.width = config_1.default.gridSize;
                        h.height = config_1.default.gridSize;
                        var world = oldBlock.node.parent.convertToWorldSpaceAR(oldBlock.node.position);
                        _this._content.addChild(h);
                        h.position = h.parent.convertToNodeSpaceAR(world);
                        h.x += oldBlock.node.width / 2;
                        h.y += oldBlock.node.height / 2;
                        var p = new Promise(function (resolve, reject) {
                            cc.tween(h)
                                .delay(0.5)
                                .to(config_1.default.hammerRotation, { angle: 30 }, { easing: 'cubicInOut' })
                                .call(function () {
                                cc.tween(oldBlock.node)
                                    .by(config_1.default.lineShake / 2, { x: -15 })
                                    .by(config_1.default.lineShake / 2, { x: 15 })
                                    .union()
                                    .call(function () {
                                    h.active = false;
                                    h.destroy();
                                    var node = _this.getBlock(1, oldBlock.color);
                                    node.y = 0;
                                    node.x = lineData.linePos[oldBlock.cover[i]];
                                    node.name = "c_" + oldBlock.cover[i];
                                    lineData.line.addChild(node);
                                    lineData.blockNodes.push({
                                        node: node,
                                        column: oldBlock.cover[i],
                                        num: 1,
                                        cover: [oldBlock.cover[i]],
                                        color: oldBlock.color,
                                    });
                                    resolve(true);
                                })
                                    .start();
                            })
                                .start();
                        });
                        ps.push(p);
                    };
                    for (var i = 0; i < oldBlock.cover.length; i++) {
                        _loop_6(i);
                    }
                    Promise.all(ps).then(function () {
                        _this.returnBlock(oldBlock.node);
                        // needDelete.push({
                        //     line: value.line,
                        //     idx: idx
                        // })
                        if (!needDelete_1.has(value.line)) {
                            needDelete_1.set(value.line, []);
                        }
                        needDelete_1.get(value.line).push(idx);
                        // lineData.blockNodes.splice(idx, 1)
                        resolve(true);
                    });
                });
                pss_1.push(pp);
            });
            this.scheduleOnce(function () {
                AudioMgr_1.default.play("knock");
            }, 0.5);
            Promise.all(pss_1).then(function () {
                _this._mask.active = false;
                needDelete_1.forEach(function (value, key) {
                    for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools_1.default.JudgeValueInArr(i, value)) {
                            _this._lineDatas[key].blockNodes.splice(i, 1);
                        }
                    }
                });
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
            });
        }
    };
    GameView.prototype.handle_sprite = function () {
        var _this = this;
        if (this._hint_sprite.active) {
            return;
        }
        if (CacheMgr_1.default.setting.spriteNum <= 0) {
            Tools_1.default.handleVideo().then(function (res) {
                if (!res) {
                    return;
                }
                var needDelData = new Map();
                var ps = [];
                var _loop_8 = function (i) {
                    var blockInfo = _this._lineDatas[i].blockNodes;
                    blockInfo.forEach(function (value, index) {
                        if (value.color == _this.sprite_color) {
                            if (!needDelData.has(i)) {
                                needDelData.set(i, []);
                            }
                            needDelData.get(i).push(index);
                            var sprite_node_1 = cc.instantiate(_this.sprite_prefab);
                            sprite_node_1.scale = config_1.default.gridSize / sprite_node_1.width;
                            _this.node.addChild(sprite_node_1);
                            sprite_node_1.position = sprite_node_1.parent.convertToNodeSpaceAR(_this._sprite.parent.convertToWorldSpaceAR(_this._sprite.position));
                            sprite_node_1.getComponent(cc.Sprite).spriteFrame = _this.sprite_spriteFrame[_this.sprite_color];
                            var p = new Promise(function (resolve, reject) {
                                var world = value.node.parent.convertToWorldSpaceAR(value.node.position);
                                var position = sprite_node_1.parent.convertToNodeSpaceAR(world);
                                position.x += value.node.width / 2;
                                position.y += value.node.height / 2;
                                cc.tween(sprite_node_1)
                                    .bezierTo(config_1.default.sprite_move, cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(position))
                                    .call(function () {
                                    cc.tween(sprite_node_1)
                                        .by(config_1.default.sprite_jump / 2, { y: 20 }, { easing: 'cubicInOut' })
                                        .by(config_1.default.sprite_jump / 2, { y: -20 }, { easing: 'cubicInOut' })
                                        .union()
                                        .call(function () {
                                        cc.tween(value.node)
                                            .by(config_1.default.lineShake / 2, { x: -15 })
                                            .by(config_1.default.lineShake / 2, { x: 15 })
                                            .union()
                                            .call(function () {
                                            sprite_node_1.active = false;
                                            value.node.active = false;
                                            value.node.destroy();
                                            resolve(true);
                                        })
                                            .start();
                                    })
                                        .start();
                                })
                                    .start();
                            });
                            ps.push(p);
                        }
                    });
                };
                //遍历颜色
                for (var i = 1; i <= 10; i++) {
                    _loop_8(i);
                }
                if (needDelData.size == 0) {
                    _this._hint_sprite.active = true;
                    // Tools.changeGold(gameConfig.price)
                    _this.scheduleOnce(function () {
                        _this._hint_sprite.active = false;
                    }, config_1.default.hide_hint_sprite);
                    CacheMgr_1.default.setting.spriteNum++;
                    CacheMgr_1.default.setting = CacheMgr_1.default.setting;
                    console.log("加上一次提示机会", CacheMgr_1.default.setting);
                    return;
                }
                // AudioMgr.play("sprite_move")
                _this._mask.active = true;
                Promise.all(ps).then(function () {
                    AudioMgr_1.default.play("sprite_xiaochu");
                    needDelData.forEach(function (value, key) {
                        for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                            if (Tools_1.default.JudgeValueInArr(i, value)) {
                                _this._lineDatas[key].blockNodes.splice(i, 1);
                            }
                        }
                    });
                    _this.updateSprite();
                    _this.scheduleOnce(function () {
                        _this.downAllLine(10);
                    }, 0);
                    _this._mask.active = false;
                });
            });
        }
        else {
            var needDelData_1 = new Map();
            var ps_1 = [];
            var _loop_7 = function (i) {
                var blockInfo = this_3._lineDatas[i].blockNodes;
                blockInfo.forEach(function (value, index) {
                    if (value.color == _this.sprite_color) {
                        if (!needDelData_1.has(i)) {
                            needDelData_1.set(i, []);
                        }
                        needDelData_1.get(i).push(index);
                        var sprite_node_2 = cc.instantiate(_this.sprite_prefab);
                        sprite_node_2.scale = config_1.default.gridSize / sprite_node_2.width;
                        _this.node.addChild(sprite_node_2);
                        sprite_node_2.position = sprite_node_2.parent.convertToNodeSpaceAR(_this._sprite.parent.convertToWorldSpaceAR(_this._sprite.position));
                        sprite_node_2.getComponent(cc.Sprite).spriteFrame = _this.sprite_spriteFrame[_this.sprite_color];
                        var p = new Promise(function (resolve, reject) {
                            var world = value.node.parent.convertToWorldSpaceAR(value.node.position);
                            var position = sprite_node_2.parent.convertToNodeSpaceAR(world);
                            position.x += value.node.width / 2;
                            position.y += value.node.height / 2;
                            cc.tween(sprite_node_2)
                                .bezierTo(config_1.default.sprite_move, cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(Tools_1.default.getRandom(-500, 500), Tools_1.default.getRandom(-500, 500)), cc.v2(position))
                                .call(function () {
                                cc.tween(sprite_node_2)
                                    .by(config_1.default.sprite_jump / 2, { y: 20 }, { easing: 'cubicInOut' })
                                    .by(config_1.default.sprite_jump / 2, { y: -20 }, { easing: 'cubicInOut' })
                                    .union()
                                    .call(function () {
                                    cc.tween(value.node)
                                        .by(config_1.default.lineShake / 2, { x: -15 })
                                        .by(config_1.default.lineShake / 2, { x: 15 })
                                        .union()
                                        .call(function () {
                                        sprite_node_2.active = false;
                                        value.node.active = false;
                                        value.node.destroy();
                                        resolve(true);
                                    })
                                        .start();
                                })
                                    .start();
                            })
                                .start();
                        });
                        ps_1.push(p);
                    }
                });
            };
            var this_3 = this;
            //遍历颜色
            for (var i = 1; i <= 10; i++) {
                _loop_7(i);
            }
            if (needDelData_1.size == 0) {
                this._hint_sprite.active = true;
                // Tools.changeGold(gameConfig.price)
                this.scheduleOnce(function () {
                    _this._hint_sprite.active = false;
                }, config_1.default.hide_hint_sprite);
                return;
            }
            CacheMgr_1.default.setting.spriteNum--;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            // AudioMgr.play("sprite_move")
            this._mask.active = true;
            Promise.all(ps_1).then(function () {
                AudioMgr_1.default.play("sprite_xiaochu");
                needDelData_1.forEach(function (value, key) {
                    for (var i = _this._lineDatas[key].blockNodes.length - 1; i >= 0; i--) {
                        if (Tools_1.default.JudgeValueInArr(i, value)) {
                            _this._lineDatas[key].blockNodes.splice(i, 1);
                        }
                    }
                });
                _this.updateSprite();
                _this.scheduleOnce(function () {
                    _this.downAllLine(10);
                }, 0);
                _this._mask.active = false;
            });
        }
    };
    GameView.prototype.handle_menu = function () {
        var _this = this;
        // this._menuPanel.active = !this._menuPanel.active
        if (this._menuPanel.y > this._menu.y) {
            if (this._menuPanel.y != this._menu.y + this._menu.height) {
                return;
            }
            tween(this._menuPanel)
                .to(config_1.default.menu_box_move, { y: this._menu.y }, { easing: 'cubicInOut' })
                .call(function () {
                _this.scheduleOnce(function () {
                    _this._menuPanel.active = false;
                });
            })
                .start();
        }
        else {
            this._menuPanel.active = true;
            tween(this._menuPanel)
                .to(config_1.default.menu_box_move, { y: this._menu.y + this._menu.height })
                .start();
        }
    };
    //重新开始
    GameView.prototype.handle_restart = function () {
        var _this = this;
        for (var i = 1; i <= 10; i++) {
            var lineData = this._lineDatas[i];
            lineData.blockNodes.forEach(function (value) {
                _this.returnBlock(value.node);
            });
            lineData.blockNodes = [];
        }
        this.continueXiao = 0;
        this.allContinueXiao = 0;
        this.hardLevel = 1;
        this.score = 0;
        this.makeBottomBlock(true);
    };
    //返回首页
    GameView.prototype.handle_return = function () {
        PanelMgr_1.default.INS.openPanel({
            panel: HomeView_1.default,
            layer: PanelMgr_1.Layer.gameLayer,
            call: function () {
                PanelMgr_1.default.INS.closePanel(GameView_1);
            }
        });
    };
    GameView.prototype.update_hintMask = function () {
        if (this._hint_mask) {
            this._hint_mask.children[0].x = -this._hint_mask.position.x;
            this._hint_mask.children[0].y = -this._hint_mask.position.y;
        }
    };
    GameView.prototype.hint_play = function () {
        var _this = this;
        this._hint_mask.active = true;
        this._hint_mask.width = this._lineDatas[10].line.width;
        this._hint_mask.height = this._lineDatas[10].line.height * 2;
        this._hint_mask.position = this._lineDatas[10].line.position;
        for (var i = 9; i <= 10; i++) {
            if (i == 10) {
                this._lineDatas[i].blockNodes.forEach(function (value) {
                    var node = value.node;
                    node.off(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
                    node.off(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
                    node.off(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
                    node.off(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
                });
            }
            else {
                this._lineDatas[i].blockNodes.forEach(function (value) {
                    if (value.column != 6) {
                        var node = value.node;
                        node.off(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
                        node.off(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
                        node.off(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
                        node.off(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
                    }
                });
            }
        }
        // this._hint_label.getComponent(cc.Label).string = "按住方块，向左拖动1格"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_1_spriteFrame;
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height;
        this._hint_label.active = true;
        this._hint_hand.active = true;
        this._hint_hand.width = config_1.default.gridSize;
        this._hint_hand.height = config_1.default.gridSize;
        var p = cc.v3(this._lineDatas[9].linePos[6]);
        var startWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p);
        var startPosition = this.node.convertToNodeSpaceAR(startWorld);
        startPosition.x += config_1.default.gridSize / 2;
        startPosition.y -= config_1.default.gridSize / 2;
        var p2 = cc.v3(this._lineDatas[9].linePos[5]);
        var endWorld = this._lineDatas[9].line.convertToWorldSpaceAR(p2);
        var endPosition = this.node.convertToNodeSpaceAR(endWorld);
        endPosition.y -= config_1.default.gridSize / 2;
        this._hint_hand.position = startPosition;
        tween(this._hint_hand)
            .to(config_1.default.hint_hand_move, { position: endPosition })
            .to(0, { position: startPosition })
            .union()
            .repeatForever()
            .start();
        this.update_hintMask();
    };
    GameView.prototype.hint_hint = function () {
        var _this = this;
        this._hint_mask.width = this._hintUI.width;
        this._hint_mask.height = this._hintUI.height;
        this._hint_mask.position = this._hintUI.position;
        this._hint_hand.active = false;
        // this._hint_label.getComponent(cc.Label).string = "这里是下一行即将出现的方块（点击空白继续）"
        this._hint_label.getComponent(cc.Sprite).spriteFrame = this.hint_2_spriteFrame;
        this._hint_label.y = this._hint_mask.y + this._hint_mask.height;
        this._hint_label.active = true;
        this.update_hintMask();
        this.hint_register();
        CacheMgr_1.default.isNeedHint = false;
        this._hint_mask.active = false;
        this.scheduleOnce(function () {
            tween(_this._hint_label)
                .to(1, { opacity: 0 })
                .call(function () {
                _this._hint_label.active = false;
            })
                .start();
        }, 4);
    };
    GameView.prototype.hint_register = function () {
        var _this = this;
        this._lineDatas[9].blockNodes.forEach(function (value) {
            var block = value.node;
            block.on(cc.Node.EventType.TOUCH_START, _this.handle_block_start, _this);
            block.on(cc.Node.EventType.TOUCH_MOVE, _this.handle_block_move, _this);
            block.on(cc.Node.EventType.TOUCH_END, _this.handle_block_end, _this);
            block.on(cc.Node.EventType.TOUCH_CANCEL, _this.handle_block_end, _this);
        });
    };
    //重写 gameBoxScroll 滚动方向
    GameView.prototype.gameBoxScrollViewDirection = function () {
        return "v";
    };
    var GameView_1;
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "graySpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "whiteSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hintBlockSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "text_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "hammer_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "sprite_prefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GameView.prototype, "sprite_spriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hint_1_spriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameView.prototype, "hint_2_spriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "start_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "hardUp_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "nice_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameView.prototype, "get_prefab", void 0);
    GameView = GameView_1 = __decorate([
        ccclass
    ], GameView);
    return GameView;
}(LayerPanel_1.default));
exports.default = GameView;

cc._RF.pop();