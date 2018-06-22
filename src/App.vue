<template>
  <div id="app">
  <FeaturedMovies/>
   
  </div>
</template>

<script>
import FeaturedMovies from './components/FeaturedMovies'
import UserList from './components/UserList'
export default {
  name: 'app',
  components: {
    FeaturedMovies,
    UserList
  }
}
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
