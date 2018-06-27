<template>
    <div>
        <h1>Your List</h1>
        <ul>
            <li v-for="(movie, index) in userList" :key="index">
                {{movie}}
                <button v-on:click="deleteMovie(movie)">X</button>
            </li>
            
            </ul>
        </div>
</template>

<script>
export default {
    name: 'UserList',
    props:{
        userList:{
            type: Array
        }
    },
    methods:{
        deleteMovie(id){
            this.$emit('deleteMovie', id)
        }
    }

}
</script>
