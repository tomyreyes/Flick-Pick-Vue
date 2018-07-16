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
				<strong class="subheading">Flick Pick</strong>

				<v-spacer/>
				<v-btn
					flat
				>
					About
				</v-btn>
				<v-spacer/>
				<v-btn
					flat
				>
					My List
				</v-btn>
			</v-card-title>
		</v-card>
	</v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style>
.footer {
  background-color: #212121;
}
</style>


