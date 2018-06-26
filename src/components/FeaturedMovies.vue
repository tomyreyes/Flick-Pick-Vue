<template>
    <div>
        <h1>This week's top movies</h1>
        <ul>
            <li v-for="(movie, index) in movieList" :key="index">
                {{movie.title}}
                <button v-on:click="sendMovie(movie.id)">Add</button>
            </li>
        </ul>
        </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FeaturedMovies',
    data(){
        return {
             movieList: null,
             selected: false
        }
    },
    methods: {
        sendMovie(id){
            console.log(this.userList.includes(id))
            if(this.userList.includes(id)){
                this.selected = true
            }else {
                this.$emit('sendMovie', id)
            }
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
            url: 'https://api.themoviedb.org/4/list/2',
            params:{
                page: 1,
                api_key: '2d1610b0077610c43b2fe59ad827cfec'
            }
        }).then(response => (this.movieList = response.data.results))
    }
}

//make an array 

</script>

<style scoped>
ul{
    list-style: none;
}

</style>