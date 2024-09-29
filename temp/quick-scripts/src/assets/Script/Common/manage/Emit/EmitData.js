"use strict";
cc._RF.push(module, '5a2484vEg9NCJnJkpym2+TS', 'EmitData');
// Script/Common/manage/Emit/EmitData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCode = void 0;
/**
 * 事件数据
 */
var EmitData = /** @class */ (function () {
    function EmitData() {
    }
    EmitData.IN_NATIVE_NEXT = 'inNative_Next';
    EmitData.CLOSE_NATIVE = 'closeNative';
    EmitData.LOAD_GAME_SCENE = 'load_game_scene';
    return EmitData;
}());
exports.default = EmitData;
var EventCode;
(function (EventCode) {
    EventCode[EventCode["GetConfigOver"] = 0] = "GetConfigOver";
    EventCode[EventCode["PanelMgrInitOK"] = 1] = "PanelMgrInitOK";
    EventCode[EventCode["BannerBoxInitOver"] = 2] = "BannerBoxInitOver";
    EventCode[EventCode["BannerOrGridInitOK"] = 3] = "BannerOrGridInitOK";
    EventCode[EventCode["GAME_BOX_UPDATE"] = 4] = "GAME_BOX_UPDATE";
})(EventCode = exports.EventCode || (exports.EventCode = {}));

cc._RF.pop();