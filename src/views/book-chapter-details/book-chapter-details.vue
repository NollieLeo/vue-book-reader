<template>
  <div class="book-chapter-details">
    <a-back-top />

    <a-affix :top="20">
      <book-header-bar class="book-chapter-header" :title="title">
        <template>
          <a @click="linkToBook"> {{ bookName }} </a>
          <span>-</span>
          <span>{{ chapterName }} </span>
        </template>
      </book-header-bar>
    </a-affix>
    <main>
      <a-spin :spinning="isFetching">
        <div v-show="!isFetching" v-html="resHtml"></div>
      </a-spin>
    </main>
    <footer v-show="!isFetching">
      <div @click="linkToChapter('pre')">
        <span class="book-chapter-clickable">上一章</span>
        <span>{{ chapterPreName }} </span>
      </div>
      <div @click="linkToChapter('next')">
        <span class="book-chapter-clickable">下一章</span>
        <span> {{ chapterNextName }} </span>
      </div>
    </footer>
  </div>
</template>
<script>
import { loadChapterDetail } from "./apis";
import { findIndex } from "lodash";

export default {
  name: "book-chapter-details",
  data() {
    return {
      resHtml: "",
      isFetching: true,

      chapters: [],
      book: null,
      preChapter: null,
      nextChapter: null,
    };
  },
  computed: {
    chapterPreName() {
      return this.preChapter ? this.preChapter.subject : "无";
    },
    chapterNextName() {
      return this.nextChapter ? this.nextChapter.subject : "无";
    },
    title() {
      return this.$route.params.bookAndChapterName;
    },
    bookName() {
      return this.book ? this.book.name : "";
    },
    bookId() {
      return this.book ? this.book.id : "";
    },
    chapterName() {
      return this.$route.params.bookAndChapterName.split("-")[1];
    },
    chapterId() {
      return this.$route.params.chapterId;
    },
  },
  watch: {
    // 监测chapters数组的变化，如果改变了则改变上一篇和下一篇
    chapters(arr) {
      const currentChapterIndex = findIndex(
        arr,
        (chapter) => chapter.id === Number(this.chapterId)
      );
      this.preChapter =
        currentChapterIndex !== 0 ? arr[currentChapterIndex - 1] : null;
      this.nextChapter =
        currentChapterIndex !== arr.length - 1
          ? arr[currentChapterIndex + 1]
          : null;
    },
    $route: "loadChapterData",
  },
  methods: {
    linkToBook() {
      this.$router.push({
        path: "/book-details",
        name: "book-details",
        params: {
          id: this.bookId,
          name: this.bookName,
        },
      });
    },
    linkToChapter(type) {
      const chapterObj = {
        pre: this.preChapter,
        next: this.nextChapter,
      };
      if (chapterObj[type]) {
        const bookAndChapterName = `${this.bookName}-${chapterObj[type].subject}`;
        this.$router.push({
          name: "book-chapter-details",
          params: {
            chapterId: chapterObj[type].id,
            bookAndChapterName,
          },
        });
      }
    },

    async loadChapterData() {
      this.isFetching = true;
      try {
        const res = await loadChapterDetail.call(this, this.chapterId);
        if (res.status === 200) {
          this.resHtml = res.data.htmlOfBody;
          this.chapters = res.data.chapters;
          this.book = res.data.book;
        }
        this.isFetching = false;
      } catch (error) {
        this.isFetching = false;
        throw new Error(error);
      }
    },
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.loadChapterData();
  },
};
</script>
<style>
.book-chapter-header {
  background-color: #fff;
}
.book-chapter-details {
  width: 80%;
  margin: 0 auto;
}
.book-chapter-details main {
  margin-top: 20px;
}
.book-chapter-details main img {
  max-width: 90%;
}

.book-chapter-details footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}
.book-chapter-details footer > div {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.book-chapter-clickable {
  font-size: 15px;
  cursor: pointer;
}
.book-chapter-clickable:hover {
  color: darkcyan;
}
</style>
