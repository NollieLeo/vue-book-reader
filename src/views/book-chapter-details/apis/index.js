function loadChapterDetail(chapterId) {
  return this.$http({
    url: `https://api.ituring.com.cn/api/Book/Tupub/${chapterId}?id=${chapterId}`,
    method: "get",
  });
}

export { loadChapterDetail };
