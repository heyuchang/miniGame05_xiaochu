import {nextBlockInfo} from "../../GameView";
import Tools from "../../../../Common/Tools";
import CacheMgr from "../../../../Common/manage/CacheMgr";

export default class gameConfig {
    //GameConfig
    public static gridSize: number = 90  // 格子长宽
    //生成方块空白格子区间
    public static bottomBlankMin: number = 1
    public static bottomBlankMax: number = 3

    public static price: number = 30 //道具金币
    //商城价格
    public static price_hammer: number = 200
    public static price_sprite: number = 200
    public static price_stamina: number = 300
    //时间
    public static upTime: number = 0.3
    public static downTime: number = 0.2
    public static lineShake: number = 0.3
    public static blockFlyTime: number = 0.1
    public static hammerRotation: number = 0.1
    public static hide_hint_sprite: number = 1 //隐藏提示图片时间
    public static sprite_move: number = 0.5
    public static sprite_jump: number = 0.5
    public static xinjilu: number = 2
    public static hint_hand_move: number = 1 //提示手指移动时间
    public static menu_box_move: number = 0.2
    //签到
    public static signData: signData[] = [
        {
            type: 1,
            num: 300,
            title: "金币300",
            func: (num: number) => {
                Tools.changeGold(num)
            }
        },
        {
            type: 2,
            num: 2,
            title: "锤子2个",
            func: (num: number) => {
                CacheMgr.setting.hammerNum = CacheMgr.setting.hammerNum + num
                CacheMgr.setting = CacheMgr.setting
            }
        },
        {
            type: 3,
            num: 3,
            title: "恶魔3个",
            func: (num: number) => {
                CacheMgr.setting.spriteNum = CacheMgr.setting.spriteNum + num
                CacheMgr.setting = CacheMgr.setting
            }
        },
        {
            type: 1,
            num: 1000,
            title: "金币1000",
            func: (num: number) => {
                Tools.changeGold(num)
            }
        },
        {
            type: 2,
            num: 4,
            title: "锤子4个",
            func: (num: number) => {
                CacheMgr.setting.hammerNum = CacheMgr.setting.hammerNum + num
                CacheMgr.setting = CacheMgr.setting
            }
        },
        {
            type: 3,
            num: 5,
            title: "恶魔5个",
            func: (num: number) => {
                CacheMgr.setting.spriteNum = CacheMgr.setting.spriteNum + num
                CacheMgr.setting = CacheMgr.setting
            }
        },
    ]

    public static singData7: signDataSeven = {
        type: [1, 2, 3],
        title: ["金币1000", "锤子2个", "恶魔2个"],
        func: (num: number) => {
            Tools.changeGold(1000 * num)
            CacheMgr.setting.hammerNum += 2 * num
            CacheMgr.setting.spriteNum += 2 * num
            CacheMgr.setting = CacheMgr.setting
        }
    }

    //提示数据
    public static hint_data: nextBlockInfo [] [] = [
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
    ]
    public static grade_of_difficulty_config: grade_of_difficulty_config [] = [
        null,
        {probability_1: 20, probability_2: 30, probability_3: 10, probability_4: 0},
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        {probability_1: 50, probability_2: 40, probability_3: 20, probability_4: 10},
        {probability_1: 40, probability_2: 50, probability_3: 30, probability_4: 20},
        {probability_1: 40, probability_2: 60, probability_3: 40, probability_4: 30},
        {probability_1: 30, probability_2: 70, probability_3: 50, probability_4: 40},
        {probability_1: 20, probability_2: 30, probability_3: 60, probability_4: 60},
        // {probability_1: 100, probability_2: 0, probability_3: 0, probability_4: 0},
        {probability_1: 50, probability_2: 40, probability_3: 70, probability_4: 70},
        {probability_1: 40, probability_2: 50, probability_3: 80, probability_4: 80},
        {probability_1: 40, probability_2: 60, probability_3: 90, probability_4: 90},
        {probability_1: 30, probability_2: 70, probability_3: 100, probability_4: 100},
    ]
}

interface grade_of_difficulty_config {
    probability_1: number;  //一个方块概率
    probability_2: number;  //两个方块概率
    probability_3: number;  //三个方块概率
    probability_4: number;  //四个方块概率
}

export interface signData {
    type: number //类型
    num: number  // 2
    title: string  //介绍
    func: Function  //handle
}

export interface signDataSeven {
    type: number[] //类型
    title: string[]  //介绍
    func: Function  //handle
}
