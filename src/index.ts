import VMoneySpinner from './money_spinner.vue'
import { unformat, format } from 'v-money3'
import { VMoneySpinnerOptions } from './options'
import BigNumber from './big_number';

export default {
  install(app: { component: (arg0: string, arg1: any) => void }) {
    app.component('VMoneySpinner', VMoneySpinner)
  }
}

export type {
  VMoneySpinnerOptions,
};

export {
  VMoneySpinner,
  BigNumber,
  format,
  unformat,
};
