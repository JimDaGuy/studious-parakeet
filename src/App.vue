<template>
  <div id="app">
    <Search/>
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "app",
  methods: {
    openModal(ref) {
      this.$refs[ref].open();
    }
  },
  components: {
    Search
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  min-width: 350px;
}
</style>
