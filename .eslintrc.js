/*
 * @Author: 翁恺敏
 * @Date: 2022-02-27 16:24:40
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 17:18:33
 * @FilePath: /vue-book-reader/.eslintrc.js
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-debugger": "off",
    "no-redeclare": 2,
    "no-dupe-args": 2, //函数参数不能重复
    "no-var": 0, //禁用var，用let和const代替
    eqeqeq: 2, //必须使用全等
    "init-declarations": 0, //声明时必须赋初值
    "no-func-assign": 2, //禁止重复的函数声明
    "no-else-return": 2, //如果if语句里面有return,后面不能跟else语句
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    indent: [1, 2],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".vue"],
      },
    },
  },
};
