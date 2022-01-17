export default function (value) {
  const searchParams = {
    categoryId: 0,
    edition: 4,
    name: value,
    page: 1,
    sort: "new",
  };
  return this.$http({
    url: `https://api.ituring.com.cn/api/Search/Advanced`,
    data: searchParams,
    method: "post",
  });
}
