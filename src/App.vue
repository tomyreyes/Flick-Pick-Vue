<template>
	<div id="App">
		<v-app>
			<SearchToolBar 
				:user-list="userList"
				@deleteMovie="deleteMovie($event)"
				@sendMovie="toggleMovie($event)"
			/>
			<router-view 
				:user-list="userList"
				@sendMovie="toggleMovie"
				@deleteMovie="deleteMovie($event)"
			/>
		</v-app>
	</div>
</template>

<script>
import FeaturedMovies from './components/FeaturedMovies'
import SearchToolBar from './components/SearchToolBar'
import MyList from './components/MyList'
export default {
  name: 'App',
  components: {
    FeaturedMovies,
    SearchToolBar,
    MyList
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
