import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "book-page",
      component: require("@/views/book-page/book-home-page.vue").default,
    },
    {
      path: "/book-details/:id/:name",
      component: () => import("@/views/book-details/book-details.vue"),
      name: "book-details",
    },
    {
      path: "/book-chapter-details/:chapterId/:bookAndChapterName",
      component: () =>
        import("@/views/book-chapter-details/book-chapter-details.vue"),
      name: "book-chapter-details",
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
