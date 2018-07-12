<template>
	<div>
		<h1 class="page-title">My List</h1>
		<h3 
			v-if="userList.length === 0"
			class="subtitle" 
		>
			Your list is empty
		</h3>
		<v-btn 
			v-else-if="userList.length !== 0 && randomMovie === null" 
			color="success"
			ripple
			@click="randomizeMovie"
		>
			Pick a movie
		</v-btn>
		<v-btn
			v-else
			color="error"
			ripple
			@click="undoRandomize"
		>
			Undo
		</v-btn>
		<v-container grid-list-md>
			<v-layout
				v-if="randomMovie === null"
				align-center 
				justify-center 
				row
				wrap
			>
				<v-flex
					v-for="(movie, index) in myList"
					:key="index"
					xs-12
					sm6
					md4
					lg3
					xl3
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
								small 
								flat 
								ripple
								@click="moreDetails(movie)">
								Details
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout
				v-else
				align-center 
				justify-center 
				row
			>
				<v-flex
					xs4
					flex-box
				>
					<v-card >
						<v-card-media
							:src="`http://image.tmdb.org/t/p/w342${randomMovie.poster_path}`" 
							class="poster" 
							height="550" 
							@click="moreDetails(randomMovie)" 
						/>
						<v-card-actions>
							<v-card-text>Score: {{ randomMovie.vote_average }}</v-card-text>
							<v-icon 
								dark 
								color="red darken-1"   
								@click="sendMovie(randomMovie.id)">remove
							</v-icon>
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
						ripple
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
      clickedMovie: null,
      randomMovie: null
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
    },
    randomizeMovie() {
      const randomArrayIndex = Math.floor(Math.random() * this.myList.length)
      this.randomMovie = this.myList[randomArrayIndex]
    },
    undoRandomize() {
      this.randomMovie = null
    }
  }
}
</script>
