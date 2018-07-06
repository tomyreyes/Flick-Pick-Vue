<template>
	<v-toolbar
		color="orange accent-1"
		prominent
		tabs
	>
		<v-toolbar-side-icon/>
		<v-toolbar-title class="title mr-4">Search</v-toolbar-title>
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
						v-text="item.title"/>
					<v-list-tile-sub-title v-text="item.release_date"/>
				</v-list-tile-content>
				<v-list-tile-action>
					<v-icon>mdi-coin</v-icon>
				</v-list-tile-action>
			</template>
		</v-autocomplete>
		<v-tabs
			slot="extension"
			:hide-slider="!model"
			color="transparent"
			slider-color="blue-grey"
		>
			<v-tab :disabled="!model">News</v-tab>
			<v-tab :disabled="!model">Trading</v-tab>
			<v-tab :disabled="!model">Blog</v-tab>
		</v-tabs>
	</v-toolbar>
</template>
	

<script>
import axios from 'axios'
export default {
  name: 'SearchToolBar',
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null
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
  }
}
</script>