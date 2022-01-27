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
}
.book-header-bar .ant-btn {
  margin-right: 10px;
}
</style>
