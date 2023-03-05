import VMoneySpinner from './money_spinner.vue'

export {
  VMoneySpinner,
}

export default {
  install(app: { component: (arg0: string, arg1: any) => void }) {
    app.component('VMoneySpinner', VMoneySpinner)
  }
}
