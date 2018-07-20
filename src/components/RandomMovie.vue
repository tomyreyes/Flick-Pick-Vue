<template>
	<div class="random-container">
		<v-container>
			<h1 class="subtitle">Still can't find a movie? Find a movie based on genre!</h1>
			<v-layout 
				row 
				wrap 
				align-center
				justify-center
			>
				<v-flex
					xs-12
					sm6
				>
					<v-select
						:items="genres"
						v-model="selected"
						label="Genres"
						multiple
						chips
						outline
					/>
					<v-btn
						color="success"
						ripple
						@click="findMovie"
					>
						Find
					</v-btn>
					<h1
						v-if="noResults !== null"
					>
						{{ noResults }}</h1>
					<v-card v-if="randomMovie !== null">
						<v-card-media
							:src="`http://image.tmdb.org/t/p/w342${randomMovie.poster_path}`"
							class="poster" 
							height="550" 
							@click="moreDetails(randomMovie)" 
						/>
						<v-card-actions>
							<v-card-text>Score: {{ randomMovie.vote_average }}</v-card-text>
							<v-btn 
								v-if="userList.includes(randomMovie.id)" 
								icon
								ripple
								@click="sendMovie(randomMovie.id)"
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
								@click="sendMovie(randomMovie.id)"
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
								@click="moreDetails(randomMovie)">
								Details
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
			<v-dialog
				v-if="randomMovie !== null"
				v-model="dialog"
				width="1200"
			>
				<v-card>
					<v-card-title
						class="display-1"
					>
						{{ randomMovie.title }}
						<v-btn 
							v-if="userList.includes(randomMovie.id)"
							icon
							absolute
							right
							ripple
							@click="sendMovie(randomMovie.id)"
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
							@click="sendMovie(randomMovie.id)"
						> 
							<v-icon 
								dark 
								color="green accent-3" >
								add
							</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-media 
						v-if="randomMovie.backdrop_path !== null" 
						:src="`http://image.tmdb.org/t/p/w780${randomMovie.backdrop_path}`"
						class="dialog-media"
						height="700" 
					/>
					<v-card-media 
						v-else 
						:src="`http://image.tmdb.org/t/p/w780${randomMovie.poster_path}`"
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
						{{ randomMovie.overview }}
					</v-card-text>
					<v-card-title class="title cast">
						Cast
					</v-card-title>
					<v-divider/>
				</v-card>
			</v-dialog>
		</v-container>
	</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'RandomMovie',
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
    },
    moreDetails: {
      default() {
        return
      },
      type: Function
    },
    sendMovie: {
      default() {
        return
      },
      type: Function
    }
  },
  data() {
    return {
      selected: [],
      noResults: null,
      randomMovie: null,
      movieList: null,
      dialog: false
    }
  },
  methods: {
    getRandom() {
      const randomIndex = Math.floor(Math.random() * 20)
      this.randomMovie = this.movieList[randomIndex]
    },
    findMovie() {
      const genreIDs = this.selected.toString()
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
          include_adult: 'false',
          page: '1',
          language: 'en-US',
          api_key: '2d1610b0077610c43b2fe59ad827cfec',
          external_source: 'imdb_id',
          with_genres: genreIDs,
          sort_by: 'popularity.desc',
          include_video: 'false'
        }
      }).then(response => {
        const pageMax = response.data.total_pages
        const min = 1
        pageMax === 0 ? (this.noResults = 'No movie found') : ''
        const randomPage = Math.floor(Math.random() * (pageMax - min + 1)) + min
        axios({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie',
          params: {
            include_adult: 'false',
            page: randomPage,
            language: 'en-US',
            api_key: '2d1610b0077610c43b2fe59ad827cfec',
            external_source: 'imdb_id',
            with_genres: genreIDs,
            sort_by: 'popularity.desc',
            include_video: 'false'
          }
        }).then(response => {
          this.movieList = response.data.results
          this.getRandom()
          this.dialog = true
        })
      })
    }
  }
}
</script>
<style scoped>
.v-card {
  margin: 20px 0;
}
.random-container {
  background: #f6f6f6;
}
</style>