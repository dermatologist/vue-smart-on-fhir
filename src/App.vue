<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloPatient msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloPatient from './components/HelloPatient.vue';

export default {
  name: 'app',
  components: {
    HelloPatient,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
