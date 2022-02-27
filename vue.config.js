/*
 * @Author: 翁恺敏
 * @Date: 2022-02-08 14:37:09
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 17:18:25
 * @FilePath: /vue-book-reader/vue.config.js
 * @Description:
 */
const path = require("path");

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
};
