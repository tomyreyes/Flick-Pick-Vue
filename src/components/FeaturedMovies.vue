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
					class="feature-message subtitle-alternate">Are you a movie lover that struggles to make decisions?
				</h1>
				<p>Why waste hours every time you want to watch a movie? 
					<br>Spend more time watching and less time arguing.
				</p>
				<h1 class="subtitle">Let us help you decide.</h1>
				
				<!-- <h2 class="subtitle">Featuring movies from:</h2>
				<img src="./../assets/tmdb.png">
				<img src="./../assets/tmdb.png"> -->
				
			</v-container> 
		</div>
		<div class="genre-container">
			<h1
				class="subtitle-alternate">This week's featured movies</h1>
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
						class="hidden-sm-and-down"
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
						class="hidden-sm-and-down"
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
				<v-card-actions 
					class="hidden-md-and-up"
				>
					<v-btn 
						v-if="userList.includes(clickedMovie.id)" 
						icon
						ripple
						@click="sendMovie(clickedMovie.id)"
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
						@click="sendMovie(clickedMovie.id)"
					>
						<v-icon 
							color="green accent-3" 
							dark 
						>
							add
						</v-icon>
					</v-btn>
				</v-card-actions>
				<v-divider/>
			</v-card>
		</v-dialog>
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
    },
    genres: {
      default() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
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
.feature-message {
  padding-top: 30px;
}
.main-text {
  color: black;
}
.feature-container {
  background: #f6f6f6;
  margin-top: -32px; /*removes gap between container ands jumobtron */
}
.message-end {
  text-align: center;
  text-justify: inter-word;
  margin-bottom: 30px;
}
.jumbotron-img {
  background: url('./../assets/fm.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100;
  opacity: 0.8;
}
p {
  font-size: 18px;
}
</style>