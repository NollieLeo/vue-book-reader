<template lang="">
  <a-spin :spinning="isFetching">
    <a-back-top />
    <a-modal
      maskClosable
      :footer="null"
      v-if="bookDetail.resources && bookDetail.resources.length"
      v-model="downLoadModalVisible"
      title="下载电子书"
    >
      <book-downloads :resources="bookDetail.resources" />
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
        <book-header-bar :title="currentBookName"></book-header-bar>
      </header>
      <main>
        <section class="book-details-detailBox">
          <div class="book-details-detailBox-img">
            <img
              :src="
                bookDetail.coverKey
                  ? `https://file.ituring.com.cn/LargeCover/${bookDetail.coverKey}`
                  : 'https://www.ituring.com.cn/img/img-load.020f1e39.png'
              "
              alt=""
              @click="handleImgPreview(bookDetail)"
            />
            <div class="book-details-detailBox-img-shadow"></div>
          </div>
          <div style="flex: 1; margin-left: 40px">
            <h5>{{ bookDetail.pressName }}</h5>
            <h1>{{ bookDetail.name }}</h1>
            <div class="book-details-from">
              <p>
                <span>作者：</span>
                <span> {{ bookDetail.authorNameString || "未知" }} </span>
              </p>
              <p>
                <span>译者：</span>
                <span> {{ bookDetail.translatorNameString || "未知" }} </span>
              </p>
            </div>
            <div class="book-details-abstract">
              <h3>简介：</h3>
              <p>{{ bookDetail.abstract || "暂无本书简介" }}</p>
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
                价格参考
              </span>
              <div v-if="salesLists.length">
                <a
                  href=""
                  v-for="(priceLinkKey, index) in salesLists"
                  :key="index"
                  @click="
                    openPriceLinkThroughDefaultBrowser(
                      $event,
                      bookDetail.externalSalesInfo[priceLinkKey]
                    )
                  "
                >
                  {{ renderLinkNameByType(priceLinkKey) }}
                </a>
              </div>
              <span v-else>暂无价格列表</span>
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
import { shell } from "electron";
import { handleNewWindow } from "@/services/rendereer";

const priceType = {
  saleAmazonUrl: "亚马逊",
  saleDangdangUrl: "当当网",
  saleJingdongUrl: "京东",
  saleTaobaoUrl: "淘宝",
  saleChinapubUrl: "天猫",
};

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

  computed: {
    salesLists() {
      const keys = Object.keys(this.bookDetail.externalSalesInfo || {});
      let exsitKeys = [];
      keys.forEach((key) => {
        if (this.bookDetail.externalSalesInfo[key]) {
          exsitKeys.push(key);
        }
      });
      return exsitKeys;
    },
  },
  methods: {
    /**
     * @description: 加载book的数据
     * @param {*}
     * @return {*}
     */
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

    renderLinkNameByType(type) {
      return priceType[type] || "-";
    },

    /**
     * @description: 通过系统自带的浏览器打开网页
     * @param {*} e
     * @param {*} url
     * @return {*}
     */
    openPriceLinkThroughDefaultBrowser(e, url) {
      e.preventDefault();
      shell.openExternal(url);
    },

    /**
     * @description: 图书的封面预览
     * @param {*} bookDetails
     * @return {*}
     */
    handleImgPreview(bookDetails) {
      const { coverKey } = bookDetails;
      if (!coverKey) return;
      const concatUrl = `https://file.ituring.com.cn/LargeCover/${coverKey}`;
      const winConfig = {
        url: concatUrl,
        width: 440,
        height: 570,
      };
      handleNewWindow(winConfig);
    },
  },
};
</script>
<style lang="scss" src="./index.scss"></style>
