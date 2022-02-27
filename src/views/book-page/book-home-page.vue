<template lang="">
  <div class="book-page-home">
    <!-- 搜索条 -->
    <a-affix :target="() => affixTarget" @change="handleScrollChange">
      <div :class="bookSearchBarCls">
        <h1 v-if="!isAffix" style="text-align: center">搜索图书</h1>
        <!-- searchForm -->
        <div class="book-page-searchform">
          <a-select
            default-value="new"
            style="width: 120px"
            @change="handleSortChange"
            :size="inputSize"
          >
            <a-select-option value="new"> 最新 </a-select-option>
            <a-select-option value="hot"> 最热 </a-select-option>
            <a-select-option value="vote"> 推荐 </a-select-option>
          </a-select>
          <a-input-search
            placeholder="输入图书名称"
            enter-button
            allowClear
            :size="inputSize"
            @change="handleChangeSearchValue"
            @search="handleSearch"
            :loading="isFetching"
          />
        </div>
      </div>
    </a-affix>
    <!-- 主要内容 -->
    <div class="book-page-container">
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

      <a-pagination
        v-model="currentPage"
        :total="paginationInfo.totalItemCount"
        show-less-items
        :defaultPageSize="15"
        class="book-page-pagination"
      />
    </div>
  </div>
</template>
<script>
import handleLoadBook from "./api/handleLoadBook";

const defaultPage = 1;

export default {
  name: "book-home-page",
  data() {
    return {
      books: [],
      isFetching: false,
      isAffix: false,

      // form data & page data
      searchValue: "",
      sortedValue: "new",
      currentPage: defaultPage,
      paginationInfo: {},
    };
  },
  watch: {
    currentPage(val, olderVal) {
      if (val !== olderVal) {
        this.handleSearch();
      }
    },
    sortedValue(val, olderVal) {
      if (val !== olderVal) {
        this.resetCurrentPage();
        this.handleSearch();
      }
    },
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
    affixTarget() {
      const target = document.querySelector(".app-container");
      console.log(target);
      return target;
    },
  },
  created() {
    this.handleSearch();
  },
  methods: {
    resetCurrentPage() {
      this.currentPage = defaultPage;
    },
    resetSearchValue() {
      this.searchValue = "";
    },
    resetAllSort() {
      this.resetCurrentPage();
    },
    handleSortChange(value) {
      this.sortedValue = value;
    },
    handleChangeSearchValue(e) {
      this.searchValue = e.target.value;
    },
    handleScrollChange(affix) {
      this.isAffix = affix;
    },
    goDetails(bookId, bookName) {
      this.$router.push(`/book-details/${bookId}/${bookName}`);
    },
    async handleSearch() {
      this.isFetching = true;
      try {
        const res = await handleLoadBook.call(
          this,
          this.searchValue,
          this.currentPage,
          this.sortedValue
        );
        if (res.status === 200) {
          this.books = res.data.bookItems;
          this.paginationInfo = res.data.pagination;
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
