<template>
	<div>
		<h1 class="page-title">This week's top movies</h1>
		<v-container grid-list-md >
			<v-layout
				row
				wrap>
				<v-flex 
					v-for="(movie, index ) in movieList" 
					:key="index"
					xs-12
					sm6
					md6
					lg4
					xl3
					align-end 
					flex-box 
				>
					<v-card >
						<v-card-media
							:src="`http://image.tmdb.org/t/p/w342${movie.poster_path}`" 
							class="poster" 
							height="550" 
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
				</v-flex>
			</v-layout>
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

export default {
  name: 'FeaturedMovies',
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
</style>