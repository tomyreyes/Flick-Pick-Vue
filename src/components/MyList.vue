<template>
	<div>
		<h1>My List</h1>
		<v-container grid-list-md>
			<v-layout 
				align-center 
				justify-center 
				row
			>
				<h4 v-if="userList.length === 0">Your list is empty</h4>
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
						@click="deleteMovie(clickedMovie.id)"
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
export default {
  name: 'MyList',
  props: {
    userList: {
      default() {
        return []
      },
      type: Array
    },
    myList: {
      default() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      dialog: false,
      clickedMovie: null
    }
  },
  methods: {
    sendMovie(id) {
      this.$emit('sendMovie', id)
    },
    deleteMovie(id) {
      this.$emit('deleteMovie', id)
      let keepList = this.myList.filter(value => value.id !== id)
      this.myList = keepList
    },
    moreDetails(movie) {
      this.dialog = true
      this.clickedMovie = movie
    }
  }
}
</script>