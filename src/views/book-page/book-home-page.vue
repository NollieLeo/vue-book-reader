<template lang="">
  <div class="book-page-home">
    <!-- 搜索条 -->
    <a-affix :top="20" @change="handleScrollChange">
      <div :class="bookSearchBarCls">
        <h1 v-if="!isAffix" style="text-align: center">搜索图书</h1>
        <a-input-search
          placeholder="输入图书名称"
          enter-button
          allowClear
          :size="inputSize"
          :default-value="defaultSearchValue"
          @search="handleSearch"
          :loading="isFetching"
        />
      </div>
    </a-affix>
    <!-- 主要内容 -->
    <div v-if="!searchValue" class="empty">请搜索图书</div>
    <div class="book-page-container" v-else>
      <a-list
        :loading="isFetching"
        :locale="{ emptyText: '暂无图书' }"
        :grid="{ gutter: 40, column: 2 }"
        :data-source="books"
        class="book-page-list"
      >
        <a-list-item slot="renderItem" slot-scope="book">
          <div
            class="book-page-listitem"
            @click="goDetails(book.id, book.name)"
          >
            <div class="book-page-listitem-img">
              <img
                :src="`https://file.ituring.com.cn/LargeCover/${book.coverKey}`"
                :alt="book.authorNameString"
              />
            </div>
            <div class="book-page-listitem-bookInfo">
              <h3 class="book-page-listitem-bookName">{{ book.name }}</h3>
              <p class="book-page-listitem-author">
                {{ book.authorNameString }}
              </p>
              <p class="book-page-listitem-bookdesc">{{ book.abstract }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import handleLoadBook from "./api/handleLoadBook";

export default {
  name: "book-home-page",
  data() {
    return {
      books: [],
      searchValue: "",
      isFetching: false,
      defaultSearchValue: "javascript",
      isAffix: false,
    };
  },
  computed: {
    bookSearchBarCls() {
      return {
        "book-page-searchbar": true,
        "book-page-searchbar-affix": this.isAffix,
      };
    },
    inputSize() {
      return this.isAffix ? "large" : "default";
    },
  },
  created() {
    this.handleSearch(this.defaultSearchValue);
  },
  methods: {
    handleScrollChange(affix) {
      this.isAffix = affix;
    },
    goDetails(bookId, bookName) {
      this.$router.push(`/book-details/${bookId}/${bookName}`);
    },
    async handleSearch(value) {
      this.searchValue = value;
      this.isFetching = true;
      try {
        const res = await handleLoadBook.call(this, value);
        if (res.status === 200) {
          this.books = res.data.bookItems;
        }
        this.isFetching = false;
      } catch (error) {
        this.isFetching = false;
      }
    },
  },
};
</script>
<style scoped src="./index.css"></style>
