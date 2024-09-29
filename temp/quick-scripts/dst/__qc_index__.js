
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Common/Constant');
require('./assets/Script/Common/Global');
require('./assets/Script/Common/LogMgr');
require('./assets/Script/Common/ShowConfig');
require('./assets/Script/Common/Test');
require('./assets/Script/Common/Tools');
require('./assets/Script/Common/manage/ActionMgr');
require('./assets/Script/Common/manage/Api/QgApi');
require('./assets/Script/Common/manage/Api/QgBanner');
require('./assets/Script/Common/manage/Api/QgIntersAd');
require('./assets/Script/Common/manage/Api/QgNative');
require('./assets/Script/Common/manage/Api/QgRewardedAd');
require('./assets/Script/Common/manage/AudioMgr');
require('./assets/Script/Common/manage/CacheMgr');
require('./assets/Script/Common/manage/Emit/Emit');
require('./assets/Script/Common/manage/Emit/EmitBase');
require('./assets/Script/Common/manage/Emit/EmitData');
require('./assets/Script/Common/manage/GameLogMgr');
require('./assets/Script/Common/manage/Layer/LayerMgr');
require('./assets/Script/Common/manage/Layer/LayerPanel');
require('./assets/Script/Common/manage/Layer/LayerUI');
require('./assets/Script/Common/manage/LoadMgr');
require('./assets/Script/Common/manage/PanelMgr');
require('./assets/Script/Common/manage/PondMgr');
require('./assets/Script/Common/manage/StorageMgr');
require('./assets/Script/Common/manage/TimerMgr');
require('./assets/Script/Moudle/View/EndView');
require('./assets/Script/Moudle/View/GameInfoView');
require('./assets/Script/Moudle/View/GameView');
require('./assets/Script/Moudle/View/HomeView');
require('./assets/Script/Moudle/View/NativeView');
require('./assets/Script/Moudle/View/ShortageView');
require('./assets/Script/Moudle/View/logic/common/config');
require('./assets/Script/Moudle/View/logic/common/text');
require('./assets/Script/Moudle/View/logic/game/shop');
require('./assets/Script/Moudle/View/logic/game/sign');
require('./assets/Script/SDK/JiuWuSDK');
require('./assets/Script/Scene/Game');
require('./assets/Script/Scene/Loading');

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