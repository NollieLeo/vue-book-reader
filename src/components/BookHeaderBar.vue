<!--
 * @Author: 翁恺敏
 * @Date: 2022-02-08 14:37:09
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-28 00:31:04
 * @FilePath: /vue-book-reader/src/components/BookHeaderBar.vue
 * @Description: 
 -->
<template>
  <div class="book-header-bar">
    <a-button
      type="dashed"
      shape="circle"
      icon="arrow-left"
      @click="handleBackBtnClick"
    ></a-button>
    <slot :title="title">
      <span>{{ title }}</span>
    </slot>
  </div>
</template>
<script>
export default {
  name: "book-header-bar",
  methods: {
    handleBackBtnClick() {
      if (this.goBackTrigger) {
        this.goBackTrigger();
      } else if (this.$router) {
        this.$router.go(-1);
      }
    },
  },
  props: {
    goBackTrigger: {
      type: Function,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.book-header-bar {
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.book-header-bar .ant-btn {
  margin-right: 10px;
}
</style>
