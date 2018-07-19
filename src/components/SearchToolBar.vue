<template>
	<div>
		<v-toolbar
			dark	
		>
			<router-link to="/">
				<img 
					id="desktop-logo"
					class="hidden-sm-and-down" 
					src="./../assets/flick-pick-desktop.png"
				>
				<img 
					id="mobile-logo"
					class="hidden-md-and-up"
					src="./../assets/flick-pick-mobile.png"
				>
			</router-link>
			<v-spacer/>
			<v-autocomplete
				v-model="model"
				:items="items"
				:loading="isLoading"
				:search-input.sync="search"
				clearable
				hide-details
				hide-selected
				item-text="title"
				item-value="id"
				label="Search for a movie..."
				solo
			>
				<template slot="no-data">
					<v-list-tile>
						<v-list-tile-title>
							Search for your favorite
							<strong>Movie</strong>
						</v-list-tile-title>
					</v-list-tile>
				</template>
				<template
					slot="item"
					slot-scope="{ item, tile }"
				>
					<v-list-tile-content>
						<v-list-tile-title 
							@click="moreDetails(item)"
							v-text="item.title"
						/>
						<v-list-tile-sub-title v-text="item.release_date"/>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn 
							v-if="userList.includes(item.id)"
							icon
							absolute
							right
							ripple
							@click="sendMovie(item.id)"
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
							@click="sendMovie(item.id)"
						> 
							<v-icon 
								dark 
								color="green accent-3" >
								add
							</v-icon>
						</v-btn>
					</v-list-tile-action>
				</template>
			</v-autocomplete>
			<v-spacer/>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn 
					flat
					@click="goToAbout"
				>
					About
				</v-btn>
				<v-spacer/>
				<v-btn 
					flat
					@click="goToList"
				>
					<v-chip>
						{{ userList.length }}
					</v-chip>
					My List
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
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
  name: 'SearchToolBar',
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
      clickedMovie: null,
      dialog: false,
      isLoading: false,
      items: [],
      model: null,
      search: null,
      sideNav: false
    }
  },
  watch: {
    search(val) {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          query: val,
          page: 1,
          include_adult: 'false',
          api_key: '2d1610b0077610c43b2fe59ad827cfec',
          language: 'en-US'
        }
      })
        .then(response => (this.items = response.data.results))
        .catch(err => console.log(err))
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    sendMovie(id) {
      this.$emit('sendMovie', id)
    },
    moreDetails(movie) {
      this.dialog = true
      this.clickedMovie = movie
    },
    goHome() {
      this.$router.push('/')
    },
    goToList() {
      this.$router.push('/mylist')
    },
    goToAbout() {
      this.$router.push('/about')
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

.v-card__title {
  justify-content: center;
}
#desktop-logo {
  height: 70px;
  width: 70px;
}
#mobile-logo {
  height: 50px;
  width: 50px;
}
</style>