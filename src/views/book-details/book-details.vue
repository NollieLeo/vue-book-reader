<template lang="">
  <a-spin :spinning="isFetching">
    <a-back-top />
    <a-modal
      maskClosable
      :footer="null"
      v-model="downLoadModalVisible"
      title="下载电子书"
    >
      <book-downloads :resources="bookDetail.resources || []" />
    </a-modal>
    <aside class="book-details-buttons">
      <a-button
        @click="downLoadModalVisible = !downLoadModalVisible"
        icon="download"
        type="dashed"
        shape="circle"
      ></a-button>
    </aside>
    <div class="book-details">
      <header>
        <a-button
          type="dashed"
          shape="circle"
          icon="arrow-left"
          @click="$router.go(-1)"
        ></a-button>
        <span> {{ currentBookName }} </span>
      </header>
      <main>
        <section class="book-details-detailBox">
          <img
            :src="
              bookDetail.coverKey
                ? `https://file.ituring.com.cn/LargeCover/${bookDetail.coverKey}`
                : 'https://www.ituring.com.cn/img/img-load.020f1e39.png'
            "
            alt=""
          />
          <div style="flex: 1; margin-left: 40px">
            <h5>{{ bookDetail.pressName }}</h5>
            <h1>{{ bookDetail.name }}</h1>
            <div class="book-details-from">
              <p>
                <span>作者：</span>
                <a> {{ bookDetail.authorNameString }} </a>
              </p>
              <p>
                <span>译者：</span>
                <a> {{ bookDetail.translatorNameString }} </a>
              </p>
            </div>
            <div class="book-details-abstract">
              <h3>简介：</h3>
              <p>{{ bookDetail.abstract }}</p>
            </div>
          </div>
        </section>
        <section class="book-details-container" style="margin-top: 20px">
          <a-tabs default-active-key="introduce">
            <a-tab-pane key="introduce">
              <span slot="tab">
                <a-icon type="container" />
                图书介绍
              </span>
              <book-introduce :briefIntro="bookDetail.briefIntro || {}" />
            </a-tab-pane>
            <a-tab-pane key="readOnline">
              <span slot="tab">
                <a-icon type="read" />
                在线阅读
              </span>
              <book-chapter
                :chapters="bookDetail.ebook ? bookDetail.ebook.chapters : []"
              ></book-chapter>
            </a-tab-pane>
            <a-tab-pane key="others">
              <span slot="tab">
                <a-icon type="profile" />
                其他
              </span>
              暂无数据...
            </a-tab-pane>
          </a-tabs>
        </section>
      </main>
    </div>
  </a-spin>
</template>
<script>
import loadDetails from "./apis/loadBookDetails";
import BookChapter from "./book-chapter.vue";
import BookIntroduce from "./book-introduce.vue";
import BookDownloads from "./book-downloads.vue";

export default {
  name: "book-details",
  components: {
    BookIntroduce,
    BookChapter,
    BookDownloads,
  },
  data() {
    return {
      isFetching: false,
      currentBookId: this.$route.params.id,
      currentBookName: this.$route.params.name,
      bookDetail: {},
      downLoadModalVisible: false,
    };
  },
  mounted() {
    this.loadCurrentBookDetails();
  },
  methods: {
    async loadCurrentBookDetails() {
      this.isFetching = true;
      try {
        const res = await loadDetails.call(this, this.currentBookId);
        if (res.status === 200) {
          this.bookDetail = res.data;
        }
        this.isFetching = false;
      } catch (error) {
        this.isFetching = false;
        throw new Error(error);
      }
    },
  },
};
</script>
<style src="./index.css"></style>
