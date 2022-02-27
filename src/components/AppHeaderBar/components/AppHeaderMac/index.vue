<!--
 * @Author: 翁恺敏
 * @Date: 2022-02-27 21:32:24
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-27 22:40:51
 * @FilePath: /vue-book-reader/src/components/AppHeaderBar/components/AppHeaderMac/index.vue
 * @Description: 
 -->
<template lang="">
  <div class="app-header-mac">
    <div class="app-header-btns">
      <div class="app-header-dot-btn red" @click="handleWindowClose">
        <a-icon type="close" />
      </div>
      <div class="app-header-dot-btn yellow" @click="handleWinMinimize">
        <a-icon type="minus" />
      </div>
      <div class="app-header-dot-btn green" @click="handleWinToggle">
        <a-icon type="arrows-alt" />
      </div>
    </div>
    <div class="app-header-img">
      <img src="@/assets/applogo.png" />
      <span>Book Reader</span>
    </div>
  </div>
</template>
<script>
import AppHeaderMixins from "../../mixins";
export default {
  name: "app-header-mac",
  mixins: [AppHeaderMixins],
};
</script>
<style lang="scss" src="./index.scss"></style>
