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
export default {
  name: 'UserList',
  props: {
    userList: {
      default() {
        return []
      },
      type: Array
    }
  },
  methods: {
    deleteMovie(id) {
      this.$emit('deleteMovie', id)
    }
  }
}
</script>
