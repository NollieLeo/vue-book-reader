/*
 * @Author: 翁恺敏
 * @Date: 2022-02-27 12:19:17
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-28 00:13:08
 * @FilePath: /vue-book-reader/src/services/main/window-opts-events/index.js
 * @Description:
 */
import { mainWindow } from "@/background";
import { IS_MAC } from "@/constants";
import { ipcMainHandle } from "@/utils/main";
import { BrowserWindow } from "electron";
import {
  WINDOW_CLOSED,
  WINDOW_TOGGLE_FULLSCREEN,
  WINDOW_MINIMIZE,
  NEW_WINDOW,
} from "../../CONSTANTS";

const registryWindowEvents = () => {
  // 监听window的关闭事件
  ipcMainHandle(WINDOW_CLOSED, (e) => {
    e.preventDefault();
    if (mainWindow) {
      mainWindow.destroy();
    }
  });

  // 监听window的全屏和缩小全屏事件
  ipcMainHandle(WINDOW_TOGGLE_FULLSCREEN, (e, isMAX) => {
    e.preventDefault();
    if (mainWindow) {
      mainWindow.fullscreenable = isMAX;
      if (IS_MAC) mainWindow.setSimpleFullScreen(isMAX);
      else mainWindow.setFullScreen(isMAX);
    }
  });

  // 最小化
  ipcMainHandle(WINDOW_MINIMIZE, () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  // 创建新的window
  ipcMainHandle(NEW_WINDOW, (_events, object) => {
    const { url, ...rest } = object;
    console.log(object);
    const currentWin = new BrowserWindow({
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        webSecurity: false,
      },
      ...rest,
    });
    url && currentWin.loadURL(url);
  });
};

export { registryWindowEvents };
