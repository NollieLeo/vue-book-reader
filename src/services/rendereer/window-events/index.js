/*
 * @Author: 翁恺敏
 * @Date: 2022-02-27 14:30:41
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 17:51:53
 * @FilePath: /vue-book-reader/src/services/rendereer/window-events/index.js
 * @Description:
 */
import { ipcRendererInvoke } from "@/utils/renderer";
import { WINDOW_CLOSED, WINDOW_TOGGLE_FULLSCREEN } from "@/services/CONSTANTS";
import { WINDOW_MINIMIZE } from "@/services/CONSTANTS";

/**
 * @description: 关闭窗口事件
 * @param {*}
 * @return {*}
 */
export const handleWindowCloseTrigger = (...props) => {
  return ipcRendererInvoke(WINDOW_CLOSED, ...props);
};

/**
 * @description: 全屏 窗口
 * @param {*}
 * @return {*}
 */
export const handleWinFullScreenToggle = (isMax) => {
  return ipcRendererInvoke(WINDOW_TOGGLE_FULLSCREEN, isMax);
};

export const handleWindowMinimize = () => {
  return ipcRendererInvoke(WINDOW_MINIMIZE);
};
