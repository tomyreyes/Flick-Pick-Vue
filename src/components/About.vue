<template>
	<div>
		<v-jumbotron
			height="600px"
			dark
			class="jumbotron-img"
		>
			<v-container fill-height>
				<v-layout align-center>
					<v-flex text-xs-center>
						<h4 class="display-2">Spend More Time Watching</h4>
					</v-flex>
				</v-layout>
			</v-container>
		</v-jumbotron>
		<v-container 
			grid-list-md 
			text-xs-center
		>
			<h1 class="subtitle">Solving First World Problems</h1>
			<p>
				Flick Pick has been designed for those who love movies and loathe making decisions. Do you consistantly find yourself in a position where you spend hours trying to find the right movie to watch?
				Do you constantly argue and debate with your loved ones about which movie you will be watching that evening? You are not alone.
				<a 
					href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
					target="_blank">
					Studies show that 93% of all Canadians struggle to find a movie to watch on a regular basis.
				</a>
				Flick Pick is the vaccine for this epidemic.
			</p>
			<h1 class="subtitle">How It Works</h1>
			<p>
				Let me set a scene for you. It's a rainy Friday evening and you are with your girlfriend and her two sisters. Seeing as you all have nothing else to do on an evening such as this, you decide to turn on Netflix. 
				You then begin scrolling through the vast variety of movies available on this platform. Oh you see that The Town has been recently added and you excitedly pitch the movie to the group. Here it comes. Slowly, all three of them turn their heads at you and one of them emphatically says, "We are NOT watching a dumb movie about bank robbers!".
				Now bitter from that insult (how dare they insult Ben Affleck's finest piece) you then ask them to suggest movies. They begin firing off movie titles. One of them suggests Ghostbusters, not the good one made in 1984 but the 2016 one, *sigh*. The other two suggest The Conjuring and Ferris Bueller's Day Off. These suggestions are all over the place. 
			</p>
			<p>
				Before an argument ensues, like usual, take action and open up Flick Pick. 
				Before using it explain to the group how awesome this app is. Once you are on this app add all four movies to your list and then click the button 'Pick a Movie'. The movie that appears is what you all will watch that evening. Make sure you make some sort of binding agreement 
				verbally or whatever you cool people do these days to make sure you stick to the randomly chosen movie.* 
				Although you may not end up watching the movie you wanted through this process, you did prevent a war you have seen time and time again with the help of Flick Pick.
			</p>
		</v-container>
	</div>
</template>
<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.jumbotron-img {
  background: url('./../assets/about.jpg') no-repeat;
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  width: 100;
}
</style>
