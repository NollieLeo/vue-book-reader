<template lang="">
  <div class="book-chapter">
    <div
      class="book-chapter-item"
      v-for="chapter in chapters"
      :key="chapter.id"
    >
      <h3 :class="getChapterNameCls(chapter.isCompleted)">
        {{ chapter.subject }}
      </h3>
      <div class="book-chapter-tag">
        <a-tag :color="getTagColor(chapter.isCompleted)">
          {{ getStatusText(chapter.isCompleted) }}
        </a-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "book-chapter",
  methods: {
    getStatusText(isCompleted) {
      return isCompleted ? "已完成" : "未完成";
    },
    getChapterNameCls(isCompleted) {
      return {
        "book-chapter-name": true,
        "book-chapter-name-clickable": isCompleted,
      };
    },
    getTagColor(isCompleted) {
      return isCompleted ? "cyan" : "orange";
    },
  },
  props: {
    chapters: {
      type: Array,
    },
  },
};
</script>
<style scoped>
.book-chapter-item {
  display: flex;
  align-items: center;
}
.book-chapter-item > h3 {
  margin: 0;
  padding: 7px;
}
.book-chapter-tag {
  margin-left: auto;
  margin-right: 0;
}
.book-chapter-name-clickable {
  cursor: pointer;
}
.book-chapter-name-clickable:hover {
  color: cadetblue;
}
.book-chapter-item + .book-chapter-item {
  border-top: 1px solid rgba(214, 214, 214, 0.94);
}
</style>
