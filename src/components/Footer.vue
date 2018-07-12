<template>
	<v-footer
		class="black"
		height="auto"
	>
		<v-card
			dark
			class="flex black"
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
				<v-space/>
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