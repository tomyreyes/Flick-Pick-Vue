<template>
	<div>
		<h1>My List</h1>
		<ul>
			<li 
				v-for="(movie, index) in userList" 
				:key="index"
			>
				{{ movie }}
				<v-btn 
					small 
					@click="deleteMovie(movie)">
					X
				</v-btn >
			</li>
		</ul>
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
      myList: []
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
      }).then(response => this.myList.push(response.data))
    })
  },
  methods: {
    deleteMovie(id) {
      this.$emit('deleteMovie', id)
    }
  }
}
</script>
