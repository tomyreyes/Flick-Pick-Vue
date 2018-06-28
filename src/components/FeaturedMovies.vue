<template>
    <div class="featured">
       
        <h1>This week's top movies</h1>
         <v-container grid-list>
             <v-flex xs-12 xs4>
        <v-card v-for="(movie, index ) in movieList" :key="index">
        <v-card-media height="400" :src="'http://image.tmdb.org/t/p/w342'+ movie.poster_path" >
        </v-card-media>
        <v-card-actions>
            <v-btn small flat v-if="userList.includes(movie.id)" v-on:click="sendMovie(movie.id)">Remove</v-btn>
            <v-btn small flat v-else v-on:click="sendMovie(movie.id)">Add</v-btn>
        </v-card-actions>
        </v-card>
             </v-flex>
        </v-container>
        </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FeaturedMovies',
    data(){
        return {
             movieList: null
        }
    },
    methods: {
        sendMovie(id){
                this.$emit('sendMovie', id)
        }
    },
    props:{
        userList: {
            type: Array
        }
    },
    created(){
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/4/list/10',
            params:{
                page: 1,
                api_key: '2d1610b0077610c43b2fe59ad827cfec'
            }
        }).then(response => (this.movieList = response.data.results))
    }
}

</script>

<style scoped>
ul{
    list-style: none;
}
.featured{
    padding-top: 30px;
}
.card__media{
    height: 300px;
    width: 300px;
}

</style>