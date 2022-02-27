<!--
 * @Author: 翁恺敏
 * @Date: 2022-02-27 21:32:31
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 21:47:00
 * @FilePath: /vue-book-reader/src/components/AppHeaderBar/components/AppHeaderWindows/index.vue
 * @Description: 
 -->
<template>
  <div class="app-header-windows">
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
import AppHeaderMixins from "../../mixins";
export default {
  name: "app-header-windows",
  mixins: [AppHeaderMixins],
};
</script>
<style lang=""></style>
