<template>
  <div id="app">
    <Mlp msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Mlp from "./components/Mlp.vue";

export default {
  name: "App",
  components: {
    Mlp,
  },
};
</script>

<style>
body {
  margin-top: 60px;
  background: #f2f2f2;
  background-image: ("./assets/deep.png");
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
