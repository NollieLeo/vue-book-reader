export default function loadBookDetails(id) {
  return this.$http.get(`https://api.ituring.com.cn/api/Book/${id}`);
}
