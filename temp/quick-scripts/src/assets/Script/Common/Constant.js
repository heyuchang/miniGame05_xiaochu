"use strict";
cc._RF.push(module, '7ecf25dSYJE8p7160kC1rXT', 'Constant');
// Script/Common/Constant.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 常量配置
 */
var Constant = /** @class */ (function () {
    function Constant() {
    }
    Constant.REWARDED_VIDEO_END_TYPE = {
        END: 1,
        NOT_END: 2,
        ERROR: 3,
    };
    // 分享类型
    Constant.UNLOCK_TYPE = {
        PASS_GAME: 1,
        TIPS: 2,
        GET_STRENGTH: 3,
        DOUBLE_STRENGTH: 4,
        NEXT_LEVEL: 5,
        GET_GOLD: 6,
        DOUBLE: 7,
        TRY_SKIN: 8
    };
    Constant.GAME_BOX_TWEEN_TYPE = {
        SHAKE_STOP: 1,
        SHAKE_FOREVER: 2,
        SCALE_MOVE: 3
    };
    //?
    Constant.LOGIN_CODE = {
        1: '本地环境不予后台进行交互;',
        2: '微信接口调用失败;',
        3: '微信登录接口调用成功，但 Code 为空;',
        4: "用户后台登录失败 code != 200;",
        5: '用户后台登录失败！',
        6: '更新用户数据失败, Code != 200;',
        7: '更新用户数据失败;',
        8: '获取游戏配置失败, Code != 200;',
        9: '获取游戏配置失败;',
        10: '获取游戏导出失败, Code != 200;',
        11: '获取游戏导出失败;',
        12: '上报游戏导出失败, Code != 200;',
        13: '上报游戏导出失败;',
    };
    Constant.VIDEO_TYPE = {
        POP: 1,
        GET_PROPS: 2,
        GET_POWER: 3,
        GET_GOLD: 4,
        GET_DOUBLE: 5,
        UNLOCK: 6,
        GET_SKIN: 7,
        ENFORCE: 8,
        PLAY_END: 9,
        PLAY_CLOSE: 10,
    };
    //4
    Constant.BOTTOM_TYPE = {
        NEW_BANNER_SHOW: 1,
        OLD_BANNER_SHOW: 2,
        NEW_CUSTOM_SHOW: 3,
        OLD_CUSTOM_SHOW: 4,
    };
    //5  导出成功记录
    Constant.EXPORT_TYPE = {
        FORCE: 1,
        RAND_FORCE: 2,
        GAME_BOX_ONE: 3,
        GAME_BOX_TWO: 5,
        GAME_BOX_THREE: 6,
        GAME_BOX_FOUR: 11,
        GAME_BOX_SLIDER: 7,
        OPEN_DATA: 8,
        VIEW_BOX: 9,
        BANNER_BOX: 10,
    };
    return Constant;
}());
exports.default = Constant;

cc._RF.pop();