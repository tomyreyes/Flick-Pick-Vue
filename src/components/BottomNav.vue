<template>
	<v-bottom-nav
		:value="true"
		fixed
		height="70"
		color="grey darken-4"
	>
		<v-btn
			dark
			flat
			@click="goHome"
		>
			<span>Home</span>
			<v-icon>home</v-icon>
		</v-btn>
		<v-btn
			dark
			flat
			@click="goToList"
		>
			<span>My List</span>
			<v-icon>local_movies</v-icon>
		</v-btn>
		<v-btn
			dark
			flat
			value="nearby"
			@click="goToAbout"
		>
			<span>About</span>
			<v-icon>help</v-icon>
		</v-btn>
	</v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav',
  methods: {
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
.v-btn {
  padding-bottom: 50px;
}
</style>