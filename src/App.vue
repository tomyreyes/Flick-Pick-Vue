<template>
	<div id="App">
		<v-app>
			<SearchToolBar 
				:user-list="userList"
				:my-list="myList"
				@deleteMovie="deleteMovie($event)"
				@sendMovie="toggleMovie($event)"
			/>
			<router-view 
				:user-list="userList"
				:my-list="myList"
				@sendMovie="toggleMovie"
				@deleteMovie="deleteMovie($event)"
			/>
		</v-app>
	</div>
</template>

<script>
import axios from 'axios'
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
      sideNav: false,
      myList: []
    }
  },
  methods: {
    toggleMovie(id) {
      if (!this.userList.includes(id)) {
        this.addMovie(id)
      } else {
        this.deleteMovie(id)
      }
    },
    addMovie(id) {
      this.userList.push(id)
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
          api_key: '2d1610b0077610c43b2fe59ad827cfec'
        }
      })
        .then(response => this.myList.push(response.data))
        .catch(err => console.log(err))
    },
    deleteMovie(id) {
      let userKeepList = this.userList.filter(value => value !== id)
      this.userList = userKeepList
      let myKeepList = this.myList.filter(value => value.id !== id)
      this.myList = myKeepList
    }
  }
}
</script>

<style lang="scss">
//variables
$primary-font-color: #2c3e50;
$title-margin: 30px;
$subtitle-margin: 30px;

#App {
  color: $primary-font-color;
  text-align: center;
}
ul {
  list-style: none;
}
.page-title {
  margin-top: $title-margin;
}
.subtitle {
  margin-top: $subtitle-margin;
}
.poster:hover {
  opacity: 0.7;
}
.cast {
  justify-content: left !important;
}
.v-card__title {
  justify-content: center;
}
</style>
