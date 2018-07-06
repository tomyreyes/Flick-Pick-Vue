<template>
	<div>
		<v-navigation-drawer 
			v-model="sideNav" 
			fixed 
			app>
			<v-list>
				<v-list-tile>
					<v-list-tile-title>
						My List
					</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar
			dark	
		>
			<v-toolbar-side-icon 
				class="hidden-sm-and-up"
				@click.stop="sideNav = !sideNav">
				X
			</v-toolbar-side-icon>
			<v-toolbar-title class="title mr-4">Flick Pick</v-toolbar-title>
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
			<v-toolbar-items class="hidden-xs-only">
				<v-btn flat>My List</v-btn>
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
    }
  }
}
</script>