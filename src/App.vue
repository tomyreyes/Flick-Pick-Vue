<template>
	<div id="App">
		<v-app>
			<v-navigation-drawer 
				v-model="sideNav" 
				fixed 
				app>
				<v-list>
					<v-list-tile>
						<v-list-tile-title>
							My List
						</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-toolbar dark>
				<v-toolbar-side-icon 
					class="hidden-sm-and-up"
					@:click.stop="sideNav = !sideNav">
					X
				</v-toolbar-side-icon>
				<v-toolbar-title> Flick Pick </v-toolbar-title>
				<v-spacer/>
				<v-toolbar-items class="hidden-xs-only">
					<v-btn flat>My List</v-btn>
				</v-toolbar-items>
			</v-toolbar>
			<FeaturedMovies 
				:user-list="userList" 
				@:sendMovie="toggleMovie($event)"/>
			<UserList 
				:user-list="userList" 
				@:deleteMovie="deleteMovie($event)"/>
		</v-app>
	</div>
</template>


<script>
import FeaturedMovies from './components/FeaturedMovies'
import UserList from './components/UserList'
export default {
  name: 'App',
  components: {
    FeaturedMovies,
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
  /* margin-top: 60px; */
}
</style>
