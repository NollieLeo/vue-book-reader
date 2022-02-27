<template>
  <div id="app">
    <app-header-bar></app-header-bar>
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeaderBar from "./components/AppHeaderBar";
export default {
  name: "books-readeer",
  components: {
    AppHeaderBar,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.app-container {
  margin: 0 auto;
  flex: 1;
  overflow: auto;
  width: 100%;
}
</style>
