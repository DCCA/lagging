<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap');

#app {
  font-family: 'MuseoModerno', cursive;
  max-width: 1250px;
  min-height: 100vh;
  margin: auto;
}
</style>
