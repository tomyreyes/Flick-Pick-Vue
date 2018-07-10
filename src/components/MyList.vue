<template>
	<div>
		<h1>My List</h1>
		<v-container grid-list-md>
			<v-layout 
				align-center 
				justify-center 
				row
			>
				<h4 v-if="myList.length === 0">Your list is empty</h4>
				<v-flex
					v-for="(movie, index) in myList"
					:key="index"
					xs4
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
							<v-icon 
								dark 
								color="red darken-1"   
								@click="sendMovie(movie.id)">remove
							</v-icon>
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
						icon
						absolute
						right
						@click="sendMovie(clickedMovie.id)"
					>
						<v-icon 
							dark 
							color="red darken-1">remove</v-icon>
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
  name: 'MyList',
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
      myList: [],
      dialog: false,
      clickedMovie: null
    }
  },
  watch: {
    userList(id) {
      if (!this.userList.includes(id)) {
        axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${id}`,
          params: {
            api_key: '2d1610b0077610c43b2fe59ad827cfec'
          }
        })
          .then(response => this.myList.push(response.data))
          .catch(err => console.log(err))
      }
    }
  },
  created() {
    this.userList.forEach(movieID => {
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieID}`,
        params: {
          api_key: '2d1610b0077610c43b2fe59ad827cfec'
        }
      })
        .then(response => this.myList.push(response.data))
        .catch(err => console.log(err))
    })
  },
  methods: {
    sendMovie(id) {
      this.$emit('sendMovie', id)
    },
    deleteMovie(id) {
      this.$emit('deleteMovie', id)
    },
    moreDetails(movie) {
      this.dialog = true
      this.clickedMovie = movie
    }
  }
}
</script>
