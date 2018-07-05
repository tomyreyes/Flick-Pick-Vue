<template>
	<v-card>
		<v-card-text>
			<v-autocomplete
				v-model="userInput"
				:search-input.sync="search"
				:loading="isLoading"
				placeholder="Search Movie"
			/>
		</v-card-text>
	</v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchBar',
  data() {
    return {
      userInput: '',
      isLoading: false,
      search: null,
      searchResults: []
    }
  },
  watch: {
    search(value) {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          query: value,
          page: 1,
          include_adult: 'false',
          api_key: '2d1610b0077610c43b2fe59ad827cfec',
          language: 'en-US'
        }
      })
        .then(response => (this.searchResults = response.data.results))
        .catch(err => console.log(err))
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
