import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import FeaturedMovies from './components/FeaturedMovies.vue'
import MyList from './components/MyList.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{ path: '/mylist', component: MyList },
	{ path: '/', component: FeaturedMovies }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#App')
