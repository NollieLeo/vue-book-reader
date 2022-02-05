// 头部menu的注册api
import { Menu, dialog, BrowserWindow } from "electron";
import { isDevelopment } from "../../../constants";
import { mainWindow } from "../../../background";

const menuTemplate = [
  {
    label: "选项", // macOS下第一个标签是应用程序名字，此处设置无效
    submenu: [
      {
        label: "退出",
        role: "quit",
      },
      {
        label: "我的博客",
        click: createBlogWin,
      },
      isDevelopment && {
        label: "打开devTool",
        click: createDevTool,
        accelerator: "CommandOrControl + shift + i",
      },
    ].filter(Boolean),
  },
  {
    label: "文件",
    submenu: [
      {
        label: "子菜单",
        click: () => {
          // 调用了dialog（弹窗模块），演示效果
          dialog.showMessageBoxSync({
            type: "info",
            title: "提示",
            message: "点击了子菜单",
          });
        },
      },
    ],
  },
];

/**
 * 打开devtools
 */
function createDevTool() {
  mainWindow && mainWindow.webContents.openDevTools();
}

/**
 * 打开我的博客
 */
function createBlogWin() {
  const blog = new BrowserWindow({
    width: 1000,
    height: 800,
  });
  blog.loadURL("https://nollieleo.github.io");
}

/**
 * 注册菜单的主要函数
 *
 */
function regsiterMenuEvents() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // 主进程，渲染进程可使用window.addEventListener设置监听事件
  BrowserWindow.getFocusedWindow().webContents.on("context-menu", () => {
    menu.popup();
  });
}

export { regsiterMenuEvents };
