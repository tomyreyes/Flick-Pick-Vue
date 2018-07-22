<template>
	<div id="App">
		<v-app>
			<SearchToolBar 
				:user-list="userList"
				:my-list="myList"
				:go-home="goHome"
				:go-to-about="goToAbout"
				:go-to-list="goToList"
				@deleteMovie="deleteMovie($event)"
				@sendMovie="toggleMovie($event)"
			/>
			<router-view
				:user-list="userList"
				:my-list="myList"
				:genres="genres"
				class="Pages" 
				@sendMovie="toggleMovie"
				@deleteMovie="deleteMovie($event)"
			/>
			<Footer 
				id="Footer" 
				:go-home="goHome"
				:go-to-about="goToAbout"
				:go-to-list="goToList"
				class="hidden-sm-and-down"
			/>
			<BottomNav
				:go-home="goHome"
				:go-to-about="goToAbout"
				:go-to-list="goToList"
				class="hidden-md-and-up"
			/>
		</v-app>
	</div>
</template>

<script>
import axios from 'axios'
import About from './components/About'
import BottomNav from './components/BottomNav'
import FeaturedMovies from './components/FeaturedMovies'
import Footer from './components/Footer'
import SearchToolBar from './components/SearchToolBar'
import MyList from './components/MyList'
import RandomMovie from './components/RandomMovie'

export default {
  name: 'App',
  components: {
    About,
    BottomNav,
    FeaturedMovies,
    Footer,
    RandomMovie,
    SearchToolBar,
    MyList
  },
  data() {
    return {
      userList: [],
      sideNav: false,
      myList: [],
      genres: [
        { text: 'Action', value: 28 },
        { text: 'Adventure', value: 12 },
        { text: 'Animation', value: 16 },
        { text: 'Comedy', value: 35 },
        { text: 'Crime', value: 80 },
        { text: 'Documentary', value: 99 },
        { text: 'Drama', value: 18 },
        { text: 'Family', value: 10751 },
        { text: 'Fantasy', value: 14 },
        { text: 'History', value: 36 },
        { text: 'Horror', value: 27 },
        { text: 'Music', value: 10402 },
        { text: 'Mystery', value: 9648 },
        { text: 'Romance', value: 10749 },
        { text: 'Science Fiction', value: 878 },
        { text: 'TV Movie', value: 10770 },
        { text: 'Thriller', value: 53 },
        { text: 'War', value: 10752 },
        { text: 'Western', value: 37 }
      ]
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
    },
    scrollToTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    goHome() {
      this.$router.push('/')
      this.scrollToTop()
    },
    goToList() {
      this.$router.push('/mylist')
      this.scrollToTop()
    },
    goToAbout() {
      this.$router.push('/about')
      this.scrollToTop()
    }
  }
}
</script>

<style lang="scss">
//variables
$primary-font-color: #2c3e50;
$title-margin: 30px;
$subtitle-margin: 30px;
$main-color: #212121;
$header-font: Roboto;
$main-font-color: #40a6da;
$alternate-font-color: #000000;
#App {
  color: $primary-font-color;
  text-align: center;
  h1,
  h2,
  h3,
  p {
    font-family: $header-font;
  }
  p {
    font-size: 16px;
  }
  a {
    color: $main-font-color;
    text-decoration: none;
  }
}

#Footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $main-color;
}
.Pages {
  margin-bottom: 70px;
}

body {
  background-color: $main-color;
}
ul {
  list-style: none;
}
.page-title {
  margin: $title-margin 0;
}
.subtitle {
  margin: $subtitle-margin 0;
  color: $main-font-color;
}

.subtitle-alternate {
  margin: $subtitle-margin 0;
  color: $alternate-font-color;
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
.main-btn {
  background-color: $main-font-color !important;
  color: #ffffff !important;
}
#nav-chip {
  background-color: $main-font-color;
}
@media only screen and (max-width: 999px) {
  .dialog-media {
    height: 300px !important;
  }
}
</style>
