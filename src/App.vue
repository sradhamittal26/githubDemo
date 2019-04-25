<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.vue-star-rating .vue-star-rating-star{
  height: 18px !important;
  width: 20px !important;
}
.vue-star-rating{
  display: block !important;
}
.vue-star-rating-rating-text{
  display: none !important;
}
</style>
