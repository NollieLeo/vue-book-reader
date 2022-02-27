<!--
 * @Author: 翁恺敏
 * @Date: 2022-02-08 14:37:09
 * @LastEditors: 翁恺敏
 * @LastEditTime: 2022-02-28 00:28:42
 * @FilePath: /vue-book-reader/src/views/book-details/book-downloads.vue
 * @Description: 
 -->
<template lang="">
  <div class="book-details-downloads">
    <div
      class="book-details-downloads-item"
      v-for="item in resources || []"
      :key="item.id"
    >
      <span> {{ item.name }} </span>
      <span>{{ item.sizeString }} </span>
      <a-button
        size="small"
        type="primary"
        @click="handleDownLoad(item.name, item.url)"
        >下载</a-button
      >
    </div>
  </div>
</template>
<script>
import {
  handleOpenFileDialog,
  handleNewFileDownLoad,
} from "@/services/rendereer";
export default {
  name: "book-downloads",
  props: {
    resources: {
      type: Array,
    },
  },
  methods: {
    async handleDownLoad(name, url) {
      try {
        const path = await handleOpenFileDialog();
        if (!path) {
          this.$notification.open({
            title: "提示",
            description: "文件地址不存在",
          });
        }
        await handleNewFileDownLoad(url, name, path);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.book-details-downloads-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 5px;
  }
}
</style>
