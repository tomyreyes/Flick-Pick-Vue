<template>
	<div>
		<h1 class="page-title">My List</h1>
		<RandomMovie
			v-if="userList.length === 0"
			class="random-movie"
		/>
		<v-btn 
			v-else-if="userList.length !== 0 && randomMovie === null" 
			color="success"
			ripple
			@click="randomizeMovie"
		>
			Pick a movie
		</v-btn>
		<transition name="fade-title">
			<h2
				v-if="showMessage"
				class="subtitle"
			>
				Tonight you are watching
			</h2>
		</transition>
		<v-container grid-list-md>
			<transition name="fade">
				<v-layout
					v-if="showList"
					key="wrapper"
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
						md6
						lg4
						xl3
						flex-box
					>
						<v-card >
							<v-card-media
								:src="`http://image.tmdb.org/t/p/w342${movie.poster_path}`" 
								height="550" 
								class="poster"
								@click="moreDetails(movie)" 
							/>
							<v-card-actions>
								<v-card-text>Score: {{ movie.vote_average }}</v-card-text>
								<v-btn 
									key="remove-btn"
									icon
									ripple
									@click="sendMovie(movie.id)"
								>
									<v-icon 
										key="remove-icon"
										dark 
										color="red darken-1"
									>
										remove
									</v-icon>
								</v-btn>
								<v-btn 
									key="details-btn"
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
			</transition>
			<transition name="zoom-in">
				<v-layout
					v-if="randomMovie !== null"
					key="wrapper"
					align-center 
					justify-center 
					row
				>
					<v-flex
						xs-12
						sm6
						md6
						lg4
						xl3
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
			</transition>
		</v-container>
		<v-btn
			v-if="randomMovie !== null"
			color="error"
			ripple
			@click="undoRandomize"
		>
			Return My List 
		</v-btn>
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
import RandomMovie from './RandomMovie'
export default {
  name: 'MyList',
  components: {
    RandomMovie
  },
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
      randomMovie: null,
      showList: true,
      showMessage: false
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
      this.showList = false
      this.showMessage = true
      setTimeout(() => {
        this.randomMovie = this.myList[randomArrayIndex]
      }, 2000)
    },
    undoRandomize() {
      this.randomMovie = null
      this.showMessage = false
      setTimeout(() => {
        this.showList = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-title-enter-active,
.fade-title-leave-active {
  transition: opacity 2s;
}
.fade-title-enter,
.fade-title-leave-to {
  opacity: 0;
}
.zoom-in-enter-active {
  animation: zoom 0.5s ease-in;
}
.zoom-in-leave-active {
  animation: zoom 0.5s reverse ease-in;
}
@keyframes zoom {
  0% {
    transform: rotate(0) scale(0);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
.random-movie {
  background: #fafafa;
}
</style>
