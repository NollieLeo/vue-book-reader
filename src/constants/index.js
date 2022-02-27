/*
 * @Author: 翁恺敏
 * @Date: 2022-02-08 14:37:09
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 17:29:33
 * @FilePath: /vue-book-reader/src/constants/index.js
 * @Description:
 */
const isDevelopment = process.env.NODE_ENV !== "production";

const IS_MAC = process.platform === "darwin";

const IS_WIN = process.platform === "win32";

export { isDevelopment, IS_MAC, IS_WIN };
