import VMoneySpinner from './money_spinner.vue'
const version = process.env.VERSION

export {
	VMoneySpinner,
	version
}

export default {
	install(app) {
		app.component('VMoneySpinner', VMoneySpinner)
	}
}
