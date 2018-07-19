<template>
	<div>
		<v-jumbotron
			height="600px"
			dark
			class="responsive-image"
		>
			<v-container fill-height>
				<v-layout align-center>
					<v-flex text-xs-center>
						<h4 class="display-2">End the movie night struggle</h4>
					</v-flex>
				</v-layout>
			</v-container>
		</v-jumbotron>
		<h1 class="page-title">This week's top movies</h1>
		<v-container grid-list-md >
			<carousel
				:loop="true"
				:mouse-drag="false"
				:navigation-enabled="true"
				:scroll-per-page="false"
				:per-page-custom="[[360, 1],[480, 2], [700, 3], [900,4], [1264, 5], [1904, 6]]"
			>
				<slide
					v-for="(movie, index ) in movieList" 
					:key="index"
					class="carousel-card"
				>
					<v-card >
						<v-card-media
							:src="`http://image.tmdb.org/t/p/w342${movie.poster_path}`" 
							:contain="true"
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
	</div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'FeaturedMovies',
  components: {
    Carousel,
    Slide
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
      movieList: null,
      dialog: false,
      clickedMovie: null
    }
  },
  created() {
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/4/list/10',
      params: {
        page: 1,
        api_key: '2d1610b0077610c43b2fe59ad827cfec'
      }
    }).then(response => (this.movieList = response.data.results))
  },
  methods: {
    sendMovie(id) {
      this.$emit('sendMovie', id)
    },
    moreDetails(movie) {
      this.dialog = true
      this.clickedMovie = movie
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
.responsive-image {
  background: url('./../assets/movie-theatre.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100;
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