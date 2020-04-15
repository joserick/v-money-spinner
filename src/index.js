import VMoneySpinner from './money_spinner.vue'
import VMoneySpinnerAmount from './money_spinner_amount.vue'
const version = process.env.VERSION

export {
  version
}
export default {
	install(Vue, globalOptions) {
		Vue.prototype.$eventBus = new Vue();
		Vue.component('VMoneySpinner', VMoneySpinner)
		Vue.component('VMoneySpinnerAmount', VMoneySpinnerAmount)
	}
}
