<template>
	<div id="App">
		<v-app>
			<SearchToolBar/>
			<FeaturedMovies 
				:user-list="userList" 
				@sendMovie="toggleMovie($event)"/>
			<UserList 
				:user-list="userList" 
				@deleteMovie="deleteMovie($event)"/>
		</v-app>
	</div>
</template>


<script>
import FeaturedMovies from './components/FeaturedMovies'
import SearchBar from './components/SearchBar'
import SearchToolBar from './components/SearchToolBar'
import UserList from './components/UserList'
export default {
  name: 'App',
  components: {
    FeaturedMovies,
    SearchBar,
    SearchToolBar,
    UserList
  },
  data() {
    return {
      userList: [],
      sideNav: false
    }
  },
  methods: {
    toggleMovie(id) {
      if (!this.userList.includes(id)) {
        this.userList.push(id)
      } else {
        let keepList = this.userList.filter(value => value !== id)
        this.userList = keepList
      }
    },
    deleteMovie(id) {
      let keepList = this.userList.filter(value => value !== id)
      this.userList = keepList
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
}
</style>
