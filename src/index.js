import VMoneySpinner from './money_spinner.vue'

export {
  VMoneySpinner,
}

export default {
  install(app) {
    app.component('VMoneySpinner', VMoneySpinner)
  }
}
