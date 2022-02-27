// tray 的事件处理，注册

import { Tray, Menu, BrowserWindow } from "electron";
import path from "path";
import { mainWindow } from "@/background";

let bookTrayPanel;

const contextMenu = Menu.buildFromTemplate([
  {
    label: "删除图标",
    click: () => {
      bookTrayPanel.destroy();
    },
  },
  { type: "separator" },
  {
    label: "打开electron官网",
    click: () => {
      let child = new BrowserWindow({
        parent: BrowserWindow.getFocusedWindow(),
      });
      child.loadURL("https://electronjs.org");
      child.show();
    },
  },
]);

/**
 * 注册托盘
 *
 */
function registryTrayPanel() {
  const iconPath = path.join(__dirname, "..", "src/assets/aotoman.ico");
  bookTrayPanel = new Tray(iconPath);
  bookTrayPanel.setToolTip("book-reader");
  bookTrayPanel.setContextMenu(contextMenu);

  // 监听双击事件，双击控制隐藏或者是显示
  // 注：此效果在windows上良好，在mac下会有兼容性问题，双击事件可能失效，实际使用过程中要注意。
  bookTrayPanel.on("double-click", () => {
    if (!mainWindow) return;
    const isVisible = mainWindow.isVisible();
    if (!isVisible) {
      mainWindow.restore();
      // windows下如果hide之后不调用show方法而是只调用restore方法就会导致页面挂住不能用
      mainWindow.show();
    } else {
      mainWindow.hide();
    }
  });
}

export { bookTrayPanel, registryTrayPanel };
