import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import About from './components/About.vue'
import FeaturedMovies from './components/FeaturedMovies.vue'
import MyList from './components/MyList.vue'
import NotFoundComponent from './components/NotFoundComponent.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{ path: '/mylist', component: MyList },
	{ path: '/about', component: About },
	{ path: '/', component: FeaturedMovies },
	{ path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#App')
