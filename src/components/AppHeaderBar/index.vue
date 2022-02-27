<template>
  <div class="app-header-bar">
    <component :is="headerBar"></component>
  </div>
</template>
<script>
import { IS_MAC } from "@/constants";
import AppHeaderMac from "./components/AppHeaderMac";
import AppHeaderWindows from "./components/AppHeaderWindows";

export default {
  name: "app-header-bar",
  components: { AppHeaderMac, AppHeaderWindows },
  computed: {
    IS_MAC() {
      return IS_MAC;
    },
    headerBar() {
      return this.IS_MAC ? "app-header-mac" : "app-header-windows";
    },
  },
};
</script>
<style lang="css" src="./index.css"></style>
