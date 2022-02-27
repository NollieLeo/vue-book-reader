import { mainWindow } from "@/background";
import { IS_MAC } from "@/constants";
import { ipcMainHandle } from "@/utils/main";
import {
  WINDOW_CLOSED,
  WINDOW_TOGGLE_FULLSCREEN,
  WINDOW_MINIMIZE,
} from "../../CONSTANTS";

const registryWindowEvents = () => {
  // 监听window的关闭事件
  ipcMainHandle(WINDOW_CLOSED, (e) => {
    e.preventDefault();
    if (mainWindow) {
      mainWindow.hide();
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
};

export { registryWindowEvents };
