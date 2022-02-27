/*
 * @Author: 翁恺敏
 * @Date: 2022-02-27 21:40:18
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 21:47:03
 * @FilePath: /vue-book-reader/src/components/AppHeaderBar/mixins/index.js
 * @Description:
 */
import {
  handleWindowCloseTrigger,
  handleWinFullScreenToggle,
} from "@/services/rendereer";
import { handleWindowMinimize } from "@/services/rendereer";

export default {
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    goBackHome() {
      this.$router.push({
        name: "book-page",
      });
    },

    handleWindowClose() {
      handleWindowCloseTrigger();
    },

    handleWinToggle() {
      handleWinFullScreenToggle(!this.isFullScreen);
      this.isFullScreen = !this.isFullScreen;
    },
    handleWinMinimize() {
      handleWindowMinimize();
    },
  },
};
