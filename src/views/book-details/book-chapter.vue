<template lang="">
  <div class="book-chapter">
    <div
      class="book-chapter-item"
      v-for="chapter in chapters"
      :key="chapter.id"
    >
      <h3
        :class="getChapterNameCls(chapter.isCompleted && chapter.isFree)"
        @click="
          chapter.isCompleted &&
            chapter.isFree &&
            linkToChapterDetails(chapter.id, chapter.subject)
        "
      >
        {{ chapter.subject }}
      </h3>
      <div class="book-chapter-tag">
        <a-icon v-if="!chapter.isFree" type="lock" />
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
    linkToChapterDetails(id, name) {
      const bookNameAndChapterNameString = `${this.$route.params.name}-${name}`;
      this.$router.push(
        `/book-chapter-details/${id}/${bookNameAndChapterNameString}`
      );
    },
    getStatusText(isCompleted) {
      return isCompleted ? "已完成" : "未完成";
    },
    getChapterNameCls(isClickable) {
      return {
        "book-chapter-name": true,
        "book-chapter-name-clickable": isClickable,
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
