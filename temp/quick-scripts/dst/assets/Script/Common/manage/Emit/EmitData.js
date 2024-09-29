
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Common/manage/Emit/EmitData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDb21tb25cXG1hbmFnZVxcRW1pdFxcRW1pdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUFBO0lBTUEsQ0FBQztJQUxpQix1QkFBYyxHQUFZLGVBQWUsQ0FBRTtJQUUzQyxxQkFBWSxHQUFZLGFBQWEsQ0FBRTtJQUV2Qyx3QkFBZSxHQUFZLGlCQUFpQixDQUFBO0lBQzlELGVBQUM7Q0FORCxBQU1DLElBQUE7a0JBTm9CLFFBQVE7QUFRN0IsSUFBWSxTQU1YO0FBTkQsV0FBWSxTQUFTO0lBQ2pCLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QsbUVBQWlCLENBQUE7SUFDakIscUVBQWtCLENBQUE7SUFDbEIsK0RBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFNcEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5LqL5Lu25pWw5o2uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0RGF0YSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIElOX05BVElWRV9ORVhUIDogc3RyaW5nID0gJ2luTmF0aXZlX05leHQnIDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENMT1NFX05BVElWRSA6IHN0cmluZyA9ICdjbG9zZU5hdGl2ZScgO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTE9BRF9HQU1FX1NDRU5FIDogc3RyaW5nID0gJ2xvYWRfZ2FtZV9zY2VuZSdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRXZlbnRDb2RlIHtcclxuICAgIEdldENvbmZpZ092ZXIsIC8v6I635Y+W6YWN572u5L+h5oGv5oiQ5YqfXHJcbiAgICBQYW5lbE1nckluaXRPSywgLy9wYW5lbOeuoeeQhuWZqOWIneWni+WMluWujOaIkFxyXG4gICAgQmFubmVyQm94SW5pdE92ZXIsIC8vYmFubmVyQm945Yid5aeL5YyW5oiQ5YqfXHJcbiAgICBCYW5uZXJPckdyaWRJbml0T0ssIC8vIGJhbm5lcuaIluiAheagvOWtkOWIneWni+WMluaIkOWKn1xyXG4gICAgR0FNRV9CT1hfVVBEQVRFLCAgLy9nYW1lQm946ZyA6KaB5Yi35pawXHJcbn1cclxuIl19