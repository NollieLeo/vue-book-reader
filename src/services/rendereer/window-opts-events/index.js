/*
 * @Author: 翁恺敏
 * @Date: 2022-02-27 14:30:41
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-28 00:13:07
 * @FilePath: /vue-book-reader/src/services/rendereer/window-opts-events/index.js
 * @Description:
 */
import { ipcRendererInvoke } from "@/utils/renderer";
import {
  WINDOW_CLOSED,
  WINDOW_TOGGLE_FULLSCREEN,
  WINDOW_MINIMIZE,
  NEW_WINDOW,
} from "@/services/CONSTANTS";

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

/**
 * @description: 窗口最小化
 * @param {*}
 * @return {*}
 */
export const handleWindowMinimize = () => {
  return ipcRendererInvoke(WINDOW_MINIMIZE);
};

/**
 * @description: 创建新窗口
 * @param {object} obj
 * @return {*}
 */
export const handleNewWindow = (obj) => {
  ipcRendererInvoke(NEW_WINDOW, obj);
};
