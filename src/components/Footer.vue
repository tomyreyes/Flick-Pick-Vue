<template>
	<v-footer
		height="auto"
	>
		<v-card
			class="flex grey darken-4"
			dark
			flat
			tile
		>
			<v-card-title class="justify-center">
				<v-spacer/>
				<v-btn
					flat
					@click="goHome"
				>
					Home
				</v-btn>
				<v-btn
					flat
					@click="goToAbout"
				>
					About
				</v-btn>
				<v-btn
					flat
					@click="goToList"
				>
					My List
				</v-btn>
			</v-card-title>
		</v-card>
	</v-footer>
</template>

<script>
export default {
  name: 'Footer',
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
<style>
.footer {
  background-color: #212121;
}
</style>


