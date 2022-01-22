import { ipcMainHandle } from "../../../utils/main";
import { app, dialog } from "electron";
import { mainWindow } from "../../../background";
import { session } from "electron";
import { FILE_DIALOG_OPEN_HANDLE, FILE_DOWNLOAD_HANDLE } from "../../CONSTANTS";
import { getFileName, pathJoin, isExistFile } from "@/utils";
import { v4 as uuidV4 } from "uuid";

let newDownloadItem = null;

/**
 * 打开文件选择框
 * @param oldPath - 上一次打开的路径
 */
const openFileDialog = async (
  oldPath = app.getPath("downloads"),
  fileLogOptions = {}
) => {
  if (!mainWindow) return oldPath;

  const fileLogOptionsTransformed = Object.assign(
    {
      title: "选择保存位置",
      properties: ["openDirectory", "createDirectory"],
      defaultPath: oldPath,
    },
    fileLogOptions
  );

  const { canceled, filePaths } = await dialog.showOpenDialog(
    mainWindow,
    fileLogOptionsTransformed
  );

  // return path
  return !canceled ? filePaths[0] : oldPath;
};

/**
 * 处理文件下载
 * @param {*} { url, fileName, path }
 * @return {*}
 */
const handleNewFileDownLoad = ({ url, fileName, path }) => {
  const newFileName = getFileName(fileName || "", url); // 处理文件名
  // 处理保存路径
  const downloadPath = pathJoin(path, newFileName);
  fileName = newFileName;
  path = downloadPath;

  // 判断是否存在
  if (isExistFile(downloadPath)) {
    const id = uuidV4();
    return { id, path, fileName, url };
  }

  newDownloadItem = {
    url,
    fileName: newFileName,
    path: downloadPath,
  };

  if (mainWindow) {
    mainWindow.webContents.downloadURL(url);
  }

  return null;
};

/**
 * 监听下载事件
 * @param {*} _event electron的事件
 * @param {*} downloadItem
 * @param {*} webContents
 * @return {*}
 */
const listenFileDownload = (_event, downloadItem) => {
  // 新建下载为空时，会执行 electron 默认的下载处理
  if (!newDownloadItem) return;
  // let prevReceivedBytes = 0; // 记录上一次下载的字节数据

  // 阻止系统保存对话框, 不然会自己跳出来一个下载框，就离谱
  // 就是相当于自己确定了一个路径就不需要用系统自带的了
  downloadItem.setSavePath(newDownloadItem.path);

  downloadItem.on("updated", (_event, state) => {
    if (state === "interrupted") {
      console.log("Download is interrupted but can be resumed");
    } else if (state === "progressing") {
      if (downloadItem.isPaused()) {
        console.log("Download is paused");
      } else {
        console.log(`Received bytes: ${downloadItem.getReceivedBytes()}`);
      }
    }
  });

  downloadItem.once("done", (_event, state) => {
    if (state === "completed") {
      console.log("Download successfully");
    } else {
      console.log(`Download failed: ${state}`);
    }
  });
};

/**
 * file的相关的事件注册
 */
const registryFiledownloadsEvents = () => {
  // 注册打开文件选择框的事件
  ipcMainHandle(FILE_DIALOG_OPEN_HANDLE, (_event, path, fileLogOptions) =>
    openFileDialog(path, fileLogOptions)
  );

  // 注册文件下载的事件
  ipcMainHandle(FILE_DOWNLOAD_HANDLE, (_event, data) => {
    return handleNewFileDownLoad(data);
  });

  // 监听文件的下载, 有触发频率的
  session.defaultSession.on("will-download", listenFileDownload);
};

export default registryFiledownloadsEvents;
