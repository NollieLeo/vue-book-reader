<template lang="">
  <div class="book-details-introduce">
    <section>
      <h3>特别说明</h3>
      <p v-html="briefIntro.specialNotes"></p>
    </section>
    <section>
      <h3>简介</h3>
      <p v-html="briefIntro.abstract"></p>
    </section>
    <section>
      <h3>本书特色</h3>
      <p v-html="briefIntro.highlight"></p>
    </section>
    <section>
      <h3>作译者介绍</h3>
      <p v-html="briefIntro.authorInfo"></p>
    </section>
  </div>
</template>
<script>
export default {
  name: "book-introduce",
  props: {
    briefIntro: {
      type: Object,
    },
  },
};
</script>
<style scoped>
/* .book-details-introduce > section + section {
  margin-top: 0;
} */
.book-details-introduce > section > h3 {
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #152844;
  height: 16px;
  border-left: 4px solid #4684e2;
  margin: 27px 0 11px;
  padding: 0 0 0 8px;
}

.book-details-introduce > section > p {
  color: #484848;
  font-size: 16px;
  line-height: 26px;
  padding-left: 12px;
  margin: 11px 0;
  white-space: pre-wrap;
}
</style>
