export default function (value, currentPage, sort) {
  const searchParams = {
    categoryId: 0,
    edition: 4,
    name: value,
    page: currentPage || 1,
    sort,
  };
  return this.$http({
    url: `https://api.ituring.com.cn/api/Search/Advanced`,
    data: searchParams,
    method: "post",
  });
}
