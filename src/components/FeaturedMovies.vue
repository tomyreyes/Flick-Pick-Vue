<template>
	<div>
		<v-jumbotron
			height="600px"
			class="jumbotron-img"
		>
			<v-container fill-height>
				<v-layout align-center>
					<v-flex text-xs-center>
						<h2 class="display-2 font-weight-bold main-text">End The Movie Night Struggle</h2>
					</v-flex>
				</v-layout>
			</v-container>
		</v-jumbotron>
		<div class="feature-container">
			<v-container 
				grid-list-md 
			>
				<h1 
					class=" feature-message subtitle">Let us help you decide
				</h1>
				<h3>Why waste hours everytime you want to watch a movie? Flick Pick will make the decision for you. 
				</h3>
				<h3 class="message-end">Our platform will help you spend more time watching movies and less time scrolling.</h3>
				
			</v-container> 
		</div>
		<div class="genre-container">
			<h1
				class="subtitle">This week's featured movies</h1>
			<v-container grid-list-md >
				<carousel
					:loop="true"
					:mouse-drag="false"
					:navigation-enabled="true"
					:scroll-per-page="false"
					:per-page-custom="[[360, 1],[480, 2], [700, 3], [900,4], [1264, 5], [1904, 6]]"
				>
					<slide
						v-for="(movie, index ) in featuredMovies" 
						:key="index"
						class="carousel-card"
					>
						<v-card >
							<v-card-media
								:src="`http://image.tmdb.org/t/p/w342${movie.poster_path}`" 
								:contain="true"
								class="poster"
								height="342" 
								@click="moreDetails(movie)" 
							/>
							<v-card-actions>
								<v-card-text>Score: {{ movie.vote_average }}</v-card-text>
								<v-btn 
									v-if="userList.includes(movie.id)" 
									icon
									ripple
									@click="sendMovie(movie.id)"
								>
									<v-icon 
										dark 
										color="red darken-1"   
									>
										remove
									</v-icon>
								</v-btn>
								<v-btn
									v-else
									icon
									ripple
									@click="sendMovie(movie.id)"
								>
									<v-icon 
										color="green accent-3" 
										dark 
									>
										add
									</v-icon>
								</v-btn>
								<v-btn 
									small 
									flat 
									@click="moreDetails(movie)">
									Details
								</v-btn>
							</v-card-actions>
						</v-card>
					</slide>
				</carousel>
			</v-container>
		</div>
		<div class="feature-container">
			<v-container grid-list-md>
				<h1
					class="subtitle"
				>Select a genre</h1>
				<v-layout
					align-center
					justify-center
				>
					<v-flex
						xs-12
						sm6
					>
						<v-select
							v-model="chosenGenre"
							:items="genres"
							label="Genres"
							outline
							@change="genreChange"
						/>
					</v-flex>
				</v-layout>
				<carousel
					:loop="true"
					:mouse-drag="false"
					:navigation-enabled="true"
					:scroll-per-page="false"
					:per-page-custom="[[360, 1],[480, 2], [700, 3], [900,4], [1264, 5], [1904, 6]]"
				>
					<slide
						v-for="(movie, index ) in genreMovies" 
						:key="index"
						class="carousel-card"
					>
						<v-card >
							<v-card-media
								:src="`http://image.tmdb.org/t/p/w342${movie.poster_path}`" 
								:contain="true"
								class="poster"
								height="342" 
								@click="moreDetails(movie)" 
							/>
							<v-card-actions>
								<v-card-text>Score: {{ movie.vote_average }}</v-card-text>
								<v-btn 
									v-if="userList.includes(movie.id)" 
									icon
									ripple
									@click="sendMovie(movie.id)"
								>
									<v-icon 
										dark 
										color="red darken-1"   
									>
										remove
									</v-icon>
								</v-btn>
								<v-btn
									v-else
									icon
									ripple
									@click="sendMovie(movie.id)"
								>
									<v-icon 
										color="green accent-3" 
										dark 
									>
										add
									</v-icon>
								</v-btn>
								<v-btn 
									small 
									flat 
									@click="moreDetails(movie)">
									Details
								</v-btn>
							</v-card-actions>
						</v-card>
					</slide>
				</carousel>
			</v-container>
		</div>
		<v-dialog 
			v-if="clickedMovie !== null"
			v-model="dialog"
			width="1200"
		>
			<v-card>
				<v-card-title
					class="display-1"
				>
					{{ clickedMovie.title }}
					<v-btn 
						v-if="userList.includes(clickedMovie.id)"
						icon
						absolute
						right
						ripple
						@click="sendMovie(clickedMovie.id)"
					>
						<v-icon 
							dark 
							color="red darken-1">remove</v-icon>
					</v-btn>
					<v-btn
						v-else
						icon
						absolute
						right
						ripple
						@click="sendMovie(clickedMovie.id)"
					> 
						<v-icon 
							dark 
							color="green accent-3" >
							add
						</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-media 
					:src="`http://image.tmdb.org/t/p/w780${clickedMovie.backdrop_path}`"
					class="dialog-media"
					height="700" 
				/>
				<v-card-title
					class="title"
				>
					Overview
				</v-card-title>
				<v-card-text
					class="body-2"
				>
					{{ clickedMovie.overview }}
				</v-card-text>
				<v-card-title class="title cast">
					Cast
				</v-card-title>
				<v-divider/>
			</v-card>
		</v-dialog>
		<!-- <RandomMovie
			:genres="genres"
			:user-list="userList"
			:more-details="moreDetails"
			:send-movie="sendMovie"
		/> -->
	</div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'
