import type { App } from 'vue'
import VMoneySpinner from './money_spinner.vue'
import { unformat, format } from 'v-money3'
import { VMoneySpinnerOptions } from './options'
import BigNumber from './big_number'

export default {
  install (app: App) {
    app.component('VMoneySpinner', VMoneySpinner)
  }
}

export type {
  VMoneySpinnerOptions
}

export {
  VMoneySpinner,
  BigNumber,
  format,
  unformat
}
