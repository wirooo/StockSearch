<template>
  <div id="app">
    <div class="container-fluid">
      <appNavBar></appNavBar>
      <div class="container-fluid" style="width: 85%;">
        <div class="mx-2 my-4">
          <searchBar></searchBar>
        </div>
        <focusConsole></focusConsole>
      </div>
    </div>
  </div>
</template>

<script>
import appNavBar from "./components/navBar.vue";
import focusConsole from "./components/focusConsole.vue";
import searchBar from "./components/searchBar.vue";

export default {
  components: {
    appNavBar,
    focusConsole,
    searchBar
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
