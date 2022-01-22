import path from "path";
import fs from "fs";

/**
 * 获取文件的名称
 * @export
 * @param {*} fileName
 * @param {*} defaultName
 * @return {*} 返回一个加密的fileName
 */
export function getFileName(fileName, defaultName) {
  let tempFileName = fileName;
  // 处理 Windows 文件名不允许的字符
  tempFileName =
    tempFileName.replace(/(\/|\|?:|\?|\*|"|>|<|\|)/g, "") ||
    path.basename(defaultName);
  tempFileName = /^\.(.*)/.test(tempFileName) ? defaultName : tempFileName;

  // 获取文件后缀
  const extName = getFileExt(tempFileName);
  if (!extName) {
    const ext = getFileExt(defaultName);
    tempFileName = `${tempFileName}.${ext}`;
  }

  return decodeURIComponent(tempFileName);
}

/**
 *
 *  获取文件的后缀名
 * @param {*} fileName 文件名称
 * @return {*}
 */
export const getFileExt = (fileName) => {
  return path.extname(fileName);
};

/**
 * 检查文件是否存在
 * @param path - 文件路径
 */
export const isExistFile = (path) => fs.existsSync(path);

/**
 * 拼接路径
 * @param p - 路径
 */
export const pathJoin = (...p) => path.join(...p);
