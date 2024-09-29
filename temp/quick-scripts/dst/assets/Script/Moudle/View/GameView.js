
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/GameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXEdhbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUF5RTtBQUN6RSw0Q0FBdUM7QUFDdkMscUNBQWdDO0FBQ2hDLDRDQUF1QztBQUN2QyxnREFBK0M7QUFDL0MsdUNBQWtDO0FBQ2xDLHlEQUFvRDtBQUNwRCx5REFBb0Q7QUFDcEQsdURBQWtEO0FBRWxELHlEQUE2RDtBQUM3RCxJQUFPLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3hCLHNEQUFpRDtBQUNqRCw4Q0FBeUM7QUFDekMsNkRBQXdEO0FBQ3hELHNEQUFpRDtBQUNqRCw4REFBeUQ7QUFFbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVU7SUFBaEQ7UUFBQSxxRUEwL0NDO1FBbi9DVyxnQkFBVSxHQUFRLEVBQUUsQ0FBQztRQUVyQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBRWhDLE1BQU07UUFDRSx5QkFBbUIsR0FBWSxJQUFJLENBQUE7UUFDbkMsOEJBQXdCLEdBQVksSUFBSSxDQUFBO1FBQ2hELE9BQU87UUFFQSxxQkFBZSxHQUFtQixJQUFJLENBQUE7UUFFdEMsc0JBQWdCLEdBQW1CLElBQUksQ0FBQTtRQUV2QywwQkFBb0IsR0FBbUIsSUFBSSxDQUFBO1FBRTNDLGlCQUFXLEdBQWMsSUFBSSxDQUFBO1FBRTdCLG1CQUFhLEdBQWMsSUFBSSxDQUFBO1FBRS9CLG1CQUFhLEdBQWMsSUFBSSxDQUFBO1FBRS9CLHdCQUFrQixHQUFxQixFQUFFLENBQUE7UUFHekMsd0JBQWtCLEdBQW1CLElBQUksQ0FBQTtRQUV6Qyx3QkFBa0IsR0FBbUIsSUFBSSxDQUFBO1FBR3pDLGtCQUFZLEdBQWMsSUFBSSxDQUFBO1FBRTlCLG1CQUFhLEdBQWMsSUFB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RSxDQUFDLE1BQU0sQ0FBQztpREFDZ0I7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDZTtJQTFDbEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTAvQzVCO0lBQUQsZUFBQztDQTEvQ0QsQUEwL0NDLENBMS9DcUMsb0JBQVUsR0EwL0MvQztrQkExL0NvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheWVyUGFuZWwsIHtVcmxJbmZvfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9MYXllci9MYXllclBhbmVsXCI7XHJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vLi4vQ29tbW9uL1Rvb2xzXCI7XHJcbmltcG9ydCBFbmRWaWV3IGZyb20gXCIuL0VuZFZpZXdcIjtcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vbG9naWMvY29tbW9uL3RleHRcIjtcclxuaW1wb3J0IGdhbWVDb25maWcgZnJvbSBcIi4vbG9naWMvY29tbW9uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgSG9tZVZpZXcgZnJvbSBcIi4vSG9tZVZpZXdcIjtcclxuaW1wb3J0IENhY2hlTWdyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0NhY2hlTWdyXCI7XHJcbmltcG9ydCBBdWRpb01nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9BdWRpb01nclwiO1xyXG5pbXBvcnQgTG9hZE1nciBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9Mb2FkTWdyXCI7XHJcbmltcG9ydCBDb25zdGFudCBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbnN0YW50XCI7XHJcbmltcG9ydCBQYW5lbE1nciwge0xheWVyfSBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9QYW5lbE1nclwiO1xyXG5pbXBvcnQgdHdlZW4gPSBjYy50d2VlbjtcclxuaW1wb3J0IFNob3dDb25maWcgZnJvbSBcIi4uLy4uL0NvbW1vbi9TaG93Q29uZmlnXCI7XHJcbmltcG9ydCBHbG9iYWwgZnJvbSBcIi4uLy4uL0NvbW1vbi9HbG9iYWxcIjtcclxuaW1wb3J0IFFnQmFubmVyIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0FwaS9RZ0Jhbm5lclwiO1xyXG5pbXBvcnQgRW1pdCBmcm9tIFwiLi4vLi4vQ29tbW9uL21hbmFnZS9FbWl0L0VtaXRcIjtcclxuaW1wb3J0IEVtaXREYXRhIGZyb20gXCIuLi8uLi9Db21tb24vbWFuYWdlL0VtaXQvRW1pdERhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVZpZXcgZXh0ZW5kcyBMYXllclBhbmVsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXJsKCk6IFVybEluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ1bmRsZTogXCJnYW1lVmlld1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcImdhbWVWaWV3XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9wYXJhbURhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX2J1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy90ZXN0XHJcbiAgICBwcml2YXRlIHRlc3RNYWtlQm90dG9tQmxvY2s6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHRlc3RSZWFkeU1ha2VCb3R0b21CbG9jazogY2MuTm9kZSA9IG51bGxcclxuICAgIC8vbG9naWNcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHB1YmxpYyBncmF5U3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIHdoaXRlU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIGhpbnRCbG9ja1Nwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgdGV4dF9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgaGFtbWVyX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBzcHJpdGVfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHB1YmxpYyBzcHJpdGVfc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHB1YmxpYyBoaW50XzFfc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgcHVibGljIGhpbnRfMl9zcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBzdGFydF9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgaGFyZFVwX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBuaWNlX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHB1YmxpYyBnZXRfcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXHJcblxyXG5cclxuICAgIHByaXZhdGUgX3N0YXJ0UG9pbnQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfaGludFVJOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfd2hpdGVIaW50OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfdGV4dEhpbnQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oYXJkTGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcbiAgICBwcml2YXRlIF9zY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgX21vdXRoOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfbWFzazogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hhbW1lcjogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX3Nwcml0ZTogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX21lbnU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9tZW51UGFuZWw6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfaGludF9oYW1tZXI6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oaW50X3Nwcml0ZTogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hpbnRfbWFzazogY2MuTm9kZSA9IG51bGxcclxuICAgIHByaXZhdGUgX2hpbnRfbGFiZWw6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oaW50X2hhbmQ6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfcHJpY2Vfc3ByaXRlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfc3ByaXRlX2ljb246IGNjLk5vZGUgPSBudWxsXHJcbiAgICBwcml2YXRlIF9oYW1tZXJfc3ByaXRlOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfaGFtbWVyX2ljb246IGNjLk5vZGUgPSBudWxsXHJcblxyXG5cclxuICAgIHByaXZhdGUgX2NvbnRlbnRfY292ZXI6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBfbGluZURhdGFzOiBsaW5lRGF0YVtdID0gW251bGxdXHJcbiAgICBwcml2YXRlIF9oaW50RGF0YTogbGluZURhdGEgPSBudWxsXHJcbiAgICBwcml2YXRlIGJsb2NrUG9vbDogY2MuTm9kZVBvb2wgPSBudWxsXHJcbiAgICBwcml2YXRlIG5leHRCbG9ja0luZm86IG5leHRCbG9ja0luZm8gW10gPSBbXVxyXG4gICAgcHJpdmF0ZSB0b3VjaEVuZEZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgcHJpdmF0ZSBoYXJkTGV2ZWw6IG51bWJlciA9IDFcclxuICAgIHByaXZhdGUgc2NvcmU6IG51bWJlciA9IDBcclxuICAgIHByaXZhdGUgY29udGludWVYaWFvOiBudW1iZXIgPSAwIC8vIOW9k+WJjei/nua2iFxyXG4gICAgcHJpdmF0ZSBhbGxDb250aW51ZVhpYW86IG51bWJlciA9IDAvL+W9k+WJjemavuW6puaAu+a2iOmZpFxyXG4gICAgcHJpdmF0ZSBtb3ZlWCA9IC0xXHJcbiAgICBwcml2YXRlIHNwcml0ZV9jb2xvcjogbnVtYmVyID0gMCAvL+eyvueBteminOiJslxyXG4gICAgcHJpdmF0ZSBoaW50RmxhZyA9IHRydWVcclxuXHJcbiAgICBwdWJsaWMgaW5pdFVJKCkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpFcclxuICAgICAgICB0aGlzLnRlc3RNYWtlQm90dG9tQmxvY2sgPSB0aGlzLmdldE5vZGUoXCJ0ZXN0VUkvbWFrZUJvdHRvbUJsb2NrXCIpXHJcbiAgICAgICAgdGhpcy50ZXN0UmVhZHlNYWtlQm90dG9tQmxvY2sgPSB0aGlzLmdldE5vZGUoXCJ0ZXN0VUkvcmVhZHltYWtlQm90dG9tQmxvY2tcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy50ZXN0TWFrZUJvdHRvbUJsb2NrLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLnRlc3RSZWFkeU1ha2VCb3R0b21CbG9jaywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5TWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSB0aGlzLmdldE5vZGUoXCJzdGFydFBvaW50XCIpXHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHRoaXMuZ2V0Tm9kZShcImNvbnRlbnRcIilcclxuICAgICAgICB0aGlzLl9jb250ZW50X2NvdmVyID0gdGhpcy5nZXROb2RlKFwiY29udGVudF9jb3ZlclwiKVxyXG4gICAgICAgIHRoaXMuX2hpbnRVSSA9IHRoaXMuZ2V0Tm9kZShcImhpbnRVSVwiKVxyXG4gICAgICAgIHRoaXMuX3doaXRlSGludCA9IHRoaXMuZ2V0Tm9kZShcIndoaXRlX2hpbnRcIilcclxuICAgICAgICB0aGlzLl90ZXh0SGludCA9IHRoaXMuZ2V0Tm9kZShcInRleHRIaW50XCIpXHJcbiAgICAgICAgdGhpcy5fbW91dGggPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9tb3V0aFwiKVxyXG4gICAgICAgIHRoaXMuX21hc2sgPSB0aGlzLmdldE5vZGUoXCJtYXNrXCIpXHJcbiAgICAgICAgdGhpcy5faGFtbWVyX3Nwcml0ZSA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL2hhbW1lci9wcmljZVwiKVxyXG4gICAgICAgIHRoaXMuX2hhbW1lcl9pY29uID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvaGFtbWVyL3ZlZGlvSWNvblwiKVxyXG4gICAgICAgIHRoaXMuX2hhbW1lcl9pY29uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvc3ByaXRlL3ByaWNlXCIpXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24gPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9zcHJpdGUvdmVkaW9JY29uXCIpXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sgPSB0aGlzLmdldE5vZGUoXCJoaW50X21hc2tcIilcclxuICAgICAgICB0aGlzLl9oaW50X21hc2suYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X2xhYmVsID0gdGhpcy5nZXROb2RlKFwiaGludF9sYWJlbFwiKVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQgPSB0aGlzLmdldE5vZGUoXCJoaW50X2hhbmRcIilcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5fbWVudSA9IHRoaXMuZ2V0Tm9kZShcImJvdHRvbVVJL21lbnVcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fbWVudSwgdGhpcy5oYW5kbGVfbWVudSlcclxuICAgICAgICB0aGlzLl9tZW51UGFuZWwgPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9tZW51UGFuZWxcIilcclxuICAgICAgICB0aGlzLl9tZW51UGFuZWwuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fbWVudVBhbmVsLmNoaWxkcmVuWzBdLCB0aGlzLmhhbmRsZV9yZXN0YXJ0KVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLl9tZW51UGFuZWwuY2hpbGRyZW5bMV0sIHRoaXMuaGFuZGxlX3JldHVybilcclxuXHJcbiAgICAgICAgdGhpcy5faGFtbWVyID0gdGhpcy5nZXROb2RlKFwiYm90dG9tVUkvaGFtbWVyXCIpXHJcbiAgICAgICAgLy8gdGhpcy5faGFtbWVyLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfaGFtbWVyLCB0aGlzKVxyXG4gICAgICAgIHRoaXMub25Ub3VjaCh0aGlzLl9oYW1tZXIsIHRoaXMuaGFuZGxlX2hhbW1lcilcclxuICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLmdldE5vZGUoXCJib3R0b21VSS9zcHJpdGVcIilcclxuICAgICAgICB0aGlzLm9uVG91Y2godGhpcy5fc3ByaXRlLCB0aGlzLmhhbmRsZV9zcHJpdGUpXHJcblxyXG4gICAgICAgIHRoaXMuX2hpbnRfaGFtbWVyID0gdGhpcy5nZXROb2RlKFwiaGludF9oYW1tZXJcIilcclxuICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICB0aGlzLl9oaW50X3Nwcml0ZSA9IHRoaXMuZ2V0Tm9kZShcImhpbnRfc3ByaXRlXCIpXHJcbiAgICAgICAgdGhpcy5faGludF9zcHJpdGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5faGFyZExldmVsTGFiZWwgPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9oYXJkTGV2ZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuX3Njb3JlTGFiZWwgPSB0aGlzLmdldE5vZGUoXCJjb250ZW50X2NvdmVyL3RvcC9zY29yZURhdGFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUoKVxyXG4gICAgICAgIC8v5Yib5bu65a+56LGh5rGgXHJcbiAgICAgICAgdGhpcy5ibG9ja1Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKVxyXG4gICAgICAgIGxldCBibG9ja0V4bSA9IG5ldyBjYy5Ob2RlKClcclxuICAgICAgICBibG9ja0V4bS54ID0gMFxyXG4gICAgICAgIGJsb2NrRXhtLnkgPSAwXHJcbiAgICAgICAgYmxvY2tFeG0uc2V0QW5jaG9yUG9pbnQoMCwgMClcclxuICAgICAgICBsZXQgc3ByaXRlID0gYmxvY2tFeG0uYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYmxvY2tFeG0pXHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tQb29sLnB1dChub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbnVQYW5lbC5wb3NpdGlvbiA9IHRoaXMuX21lbnUucG9zaXRpb25cclxuICAgICAgICAgICAgbGV0IGdyaWRFeG0gPSBuZXcgY2MuTm9kZSgpXHJcbiAgICAgICAgICAgIGdhbWVDb25maWcuZ3JpZFNpemUgPSB0aGlzLl9zdGFydFBvaW50LmhlaWdodCAvIDEwXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplICogOFxyXG4gICAgICAgICAgICB0aGlzLl9jb250ZW50LmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemUgKiAxMFxyXG4gICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQud2lkdGggPSB0aGlzLl9jb250ZW50LndpZHRoXHJcbiAgICAgICAgICAgIHRoaXMuX3doaXRlSGludC5oZWlnaHQgPSB0aGlzLl9jb250ZW50LmhlaWdodFxyXG4gICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQucGFyZW50ID0gdGhpcy5fY29udGVudFxyXG4gICAgICAgICAgICBncmlkRXhtLnNldEFuY2hvclBvaW50KDAsIDApXHJcbiAgICAgICAgICAgIGdyaWRFeG0ud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgIGdyaWRFeG0uaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICBncmlkRXhtLm9wYWNpdHkgPSAyMDBcclxuICAgICAgICAgICAgdGhpcy5faGludF9oYW5kLndpZHRoID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X2hhbmQuaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X2hhbmQuc2V0QW5jaG9yUG9pbnQoMCwgMClcclxuICAgICAgICAgICAgbGV0IGxpbmVDb250ZW50RXhtID0gbmV3IGNjLk5vZGUoKVxyXG4gICAgICAgICAgICBsaW5lQ29udGVudEV4bS5zZXRBbmNob3JQb2ludCgwLjUsIDApXHJcbiAgICAgICAgICAgIGxpbmVDb250ZW50RXhtLndpZHRoID0gZ3JpZEV4bS53aWR0aCAqIDhcclxuICAgICAgICAgICAgbGluZUNvbnRlbnRFeG0uaGVpZ2h0ID0gZ3JpZEV4bS5oZWlnaHRcclxuICAgICAgICAgICAgdGhpcy5faGludFVJLndpZHRoID0gbGluZUNvbnRlbnRFeG0ud2lkdGhcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gdGhpcy5fc3RhcnRQb2ludC5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgICAgIGxldCBncmlkQ29sb3JUZW1wID0gMCAgIC8vIDAg5rWF6ImyICAgMSAg5rex6ImyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA+PSAxOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lQ29udGVudCA9IGNjLmluc3RhbnRpYXRlKGxpbmVDb250ZW50RXhtKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQubmFtZSA9IGkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQueCA9IDBcclxuICAgICAgICAgICAgICAgIGxpbmVDb250ZW50LnkgPSBzdGFydFBvc2l0aW9uLnlcclxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24ueSArPSBsaW5lQ29udGVudC5oZWlnaHRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkQ2hpbGQobGluZUNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zRGF0YSA9IFRvb2xzLmdldE5vZGVGb3VyUG9pbnQobGluZUNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBsaW5lQ29udGVudC5zZXRBbmNob3JQb2ludCgwLCAwKVxyXG4gICAgICAgICAgICAgICAgbGluZUNvbnRlbnQucG9zaXRpb24gPSBjYy52Myhwb3NEYXRhLmxlZnRfZG93bilcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9oaW50VUkueCAhPSBsaW5lQ29udGVudC54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludFVJLnggPSBsaW5lQ29udGVudC54XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTm9kZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLl9oaW50VUksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVQb3M6IFstMV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZsYWdYID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50RGF0YS5saW5lUG9zW2ldID0gZmxhZ1hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1ggKz0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmbGFnWCA9IDBcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lUG9zQXJyOiBudW1iZXJbXSA9IFstMV0gLy/orrDlvZUgeCDovbRcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gY2MuaW5zdGFudGlhdGUoZ3JpZEV4bSlcclxuICAgICAgICAgICAgICAgICAgICBncmlkLm5hbWUgPSBqLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gZ3JpZC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT01cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZENvbG9yVGVtcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IDEgJiYgaSAhPSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ncmF5U3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2xvclRlbXAgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLndoaXRlU3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IDEgJiYgaSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLndoaXRlU3ByaXRlRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2xvclRlbXAgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmdyYXlTcHJpdGVGcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQueSA9IDBcclxuICAgICAgICAgICAgICAgICAgICBncmlkLnggPSBmbGFnWFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVQb3NBcnIucHVzaChncmlkLngpXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ1ggKz0gZ3JpZC53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDb250ZW50LmFkZENoaWxkKGdyaWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lRGF0YXNbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tOb2RlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbGluZUNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVBvczogbGluZVBvc0FyclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQueCA9IGxpbmVDb250ZW50LnhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQueSA9IGxpbmVDb250ZW50LnlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkYXB0aXZlKClcclxuICAgICAgICAgICAgbGluZUNvbnRlbnRFeG0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgIGdyaWRFeG0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0UG9pbnQuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9zdGFydCgpXHJcbiAgICAgICAgICAgIHRoaXMubWFrZUJvdHRvbUJsb2NrKHRydWUpXHJcbiAgICAgICAgfSwgMClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhwYXJhbTogYW55KSB7XHJcbiAgICAgICAgLy90b2RvIOmAu+i+kVxyXG5cclxuICAgICAgICBTaG93Q29uZmlnLnNob3coJ2dhbWVDb25maWcnKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5jb25maWcuZ2FtZUNvbmZpZy5iYW5uZXJTaG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLnNob3dCYW5uZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFFnQmFubmVyLmhpZGVCYW5uZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG5cclxuICAgICAgICBpZiAoR2xvYmFsLmNvbmZpZy5nYW1lQ29uZmlnLm5hdGl2ZUNvbmZpZy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgRW1pdC5pbnN0YW5jZSgpLmVtaXQoRW1pdERhdGEuQ0xPU0VfTkFUSVZFKSA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9kbyBsb2dpYyDmlrnms5VcclxuICAgIHByaXZhdGUgZ2V0QmxvY2soc2l6ZTogbnVtYmVyLCBjb2xvcjogbnVtYmVyID0gLTEpOiBjYy5Ob2RlIHtcclxuICAgICAgICBsZXQgYmxvY2sgPSB0aGlzLmJsb2NrUG9vbC5nZXQoKVxyXG4gICAgICAgIGJsb2NrLndpZHRoID0gc2l6ZSAqIGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBibG9jay5oZWlnaHQgPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuaGFuZGxlX2Jsb2NrX3N0YXJ0LCB0aGlzKVxyXG4gICAgICAgIGJsb2NrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuaGFuZGxlX2Jsb2NrX21vdmUsIHRoaXMpXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgTG9hZE1nci5sb2FkQXRsYXMoXCJ2aWV3L2dhbWVWaWV3L2Jsb2NrL3BcIikudGhlbigocDogY2MuU3ByaXRlQXRsYXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gKChjb2xvciAqIDEwKSArIHNpemUpXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHAuZ2V0U3ByaXRlRnJhbWUoaWQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgYmxvY2suZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGJsb2NrXHJcbiAgICB9XHJcblxyXG4gICAgLy/lvZLov5jmlrnlnZdcclxuICAgIHByaXZhdGUgcmV0dXJuQmxvY2sobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmhhbmRsZV9ibG9ja19zdGFydCwgdGhpcylcclxuICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgIG5vZGUucGFyZW50ID0gbnVsbFxyXG4gICAgICAgIG5vZGUueCA9IDBcclxuICAgICAgICBub2RlLnkgPSAwXHJcbiAgICAgICAgbm9kZS53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBub2RlLmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgICAgIHRoaXMuYmxvY2tQb29sLnB1dChub2RlKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8v6aKE5Yib5bu65pyA5L2O5bGC55qE5pa55Z2XXHJcbiAgICBwcml2YXRlIHJlYWR5TWFrZUJvdHRvbUJsb2NrKCkge1xyXG4gICAgICAgIC8v5YWI6ZqP5py66ZyA6KaB56m65Ye65p2l5Yeg5LiqXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbpnIDopoHmlrDmiYvmj5DnpLpcclxuICAgICAgICBpZiAoIUNhY2hlTWdyLmlzTmVlZEhpbnQgfHwgZ2FtZUNvbmZpZy5oaW50X2RhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgbGV0IGJsYW5rTnVtID0gVG9vbHMuZ2V0UmFuZG9tKGdhbWVDb25maWcuYm90dG9tQmxhbmtNaW4sIGdhbWVDb25maWcuYm90dG9tQmxhbmtNYXggKyAxKVxyXG4gICAgICAgICAgICBsZXQgYmxhbmtDb2x1bW5zOiBudW1iZXIgW10gPSBbXVxyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IFRvb2xzLmdldFJhbmRvbSgxLCA5KVxyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcgPSBUb29scy5KdWRnZVZhbHVlSW5BcnIoY29sdW1uLCBibGFua0NvbHVtbnMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYW5rQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPT0gYmxhbmtDb2x1bW5zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYmxhbmtDb2x1bW5zLnB1c2goY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJsYW5rQ29sdW1ucy5sZW5ndGggPj0gYmxhbmtOdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pWw57uE5Lit6L+e57ut55qE5LiA5q61XHJcbiAgICAgICAgICAgIGxldCBhbGxDb250aW51ZUFycjogbnVtYmVyIFtdIFtdID0gW11cclxuICAgICAgICAgICAgbGV0IGNvbnRpbnVlQXJyOiBudW1iZXIgW10gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLkp1ZGdlVmFsdWVJbkFycihpLCBibGFua0NvbHVtbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRpbnVlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsQ29udGludWVBcnIucHVzaChUb29scy5kZWVwQ2xvbmUoY29udGludWVBcnIpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZUFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlQXJyLnB1c2goaSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbENvbnRpbnVlQXJyLnB1c2goVG9vbHMuZGVlcENsb25lKGNvbnRpbnVlQXJyKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFsbEJsb2NrSW5mbzogbmV4dEJsb2NrSW5mb1tdID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDb250aW51ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NJbmZvcyA9IHRoaXMuZGVmaW5pdGlvbkJsb2NrVHlwZShUb29scy5kZWVwQ2xvbmUoYWxsQ29udGludWVBcnJbaV0pKVxyXG4gICAgICAgICAgICAgICAgYmxvY0luZm9zLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQmxvY2tJbmZvLnB1c2godmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJsb2NrSW5mbyA9IGFsbEJsb2NrSW5mb1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJsb2NrSW5mbyA9IGdhbWVDb25maWcuaGludF9kYXRhWzBdXHJcbiAgICAgICAgICAgIGdhbWVDb25maWcuaGludF9kYXRhLnNoaWZ0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVIaW50KClcclxuICAgIH1cclxuXHJcbiAgICAvL+agueaNruS4gOS4quS9jee9ruaVsOe7hOWumuS5iei/meS4gOe7hOaWueWdl+exu+Wei1xyXG4gICAgcHJpdmF0ZSBkZWZpbml0aW9uQmxvY2tUeXBlKGFycjogbnVtYmVyIFtdKTogbmV4dEJsb2NrSW5mb1tdIHtcclxuICAgICAgICBsZXQgYmxvY2tJbmZvczogbmV4dEJsb2NrSW5mb1tdID0gW11cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gYXJyLmxlbmd0aFxyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnIgWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKDAsIDQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChUb29scy5jaGVja1BlcihnYW1lQ29uZmlnLmdyYWRlX29mX2RpZmZpY3VsdHlfY29uZmlnW3RoaXMuaGFyZExldmVsXS5wcm9iYWJpbGl0eV8zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5mb3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogYXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnJbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFRvb2xzLmNoZWNrUGVyKGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWdbdGhpcy5oYXJkTGV2ZWxdLnByb2JhYmlsaXR5XzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmZvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBhcnJbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoMCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmxvY2tJbmZvc1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw5o+Q56S6XHJcbiAgICBwcml2YXRlIHVwZGF0ZUhpbnQoKSB7XHJcbiAgICAgICAgdGhpcy5faGludFVJLnJlbW92ZUFsbENoaWxkcmVuKClcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMubmV4dEJsb2NrSW5mb1tpXVxyXG4gICAgICAgICAgICBsZXQgaGludEJsb2NrID0gbmV3IGNjLk5vZGUoXCJoaW50QmxvY2tcIilcclxuICAgICAgICAgICAgaGludEJsb2NrLnNldEFuY2hvclBvaW50KDAsIDApXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGUgPSBoaW50QmxvY2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmhpbnRCbG9ja1Nwcml0ZUZyYW1lXHJcbiAgICAgICAgICAgIGhpbnRCbG9jay53aWR0aCA9IGluZm8ubnVtICogZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgICAgICBoaW50QmxvY2suaGVpZ2h0ID0gdGhpcy5faGludFVJLmhlaWdodFxyXG4gICAgICAgICAgICB0aGlzLl9oaW50VUkuYWRkQ2hpbGQoaGludEJsb2NrKVxyXG4gICAgICAgICAgICBoaW50QmxvY2sueSA9IDBcclxuICAgICAgICAgICAgaGludEJsb2NrLnggPSB0aGlzLl9oaW50RGF0YS5saW5lUG9zW2luZm8uY29sdW1uXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuacgOW6leWxgueahOS4gOWll+aWueWdl1xyXG4gICAgcHJpdmF0ZSBtYWtlQm90dG9tQmxvY2soaXNTdGFydCA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5TWFrZUJvdHRvbUJsb2NrKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMudXBBbGxMaW5lKClcclxuICAgICAgICBQcm9taXNlLmFsbChyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaWueWdl+WcqOS4i+S4gOWxglxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmV4dEJsb2NrSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVEYXRhID0gdGhpcy5fbGluZURhdGFzWzEwXVxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCbG9ja0luZm8gPSB0aGlzLm5leHRCbG9ja0luZm9baV1cclxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IFRvb2xzLmdldFJhbmRvbSgxLCA2KVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gdGhpcy5nZXRCbG9jayhuZXh0QmxvY2tJbmZvLm51bSwgY29sb3IpXHJcbiAgICAgICAgICAgICAgICBibG9jay5wYXJlbnQgPSBsaW5lRGF0YS5saW5lXHJcbiAgICAgICAgICAgICAgICBibG9jay5uYW1lID0gXCJjX1wiICsgbmV4dEJsb2NrSW5mby5jb2x1bW5cclxuICAgICAgICAgICAgICAgIGJsb2NrLnggPSBsaW5lRGF0YS5saW5lUG9zW25leHRCbG9ja0luZm8uY29sdW1uXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2NrSW5mbzogYmxvY2tJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGJsb2NrLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbmV4dEJsb2NrSW5mby5jb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtOiBuZXh0QmxvY2tJbmZvLm51bSxcclxuICAgICAgICAgICAgICAgICAgICBjb3ZlcjogdGhpcy5nZXRDb3ZlckNvbHVtbihuZXh0QmxvY2tJbmZvLmNvbHVtbiwgbmV4dEJsb2NrSW5mby5udW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5wdXNoKGJsb2NrSW5mbylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmVhZHlNYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICBpZiAoaXNTdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKENhY2hlTWdyLmlzTmVlZEhpbnQgJiYgdGhpcy5oaW50RmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludEZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludF9wbGF5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5LiA6KGM5pa55Z2X5ZCR5LiK56e75YqoXHJcbiAgICBwcml2YXRlIHVwTGluZShsaW5lOiBudW1iZXIpOiBhbnlbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICBsZXQgbmV4dERhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZSAtIDFdXHJcbiAgICAgICAgaWYgKGRhdGEuYmxvY2tOb2RlcyAmJiBkYXRhLmJsb2NrTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZXNEYXRhID0gZGF0YS5ibG9ja05vZGVzXHJcbiAgICAgICAgICAgIGxldCBuZXh0Tm9kZXNEYXRhID0gbmV4dERhdGEuYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSBub2Rlc0RhdGFbaV1cclxuICAgICAgICAgICAgICAgIG5leHROb2Rlc0RhdGEucHVzaChuKVxyXG4gICAgICAgICAgICAgICAgbi5ub2RlLnBhcmVudCA9IG5leHREYXRhLmxpbmVcclxuICAgICAgICAgICAgICAgIG4ubm9kZS55ID0gLWdhbWVDb25maWcuZ3JpZFNpemUgLy/lpoLmnpx5ID0gMCDnmoTor53vvIzlsLHmsqHmnInliqjnlLvlgZrkuoZcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG4ubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGdhbWVDb25maWcudXBUaW1lLCB7eTogMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuYmxvY2tOb2RlcyA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuaJgOacieaWueWdl+WQkeS4iuenu+WKqFxyXG4gICAgcHJpdmF0ZSB1cEFsbExpbmUoKTogYW55W10ge1xyXG4gICAgICAgIC8v5LuO5YCS5pWw56ys5LqM6KGM5byA5aeLICAg5L6d5qyh5b6A5LiK56e75YqoXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgciA9IHRoaXMudXBMaW5lKGkpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocltpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb3ZlckNvbHVtbihmaXJzdDogbnVtYmVyLCBudW06IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgYXJyOiBudW1iZXJbXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0OyBpIDwgZmlyc3QgKyBudW07IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaChpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVfYmxvY2tfc3RhcnQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gZS50YXJnZXRcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQud2lkdGggPSBub2RlLndpZHRoXHJcbiAgICAgICAgbGV0IHdvcmxkID0gbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKG5vZGUucG9zaXRpb24pXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5fd2hpdGVIaW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQueCA9IHBvc2l0aW9uLnhcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubW92ZVggPSBub2RlLnhcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9ibG9ja19tb3ZlKGUpIHtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGUudGFyZ2V0XHJcbiAgICAgICAgbGV0IGEgPSBlLmdldERlbHRhKClcclxuICAgICAgICBsZXQgd29ybGQgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5wb3NpdGlvbilcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLl93aGl0ZUhpbnQucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgIHRoaXMuX3doaXRlSGludC54ID0gcG9zaXRpb24ueFxyXG5cclxuICAgICAgICBsZXQgbGluZSA9IE51bWJlcihub2RlLnBhcmVudC5uYW1lKVxyXG4gICAgICAgIGxldCBjb2x1bW4gPSBOdW1iZXIobm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXSlcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0Q2FuTW92ZU1heChsaW5lLCBjb2x1bW4pXHJcbiAgICAgICAgLy8gbGV0IHBvc2l0aW9uMiA9IG5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSlcclxuICAgICAgICBsZXQgeCA9IG5vZGUueCArPSBhLng7XHJcbiAgICAgICAgaWYgKGRhdGEubWluX3ggPiB4KSB7XHJcbiAgICAgICAgICAgIHggPSBkYXRhLm1pbl94XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLm1heF94IDwgeCkge1xyXG4gICAgICAgICAgICB4ID0gZGF0YS5tYXhfeFxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLnggPSB4XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDYW5Nb3ZlTWF4KGxpbmU6IG51bWJlciwgY29sdW1uOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICBsZXQgcmlnaHRfY29sdW1uOiBudW1iZXIgPSAtMVxyXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IDBcclxuICAgICAgICBsZXQgbGVmdF9jb2x1bW46IG51bWJlciA9IGNvbHVtblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZURhdGEuYmxvY2tOb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgaWYgKGRhdGEuY29sdW1uID09IGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gZGF0YS5udW1cclxuICAgICAgICAgICAgICAgIHJpZ2h0X2NvbHVtbiA9IGRhdGEuY292ZXJbZGF0YS5jb3Zlci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXggPSAwXHJcbiAgICAgICAgbGV0IG1pbiA9IDBcclxuICAgICAgICAvL+Wvu+aJvuW3puWPs+S4pOi+ueacgOWkp+iDveWkn+enu+WKqOeahOi3neemu1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHJpZ2h0X2NvbHVtbisrXHJcbiAgICAgICAgICAgIGlmIChyaWdodF9jb2x1bW4gPiA4KSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSByaWdodF9jb2x1bW4gLSAxXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gdHJ1ZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVEYXRhLmJsb2NrTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbGluZURhdGEuYmxvY2tOb2Rlc1tpXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmNvdmVyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY292ZXJbal0gPT0gcmlnaHRfY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICAgIG1heCA9IHJpZ2h0X2NvbHVtbiAtIDFcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXggPSByaWdodF9jb2x1bW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBsZWZ0X2NvbHVtbi0tXHJcbiAgICAgICAgICAgIGlmIChsZWZ0X2NvbHVtbiA8IDEpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uICsgMVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lRGF0YS5ibG9ja05vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5jb3Zlci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvdmVyW2pdID09IGxlZnRfY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uICsgMVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGxlZnRfY29sdW1uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pbl94ID0gbGluZURhdGEubGluZVBvc1ttaW5dXHJcbiAgICAgICAgbGV0IG1heF94ID0gbGluZURhdGEubGluZVBvc1ttYXggLSBudW0gKyAxXVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5feDogbWluX3gsXHJcbiAgICAgICAgICAgIG1heF94OiBtYXhfeFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9ibG9ja19lbmQoZSkge1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gZS50YXJnZXRcclxuICAgICAgICBsZXQgbGluZSA9IE51bWJlcihub2RlLnBhcmVudC5uYW1lKVxyXG4gICAgICAgIGxldCBjb2x1bW4gPSBOdW1iZXIobm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXSlcclxuICAgICAgICB0aGlzLl93aGl0ZUhpbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbbGluZV1cclxuICAgICAgICB0aGlzLmNvbnRpbnVlWGlhbyA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSBsaW5lRGF0YS5saW5lLmdldENoaWxkQnlOYW1lKGkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gY2MudjIoZ3JpZC54ICsgZ3JpZC53aWR0aCAvIDIsIGdyaWQueSArIGdyaWQuaGVpZ2h0IC8gMilcclxuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0Qm91bmRpbmdCb3goKS5jb250YWlucyhwb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUueCA9IGxpbmVEYXRhLmxpbmVQb3NbaV1cclxuICAgICAgICAgICAgICAgIG5vZGUubmFtZSA9IFwiY19cIiArIGlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZURhdGEuYmxvY2tOb2Rlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiSW5mbyA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbal1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYkluZm8uY29sdW1uID09IGNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiSW5mby5jb2x1bW4gPSBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJJbmZvLmNvdmVyID0gdGhpcy5nZXRDb3ZlckNvbHVtbihpLCBiSW5mby5udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS54ID09IHRoaXMubW92ZVgpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IC0xXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01nci5wbGF5KFwibW92ZV9lbmRcIikudGhlbigpXHJcbiAgICAgICAgVG9vbHMudmlicmF0ZVNob3J0KClcclxuICAgICAgICB0aGlzLnRvdWNoRW5kRmxhZyA9IHRydWVcclxuICAgICAgICB0aGlzLmRvd25BbGxMaW5lKGxpbmUpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIbkuIDooYzmlrnlnZflkJHkuIvnp7vliqhcclxuICAgIHByaXZhdGUgZG93bkxpbmUobGluZTogbnVtYmVyKTogYW55W10ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fbGluZURhdGFzW2xpbmVdXHJcbiAgICAgICAgbGV0IG5lZWRDaGFuZ2U6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmJsb2NrTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/lvqrnjq/pnIDopoHkuIvmi4nooYznmoQg5omA5pyJ5pa55Z2XXHJcbiAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSBkYXRhLmJsb2NrTm9kZXNbaV1cclxuICAgICAgICAgICAgLy/liKTmlq3mr4/kuIDkuKrmlrnlnZfmnIDlpJrlj6/ku6XkuIvpmY3liLDlk6rkuIDooYxcclxuICAgICAgICAgICAgbGV0IHRvTGluZSA9IC0xXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBsaW5lICsgMTsgaiA8PSAxMDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0RGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tqXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBuZXh0RGF0YS5ibG9ja05vZGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdmVyID0gbmV4dERhdGEuYmxvY2tOb2Rlc1trXS5jb3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUb29scy5qdWRnZUFycmF5U2FtZShibG9ja0luZm8uY292ZXIsIGNvdmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvTGluZSA9IGpcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvTGluZSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbmVlZENoYW5nZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG9MaW5lLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuID0gYmxvY2tJbmZvLm5vZGVcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5kb3duVGltZSAqIDAuNiwge3k6IC1nYW1lQ29uZmlnLmdyaWRTaXplICogKHRvTGluZSAtIGxpbmUpfSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcuZG93blRpbWUgKiAwLjIsIHt5OiAxMH0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5kb3duVGltZSAqIDAuMiwge3k6IC0xMH0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLnBhcmVudCA9IHRoaXMuX2xpbmVEYXRhc1t0b0xpbmVdLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4ueSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSBuZWVkQ2hhbmdlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjZGF0YSA9IG5lZWRDaGFuZ2VbaV1cclxuICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2NkYXRhLnRvXS5ibG9ja05vZGVzLnB1c2goZGF0YS5ibG9ja05vZGVzW2NkYXRhLmluZGV4XSlcclxuICAgICAgICAgICAgZGF0YS5ibG9ja05vZGVzLnNwbGljZShjZGF0YS5pbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5omA5pyJ5pa55Z2X5ZCR5LiL56e75YqoXHJcbiAgICBwcml2YXRlIGRvd25BbGxMaW5lKGxpbmU6IG51bWJlcikge1xyXG4gICAgICAgIC8v5LuO5YCS5pWw56ys5LqM6KGM5byA5aeLICAg5L6d5qyh5b6A5LiK56e75YqoXHJcbiAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGxpbmU7IGkgPj0gMTsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5kb3duTGluZShpKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJbaV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcImRvd25cIikudGhlbigpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdWRnZUFsbENhbkNsZWFyKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qdWRnZUFsbENhbkNsZWFyKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGp1ZGdlTGluZUNhbkNsZWFyKGxpbmUpOiBhbnkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsXHJcbiAgICAgICAgbGV0IGJsb2NrRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tsaW5lXS5ibG9ja05vZGVzXHJcbiAgICAgICAgLy/ojrflj5bov5nkuKrkuIDooYzmiYDmnInopobnm5ZcclxuICAgICAgICBsZXQgYWxsQ292ZXIgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJsb2NrRGF0YVtpXS5jb3Zlci5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxsQ292ZXIucHVzaCh2YWx1ZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFsbENvdmVyLmxlbmd0aCA+PSA4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuX2xpbmVEYXRhc1tsaW5lXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAyLCB7eDogMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IDIuNX0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLmJ5KGdhbWVDb25maWcubGluZVNoYWtlIC8gMzAsIHt4OiA1fSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IC01fSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAzMCwge3k6IDIuNSwgeDogLTIuNX0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAucmVwZWF0KDYpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZV9kYXRhID0gdGhpcy5fbGluZURhdGFzW2xpbmVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVybkJsb2NrKGJsb2NrRGF0YVtpXS5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZV9kYXRhLmJsb2NrTm9kZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5omA5pyJ6KGM5piv5ZCm5a2Y5Zyo5Y+v5Lul5raI6Zmk55qE6KGMXHJcbiAgICBwcml2YXRlIGp1ZGdlQWxsQ2FuQ2xlYXIoKTogYW55W10ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueVtdID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5qdWRnZUxpbmVDYW5DbGVhcihpKVxyXG4gICAgICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcInhpYW9jaHVcIilcclxuICAgICAgICAgICAgVG9vbHMudmlicmF0ZVNob3J0KFwiaGVhdnlcIilcclxuICAgICAgICAgICAgdGhpcy5jb250aW51ZVhpYW8gKz0gcmVzdWx0Lmxlbmd0aFxyXG4gICAgICAgICAgICB0aGlzLmFsbENvbnRpbnVlWGlhbyArPSByZXN1bHQubGVuZ3RoXHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9kZWZlbihyZXN1bHQubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aGlzLnRleHRfYWRkSGFyZCgpXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duQWxsTGluZSgxMClcclxuICAgICAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FjaGVNZ3IuaXNOZWVkSGludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGludF9oaW50KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+ayoeaciemcgOimgea2iOmZpOeahO+8jOmcgOimgeWIpOaWreS4gOS4i+aYr+S4jeaYr+i+k+S6hiDvvIwg5Y2z56ysMeWxguaYr+S4jeaYr+acieS4nOilv1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGluZURhdGFzWzFdLmJsb2NrTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvIOi+k+S6hlxyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsX3dpbigpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9saW5lRGF0YXNbOV0uYmxvY2tOb2Rlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEVuZEZsYWcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlQm90dG9tQmxvY2soKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hFbmRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoRW5kRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VCb3R0b21CbG9jaygpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIC8v6YCC6YWN6L655qGGXHJcbiAgICBwcml2YXRlIGFkYXB0aXZlKCkge1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl9jb250ZW50X2NvdmVyLmdldENoaWxkQnlOYW1lKFwidG9wXCIpXHJcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl9jb250ZW50X2NvdmVyLmdldENoaWxkQnlOYW1lKFwibGVmdF93YWxsXCIpXHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5fY29udGVudF9jb3Zlci5nZXRDaGlsZEJ5TmFtZShcInJpZ2h0X3dhbGxcIilcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5fY29udGVudF9jb3Zlci5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLl9saW5lRGF0YXNbMV0ubGluZS5nZXRQb3NpdGlvbigpXHJcbiAgICAgICAgdGVtcC55ICs9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICBsZXQgbGVmdF90b3AgPSB0aGlzLl9jb250ZW50X2NvdmVyLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuX2NvbnRlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRlbXApKVxyXG5cclxuICAgICAgICB0ZW1wID0gVG9vbHMuZ2V0Tm9kZUZvdXJQb2ludCh0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUpLnJpZ2h0X2Rvd25cclxuICAgICAgICBsZXQgcmlnaHRfYm90dG9tID0gdGhpcy5fY29udGVudF9jb3Zlci5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLl9jb250ZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0ZW1wKSlcclxuXHJcbiAgICAgICAgdG9wLnkgPSBsZWZ0X3RvcC55XHJcbiAgICAgICAgdG9wLndpZHRoID0gdGhpcy5fY29udGVudC53aWR0aCArIDIwXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic2NvcmVEYXRhXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiaGFyZExldmVsXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpXHJcbiAgICAgICAgYm90dG9tLnkgPSByaWdodF9ib3R0b20ueVxyXG4gICAgICAgIGJvdHRvbS53aWR0aCA9IHRoaXMuX2NvbnRlbnQud2lkdGggKyAyMFxyXG4gICAgICAgIGxlZnQuaGVpZ2h0ID0gdGhpcy5fY29udGVudC5oZWlnaHQgKyAyMFxyXG4gICAgICAgIGxlZnQueCA9IGxlZnRfdG9wLnhcclxuICAgICAgICBsZWZ0LnkgPSBsZWZ0X3RvcC55IC0gdGhpcy5fY29udGVudC5oZWlnaHQgLyAyXHJcblxyXG4gICAgICAgIHJpZ2h0LmhlaWdodCA9IHRoaXMuX2NvbnRlbnQuaGVpZ2h0ICsgMjBcclxuICAgICAgICByaWdodC54ID0gcmlnaHRfYm90dG9tLnhcclxuICAgICAgICByaWdodC55ID0gbGVmdF90b3AueSAtIHRoaXMuX2NvbnRlbnQuaGVpZ2h0IC8gMlxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLl9zY29yZUxhYmVsLnN0cmluZyA9IFwi5b2T5YmN5b6X5YiGOlwiICsgdGhpcy5zY29yZVxyXG4gICAgICAgIHRoaXMuX2hhcmRMZXZlbExhYmVsLnN0cmluZyA9IFwi5b2T5YmN6Zq+5bqmOlwiICsgdGhpcy5oYXJkTGV2ZWwudG9TdHJpbmcoKVxyXG5cclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lcl9pY29uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lcl9zcHJpdGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWknyDnmoQxIFwiKVxyXG4gICAgICAgICAgICB0aGlzLl9oYW1tZXJfc3ByaXRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0udG9TdHJpbmcoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LiN5aSfMSBcIilcclxuICAgICAgICAgICAgdGhpcy5faGFtbWVyX3Nwcml0ZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9oYW1tZXJfaWNvbi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi54uX55qEMiBcIilcclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlX2ljb24uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0udG9TdHJpbmcoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5LiN5aSfMiBcIilcclxuICAgICAgICAgICAgdGhpcy5fcHJpY2Vfc3ByaXRlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZV9pY29uLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu05paw57K+54G16IqC54K5XHJcbiAgICB1cGRhdGVTcHJpdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVfY29sb3IgPSBUb29scy5nZXRSYW5kb20oMSwgNilcclxuICAgICAgICB0aGlzLl9zcHJpdGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcHJpdGVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9zcHJpdGVGcmFtZVt0aGlzLnNwcml0ZV9jb2xvcl1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZhaWxfd2luKCkge1xyXG4gICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJmYWlsXCIpXHJcbiAgICAgICAgVG9vbHMudmlicmF0ZUxvbmcoKVxyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5lRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1tpXVxyXG4gICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHZhbHVlLm5vZGVcclxuICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX21vdXRoLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5fbW91dGgucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICAgICAgICAgIC8vIG5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LDAuNSlcclxuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5ibG9ja0ZseVRpbWUsIGNjLnYyKFRvb2xzLmdldFJhbmRvbSgwLCA1MDApLCBUb29scy5nZXRSYW5kb20oMCwgNTAwKSksIGNjLnYyKFRvb2xzLmdldFJhbmRvbSgwLCA1MDApLCBUb29scy5nZXRSYW5kb20oMCwgNTAwKSksIGNjLnYyKHBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwKTtcclxuICAgICAgICAgICAgICAgIHRpbWUgKz0gZ2FtZUNvbmZpZy5ibG9ja0ZseVRpbWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNOZXdNYXggPSBmYWxzZTtcclxuICAgICAgICBDYWNoZU1nci5nb2xkID0gQ2FjaGVNZ3IuZ29sZCArIHRoaXMuc2NvcmU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPiBDYWNoZU1nci5jaGVja3BvaW50KSB7XHJcbiAgICAgICAgICAgIENhY2hlTWdyLmNoZWNrcG9pbnQgPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgICAgICBpc05ld01heCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb21pc2UuYWxsKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIFBhbmVsTWdyLklOUy5vcGVuUGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgcGFuZWwgOiBFbmRWaWV3LFxyXG4gICAgICAgICAgICAgICAgbGF5ZXIgOiBMYXllci5nYW1lTGF5ZXIsXHJcbiAgICAgICAgICAgICAgICBwYXJhbSA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSA6IHRoaXMuc2NvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNOZXdNYXggOiBpc05ld01heFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGwgOiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEdhbWVWaWV3KSA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXh0X2RlZmVuKG46IG51bWJlcikge1xyXG4gICAgICAgIGxldCBudW0gPSB0aGlzLmhhcmRMZXZlbCAqIG4gKiB0aGlzLmNvbnRpbnVlWGlhb1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gbnVtXHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsXHJcbiAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ2V0X3ByZWZhYilcclxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbnVtLnRvU3RyaW5nKClcclxuICAgICAgICB0aGlzLl90ZXh0SGludC5hZGRDaGlsZChub2RlKVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRpbnVlWGlhbyA+IDEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubmljZV9wcmVmYWIpXHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmNvbnRpbnVlWGlhby50b1N0cmluZygpXHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRIaW50LmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGV4dF9zdGFydCgpIHtcclxuICAgICAgICBBdWRpb01nci5wbGF5KFwic3RhcnRcIilcclxuICAgICAgICBsZXQgdGV4dF9wcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJ0X3ByZWZhYilcclxuICAgICAgICAvLyB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5ri45oiP5byA5aeLXCJcclxuICAgICAgICB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoVGV4dCkuZGVsYXkgPSA1XHJcbiAgICAgICAgLy8gdGhpcy5fdGV4dEhpbnQuYWRkQ2hpbGQodGV4dF9wcmVmYWIpXHJcbiAgICAgICAgLy8gdGV4dF9wcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRleHRfcHJlZmFiKVxyXG4gICAgICAgIC8vIHRleHRfcHJlZmFiLmdldENvbXBvbmVudChUZXh0KS5kZWxheSA9IDVcclxuICAgICAgICAvLyB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5ouW5Yqo5pa55Z2X77yM5raI6Zmk5pW06KGMLlwiXHJcbiAgICAgICAgdGhpcy5fdGV4dEhpbnQuYWRkQ2hpbGQodGV4dF9wcmVmYWIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXh0X2FkZEhhcmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFyZExldmVsID49IGdhbWVDb25maWcuZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsQ29udGludWVYaWFvID49IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFyZExldmVsKytcclxuICAgICAgICAgICAgdGhpcy5hbGxDb250aW51ZVhpYW8gPSAyXHJcbiAgICAgICAgICAgIGxldCB0ZXh0X3ByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFyZFVwX3ByZWZhYilcclxuICAgICAgICAgICAgLy8gdGV4dF9wcmVmYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumavuW6puaPkOWNh++8jOW+l+WIhlhcIiArIHRoaXMuaGFyZExldmVsXHJcbiAgICAgICAgICAgIHRleHRfcHJlZmFiLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5oYXJkTGV2ZWwudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB0ZXh0X3ByZWZhYi5nZXRDb21wb25lbnQoVGV4dCkuZGVsYXkgPSA1XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRIaW50LmFkZENoaWxkKHRleHRfcHJlZmFiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9oYW1tZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hpbnRfaGFtbWVyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDYWNoZU1nci5zZXR0aW5nLmhhbW1lck51bSA8PSAwKSB7XHJcbiAgICAgICAgICAgIFRvb2xzLmhhbmRsZVZpZGVvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyoM+S4queahOaWueWdl1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFCZUNodWk6IGFueSBbXSA9IFtdXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2ldLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm51bSA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhQmVDaHVpLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiB2YWx1ZS5jb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFCZUNodWkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9vbHMuY2hhbmdlR29sZChnYW1lQ29uZmlnLnByaWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludF9oYW1tZXIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9LCBnYW1lQ29uZmlnLmhpZGVfaGludF9zcHJpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0rK1xyXG4gICAgICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBsZXQgcHNzID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBuZWVkRGVsZXRlOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyW10+KClcclxuICAgICAgICAgICAgICAgIGRhdGFCZUNodWkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lRGF0YSA9IHRoaXMuX2xpbmVEYXRhc1t2YWx1ZS5saW5lXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlMiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZTIuY29sdW1uID09IHZhbHVlLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRCbG9jayA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZEJsb2NrLmNvdmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFtbWVyX3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgud2lkdGggPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmhlaWdodCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IG9sZEJsb2NrLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihvbGRCbG9jay5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGVudC5hZGRDaGlsZChoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5wb3NpdGlvbiA9IGgucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC54ICs9IG9sZEJsb2NrLm5vZGUud2lkdGggLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLnkgKz0gb2xkQmxvY2subm9kZS5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMC41KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5oYW1tZXJSb3RhdGlvbiwge2FuZ2xlOiAzMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG9sZEJsb2NrLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcubGluZVNoYWtlIC8gMiwge3g6IC0xNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRCbG9jaygxLCBvbGRCbG9jay5jb2xvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS55ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnggPSBsaW5lRGF0YS5saW5lUG9zW29sZEJsb2NrLmNvdmVyW2ldXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSBcImNfXCIgKyBvbGRCbG9jay5jb3ZlcltpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5saW5lLmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhLmJsb2NrTm9kZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBvbGRCbG9jay5jb3ZlcltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyOiBbb2xkQmxvY2suY292ZXJbaV1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9sZEJsb2NrLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzLnB1c2gocClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVybkJsb2NrKG9sZEJsb2NrLm5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkRGVsZXRlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxpbmU6IHZhbHVlLmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWR4OiBpZHhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxldGUuaGFzKHZhbHVlLmxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZERlbGV0ZS5zZXQodmFsdWUubGluZSwgW10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkRGVsZXRlLmdldCh2YWx1ZS5saW5lKS5wdXNoKGlkeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmVEYXRhLmJsb2NrTm9kZXMuc3BsaWNlKGlkeCwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHBzcy5wdXNoKHBwKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJrbm9ja1wiKVxyXG4gICAgICAgICAgICAgICAgfSwgMC41KVxyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocHNzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZERlbGV0ZS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9saW5lRGF0YXNba2V5XS5ibG9ja05vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5a2Y5ZyoM+S4queahOaWueWdl1xyXG4gICAgICAgICAgICBsZXQgZGF0YUJlQ2h1aTogYW55IFtdID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2ldLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubnVtID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJlQ2h1aS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHZhbHVlLmNvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGFCZUNodWkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfaGFtbWVyLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIC8vIFRvb2xzLmNoYW5nZUdvbGQoZ2FtZUNvbmZpZy5wcmljZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X2hhbW1lci5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgZ2FtZUNvbmZpZy5oaWRlX2hpbnRfc3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcuaGFtbWVyTnVtLS1cclxuICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBwc3MgPSBbXVxyXG4gICAgICAgICAgICBsZXQgbmVlZERlbGV0ZTogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcltdPigpXHJcbiAgICAgICAgICAgIGRhdGFCZUNodWkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbdmFsdWUubGluZV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhLmJsb2NrTm9kZXMuZm9yRWFjaCgodmFsdWUyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUyLmNvbHVtbiA9PSB2YWx1ZS5jb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbGRCbG9jayA9IGxpbmVEYXRhLmJsb2NrTm9kZXNbaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRCbG9jay5jb3Zlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGFtbWVyX3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC5oZWlnaHQgPSBnYW1lQ29uZmlnLmdyaWRTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JsZCA9IG9sZEJsb2NrLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihvbGRCbG9jay5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50LmFkZENoaWxkKGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGgucG9zaXRpb24gPSBoLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC54ICs9IG9sZEJsb2NrLm5vZGUud2lkdGggLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGgueSArPSBvbGRCbG9jay5ub2RlLmhlaWdodCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSgwLjUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGdhbWVDb25maWcuaGFtbWVyUm90YXRpb24sIHthbmdsZTogMzB9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4ob2xkQmxvY2subm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0QmxvY2soMSwgb2xkQmxvY2suY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS55ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUueCA9IGxpbmVEYXRhLmxpbmVQb3Nbb2xkQmxvY2suY292ZXJbaV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5uYW1lID0gXCJjX1wiICsgb2xkQmxvY2suY292ZXJbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YS5saW5lLmFkZENoaWxkKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBvbGRCbG9jay5jb3ZlcltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3ZlcjogW29sZEJsb2NrLmNvdmVyW2ldXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG9sZEJsb2NrLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHBzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5CbG9jayhvbGRCbG9jay5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkRGVsZXRlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGluZTogdmFsdWUubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlkeDogaWR4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVlZERlbGV0ZS5oYXModmFsdWUubGluZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxldGUuc2V0KHZhbHVlLmxpbmUsIFtdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxldGUuZ2V0KHZhbHVlLmxpbmUpLnB1c2goaWR4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lRGF0YS5ibG9ja05vZGVzLnNwbGljZShpZHgsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHBzcy5wdXNoKHBwKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnBsYXkoXCJrbm9ja1wiKVxyXG4gICAgICAgICAgICB9LCAwLjUpXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKHBzcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBuZWVkRGVsZXRlLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fbGluZURhdGFzW2tleV0uYmxvY2tOb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZURhdGFzW2tleV0uYmxvY2tOb2Rlcy5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVfc3ByaXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9oaW50X3Nwcml0ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENhY2hlTWdyLnNldHRpbmcuc3ByaXRlTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgVG9vbHMuaGFuZGxlVmlkZW8oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWREZWxEYXRhOiBNYXA8bnVtYmVyLCBudW1iZXJbXT4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyW10+KClcclxuICAgICAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAvL+mBjeWOhuminOiJslxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5mby5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNvbG9yID09IHRoaXMuc3ByaXRlX2NvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxEYXRhLmhhcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLnNldChpLCBbXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLmdldChpKS5wdXNoKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ZV9ub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zcHJpdGVfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUuc2NhbGUgPSBnYW1lQ29uZmlnLmdyaWRTaXplIC8gc3ByaXRlX25vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZV9ub2RlLnBvc2l0aW9uID0gc3ByaXRlX25vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuX3Nwcml0ZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuX3Nwcml0ZS5wb3NpdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlX3Nwcml0ZUZyYW1lW3RoaXMuc3ByaXRlX2NvbG9yXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmxkID0gdmFsdWUubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHZhbHVlLm5vZGUucG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gc3ByaXRlX25vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKz0gdmFsdWUubm9kZS53aWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ICs9IHZhbHVlLm5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHNwcml0ZV9ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5zcHJpdGVfbW92ZSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIocG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAyMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJ5KGdhbWVDb25maWcuc3ByaXRlX2p1bXAgLyAyLCB7eTogLTIwfSwge2Vhc2luZzogJ2N1YmljSW5PdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odmFsdWUubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAtMTV9LClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5ub2RlLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKHApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWREZWxEYXRhLnNpemUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfc3ByaXRlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBUb29scy5jaGFuZ2VHb2xkKGdhbWVDb25maWcucHJpY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaW50X3Nwcml0ZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGdhbWVDb25maWcuaGlkZV9oaW50X3Nwcml0ZSlcclxuICAgICAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSsrXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOS4iuS4gOasoeaPkOekuuacuuS8mlwiLCBDYWNoZU1nci5zZXR0aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQXVkaW9NZ3IucGxheShcInNwcml0ZV9tb3ZlXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHBzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBdWRpb01nci5wbGF5KFwic3ByaXRlX3hpYW9jaHVcIilcclxuICAgICAgICAgICAgICAgICAgICBuZWVkRGVsRGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9saW5lRGF0YXNba2V5XS5ibG9ja05vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVG9vbHMuSnVkZ2VWYWx1ZUluQXJyKGksIHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3ByaXRlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuZWVkRGVsRGF0YTogTWFwPG51bWJlciwgbnVtYmVyW10+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcltdPigpXHJcbiAgICAgICAgICAgIGxldCBwcyA9IFtdXHJcbiAgICAgICAgICAgIC8v6YGN5Y6G6aKc6ImyXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBibG9ja0luZm8gPSB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlc1xyXG4gICAgICAgICAgICAgICAgYmxvY2tJbmZvLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5jb2xvciA9PSB0aGlzLnNwcml0ZV9jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWREZWxEYXRhLmhhcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZERlbERhdGEuc2V0KGksIFtdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWREZWxEYXRhLmdldChpKS5wdXNoKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ByaXRlX25vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNwcml0ZV9wcmVmYWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZV9ub2RlLnNjYWxlID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIHNwcml0ZV9ub2RlLndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUucG9zaXRpb24gPSBzcHJpdGVfbm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5fc3ByaXRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5fc3ByaXRlLnBvc2l0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlX25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZV9zcHJpdGVGcmFtZVt0aGlzLnNwcml0ZV9jb2xvcl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd29ybGQgPSB2YWx1ZS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodmFsdWUubm9kZS5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHNwcml0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKz0gdmFsdWUubm9kZS53aWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKz0gdmFsdWUubm9kZS5oZWlnaHQgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcHJpdGVfbm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmV6aWVyVG8oZ2FtZUNvbmZpZy5zcHJpdGVfbW92ZSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIoVG9vbHMuZ2V0UmFuZG9tKC01MDAsIDUwMCksIFRvb2xzLmdldFJhbmRvbSgtNTAwLCA1MDApKSwgY2MudjIocG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oc3ByaXRlX25vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAyMH0sIHtlYXNpbmc6ICdjdWJpY0luT3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5zcHJpdGVfanVtcCAvIDIsIHt5OiAtMjB9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih2YWx1ZS5ub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYnkoZ2FtZUNvbmZpZy5saW5lU2hha2UgLyAyLCB7eDogLTE1fSwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ieShnYW1lQ29uZmlnLmxpbmVTaGFrZSAvIDIsIHt4OiAxNX0sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5pb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVfbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUubm9kZS5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHMucHVzaChwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5lZWREZWxEYXRhLnNpemUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGludF9zcHJpdGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gVG9vbHMuY2hhbmdlR29sZChnYW1lQ29uZmlnLnByaWNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpbnRfc3ByaXRlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCBnYW1lQ29uZmlnLmhpZGVfaGludF9zcHJpdGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bS0tXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgIC8vIEF1ZGlvTWdyLnBsYXkoXCJzcHJpdGVfbW92ZVwiKVxyXG4gICAgICAgICAgICB0aGlzLl9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQXVkaW9NZ3IucGxheShcInNwcml0ZV94aWFvY2h1XCIpXHJcbiAgICAgICAgICAgICAgICBuZWVkRGVsRGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFRvb2xzLkp1ZGdlVmFsdWVJbkFycihpLCB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1trZXldLmJsb2NrTm9kZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTcHJpdGUoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bkFsbExpbmUoMTApXHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFzay5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZV9tZW51KCkge1xyXG4gICAgICAgIC8vIHRoaXMuX21lbnVQYW5lbC5hY3RpdmUgPSAhdGhpcy5fbWVudVBhbmVsLmFjdGl2ZVxyXG4gICAgICAgIGlmICh0aGlzLl9tZW51UGFuZWwueSA+IHRoaXMuX21lbnUueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWVudVBhbmVsLnkgIT0gdGhpcy5fbWVudS55ICsgdGhpcy5fbWVudS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR3ZWVuKHRoaXMuX21lbnVQYW5lbClcclxuICAgICAgICAgICAgICAgIC50byhnYW1lQ29uZmlnLm1lbnVfYm94X21vdmUsIHt5OiB0aGlzLl9tZW51Lnl9LCB7ZWFzaW5nOiAnY3ViaWNJbk91dCd9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lbnVQYW5lbC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tZW51UGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0d2Vlbih0aGlzLl9tZW51UGFuZWwpXHJcbiAgICAgICAgICAgICAgICAudG8oZ2FtZUNvbmZpZy5tZW51X2JveF9tb3ZlLCB7eTogdGhpcy5fbWVudS55ICsgdGhpcy5fbWVudS5oZWlnaHR9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIHByaXZhdGUgaGFuZGxlX3Jlc3RhcnQoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbGluZURhdGEgPSB0aGlzLl9saW5lRGF0YXNbaV1cclxuICAgICAgICAgICAgbGluZURhdGEuYmxvY2tOb2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5CbG9jayh2YWx1ZS5ub2RlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsaW5lRGF0YS5ibG9ja05vZGVzID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250aW51ZVhpYW8gPSAwXHJcbiAgICAgICAgdGhpcy5hbGxDb250aW51ZVhpYW8gPSAwXHJcbiAgICAgICAgdGhpcy5oYXJkTGV2ZWwgPSAxXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDBcclxuICAgICAgICB0aGlzLm1ha2VCb3R0b21CbG9jayh0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+U5Zue6aaW6aG1XHJcbiAgICBwcml2YXRlIGhhbmRsZV9yZXR1cm4oKSB7XHJcbiAgICAgICAgUGFuZWxNZ3IuSU5TLm9wZW5QYW5lbCh7XHJcbiAgICAgICAgICAgIHBhbmVsIDogSG9tZVZpZXcsXHJcbiAgICAgICAgICAgIGxheWVyIDogTGF5ZXIuZ2FtZUxheWVyLFxyXG4gICAgICAgICAgICBjYWxsIDogKCk9PntcclxuICAgICAgICAgICAgICAgIFBhbmVsTWdyLklOUy5jbG9zZVBhbmVsKEdhbWVWaWV3KSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVfaGludE1hc2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hpbnRfbWFzaykge1xyXG4gICAgICAgICAgICB0aGlzLl9oaW50X21hc2suY2hpbGRyZW5bMF0ueCA9IC10aGlzLl9oaW50X21hc2sucG9zaXRpb24ueFxyXG4gICAgICAgICAgICB0aGlzLl9oaW50X21hc2suY2hpbGRyZW5bMF0ueSA9IC10aGlzLl9oaW50X21hc2sucG9zaXRpb24ueVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaW50X3BsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5faGludF9tYXNrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sud2lkdGggPSB0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUud2lkdGhcclxuICAgICAgICB0aGlzLl9oaW50X21hc2suaGVpZ2h0ID0gdGhpcy5fbGluZURhdGFzWzEwXS5saW5lLmhlaWdodCAqIDJcclxuICAgICAgICB0aGlzLl9oaW50X21hc2sucG9zaXRpb24gPSB0aGlzLl9saW5lRGF0YXNbMTBdLmxpbmUucG9zaXRpb25cclxuICAgICAgICBmb3IgKGxldCBpID0gOTsgaSA8PSAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lRGF0YXNbaV0uYmxvY2tOb2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdmFsdWUubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmhhbmRsZV9ibG9ja19zdGFydCwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVEYXRhc1tpXS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNvbHVtbiAhPSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gdmFsdWUubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5oYW5kbGVfYmxvY2tfc3RhcnQsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuaGFuZGxlX2Jsb2NrX21vdmUsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oYW5kbGVfYmxvY2tfZW5kLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuaGFuZGxlX2Jsb2NrX2VuZCwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaMieS9j+aWueWdl++8jOWQkeW3puaLluWKqDHmoLxcIlxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmhpbnRfMV9zcHJpdGVGcmFtZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwueSA9IHRoaXMuX2hpbnRfbWFzay55ICsgdGhpcy5faGludF9tYXNrLmhlaWdodFxyXG4gICAgICAgIHRoaXMuX2hpbnRfbGFiZWwuYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfaGFuZC53aWR0aCA9IGdhbWVDb25maWcuZ3JpZFNpemVcclxuICAgICAgICB0aGlzLl9oaW50X2hhbmQuaGVpZ2h0ID0gZ2FtZUNvbmZpZy5ncmlkU2l6ZVxyXG4gICAgICAgIGxldCBwID0gY2MudjModGhpcy5fbGluZURhdGFzWzldLmxpbmVQb3NbNl0pXHJcbiAgICAgICAgbGV0IHN0YXJ0V29ybGQgPSB0aGlzLl9saW5lRGF0YXNbOV0ubGluZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocClcclxuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydFdvcmxkKVxyXG5cclxuICAgICAgICBzdGFydFBvc2l0aW9uLnggKz0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuICAgICAgICBzdGFydFBvc2l0aW9uLnkgLT0gZ2FtZUNvbmZpZy5ncmlkU2l6ZSAvIDJcclxuXHJcbiAgICAgICAgbGV0IHAyID0gY2MudjModGhpcy5fbGluZURhdGFzWzldLmxpbmVQb3NbNV0pXHJcbiAgICAgICAgbGV0IGVuZFdvcmxkID0gdGhpcy5fbGluZURhdGFzWzldLmxpbmUuY29udmVydFRvV29ybGRTcGFjZUFSKHAyKVxyXG4gICAgICAgIGxldCBlbmRQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmRXb3JsZClcclxuICAgICAgICBlbmRQb3NpdGlvbi55IC09IGdhbWVDb25maWcuZ3JpZFNpemUgLyAyXHJcbiAgICAgICAgdGhpcy5faGludF9oYW5kLnBvc2l0aW9uID0gc3RhcnRQb3NpdGlvblxyXG4gICAgICAgIHR3ZWVuKHRoaXMuX2hpbnRfaGFuZClcclxuICAgICAgICAgICAgLnRvKGdhbWVDb25maWcuaGludF9oYW5kX21vdmUsIHtwb3NpdGlvbjogZW5kUG9zaXRpb259KVxyXG4gICAgICAgICAgICAudG8oMCwge3Bvc2l0aW9uOiBzdGFydFBvc2l0aW9ufSlcclxuICAgICAgICAgICAgLnVuaW9uKClcclxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZV9oaW50TWFzaygpXHJcbiAgICB9XHJcblxyXG4gICAgaGludF9oaW50KCkge1xyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay53aWR0aCA9IHRoaXMuX2hpbnRVSS53aWR0aFxyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay5oZWlnaHQgPSB0aGlzLl9oaW50VUkuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5faGludF9tYXNrLnBvc2l0aW9uID0gdGhpcy5faGludFVJLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5faGludF9oYW5kLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIHRoaXMuX2hpbnRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIui/memHjOaYr+S4i+S4gOihjOWNs+WwhuWHuueOsOeahOaWueWdl++8iOeCueWHu+epuueZvee7p+e7re+8iVwiXHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaGludF8yX3Nwcml0ZUZyYW1lXHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC55ID0gdGhpcy5faGludF9tYXNrLnkgKyB0aGlzLl9oaW50X21hc2suaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5faGludF9sYWJlbC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy51cGRhdGVfaGludE1hc2soKVxyXG4gICAgICAgIHRoaXMuaGludF9yZWdpc3RlcigpXHJcblxyXG4gICAgICAgIENhY2hlTWdyLmlzTmVlZEhpbnQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuX2hpbnRfbWFzay5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdHdlZW4odGhpcy5faGludF9sYWJlbClcclxuICAgICAgICAgICAgICAgIC50bygxLCB7b3BhY2l0eTogMH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGludF9sYWJlbC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSwgNClcclxuICAgIH1cclxuXHJcbiAgICBoaW50X3JlZ2lzdGVyKCkge1xyXG4gICAgICAgIHRoaXMuX2xpbmVEYXRhc1s5XS5ibG9ja05vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBibG9jayA9IHZhbHVlLm5vZGVcclxuICAgICAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuaGFuZGxlX2Jsb2NrX3N0YXJ0LCB0aGlzKVxyXG4gICAgICAgICAgICBibG9jay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLmhhbmRsZV9ibG9ja19tb3ZlLCB0aGlzKVxyXG4gICAgICAgICAgICBibG9jay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuaGFuZGxlX2Jsb2NrX2VuZCwgdGhpcylcclxuICAgICAgICAgICAgYmxvY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLmhhbmRsZV9ibG9ja19lbmQsIHRoaXMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+mHjeWGmSBnYW1lQm94U2Nyb2xsIOa7muWKqOaWueWQkVxyXG4gICAgcHJvdGVjdGVkIGdhbWVCb3hTY3JvbGxWaWV3RGlyZWN0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwidlwiXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5pbnRlcmZhY2UgbGluZURhdGEge1xyXG4gICAgbGluZTogY2MuTm9kZVxyXG4gICAgbGluZVBvczogbnVtYmVyW11cclxuICAgIGJsb2NrTm9kZXM6IGJsb2NrSW5mb1tdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgbmV4dEJsb2NrSW5mbyB7XHJcbiAgICBudW06IG51bWJlclxyXG4gICAgY29sdW1uOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIGJsb2NrSW5mbyB7XHJcbiAgICBub2RlOiBjYy5Ob2RlLFxyXG4gICAgY29sdW1uOiBudW1iZXIsXHJcbiAgICBudW06IG51bWJlcixcclxuICAgIGNvdmVyOiBudW1iZXJbXSxcclxuICAgIGNvbG9yOiBudW1iZXJcclxufVxyXG4iXX0=