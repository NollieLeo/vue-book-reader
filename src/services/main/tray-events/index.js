import { Tray, Menu } from "electron";
import path from "path";

let bookTrayPanel;

const contextMenu = Menu.buildFromTemplate([
  {
    label: "删除图标",
    click: () => {
      bookTrayPanel.destroy();
    },
  },
  {
    label: "打开新窗口",
    click: () => {
      console.log("open new browser");
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
}

export { bookTrayPanel, registryTrayPanel };
