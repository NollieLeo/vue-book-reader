<template>
  <div class="app-header-bar">
    <div class="app-header-img" @click="goBackHome">
      <img src="@/assets/applogo.png" />
      <span>Book Reader</span>
    </div>
    <div class="app-header-drag_content"></div>
    <div class="app-header-btns">
      <div class="app-header-btn" @click="handleWinMinimize">
        <a-icon type="line"></a-icon>
      </div>
      <div class="app-header-btn" @click="handleWinToggle">
        <a-icon type="border"></a-icon>
      </div>
      <div class="app-header-btn" @click="handleWindowClose">
        <a-icon type="close"></a-icon>
      </div>
    </div>
  </div>
</template>
<script>
import {
  handleWindowCloseTrigger,
  handleWinFullScreenToggle,
} from "@/services/rendereer";
import { handleWindowMinimize } from "@/services/rendereer";

export default {
  name: "app-header-bar",
  data() {
    return {
      isMax: false,
    };
  },
  methods: {
    goBackHome() {
      this.$router.push({
        name: "book-page",
      });
    },

    async handleWindowClose() {
      await handleWindowCloseTrigger();
    },

    async handleWinToggle() {
      await handleWinFullScreenToggle(this.isMax);
      this.isMax = !this.isMax;
    },
    handleWinMinimize() {
      handleWindowMinimize();
    },
  },
};
</script>
<style lang="css" src="./index.css"></style>
