import { VMoneyOptions } from 'v-money3'

export interface VMoneySpinnerOptions extends VMoneyOptions {
    id: string,
    template: string | boolean,
    spinner: boolean,
    step: number,
    align: string,
    label: string,
    labelClass: string,
    wrapperClass: string,
    wrapperGroupClass: string,
    prependClass: string,
    appendClass: string,
    inputClass: string,
  }

export default {
  id: 'v-money-spinner',
  template: 'bootstrap',
  spinner: true,
  step: 1,
  align: 'center',
  label: '',
  labelClass: '',
  wrapperClass: '',
  wrapperGroupClass: '',
  prependClass: '',
  appendClass: '',
  inputClass: '',
} as VMoneySpinnerOptions