import RandomMovie from './RandomMovie'

export default {
  name: 'FeaturedMovies',
  components: {
    Carousel,
    Slide,
    RandomMovie
  },
  props: {
    userList: {
      default() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
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
      ],
      featuredMovies: null,
      dialog: false,
      clickedMovie: null,
      genreMovies: null,
      genreList: null,
      chosenGenre: 14
    }
  },
  created() {
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/4/list/7',
      params: {
        page: 1,
        api_key: '2d1610b0077610c43b2fe59ad827cfec'
      }
    }).then(response => (this.featuredMovies = response.data.results))
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        include_adult: 'false',
        language: 'en-US',
        api_key: '2d1610b0077610c43b2fe59ad827cfec',
        external_source: 'imdb_id',
        with_genres: this.chosenGenre,
        sort_by: 'popularity.desc',
        include_video: 'false'
      }
    }).then(response => (this.genreMovies = response.data.results))
  },
  methods: {
    sendMovie(id) {
      this.$emit('sendMovie', id)
    },
    moreDetails(movie) {
      this.dialog = true
      this.clickedMovie = movie
    },
    genreChange(genre) {
      this.chosenGenre = genre
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
          include_adult: 'false',
          language: 'en-US',
          api_key: '2d1610b0077610c43b2fe59ad827cfec',
          external_source: 'imdb_id',
          with_genres: this.chosenGenre,
          sort_by: 'popularity.desc',
          include_video: 'false'
        }
      }).then(response => (this.genreMovies = response.data.results))
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 999px) {
  .dialog-media {
    height: 300px !important;
  }
}
.feature-message {
  padding-top: 50px;
}
.main-text {
  color: black;
}
.feature-container {
  background: #f6f6f6;
  margin-top: -32px;
}
.message-end {
  margin-bottom: 30px;
}
.jumbotron-img {
  background: url('./../assets/fm.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100;
  opacity: 0.8;
}
.tns-item {
  font-size: 3rem;
  font-family: Arial;
  text-align: center;
  padding: 2em;
  background: #fafafb;
}
.tns-item:nth-child(odd) {
  background: #c8e1ff;
}
</style>