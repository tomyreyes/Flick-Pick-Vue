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
				class="Pages" 
				@sendMovie="toggleMovie"
				@deleteMovie="deleteMovie($event)"
			/>
			<Footer 
				id="Footer" 
				class="hidden-sm-and-down"
			/>
			<BottomNav
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
    p {
      text-align: justify;
      text-justify: inter-word;
    }
  }
  a {
    color: $main-font-color;
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
</style>
