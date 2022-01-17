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
import { ipcRenderer } from "electron";
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
        const path = await ipcRenderer.invoke("openFileDialog", url);
        console.log(path);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>
<style scoped>
.book-details-downloads-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
