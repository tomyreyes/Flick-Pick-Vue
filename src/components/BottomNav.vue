<template>
	<v-bottom-nav
		:value="true"
		absolute
		color="transparent"
	>
		<v-btn
			color="teal"
			flat
			value="recent"
			@click="goHome"
		>
			<v-icon>history</v-icon>
		</v-btn>
		<v-btn
			color="teal"
			flat
			value="favorites"
			@click="goToList"
		>
			<span>Favorites</span>
			<v-icon>favorite</v-icon>
		</v-btn>
		<v-btn
			color="teal"
			flat
			value="nearby"
			@click="goToAbout"
		>
			<span>Nearby</span>
			<v-icon>place</v-icon>
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
