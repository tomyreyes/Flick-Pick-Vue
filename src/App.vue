<template>
  <div id="app">
  <FeaturedMovies v-bind:userList="userList" v-on:sendMovie="addMovie($event)"/>
  <UserList v-bind:userList="userList"/>
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
  },
  data(){
    return{
      userList: []
    }
  },
  methods:{
    addMovie(id){
      if(!this.userList.includes(id)){
      
      this.userList.push(id)
      
      } else {
        let filteredList = this.userList.filter(value => value !== id)
        this.userList = filteredList
      }
    }
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
