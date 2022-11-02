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
  background: #22273b;
  color: white;
  background-image: ("./assets/deep.png");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
