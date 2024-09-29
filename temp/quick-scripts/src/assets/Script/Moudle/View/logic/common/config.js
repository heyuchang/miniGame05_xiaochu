"use strict";
cc._RF.push(module, '209a5a0WahIgZHTzehy84h/', 'config');
// Script/Moudle/View/logic/common/config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../../../Common/Tools");
var CacheMgr_1 = require("../../../../Common/manage/CacheMgr");
var gameConfig = /** @class */ (function () {
    function gameConfig() {
    }
    //GameConfig
    gameConfig.gridSize = 90; // 格子长宽
    //生成方块空白格子区间
    gameConfig.bottomBlankMin = 1;
    gameConfig.bottomBlankMax = 3;
    gameConfig.price = 30; //道具金币
    //商城价格
    gameConfig.price_hammer = 200;
    gameConfig.price_sprite = 200;
    gameConfig.price_stamina = 300;
    //时间
    gameConfig.upTime = 0.3;
    gameConfig.downTime = 0.2;
    gameConfig.lineShake = 0.3;
    gameConfig.blockFlyTime = 0.1;
    gameConfig.hammerRotation = 0.1;
    gameConfig.hide_hint_sprite = 1; //隐藏提示图片时间
    gameConfig.sprite_move = 0.5;
    gameConfig.sprite_jump = 0.5;
    gameConfig.xinjilu = 2;
    gameConfig.hint_hand_move = 1; //提示手指移动时间
    gameConfig.menu_box_move = 0.2;
    //签到
    gameConfig.signData = [
        {
            type: 1,
            num: 300,
            title: "金币300",
            func: function (num) {
                Tools_1.default.changeGold(num);
            }
        },
        {
            type: 2,
            num: 2,
            title: "锤子2个",
            func: function (num) {
                CacheMgr_1.default.setting.hammerNum = CacheMgr_1.default.setting.hammerNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 3,
            num: 3,
            title: "恶魔3个",
            func: function (num) {
                CacheMgr_1.default.setting.spriteNum = CacheMgr_1.default.setting.spriteNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 1,
            num: 1000,
            title: "金币1000",
            func: function (num) {
                Tools_1.default.changeGold(num);
            }
        },
        {
            type: 2,
            num: 4,
            title: "锤子4个",
            func: function (num) {
                CacheMgr_1.default.setting.hammerNum = CacheMgr_1.default.setting.hammerNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
        {
            type: 3,
            num: 5,
            title: "恶魔5个",
            func: function (num) {
                CacheMgr_1.default.setting.spriteNum = CacheMgr_1.default.setting.spriteNum + num;
                CacheMgr_1.default.setting = CacheMgr_1.default.setting;
            }
        },
    ];
    gameConfig.singData7 = {
        type: [1, 2, 3],
        title: ["金币1000", "锤子2个", "恶魔2个"],
        func: function (num) {
            Tools_1.default.changeGold(1000 * num);
            CacheMgr_1.default.setting.hammerNum += 2 * num;
            CacheMgr_1.default.setting.spriteNum += 2 * num;
            CacheMgr_1.default.setting = CacheMgr_1.default.setting;
        }
    };
    //提示数据
    gameConfig.hint_data = [
        [
            {
                column: 1,
                num: 3
            },
            {
                column: 4,
                num: 1
            },
            {
                column: 6,
                num: 1
            },
            {
                column: 7,
                num: 2
            },
        ],
        [
            {
                column: 1,
                num: 3
            },
            {
                column: 4,
                num: 1
            },
            {
                column: 6,
                num: 1
            },
            {
                column: 7,
                num: 2
            },
        ]
    ];
    gameConfig.grade_of_difficulty_config = [
        null,
        { probability_1: 20, probability_2: 30, probability_3: 10, probability_4: 0 },
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        { probability_1: 50, probability_2: 40, probability_3: 20, probability_4: 10 },
        { probability_1: 40, probability_2: 50, probability_3: 30, probability_4: 20 },
        { probability_1: 40, probability_2: 60, probability_3: 40, probability_4: 30 },
        { probability_1: 30, probability_2: 70, probability_3: 50, probability_4: 40 },
        { probability_1: 20, probability_2: 30, probability_3: 60, probability_4: 60 },
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        { probability_1: 50, probability_2: 40, probability_3: 70, probability_4: 70 },
        { probability_1: 40, probability_2: 50, probability_3: 80, probability_4: 80 },
        { probability_1: 40, probability_2: 60, probability_3: 90, probability_4: 90 },
        { probability_1: 30, probability_2: 70, probability_3: 100, probability_4: 100 },
    ];
    return gameConfig;
}());
exports.default = gameConfig;

cc._RF.pop();