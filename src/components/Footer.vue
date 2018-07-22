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
  props: {
    goHome: {
      default() {
        return
      },
      type: Function
    },
    goToAbout: {
      default() {
        return
      },
      type: Function
    },
    goToList: {
      default() {
        return
      },
      type: Function
    }
  }
}
</script>
<style>
.footer {
  background-color: #212121;
}
</style>


