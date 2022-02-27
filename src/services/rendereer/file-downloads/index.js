/*
 * @Author: 翁恺敏
 * @Date: 2022-02-08 14:37:09
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 17:24:08
 * @FilePath: /vue-book-reader/src/services/rendereer/file-downloads/index.js
 * @Description:
 */
import { ipcRendererInvoke } from "@/utils/renderer";
import { FILE_DIALOG_OPEN_HANDLE, FILE_DOWNLOAD_HANDLE } from "../../CONSTANTS";

/**
 * @param {*} path
 * @param {*} fileLogOptions
 * @return {*}
 */
export const handleOpenFileDialog = (path, fileLogOptions) => {
  return ipcRendererInvoke(FILE_DIALOG_OPEN_HANDLE, path, fileLogOptions);
};

/**
 * 抛给渲染进程的下载事件 newDownloadFile
 *
 * @param {*} url
 * @param {*} fileName
 * @param {*} path
 * @return {*}
 */
export const handleNewFileDownLoad = (url, fileName, path) => {
  return ipcRendererInvoke(FILE_DOWNLOAD_HANDLE, { url, fileName, path });
};
