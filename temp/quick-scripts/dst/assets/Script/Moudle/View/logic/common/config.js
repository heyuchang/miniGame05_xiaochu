
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Moudle/View/logic/common/config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNb3VkbGVcXFZpZXdcXGxvZ2ljXFxjb21tb25cXGNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUE2QztBQUM3QywrREFBMEQ7QUFFMUQ7SUFBQTtJQW9KQSxDQUFDO0lBbkpHLFlBQVk7SUFDRSxtQkFBUSxHQUFXLEVBQUUsQ0FBQSxDQUFFLE9BQU87SUFDNUMsWUFBWTtJQUNFLHlCQUFjLEdBQVcsQ0FBQyxDQUFBO0lBQzFCLHlCQUFjLEdBQVcsQ0FBQyxDQUFBO0lBRTFCLGdCQUFLLEdBQVcsRUFBRSxDQUFBLENBQUMsTUFBTTtJQUN2QyxNQUFNO0lBQ1EsdUJBQVksR0FBVyxHQUFHLENBQUE7SUFDMUIsdUJBQVksR0FBVyxHQUFHLENBQUE7SUFDMUIsd0JBQWEsR0FBVyxHQUFHLENBQUE7SUFDekMsSUFBSTtJQUNVLGlCQUFNLEdBQVcsR0FBRyxDQUFBO0lBQ3BCLG1CQUFRLEdBQVcsR0FBRyxDQUFBO0lBQ3RCLG9CQUFTLEdBQVcsR0FBRyxDQUFBO0lBQ3ZCLHVCQUFZLEdBQVcsR0FBRyxDQUFBO0lBQzFCLHlCQUFjLEdBQVcsR0FBRyxDQUFBO0lBQzVCLDJCQUFnQixHQUFXLENBQUMsQ0FBQSxDQUFDLFVBQVU7SUFDdkMsc0JBQVcsR0FBVyxHQUFHLENBQUE7SUFDekIsc0JBQVcsR0FBVyxHQUFHLENBQUE7SUFDekIsa0JBQU8sR0FBVyxDQUFDLENBQUE7SUFDbkIseUJBQWMsR0FBVyxDQUFDLENBQUEsQ0FBQyxVQUFVO0lBQ3JDLHdCQUFhLEdBQVcsR0FBRyxDQUFBO0lBQ3pDLElBQUk7SUFDVSxtQkFBUSxHQUFlO1FBQ2pDO1lBQ0ksSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsR0FBRztZQUNSLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLFVBQUMsR0FBVztnQkFDZCxlQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pC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LENBQUM7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVDtZQUNEO2dCQUNJLE1BQU0sRUFBRSxDQUFDO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1Q7WUFDRDtnQkFDSSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsQ0FBQzthQUNUO1NBQ0o7S0FDSixDQUFBO0lBQ2EscUNBQTBCLEdBQWtDO1FBQ3RFLElBQUk7UUFDSixFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUM7UUFDM0UsOEVBQThFO1FBQzlFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsRUFBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFDO1FBQzVFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsOEVBQThFO1FBQzlFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUM1RSxFQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFDNUUsRUFBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFDO1FBQzVFLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBQztLQUNqRixDQUFBO0lBQ0wsaUJBQUM7Q0FwSkQsQUFvSkMsSUFBQTtrQkFwSm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge25leHRCbG9ja0luZm99IGZyb20gXCIuLi8uLi9HYW1lVmlld1wiO1xyXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9Ub29sc1wiO1xyXG5pbXBvcnQgQ2FjaGVNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9tYW5hZ2UvQ2FjaGVNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVDb25maWcge1xyXG4gICAgLy9HYW1lQ29uZmlnXHJcbiAgICBwdWJsaWMgc3RhdGljIGdyaWRTaXplOiBudW1iZXIgPSA5MCAgLy8g5qC85a2Q6ZW/5a69XHJcbiAgICAvL+eUn+aIkOaWueWdl+epuueZveagvOWtkOWMuumXtFxyXG4gICAgcHVibGljIHN0YXRpYyBib3R0b21CbGFua01pbjogbnVtYmVyID0gMVxyXG4gICAgcHVibGljIHN0YXRpYyBib3R0b21CbGFua01heDogbnVtYmVyID0gM1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcHJpY2U6IG51bWJlciA9IDMwIC8v6YGT5YW36YeR5biBXHJcbiAgICAvL+WVhuWfjuS7t+agvFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9oYW1tZXI6IG51bWJlciA9IDIwMFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9zcHJpdGU6IG51bWJlciA9IDIwMFxyXG4gICAgcHVibGljIHN0YXRpYyBwcmljZV9zdGFtaW5hOiBudW1iZXIgPSAzMDBcclxuICAgIC8v5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIHVwVGltZTogbnVtYmVyID0gMC4zXHJcbiAgICBwdWJsaWMgc3RhdGljIGRvd25UaW1lOiBudW1iZXIgPSAwLjJcclxuICAgIHB1YmxpYyBzdGF0aWMgbGluZVNoYWtlOiBudW1iZXIgPSAwLjNcclxuICAgIHB1YmxpYyBzdGF0aWMgYmxvY2tGbHlUaW1lOiBudW1iZXIgPSAwLjFcclxuICAgIHB1YmxpYyBzdGF0aWMgaGFtbWVyUm90YXRpb246IG51bWJlciA9IDAuMVxyXG4gICAgcHVibGljIHN0YXRpYyBoaWRlX2hpbnRfc3ByaXRlOiBudW1iZXIgPSAxIC8v6ZqQ6JeP5o+Q56S65Zu+54mH5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIHNwcml0ZV9tb3ZlOiBudW1iZXIgPSAwLjVcclxuICAgIHB1YmxpYyBzdGF0aWMgc3ByaXRlX2p1bXA6IG51bWJlciA9IDAuNVxyXG4gICAgcHVibGljIHN0YXRpYyB4aW5qaWx1OiBudW1iZXIgPSAyXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpbnRfaGFuZF9tb3ZlOiBudW1iZXIgPSAxIC8v5o+Q56S65omL5oyH56e75Yqo5pe26Ze0XHJcbiAgICBwdWJsaWMgc3RhdGljIG1lbnVfYm94X21vdmU6IG51bWJlciA9IDAuMlxyXG4gICAgLy/nrb7liLBcclxuICAgIHB1YmxpYyBzdGF0aWMgc2lnbkRhdGE6IHNpZ25EYXRhW10gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBudW06IDMwMCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6YeR5biBMzAwXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuY2hhbmdlR29sZChudW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogMixcclxuICAgICAgICAgICAgbnVtOiAyLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLplKTlrZAy5LiqXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gPSBDYWNoZU1nci5zZXR0aW5nLmhhbW1lck51bSArIG51bVxyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAzLFxyXG4gICAgICAgICAgICBudW06IDMsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaBtumtlDPkuKpcIixcclxuICAgICAgICAgICAgZnVuYzogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSA9IENhY2hlTWdyLnNldHRpbmcuc3ByaXRlTnVtICsgbnVtXHJcbiAgICAgICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nID0gQ2FjaGVNZ3Iuc2V0dGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIG51bTogMTAwMCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6YeR5biBMTAwMFwiLFxyXG4gICAgICAgICAgICBmdW5jOiAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLmNoYW5nZUdvbGQobnVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IDIsXHJcbiAgICAgICAgICAgIG51bTogNCxcclxuICAgICAgICAgICAgdGl0bGU6IFwi6ZSk5a2QNOS4qlwiLFxyXG4gICAgICAgICAgICBmdW5jOiAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcuaGFtbWVyTnVtID0gQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gKyBudW1cclxuICAgICAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogMyxcclxuICAgICAgICAgICAgbnVtOiA1LFxyXG4gICAgICAgICAgICB0aXRsZTogXCLmgbbprZQ15LiqXCIsXHJcbiAgICAgICAgICAgIGZ1bmM6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5zcHJpdGVOdW0gPSBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSArIG51bVxyXG4gICAgICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZyA9IENhY2hlTWdyLnNldHRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaW5nRGF0YTc6IHNpZ25EYXRhU2V2ZW4gPSB7XHJcbiAgICAgICAgdHlwZTogWzEsIDIsIDNdLFxyXG4gICAgICAgIHRpdGxlOiBbXCLph5HluIExMDAwXCIsIFwi6ZSk5a2QMuS4qlwiLCBcIuaBtumtlDLkuKpcIl0sXHJcbiAgICAgICAgZnVuYzogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIFRvb2xzLmNoYW5nZUdvbGQoMTAwMCAqIG51bSlcclxuICAgICAgICAgICAgQ2FjaGVNZ3Iuc2V0dGluZy5oYW1tZXJOdW0gKz0gMiAqIG51bVxyXG4gICAgICAgICAgICBDYWNoZU1nci5zZXR0aW5nLnNwcml0ZU51bSArPSAyICogbnVtXHJcbiAgICAgICAgICAgIENhY2hlTWdyLnNldHRpbmcgPSBDYWNoZU1nci5zZXR0aW5nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o+Q56S65pWw5o2uXHJcbiAgICBwdWJsaWMgc3RhdGljIGhpbnRfZGF0YTogbmV4dEJsb2NrSW5mbyBbXSBbXSA9IFtcclxuICAgICAgICBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDEsXHJcbiAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogNixcclxuICAgICAgICAgICAgICAgIG51bTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDcsXHJcbiAgICAgICAgICAgICAgICBudW06IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDEsXHJcbiAgICAgICAgICAgICAgICBudW06IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogNixcclxuICAgICAgICAgICAgICAgIG51bTogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IDcsXHJcbiAgICAgICAgICAgICAgICBudW06IDJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICBdXHJcbiAgICBwdWJsaWMgc3RhdGljIGdyYWRlX29mX2RpZmZpY3VsdHlfY29uZmlnOiBncmFkZV9vZl9kaWZmaWN1bHR5X2NvbmZpZyBbXSA9IFtcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiAyMCwgcHJvYmFiaWxpdHlfMjogMzAsIHByb2JhYmlsaXR5XzM6IDEwLCBwcm9iYWJpbGl0eV80OiAwfSxcclxuICAgICAgICAvLyB7cHJvYmFiaWxpdHlfMTogMTAwLCBwcm9iYWJpbGl0eV8yOiAwLCBwcm9iYWJpbGl0eV8zOiAwLCBwcm9iYWJpbGl0eV80OiAwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogNTAsIHByb2JhYmlsaXR5XzI6IDQwLCBwcm9iYWJpbGl0eV8zOiAyMCwgcHJvYmFiaWxpdHlfNDogMTB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiA0MCwgcHJvYmFiaWxpdHlfMjogNTAsIHByb2JhYmlsaXR5XzM6IDMwLCBwcm9iYWJpbGl0eV80OiAyMH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDQwLCBwcm9iYWJpbGl0eV8yOiA2MCwgcHJvYmFiaWxpdHlfMzogNDAsIHByb2JhYmlsaXR5XzQ6IDMwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogMzAsIHByb2JhYmlsaXR5XzI6IDcwLCBwcm9iYWJpbGl0eV8zOiA1MCwgcHJvYmFiaWxpdHlfNDogNDB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiAyMCwgcHJvYmFiaWxpdHlfMjogMzAsIHByb2JhYmlsaXR5XzM6IDYwLCBwcm9iYWJpbGl0eV80OiA2MH0sXHJcbiAgICAgICAgLy8ge3Byb2JhYmlsaXR5XzE6IDEwMCwgcHJvYmFiaWxpdHlfMjogMCwgcHJvYmFiaWxpdHlfMzogMCwgcHJvYmFiaWxpdHlfNDogMH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDUwLCBwcm9iYWJpbGl0eV8yOiA0MCwgcHJvYmFiaWxpdHlfMzogNzAsIHByb2JhYmlsaXR5XzQ6IDcwfSxcclxuICAgICAgICB7cHJvYmFiaWxpdHlfMTogNDAsIHByb2JhYmlsaXR5XzI6IDUwLCBwcm9iYWJpbGl0eV8zOiA4MCwgcHJvYmFiaWxpdHlfNDogODB9LFxyXG4gICAgICAgIHtwcm9iYWJpbGl0eV8xOiA0MCwgcHJvYmFiaWxpdHlfMjogNjAsIHByb2JhYmlsaXR5XzM6IDkwLCBwcm9iYWJpbGl0eV80OiA5MH0sXHJcbiAgICAgICAge3Byb2JhYmlsaXR5XzE6IDMwLCBwcm9iYWJpbGl0eV8yOiA3MCwgcHJvYmFiaWxpdHlfMzogMTAwLCBwcm9iYWJpbGl0eV80OiAxMDB9LFxyXG4gICAgXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgZ3JhZGVfb2ZfZGlmZmljdWx0eV9jb25maWcge1xyXG4gICAgcHJvYmFiaWxpdHlfMTogbnVtYmVyOyAgLy/kuIDkuKrmlrnlnZfmpoLnjodcclxuICAgIHByb2JhYmlsaXR5XzI6IG51bWJlcjsgIC8v5Lik5Liq5pa55Z2X5qaC546HXHJcbiAgICBwcm9iYWJpbGl0eV8zOiBudW1iZXI7ICAvL+S4ieS4quaWueWdl+amgueOh1xyXG4gICAgcHJvYmFiaWxpdHlfNDogbnVtYmVyOyAgLy/lm5vkuKrmlrnlnZfmpoLnjodcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBzaWduRGF0YSB7XHJcbiAgICB0eXBlOiBudW1iZXIgLy/nsbvlnotcclxuICAgIG51bTogbnVtYmVyICAvLyAyXHJcbiAgICB0aXRsZTogc3RyaW5nICAvL+S7i+e7jVxyXG4gICAgZnVuYzogRnVuY3Rpb24gIC8vaGFuZGxlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugc2lnbkRhdGFTZXZlbiB7XHJcbiAgICB0eXBlOiBudW1iZXJbXSAvL+exu+Wei1xyXG4gICAgdGl0bGU6IHN0cmluZ1tdICAvL+S7i+e7jVxyXG4gICAgZnVuYzogRnVuY3Rpb24gIC8vaGFuZGxlXHJcbn1cclxuIl19