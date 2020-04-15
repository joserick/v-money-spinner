import Vue from 'vue/dist/vue'
import App from './app.vue'
import MoneySpinner from '../index'

Vue.use(MoneySpinner)

const app = new Vue({
	el: '#app',
	render: h => h(App)
});
